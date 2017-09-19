---
---
/*!
 * Service Worker
 * @author Chris Burnell <me@chrisburnell.com>
 */


'use strict';


// Set up the caches
// YYYY-MM-DD_hhmm
const VERSION = '{{ site.time | date: '%F_%H%M' }}::';
const STATIC_CACHE = VERSION + 'static';
const ASSETS_CACHE = 'assets';
const IMAGES_CACHE = 'images';
const PAGES_CACHE = 'pages';
const CACHE_LIST = [
    ASSETS_CACHE,
    IMAGES_CACHE,
    PAGES_CACHE,
    STATIC_CACHE
];

// Pages to cache
const OFFLINE_PAGES = [
    '/',
    '/about/',
    '/articles/',
    '/contact/',
    '/hip-hop/',
    '/license/',
    '/links/',
    '/notes/',
    '/pens/',
    '/search/',
    '/styleguide/',
    '/tags/',
    '/talks/'
];

// Files that *must* be cached
const CRITICAL_CACHE = [
    '/css/main.min.css',
    '/js/main.min.js',
    '/search.json',
    '/offline/'
];

// Files that are cached but non-blocking
const OPTIONAL_CACHE = [
    '/images/sprites.svg'
];


function updateStaticCache() {
    return caches.open(STATIC_CACHE)
        .then( cache => {
            // These items won't block the installation of the Service Worker
            cache.addAll(OPTIONAL_CACHE.concat(OFFLINE_PAGES));
            // These items must be cached for the Service Worker to complete installation
            return cache.addAll(CRITICAL_CACHE);
        });
}

function stashInCache(cacheName, request, response) {
    caches.open(cacheName)
        .then( cache => cache.put(request, response) );
}

// Limit the number of items in a specified cache.
function trimCache(cacheName, maxItems) {
    caches.open(cacheName)
        .then( cache => {
            cache.keys()
                .then(keys => {
                    if (keys.length > maxItems) {
                        cache.delete(keys[0])
                            .then(trimCache(cacheName, maxItems));
                    }
                });
        });
}

// Remove caches whose name is no longer valid
function clearOldCaches() {
    return caches.keys()
        .then( keys => {
            return Promise.all(keys
                .filter(key => !CACHE_LIST.includes(key))
                .map(key => caches.delete(key))
            );
        });
}


self.addEventListener('install', event => {
    event.waitUntil(updateStaticCache()
        .then( () => self.skipWaiting() )
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(clearOldCaches()
        .then( () => self.clients.claim() )
    );
});

self.addEventListener('message', event => {
    if (event.data.command == 'trimCaches') {
        trimCache(PAGES_CACHE, 35);
        trimCache(IMAGES_CACHE, 20);
        trimCache(ASSETS_CACHE, 20);
    }
});

self.addEventListener('fetch', event => {
    let request = event.request;
    let url = new URL(request.url);

    // Only deal with requests to my own server
    if (url.origin !== location.origin) {
        return;
    }

    // Ignore requests to some directories
    if (request.url.includes('/sassdoc')) {
        return;
    }

    // Ignore non-GET requests
    if (request.method !== 'GET') {
        return;
    }

    // For HTML requests, try the network first, fall back to the cache, finally the offline page
    if (request.headers.get('Accept').includes('text/html')) {

        event.respondWith(
            fetch(request)
                .then( response => {
                    // NETWORK
                    // Stash a copy of this page in the pages cache
                    let copy = response.clone();
                    if (OFFLINE_PAGES.includes(url.pathname) || OFFLINE_PAGES.includes(url.pathname + '/')) {
                        stashInCache(STATIC_CACHE, request, copy);
                    } else {
                        stashInCache(PAGES_CACHE, request, copy);
                    }
                    return response;
                })
                .catch( () => {
                    // CACHE or FALLBACK
                    return caches.match(request)
                        .then( response => response || caches.match('/offline') );
                })
        );
        return;
    }

    // For non-HTML requests, look in the cache first, fall back to the network
    event.respondWith(
        caches.match(request)
            .then(response => {
                // CACHE
                return response || fetch(request)
                    .then( response => {
                        let copy = response.clone;
                        // NETWORK
                        // If the request is for an image, stash a copy of this image in the images cache
                        if (request.headers.get('Accept').includes('image')) {
                            stashInCache(IMAGES_CACHE, request, copy);
                        }
                        // or stash a copy of this asset in the assets cache
                        else {
                            stashInCache(ASSETS_CACHE, request, copy);
                        }
                        return response;
                    })
                    .catch( () => {
                        // OFFLINE
                        // If the request is for an image, show an offline placeholder
                        if (request.headers.get('Accept').includes('image')) {
                            return new Response('<svg role="img" aria-labelledby="offline-title" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><title id="offline-title">Offline</title><g fill="none" fill-rule="evenodd"><path fill="#D8D8D8" d="M0 0h400v300H0z"/><text fill="#9B9B9B" font-family="Helvetica Neue,Arial,Helvetica,sans-serif" font-size="72" font-weight="bold"><tspan x="93" y="172">offline</tspan></text></g></svg>', {headers: {'Content-Type': 'image/svg+xml', 'Cache-Control': 'no-store'}});
                        }
                    });
            })
    );
});
