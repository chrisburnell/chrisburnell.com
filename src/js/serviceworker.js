/*!
 * Service Worker
 * @author Chris Burnell <@iamchrisburnell>
 */


(function () {

    "use strict";

    // Increment this when updating the Service Worker
    var VERSION = 'v2::';

    var CACHE_NAME = 'chrisburnell';

    // The files we want to cache
    var urlsToCache = [
        '/',
        '/about',
        '/articles',
        '/pens',
        '/search',
        '/css/main.min.css',
        '/js/main.min.js',
        '/images/avatar.png'
    ];


    // Instantiate the Service Worker
    if ( 'serviceWorker' in navigator ) {
        navigator.serviceWorker.register('/serviceworker.min.js')
            .then( function(registration) {
                // Registration was successful
                console.log('SW ' + VERSION + CACHE_NAME + ' - registration successful with scope:', registration.scope);
            })
            .catch( function(err) {
                // Registration has failed :(
                console.log('SW ' + VERSION + CACHE_NAME + ' - registration failed:', err);
            });
    }


    // Set the callback for the install step
    self.addEventListener('install', function(event) {
        console.log('SW ' + VERSION + CACHE_NAME + ' - install event in progress.');
        // Perform install steps
        event.waitUntil(
            caches
                .open(VERSION + CACHE_NAME)
                .then( function(cache) {
                    console.log('SW ' + VERSION + CACHE_NAME + ' - opened cache.', event.request.url);
                    return cache.addAll(urlsToCache);
                })
        );
    });


    // Handle fetching content from cache
    self.addEventListener('fetch', function(event) {
        console.log('SW ' + VERSION + CACHE_NAME + ' - fetch event in progress.');
        // Only cache GET requests
        if ( event.request.method !== 'GET' ) {
            console.log('SW ' + VERSION + CACHE_NAME + ' - fetch event ignored.', event.request.method, event.request.url);
            return;
        }
        event.respondWith(
            caches
                .match(event.request)
                .then( function(cached) {

                    var networked = fetch(event.request)
                        .then(fetchedFromNetwork, unableToResolve)
                        .catch(unableToResolve);

                    console.log('SW ' + VERSION + CACHE_NAME + ' - fetch event', cached ? '(cached)' : '(network)', event.request.url);

                    return cached || networked;

                    function fetchedFromNetwork(response) {
                        var cacheCopy = response.clone();
                        console.log('SW ' + VERSION + CACHE_NAME + ' - fetch response from network.', event.request.url);
                        caches
                            .open(VERSION + CACHE_NAME)
                            .then( function add(cache) {
                                cache.put(event.request, cacheCopy);
                            })
                            .then( function() {
                                console.log('SW ' + VERSION + CACHE_NAME + ' - fetch response stored in cache.', event.request.url);
                            })
                        return response;
                    }

                    function unableToResolve() {
                        console.log('SW ' + VERSION + CACHE_NAME + ' - fetch request failed in both cache and network')
                        return new Response('<h1>Service Unavailable</h1>', {
                            status: 503,
                            statusText: 'Service Unavailable',
                            headers: new Headers({
                                'Content-Type': 'text/html'
                            })
                        });
                    }
                })
        );
    });


    // Remove deprecated Workers
    self.addEventListener('activate', function(event) {
        console.log('SW ' + VERSION + CACHE_NAME + ' - activate event in progress.');
        event.waitUntil(
            caches
                .keys()
                .then( function(keys) {
                    return Promise.all(
                        keys
                        .filter( function (key) {
                            return !key.startsWith(VERSION);
                        })
                        .map( function(key) {
                            return caches.delete(key);
                        })
                    );
                })
                .then(function() {
                    console.log('SW ' + VERSION + CACHE_NAME + ' - activate event completed.');
                })
        );
    });

}());
