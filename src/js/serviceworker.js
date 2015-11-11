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

    // Console Feedback
    var CONSOLE_FEEDBACK = true,
        SW_TITLE = 'ServiceWorker v' + VERSION + ' ';


    // Instantiate the Service Worker
    if ( 'serviceWorker' in navigator ) {
        navigator.serviceWorker.register('/' + FILE_NAME)
            .then( function(registration) {
                // Registration was successful
                if( CONSOLE_FEEDBACK ) {
                    console.log(SW_TITLE, 'Registration successful with scope:', registration.scope);
                }
            })
            .catch( function(err) {
                // Registration has failed :(
                if( CONSOLE_FEEDBACK ) {
                    console.log(SW_TITLE, 'Registration failed:', err);
                }
            });
    }


    // Set the callback for the install step
    self.addEventListener('install', function(event) {
        if( CONSOLE_FEEDBACK ) {
            console.log(SW_TITLE, 'install event in progress.');
        }
        // Perform install steps
        event.waitUntil(
            caches
                .open('v' + VERSION + '::' + CACHE_NAME)
                .then( function(cache) {
                    return cache.addAll(urlsToCache);
                })
                .then( function() {
                    if( CONSOLE_FEEDBACK ) {
                        console.log(SW_TITLE, 'install event completed.');
                    }
                })
        );
    });


    // Handle fetching content from cache
    self.addEventListener('fetch', function(event) {
        if( CONSOLE_FEEDBACK ) {
            console.log(SW_TITLE, 'fetch event in progress.');
        }
        // Only cache GET requests
        if ( event.request.method !== 'GET' ) {
            if( CONSOLE_FEEDBACK ) {
                console.log(SW_TITLE, 'fetch event ignored.', event.request.method, event.request.url);
            }
            return;
        }
        event.respondWith(
            caches
                .match(event.request)
                .then( function(cached) {

                    var networked = fetch(event.request)
                        .then(fetchedFromNetwork, unableToResolve)
                        .catch(unableToResolve);

                    if( CONSOLE_FEEDBACK ) {
                        console.log(SW_TITLE, 'fetch event', cached ? '(cached)' : '(network)', event.request.url);
                    }

                    return cached || networked;

                    function fetchedFromNetwork(response) {
                        var cacheCopy = response.clone();
                        if( CONSOLE_FEEDBACK ) {
                            console.log(SW_TITLE, 'fetch response from network.', event.request.url);
                        }
                        caches
                            .open('v' + VERSION + '::' + CACHE_NAME)
                            .then( function add(cache) {
                                cache.put(event.request, cacheCopy);
                            })
                            .then( function() {
                                if( CONSOLE_FEEDBACK ) {
                                    console.log(SW_TITLE, 'fetch response stored in cache.', event.request.url);
                                }
                            })
                        return response;
                    }

                    function unableToResolve() {
                        if( CONSOLE_FEEDBACK ) {
                            console.log(SW_TITLE, 'fetch request failed in both cache and network')
                        }
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
        if( CONSOLE_FEEDBACK ) {
            console.log(SW_TITLE, 'activate event in progress.');
        }
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
                    if( CONSOLE_FEEDBACK ) {
                        console.log(SW_TITLE, 'activate event completed.');
                    }
                })
        );
    });

}());
