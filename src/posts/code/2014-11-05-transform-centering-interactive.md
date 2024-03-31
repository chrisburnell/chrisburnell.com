---
date: 2014-11-05T13:00:00+00:00
title: Power of Transform Centering - Interactive
tags:
  - css
codepen_slug: xutbs
syndicate_to:
  - https://codepen.io/chrisburnell/pen/xutbs
---

<c-codepen slug="{{ codepen_slug }}" height="500px"></c-codepen>

Check out the [demo version](/code/transform-centering/).

```html
<textarea class="modal" disabled></textarea>
```

```scss
html {
	box-sizing: border-box;
}
*, *:before, *:after {
	box-sizing: inherit;
}
html,
body {
	height: 100%;
}
body {
	position: relative;
	overflow: hidden;
}
.modal {
	width: 5em;
	min-width: 5em;
	max-width: 100%;
	height: 5em;
	min-height: 5em;
	max-height: 100%;
	border: 0;
	outline: none;
	position: absolute;
	top:  50%;
	left: 50%;
	transform: translate3d(-50%, -50%, 0);
}

```
