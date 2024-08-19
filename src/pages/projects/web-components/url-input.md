---
title: "&lt;url-input&gt;"
github: chrisburnell/url-input
branch: main
npm: "@chrisburnell/url-input"
emoji: 🔗
license: MIT
tags:
  - html
  - javascript
  - package
  - web-components
---

<noscript><p class=" [ box  box--error ] ">Unfortunately, this Web Component requires JavaScript to function correctly!</p></noscript>

<figure class=" [ box ] [ gamma ] [ requires-js ] ">
    <url-input><input type="url" style="font-size: 1em;"></url-input>
</figure>

{% include 'package.njk' %}

## Features

<code>&lt;url-input&gt;</code> is a native Web Component to add a protocol to URL inputs.

[Check out the demo page.](https://chrisburnell.github.io/url-input/demo.html)

## Installation

{% include 'installation.njk' %}

## Usage

You start using the <code>&lt;url-input&gt;</code> Web Component by including a <code>&lt;script&gt;</code> tag in your HTML:

```html
<script type="module" src="url-input.js"></script>
```

### General usage example

```html
<url-input><input type="url"></url-input>
```

### Force HTTPS

```html
<url-input force-https><input type="url"></url-input>
```

<script type="module" src="/js/components/url-input.js"></script>
