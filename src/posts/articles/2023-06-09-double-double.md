---
date: 2023-06-12T15:00:00+01:00
title: Double-Double
description: Today I’m introducing a little dash of CSS syntactic sugar I’ve been using a lot when building components recently that I’m calling the <em>Double-Double</em> technique.
photo:
  url: double-double.png
  alt: "A pixel-art image of a 1990’s-era cup of Tim Horton’s coffee"
  classes: pixelated
tags:
  - css
  - css-variables
  - svg
---

<div class=" [ box ] ">

Skip to [the full **Double-Double** technique](#double-double-code).

</div>

## What is a Double-Double?

The **Double-Double**, practically a proper noun in Canada, refers to a *[Tim Horton’s](https://en.wikipedia.org/wiki/Tim_Hortons)* coffee with two creams and two sugars. Although the quality of *Tim Horton’s* has certainly declined, it was, once upon a time, a staple part of my diet, as it was/is for many Canadians, and I look back on them fondly.

## What does this have to do with CSS?

The power of the **Double-Double** technique is in using shorthand/logical properties and a clever feature of CSS Variables: the ability to provide a fallback value that gets used when a CSS Variable is not defined.

We’ll use that feature *twice*, nesting one CSS Variable inside another to provide a chain of values to be checked and used by the browser, and then *again* as we use the technique alongside shorthand CSS properties.

Let’s break that down.

### Working with defaults

First, we’ll look at how default parameter values work in a JavaScript function. In this example, we’ve given the `wordsPerMinute` parameter the default value of `200`:

```javascript
const readingtime = (numberOfWords, wordsPerMinute = 200) => {
	return Math.ceil(numberOfWords / wordsPerMinute)
}
```

This means that we can use the `readingtime` function with *or* without providing a `wordsPerMinute` value—without one, the function will use our default value of `200`.

----

We can do something similar in our CSS. For example, we might want a component to have a default `font-size`, but still give ourselves a uniform means of changing the `font-size` for a variation of the component.

Fortunately, CSS Variables give us this ability:

```css
.component {
	font-size: var(--font-size, 1em);
}
```

With this line of CSS, we’ve instructed our component to have a `font-size` of `1em`, and if the `--font-size` CSS Variable has been defined it will be used instead. So if we wanted to create a variation of our component, all we need to do is *define* `--font-size`:

```css
.component--variation {
	--font-size: 5em;
}
```

This is super useful! We can use this technique for many properties and values that we might set on a given component, and because the syntax of defining defaults and overriding them (as above) is consistent, our CSS draws a clear distinction between <q>base-level</q> component and <q>variations</q> of those components.

### Nested CSS Variables

One thing that’s great about using the `var()` function in CSS is that it can be nested! We’ll use this to create a chain of checks before our component resolves to our defined value:

```css
.component {
	font-size: var(--first, var(--second, 1em));
}
```

With this line of CSS, we’ve given our component a set of ordered instructions for setting a `font-size` value:

1. Use the `--first` CSS Variable if it has been defined
2. Use the `--second` CSS Variable if it has been defined
3. Otherwise, use the default `1em` value

----

This is handy in all sorts of ways. Take the `fill` colour of an SVG, for example:

```css
svg {
	fill: var(--fill-interaction, var(--fill, currentColor));
}

:is(:hover, :focus, :active) > svg {
	--fill-interaction: red;
}

.dark-background svg {
	--fill: white;
}
```

With some pretty terse and readable CSS, we’ve given the browser a whole suite of instructions to set the `fill` colour of our SVGs:

1. Use a sensible default of `currentColor` to match any text content that the SVG might be part of
2. When the SVG is shown on top of a dark background, we want to force our SVGs to fill with the colour `white`
3. When the SVG is inside an interactable element (e.g. inside a button), fill the SVG with `red` on interaction with the element

What’s also really nice is that we can circumvent some nasty specificity issues by nesting CSS Variables. Because the nested values will be evaluated *in order*, we, as the authors of the CSS, are in control, rather than the declaration with the highest specificity being in control.

We get to choose which selectors or conditions (interaction states, media/container queries, etc.) trigger a CSS Variable to be defined, and in this context, we’re concerned solely with whether or not it’s defined as a boolean attribute, *not* the specificity of the selector that defined it.

This means that <q>switching on</q> a CSS Variable can be done by a selector of any specificity, and, because CSS Variables will cascade, a selector which sets the values a CSS Variable can have less specificity than the selector which sets the property value itself:

```css
.flow > * + * {
	margin-top: var(--spacing, 1em);
}

h2 {
	--spacing: 5em;
}
```

I think, on the whole, this makes for a much more pleasant developer experience.

<h2 id="double-double" lang="fr">Je voudrais un Double-Double, s'il vous plaît</h2>

<p class="center  italic"><q>I’d like a Double-Double, please</q></p>

It’s no secret that Logical Properties are one of my favourite additions to CSS in recent years. Consequentially, I’ve been thinking more and more about the *block* and *inline* axes of a webpage as I build components, and that’s where the **Double-Double** technique comes in.

<div class=" [ box ] ">

MDN has great content on [logical properties and values](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values) and [shorthand properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties) if you want a refresher!

<c-details>
<summary>In short…</summary>

```css
property: all;
property: block inline;
property: block-start inline block-end;
property: block-start inline-end block-end inline-start;
```

</c-details>
</div>

Let’s switch from our `font-size` example to one with `padding` so we can work with shorthand and logical properties. In the next example, we’ll provide *two* values to the `padding` property, each value being a nested CSS Variable.

<h3 id="double-double-code">The Double-Double Technique</h3>

```css
.component {
	padding:
		var(--spacing-block,  var(--spacing, 1em))
		var(--spacing-inline, var(--spacing, 1em));
}
```

This new <q>line</q> of CSS (broken into three for readability) gives us a bunch of control over our component’s `padding`:

- Defining `--spacing` sets a new `padding-block` and *equal* `padding-inline` value
- Defining `--spacing-inline` sets a new `padding-inline` value, leaving `padding-block` to the default value
- Defining `--spacing-block` sets a new `padding-block` value, leaving `padding-inline` to the default value
- Defining any *two* of `--spacing`, `--spacing-block`, and `--spacing-inline` sets a new `padding-block` value and a new `padding-inline` value

And let’s not forget that CSS Variables will cascade and can be set to different values by multiple conditions. This means that once a variable has been set, or a component variation created, we’re still free to make variations by further overriding of the CSS Variables, based on different selectors or browser conditions!

----

When you extrapolate this idea across multiple properties for a component, you can start to see how much flexibility it affords you.

```css
.component {
	padding:
		var(--spacing-block,  var(--spacing, 1em))
		var(--spacing-inline, var(--spacing, 1em));
	margin:
		calc(2 * var(--spacing-block,  var(--spacing, 1em)))
		calc(2 * var(--spacing-inline, var(--spacing, 1em)));
}
```

In this case, we’re defining both a `padding` and `margin` for our component with the **Double-Double** technique. You’ll notice that their values are *almost* identical, but we’ve instructed the component to have `margin` values that are **2×** the size of the `padding`. We’ve baked this calculation right into the component’s declaration block, which means we don’t have to keep this mathematical relationship in our mind as we build out variations of this component and come up with new values to override the defaults.

Like before, this allows us to make simple, one-line variations of our components in CSS that (can) have a tremendously-powerful and deep-reaching impact to the computed outcome in the browser:

```css
.component--variation {
	--spacing: 5%;
	--spacing-block: 120px;
}
```

This one change results in a variation that has the computed values quite different from the default component’s:

```css
.component {
	padding-block-start: 1em;
	padding-inline-end: 1em;
	padding-block-end: 1em;
	padding-inline-start: 1em;

	margin-block-start: 2em;
	margin-inline-end: 2em;
	margin-block-end: 2em;
	margin-inline-start: 2em;
}

.component--variation {
	padding-block-start: 120px;
	padding-inline-end: 5%;
	padding-block-end: 120px;
	padding-inline-start: 5%;

	margin-block-start: 240px;
	margin-inline-end: 10%;
	margin-block-end: 240px;
	margin-inline-start: 10%;
}
```

Working *with* the cascade gets us further, and with less effort, than trying to swim against the current.

### Quadruple-Quadruple?

Now, this might seem like the next logical step to take with this technique, but, much like having *four creams* and *four sugars* in a coffee, it’s just a bit *too sweet* for my tastes:

```css
.component {
	padding:
		var(--spacing-block-start, var(--spacing-block, var(--spacing, 1em)))
		var(--spacing-inline-start, var(--spacing-inline, var(--spacing, 1em)))
		var(--spacing-block-end, var(--spacing-block, var(--spacing, 1em)))
		var(--spacing-inline-start, var(--spacing-inline, var(--spacing, 1em)));
}
```

But maybe that’s just me—to each their own!

## Over to you

Have you been using this technique yourself? Or any similar techniques? Found any neat ways to use it I haven’t covered here? I’d love to hear from you!
