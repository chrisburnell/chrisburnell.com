---
title: "&lt;spark-line&gt;"
emoji: 📈
github: chrisburnell/spark-line
npm: "@chrisburnell/spark-line"
license: CC0
tags:
  - canvas
  - html
  - javascript
  - package
  - web-component
toc: true
js: spark-line.js
---

<figure>
    <c-spark-line values="0,0,2,5,7,13,13,18,14,11,19,44,37,37,38,27,23,9,6,5,6,1,1,2,1,0"></c-spark-line>
</figure>

<div class="box">
    <p><em>Hey, psst!…</em> You can jump straight down to the <a href="#examples">examples</a>!</p>
</div>

{% include 'package.njk' %}

## Installation

[Available on npm](https://www.npmjs.com/package/@chrisburnell/spark-line):

```bash
npm install @chrisburnell/spark-line --save-dev
```

You can also just download it directly [from GitHub](https://github.com/chrisburnell/spark-line):<br><samp>[https://github.com/chrisburnell/spark-line/archive/main.zip](https://github.com/chrisburnell/spark-line/archive/main.zip)</samp>

## Usage

This exposes/makes available a Custom HTML Element I’m calling <q>spark-line</q>. While this requires JavaScript on the front end, it makes the process of invoking and displaying sparklines for X,Y data very simple.

Include `spark-line.js` in your page however you like (as-is, as part of a build script, etc.).

Use `<spark-line>` in your HTML!

```html
<spark-line values="1,2,3,5,8,13,21"></spark-line>
```

The element takes a number of attributes:

<table>
    <thead>
        <tr>
            <td></td>
            <th>Values</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th><code>values</code><br><em>(required)</em></th>
            <td>
                comma-delimited string of integers
            </td>
            <td>defines the values of the graph</td>
        </tr>
        <tr>
            <th><code>line-width</code></th>
            <td style="white-space:nowrap">
                2 <em>(default)</em>
            </td>
            <td>defines the width/thickness of the line as an integer</td>
        </tr>
        <tr>
            <th><code>curve</code></th>
            <td style="white-space:nowrap">
                true <em>(default)</em>
            </td>
            <td>toggles applying curves (cardinal splines) to the line</td>
        </tr>
        <tr>
            <th><code>endpoint</code></th>
            <td style="white-space:nowrap">
                true <em>(default)</em>
            </td>
            <td>toggles the display of a point at the end of the line</td>
        </tr>
        <tr>
            <th><code>color</code></th>
            <td style="white-space:nowrap">
                currentColor <em>(default)</em>
            </td>
            <td>defines the color of the line</td>
        </tr>
        <tr>
            <th><code>endpoint-color</code></th>
            <td style="white-space:nowrap">
                <code>color</code> <em>(default)</em>
            </td>
            <td>defines the color of the endpoint</td>
        </tr>
        <tr>
            <th><code>points</code></th>
            <td>
                comma-delimited string of integers
            </td>
            <td>supercedes <code>endpoint</code><br>comma-delimited string of integers representing at which pairing <code>values</code> you want points to appear at<br>arrays of a length less than the length of the <code>values</code> array will be looped over according to <code>values</code></td>
        </tr>
        <tr>
            <th><code>colors</code></th>
            <td>
                comma-delimited string of integers
            </td>
            <td>supercedes <code>endpoint-color</code><br>comma-delimited string of integers representing the colour of the paired <code>points</code><br>arrays of a length less than the length of the <code>values</code> array will be looped over according to <code>values</code></td>
        </tr>
        <tr>
            <th><code>start-label</code></th>
            <td>
                string
            </td>
            <td>creates a label before the graph</td>
        </tr>
        <tr>
            <th><code>end-label</code></th>
            <td>
                string
            </td>
            <td>creates a label after the graph</td>
        </tr>
    </tbody>
</table>


## Examples

<div class=" [ grid ] [ shelf ] ">
    <article>
        <c-spark-line values="0,0,0,0,0,0,0,0,4,0,0,4,9,1,4,5,2,4,2,6,4,6,4,6,5,0"></c-spark-line>
        <p><em>default</em></p>
    </article>
    <article>
        <c-spark-line values="0,0,0,0,0,0,0,0,4,0,0,4,9,1,4,5,2,4,2,6,4,6,4,6,5,0" lineWidth="4"></c-spark-line>
        <p><code>line-width="4"</code></p>
    </article>
    <article>
        <c-spark-line values="0,0,0,0,0,0,0,0,4,0,0,4,9,1,4,5,2,4,2,6,4,6,4,6,5,0" curve="false"></c-spark-line>
        <p><code>curve="false"</code></p>
    </article>
    <article>
        <c-spark-line values="0,0,0,0,0,0,0,0,4,0,0,4,9,1,4,5,2,4,2,6,4,6,4,6,5,0" endpoint="false"></c-spark-line>
        <p><code>endpoint="false"</code></p>
    </article>
    <article>
        <c-spark-line values="0,0,0,0,0,0,0,0,4,0,0,4,9,1,4,5,2,4,2,6,4,6,4,6,5,0" color="rebeccapurple"></c-spark-line>
        <p><code>color="rebeccapurple"</code></p>
    </article>
    <article>
        <c-spark-line values="0,0,0,0,0,0,0,0,4,0,0,4,9,1,4,5,2,4,2,6,4,6,4,6,5,0" endpointColor="red"></c-spark-line>
        <p><code>endpoint-color="red"</code></p>
    </article>
    <article>
        <c-spark-line values="0,0,0,0,0,0,0,0,4,0,0,4,9,1,4,5,2,4,2,6,4,6,4,6,5,0" points="1"></c-spark-line>
        <p><code>points="1"</code></p>
    </article>
    <article>
        <c-spark-line values="0,0,0,0,0,0,0,0,4,0,0,4,9,1,4,5,2,4,2,6,4,6,4,6,5,0" points="1,0" curve="false"></c-spark-line>
        <p><code>points="1,0"</code></p>
    </article>
    <article>
        <c-spark-line values="0,0,0,0,0,0,0,0,4,0,0,4,9,1,4,5,2,4,2,6,4,6,4,6,5,0" points="0,2,0,1" curve="false"></c-spark-line>
        <p><code>points="0,2,0,1"</code></p>
    </article>
    <article>
        <c-spark-line values="0,0,0,0,0,0,0,0,4,0,0,4,9,1,4,5,2,4,2,6,4,6,4,6,5,0" endpointColor="red" points="0,2,0,1" curve="false"></c-spark-line>
        <p><code>endpoint-color="red" points="0,2,0,1"</code></p>
    </article>
    <article>
        <c-spark-line values="0,0,0,0,0,0,0,0,4,0,0,4,9,1,4,5,2,4,2,6,4,6,4,6,5,0" colors="red" curve="false"></c-spark-line>
        <p><code>colors="red"</code></p>
    </article>
    <article>
        <c-spark-line values="0,0,0,0,0,0,0,0,4,0,0,4,9,1,4,5,2,4,2,6,4,6,4,6,5,0" points="1" colors="rebeccapurple" curve="false"></c-spark-line>
        <p><code>points="1" colors="rebeccapurple"</code></p>
    </article>
    <article>
        <c-spark-line values="0,0,0,0,0,0,0,0,4,0,0,4,9,1,4,5,2,4,2,6,4,6,4,6,5,0" points="1" colors="red,green,blue" curve="false"></c-spark-line>
        <p><code>points="1" colors="red,green,blue"</code></p>
    </article>
    <article>
        <c-spark-line values="0,0,0,0,0,0,0,0,4,0,0,4,9,1,4,5,2,4,2,6,4,6,4,6,5,0" points="1" colors="red,red,red,red,red,red,red,red,green,red,red,green,violet,orange,green,blue,yellow,green,yellow,cyan,green,cyan,green,cyan,blue,red" curve="false"></c-spark-line>
        <p><em>rainbow!</em></p>
    </article>
    <article>
        <c-spark-line values="0,0,0,0,0,0,0,0,4,0,0,4,9,1,4,5,2,4,2,6,4,6,4,6,5,0" startLabel="Start" end-label="End"></c-spark-line>
        <p><code>start-label="Start" end-label="End"</code></p>
    </article>
</div>

## Interactive Example

*That’s right! All spark-lines are dynamic out-of-the-box!*

<!-- </textarea> -->
<!-- '"´ -->
<form>
    <fieldset>
        <label><input id="input-values" type="text" pattern="[0-9]+" inputmode="numeric" value="12321" maxlength="26"> Values</label>
        <br>
        <label><input id="input-line-width" type="text" pattern="[1-5]" value="2" inputmode="numeric"> Line Width</label>
        <br>
        <label><input id="input-curve" type="checkbox" checked> Curve</label>
        <br>
        <label><input id="input-endpoint" type="checkbox" checked> Endpoint</label>
        <br>
        <label><input id="input-color" type="color" value="#000000"> Color</label>
        <br>
        <label><input id="input-endpoint-color" type="color" value="#000000"> Endpoint Color</label>
    </fieldset>
    <spark-line values="1,2,3,2,1" id="sparkline" style="margin-block-start: 0; align-self: center; justify-self: center;"></spark-line>
    <noscript>Requires JavaScript, unfortunately.</noscript>
</form>
