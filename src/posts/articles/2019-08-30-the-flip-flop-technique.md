---
updated: 2020-09-07T13:00:00+01:00
updated_text: "Since <a href=\"/note/1596729985/\">moving to Eleventy</a> I have put a bit more thought and effort into how I would transition my design from light to dark, and no longer use the <code>filter()</code> technique described below."
date: 2019-08-30T10:48:00+01:00
title: "The Flip-Flop Technique"
description: "I recently implemented a <a href=\"#theme-selector\">colour scheme toggler</a> in the footer of my website, following <a href=\"https://hankchizljaw.com\" rel=\"external\">Andy Bell’s</a> guide, <a href=\"https://hankchizljaw.com/wrote/create-a-user-controlled-dark-or-light-mode\" rel=\"external\">Create a user controlled dark or light mode</a>, and found a wonky but fun alternative solution for styling my dark theme which leverages CSS’s filter property."
tags:
  - css
  - css-variables
syndicate_to:
  - https://dev.to/chrisburnell/the-flip-flop-technique-2hh4
  - https://mastodon.social/users/chrisburnell/statuses/102705333471640919
  - https://twitter.com/iamchrisburnell/status/1167375436617330693
---

I highly recommend you read [Andy’s post](https://hankchizljaw.com/wrote/create-a-user-controlled-dark-or-light-mode/) first! Come back after, this page isn’t going anywhere…

--------

The gist is that we have some JavaScript that hooks onto a number of CSS Variables exposed on our pages, and we’re toggling their values back and forth between a <q>light</q> and <q>dark</q> palette by changing an attribute on the root element:

```css
:root {
	--color-text: black;
}
[data-color-scheme="dark"] {
	--color-text: white;
}
```

## Flip-Flop

I need to put in some time to work on the colours used in my dark theme, but I wanted an interim solution because I was so excited to implement this, to be honest!

Eventually, I realised that with a handful of `filter` values, we can come up with a decent-enough inversion of my <q>light</q>-themed styles.

<figure class="figure--dragon">
	<h4>Figure 1</h4>
	<div>
		<c-emoji title="Dragon Face">🐲</c-emoji>
	</div>
	<p>
		<strong>Theme:</strong> <code>unaltered</code>
	</p>
</figure>

<figure class="figure--dragon">
	<h4>Figure 2</h4>
	<div style="filter: invert(1);">
		<c-emoji title="Dragon Face">🐲</c-emoji>
	</div>
	<p>
		<strong>Theme:</strong> <code>invert(1)</code>
	</p>
</figure>

Inversion complete. We’ve gone from a light background to a dark one. Now we need to fix the hues of our colours—in this case, we want our brown to be blue.

<figure class="figure--dragon">
	<h4>Figure 3</h4>
	<div style="filter: invert(1) hue-rotate(180deg);">
		<c-emoji title="Dragon Face">🐲</c-emoji>
	</div>
	<p>
		<strong>Theme:</strong> <code>invert(1) hue-rotate(180deg)</code>
	</p>
</figure>

Now we’ve managed to get our blue back, but the Dragon emoji looks completely wrong. *This is where the flip-flop technique comes in.*

<figure class="figure--dragon">
	<h4>Figure 4</h4>
	<div style="filter: invert(1) hue-rotate(180deg);">
		<c-emoji title="Dragon Face" style="filter: invert(1) hue-rotate(180deg);">🐲</c-emoji>
	</div>
	<p>
		<strong>Theme:</strong> <code>invert(1) hue-rotate(180deg)</code>
		<br>
		<strong>Emoji:</strong> <code>invert(1) hue-rotate(180deg)</code>
	</p>
</figure>

That’s done it. By applying the same filter *again* to the emoji, it flip-flops back to its unaltered appearance.

## Hue, Saturation, Lightness

But something’s *off*. The colours of the emoji in the final example seem less saturated or less vibrant than the unaltered emoji in the first example, which is most noticeable on the yellow hair of the dragon. Interact with this demo to see the unaltered state alongside the fully-filtered state and see for yourself.

<figure class="figure--dragon  figure--dragon--animate" tabindex="0">
	<div>
		<c-emoji title="Dragon Face">🐲</c-emoji>
	</div>
	<div style="filter: invert(1) hue-rotate(180deg);">
		<c-emoji title="Dragon Face" style="filter: invert(1) hue-rotate(180deg);">🐲</c-emoji>
	</div>
</figure>

Even more confusing to me is that this discrepancy only exists when I look at it using my default *light* theme—when viewed with my *dark* theme the unaltered emoji appears just as unsaturated as the final product.

## The Code

<p class=" [ box  box--warning ] "><strong>Warning!</strong> The code below makes pretty heavy-handed use of <code>filter</code> and <em>probably</em> isn’t very performant!</p>

```scss
img,
svg,
[role="img"],
embed,
iframe,
object,
video {
	@extend %asset-elements;
}

@mixin color-scheme-dark() {
	@supports (filter: invert(1) hue-rotate(180deg)) {
		&,
		%asset-elements {
			filter: invert(1) hue-rotate(180deg);
		}
	}

	@supports not (filter: invert(1) hue-rotate(180deg)) {
		--color-black: #{$color-white};
		--color-mineshaft: #{$color-yeti};
		--color-kaiser: #{$color-nickel};
		--color-nickel: #{$color-kaiser};
		--color-yeti: #{$color-mineshaft};
		--color-white: #{$color-black};
	}
}

@media (prefers-color-scheme: dark) {
	:root {
		--color-scheme: "dark";
	}

	:root:not([data-color-scheme]) {
		@include color-scheme-dark;
	}
}

/*:root*/[data-color-scheme="dark"] {
	@include color-scheme-dark;
}
```

Maybe someone knowledgable about colours or filters on the web has an idea of what’s going on here, but I can’t seem to get the emoji to return to its original colour using any combination of filters to try to flip-flop back to its unaltered state.

I’m definitely missing *something*, but it’s *close*.

{% css %}
@layer overrides {
	.figure--dragon div {
		background-color: #f9f9f9;
		background-image: linear-gradient(to bottom right, transparent 50%, #5f8aa6 50%, #5f8aa6);
		width: 10rem;
		height: 10rem;
		font-size: 5rem;
		line-height: 10rem;
		text-align: center;
	}
	[data-color-scheme="dark"] .figure--dragon {
		filter: hue-rotate(180deg) invert(1);
	}
	[data-color-scheme="dark"] .figure--dragon .emoji {
		filter: none;
	}
	.figure--dragon--animate {
		flex-direction: row;
		cursor: col-resize;
	}
	.figure--dragon--animate div {
		clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
		transition: all 0.5s ease;
	}
	.figure--dragon--animate:hover div:first-child,
	.figure--dragon--animate:focus div:first-child,
	.figure--dragon--animate:active div:first-child {
		clip-path: polygon(0 0, 50% 0, 50% 100%, 0 100%);
		transform: translateX(50%);
	}
	.figure--dragon--animate:hover div:last-child,
	.figure--dragon--animate:focus div:last-child,
	.figure--dragon--animate:active div:last-child {
		clip-path: polygon(50% 0, 100% 0, 100% 100%, 50% 100%);
		transform: translateX(-50%);
	}
}
{% endcss %}
