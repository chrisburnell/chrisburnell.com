///
// Canvas Sparkline
// by Jeremy Keith <@adactio>
// https://github.com/adactio/Canvas-Sparkline
///
let sparkline = (canvas_id, data, endpoint, color, style, endpointColor) => {
    if (window.HTMLCanvasElement) {
        var c = document.getElementById(canvas_id),
            ctx = c.getContext('2d'),
            color = (color ? color : 'rgba(0,0,0,0.5)'),
            endpointColor = (endpointColor ? endpointColor : 'rgba(255,0,0,0.5)'),
            style = (style == 'bar' ? 'bar' : 'line'),
            height = c.height - 3,
            width = c.width,
            total = data.length,
            max = Math.max.apply(Math, data),
            xstep = width/total,
            ystep = max/height,
            x = 0,
            y = height - data[0]/ystep,
            i;
        if (window.devicePixelRatio) {
            c.width = c.width * window.devicePixelRatio;
            c.height = c.height * window.devicePixelRatio;
            c.style.width = (c.width / window.devicePixelRatio) + 'px';
            c.style.height = (c.height / window.devicePixelRatio) + 'px';
            c.style.display = 'inline-block';
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        }
        ctx.clearRect(0, 0, width, height);
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.moveTo(x, y);
        for (i = 1; i < total; i = i + 1) {
            x = x + xstep;
            y = height - data[i]/ystep + 2;
            if (style == 'bar') { ctx.moveTo(x,height); }
            ctx.lineTo(x, y);
        }
        ctx.stroke();
        if (endpoint && style == 'line') {
            ctx.beginPath();
            ctx.fillStyle = endpointColor;
            ctx.arc(x, y, 1.5, 0, Math.PI*2);
            ctx.fill();
        }
    }
};

///
// Play Sparkline
// Pass in an array of numbers ranging from 0 to 20.
// by Jeremy Keith <@adactio>
// https://gist.github.com/adactio/d988edc418aabfa2220456dc548dedc1
// Licensed under a CC0 1.0 Universal (CC0 1.0) Public Domain Dedication
// http://creativecommons.org/publicdomain/zero/1.0/
///
let playSparkline = (notes, frequencies = [440], duration = 3000, wave = 'sine', volume = 0.5) => {
    if (!window.AudioContext && !window.webkitAudioContext) {
        return;
    }
    let playing = null;
    let note = 0;
    let output = new (window.AudioContext || window.webkitAudioContext)();
    let instrument = output.createOscillator();
    let amplifier = output.createGain();
    let noteLength = Math.floor(duration / notes.length);
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
}
