---
date: 2013-12-04T12:00:00+0000
title: Cutaway Indicator
tags:
  - css
codepen_slug: yIwzd
---

<c-codepen slug="{{ codepen_slug }}" height="200px"></c-codepen>

```html
<button>Hover Me</button>
```

```scss
html,
body {
	height: 100%;
	position: relative;
}
body {
	background-color: rebeccapurple;
	background-image: linear-gradient(transparent 0%, coral 100%);
	font: 400 normal 24px/2em sans-serif;
}
button {
	background-color: gray;
	color: white;
	display: block;
	overflow: visible;
	padding: 1em 2em 1em 1em;
	border: 0;
	position: absolute;
	top: 50%;
	left: 50%;
	text-decoration: none;
	font-weight: 600;
	transform: translate3d(-50%, -50%, 0);
	&:before,
	&:after {
		content: "";
		width: 0;
		height: 0;
		border-right: 2.5em solid gray;
		position: absolute;
		right: 100%;
		transition: all .5s;
	}
	&:before {
		border-bottom: 3em solid transparent;
		top: 0;
	}
	&:hover:before,
	&:focus:before {
		border-right-color: rgba(green, .6);
	}
	&:after {
		border-top: 3em solid transparent;
		bottom: 0;
	}
	&:hover:after,
	&:focus:after {
		border-right-color: rgba(orange, .6);
	}
}
```
