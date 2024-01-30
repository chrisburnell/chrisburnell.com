---
title: "&lt;spark-line&gt;"
emoji: 📈
github: chrisburnell/spark-line
branch: main
npm: "@chrisburnell/spark-line"
license: CC0
tags:
  - canvas
  - html
  - javascript
  - package
  - web-component
toc: true
---

<script type="module" src="/js/components/spark-line.js"></script>

<noscript><p>Unfortunately, this page requires JavaScript to display sparklines and use the interactive example.</p></noscript>

<figure>
	<spark-line values="0,0,2,5,7,13,13,18,14,11,19,44,37,37,38,27,23,9,6,5,6,1,1,2,1,0"></spark-line>
</figure>

<div class="box">
	<p><em>Hey, psst!…</em> You can jump straight down to the <a href="#examples">examples</a>!</p>
</div>

{% include 'package.njk' %}

## Installation

{% include 'installation.njk' %}

## Usage

This package exposes/makes available a Custom HTML Element I’m calling <q>spark-line</q>. While this requires JavaScript on the front end, it makes the process of invoking and displaying sparklines for X,Y data very simple.

Include `spark-line.js` in your page however you like, as an import to your existing JS:

```javascript
import "@chrisburnell/spark-line/spark-line"
```

Or as its own reference in your HTML:

```html
<script type="module" src="`/spark-line.js"></script>
```

Then you can start using `<spark-line>`!

```html
<spark-line values="1,2,3,5,8,13,21"></spark-line>
```

--------

The element takes a number of attributes:

<table>
    <thead>
        <tr>
            <th> </th>
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
            <th><code>stroke-width</code></th>
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

## is-land

Since this custom Web Component requires JavaScript to function, it could be a good idea to put it behind some kind of partial hydration. For my site, in particular, I’ve decided to use [`<is-land>`](https://github.com/11ty/is-land), which works as <q>a framework independent partial hydration islands architecture implementation</q>.

If you wanted to use `<is-land>` as well, I recommend something like the following as a solid baseline:

```html
<is-land on:visible>
	<spark-line webc:keep :values="this.values" :curve="this.curve" :color="this.color" :colors="this.colors" :endpoint-color="this['endpoint-color']" :points="this.points" :line-width="this['line-width']" :start-label="this['start-label']" :end-label="this['end-label']"></spark-line>

	<template webc:raw data-island="once">
		<script type="module" :src="`/js/components/spark-line.js`"></script>
	</template>
</is-land>
```

## Examples

<div class=" [ grid ] [ shelf ] ">
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
		<spark-line values="0,0,0,0,0,0,0,0,4,0,0,4,9,1,4,5,2,4,2,6,4,6,4,6,5,0" points="1"></spark-line>
		<p><code>points="1"</code></p>
	</article>
	<article>
		<spark-line values="0,0,0,0,0,0,0,0,4,0,0,4,9,1,4,5,2,4,2,6,4,6,4,6,5,0" points="1,0"></spark-line>
		<p><code>points="1,0"</code></p>
	</article>
	<article>
		<spark-line values="0,0,0,0,0,0,0,0,4,0,0,4,9,1,4,5,2,4,2,6,4,6,4,6,5,0" points="0,2,0,1"></spark-line>
		<p><code>points="0,2,0,1"</code></p>
	</article>
	<article>
		<spark-line values="0,0,0,0,0,0,0,0,4,0,0,4,9,1,4,5,2,4,2,6,4,6,4,6,5,0" endpoint-color="rebeccapurple" points="0,2,0,1"></spark-line>
		<p><code>endpoint-color="rebeccapurple" points="0,2,0,1"</code></p>
	</article>
	<article>
		<spark-line values="0,0,0,0,0,0,0,0,4,0,0,4,9,1,4,5,2,4,2,6,4,6,4,6,5,0" colors="rebeccapurple"></spark-line>
		<p><code>colors="rebeccapurple"</code></p>
	</article>
	<article>
		<spark-line values="0,0,0,0,0,0,0,0,4,0,0,4,9,1,4,5,2,4,2,6,4,6,4,6,5,0" points="1" colors="rebeccapurple"></spark-line>
		<p><code>points="1" colors="rebeccapurple"</code></p>
	</article>
	<article>
		<spark-line values="0,0,0,0,0,0,0,0,4,0,0,4,9,1,4,5,2,4,2,6,4,6,4,6,5,0" points="1" colors="red,green,blue"></spark-line>
		<p><code>points="1" colors="red,green,blue"</code></p>
	</article>
	<article>
		<spark-line values="0,0,0,0,0,0,0,0,4,0,0,4,9,1,4,5,2,4,2,6,4,6,4,6,5,0" points="1" colors="red,red,red,red,red,red,red,red,green,red,red,green,violet,orange,green,blue,yellow,green,yellow,cyan,green,cyan,green,cyan,blue,red"></spark-line>
		<p><em>rainbow!</em></p>
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
	<spark-line values="1,2,3,2,1" id="interactive-sparkline" style="margin-block-start: 0; align-self: center; justify-self: center;"></spark-line>
	<fieldset>
		<label><input id="input-values" type="text" pattern="[0-9]+" inputmode="numeric" value="12321" maxlength="26"> Values</label>
		<br>
		<label><input id="input-line-width" type="text" pattern="[1-5]" inputmode="numeric" value="2" maxlength="1"> Line Width</label>
		<br>
		<label><input id="input-curve" type="checkbox" checked> Curve</label>
		<br>
		<label><input id="input-endpoint" type="checkbox" checked> Endpoint</label>
		<br>
		<label><input id="input-color" type="color" value="#4f4f4f"> Color</label>
		<br>
		<label><input id="input-endpoint-color" type="color" value="#e0151f"> Endpoint Color</label>
	</fieldset>
</form>

{% js 'module' -%}
/**
 * Interactive Sparkline
 * @class
 */
class InteractiveSparkline {
	/**
	 * @constructor
	 */
	constructor() {
		this.inputs = {
			inputValues: document.querySelector("#input-values"),
			inputLineWidth: document.querySelector("#input-line-width"),
			inputCurve: document.querySelector("#input-curve"),
			inputEndpoint: document.querySelector("#input-endpoint"),
			inputColor: document.querySelector("#input-color"),
			inputEndpointColor: document.querySelector("#input-endpoint-color"),
			component: document.querySelector("#interactive-sparkline"),
		}

		this.processSparkline(this.inputs)
		Object.values(this.inputs).forEach((input) => {
			input.addEventListener("change", () => {
				this.processSparkline(this.inputs)
			})
			input.addEventListener("input", () => {
				this.processSparkline(this.inputs)
			})
		})
	}

	/**
	 * Build the sparkline based on the given input values.
	 * @param {Object} inputs
	 */
	processSparkline(inputs) {
		// strip non-numbers from the input
		inputs.inputValues.value = inputs.inputValues.value.replace(/(?![0-9])./gim, "")
		inputs.inputLineWidth.value = inputs.inputLineWidth.value.replace(/(?![0-9])./gim, "")

		inputs.component.setAttribute("values", inputs.inputValues.value.split(""))
		inputs.component.setAttribute("line-width", inputs.inputLineWidth.value)
		inputs.component.setAttribute("curve", inputs.inputCurve.checked)
		inputs.component.setAttribute("endpoint", inputs.inputEndpoint.checked)
		inputs.component.setAttribute("color", inputs.inputColor.value)
		inputs.component.setAttribute("endpoint-color", inputs.inputEndpointColor.value)
	}
}

if ("HTMLElement" in window) {
	/**
	 * @type {InteractiveSparkline}
	 */
	window.InteractiveSparkline = new InteractiveSparkline()
}

/**
 * @type {InteractiveSparkline}
 */
export default InteractiveSparkline
{%- endjs %}
