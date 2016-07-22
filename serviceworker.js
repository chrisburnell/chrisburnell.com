/*!
 * Service Worker
 * @author Chris Burnell <me@chrisburnell.com>
 */


'use strict';


// Set a name for the current cache
const version = '2016-07-22';
const cacheName = 'cb_' + version;

// Default files to always cache
const cacheFiles = [
    './',
    './about/',
    './offline/',
    './search/',
    './css/main.min.css',
    './js/main.min.js',
    './images/avatar.png',
    './search.json'
];


self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName)
            .then(cache => {
                return cache.addAll(cacheFiles);
            })
            .then( () => self.skipWaiting() )
    );
});


self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys()
            .then(keys => {
                return Promise.all(keys
                    .filter(key => {
                        return key.indexOf(version) !== 0;
                    }).map(key => {
                        return caches.delete(key);
                    })
                );
            })
    );
});


self.addEventListener('fetch', function(event) {
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
                    return caches.match('offline');
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
                            return response || caches.match('offline');
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
