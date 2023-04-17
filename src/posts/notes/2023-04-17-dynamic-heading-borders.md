---
date: 2023-04-17T23:47:02+0100
title: Dynamic Heading Borders
description: I found a useful trick for achieving the long-standing design of Level 2 Headings across my website.
tags:
  - css
  - writing
---

For a long time, I’ve had a specific look to the most-common heading in my articles: the Level 2 Heading, or `<h2>` element. While doing some refactoring recently, in light of [many developments on the frontiers of CSS](/feature-watch/), I found a new way to get the same result with a bit of new CSS that makes understanding *what it does* a lot clearer, and clarity is always important—if not for your teammates or the wider web’s understanding, at least for future *you*’s understanding!

## Inception

Let’s take a look at what we’re trying to rebuild:

<figure>
    {% image './images/content/h2-titles.png', 'three headings in succession, the second and third containing more words than their previous, accompanied by a thin border under the text, its inline size equal to the inline size of the text plus some arbitrary amount' %}
</figure>

In essence, what I want is for the borders underneath each heading to be the same width (`inline-size`) as the text inside, plus a small but consistent amount. I decided to use the relatively-new CSS value, `fit-content`, to achieve this:

```css
h2 {
	inline-size: fit-content;
	padding-inline-end: clamp(2.25rem, 0.5rem + 4vw, 4.5rem);
	box-shadow: inset 0 -2px 0 #dddddd;
}
```

The new heavy-hitter here is the `fit-content` value that I’m assigning to the `inline-size` (`width`). This means that the heading’s box will use the *available space* as its content grows and will never exceed its computed `max-content`, or however much space is taken up when its content does not wrap.

Importantly, this allows me to limit the width of the headings without re-assigning the default `display: block` of headings, which browsers assign by default, to `display: inline-block`, for example. This would achieve the same visual effect for the headings *in a vacuum*, but if placed around other elements which also have `display: inline-block` assigned to them, there’s the possibility that they’ll sit alongside the heading (in the inline axis) rather than headings appear on their own line.

This is already achieved by block-level elements, so I’m much happier relying on defaults and building progressively on those with fantastically-terse new CSS features like `fit-content`.

--------

You can read more about `fit-content` and its brethren, `max-content` and `min-content`, [on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/fit-content) as well as track its progress towards full stability across modern browsers on my [Browser Feature Watch page](/feature-watch/#intrinsic-width).
