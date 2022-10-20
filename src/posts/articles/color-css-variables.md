---
draft: true
date: 2022-05-13T19:00:00+0100
title: How I use CSS Variables to manage colours
# tags:
#   - color
#   - css
#   - design-systems
---

Here’s a quick, little technique for working with colours in CSS that I alluded to in [The Beloved Refactor](/article/the-beloved-refactor/) but I figured I’d go a little bit deeper on here.

I’m going to demonstrate this technique using the [HSL colour space](https://en.wikipedia.org/wiki/HSL_and_HSV) but it would work well with RGB or some other [upcoming](/feature-watch/#css-color-function) [colour](/feature-watch/#css-lch-lab) [formats](/feature-watch/#hwb).

In short, this technique involves storing your colours as CSS Variables using a specific syntax. This allows us to reuse them elsewhere in our code. In this example, I’ve defined a handful of `color` variables as the space-delimited values that need to be passed to a `hsl()` or `hsla()` function. I’ve also defined a couple of `opacity` variables:

```css
:root {
    --hsl-raven: 203deg 28% 51%;
    --hsl-maple: 357deg 82% 54%;
    --hsl-conifer: 115deg 40% 36%;
    --hsl-aspen: 50deg 100% 50%;
    --hsl-black: 0deg 0% 2%;
    --hsl-white: 0deg 0% 98%;

    --nearly-opaque: 0.9;
    --whoa-were-halfway-there: 0.5;
    --nearly-transparent: 0.1;
}
```

Now that we’ve defined them at the root of the document (the `html` element), we can access these variables throughout our code, like so:

```css
.class {
    background-color: hsla(var(--hsl-conifer) / var(--nearly-opaque));
    color: hsl(var(--hsl-white));
}
```

The advantage of defining our colours like this is that it makes for very readable colour definitions in your CSS, and makes it easier to combine any of your colours with any of your defined opacities.

When I would have handled this with SCSS in the past, I would have had to define **18** variables to represent all the possible combinations of colours and opacities. On this website, that would mean generating **64** variables, and on some big projects I’ve worked on before with vast colour schemes, this called for **405** variables: 9 <q>main</q> colours, 2 tints and 2 shades of each, and 9 opacity options! This technique reduced that number down to 54, and when exciting CSS features like `color-mix()` become stable, that number will be whittled down even further to 18.

It seems like the power of CSS has been exploding recently, and I couldn’t be happier to have all these amazing new techniques available for developers to use!

## Give me some sugar

If you’re using SCSS, this bit’s for you:

```scss
@function h($value, $opacity: null) {
    @if not $opacity {
        @return hsl(var(--hsl-#{$value}));
    }
    @return hsla(var(--hsl-#{$value}) / var(--opacity-#{$opacity}));
}
```

Make sure you check the variable names to match your naming convention!
