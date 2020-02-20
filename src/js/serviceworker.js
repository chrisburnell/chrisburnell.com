/*!
 * Service Worker
 * @author Chris Burnell <me@chrisburnell.com>
 */

"use strict";

const VERSION = "v2.0.161";
// Set up the caches
const ASSETS_CACHE = "assets::" + VERSION;
const IMAGES_CACHE = "images";
const PAGES_CACHE = "pages";
const CACHES = [
    ASSETS_CACHE,
    IMAGES_CACHE,
    PAGES_CACHE
];

// Represents the maximum number of items in each cache (except ASSETS_CACHE)
const CACHE_SIZE = 20;

// Represents the maximum amount of time to wait for the network
const TIMEOUT = 10000;

// Files that *must* be cached
const REQUIRED_FILES = [
    "/css/non-critical.min.css",
    "/js/main.min.js",
    "/search.json"
];

// Files that are cached but non-blocking
const OPTIONAL_FILES = [
    "/fonts/heebo-black.woff2",
    "/fonts/proxima-nova-regular.woff2",
    "/fonts/proxima-nova-semibold.woff2",
    "/fonts/proxima-nova-italic.woff2",
    "/images/sprites.svg"
];

// Pages to cache
const OFFLINE_PAGES = [
    "/offline",
    "/",
    "/about",
    "/archive",
    "/contact",
    "/license",
    "/privacy",
    "/projects",
    "/search"
];

// Pages to ignore
const IGNORE_PAGES = [
    "/ignore"
];

let updateAssetsCache = () => {
    return caches.open(ASSETS_CACHE)
        .then(cache => {
            // These items won"t block the installation of the Service Worker
            cache.addAll(OPTIONAL_FILES);
            // These items must be cached for the Service Worker to complete installation
            return cache.addAll(REQUIRED_FILES);
        });
};

let updatePagesCache = () => {
    return caches.open(PAGES_CACHE)
        .then(cache => {
            // These items must be cached for the Service Worker to complete installation
            return cache.addAll(OFFLINE_PAGES);
        });
};

let stashInCache = (cacheName, request, response) => {
    caches.open(cacheName)
        .then(cache => cache.put(request, response));
};

// Limit the number of items in a specified cache.
let trimCache = (cacheName, maxItems) => {
    caches.open(cacheName)
        .then(cache => {
            cache.keys()
                .then(keys => {
                    if (keys.length > maxItems) {
                        cache.delete(keys[0])
                            .then(() => {
                                trimCache(cacheName, maxItems)
                            });
                    }
                });
        });
};

// Remove caches whose name is no longer valid
let clearOldCaches = () => {
    return caches.keys()
        .then(keys => {
            return Promise.all(keys
                .filter(key => !CACHES.includes(key))
                .map(key => caches.delete(key))
            );
        });
};


self.addEventListener("install", event => {
    event.waitUntil(updateAssetsCache()
        .then(updatePagesCache())
        .then(() => self.skipWaiting())
    );
});

self.addEventListener("activate", event => {
    event.waitUntil(clearOldCaches()
        .then(() => self.clients.claim())
    );
});

if (registration.navigationPreload) {
    addEventListener("activate", event => {
        event.waitUntil(registration.navigationPreload.enable());
    });
}

self.addEventListener("fetch", event => {
    let request = event.request;
    let url = new URL(request.url);

    // Ignore requests which aren't to my own server
    if (url.origin !== location.origin) {
        return;
    }

    // Ignore non-GET requests
    if (request.method !== "GET") {
        return;
    }

    // Ignore particular URLs
    if (IGNORE_PAGES.includes(url.pathname)) {
        return;
    }

    // Pinkie Swear?
    let fetchPromise = event.preloadResponse ? event.preloadResponse : fetch(request);
    let cachePromise = caches.match(request);

    // For HTML requests, try the network first, fall back to the cache, finally the offline page
    if (request.headers.get("Accept").includes("text/html")) {
        url.pathname = url.pathname.replace(/\/$/, "");
        event.respondWith(
            new Promise(resolveWithResponse => {
                let timer = setTimeout(() => {
                    // Timeout: CACHE
                    cachePromise.then(responseFromCache => {
                        if (responseFromCache) {
                            resolveWithResponse(responseFromCache);
                        }
                    })
                }, TIMEOUT);

                fetchPromise.then(responseFromFetch => {
                    // NETWORK
                    // Stash a copy of this page in the PAGES cache
                    clearTimeout(timer);
                    let copy = responseFromFetch.clone();
                    try {
                        event.waitUntil(
                            stashInCache(PAGES_CACHE, request, copy)
                        );
                    }
                    catch(error) {
                        console.error(error);
                    }
                    resolveWithResponse(responseFromFetch);
                })
                .catch(error => {
                    clearTimeout(timer);
                    console.error(error);
                    // CACHE or FALLBACK
                    cachePromise.then(responseFromCache => {
                        resolveWithResponse(responseFromCache || caches.match("/offline"));
                    });
                });
            })
        );
        return;
    }

    // For all other requests, look in the cache first, fall back to the network
    event.respondWith(
        new Promise(resolveWithResponse => {
            let timer = setTimeout(() => {
                // Timeout: CACHE
                cachePromise.then(responseFromCache => {
                    if (responseFromCache) {
                        resolveWithResponse(responseFromCache);
                    }
                })
            }, TIMEOUT);

            fetchPromise.then(responseFromFetch => {
                // NETWORK
                // Stash a copy of this asset in the ASSETS or IMAGES cache
                clearTimeout(timer);
                let copy = responseFromFetch.clone();
                try {
                    event.waitUntil(
                        stashInCache((request.headers.get("Accept").includes("image") ? IMAGES_CACHE : ASSETS_CACHE), request, copy)
                    );
                }
                catch(error) {
                    console.error(error);
                }
                resolveWithResponse(responseFromFetch);
            })
            .catch(error => {
                clearTimeout(timer);
                console.error(error);
                // CACHE or FALLBACK
                cachePromise.then(responseFromCache => {
                    resolveWithResponse(responseFromCache || (request.headers.get("Accept").includes("image") ? new Response('<svg role="img" aria-labelledby="offline-title" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><title id="offline-title">Offline</title><g fill="none" fill-rule="evenodd"><path fill="#f9f9f9" d="M0 0h400v300H0z"/><text fill="#2b2b2b" font-family="sans-serif" font-size="72" font-weight="bold"><tspan x="93" y="172">Offline</tspan></text></g></svg>', { headers: { "Content-Type": "image/svg+xml", "Cache-Control": "no-store" } }) : caches.match("/offline")));
                });
            });
        })
    );
});

self.addEventListener("message", event => {
    if (event.data.command === "trimCaches") {
        trimCache(IMAGES_CACHE, CACHE_SIZE);
        trimCache(PAGES_CACHE, CACHE_SIZE);
    }
});
