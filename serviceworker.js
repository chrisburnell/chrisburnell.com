/*!
 * Service Worker
 * @author Chris Burnell <me@chrisburnell.com>
 */


'use strict';


// Set a name for the current cache
const VERSION = '2016-10-18';
const CACHE_NAME = `cb_${VERSION}`;

// Default files to always cache
const CACHE_FILES = [
    '/',
    '/about/',
    '/articles/',
    '/pens/',
    '/offline/',
    '/search/',
    '/styleguide/',
    '/css/main.min.css',
    '/js/main.min.js',
    '/images/avatar.png',
    '/images/avatar.webp',
    '/fonts/league-gothic-regular.woff2',
    '/fonts/league-gothic-regular.woff',
    '/fonts/proxima-nova-regular.woff2',
    '/fonts/proxima-nova-regular.woff',
    '/fonts/proxima-nova-italic.woff2',
    '/fonts/proxima-nova-italic.woff',
    '/fonts/proxima-nova-semibold.woff2',
    '/fonts/proxima-nova-semibold.woff',
    '/search.json',
    '/manifest.json'
];


self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(CACHE_FILES);
            })
            .then(self.skipWaiting())
    );
});


self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys()
            .then(keys => {
                return Promise.all(keys
                    .filter(key => {
                        return key.indexOf(CACHE_NAME) !== 0;
                    })
                    .map(key => {
                        return caches.delete(key);
                    })
                );
            })
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
                .catch(() => {
                    return caches.match('/offline/');
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
                .then(response => {
                    return response;
                })
                .catch(() => {
                    return caches.match(request)
                        .then(response => {
                            return response || caches.match('/offline/');
                        })
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
