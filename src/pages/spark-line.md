---
title: spark-line
eleventyComputed:
  tagline: "spark-line v{{ pkg.dependencies['@chrisburnell/spark-line'] | replace('^', '') }}"
  lede: "Turn any array of integers into a fun little chart. Lends well to <a href=\"/pentatonic/\">“automusic”</a>.<br>There are {{ github.spark-line['stargazers_count'] }} star-gazers <a href='https://github.com/chrisburnell/spark-line'>on GitHub</a> and it was downloaded {{ npm.spark-line['downloads'] }} times in the last month <a href='https://www.npmjs.com/package/@chrisburnell/spark-line'>on npm</a>."
show_webmentions: true
---

<figure>
    <spark-line values="0,0,2,5,7,13,13,18,14,11,19,44,37,37,38,27,23,9,6,5,6,1,1,2,1,0" endpoint-color="#eb2d36"></spark-line>
</figure>

<div class="box">
    <p>Hey, psst!… You can jump straight down to the <a href="#examples">examples</a>!</p>
</div>

## Installation

Yoink it [from npm](https://www.npmjs.com/package/@chrisburnell/spark-line):

```
npm install @chrisburnell/spark-line
```

You can also just download it directly [from GitHub](https://github.com/chrisburnell/spark-line):<br><samp>[https://github.com/chrisburnell/spark-line/archive/main.zip](https://github.com/chrisburnell/spark-line/archive/main.zip)</samp>


## Usage

This exposes/makes available a Custom HTML Element I’m calling <q>spark-line</q>. While this requires JavaScript on the front-end, it makes the process of invoking and displaying sparklines for X,Y data very simple.

Include `spark-line.js` in your page however you like (as-is, as part of a build script, etc.).

Use `<spark-line>` in your HTML!

```html
<spark-line values="1,2,3,5,8,13,21"></spark-line>
```

Element attributes:

- `values`: comma-delimited string of integers *(required)*
- `line-width`: defines the width/thickness of the line as an integer *(default = 2)*
- `curve`: toggles applying curves (cardinal splines) to the line *(default = true)*
- `endpoint`: toggles the display of a point at the end of the line *(default = true)*
- `color`: defines the color of the line *(default = currentColor)*
- `endpoint-color`: defines the color of the endpoint *(defaults to whatever color is defined as)*


## Examples

<div class=" [ shelf ] ">
    <article>
        <spark-line values="0,0,0,0,0,0,0,0,4,0,0,4,9,1,4,5,2,4,2,6,4,6,4,6,5,0"></spark-line>
        <p><em>default</em></p>
    </article>
    <article>
        <spark-line values="0,0,0,0,0,0,0,0,4,0,0,4,9,1,4,5,2,4,2,6,4,6,4,6,5,0" line-width="4"></spark-line>
        <p><code>line-width="4"</code></p>
    </article>
    <article>
        <spark-line values="0,0,0,0,0,0,0,0,4,0,0,4,9,1,4,5,2,4,2,6,4,6,4,6,5,0" curve="false"></spark-line>
        <p><code>curve="false"</code></p>
    </article>
    <article>
        <spark-line values="0,0,0,0,0,0,0,0,4,0,0,4,9,1,4,5,2,4,2,6,4,6,4,6,5,0" endpoint="false"></spark-line>
        <p><code>endpoint="false"</code></p>
    </article>
    <article>
        <spark-line values="0,0,0,0,0,0,0,0,4,0,0,4,9,1,4,5,2,4,2,6,4,6,4,6,5,0" color="rebeccapurple"></spark-line>
        <p><code>color="rebeccapurple"</code></p>
    </article>
    <article>
        <spark-line values="0,0,0,0,0,0,0,0,4,0,0,4,9,1,4,5,2,4,2,6,4,6,4,6,5,0" endpoint-color="red"></spark-line>
        <p><code>endpoint-color="red"</code></p>
    </article>
</div>


## Interactive Example

*That’s right! All spark-lines are dynamic out-of-the-box!*

<form>
    <fieldset>
        <label><input id="input-values" type="text" pattern="[0-9]+" value="12321" maxlength="26" oninput="processSparkline()"> Values</label>
        <br>
        <label><input id="input-line-width" type="number" min="1" step="1" value="2" max="5" oninput="processSparkline()"> Line Width</label>
        <br>
        <label><input id="input-curve" type="checkbox" checked oninput="processSparkline()"> Curve</label>
        <br>
        <label><input id="input-endpoint" type="checkbox" checked oninput="processSparkline()"> Endpoint</label>
        <br>
        <label><input id="input-color" type="color" value="#000000" oninput="processSparkline()"> Color</label>
        <br>
        <label><input id="input-endpoint-color" type="color" value="#000000" oninput="processSparkline()"> Endpoint Color</label>
    </fieldset>
    <spark-line id="sparkline" class="pentatonic"></spark-line>
    <style>
        [id="sparkline"] {
            margin-block-start: 0;
            align-self: center;
            justify-self: center;
        }
    </style>
    <script>
        let inputValues = document.querySelector("#input-values");
        let inputCurve = document.querySelector("#input-curve");
        let inputEndpoint = document.querySelector("#input-endpoint");
        let inputLineWidth = document.querySelector("#input-line-width");
        let inputColor = document.querySelector("#input-color");
        let inputEndpointColor = document.querySelector("#input-endpoint-color");
        let customSparkline = document.querySelector("#sparkline");
        function processSparkline() {
            // strip non-numbers from the input
            inputValues.value = inputValues.value.replace(/(?![0-9])./gmi, "");
            // set attributes of the custom sparkline
            customSparkline.setAttribute("curve", inputCurve.checked);
            customSparkline.setAttribute("endpoint", inputEndpoint.checked);
            customSparkline.setAttribute("line-width", inputLineWidth.value);
            customSparkline.setAttribute("color", inputColor.value);
            customSparkline.setAttribute("endpoint-color", inputEndpointColor.value);
            customSparkline.setAttribute("values", inputValues.value.split(""));
        }
        ;(function() {
            processSparkline();
        })();
    </script>
    <noscript>Requires JavaScript, unfortunately.</noscript>
</form>
