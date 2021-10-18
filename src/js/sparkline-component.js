/*!    Curve function for canvas 2.3.8
 *    (c) Epistemex 2013-2018
 *    www.epistemex.com
 *    License: MIT
 */

/**
 * Draws a cardinal spline through given point array. Points must be arranged
 * as: [x1, y1, x2, y2, ..., xn, yn]. It adds the points to the current path.
 *
 * There must be a minimum of two points in the input array but the function
 * is only useful where there are three points or more.
 *
 * The method continues previous path of the context. If you don't want that
 * then you need to use moveTo() with the first point from the input array.
 *
 * The points for the cardinal spline are returned as a new array.
 *
 * @param {CanvasRenderingContext2D} ctx - context to use
 * @param {Array} points - point array
 * @param {Number} [tension=0.5] - tension. Typically between [0.0, 1.0] but can be exceeded
 * @param {Number} [numOfSeg=25] - number of segments between two points (line resolution)
 * @param {Boolean} [close=false] - Close the ends making the line continuous
 * @returns {Float32Array} New array with the calculated points that was added to the path
 */
function curve(ctx, points, tension, numOfSeg, close) {

    'use strict';

    if (typeof points === "undefined" || points.length < 2) return new Float32Array(0);

    // options or defaults
    tension = typeof tension === "number" ? tension : 0.5;
    numOfSeg = typeof numOfSeg === "number" ? numOfSeg : 25;

    var pts,                                                            // for cloning point array
        i = 1,
        l = points.length,
        rPos = 0,
        rLen = (l-2) * numOfSeg + 2 + (close ? 2 * numOfSeg: 0),
        res = new Float32Array(rLen),
        cache = new Float32Array((numOfSeg + 2) << 2),
        cachePtr = 4;

    pts = points.slice(0);

    if (close) {
        pts.unshift(points[l - 1]);                                        // insert end point as first point
        pts.unshift(points[l - 2]);
        pts.push(points[0], points[1]);                                 // first point as last point
    }
    else {
        pts.unshift(points[1]);                                            // copy 1. point and insert at beginning
        pts.unshift(points[0]);
        pts.push(points[l - 2], points[l - 1]);                            // duplicate end-points
    }

    // cache inner-loop calculations as they are based on t alone
    cache[0] = 1;                                                        // 1,0,0,0

    for (; i < numOfSeg; i++) {

        var st = i / numOfSeg,
            st2 = st * st,
            st3 = st2 * st,
            st23 = st3 * 2,
            st32 = st2 * 3;

        cache[cachePtr++] =    st23 - st32 + 1;                            // c1
        cache[cachePtr++] =    st32 - st23;                                // c2
        cache[cachePtr++] =    st3 - 2 * st2 + st;                            // c3
        cache[cachePtr++] =    st3 - st2;                                    // c4
    }

    cache[++cachePtr] = 1;                                                // 0,1,0,0

    // calc. points
    parse(pts, cache, l, tension);

    if (close) {
        pts = [];
        pts.push(points[l - 4], points[l - 3],
                 points[l - 2], points[l - 1],                             // second last and last
                 points[0], points[1],
                 points[2], points[3]);                                 // first and second
        parse(pts, cache, 4, tension);
    }

    function parse(pts, cache, l, tension) {

        for (var i = 2, t; i < l; i += 2) {

            var pt1 = pts[i],
                pt2 = pts[i+1],
                pt3 = pts[i+2],
                pt4 = pts[i+3],

                t1x = (pt3 - pts[i-2]) * tension,
                t1y = (pt4 - pts[i-1]) * tension,
                t2x = (pts[i+4] - pt1) * tension,
                t2y = (pts[i+5] - pt2) * tension,
                c = 0, c1, c2, c3, c4;

            for (t = 0; t < numOfSeg; t++) {

                c1 = cache[c++];
                c2 = cache[c++];
                c3 = cache[c++];
                c4 = cache[c++];

                res[rPos++] = c1 * pt1 + c2 * pt3 + c3 * t1x + c4 * t2x;
                res[rPos++] = c1 * pt2 + c2 * pt4 + c3 * t1y + c4 * t2y;
            }
        }
    }

    // add last point
    l = close ? 0 : points.length - 2;
    res[rPos++] = points[l++];
    res[rPos] = points[l];

    // add lines to path
    for(i = 0, l = res.length; i < l; i += 2)
        ctx.lineTo(res[i], res[i+1]);

    return res
}

;(function() {
    if (!("customElements" in window) || !("HTMLCanvasElement" in window)) {
        return;
    }

    const NAME = "sparkline-component";

    customElements.define(NAME, class extends HTMLElement {
        connectedCallback() {
            this.values = this.getAttribute("values");
            this.width = parseFloat(this.getAttribute("width")) || 160;
            this.height = parseFloat(this.getAttribute("height")) || 28;
            this.lineWidth = parseFloat(this.getAttribute("line-width")) || 2;
            this.curve = this.getAttribute("curve") !== "false";
            this.endpoint = this.getAttribute("endpoint") !== "false";
            this.color = this.getAttribute("color") || "hsla(0, 0%, 31%, 1)";
            this.endpointColor = this.getAttribute("endpoint-color") || "hsla(357, 83%, 55%, 0.5)";

            if (!this.values) {
                console.log(`Missing \`values\` attribute in <${NAME}>`);
                return;
            }

            this.init();
        }

        async init() {
            this.appendChild(this.render(this.values.match(/\d+/g)));
        }

        render(values) {
            const canvas = document.createElement("canvas");
            canvas.className = "sparkline";
            canvas.width = this.width;
            canvas.height = this.height;
            canvas.tabIndex = "0";

            let ctx = canvas.getContext("2d");
            let max = Math.max.apply(Math, values);
            let xStep = (this.width - (this.lineWidth * 2)) / (values.length - 1);
            let yStep = (this.height - this.lineWidth * 3) / max;

            ctx.clearRect(0, 0, this.width, this.height);
            ctx.beginPath();
            ctx.translate(0.5, 0.5);
            ctx.strokeStyle = this.color;
            ctx.lineWidth = this.lineWidth;

            let coordinates = [];
            for (let i in values) {
                let x = this.lineWidth + (i * xStep);
                let y = this.height - (this.lineWidth * 1.5) - (values[i] * yStep);
                if (this.curve) {
                    coordinates.push(x);
                    coordinates.push(y);
                }
                else if (i === 0) {
                    ctx.moveTo(x, y);
                }
                else {
                    ctx.lineTo(x, y);
                }
            }
            if (this.curve) {
                curve(ctx, coordinates, 0.5, 25, false);
            }
            ctx.stroke();

            if (this.endpoint) {
                ctx.beginPath();
                ctx.fillStyle = this.endpointColor;
                ctx.arc(coordinates[coordinates.length - 2] - (this.lineWidth / 2), coordinates[coordinates.length - 1], this.lineWidth * 1.5, 0, Math.PI * 2);
                ctx.fill();
            }

            return canvas;
        }
    });
})();
