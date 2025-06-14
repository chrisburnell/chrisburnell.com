---
title: "&lt;instant-photo&gt;"
emoji: 🌃
github: chrisburnell/instant-photo
branch: main
npm: "@chrisburnell/instant-photo"
license: MIT
tags:
  - html
  - javascript
  - package
  - web-components
---

<figure>
    <instant-photo develop notext>
        <img src="/images/avatar@4x.jpeg" alt="A photograph of Chris Burnell’s face from 2018 (times flies…)" class=" [ canada ] " width="400" height="400">
    </instant-photo>
</figure>

{% include 'package.njk' %}

<code>&lt;instant-photo&gt;</code> is a native Web Component that presents an image as if it’s a developing/developed instant photograph, and includes a set of styles to give it a decent appearance out of the box.

## Installation

{% include 'installation.njk' %}

## Usage

You can begin using the <code>&lt;instant-photo&gt;</code> Web Component by including a <code>&lt;script&gt;</code> tag in your HTML, with the component itself wrapping a <code>&lt;img&gt;</code>:

```html
<script type="module" src="instant-photo.js"></script>

<instant-photo>
	<img src="/image.jpeg" alt="...">
</instant-photo>
```

There are also a handful of CSS variables that you can set which will override the default behaviour and appearance of the instant photos. This is useful if you want to set up some defaults to override all instant photos on your website:

```css
:root {
	/* override the color of the color behind the image (for develop) */
	--instant-photo-background-color: rebeccapurple;

	/* override the color of the border */
	--instant-photo-border-color: red;

	/* override the duration of the developing photo animation */
	--instant-photo-develop-duration: 5s;

	/* override the delay before the developing photo animation */
	--instant-photo-develop-delay: 5s;
}
```

## Further Reading

You can check out the full documentation, source code, and demos on GitHub, as well as provide feedback and report bugs on GitHub:

[https://github.com/chrisburnell/instant-photo](https://github.com/chrisburnell/instant-photo)

<script type="module">{% include '../../../../node_modules/@chrisburnell/instant-photo/instant-photo.js' %}</script>
