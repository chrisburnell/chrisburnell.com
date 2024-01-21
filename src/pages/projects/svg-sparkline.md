---
draft: true
title: "&lt;svg-sparkline&gt;"
emoji: 📈
github: chrisburnell/svg-sparkline
branch: main
# npm: "@chrisburnell/svg-sparkline"
license: MIT
tags:
  - html
  - javascript
  - package
  - web-component
---

<figure>
    <svg-sparkline values="8,3,2,7,9,1,5,6,4,10,3,8,2,7,1,9" fill="true" curve="true"></svg-sparkline>
</figure>

{% include 'package.njk' %}

<code>&lt;svg-sparkline&gt;</code> is a native Web Component that builds a sparkline using SVGs in the element’s shadow root and includes a base set of styles to give it a decent appearance out of the box.

## Usage

You can begin using the <code>&lt;svg-sparkline&gt;</code> Web Component by including a <code>&lt;script&gt;</code> tag in your HTML, with the component itself wrapping a <code>&lt;select&gt;</code> element containing an <code>&lt;option&gt;</code> for each of the themes you want to provide to the user:

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
            <td><code>160</code></td>
            <td>TODO</td>
        </tr>
        <tr>
            <td><code>height</code></td>
            <td><code>28</code></td>
            <td>TODO</td>
        </tr>
        <tr>
            <td><code>color</code></td>
            <td><code>currentColor</code></td>
            <td>TODO</td>
        </tr>
        <tr>
            <td><code>curve</code></td>
            <td><code>false</code></td>
            <td>TODO</td>
        </tr>
        <tr>
            <td><code>animation-duration</code></td>
            <td><code>1s</code></td>
            <td>TODO</td>
        </tr>
        <tr>
            <td><code>endpoint</code></td>
            <td><code>true</code></td>
            <td>TODO</td>
        </tr>
        <tr>
            <td><code>endpoint-color</code></td>
            <td><code>color</code> attribute</td>
            <td>TODO</td>
        </tr>
        <tr>
            <td><code>endpoint-width</code></td>
            <td><code>6</code></td>
            <td>TODO</td>
        </tr>
        <tr>
            <td><code>fill</code></td>
            <td><code>false</code></td>
            <td>TODO</td>
        </tr>
        <tr>
            <td><code>gradient</code></td>
            <td><code>false</code></td>
            <td>TODO</td>
        </tr>
        <tr>
            <td><code>gradient-color</code></td>
            <td><code>color</code> attribute</td>
            <td>TODO</td>
        </tr>
        <tr>
            <td><code>line-width</code></td>
            <td><code>2</code></td>
            <td>TODO</td>
        </tr>
        <tr>
            <td><code>start-label</code></td>
            <td>—</td>
            <td>TODO</td>
        </tr>
        <tr>
            <td><code>end-label</code></td>
            <td>—</td>
            <td>TODO</td>
        </tr>
    </tbody>
</table>

## Further Reading

You can check out the full documentation, source code, and demos on GitHub, as well as provide feedback and report bugs on GitHub:

[https://github.com/chrisburnell/svg-sparkline](https://github.com/chrisburnell/svg-sparkline)
