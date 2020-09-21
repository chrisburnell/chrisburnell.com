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
            }
            else if (y < dY) {
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

for (let sparkline of document.querySelectorAll(".sparkline")) {
    if (sparkline.hasAttribute("data-values")) {
        buildSparkline(sparkline.id, sparkline.getAttribute("data-values").split(","));
    }
}
