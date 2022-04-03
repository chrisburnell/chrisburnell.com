---
title: "&lt;spark-line&gt;"
emoji: 📈
eleventyComputed:
  date: "{{ github[page.fileSlug].created_at }}"
  updated: "{{ github[page.fileSlug].updated_at }}"
  tagline: "&lt;spark-line&gt; v{{ pkg.dependencies['@chrisburnell/spark-line'] | replace('^', '') }}"
  description: "{{ github[page.fileSlug].description }} Lends well to <a href=\"/pentatonic/\">“automusic”</a>."
tags:
  - package
  - web-component
toc: true
js: spark-line.js
---

<figure>
    <spark-line values="0,0,2,5,7,13,13,18,14,11,19,44,37,37,38,27,23,9,6,5,6,1,1,2,1,0" key-start="23" endpoint-color="#eb2d36" class="pentatonic"></spark-line>
</figure>

<div class="box">
    <p>Hey, psst!… You can jump straight down to the <a href="#examples">examples</a>!</p>
</div>

## Installation

[Available on npm](https://www.npmjs.com/package/@chrisburnell/spark-line):

```bash
npm install @chrisburnell/spark-line --save-dev
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
- `start-label`: creates a label before the chart
- `end-label`: creates a label after the chart

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
    <article>
        <spark-line values="0,0,0,0,0,0,0,0,4,0,0,4,9,1,4,5,2,4,2,6,4,6,4,6,5,0" start-label="Start" end-label="End"></spark-line>
        <p><code>start-label="Start" end-label="End"</code></p>
    </article>
</div>

## Interactive Example

*That’s right! All spark-lines are dynamic out-of-the-box!*

<!-- </textarea> -->
<!-- '"´ -->
<form>
    <fieldset>
        <label><input id="input-values" type="text" pattern="[0-9]+" value="12321" maxlength="26"> Values</label>
        <br>
        <label><input id="input-line-width" type="number" min="1" step="1" value="2" max="5"> Line Width</label>
        <br>
        <label><input id="input-curve" type="checkbox" checked> Curve</label>
        <br>
        <label><input id="input-endpoint" type="checkbox" checked> Endpoint</label>
        <br>
        <label><input id="input-color" type="color" value="#000000"> Color</label>
        <br>
        <label><input id="input-endpoint-color" type="color" value="#000000"> Endpoint Color</label>
    </fieldset>
    <spark-line id="sparkline" class="pentatonic"></spark-line>
    <style>
        [id="sparkline"] {
            margin-block-start: 0;
            align-self: center;
            justify-self: center;
        }
    </style>
    <noscript>Requires JavaScript, unfortunately.</noscript>
</form>
