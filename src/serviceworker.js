/*!
 * Service Worker
 * @author Chris Burnell <me@chrisburnell.com>
 */

"use strict";

const VERSION = "v3.0.20";
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
const CACHE_SIZE = 30;

// Represents the maximum amount of time to wait for the network
const TIMEOUT = 15000;

// Files that *must* be cached
const REQUIRED_FILES = [
    "/js/main.js"
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
    "/offline/",
    "/",
    "/about/",
    "/archive/",
    "/writing/",
    "/projects/",
    "/styleguide/"
];

// Pages to ignore
const IGNORE_PAGES = [
    "/ignore/"
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

if (self.registration.navigationPreload) {
    self.addEventListener("activate", event => {
        event.waitUntil(self.registration.navigationPreload.enable());
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

    const retrieveFromCache = caches.match(request);

    // For HTML requests, try the network first, fall back to the cache, finally the offline page
    if (request.headers.get("Accept").includes("text/html")) {
        event.respondWith(
            new Promise(resolveWithResponse => {
                const timer = setTimeout(() => {
                    // Timeout: CACHE
                    retrieveFromCache.then(responseFromCache => {
                        if (responseFromCache) {
                            resolveWithResponse(responseFromCache);
                        }
                    })
                }, TIMEOUT);

                const retrieveFromFetch = event.preloadResponse || fetch(request);

                retrieveFromFetch.then(responseFromFetch => {
                    // NETWORK
                    clearTimeout(timer);
                    let copy = responseFromFetch.clone();
                    // Stash a copy of this page in the PAGES cache
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
                .catch(fetchError => {
                    clearTimeout(timer);
                    console.error(fetchError);
                    // CACHE or OFFLINE PAGE FALLBACK
                    retrieveFromCache.then(responseFromCache => {
                        resolveWithResponse(responseFromCache || caches.match("/offline/"));
                    });
                });
            })
        )
        return;
    }

    // For all other requests, look in the cache first, fall back to the network
    event.respondWith(
        retrieveFromCache.then(responseFromCache => {
            // CACHE
            return responseFromCache || fetch(request)
            .then(responseFromFetch => {
                // NETWORK
                // Stash a copy of this asset in the IMAGES cache
                if (request.url.match(/\.(jpe?g|png|gif|webp)/)) {
                    const copy = responseFromFetch.clone();
                    try {
                        event.waitUntil(
                            stashInCache(IMAGES_CACHE, request, copy)
                        );
                    }
                    catch (error) {
                        console.error(error);
                    }
                }
                return responseFromFetch;
            })
            .catch(fetchError => {
                console.error(fetchError);
                // FALLBACK
                // show an offline placeholder image
                if (request.url.match(/\.(jpe?g|png|gif|webp)/)) {
                    return new Response('<svg role="img" aria-labelledby="offline-title" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><title id="offline-title">Offline</title><g fill="none" fill-rule="evenodd"><path fill="#D8D8D8" d="M0 0h400v300H0z"/><text fill="#9B9B9B" font-family="Helvetica Neue,Arial,Helvetica,sans-serif" font-size="72" font-weight="bold"><tspan x="93" y="172">offline</tspan></text></g></svg>', {headers: {'Content-Type': 'image/svg+xml', 'Cache-Control': 'no-store'}});
                }
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
