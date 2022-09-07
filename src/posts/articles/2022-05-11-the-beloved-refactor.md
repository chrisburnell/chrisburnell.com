---
date: 2022-05-11T17:20:00+0100
title: The Beloved Refactor
description: Following the incredible high from a great conference, I just finished an extremely refreshing refactor of the CSS on my site. Here’s what I did.
tags:
  - css
---

Last week, I was lucky enough to attend [All Day Hey](https://alldayhey.com/) and have been buzzing with ideas and inspiration. Since then, I’ve made some fun and powerful changes to the architecture and philosophy towards writing CSS, so here are a few of the highlights!

## Let’s get logical

[Logical Properties and Values](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties) throughout, which didn’t take much time to acclimatise to, and even comes with syntax benefits for applying values in the block/inline directions. In addition to better supporting different browsing contexts (mainly to do with languages), I think this will also nurture a better understanding of CSS through its explicit use of the <q>block</q> and <q>inline</q> vocabulary.

```css
.box {
    border-block-start-size: 2px;
    margin-inline: 1em;
}
```

## If you reuse it, give it a name

Robust system for design tokens, [defined with JSON](https://github.com/chrisburnell/chrisburnell.com/tree/main/src/data/designTokens), converted to CSS Custom Properties for CSS and usable as-is for JavaScript, which Eleventy can consume with ease.

For example, I have defined a palette of colours I’d like to reuse:

```json
{
  "raven": "#5f8aa6",
  "maple": "#eb2d36"
}
```

```css
:root {
    --hsl-raven: 203deg 28% 51%;
    --hsl-maple: 357deg 82% 54%;
}

.box {
    background-color: hsla(var(--hsl-raven) / 0.5);
    color: hsl(var(--hsl-maple));
}
```

## High Fluking Dive

Sunsetted my personal use of [Bowhead](/bowhead/) in favour of simpler and more reusable code. I might still explore how to make it useful; its <q>type-setting for CSS</q> definitely has some value. At the very least, I might explore using it simply for *generating* the CSS variables it uses as part of its powerful `v()` <dfn title="SCSS mixins allow you to define styles that can be easily reused through your code.">mixin</dfn>.

```scss
.box {
    @include v(padding, gutter);
}
```

So I no longer have any **enforced** notion of <q>types</q> in my CSS; although, I still do use a naming convention for my CSS variables that makes it easy for me to use and read.

Further on CSS Custom Properties, I never made *full* use of the ability to supply them a fallback:

```css
.box {
    padding: var(--gutter, 1em);
}
```

However, following an [incredible talk by Andy Bell](/bookmark/build-excellent-websites/), *I have seen the light!* I seriously cannot give the talk and its counterpart website, [Build Excellent Websites](https://buildexcellentwebsit.es/), enough praise! It was nearly a spirital moment for me!

The idea that I can create a component with *default* values and *override* them, like I’m used to doing in a BEM context, as a *variation* was the moment that clicked for me. Naturally, this concept of defaults/fallbacks is now sprinkled throughout my CSS, and has come with the satisfying knock-on effect of realising how similar a lot of my components were, and are now based on a more generic and flexible foundation.

## Fresh eyes

I’m looking forward to jumping back in in a week’s time to see what else I can simplify with fresh eyes. I’m sure things will change as I develop and work with the new code some more.

If you’ve done any satisfying refactors or have any further ideas about building excellent websites like Andy, I’d love to hear about them!

*[BEM]: Block Element Modifier
