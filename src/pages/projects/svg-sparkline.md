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

{% include 'package.njk' %}

<code>&lt;svg-sparkline&gt;</code> is a native Web Component that builds a sparkline using SVGs in the element’s shadow root and includes a base set of styles to give it a decent appearance out of the box.

## Usage

You can begin using the <code>&lt;svg-sparkline&gt;</code> Web Component by including a <code>&lt;script&gt;</code> tag in your HTML, with the component itself wrapping a <code>&lt;select&gt;</code> element containing an <code>&lt;option&gt;</code> for each of the themes you want to provide to the user:

```html
<script type="module" src="svg-sparkline.js"></script>

<svg-sparkline values="1,2,3,4,5,3,1></svg-sparkline>
```

To prevent <code>&lt;svg-sparkline&gt;</code> from appearing in browsers which either do not support Web Components or have JavaScript disabled, this small snippet of CSS will check if the element has been properly defined (to the browser’s understanding) and apply `display: none;` if not:

```css
svg-sparkline:not(:defined) {
    display: none;
}
```

There are a number of ways to augment and customise the functionality of the Web Component by attaching data attributes to <code>&lt;svg-sparkline&gt;</code>:

TODO

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
            <td><code>data-key</code></td>
            <td><code>theme</code></td>
            <td>Controls the name of the data attribute that holds the name of the currently-selected theme.</td>
        </tr>
        <tr>
            <td><code>data-dark-theme</code></td>
            <td><code>dark</code></td>
            <td>Controls the name of the <q>dark</q> theme which is applied when either the user’s browser/OS preference is set to <q>Dark</q> or they have specifically selected your custom dark theme.</td>
        </tr>
        <tr>
            <td><code>data-root-element</code></td>
            <td><code>document.documentElement</code></td>
            <td>When undefined, the theme data attribute will be applied to the document’s root element (<code>&lt;html&gt;</code>/<code>:root</code> in most cases).<br>When defined, this acts as a selector query to target a specific element in the document on which the theme data attribute is applied.</td>
        </tr>
        <tr>
            <td><code>data-transition-class</code></td>
            <td><code>theme-transitioning</code></td>
            <td>Controls the class name that is applied to the root element which you can use to apply CSS, to allow a smooth transition between themes.</td>
        </tr>
        <tr>
            <td><code>data-transition-duration</code></td>
            <td><code>1000</code></td>
            <td>Controls the amount of time (in *milliseconds*) that the transition class will be applied to the root element.</td>
        </tr>
    </tbody>
</table>

## Further Reading

You can check out the full documentation, source code, and demos on GitHub, as well as provide feedback and report bugs on GitHub:

[https://github.com/chrisburnell/svg-sparkline](https://github.com/chrisburnell/svg-sparkline)
