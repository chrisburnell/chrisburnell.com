/*!
 * Target and build Sparklines
 */

(function() {
    "use strict";

    ///
    // Canvas Sparkline
    // by Jeremy Keith <@adactio>, modified by Chris Burnell <me@chrisburnell.com>
    // https://github.com/adactio/Canvas-Sparkline
    // Licensed under a CC0 1.0 Universal (CC0 1.0) Public Domain Dedication
    // http://creativecommons.org/publicdomain/zero/1.0/
    ///
    let sparkline = (canvasID, data, endpoint, color, style, endpointColor) => {
        if (window.HTMLCanvasElement) {
            var c = document.getElementById(canvasID),
                ctx = c.getContext("2d"),
                color = color ? color : "rgba(0,0,0,0.5)",
                endpointColor = endpointColor ? endpointColor : "rgba(255,0,0,0.5)",
                style = style == "bar" ? "bar" : "line",
                height = c.height - 3,
                width = c.width,
                total = data.length,
                max = Math.max.apply(Math, data),
                xstep = width / total,
                ystep = max / height,
                x = 0,
                y = height - data[0] / ystep,
                i;
            if (window.devicePixelRatio) {
                c.width = c.width * window.devicePixelRatio;
                c.height = c.height * window.devicePixelRatio;
                c.style.width = `${c.width / window.devicePixelRatio}px`;
                c.style.height = `${c.height / window.devicePixelRatio}px`;
                ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
            }
            ctx.clearRect(0, 0, width, height);
            ctx.beginPath();
            ctx.strokeStyle = color;
            ctx.moveTo(x, y);
            for (i = 1; i < total; i = i + 1) {
                x = x + xstep;
                y = height - data[i] / ystep + 2;
                if (style == "bar") {
                    ctx.moveTo(x, height);
                }
                ctx.lineTo(x, y);
            }
            ctx.stroke();
            if (endpoint && style == "line") {
                ctx.beginPath();
                ctx.fillStyle = endpointColor;
                ctx.arc(x, y, 1.5, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    };

    ///
    // Play Sparkline
    // Pass in an array of numbers ranging from 0 to 12.
    // by Jeremy Keith <@adactio>, modified by Chris Burnell <me@chrisburnell.com>
    // https://gist.github.com/adactio/d988edc418aabfa2220456dc548dedc1
    // Licensed under a CC0 1.0 Universal (CC0 1.0) Public Domain Dedication
    // http://creativecommons.org/publicdomain/zero/1.0/
    ///
    let playSparkline = (notes, frequencies = [440], duration = 3000, wave = "sine", volume = 0.5) => {
        if (!window.AudioContext && !window.webkitAudioContext) {
            return;
        }
        let playing;
        let note = 0;
        let noteLength = Math.floor(duration / notes.length);
        let output = new (window.AudioContext || window.webkitAudioContext)();
        let instrument = output.createOscillator();
        let amplifier = output.createGain();
        let playNotes = () => {
            if (note < notes.length) {
                instrument.frequency.value = frequencies[notes[note]];
                note = note + 1;
            } else {
                amplifier.gain.value = 0;
            }
            playing = window.setTimeout(playNotes, noteLength);
        };
        instrument.type = wave;
        instrument.start();
        instrument.connect(amplifier);
        amplifier.gain.value = volume;
        amplifier.connect(output.destination);
        playNotes();
    };

    let data;

    if (document.querySelector(".sparkline")) {
        let showEndpoint = true;
        let sparklineColor = "hsla(0, 0%, 31%, 1)";
        let endpointColor = "hsla(357, 83%, 55%, 0.5)";
        fetch("/sparklines.json")
            .then(helpers.getFetchResponse)
            .then(response => response.json())
            .then(response => {
                data = response;
                for (let type in data) {
                    if (document.querySelector(`#sparkline-${type}`)) {
                        sparkline(`sparkline-${type}`, data[type], showEndpoint, sparklineColor, "line", endpointColor);
                    }
                }
            })
            .catch(error => {
                console.error(`Sparklines request status error: ${error.status} ${error.statusText}`);
            });
    }

    let wave = "triangle"; // 'sine', 'square', 'sawtooth', 'triangle'
    let duration = 4000; // milliseconds
    let keyStart = 41; // C#4
    let keyIntervals = [2, 3, 2, 2, 3]; // https://en.wikipedia.org/wiki/Pentatonic_scale
    let keyInterval = 0;
    let keyCount = 12;
    let frequencies = [helpers.getFrequencyFromKeys(keyStart)];

    for (let count = 0; count < keyCount; count++) {
        keyInterval = keyInterval + keyIntervals[count % keyIntervals.length];
        frequencies.push(helpers.getFrequencyFromKeys(keyStart + keyInterval));
    }

    for (let sparkline of document.querySelectorAll(".sparkline")) {
        sparkline.addEventListener("click", event => {
            playSparkline(data[sparkline.id.split("-")[1]], frequencies, duration, wave);
            // Prevent the user from blowing their ears up by stacking sounds
            sparkline.classList.add("non-interactive");
            window.setTimeout(() => {
                sparkline.classList.remove("non-interactive");
            }, duration);
        });
    }
})();
