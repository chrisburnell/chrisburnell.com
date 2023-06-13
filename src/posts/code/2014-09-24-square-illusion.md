---
date: 2014-09-24T12:00:00+0100
title: Square Illusion
tags:
  - css
  - motion
codepen_slug: IKHhC
codepen_featured: true
---

<c-codepen slug="{{ codepen_slug }}" height="500px"></c-codepen>

```html
<div class="container">
	<div class="square  square-1"></div>
	<div class="square  square-2"></div>
	<div class="circle  circle-1"></div>
	<div class="circle  circle-2"></div>
	<div class="circle  circle-3"></div>
	<div class="circle  circle-4"></div>
</div>
```

```scss
html {
	box-sizing: border-box;
}
*,
*:before,
*:after {
	box-sizing: inherit;
}
html,
body {
	height: 100%;
}
body {
	background-color: black;
	position: relative;
	overflow: hidden;
}
.container {
	width: 30%;
	width: 25vw;
	height: 30%;
	height: 25vw;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate3d(-50%, -50%, 0);
	cursor: help;
}
.square {
	width: 70%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 50%;
	transform: translateX(-50%);
	border-top: 10px solid mediumseagreen;
	border-top: 1.5vw solid mediumseagreen;
	border-bottom: 10px solid mediumseagreen;
	border-bottom: 1.5vw solid mediumseagreen;
	animation-duration: 1s;
	animation-iteration-count: infinite;
	animation-timing-function: linear;
}
.square-1 {
	transform: translateX(-50%) rotate(45deg);
	animation-name: square-1;
}
.square-2 {
	transform: translateX(-50%) rotate(-45deg);
	animation-name: square-2;

}
@keyframes square-1 {
	0%, 100% {
		transform: translateX(-60%) translateY(7%) rotate(45deg);
	}
	25%, 75% {
		transform: translateX(-50%) translateY(0) rotate(45deg);
	}
	50% {
		transform: translateX(-40%) translateY(-7%) rotate(45deg);
	}
}

@keyframes square-2 {
	0%, 50%, 100% {
		transform: translateX(-50%) translateY(0) rotate(-45deg);
	}
	25% {
		transform: translateX(-40%) translateY(7%) rotate(-45deg);
	}
	75% {
		transform: translateX(-60%) translateY(-7%) rotate(-45deg);
	}
}

.circle {
	background-color: coral;
	opacity: 0;
	width: 30%;
	width: 9vw;
	height: 30%;
	height: 9vw;
	text-align: center;
	font-size: 5vw;
	line-height: 9vw;
	position: absolute;
	overflow: hidden;
	text-indent: 100%;
	border-radius: 50%;
	transition: opacity .2s;
	animation-duration: 4s;
	animation-iteration-count: infinite;
	animation-timing-function: linear;
	.container:hover &,
	.container:focus & {
		opacity: 1;
	}
	&:hover,
	&:focus {
		text-indent: 0;
	}
}
.circle-1 {
	top: 0;
	left: 50%;
	transform: translateX(-50%) translateY(-100%);
}
.circle-2 {
	bottom: 0;
	left: 50%;
	transform: translateX(-50%) translateY(100%);
}
.circle-3 {
	top: 50%;
	left: 0;
	transform: translateX(-100%) translateY(-50%);
}
.circle-4 {
	top: 50%;
	right: 0;
	transform: translateX(100%) translateY(-50%);
}

.container:before,
.container:after {
	color: white;
	font-size: 3vw;
	white-space: nowrap;
	position: absolute;
	top:  50%;
	left: 50%;
	transform: translate3d(-50%, -50%, 0);
	transition: opacity .5s;
}
.container:before {
	content: "Hover me!";
	opacity: .8;
}
.container:hover:before {
	opacity: 0;
}
.container:after {
	content: "Whoa...";
	opacity: 0;
}
.container:hover:after {
	opacity: .5;
}
```
