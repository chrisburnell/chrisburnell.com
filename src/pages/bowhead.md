---
title: Bowhead
lede: Memorable and maintainable design tokens in SCSS
---

## What?

**Bowhead** is a small SCSS framework on which to implement your design tokens, spitting out CSS Variables with optional fallbacks.

## Why?

Implementing a design system or even just a series of simple design tokens can come with some unpredictable mental overhead. **Bowhead** aims to reduce that mental overhead by abstracting the specifics of design tokens into human-sensible formats and nomenclature.

This has a positive effect that ranges from giving the colours in your design system fun and memorable names, to the time and effort saved when communicating about these colours with collaborators without getting bogged down by details, because let’s be real: you don’t want *or need* to memorise the six-character hex value for all your colours, nor does anyone else! Now imagine that scenario when applied to multiple times more design tokens.

## Installation

- **With npm:** `npm install @chrisburnell/bowhead`
- **Direct download:** [https://github.com/chrisburnell/bowhead/archive/master.zip](https://github.com/chrisburnell/bowhead/archive/master.zip)

## Usage

There are three main moving parts to this set-up:

0. `$bowhead-tokens`
0. `$bowhead-show-fallback`
0. `$bowhead-generate`

`$bowhead-tokens` expects an *SCSS* `map` of “types” of tokens. These types could be a *measure*, *color*, *opacity*, *z-index*, etc.:

```scss
$bowhead-tokens: (
    measure: (
        small:  0.5rem,
        medium:   1rem,
        large:    2rem,
    ),
    color: (
        brick:    #b22222,
        plankton: #3cb371,
        desert:   #d2b48c
    ),
    opacity: (
        alpha: 0.8,
        beta:  0.5,
        gamma: 0.2
    ),
    z-index: (
        below:  -1,
        root:    0,
        default: 1,
        above:   2
    )
);
```

`$bowhead-show-fallback` is either `true` *(default)* or `false` and determines whether or not **Bowhead** should print fallback values for browsers that do not support CSS Variables.

**`true`:**

```css
body {
    color: #b22222;
    color: var(--color-desert);
}
```

**`false`:**

```css
body {
    color: var(--color-desert);
}
```

`$bowhead-generate` is either `true` *(default)* or `false` and determines whether or not **Bowhead** should print CSS Variables for you, like so:

```css
:root {
   --measure-small: 0.5rem;
   --measure-medium: 1rem;
   --measure-large: 2rem;
   --color-brick: #b22222;
   --color-plankton: #3cb371;
   --color-desert: #d2b48c;
   --opacity-alpha: 0.8;
   --opacity-beta: 0.5;
   --opacity-gamma: 0.2;
   --z-index-below: -1;
   --z-index-root: 0;
   --z-index-default: 1;
   --z-index-above: 2;
}
```

Finally, you can use either the `@v` function or `@v` mixin (or both) however is most comfortable to you:

```scss
body {
    @include v(background-color, desert);
    @include v(color, brick);
    border: v(measure, small) solid v(color, plankton);
    padding: v(measure, medium) v(measure, large);
    @include v(z-index, above);
}
```

```css
body {
    background-color: #d2b48c;
    background-color: var(--color-desert);
    color: #b22222;
    color: var(--color-brick);
    border: var(--measure-small) solid var(--color-plankton);
    padding: var(--measure-medium) var(--measure-large);
    z-index: 2;
    z-index: var(--z-index-above);
}
```
