---
title: Sparklines
lede: "Turn any array of integers into a fun little chart. Lends well to “automusic”."
show_webmentions: true
---

<figure>
    <sparkline-component values="0,0,2,5,7,13,13,18,14,11,19,44,37,37,38,27,23,9,6,5,6,1,1,2,1,0"></sparkline-component>
</figure>

<div class="box">
    <p>Hey, psst!… You can jump straight down to the <a href="#examples">examples</a>!</p>
</div>

## Installation

Yoink it [from npm](https://www.npmjs.com/package/@chrisburnell/pentatonic):

```
npm install @chrisburnell/pentatonic
```

You can also just download it directly [from GitHub](https://github.com/chrisburnell/pentatonic):<br><samp>[https://github.com/chrisburnell/pentatonic/archive/master.zip](https://github.com/chrisburnell/pentatonic/archive/master.zip)</samp>


## Usage

This exposes/makes available a Custom HTML Element I’m calling a <q>sparkline-component</q>. While this requires JavaScript on the front-end, it makes the process of invoking and displaying sparklines for X,Y data very simple.

```html
<sparkline-component values="1,2,3,5,8,13,21"></sparkline-component>
```


## Examples

<sparkline-component values="0,0,0,0,0,0,0,0,4,0,0,4,9,1,4,5,2,4,2,6,4,6,4,6,5,0"></sparkline-component>

<sparkline-component values="0,0,0,0,0,0,0,0,4,0,0,4,9,1,4,5,2,4,2,6,4,6,4,6,5,0" curve="false"></sparkline-component>

Type some numbers in the input field below and a playable sparkline will be built!

<form>
    <fieldset>
        <label><input id="input-values" type="text" pattern="[0-9]+" value="12321" maxlength="26" oninput="processSparkline()"> Values</label>
        <br>
        <label><input id="input-line-width" type="number" min="1" value="2" max="5" oninput="processSparkline()"> Line Width</label>
        <br>
        <label><input id="input-curve" type="checkbox" checked oninput="processSparkline()"> Curve</label>
        <br>
        <label><input id="input-endpoint" type="checkbox" checked oninput="processSparkline()"> Endpoint</label>
        <br>
        <label><input id="input-color" type="color" value="#4f4f4f" oninput="processSparkline()"> Color</label>
        <br>
        <label><input id="input-endpoint-color" type="color" value="#EB2D37" oninput="processSparkline()"> Endpoint Color</label>
    </fieldset>
    <sparkline-component id="sparkline" values="1,2,3,2,1" line-width="2" curve="true" endpoint="true" color="#4f4f4f" endpoint-color="#EB2D37"></sparkline-component>
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
    </script>
    <noscript>Requires JavaScript, unfortunately.</noscript>
</form>
