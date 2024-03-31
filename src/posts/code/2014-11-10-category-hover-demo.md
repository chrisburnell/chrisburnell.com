---
date: 2014-11-10T12:00:00+00:00
title: Category Hover Demo
tags:
  - css
codepen_slug: mybQEL
syndicate_to:
  - https://codepen.io/chrisburnell/pen/mybQEL
---

<c-codepen slug="{{ codepen_slug }}" height="525px"></c-codepen>

```html
<div class="modal">
	<div class="card  archipelago">
		<a href="#" class="card-category">
			<span>Archipelago</span>
		</a>
	</div>
	<div class="card  butte">
		<a href="#" class="card-category">
			<span>Butte</span>
		</a>
	</div>
	<div class="card  canyon">
		<a href="#" class="card-category">
			<span>Canyon</span>
		</a>
	</div>
	<div class="card  dune">
		<a href="#" class="card-category">
			<span>Dune</span>
		</a>
	</div>
	<div class="card  estuary">
		<a href="#" class="card-category">
			<span>Estuary</span>
		</a>
	</div>
</div>
```

```scss
// Website Colour Palette
$white:		#FFFFFF;
$black:		#000000;
$gray:		 #333333;
$gray-light:   #999999;
$gray-lighter: #EEEEEE;
$red:		  #B02A1A;

// Category Colour Palette
.card-category {
	.archipelago & {
		background-color: mediumseagreen;
		color: mediumseagreen;
	}
	.butte & {
		background-color: brown;
		color: brown;
	}
	.canyon & {
		background-color: burlywood;
		color: burlywood;
	}
	.dune & {
		background-color: lightcoral;
		color: lightcoral;
	}
	.estuary & {
		background-color: darkslateblue;
		color: darkslateblue;
	}
}

// Go Go border-box!
html {
	box-sizing: border-box;
}
*, *:before, *:after {
	box-sizing: inherit;
}

.modal {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate3d(-50%, -50%, 0);
}

// Imagine this is part of an article
// card, as part of a gallery-style list
.card {
	width: 20em;
	max-width: 90%;
	padding: 1.5em 0;
	border-left:  1px solid $gray-lighter;
	border-right: 1px solid $gray-lighter;
}

.card-category {
	background-image: linear-gradient(transparent 0, transparent .5em, $white .5em, $white 100%);
	background-repeat: no-repeat;
	width: 100%;
	height: 2.875em;
	display: block;
	border-bottom: 0 !important;
	position: relative;
	text-decoration: none;
	transition: background .15s, color .15s;
	transform: translate3d(0, 0, 0);
	&:hover,
	&:focus,
	&:active {
		background-position: top 3em left;
		color: $white !important;
	}
	span {
		display: block;
		margin-top: -0.35em;
		padding-bottom: .35em;
		border-bottom: 1px solid $gray-light;
		position: absolute;
		top: 50%;
		left: 1em;
		right: 1em;
		overflow: hidden;
		font-family: "Open Sans";
		text-transform: uppercase;
		transition: border-bottom-color 0 linear .15s, margin .15s ease;
		&:after {
			content: "\F0DA";
			opacity: 0;
			color: $white;
			display: block;
			margin-top: -0.75em;
			position: absolute;
			top: 50%;
			right: 100%;
			font-family: "FontAwesome";
			font-weight: bold;
			transition: opacity .1s ease, right 0 linear .15s;
		}
	}
	&:hover span,
	&:focus span,
	&:active span {
		border-bottom-color: transparent;
		margin-top: -0.714em;
		text-shadow: 0 1px 1px rgba($black, .2);
		transition: margin .15s ease;
		&:after {
			opacity: 1;
			right: 0;
			text-shadow: 0 1px 1px rgba($black, .2);
			transition: opacity .1s ease .05s, right .15s;
		}
	}
}
```
