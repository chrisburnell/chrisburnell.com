///
// Canvas Sparkline
// by Jeremy Keith <@adactio>, modified by Chris Burnell <me@chrisburnell.com>
// https://github.com/adactio/Canvas-Sparkline
// Licensed under a CC0 1.0 Universal (CC0 1.0) Public Domain Dedication
// http://creativecommons.org/publicdomain/zero/1.0/
///
let sparkline = (id, data, width = 160, height = 21, endpoint = true, color = "hsla(0, 0%, 31%, 1)", endpointColor = "hsla(357, 83%, 55%, 0.5)") => {
    if (window.HTMLCanvasElement) {
        var c = document.getElementById(id),
            ctx = c.getContext("2d"),
            total = data.length,
            max = Math.max.apply(Math, data),
            xStep = (width - 2) / (total - 1),
            yStep = max / height,
            x = 0,
            y = height - data[0] / yStep + 2;
        if (window.devicePixelRatio) {
            c.width = 160 * window.devicePixelRatio;
            c.height = 24 * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        }
        ctx.clearRect(0, 0, width, height);
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.moveTo(x, y);
        for (let i in data) {
            if (i != 0) {
                x = x + xStep;
                y = height - data[i] / yStep + 2;
                ctx.lineTo(x, y);
            }
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
