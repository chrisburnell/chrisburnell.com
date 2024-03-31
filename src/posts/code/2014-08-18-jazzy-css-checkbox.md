---
date: 2014-08-18T11:00:00+01:00
title: Jazzy CSS Checkbox
tags:
  - css
codepen_slug: Cbiun
syndicate_to:
  - https://codepen.io/chrisburnell/pen/Cbiun
---

<c-codepen slug="{{ codepen_slug }}" height="250px"></c-codepen>

```html
<input type="checkbox" id="jazzycheckbox" role="checkbox" aria-checked="false">
<label for="jazzycheckbox" class="check">Check me!</label>
```

```scss
html,
body {
	height: 100%;
}
body {
	font: 600 20px/3em sans-serif;
	position: relative;
}
input[type="checkbox"] {
	opacity: 0;
	position: absolute;
	left: 0;
	bottom: 100%;
}
.check {
	background-color: salmon;
	color: snow;
	display: block;
	padding: 0 2.5em;
	overflow: hidden;
	position: absolute;
	top: 50%;
	left: 50%;
	white-space: nowrap;
	cursor: pointer;
	user-select: none;
	border-radius: .375em;
	transform: translate3d(-50%, -50%, 0);
	transition: all .15s ease-in-out .1s;
	input[type="checkbox"]:focus + &,
	input[type="checkbox"]:checked:focus + & {
		box-shadow: 0 0 0 .3em rgba(black, .2);
	}
	input[type="checkbox"]:checked + & {
		background-color: darkseagreen;
		padding-right: 1.5em;
		padding-left: 3.5em;
	}
	&:before {
		content: "✔";
		font-size: 1.5em;
		position: absolute;
		top: 0;
		left: 1em;
		transform: translateX(-2em);
		transition: all .15s ease-in-out;
	}
	input[type="checkbox"]:checked + &:before {
		transform: none;
		transition: all .25s ease-in-out;
	}
}
```
