---
title: Bowhead
lede: A small SCSS framework on which to implement your design tokens, spitting out CSS Variables with optional fallbacks.
---

It’s used like this:

```scss
body {
    @include v(background-color, desert);
    @include v(color, brick);
    border: v(measure, tiny) solid v(color, plankton);
    padding: v(measure, medium) v(measure, gigantic);
    @include v(z-index, above);
}
```

```css
body {
  background-color: tan;
  background-color: var(--color-desert);
  color: firebrick;
  color: var(--color-brick);
  border: var(--measure-tiny) solid var(--color-plankton);
  padding: var(--measure-medium) var(--measure-gigantic);
  z-index: 2;
  z-index: var(--z-index-above);
}
```

This little framework of SCSS comes packaged with a handful of files, each playing an important role in setting yourself up to make use of it:

- `_config.scss`
- `_functions.scss`
- `_maps.scss`
- `_mixins.scss`
- `_generator.scss`

The gist here is that we’re applying a naming convention to our (S)CSS in a number of different ways.

0. We’re defining different types of CSS values. These include measures, colors, opacity values, etc.
0. We’re mapping CSS properties against these types of values, so color-type values are used by color, background-color, border-color, etc.
0.
