---
date: 2022-10-19T10:00:00+0100
title: Moving Targets
description: I was just working on some styling changes to my website and fell into a rabbit-hole on URLs, the <code>&lt;mark&gt;</code> element and <code>:target</code> pseudo-class, and ended up writing an animation as a handy technique for drawing the reader’s attention.
tags:
  - css
  - html
  - ux
syndicate_to:
  - https://twitter.com/iamchrisburnell/status/1583014193909096448
---

## Choose your own adventure

<div class=" [ box  box--line-length  box--ancient ] [ flow ] ">
    <p>You’ve gone to the library to check out a book. You browse the many shelves on wildly-differing topics, themes, tones, and so on, until you find the one you’re looking for. Stained and tattered, you know this book must be good, or at least it’s seen some use!</p>
    <p>When you open the pages you find scrawlings in the columns from anonymous authors, and there are even sticky notes sticking out along the side. On these *special pages*, someone has highlighted a sentence here and there, and another, in pen, has put an enormous exclamation point in the column of the page.</p>
    <p class="italic">To put the book down and find something else to read, <button class=" [ anchor ] " onClick="closeWindow(); return false;">click here</button></p>
    <p class="italic">To turn to the first marked page and start reading, <a href="#the-url">click here</a></p>
</div>

## The URL

One of the most powerful features of the web is the [URL](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_is_a_URL). A <abbr title="Uniform Resource Locator">URL</abbr> acts like an address to a unique resource on the web. If the web was a library, and every domain had its own shelf, we can think of the web pages/URLs on a domain as the books on that shelf.

By applying an [`id` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id) to an element on a web page, the author can mark that spot for the reader, like placing a sticky note along the side of a page in a book. But in this case, the sticky note is permanent, as long as the author doesn’t change/remove it (the `id` on the web page) or the book on the shelf (the URL on the domain). When someone visits that web page with the `id` in the URL as an [anchor](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_is_a_URL#anchor), their browser will jump them directly to the target element—extremely useful when sharing a URL, allowing readers to skip straight to the content relevant to them.

This means that if we can return to the same URL, time and again, and expect the same content, we should reasonably be able to expect `ids` to remain unchanged as well. This is the backbone for how linking across the web works, and an important reason to [make sure your URLs stay the same](https://longbets.org/601/)!

## Zeroing in

But enough about the URL. Let’s talk about how to use those `id` attributes to enhance the browsing experience and help readers to find their relevant content when they arrive at a page with an anchor in the URL pointing to an `id` on the page.

When a reader navigate to a URL containing an anchor matching an `id` on the page, that matching element receives the [`:target`](https://developer.mozilla.org/en-US/docs/Web/CSS/:target) pseudo-class, and we can use that to apply some CSS to our `:target` element.

For inspiration, let’s look to an HTML element used to *literally* highlight text, `<mark>`:

<blockquote>
    <p class=" [ no-quotes ] ">Then this ebony bird beguiling my sad fancy into smiling,<br>
By the grave and stern decorum of the countenance it wore,<br>
<q>Though thy crest be shorn and shaven, thou,</q> I said, <q>art sure no craven,<br>
Ghastly grim and ancient Raven wandering from the Nightly shore—<br>
Tell me what thy lordly name is on the Night’s Plutonian shore!</q><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<mark>Quoth the Raven <q>Nevermore.</q></mark></p>
    <cite>Edgar Allan Poe</cite>
</blockquote>

```html
Then this ebony bird beguiling my sad fancy into smiling,<br>
By the grave and stern decorum of the countenance it wore,<br>
<q>Though thy crest be shorn and shaven, thou,</q> I said, <q>art sure no craven,<br>
Ghastly grim and ancient Raven wandering from the Nightly shore—<br>
Tell me what thy lordly name is on the Night’s Plutonian shore!</q><br>
&#9;&#9;&#9;<mark>Quoth the Raven <q>Nevermore.</q></mark>
```

--------

Just to get things moving, let’s *reuse* the styles we’ve from our `<mark>` elements for our `:target` selector, at least as a starting point:

```css
mark,
:target {
	background-color: yellow;
	color: black;
}
```

However, this introduces an unintended side effect: elements that have the `:target` pseudo-class applied to them won’t lose it until the anchor in the URL changes somehow. This means that our target element will have a yellow background and black text until the reader navigates away, unless they trigger `:target` on another element—only one element can be targetted at a time.

While this *is* what we want for the `<mark>` element, which styles should appear permanently—like highlighting a page in a book—it’s *not* what we want for the `:target`. Instead, we need the styles to appear only temporarily.

## My target don’t jiggle jiggle, it fades

We can solve this with a simple CSS animation that looks almost unfinished:

```css
:target {
	animation: 2s ease target;
}

@keyframes target {
	0%,
	50% {
		background-color: yellow;
		color: black;
	}
}
```

*Wait, no `100%`? How is this animation supposed to finish?*

That’s the charm. The browser figures it out, based on whatever styles would be applied *without* the `:target` pseudo-class. So, from `0%` to `50%`, or half of the animation’s duration, we’ve told our target element to maintain the yellow background and black text. Then, from `50%` onwards, the browser will animate the `background-color` / `color` properties between `yellow` / `black` and whatever the otherwise declared or inherited values for those two properties are.

By the end of the animation, the element appears as if it is *not* being targeted, leaving our other styles to do their thing. This technique is particularly useful when we want to direct attention to an important heading, form element, footnote, etc.

<div class=" [ box ] [ flow ] ">
    <h3>Try it out!</h3>
    <p>
        <a href="#first">First</a>
    </p>
    <p id="first">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </p>
    <p>
        <a href="#second">Second</a>
    </p>
    <p id="second">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </p>
</div>

## Covering all the bases

Of course, it’s always best to put animations, transitions, and the like behind a check against the browser preference for *reduced motion*, which means they prefer that websites not use those properties. Because the preference is boolean (on/off), it’s best to err on the side of caution and completely disable these things when we can detect the browser preference is on. But before we go and wrap our CSS in a media query, consider the following:

Since we’re using motion, it’s useful to include something like the following snippet as part of our CSS Reset because all we have to do is… say it with me, now, folks: **set it and forget it!**

```css
@media (prefers-reduced-motion: reduce) {
	*,
	*::before,
	*::after {
		background-attachment: initial !important;
		scroll-behavior: auto !important;
		animation-delay: 0s !important;
		animation-duration: 0s !important;
		animation-iteration-count: 1 !important;
		transition: none !important;
	}
}
```

These terse, twelve lines mean that we won’t have to remember to check reduced motion preferences every time we make use of motion in our CSS. This ensures that, when the browser preference is to *reduce motion*:

0. Backgrounds images are fixed in place and unable to move
0. Scrolling happens instantly, rather than smoothly over a short period of time
0. Transitions are completely disabled, i.e. instant snap between properties/values
0. Animation outcomes are *preserved*, but the delay, duration, and number of iterations is made to happen instantly

## Over to you

How do you handle `:target` styles? What about `<mark>`? Let me know, I’d love to see other example!

And check out other selectors like [`::selection`](https://developer.mozilla.org/en-US/docs/Web/CSS/::selection) for cursor-highlighted text or even the newer [`::target-text`](https://developer.mozilla.org/en-US/docs/Web/CSS/::target-text); although, make sure you’re content with the [browser support](/feature-watch/#mdn-javascript_builtins_array_at) before you get too deep!

<script>
	function closeWindow() {
		if (window.confirm("Are you sure you wish to end this chapter?")) {
			window.open('', '_self', '');
			window.close();
			history.back(-1);
		}
	}
</script>
