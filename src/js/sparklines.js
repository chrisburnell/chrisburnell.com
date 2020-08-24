///
// Canvas Sparkline
// by Jeremy Keith <@adactio>, modified by Chris Burnell <me@chrisburnell.com>
// https://github.com/adactio/Canvas-Sparkline
// Licensed under a CC0 1.0 Universal (CC0 1.0) Public Domain Dedication
// http://creativecommons.org/publicdomain/zero/1.0/
///
let buildSparkline = (canvasID, data, endpoint = true, color = "hsla(0, 0%, 31%, 1)", endpointColor = "hsla(357, 83%, 55%, 0.5)") => {
    if (window.HTMLCanvasElement) {
        var c = document.getElementById(canvasID),
            ctx = c.getContext("2d"),
            height = c.height - 3,
            width = c.width,
            total = data.length,
            max = Math.max.apply(Math, data),
            xStep = width / total,
            yStep = max / height,
            x = 0,
            y = height - data[0] / yStep,
            dX,
            dY,
            i;
        if (window.devicePixelRatio) {
            c.width = c.width * window.devicePixelRatio;
            c.height = c.height * window.devicePixelRatio;
            // c.style.width = `${c.width / window.devicePixelRatio}px`;
            // c.style.height = `${c.height / window.devicePixelRatio}px`;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        }
        ctx.clearRect(0, 0, width, height);
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.moveTo(x, y);
        for (i = 0; i < total; i = i + 1) {
            dX = x;
            dY = y;
            x = x + xStep;
            y = height - data[i] / yStep + 2;
            dX = (dX + x) / 2;
            if (y > dY) {
                dY = ((dY + y) / 3) * 2;
            } else if (y < dY) {
                dY = (dY + y) / 3;
            }
            // ctx.quadraticCurveTo(x, y, dX, dY);
            ctx.lineTo(x, y);
        }
        ctx.stroke();
        if (endpoint) {
            ctx.beginPath();
            ctx.fillStyle = endpointColor;
            ctx.arc(x - 1, y, 2, 0, Math.PI * 2);
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

let notes = {},
    type;
if (document.querySelector(".sparkline")) {
    for (let sparkline of document.querySelectorAll(".sparkline")) {
        if (sparkline.hasAttribute("data-values")) {
            type = sparkline.id.replace("sparkline-", "");
            notes[type] = sparkline.getAttribute("data-values").split(",");
            buildSparkline(`sparkline-${type}`, notes[type]);
        }
    }
}

let wave = "triangle"; // "sine", "square", "sawtooth", "triangle"
let duration = 4000; // milliseconds
let keyStart = 41; // C♯4 / D♭4
let keyIntervals = [2, 3, 2, 2, 3]; // https://en.wikipedia.org/wiki/Pentatonic_scale
let keyInterval = 0;
let keyCount = 12;
let frequencies = [helpers.getFrequencyFromKeys(keyStart)];

for (let count = 0; count < keyCount; count++) {
    keyInterval = keyInterval + keyIntervals[count % keyIntervals.length];
    frequencies.push(helpers.getFrequencyFromKeys(keyStart + keyInterval));
}

for (let sparkline of document.querySelectorAll(".sparkline")) {
    sparkline.addEventListener("click", () => {
        playSparkline(notes[sparkline.id.replace("sparkline-", "")], frequencies, duration, wave);
        // Prevent the user from blowing their ears up by stacking sounds
        sparkline.classList.add("non-interactive");
        window.setTimeout(() => {
            sparkline.classList.remove("non-interactive");
        }, duration);
    });
}
