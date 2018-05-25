/*!
 * Target and build sparklines
 */

(function() {

    'use strict';


    let types = ['articles', 'notes', 'pens', 'links', 'talks'],
        data;

    if (document.querySelector('[id*="sparkline"]')) {
        let showEndpoint = true;
        let sparklineColor = 'hsla(0, 0%, 31%, 1)';
        let endpointColor = 'hsla(357, 83%, 55%, 0.5)';
        let request = new XMLHttpRequest();
        request.open('GET', '/sparklines.json', true);
        request.onload = () => {
            if (request.status >= 200 && request.status < 400 && request.responseText.length > 0) {
                // Success!
                data = JSON.parse(request.responseText);
                for (let type of types) {
                    if (document.querySelector(`#sparkline-${type}`)) {
                        sparkline(`sparkline-${type}`, data[type], showEndpoint, sparklineColor, 'line', endpointColor);
                    }
                }
            }
            else {
                console.log(`Sparkline request status error: ${request.status}`);
            }
        };
        request.onerror = () => {
            console.log('Sparkline request error');
        };
        request.send();
    }

    let wave = 'sine'; // 'sine', 'square', 'sawtooth', 'triangle'
    let duration = 4000; // milliseconds
    let keyStart = 41; // C#4
    let keyIntervals = [2, 3, 2, 2, 3]; // pentatonic scale
    let keyInterval = 0;
    let keyCount = 13;
    let frequencies = [Math.pow(2, ((keyStart - 49) / 12)) * 440];

    for (let count = 0; count < keyCount - 1; count++) {
        keyInterval = keyInterval + keyIntervals[count % keyIntervals.length];
        frequencies.push(Math.pow(2, ((keyStart - 49 + keyInterval) / 12)) * 440);
    }

    for (let sparkline of document.querySelectorAll('.sparkline')) {
        sparkline.addEventListener('click', (event) => {
            playSparkline(data[sparkline.id.split('-')[1]], frequencies, duration, wave);
            // Prevent the user from blowing their ears up by stacking sounds
            sparkline.classList.add('non-interactive');
            window.setTimeout(() => {
                sparkline.classList.remove('non-interactive');
            }, duration);
        });
    }
})();
