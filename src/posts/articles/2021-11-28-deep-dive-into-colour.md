---
updated: 2022-05-11T17:10:00+0100
date: 2021-11-28T10:00:00+0000
title: Deep Dive into Colour
description: How to make powerful use of CSS Variables, colour spaces, and the cascade using Bowhead.
tags:
  - css
  - css-variables
  - design-systems
  - scss
syndicate_to:
  - https://twitter.com/iamchrisburnell/status/1465268696440582148
redirect_from:
  - /article/deep-dive-into-color
---

Even though I publicly released [Bowhead](/bowhead/) a little over a year ago, I’ve been using it across my website and other projects for some years now. In that time, it has evolved and changed, but the core principle of *what it does* has never changed: assign any reused CSS values to variables and put them into <q>value-type</q> maps which correspond to specific CSS properties and refer to your property-values through these maps.

<div class=" [ box ] [ flow ] ">
	<h2>What’s Bowhead?</h2>
	<p><em>Bowhead</em> is a small SCSS framework on which to implement your design tokens, spitting out CSS Variables with optional fallbacks. You can read more about it on the <a href="/bowhead/">Bowhead page</a>.</p>
</div>

As with the passing of time, technology matures and becomes more widespread and common, and with that, I decided to overhaul the way I refer to colours in my (S)CSS through the power of CSS Variables and HSL.

## Initial setup

To start off, what are we working with—how do I manage and print colours at present?

This is pretty well-documented (I hope) on the [Bowhead page](/bowhead/) but in essence, I’m passing *Bowhead* something that looks like this for colours:

```scss
$palette: (
	lynx: #091217,
	raven: #5f8aa6,
	maple: #eb2d36,
);
$tokens: (
	...
	colors: $palette,
	...
);
```

And I’m using that map of colours like so:

```scss
.class {
	@include v(color, raven);
}
```

```css
.class {
	color: var(--color-raven);
}
```

This works, but it spins out of control when I introduce a map of opacities, with the intention that for each colour in the `colors` map there should be a version of the colour at each opacity in the opacities map. For this, I turned to a loop and ended up generating a CSS Variable for each of these possible values:

```scss
$opacities: (
	alpha: 0.9,
	beta: 0.5,
	gamma: 0.1,
	delta: 0.05,
);
$palette: (
	lynx: #091217,
	raven: #5f8aa6,
	maple: #eb2d36,
);
@each $name, $color in $palette {
	@each $friendly, $value in $opacities {
		$palette: map-merge(
			$palette,
			(
				#{$name}--#{$friendly}: rgba($color, $value)
			)
		);
	}
```

And this generates four new CSS Variables for each colour in the palette, so I can use them like so:

```scss
.class {
	@include v(color, raven--beta);
}
```

```css
.class {
	color: var(--color-raven--beta);
}
```

## Gradient of complexity

Because I seem to enjoy a challenge, one of the criteria for this overhaul was to make it no more difficult to manage the colour schemes I use around my website as well, the `dark` colour scheme you can toggle in the footer in particular. As you can imagine, this became a lot of colours to keep track of and override per colour scheme for each palette colour and each opacity variation on those colours.

Enter HSL, or Hue Saturation Lightness, an alternative way to express colours on the web. [Lea Verou](https://lea.verou.me) has written about [more exciting colour spaces](https://lea.verou.me/2020/04/lch-colors-in-css-what-why-and-how/) coming to browsers near you soon. HSL, at the least, offers me the ability mix and match colours and opacities with a lot more simplicity. It's difficult to understand what the output of mixing `#5f8aa6` and an opacity of `50%` might be, but with HSLA (or even eight-character hex or RGB, to be fair) it's easy to see how `hsl(203deg 29% 51%)` would become `hsla(203deg 29% 51% / 50%)`.

So now comes the task of taking my palette and generating the same list in HSL format to pass to *Bowhead* to generate my CSS Variables for me:

```scss
@use "sass:color";
$hsl-palette: ();
@each $name, $color in $palette {
	// name: Xdeg Y% Z%
	$hsl-palette: map-merge($hsl-palette, (#{$name}: #{color.hue($color)} #{color.saturation($color)} #{color.lightness($color)}));
}
```

And now we can use them like so:

```scss
.class {
	color: hsl(#{v(hsl, raven)});
	/* or */
	color: hsla(#{v(hsl, raven)}, #{v(opacity, beta)});
}
```

And because I reuse this pattern so often, and it's a bit unwieldy, I ended up creating a function to handle HSL(A) colours for me even further:

```scss
///
/// Return an HLS(A) color
///
/// @param {String} $value - key from `hsl` map
/// @param {String} $opacity [null] - key from `opacity` map
///
/// @throw Error if no parameter is passed.
///
/// @return {Color}
///
@function h($value, $opacity: null) {
	@if not $value {
		@warn "`h()` expects one parameter.";
		@return false;
	}

	@if not $opacity {
		@return hsl(v(hsl, $value));
	}
	@return hsla(v(hsl, $value) / v(opacity, $opacity));
}
```

Accessing the HSL versions of my colours and applying opacities against them is now terse and understandable:

```scss
.class {
	color: h(raven);
	/* or */
	color: h(raven, beta);
}
```

```css
.class {
	color: hsl(var(--hsl-raven));
	/* or */
	color: hsla(var(--hsl-raven) / var(--opacity-beta));
}
```

## What this means

Because all my references to colours in my CSS now rely on the CSS Variables for my HSL values, I can harness the power of the cascade to make swift and easy changes to colours in my HTML. For example, I apply a different theme to my [HTTP Status pages](https://chrisburnell.com/418.html) by changing the named HSL values inside a class:

```scss
@use "sass:color";
$red-alert-palette: (
	lynx: #270a0a,
	wolf: #4c1313,
	bowhead: #822020,
	raven: #c62d2d,
	highland: #e06969,
	coyote: #efadad,
	bear: #fbe9e9,
);
.red-alert {
	@each $name, $color in $red-alert-palette {
		--hsl-#{$name}: #{color.hue($color)} #{color.saturation($color)} #{color.lightness($color)};
	}
}
```

And by applying that class to an element, those new values are both applied to itself and its children, so to target the entire page is as quick as:

```html
<html class="red-alert">
```

Or inside a box like this:

<blockquote class=" [ red-alert ] ">
	<p>I'm not sure why this is such a great thing, to be fair, though…</p>
</blockquote>

Or inside a table like this:

<table class=" [ silly ] ">
	<thead>
		<tr>
			<th>Heading A</th>
			<th>Heading B</th>
			<th>Heading C</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>Cell A-1</td>
			<td>Cell B-1</td>
			<td>Cell C-1</td>
		</tr>
		<tr>
			<td>Cell A-2</td>
			<td>Cell B-2</td>
			<td>Cell C-2</td>
		</tr>
	</tbody>
	<tfoot>
		<tr>
			<th>Foot A</th>
			<th>Foot B</th>
			<th>Foot C</th>
		</tr>
	</tfoot>
</table>

--------

Hope that explains how my colours now work, and please do get in touch if you’re familiar with *Bowhead* and can think of an intelligent way that this might be integrated into the framework itself!
