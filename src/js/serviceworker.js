/*!
 * Service Worker
 * @author Chris Burnell <me@chrisburnell.com>
 */

"use strict";

const VERSION = "v2.0.112";
// Set up the caches
const STATIC_CACHE = "static::" + VERSION;
const ASSETS_CACHE = "assets";
const IMAGES_CACHE = "images";
const PAGES_CACHE = "pages";
const CACHES = [
    STATIC_CACHE,
    ASSETS_CACHE,
    IMAGES_CACHE,
    PAGES_CACHE
];

// Represents the maximum number of items in each cache (except STATIC_CACHE)
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
    "/search"
];

// Pages to ignore
const IGNORE_PAGES = [
    "/ignore"
];


let updateStaticCache = () => {
    return caches.open(STATIC_CACHE)
        .then(cache => {
            // These items won"t block the installation of the Service Worker
            cache.addAll(OPTIONAL_FILES.concat(OFFLINE_PAGES));
            // These items must be cached for the Service Worker to complete installation
            return cache.addAll(REQUIRED_FILES);
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
    event.waitUntil(updateStaticCache()
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

    // Ignore requests which aren"t to my own server
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

    // For HTML requests, try the network first, fall back to the cache, finally the offline page
    if (request.headers.get("Accept").includes("text/html")) {
        url.pathname = url.pathname.replace(/\/$/, "");
        let fetchPromise = event.preloadResponse ? event.preloadResponse : fetch(request);
        let cachePromise = caches.match(request);
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
                    // Stash a copy of this page in the STATIC or PAGES cache
                    clearTimeout(timer);
                    let copy = responseFromFetch.clone();
                    try {
                        event.waitUntil(
                            stashInCache((OFFLINE_PAGES.includes(url.pathname) ? STATIC_CACHE : PAGES_CACHE), request, copy)
                        );
                    }
                    catch (error) {
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
        )
        return;
    }

    // For non-HTML requests, look in the cache first, fall back to the network
    event.respondWith(
        caches.match(request)
            .then(responseFromCache => {
                // CACHE
                return responseFromCache || fetch(request)
                    .then(responseFromFetch => {
                        // NETWORK
                        // Stash a copy of this asset in the IMAGES or ASSETS cache
                        let copy = responseFromFetch.clone();
                        try {
                            event.waitUntil(
                                stashInCache((request.headers.get("Accept").includes("image") ? IMAGES_CACHE : ASSETS_CACHE), request, copy)
                            );
                        }
                        catch (error) {
                            console.error(error);
                        }
                        return responseFromFetch;
                    })
                    .catch(error => {
                        console.error(error);
                        // OFFLINE FALLBACK
                        // If the request is for an image, show an offline placeholder
                        if (request.headers.get("Accept").includes("image")) {
                            return new Response('<svg role="img" aria-labelledby="offline-title" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><title id="offline-title">Offline</title><g fill="none" fill-rule="evenodd"><path fill="#f9f9f9" d="M0 0h400v300H0z"/><text fill="#2b2b2b" font-family="sans-serif" font-size="72" font-weight="bold"><tspan x="93" y="172">Offline</tspan></text></g></svg>', { headers: { "Content-Type": "image/svg+xml", "Cache-Control": "no-store" } });
                        }
                    });
            })
    );
});

self.addEventListener("message", event => {
    if (event.data.command == "trimCaches") {
        trimCache(ASSETS_CACHE, CACHE_SIZE);
        trimCache(IMAGES_CACHE, CACHE_SIZE);
        trimCache(PAGES_CACHE, CACHE_SIZE);
    }
});
