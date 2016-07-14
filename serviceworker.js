/*!
 * Service Worker
 * @author Chris Burnell <me@chrisburnell.com>
 */


'use strict';


// we'll version our cache (and learn how to delete caches in
// some other post)
const version = '20160714-10';
const cacheName = 'static::' + version;


self.addEventListener('install', e => {
    // once the SW is installed, go ahead and fetch the resources
    // to make this work offline
    e.waitUntil(
        caches.open(cacheName).then(cache => {
            return cache.addAll([
                '/',
                '/about/',
                '/articles/',
                '/links/',
                '/pens/',
                '/search/',
                '/styleguide/',
                '/tags/',
                '/offline/',
                '/css/main.min.css',
                '/js/main.min.js',
                '/images/avatar.png',
                '/favicon.png',
                '/search.json'
            ]).then(() => self.skipWaiting());
        })
    );
});


// when the browser fetches a url, either response with
// the cached object or go ahead and fetch the actual url
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(res => res || fetch(event.request))
    );
});
