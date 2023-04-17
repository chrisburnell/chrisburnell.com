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
	max-inline-size: 100%;
	padding-inline-end: clamp(2.25rem, 0.5rem + 4vw, 4.5rem);
	box-shadow: inset 0 -2px 0 #dddddd;
}
```

You can read more about `fit-content` and its brethren, `max-content`, `min-content`, and `stretch`, [on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/fit-content) and track its progress towards fully-stable across modern browsers on my [Browser Feature Watch page](/feature-watch/#intrinsic-width).
