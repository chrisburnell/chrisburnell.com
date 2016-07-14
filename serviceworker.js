/*!
 * Service Worker
 * @author Chris Burnell <me@chrisburnell.com>
 */


(function () {

  'use strict';


  // Version
  var version = '20160714-13';


  // Cache name definitions
  var cacheNameStatic = 'static';
  var currentCacheNames = [
    cacheNameStatic
  ];


  // A new ServiceWorker has been registered
  self.addEventListener('install', function (event) {
    event.waitUntil(
      caches.open(cacheNameStatic)
        .then(function (cache) {
          return cache.addAll([
            '/',
            '/about',
            '/articles',
            '/links',
            '/pens',
            '/search',
            '/styleguide',
            '/tags',
            '/offline',
            '/css/main.min.css',
            '/js/main.min.js',
            'images/avatar.png',
            'favicon.png',
            'search.json'
          ]);
        })
    );
  });


  // A new ServiceWorker is now active
  self.addEventListener('activate', function (event) {
    event.waitUntil(
      caches.keys()
        .then(function (cacheNames) {
          return Promise.all(
            cacheNames.map(function (cacheName) {
              if (currentCacheNames.indexOf(cacheName) === -1) {
                return caches.delete(cacheName);
              }
            })
          );
        })
    );
  });


  // The page has made a request
  self.addEventListener('fetch', function (event) {
    var requestURL = new URL(event.request.url);

    event.respondWith(
      caches.match(event.request)
        .then(function (response) {

          if (response) {
            return response;
          }

          var fetchRequest = event.request.clone();

          return fetch(fetchRequest).then(
            function (response) {

              var shouldCache = false;

              if (response.type === 'basic' && response.status === 200) {
                shouldCache = cacheNameStatic;
              }

              if (shouldCache) {
                var responseToCache = response.clone();

                caches.open(shouldCache)
                  .then(function (cache) {
                    var cacheRequest = event.request.clone();
                    cache.put(cacheRequest, responseToCache);
                  });
              }

              return response;
            }
          );
        })
    );
  });

})();
