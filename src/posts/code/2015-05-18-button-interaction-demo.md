---
date: 2015-05-18T13:07:00+0100
title: Button Interaction Demo
tags:
  - css
  - motion
codepen_slug: RPRwoo
syndicate_to:
  - https://codepen.io/chrisburnell/pen/RPRwoo
---

<c-codepen slug="{{ codepen_slug }}" height="300px"></c-codepen>

```html
<button>Hello!</button>
```

```scss
$black: #0d0d0d;
$gray: #1d1d1d;
$brand: #8cddff;
$brand-alt: #f473ff;

button {
	font-size: 4em;
	background: none;
	color: $brand;
	display: block;
	padding: .125em .25em;
	border: 0;
	position: relative;
	font-weight: 600;
	white-space: nowrap;
	text-decoration: none;
	&:before {
		content: "";
		background-color: $black;
		width: 0;
		height: 100%;
		border-bottom: .125em solid rgba($brand, 0.6);
		border-radius: .0625em;
		position: absolute;
		top: 0;
		left: auto;
		right: 0;
		z-index: -1;
		transition: width .2s ease;
	}
	&:hover,
	&:focus,
	&:active {
		color: $brand-alt;
		outline: none;
		&:before {
			width: 100%;
			border-bottom-color: rgba($brand-alt, 0.6);
			left: 0;
			right: auto;
		}
	}
}
```
