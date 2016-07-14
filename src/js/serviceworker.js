/*!
 * Service Worker
 * @author Chris Burnell <me@chrisburnell.com>
 */


(function() {

    'use strict';

    const version = '20160714-3';
    const staticCacheName = 'static' + version;

    function updateStaticCache() {
        return caches.open(staticCacheName)
            .then(cache => {
                // These items must be cached for the Service Worker to complete installation
                return cache.addAll([
                    'https://chrisburnell.com/',
                    'https://chrisburnell.com/about',
                    'https://chrisburnell.com/articles',
                    'https://chrisburnell.com/links',
                    'https://chrisburnell.com/pens',
                    'https://chrisburnell.com/search',
                    'https://chrisburnell.com/styleguide',
                    'https://chrisburnell.com/tags',
                    'https://chrisburnell.com/offline',
                    'https://chrisburnell.com/css/main.min.css',
                    'https://chrisburnell.com/js/main.min.js',
                    'https://chrisburnell.com/images/avatar.png',
                    'https://chrisburnell.com/favicon.png',
                    'https://chrisburnell.com/search.json'
                ]);
            });
    }

    function clearOldCaches() {
        return caches.keys()
            .then(keys => {
                // Remove caches whose name is no longer valid
                return Promise.all(keys
                    .filter(key => {
                        return key.indexOf(version) !== 0;
                    })
                    .map(key => {
                        return caches.delete(key);
                    })
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

        // For non-GET requests, try the network first, fall back to the offline page
        if (request.method !== 'GET') {
            event.respondWith(
                fetch(request)
                    .catch( () => {
                        return caches.match(baseurl + '/offline');
                    })
            );
            return;
        }

        // For HTML requests, try the network first, fall back to the cache, finally the offline page
        if (request.headers.get('Accept').indexOf('text/html') !== -1) {
            request = new Request(request.url, {
                method: 'GET',
                headers: request.headers,
                mode: request.mode == 'navigate' ? 'cors' : request.mode,
                credentials: request.credentials,
                redirect: request.redirect
            });
            event.respondWith(
                fetch(request)
                    .then (response => {
                        return response;
                    })
                    .catch(function () {
                        // CACHE or FALLBACK
                        return caches.match(request)
                            .then(response => {
                                return response || caches.match('/offline');
                            });
                    })
            );
            return;
        }

        // For non-HTML requests, look in the cache first, fall back to the network
        event.respondWith(
            caches.match(request)
                .then(response => {
                    return response || fetch(request)
                })
        );
    });

}());
