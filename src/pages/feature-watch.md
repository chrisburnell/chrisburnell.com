---
title: Browser Feature Watch
description: Because this website rebuilds automatically, this page serves as an easy way for me to keep track of feature compatability in browsers. Most of the content comes from <a href="https://www.smashingmagazine.com/2022/03/new-css-features-2022/">this article by Michelle Barker</a>.
toc: true
---

## Container Queries

Like media queries, but even better. Basically, allows you to write context-aware CSS by querying an element’s parent.

- [Official Specification](https://www.w3.org/TR/css-contain-3)
- [Article by Stephanie Eckles](https://www.smashingmagazine.com/2021/05/complete-guide-css-container-queries/)

{% caniuse 'css-container-queries' %}

## :has()

The fabled “parent selector”! This allows us to finally style an element based on its children.

- [Official Specification](https://www.w3.org/TR/selectors-4/)
- [Article by Bramus Van Damme](https://www.bram.us/2021/12/21/the-css-has-selector-is-way-more-than-a-parent-selector/)

{% caniuse 'css-has' %}

## @when/@else

Similar to conditionals in other programming languages. Could be useful for making complex media queries more logical.

- [Official Specification](https://www.w3.org/TR/css-conditional-5)
- [Article by Chris Coyier](https://css-tricks.com/proposal-for-css-when/)

{% caniuse 'css-when-else' %}

## color() function

Specify a color in a different color space.

- [Official Specification (CSS Color Module Level 4)](https://www.w3.org/TR/css-color-4/)
- [Official Specification (CSS Color Module Level 5)](https://www.w3.org/TR/css-color-5/)
- [Article by Michelle Barker](https://www.smashingmagazine.com/2021/11/guide-modern-css-colors/)

{% caniuse 'css-color-function' %}

## lab()/lch() color functions

Alternate, more-understandable color functions than `rgb()` or `hsl()`, for example.

- [Official Specification (CSS Color Module Level 4)](https://www.w3.org/TR/css-color-4/)
- [Official Specification (CSS Color Module Level 5)](https://www.w3.org/TR/css-color-5/)
- [Article by Michelle Barker](https://www.smashingmagazine.com/2021/11/guide-modern-css-colors/)

{% caniuse 'css-lch-lab' %}

## Cascade Layers

Gives us tighter control on the reigns of the cascade. This adds a layer of complexity to specificity in our CSS but allows us to designate different parts of our CSS to different layers, much like the concept of stacking with `z-index`. This complexity actually makes the practise of overriding selector specificity, using `!important` (proactively, of course!), and a number of other silly tricks we've added to our toolkit over the years.

- [Official Specification](https://www.w3.org/TR/css-cascade-5/)
- [Article by Miriam Suzanne](https://css-tricks.com/css-cascade-layers)

{% caniuse 'css-cascade-layers' %}

## Subgrid

Allows grid to cascade into children of a grid container, rather than the need for a flat layout.

- [Official Specification](https://www.w3.org/TR/css-grid-2/)
- [Article by Rachel Andrew](https://www.smashingmagazine.com/2018/07/css-grid-2/)

{% caniuse 'css-subgrid' %}

## Scroll Timeline

Native-CSS animations based on scroll position—no more need for JS!

- [Official Specification](https://drafts.csswg.org/scroll-animations-1/)
- [Article by Bramus Van Damme](https://css-tricks.com/practical-use-cases-for-scroll-linked-animations-in-css-with-scroll-timelines/)

{% caniuse 'css-scroll-timeline' %}

## Nesting

This one is a huge part of what makes Sass/SCSS so appealing to developers. Of course, there will always be a value in pre-rendering some parts of our CSS, but I’m excited to see more features like this that will make life easier for developers all the way through from “beginner” to “expert”.

- [Official Specification](https://www.w3.org/TR/css-nesting-1/)
- [Article by Killian Valkhof](https://kilianvalkhof.com/2021/css-html/css-nesting-specificity-and-you/)

{% caniuse 'css-nesting' %}

--------

## hwb() color function

*Can I Use data is currently unavailable from API.*

- [Official Specification (CSS Color Module Level 4)](https://www.w3.org/TR/css-color-4/)
- [Official Specification (CSS Color Module Level 5)](https://www.w3.org/TR/css-color-5/)
- [Article by Michelle Barker](https://www.smashingmagazine.com/2021/11/guide-modern-css-colors/)

## color-contrast() function

*Can I Use data is currently unavailable from API.*

- [Official Specification (CSS Color Module Level 4)](https://www.w3.org/TR/css-color-4/)
- [Official Specification (CSS Color Module Level 5)](https://www.w3.org/TR/css-color-5/)
- [Article by Michelle Barker](https://www.smashingmagazine.com/2021/11/guide-modern-css-colors/)

## color-mix() function

*Can I Use data is currently unavailable from API.*

- [Official Specification (CSS Color Module Level 4)](https://www.w3.org/TR/css-color-4/)
- [Official Specification (CSS Color Module Level 5)](https://www.w3.org/TR/css-color-5/)
- [Article by Michelle Barker](https://www.smashingmagazine.com/2021/11/guide-modern-css-colors/)
