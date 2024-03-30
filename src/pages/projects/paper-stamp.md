---
title: "&lt;paper-stamp&gt;"
description: A Web Component to display an img as a paper stamp.
github: chrisburnell/paper-stamp
branch: main
npm: "@chrisburnell/paper-stamp"
emoji: 📬
license: MIT
tags:
  - html
  - javascript
  - package
  - web-components
---

<script type="module" src="/js/components/paper-stamp.js"></script>

<figure>
    <paper-stamp>
        <img src="/images/rolbie-stamp.png" alt="Rolbie stamp" loading="lazy" decoding="async" width="100" height="150" style="image-rendering: pixelated;">
    </paper-stamp>
</figure>

{% include 'package.njk' %}

<code>&lt;paper-stamp&gt;</code> is a native Web Component that displays an <code>&lt;img&gt;</code> as a paper stamp.

## Usage

You can begin using the <code>&lt;paper-stamp&gt;</code> Web Component by including a <code>&lt;script&gt;</code> tag in your HTML, with the component itself wrapping a <code>&lt;img&gt;</code>:

```html
<script type="module" src="paper-stamp.js"></script>

<paper-stamp>
	<img src="/image.png" alt="...">
</paper-stamp>
```

There are also a handful of attributes you can set which will override the appearance of the stamps.

### Custom stamp color

<figure>
    <paper-stamp color="cyan">
        <img src="/images/rolbie-stamp.png" alt="Rolbie stamp" loading="lazy" decoding="async" width="100" height="150" style="image-rendering: pixelated;">
    </paper-stamp>
</figure>

```html
<paper-stamp color="red">
	<img src="/image.png" alt="...">
</paper-stamp>
```

### Custom stamp padding

<figure>
    <paper-stamp padding="50px">
        <img src="/images/rolbie-stamp.png" alt="Rolbie stamp" loading="lazy" decoding="async" width="100" height="150" style="image-rendering: pixelated;">
    </paper-stamp>
</figure>

```html
<paper-stamp padding="50px">
	<img src="/image.png" alt="...">
</paper-stamp>
```

### Custom stamp perforation spacing

<figure>
    <paper-stamp spacing="6">
        <img src="/images/rolbie-stamp.png" alt="Rolbie stamp" loading="lazy" decoding="async" width="100" height="150" style="image-rendering: pixelated;">
    </paper-stamp>
</figure>

```html
<paper-stamp spacing="6">
	<img src="/image.png" alt="...">
</paper-stamp>
```

### Custom stamp perforation size

<figure>
    <paper-stamp perforation="15px">
        <img src="/images/rolbie-stamp.png" alt="Rolbie stamp" loading="lazy" decoding="async" width="100" height="150" style="image-rendering: pixelated;">
    </paper-stamp>
</figure>

```html
<paper-stamp perforation="15px">
	<img src="/image.png" alt="...">
</paper-stamp>
```

<style>
    @layer components {
        paper-stamp:not(:defined) {
            background-color: whitesmoke;
            padding: 15px;
        }
    }
</style>
