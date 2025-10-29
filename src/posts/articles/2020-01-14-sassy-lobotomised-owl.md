---
updated: 2021-11-29T15:30:00+0000
updated_text: This post expands on concepts and a mixin from a previous post, <a href="/article/variables-for-both/">Variables for Both</a>, and a more recent project, <a href="/bowhead/">Bowhead</a>, which I recommend you to read if you’re interested in the context around how the <samp>v</samp> mixin is used.<br><br><a href="#the-solution"><em>Skip to the full <samp>owl</samp> mixin solution.</em></a>
date: 2020-01-14T12:20:00+0000
title: "Sassy Lobotomised Owl"
description: "Managing spacing between elements and components on your page can be a tiring task if undertaken manually. This is where the lobotomised owl comes in: a short, simple snippet of CSS that simplifies this whole process for you. In this article I’ll explain how I make use of it in a more dynamic way using a SCSS mixin."
banner:
  url: sassy-lobotomised-owl.jpeg
  alt: an up-close photo of an owl's face with darkness behind it
tags:
  - css
  - scss
syndicate_to:
  - https://twitter.com/iamchrisburnell/status/1220678282590531584
redirect_from:
  - /article/sassy-lobotomized-owl
---

The <a href="https://alistapart.com/article/axiomatic-css-and-lobotomized-owls/" rel="external noopener">lobotomised owl</a> technique, given graciously to us by the incredibly talented <a href="https://heydonworks.com" rel="external noopener">Heydon Pickering</a>, takes away a great deal of pain that comes with setting up sensible spacing between elements and components on your page. Instead of specifically defining `margin-bottom`/`margin-top` for each component, we’ll make use of the <samp>* + *</samp> selector in CSS to perform the following:

> For every direct child element of X which is not the first direct child of X, apply a `margin-top`.

*And almost as if by magic*, you’ll have a robust spacing system in place. All you need to do is decide which elements <samp>X</samp> can represent, and what the value of <samp>margin-top</samp> is going to be.

## Working Backwards

Let’s say our goal is to end up with the following CSS output:

```css
body > * + * {
	margin-top: 4em;
}

main > * + * {
	margin-top: 2em;
}

article > * + * {
	margin-top: 1em;
}
```

Let’s start things off by pumping the excitement all the way up to **3**. At its simplest, the mixin looks like this:

```scss
@mixin owl($size) {
	& > * + * {
		margin-top: $size;
	}
}
```

In fact, if we know that more often than not we'll be using a specific value, we can use a default parameter value, like so:

```scss
@mixin owl($size: 1em) {
	& > * + * {
		margin-top: $size;
	}
}
```

And we can use it like so:

```scss
body {
	@include owl(4em);
}

main {
	@include owl(2em);
}

article,
aside {
	@include owl;
}
```

--------

But now let’s take the excitement up to to **4**.

Using the same concepts, and, in particular, the <a href="/article/variables-for-both/"><samp>v</samp> mixin</a> that I introduced in [Variables for Both](/article/variables-for-both/) and have refined recently with a project called [Bowhead](/bowhead/), we need to set up some SCSS variables and assign them within a Map so that we can iterate through them and reference them using our chosen familiar words—<samp>small</samp>, <samp>medium</samp>, and <samp>large</samp> in this case.

```scss
$size-large:  4em;
$size-medium: 2em;
$size-small:  1em;

$sizes: (
	large:  $size-large,
	medium: $size-medium,
	small:  $size-small
)

:root {
	@each $key, $value in $sizes {
		--size-#{$key}: #{$value};
	}
}
```

And using *Bowhead* I can now rewrite my <samp>owl</samp> mixin with the above configuration in place.

```scss
@mixin owl($size: small) {
	& > * + * {
		@include v(margin-top, $size);
	}
}
```

In congruency with the methodology behind *Bowhead*, we’ve now abstracted away the need to remember or look up the numeric values for the various sizes you might be using, and can instead refer to them as you might think about them or speak about them—using words like <samp>small</samp>, <samp>medium</samp>, <samp>large</samp>, and so on:

```scss
body {
	@include owl(large);
}

main {
	@include owl(medium);
}

article,
aside {
	@include owl;
}
```

## The Solution

```scss
@mixin owl($size: small) {
	@if not map-has-key($sizes, $size) {
		@error "There is no size named #{$size} in `$sizes`. size should be one of #{map-keys($sizes)}.";
	}

	& > * + * {
		@include v(margin-top, $size);
	}
}

body {
	@include owl(large);
}

main {
	@include owl(medium);
}

article,
aside {
	@include owl;
}
```

Because we’ve included some error-checking within the mixin, if we were to attempt to pass a parameter to the mixin that does not map to a defined size (<samp>small</samp>, <samp>medium</samp>, or <samp>large</samp>)…

```scss
header {
	@include owl(gigantic);
}
```

We get the following error message in our console:

```bash
Error: There is no size named gigantic in `$sizes`. size should be one of small, medium, large.
```

And with that, I’m calling it a day!
