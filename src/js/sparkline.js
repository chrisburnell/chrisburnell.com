/*!
 * Target and build sparklines
 */

(function() {

    'use strict';

    if (document.querySelector('#sparkline-articles')
     || document.querySelector('#sparkline-notes')
     || document.querySelector('#sparkline-pens')
     || document.querySelector('#sparkline-links')) {
        let showEndpoint = true;
        let sparklineColor = '#4f4f4f';
        let request = new XMLHttpRequest();
        request.open('GET', '/sparklines.json', true);
        request.onload = function() {
            if (request.status >= 200 && request.status < 400 && request.responseText.length > 0) {
                // Success!
                let data = JSON.parse(request.responseText);
                if (document.querySelector('#sparkline-articles')) {
                    sparkline('sparkline-articles', data['articles'], showEndpoint, sparklineColor);
                }
                if (document.querySelector('#sparkline-notes')) {
                    sparkline('sparkline-notes', data['notes'], showEndpoint, sparklineColor);
                }
                if (document.querySelector('#sparkline-pens')) {
                    sparkline('sparkline-pens', data['pens'], showEndpoint, sparklineColor);
                }
                if (document.querySelector('#sparkline-links')) {
                    sparkline('sparkline-links', data['links'], showEndpoint, sparklineColor);
                }
                if (document.querySelector('#sparkline-talks')) {
                    sparkline('sparkline-talks', data['talks'], showEndpoint, sparklineColor);
                }
            }
            else {
                console.log(`Sparkline request status error: ${request.status}`);
            }
        };
        request.onerror = function() {
            console.log('Sparkline request error');
        };
        request.send();
    }

})();
