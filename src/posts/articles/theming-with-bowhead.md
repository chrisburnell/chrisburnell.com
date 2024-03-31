---
draft: true
date: 2021-06-17T09:30:00+01:00
title: "Theming with Bowhead"
description: "Bowhead, a small design token framework for SCSS and open source project of mine, works beautifully at its job. In this article, I'll explain how I extrapolated its capabilities to develop a robust way for applying colour-schemes across a website."
# tags:
#   - css
#   - scss
#   - design-systems
# syndicate_to:
#   - https://twitter.com/iamchrisburnell/status/
#   - https://mastodon.social/users/chrisburnell/statuses/
---

In my experience, the most common way that we see *theming* applied to a website or suite of websites is through the use of colour. And, with the widespread browser support for the `prefers-color-scheme` expression in media queries, we can now ask the user’s browser for their preference between <q>light</q> and <q>dark</q> schemes if the setting is available through their operating system or even through their browser.

But theming doesn’t end there! For a number of projects in the last few years at [Squiz](https://squiz.net), I’ve been tasked with developing a reusaable system for adapting a website’s design to work with multiple colour palettes. This means that for any given component in a design, there should be a way for a website editor to dictate which colour palette should be used, whether it be to represent different schools on a University’s website or to differ between branches of a government body.

First, let’s take a look at how we define colours to be consumed by *Bowhead*:

```scss
$color: (
	coal: #111111,
	tundora: #484848,
	chalice: #d2d2d2,
	alabaster: #f6f6f6
);
```

To keep in-line with Bowhead’s work in reducing mental overhead, let’s define some colour schemes, referring to the named colour tokens that we’ve passed to Bowhead:

```scss
$color-schemes: (
	light: (
		primary: alabatster,
		secondary: tundora
	),
	dark: (
		primary: coal,
		secondary: chalice
	)
);
```

Very simple example, but you can see from the values picked that we're setting up for a basic light/dark theme toggle, where we're switching the values around when going from light to dark or vice versa.

```scss
@mixin scheme($property, $key) {
	// Loop through all color schemes building classes and properties
	@each $scheme, $data in $color-schemes {
		@if map-has-key($data, $key) {
			.scheme--#{$scheme} & {
				@include v($property, map-get($data, $key));
			}
		}
	}
}
```

Used like so:

```scss
.component {
	@include scheme(background-color, primary);
	@include scheme(color, secondary);
}
```

to generate:

```css
.scheme--light .component {
	background-color: var(--color-alabaster);
	color: var(--color-tundora);
}
.scheme--dark .component {
	background-color: var(--color-coal);
	color: var(--color-chalice);
}
```
