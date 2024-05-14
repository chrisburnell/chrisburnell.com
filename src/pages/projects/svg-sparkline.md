---
title: "&lt;svg-sparkline&gt;"
emoji: 📈
github: chrisburnell/svg-sparkline
branch: main
npm: "@chrisburnell/svg-sparkline"
license: MIT
tags:
  - html
  - javascript
  - package
  - web-components
---

<figure>
    <svg-sparkline class=" [ requires-js ] " values="8,3,2,7,9,1,5,6,4,10,3,8,2,7,1,9" fill="true" curve="true"></svg-sparkline>
    <noscript><p class=" [ box  box--error ] ">Unfortunately, this Web Component requires JavaScript to function correctly!</p></noscript>
</figure>

{% include 'package.njk' %}

<code>&lt;svg-sparkline&gt;</code> is a native Web Component that builds a sparkline using SVGs in the element’s shadow root and includes a base set of styles to give it a decent appearance out of the box.

<div class=" [ grid ] [ requires-js ] " style="--min-inline-size: 212px;">
	<article style="display: grid; place-items: center;">
		<svg-sparkline values="0,0,0,0,0,0,0,0,4,0,0,4,9,1,4,5,2,4,2,6,4,6,4,6,5,4" gradient-color="var(--color-raven)" fill="true" endpoint-color="var(--color-maple)" curve="true" animate="true" start-label="Start" end-label="End"></svg-sparkline>
	</article>
	<article class="sparkline-dark" style="display: grid; place-items: center;">
		<svg-sparkline values="0,0,0,0,0,0,0,0,4,0,0,4,9,1,4,5,2,4,2,6,4,6,4,6,5,4" gradient-color="var(--color-raven)" fill="true" endpoint-color="var(--color-maple)" curve="true" animate="true" start-label="Start" end-label="End"></svg-sparkline>
	</article>
	<article style="display: grid; place-items: center;">
		<svg-sparkline values="0,0,0,0,0,0,0,0,4,0,0,4,9,1,4,5,2,4,2,6,4,6,4,6,5,4" endpoint-color="var(--color-maple)"></svg-sparkline>
	</article>
	<article style="display: grid; place-items: center;">
		<svg-sparkline values="0,0,0,0,0,0,0,0,4,0,0,4,9,1,4,5,2,4,2,6,4,6,4,6,5,4" endpoint="false"></svg-sparkline>
	</article>
	<article style="display: grid; place-items: center;">
		<svg-sparkline values="0,0,0,0,0,0,0,0,4,0,0,4,9,1,4,5,2,4,2,6,4,6,4,6,5,4" gradient="true" gradient-color="var(--color-rss)" endpoint-color="var(--color-maple)"></svg-sparkline>
	</article>
	<article style="display: grid; place-items: center;" data-theme="matrix">
		<svg-sparkline values="0,0,0,0,0,0,0,0,4,0,0,4,9,1,4,5,2,4,2,6,4,6,4,6,5,4" gradient-color="var(--color-raven)" fill="true" endpoint-color="var(--color-maple)" curve="true"></svg-sparkline>
	</article>
	<article style="display: grid; place-items: center;" data-theme="koala">
		<svg-sparkline values="0,0,0,0,0,0,0,0,4,0,0,4,9,1,4,5,2,4,2,6,4,6,4,6,5,4" gradient-color="var(--color-raven)" fill="true" endpoint-color="var(--color-maple)" curve="true"></svg-sparkline>
	</article>
	<article style="display: grid; place-items: center;" data-theme="red-alert">
		<svg-sparkline values="0,0,0,0,0,0,0,0,4,0,0,4,9,1,4,5,2,4,2,6,4,6,4,6,5,4" gradient-color="var(--color-raven)" fill="true" endpoint-color="var(--color-maple)" curve="true"></svg-sparkline>
	</article>
</div>

## Usage

You can begin using the <code>&lt;svg-sparkline&gt;</code> Web Component by including a <code>&lt;script&gt;</code> tag in your HTML and setting a <code>values</code> attribute containing comma-separated numbers to build into a sparkline:

```html
<script type="module" src="svg-sparkline.js"></script>

<svg-sparkline values="8,3,2,7,9,1,5,6,4,10,3,8,2,7,1,9"></svg-sparkline>
```

To prevent <code>&lt;svg-sparkline&gt;</code> from appearing in browsers which either do not support Web Components or have JavaScript disabled, this small snippet of CSS will check if the element has been properly defined (to the browser’s understanding) and apply `display: none;` if not:

```css
svg-sparkline:not(:defined) {
  display: none;
}
```

You may also want to set some dimensions ahead of time to your component to help prevent cumulative layout shift:

```css
svg-sparkline {
  inline-size: 212px;
  block-size: 48px;

  &:is([start-label], [end-label]) {
    block-size: 78px;
  }
}
```

There are a number of ways to augment and customise the functionality of the Web Component by attaching attributes to <code>&lt;svg-sparkline&gt;</code>:

<table>
    <thead>
        <tr>
            <th>option</th>
            <th>default value</th>
            <th>description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code>values</code></td>
            <td><strong>Required</strong></td>
            <td>Controls the name of the data attribute that holds the name of the currently-selected theme.</td>
        </tr>
        <tr>
            <td><code>width</code></td>
            <td><code>200</code></td>
            <td>Sets the width of the sparkline SVGs.</td>
        </tr>
        <tr>
            <td><code>height</code></td>
            <td><code>36</code></td>
            <td>Sets the height of the sparkline SVGs.</td>
        </tr>
        <tr>
            <td><code>color</code></td>
            <td><code>currentColor</code></td>
            <td>Sets the color of the sparkline lines (and endpoint if not set)</td>
        </tr>
        <tr>
            <td><code>curve</code></td>
            <td><code>false</code></td>
            <td>When set to <code>true</true>, will use <code>bezier</code> curves between points instead of straight lines</td>
        </tr>
        <tr>
            <td><code>endpoint</code></td>
            <td><code>true</code></td>
            <td>Controls whether or not to show an endpoint</td>
        </tr>
        <tr>
            <td><code>endpoint-color</code></td>
            <td><code>color</code> attribute</td>
            <td>Sets the color of the endpoint (if visible)</td>
        </tr>
        <tr>
            <td><code>endpoint-width</code></td>
            <td><code>6</code></td>
            <td>Controls the width/diameter of the endpoint</td>
        </tr>
        <tr>
            <td><code>fill</code></td>
            <td><code>false</code></td>
            <td>When set to <code>true</code>, will fill underneath the sparkline with a solid color</td>
        </tr>
        <tr>
            <td><code>gradient</code></td>
            <td><code>false</code></td>
            <td>When set to <code>true</code>, will fill underneath the sparkline with a gradient going from the <code>gradient-color</code> to <code>transparent</code></td>
        </tr>
        <tr>
            <td><code>gradient-color</code> / <code>fill-color</code></td>
            <td><code>color</code> attribute</td>
            <td>Sets the color of the gradient / fill underneath the sparkline</td>
        </tr>
        <tr>
            <td><code>line-width</code></td>
            <td><code>2</code></td>
            <td>Controls the width of the stroke used to draw the sparkline</td>
        </tr>
        <tr>
            <td><code>start-label</code></td>
            <td>—</td>
            <td>Adds a label that appears on the bottom left of the sparkline</td>
        </tr>
        <tr>
            <td><code>end-label</code></td>
            <td>—</td>
            <td>Adds a label that appears on the bottom right of the sparkline</td>
        </tr>
        <tr>
            <td><code>animation-duration</code></td>
            <td><code>1s</code></td>
            <td>Sets the duration of the animation for animated sparklines</td>
        </tr>
        <tr>
            <td><code>animation-delay</code></td>
            <td><code>animation-duration</code> attribute + <code>1s</code></td>
            <td>Sets the delay before the animation for animated sparklines</td>
        </tr>
    </tbody>
</table>

There are also a handful of CSS variables that you can set which will override the default behaviour and appearance of the sparklines. This is useful if you want to set up some defaults to override all sparklines on your website:

```css
:root {
  /* override the color of the line (and endpoint, if not set) */
  --svg-sparkline-color: red;

  /* override the color of the endpoint */
  --svg-sparkline-endpoint-color: rebeccapurple;

  /* override the color of the gradient/fill for sparklines with either */
  --svg-sparkline-gradient-color: coral;

  /* override the padding around the SVGs and start/end labels */
  --svg-sparkline-padding: 1rem;

  /* override the duration of the animation for animated sparklines */
  --svg-sparkline-animation-duration: 2s;

  /* override the delay before the animation for animated sparklines */
  --svg-sparkline-animation-delay: 2s;

  /* override the delay before drawing the sparkline */
  --svg-sparkline-animation-first-delay: 2s;

  /* override the delay before the endpoint and labels appear */
  --svg-sparkline-animation-second-delay: 2s;
}
```

## Further Reading

You can check out the full documentation, source code, demos, and provide feedback and report bugs on GitHub:

[https://github.com/chrisburnell/svg-sparkline](https://github.com/chrisburnell/svg-sparkline)

{%- css %}
@layer overrides {
    .sparkline-dark {
        background-color: var(--color-kaiser);
        color: var(--color-snowy);
    }
    @media (prefers-color-scheme: dark) {
        :root:not(:has([name="color-scheme"] [value*="light"]:checked), .light, [data-color-scheme*="light"]) .sparkline-dark {
            background-color: var(--color-snowy);
            color: var(--color-kaiser);
        }
    }
    :root:has([name="color-scheme"] [value*="dark"]:checked):not(.light, [data-color-scheme*="light"]) .sparkline-dark,
    [data-color-scheme*="dark"] .sparkline-dark,
    .dark .sparkline-dark {
        background-color: var(--color-snowy);
        color: var(--color-kaiser);
    }
}
{% endcss %}
<script type="module">{% include '../../../node_modules/@chrisburnell/svg-sparkline/svg-sparkline.js' %}</script>
