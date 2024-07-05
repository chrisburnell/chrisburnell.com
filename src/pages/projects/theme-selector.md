---
title: "&lt;theme-selector&gt;"
emoji: 🎨
github: chrisburnell/theme-selector
branch: main
npm: "@chrisburnell/theme-selector"
license: MIT
tags:
  - html
  - javascript
  - package
  - web-components
---

<div id="updated" class=" [ updated ] [ box  box--warning ] [ flow ] ">
    <p>Even though I had a great time building out and testing this Web Component, I’m currently using <a href="https://darn.es/storage-form-web-component/"><code>&lt;storage-form&gt;</code></a> by <a href="https://darn.es">David Darnes</a> to handle toggling of themes for its simplicity and ability to be used in a much wider array of situations!</p>
</div>

{% include 'package.njk' %}

<code>&lt;theme-selector&gt;</code> is a native Web Component that adds functionality on top of the native HTML <code>&lt;select&gt;</code> element that adds the ability for to set a user-preferred theme across your website that persists between pages and visits by saving the choice in local storage.

## Installation

{% include 'installation.njk' %}

## Usage

You can begin using the <code>&lt;theme-selector&gt;</code> Web Component by including a <code>&lt;script&gt;</code> tag in your HTML, with the component itself wrapping a <code>&lt;select&gt;</code> element containing an <code>&lt;option&gt;</code> for each of the themes you want to provide to the user:

```html
<script type="module" src="theme-selector.js"></script>

<theme-selector>
    <select autocomplete="off">
        <option value="light">
            Light
        </option>
        <option value="dark">
            Dark
        </option>
    </select>
</theme-selector>
```

To prevent <code>&lt;theme-selector&gt;</code> from appearing in browsers which either do not support Web Components or have JavaScript disabled, this small snippet of CSS will check if the element has been properly defined (to the browser’s understanding) and apply `display: none;` if not:

```css
theme-selector:not(:defined) {
    display: none;
}
```

There are a number of ways to augment and customise the functionality of the Web Component by attaching data attributes to <code>&lt;theme-selector&gt;</code>:

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

[https://github.com/chrisburnell/theme-selector](https://github.com/chrisburnell/theme-selector)
