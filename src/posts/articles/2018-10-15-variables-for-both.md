---
updated: 2021-05-06T12:00:00+0100
updated_text: I’ve since turned this into a full-blown package of its own called <a href="/bowhead/">Bowhead</a>!
date: 2018-10-15T10:34:00+0100
title: Variables for Both
description: Now that CSS Custom Properties, or CSS Variables, are becoming a solid standard, I'm using a method to map their values to CSS Variables whilst providing a value-as-is fallback using a straightforward syntax in a SCSS function and mixin.
tags:
  - css
  - css-variables
  - design-systems
  - scss
banner:
  url: variables-for-both.jpg
  alt: a photograph of two giraffes, up-close on their heads and upper necks, each looking away from each other
further_reading:
  - title: W3 CSS Custom Properties Specification
    url: https://www.w3.org/TR/css-variables/
  - title: MDN — Using CSS custom properties
    url: https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables
  - title: CSS-Tricks’ Guide to CSS Custom Properties
    url: https://css-tricks.com/guides/css-custom-properties/
syndicate_to:
  - https://mastodon.social/users/chrisburnell/statuses/100899031142247634
  - https://twitter.com/iamchrisburnell/status/1051772305360195584
---

One of my favourite parts of developing for the web is the ever-shifting landscape and the opportunity to work with new technologies. Sometimes they aren’t apt for use in production, but fortunately for us today, *CSS Variables* are pretty reliable to use on their own. However, if you’re in a position similar to mine and find yourself often needing to support old versions of *Internet Explorer* or making sure *all* of your browser support bases are covered, this *SCSS* setup should be useful for you.

{% browserSupport 'css-variables' %}

## The Setup

I won’t pretend I’m writing the introduction to a family recipe for chocolate cake and bore you with twenty minutes of introduction; instead, let’s just jump into the technique, then I’ll break it down a little bit. But before I get too ahead of myself, *please keep in mind there are some bits that require setting up!*

For the purposes of this example, I’ll create a simple mapping for `z-index`. Let’s start by setting up a variable for each level of `z-index` that we want to use. This can help remove the mental overhead of setting values for this property, as it’s generally obvious what level an element should live at when they’re named in a way that makes sense to you (and your team). *This part is optional.*

```scss
$z-index-below:	   -1 !default;
$z-index-root:		 0 !default;
$z-index-default:	  1 !default;
$z-index-above:		2 !default;
$z-index-modal:		3 !default;
$z-index-dialog:	   4 !default;
$z-index-notification: 5 !default;
```

And the next step is to create a [Map](https://sass-lang.com/documentation/file.SASS_REFERENCE.html#maps) of these values. You don’t actually need to use the variables for each value in the Map; you can instead put your typical CSS property values in their place—whole numbers in the case of `z-index`.

```scss
$z-indexes: (
	below:		$z-index-below,
	root:		 $z-index-root,
	default:	  $z-index-default,
	above:		$z-index-above,
	modal:		$z-index-modal,
	dialog:	   $z-index-dialog,
	notification: $z-index-notification
) !default;
```

## New kid on the block

Now we need to prepare our CSS Variables. In order to make them available for the entire scope of our (S)CSS, we’ll assign them underneath `:root`.

```scss
:root {
	@each $key, $value in $z-indexes {
		--z-index-#{$key}: #{$value};
	}
}
```

Additionally, because we’re using SCSS, and to keep our code DRY, we’ll utilise the SCSS Map that we set earlier and iterate over it to create a CSS Variable for each of our SCSS Variables and Map values.

```css
:root {
	--z-index-below:	   -1;
	--z-index-root:		 0;
	--z-index-default:	  1;
	--z-index-above:		2;
	--z-index-modal:		3;
	--z-index-dialog:	   4;
	--z-index-notification: 5;
}
```

Now we’ve established our SCSS Variables, a Map for them to live in and be iterated over, and the CSS Variable equivalents of those SCSS Variables. There is, however, one more thing we need to do before we can pull this all together inside our function and mixin.

We could hard-code some logic in order to designate that our numeric values should be used against the `z-index` property, but I prefer things to be more robust than that. In this case, we’ll use two more SCSS Maps to hold some relational information about the properties and the possible values we want to be able to use inside them.

Before that, though, let’s expand our example a little bit and include two more CSS properties in this methodology: `opacity` and `border-width`. This will help to illustrate the value in creating these relational Maps.

```scss
$opacities: (
	alpha: 0.9,
	beta:  0.6,
	gamma: 0.3
) !default;

$sizes: (
	small:  1rem,
	medium: 2rem,
	large:  4rem
) !default;

:root {
	@each $key, $value in $opacities {
		--opacity-#{$key}: #{$value};
	}
	@each $key, $value in $sizes {
		--size-#{$key}: #{$value};
	}
}
```

```css
:root {
	--opacity-alpha: 0.9;
	--opacity-beta:  0.6;
	--opacity-gamma: 0.3;

	--size-small:  1rem;
	--size-medium: 2rem;
	--size-large:  4rem;
}
```

One important thing to note about this new code is that we’ve introduced a new set of variables, `sizes`, which are used as values for properties like `border-width` or `margin`. These `sizes` establish consistent spacing and sizing across your components. We will be using the <var>--opacity-</var> <q>type</q> variables for `opacity` but the <var>--size-</var> <q>type</q> variables can be used for a great number of properties.

This is where the penultimate step really shines. First we’ll establish which SCSS Map of Variables should be used for each <q>type</q> by preparing <var>$variable-map</var>.

```scss
$variable-map: (
	z-index: $z-indexes,
	opacity: $opacities,
	size: $sizes
) !default;
```

Secondly, we’ll create a Map that relates each *CSS property* to a set of values of a particular <q>type</q>:

```scss
$property-map: (
	z-index: z-index,
	opacity: opacity,
	margin: size,
	margin-top: size,
	margin-right: size,
	margin-bottom: size,
	margin-left: size,
	padding: size,
	padding-top: size,
	padding-right: size,
	padding-bottom: size,
	padding-left: size,
	grid-gap: size,
	column-gap: size,
	row-gap: size
) !default;
```

Things are pretty straightforward for `z-index` and `opacity`, but you can see that we’ve now assigned our <q>size-type</q> variables to a handful of properties—we can use any of our <samp>sizes</samp> (small, medium, large) when assigning a value to `margin`, `margin-X`, `padding`, `padding-X`, and `X-gap` properties.

Lastly, we’ll check our passed-in value against a list of “generic” CSS property values, which includes: <samp>auto</samp>, <samp>inherit</samp>, <samp>initial</samp>, <samp>none</samp>, <samp>revert</samp>, <samp>unset</samp>, <samp>0</samp>, and <samp>1</samp>. If it does match one of those generic values, we’ll forego any processing and output a singular property-value pair.

Let’s tie it all together with this SCSS function and mixin.

```scss
@function v($property, $value: default, $fallback: false) {
	@if (index($generic-values, $value)) {
		@return $value;
	}
	@else {
		// if we're passing in a key in the variables Map (e.g. size)
		@if map-has-key($variable-map, $property) {
			$map-variables: map-get($variable-map, $property);

			// throw a warning if the value does not exist in the associated Map
			@if not map-has-key($map-variables, $value) {
				@warn "There is no value named `#{$value}` in the variable list. The value should be one of `#{map-keys($map-variables)}`.";
			}

			@if $fallback {
				@return map-get($map-variables, $value);
			} @else {
				@return var(--#{$property}-#{$value});
			}
		}
		// otherwise we're passing in a value from the properties Map (e.g. fill)
		@else if map-has-key($property-map, $property) {
			$map-properties: map-get($property-map, $property);
			$nest-name: null;
			$nest-map-name: null;
			$map: null;
			$variable-fallback: null;
			$variable-output: null;

			// if a Nested List, we need to go deeper
			@if type-of($map-properties) == list {
				$nest-name: nth($map-properties, 1);
				$nest-map-name: nth($map-properties, 2);
			}

			// if it is a Nested List
			@if $nest-name {
				// get the map from nested map-name
				$map: map-get($variable-map, $nest-name);
				// get the nested map
				$nest-map: map-get($map, $nest-map-name);

				// throw a warning if the value does not exist
				@if not map-has-key($nest-map, $value) {
					@warn "There is no value named `#{$value}` in the `#{$nest-name}` variable list. The value should be one of `#{map-keys($nest-map)}`.";
				}

				@if $fallback {
					@return map-get($nest-map, $value);
				} @else {
					@return var(--#{$nest-name}-#{$nest-map-name}-#{$value});
				}
			} @else {
				// get the map from map name
				$map: map-get($variable-map, $map-properties);

				// throw a warning if the value does not exist
				@if not map-has-key($map, $value) {
					@warn "There is no value named `#{$value}` in the `#{$map-properties}` variable map. The value should be one of `#{map-keys($map)}`.";
				}

				@if $fallback {
					@return map-get($map, $value);
				} @else {
					@return var(--#{$map-properties}-#{$value});
				}
			}
		} @else {
			// throw a warning if the property does not exist
			@warn "There is no property named `#{$property}` in the variable or property map. The value should be one of `#{map-keys(map-merge($variable-map, $property-map))}`.";
		}
	}
}
```

```scss
@mixin v($property, $value: default, $fallback: true) {
	// leverage the v() function and output the CSS Variable(s) and optionally
	// the respective SCSS value(s) as well as the property
	@if $fallback {
		#{$property}: v($property, $value, true);
	}
	#{$property}: v($property, $value);
}
```

You might have noticed that there are a number of parameters you can pass to the function and mixin: the property, a value, and whether or not to provide the fallback value (optional).

## Putting it to use

```scss
.modal {
	@include v(z-index, modal);
	@include v(opacity, beta);
	@include v(padding, medium);
	@include v(margin-top, medium);
}
```

```css
.modal {
	z-index: 3;
	z-index: var(--z-index-modal);
	opacity: 0.6;
	opacity: var(--opacity-beta);
	padding: 2rem;
	padding: var(--size-medium);
	margin-top: 2rem;
	margin-top: var(--size-medium);
}
```

And if we want to do any kind of computation, modify the value, or combine values under a multi-value property (e.g. `border`) in any way, we can use our function instead of the mixin:

```scss
.modal {
	border: v(size, small) solid v(color, nickel);
}
```

```css
.modal {
	border: var(--size-small) solid var(--color-nickel);
}
```

And by modifying the third parameter, `$fallback`, we can return the computed SCSS values instead:

```scss
.modal {
	border: v(size, small, true) solid v(color, nickel, true);
}
```

```css
.modal {
	border: 0.625rem solid #737373;
}
```

Changing the default value of <var>$fallback</var> from `true` to `false` on the mixin itself will have a knock-on effect across your codebase, and for every <samp>@include v(...);</samp>, you’ll be shaving off a line of code in your compiled CSS—not much, especially after compression, but it might add up if you are consistently using this technique across your codebase.

## The Takeaway

The benefits to using CSS Variables are enormous, and I’d strongly recommend using them as soon as you can across your projects. Others have better explained what those many benefits are, so I encourage you to read up on the subject. A function or mixin like the ones we’ve gone over in this article will help you both in transitioning towards using CSS Variables as well as, when the time comes for your project(s), ceasing to provide fallbacks for your CSS Variables.

This technique could also certainly use some extra eyes to tighten up the code and make it more approachable to a wider audience. Let me know if you have any suggestions or feedback—I’d love to make this technique even stronger, or maybe you have an even better solution!

*[DRY]: Don’t Repeat Yourself
