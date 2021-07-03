---
published: false
draft: true
date: 2021-06-17T09:30:00+0100
title: "Theming with Bowhead"
lede: "Bowhead, a small design token framework for SCSS and personal project of mine, works beautifully at its job. In this article, I'll explain how I go about extrapolating on it to build a robust way to apply colour-schemes across your site."
# syndicate_to:
#   - https://twitter.com/iamchrisburnell/status/
#   - https://mastodon.social/users/chrisburnell/statuses/
---

These are the colours in my palette:

```scss
$color: (
    lynx: #091217,
    wolf: #20323d,
    bowhead: #3e5c6d,
    raven: #5f8aa6,
    highland: #80b7d7,
    coyote: #c0dbed,
    bear: #ebf3f9,
    maple: #e0151f,
    conifer: #3d8137,
    aspen: #ffd700,
);
```

Example of color schemes:

```scss
$color-schemes: (
    light: (
        primary: lynx,
        secondary: bear
    ),
    dark: (
        primary: bear,
        secondary: lynx
    )
);
```

Very simple example, but you can see from the values picked that we're setting up for a basic light/dark theme toggle, where we're switching the values around when going from light to dark or vice versa.

```scss
@mixin scheme($property, $key) {
    // Loop through all color schemes building classes and properties
    @each $scheme, $data in $color-schemes {
        @if map-has-key($data, $key) {
            .scheme--#{$scheme} & {
                @include v($property, map-get($data, $key));
            }
        }
    }
}
```

Used like so:

```scss
.component {
    @include scheme(background-color, primary);
    @include scheme(color, secondary);
}
```

to generate:

```css
.scheme--light .component {
    background-color: var(--color-lynx);
    color: var(--color-bear);
}
.scheme--dark .component {
    background-color: var(--color-bear);
    color: var(--color-lynx);
}
```
