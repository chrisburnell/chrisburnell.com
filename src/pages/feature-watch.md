---
title: Browser Feature Watch
description: Because this website rebuilds automatically, this page serves as an easy way for me to keep track of feature compatability in browsers. Most of the content comes from <a href="https://www.smashingmagazine.com/2022/03/new-css-features-2022/">this article by Michelle Barker</a>.
toc: true
---

## dialog element

Native method of displaying a dialog/modal window.

- [Official Specification](https://html.spec.whatwg.org/multipage/forms.html#the-dialog-element)
- [Page on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog)

{% caniuse 'dialog' %}

## Container Queries

Like media queries, but even better. Basically, allows us to write context-aware CSS by querying an element’s parent.

- [Official Specification](https://www.w3.org/TR/css-contain-3)
- [Article by Stephanie Eckles](https://www.smashingmagazine.com/2021/05/complete-guide-css-container-queries/)

{% caniuse 'css-container-queries' %}

## :has()

The fabled “parent selector”! This allows us to finally style an element based on its children.

- [Official Specification](https://www.w3.org/TR/selectors-4/)
- [Article by Bramus Van Damme](https://www.bram.us/2021/12/21/the-css-has-selector-is-way-more-than-a-parent-selector/)

{% caniuse 'css-has' %}

## Nesting

This one is a huge part of what makes Sass/SCSS so appealing to developers. Of course, there will always be a value in pre-rendering some parts of our CSS, but I’m excited to see more features like this that will make life easier for developers all the way through from “beginner” to “expert”.

- [Official Specification](https://www.w3.org/TR/css-nesting-1/)
- [Article by Killian Valkhof](https://kilianvalkhof.com/2021/css-html/css-nesting-specificity-and-you/)

{% caniuse 'css-nesting' %}

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

Alternate, more-understandable color functions. `lab()` defines colors using *lightness* and *a* and *b* values which define the hue. `lch()` defines colors using *lightness*, *chroma*, and *hue*.

- [Official Specification (CSS Color Module Level 4)](https://www.w3.org/TR/css-color-4/)
- [Official Specification (CSS Color Module Level 5)](https://www.w3.org/TR/css-color-5/)
- [Article by Michelle Barker](https://www.smashingmagazine.com/2021/11/guide-modern-css-colors/)

{% caniuse 'css-lch-lab' %}

## hwb() color function

Define colors using *hue*, *whiteness*, and *blackness*.

- [Official Specification (CSS Color Module Level 4)](https://www.w3.org/TR/css-color-4/)
- [Official Specification (CSS Color Module Level 5)](https://www.w3.org/TR/css-color-5/)
- [Article by Michelle Barker](https://www.smashingmagazine.com/2021/11/guide-modern-css-colors/)

{% caniuse 'hwb' %}

## color-contrast() function

Given one color, chooses from a list of other colors to output the one with the highest contrast.

- [Official Specification (CSS Color Module Level 4)](https://www.w3.org/TR/css-color-4/)
- [Official Specification (CSS Color Module Level 5)](https://www.w3.org/TR/css-color-5/)
- [Article by Michelle Barker](https://www.smashingmagazine.com/2021/11/guide-modern-css-colors/)

{% caniuse 'css-color-contrast' %}

## color-mix() function

Mixes two colors together.

- [Official Specification (CSS Color Module Level 4)](https://www.w3.org/TR/css-color-4/)
- [Official Specification (CSS Color Module Level 5)](https://www.w3.org/TR/css-color-5/)
- [Article by Michelle Barker](https://www.smashingmagazine.com/2021/11/guide-modern-css-colors/)

{% caniuse 'css-color-mix' %}

## Scroll Timeline

Native-CSS animations based on scroll position—no more need for JS!

- [Official Specification](https://drafts.csswg.org/scroll-animations-1/)
- [Article by Bramus Van Damme](https://css-tricks.com/practical-use-cases-for-scroll-linked-animations-in-css-with-scroll-timelines/)

{% caniuse 'css-scroll-timeline' %}

## New Viewport Units

Small, large, and dynamic viewport units allow us clearer and more concise definitions for layout.

- [Official Specification](https://www.w3.org/TR/css-values-4/#viewport-relative-lengths)
- [Article by Bramus Van Damme](https://www.bram.us/2021/07/08/the-large-small-and-dynamic-viewports/)

{% caniuse 'viewport-unit-variants' %}

## Focus Visible

Define a palette from a color font.

- [Official Specification](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo)
- [Page on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/:-moz-focusring)

{% caniuse 'css-focus-visible' %}

## Font Palette

Define a palette from a color font.

- [Official Specification](https://www.w3.org/TR/css-fonts-4/#propdef-font-palette)

{% caniuse 'css-font-palette' %}

## Array.prototype.at()

Like `indexOf()` but allows us to pass a negative integer, rather than hinging upon the array’s length.

- [Page on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/at)

{% caniuse 'mdn-javascript_builtins_array_at' %}

## attr() function

Expands the use of the `attr()` function by making it available to more properties and by allowing a <q>type or unit</q> to be passed alongside the targetted attribute. This could be used for things like passing a <q>url</q>-type attribute to `background-image`.

- [Official Specification](https://www.w3.org/TR/css-values/#attr-notation)
- [Page on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/attr)

{% caniuse 'css-attr-function' %}
