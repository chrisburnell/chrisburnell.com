/*!
 * Service Worker
 * @author Chris Burnell <@iamchrisburnell>
 */


(function () {

    "use strict";

    // Increment this when updating the Service Worker
    var VERSION = '04';

    // Name the cache
    var CACHE_NAME = 'chrisburnell';

    // Name of the respective file (should be at root of project)
    var FILE_NAME  = 'serviceworker.min.js';

    // The files we want to cache
    var urlsToCache = [
        '/',
        '/about',
        '/articles',
        '/pens',
        '/tags',
        '/search',
        '/search.json',
        '/styleguide',
        '/css/main.min.css',
        '/js/main.min.js',
        '/images/avatar.png'
    ];


    // Instantiate the Service Worker
    if ( 'serviceWorker' in navigator ) {
        navigator.serviceWorker.register('/' + FILE_NAME)
            .then( function(registration) {
                // Registration was successful
                console.log('ServiceWorker - registration successful with scope:', registration.scope);
            })
            .catch( function(err) {
                // Registration has failed :(
                console.log('ServiceWorker - registration failed:', err);
            });
    }


    // Set the callback for the install step
    self.addEventListener('install', function(event) {
        console.log('ServiceWorker - install event in progress.');
        // Perform install steps
        event.waitUntil(
            caches
                .open('v' + VERSION + '::' + CACHE_NAME)
                .then( function(cache) {
                    return cache.addAll(urlsToCache);
                })
                .then( function() {
                    console.log('ServiceWorker - install completed.');
                })
        );
    });


    // Handle fetching content from cache
    self.addEventListener('fetch', function(event) {
        console.log('ServiceWorker - fetch event in progress.');
        // Only cache GET requests
        if ( event.request.method !== 'GET' ) {
            console.log('ServiceWorker - fetch event ignored.', event.request.method, event.request.url);
            return;
        }
        event.respondWith(
            caches
                .match(event.request)
                .then( function(cached) {

                    var networked = fetch(event.request)
                        .then(fetchedFromNetwork, unableToResolve)
                        .catch(unableToResolve);

                    console.log('ServiceWorker - fetch event', cached ? '(cached)' : '(network)', event.request.url);

                    return cached || networked;

                    function fetchedFromNetwork(response) {
                        var cacheCopy = response.clone();
                        console.log('ServiceWorker - fetch response from network.', event.request.url);
                        caches
                            .open('v' + VERSION + '::' + CACHE_NAME)
                            .then( function add(cache) {
                                cache.put(event.request, cacheCopy);
                            })
                            .then( function() {
                                console.log('ServiceWorker - fetch response stored in cache.', event.request.url);
                            })
                        return response;
                    }

                    function unableToResolve() {
                        console.log('ServiceWorker - fetch request failed in both cache and network')
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
        console.log('ServiceWorker - activate event in progress.');
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
                    console.log('ServiceWorker - activate event completed.');
                })
        );
    });

}());
