/*!
 * Service Worker
 * @author Chris Burnell <@iamchrisburnell>
 */


(function () {

    "use strict";

    // Increment this when updating the Service Worker
    var VERSION = '11';

    // Name the cache
    var CACHE_NAME = 'chrisburnell';

    // Name of the respective file (should be at root of project)
    var FILE_NAME = 'serviceworker.min.js';

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
    var CONSOLE_FEEDBACK = true;
    var WORKER_LABEL = 'v' + VERSION + ' WORKER: ';
    var CLIENT_LABEL = 'v' + VERSION + ' CLIENT: ';


    // Instantiate the Service Worker
    if ( 'serviceWorker' in navigator ) {
        if( CONSOLE_FEEDBACK ) {
            console.log(CLIENT_LABEL, 'Registration in progress.');
        }
        navigator.serviceWorker.register('/' + FILE_NAME)
            .then( function(registration) {
                // Registration has completed :)
                if( CONSOLE_FEEDBACK ) {
                    console.log(CLIENT_LABEL, 'Registration completed, with scope:', registration.scope);
                }
            })
            .catch( function(err) {
                // Registration has failed :(
                if( CONSOLE_FEEDBACK ) {
                    console.log(CLIENT_LABEL, 'Registration failed, with error:', err);
                }
            });
    }


    // Set the callback for the install step
    self.addEventListener('install', function(event) {
        if( CONSOLE_FEEDBACK ) {
            console.log(WORKER_LABEL, '`install` event in progress.');
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
                        console.log(WORKER_LABEL, '`install` event completed.');
                    }
                })
        );
    });


    // Handle fetching content from cache
    self.addEventListener('fetch', function(event) {
        if( CONSOLE_FEEDBACK ) {
            console.log(WORKER_LABEL, '`fetch` event in progress.');
        }
        // Only cache GET requests
        if ( event.request.method !== 'GET' ) {
            if( CONSOLE_FEEDBACK ) {
                console.log(WORKER_LABEL, '`fetch` event ignored.', event.request.method, event.request.url);
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
                        console.log(WORKER_LABEL, '`fetch` event', cached ? '(cached)' : '(network)', event.request.url);
                    }

                    return cached || networked;

                    function fetchedFromNetwork(response) {
                        var cacheCopy = response.clone();
                        if( CONSOLE_FEEDBACK ) {
                            console.log(WORKER_LABEL, '`fetch` response from network.', event.request.url);
                        }
                        caches
                            .open('v' + VERSION + '::' + CACHE_NAME)
                            .then( function add(cache) {
                                cache.put(event.request, cacheCopy);
                            })
                            .then( function() {
                                if( CONSOLE_FEEDBACK ) {
                                    console.log(WORKER_LABEL, '`fetch` response stored in cache.', event.request.url);
                                }
                            })
                        return response;
                    }

                    function unableToResolve() {
                        if( CONSOLE_FEEDBACK ) {
                            console.log(WORKER_LABEL, '`fetch` request failed in both cache and network')
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
            console.log(WORKER_LABEL, '`activate` event in progress.');
        }
        event.waitUntil(
            caches
                .keys()
                .then( function(keys) {
                    return Promise.all(
                        keys
                        .filter( function (key) {
                            return !key.startsWith('v' + VERSION);
                        })
                        .map( function(key) {
                            return caches.delete(key);
                        })
                    );
                })
                .then(function() {
                    if( CONSOLE_FEEDBACK ) {
                        console.log(WORKER_LABEL, '`activate` event completed.');
                    }
                })
        );
    });

}());
