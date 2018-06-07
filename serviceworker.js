---
layout: null
searchable: false
sitemap:
  exclude: true
---
/*!
 * Service Worker
 * @author Chris Burnell <me@chrisburnell.com>
 */


'use strict';


const VERSION = '{{ site.time | date: '%F_%H%M%S' }}'; // 1970-01-01_000000
// Set up the caches
const STATIC_CACHE = VERSION + '::static';
const ASSETS_CACHE = 'assets';
const IMAGES_CACHE = 'images';
const PAGES_CACHE = 'pages';
const CACHES = [
    STATIC_CACHE,
    ASSETS_CACHE,
    IMAGES_CACHE,
    PAGES_CACHE
];
// Represents the maximum number of items in each cache (except STATIC_CACHE)
const CACHE_SIZE = 20;

// Files that *must* be cached
const CRITICAL_FILES = [
    '/css/main.min.css',
    '/js/main.min.js',
    '/search.json',
    '/offline/'
];

// Files that are cached but non-blocking
const OPTIONAL_FILES = [
    '/images/sprites.svg'
];

// Pages to cache
const OFFLINE_PAGES = [
    '/',
    '/about/',
    '/articles/',
    '/contact/',
    '/license/',
    '/links/',
    '/notes/',
    '/pens/',
    '/search/',
    '/styleguide/',
    '/tags/',
    '/talks/'{% for page in site.categories.article limit: 2 %},
    '{{ page.url }}/'{% endfor %}{% for page in site.categories.note limit: 2 %},
    '{{ page.url }}/'{% endfor %}{% for page in site.categories.pen limit: 2 %},
    '{{ page.url }}/'{% endfor %}{% for page in site.categories.link limit: 2 %},
    '{{ page.url }}/'{% endfor %}
];


function updateStaticCache() {
    return caches.open(STATIC_CACHE)
        .then( cache => {
            // These items won't block the installation of the Service Worker
            cache.addAll(OPTIONAL_FILES.concat(OFFLINE_PAGES));
            // These items must be cached for the Service Worker to complete installation
            return cache.addAll(CRITICAL_FILES);
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
                .then( keys => {
                    if (keys.length > maxItems) {
                        cache.delete(keys[0])
                            .then( trimCache(cacheName, maxItems) );
                    }
                });
        });
}

// Remove caches whose name is no longer valid
function clearOldCaches() {
    return caches.keys()
        .then( keys => {
            return Promise.all(keys
                .filter(key => !CACHES.includes(key))
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

self.addEventListener('fetch', event => {
    let request = event.request;
    let url = new URL(request.url);

    // Only deal with requests to my own server
    if (url.origin !== location.origin) {
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
                    // Stash a copy of this page in the STATIC or PAGES cache
                    let copy = response.clone();
                    if (OFFLINE_PAGES.includes(url.pathname) || OFFLINE_PAGES.includes(url.pathname + '/')) {
                        stashInCache(STATIC_CACHE, request, copy);
                    }
                    else if (!CRITICAL_FILES.includes(url.pathname) && !CRITICAL_FILES.includes(url.pathname.slice(1))) {
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
            .then( response => {
                return response || fetch(request)
                    .then( response => {
                        // NETWORK
                        // Stash a copy of this asset in the IMAGES or ASSETS cache
                        let copy = response.clone();
                        if (request.headers.get('Accept').includes('image')) {
                            stashInCache(IMAGES_CACHE, request, copy);
                        }
                        else if (!CRITICAL_FILES.includes(url.pathname) && !CRITICAL_FILES.includes(url.pathname.slice(1))) {
                            stashInCache(ASSETS_CACHE, request, copy);
                        }
                        return response;
                    })
                    .catch( () => {
                        // OFFLINE
                        // If the request is for an image, show an offline placeholder
                        if (request.headers.get('Accept').includes('image')) {
                            return new Response('<svg role="img" aria-labelledby="offline-title" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><title id="offline-title">Offline</title><g fill="none" fill-rule="evenodd"><path fill="#f9f9f9" d="M0 0h400v300H0z"/><text fill="#2b2b2b" font-family="sans-serif" font-size="72" font-weight="bold"><tspan x="93" y="172">Offline</tspan></text></g></svg>', {headers: {'Content-Type': 'image/svg+xml', 'Cache-Control': 'no-store'}});
                        }
                    });
            })
    );
});

self.addEventListener('message', event => {
    if (event.data.command == 'trimCaches') {
        trimCache(ASSETS_CACHE, CACHE_SIZE);
        trimCache(IMAGES_CACHE, CACHE_SIZE);
        trimCache(PAGES_CACHE,  CACHE_SIZE);
    }
});
