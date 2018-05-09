/*!
 * ServiceWorker Cache Trimmer
 * @author Chris Burnell <me@chrisburnell.com>
 */


(() => {

    'use strict';


    window.addEventListener('load', function() {
        if (navigator.serviceWorker.controller) {
            navigator.serviceWorker.controller.postMessage({'command': 'trimCache'});
            console.log('caches trimmed');
        }
    });

})();
