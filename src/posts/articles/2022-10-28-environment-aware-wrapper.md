---
draft: true
date: 2022-10-28T22:58:50
title: The Environment-Aware Wrapper
description: Here’s a handy CSS technique to make sure your content isn’t obscured by the pesky <q>notch</q> that seems to be present on many phones these days, and it <em>probably</em> already fits nicely into your existing codebase!
tags:
  - css
---

<div class=" [ notched ] ">
    <div class=" [ wrap ] " style="--gutter: 1em">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum suscipit id nulla vitae maximus. In bibendum risus in commodo fermentum. Vestibulum elementum turpis ac aliquam pulvinar. Nulla vitae varius lorem. Pellentesque elit leo, elementum sit amet posuere a, malesuada non velit. Maecenas blandit rutrum enim eu sodales. Nullam mi lectus, vehicula sed arcu vel, volutpat dignissim mauris. Maecenas ultricies, lacus ut cursus molestie, dui nunc efficitur metus, vel pulvinar eros diam id mi. Phasellus convallis accumsan enim ac tempor. Quisque porta velit quis maximus ullamcorper. Mauris dictum ultrices nisi molestie aliquet. Donec dictum iaculis ante eget semper. In sit amet enim ac risus tempus feugiat non eu augue.</p>
    </div>
</div>

Quick one today.

If you’re not familiar with the notch, check out [<q><q>The Notch</q> and CSS</q> on CSS-Tricks](https://css-tricks.com/the-notch-and-css/), which has a succinct and information-rich summary of what the notch is and how we can work with it in our CSS.

In browsers that support it, we have the ability to query certain aspects of the environment with the [`env()` function](https://developer.mozilla.org/en-US/docs/Web/CSS/env). Used similarly to other functions that we probably use a bit more frequently—e.g. `var()`, `url()`, `attr()`—and, importantly for the notch, allows us to query four environment variables in particular:

- `safe-area-inset-top`
- `safe-area-inset-bottom`
- `safe-area-inset-left`
- `safe-area-inset-right`

The four values each compute out to a [Length-based value](https://developer.mozilla.org/en-US/docs/Web/CSS/length) representing the space taken up by the notch, so we can use them for Length-based properties, such as `width`, `padding`, and `margin`.

Here we’re using the inline-direction environment variables, `safe-area-inset-left` and `safe-area-inset-right`, to improve a Wrapper class by making sure that its inline padding is *never less than* the respective left/right environment variable.

```css
.wrap {
  max-inline-size: var(--max-inline-size, 100%);
  padding-inline: var(--gutter, 1em);
  margin-inline: auto;

  @supports (padding: max(0px)) {
    padding-inline-start: max(
      env(safe-area-inset-left),
      var(--gutter, 1em)
    );
    padding-inline-end: max(
      env(safe-area-inset-right),
      var(--gutter, 1em)
    );
  }
}
```

This ensures that the Wrapper will always have enough inline padding to account for a device’s notch, so our content is never obscured within our Wrapper component.

The way this component is written also promotes healthy use of the cascading nature of CSS: we can define <q>new</q> Wrappers by redefining `--max-inline-size` and/or `--gutter` within our new component definition, and those changes will only apply within our new component, leaving our other default Wrappers intact.

Because we’re using the `max()` function to compare the `env()` and `var()` values, if we want a custom Wrapper to have inline padding that would be *greater than* the environment variable, our larger value would be selected by the `max()` function. If there is no notch present, whatever the `var()` computes to will be used because `env()` will compute to a length of `0`.

<div class=" [ notched ] ">
    <div class=" [ wrap ] " style="padding-inline-start: max(8%, 1em)">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum suscipit id nulla vitae maximus. In bibendum risus in commodo fermentum. Vestibulum elementum turpis ac aliquam pulvinar. Nulla vitae varius lorem. Pellentesque elit leo, elementum sit amet posuere a, malesuada non velit. Maecenas blandit rutrum enim eu sodales. Nullam mi lectus, vehicula sed arcu vel, volutpat dignissim mauris. Maecenas ultricies, lacus ut cursus molestie, dui nunc efficitur metus, vel pulvinar eros diam id mi. Phasellus convallis accumsan enim ac tempor. Quisque porta velit quis maximus ullamcorper. Mauris dictum ultrices nisi molestie aliquet. Donec dictum iaculis ante eget semper. In sit amet enim ac risus tempus feugiat non eu augue.</p>
    </div>
</div>

Since Wrappers are so common in front end development, this technique could have widespread use, and hopefully you can slide it into your existing code without much trouble!

Let me know if you’ve got other interesting uses for environment variables or ways to handle the <q>notch</q>!

<style>
.notched {
    border: var(--size-tiny) solid currentColor;
    inline-size: 100%;
    max-inline-size: var(--size-breakpoint-tiny);
    aspect-ratio: 2532 / 1170;
    margin-inline: auto;
    border-radius: 2em;
    overflow: hidden;
    position: relative;
}

.notched::before {
    content: "";
    background-color: currentColor;
    inline-size: 5%;
    block-size: 50%;
    position: absolute;
    inset-block-start: 50%;
    inset-inline-start: 0;
    transform: translateY(-50%);
    border-radius: 0 1.5vw 1.5vw 0;
}

.notched .wrap {
    max-block-size: 100%;
    overflow-y: hidden;
}

.notched p {
    max-inline-size: 100%;
}
</style>
