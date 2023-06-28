---
date: 2013-06-18T02:45:00+0100
title: Persistent Shadows
description: How easy is it to keep a shadow's direction consistent whilst rotating an element?
tags:
  - css
  - ux
  - motion
banner: persistent-shadows.png
---

Nearing the end of the work-day yesterday, I was struck with an idea. Having recently read through [Google’s Visual Assets Guidelines on Behance](https://www.behance.net/gallery/Google-Visual-Assets-Guidelines-Part-1/9028077 "Google’s Visual Assets Guidelines on Behance") and stumbling upon this awesome CodePen (actually a fork of [Lionel’s](https://codepen.io/elrumordelaluz "Lionel on Github"), from Italy: [https://codepen.io/elrumordelaluz/pen/dobAz](https://codepen.io/elrumordelaluz/pen/dobAz "CSS3 Flat Icons")):

<c-codepen slug="kJcGE" tabfree="true" height="220px"></c-codepen>

My idea was as such: I wonder if I could create something similar to the clock above using CSS3 *and maintain a persistent light source*. The trouble with the usual approach is that in using `transform` on an element, you are manipulating it’s `top`, `right`, `bottom`, and `left` attributes as you see them. If you `transform: rotate3d(0, 0, 1, 90deg);` a box, what you now see as the top of the box is in fact it’s `left` attribute. These shadow effects are typically done with `box-shadow`, and as the element rotates, the shadow will rotate with the element—`box-shadow: 2em 2em 0 black;` would produce a diagonal *bottom-right* shadow with no transform, but with `transform: rotate3d(0, 0, 1, 90deg);` it would become a diagonal *bottom-left* shadow…

<h2 id="hit-a-snag">We’ve hit a snag!</h2>

<aside><p>Here’s an example of this effect:</p></aside>

<c-codepen slug="mglHp" height="425px"></c-codepen>

## How does that work?

Well, maybe if we’re `animate`ing an element *(or pseudo element)* and manipulating its `transform` attribute, we can also change the `box-shadow` property at the same rate. Using the same example as above, if we say that when the box has the rule `transform: rotate3d(0, 0, 1, 90deg);`, it should *also* have `box-shadow: 2em -2em 0 black;`, which puts a shadow on the top-right of the box, which appears to be the bottom-right, as desired. Now, by switching from a 0-degree rotation to a 90-degree rotation *at the same speed* as we change from a bottom-right to a top-right shadow (and continuing this pattern for the full 360-degree rotation), our effect is be complete!

<aside><p>If you don’t know what I’m talking about in this paragraph, [read this](https://css-tricks.com/the-css-box-model "The CSS Box Model").</p></aside>

It may be interesting to note that as the medium we’re working with is composed of boxes, we need to add a point in our animation for every corner in our rotation—since we are going a full 360-degrees, we need four defined points, not including the `0%` and `100%` duplicates.

<h2 id="what-else">What else is there?</h2>

What else do you think we could do with an effect like this? I think it could do from some simplification, and I wonder if there’s a solution more basic than this. If you know, let me know in the [comments](#respond), or [send me a pen](https://codepen.io/ "CodePen")!

<h2 id="something-extra">A little something-something extra, just for you</h2>

Firstly, a CSS3 checkbox. Uses an invisible `<input type="checkbox">` field and an `:after` attribute to toggle the style of the checkbox.

<aside><p>Add in a little bit of JavaScript to toggle the text, but even that might not be necessary if you utilise the <code>:before</code> attribute.</p></aside>

<c-codepen slug="arouk" tabfree="true" height="150px"></c-codepen>

And secondly, here’s a gimmicky mockup I made as a joke to demonstrate to a friend at work that converting from *left-to-right* to *right-to-left* text was a piece of cake.

<c-codepen slug="DoJKw" tabfree="true" height="200px"></c-codepen>
