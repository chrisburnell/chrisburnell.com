---
layout: article
date: 2013-06-18 02:45:00
title: Persistent Shadows
slug: persistent-shadows
introduction: How easy is it to have a persistent shadow when rotating an element?
tags:
- CodePen
- CSS
- UX
---

Nearing the end of the work-day yesterday, I was struck with an idea. Having recently read through [Google's Visual Assets Guidelines on Behance](http://www.behance.net/gallery/Google-Visual-Assets-Guidelines-Part-1/9028077) and stumbling upon this awesome pen (actually a fork of [Lionel's](http://codepen.io/elrumordelaluz), from Italy: <http://codepen.io/elrumordelaluz/pen/dobAz>):

<pre class="codepen" data-height="220" data-type="result" data-href="kJcGE" data-user="chrisburnell" data-safe="true"> <code> </code> <a href="http://codepen.io/chrisburnell/pen/kJcGE">Check out this Pen!</a> </pre>

My idea was basically this: I wonder if I could create something similar to the clock above using CSS3 *and maintain a persistent light source*. The trouble with the usual approach is that in using <code>transform</code> on an element, you are manipulating it's <code>top</code>, <code>right</code>, <code>bottom</code>, and <code>left</code> attributes as you see them. If you <code>transform: rotate3d(0, 0, 1, 90deg);</code> a box, what you now see as the top of the box is in fact it's <code>left</code> attribute. These shadow effects are typically done with <code>box-shadow</code>, and as the element rotates, the shadow will rotate with the element&mdash;<code>box-shadow: 2em 2em 0 black;</code> would produce a diagonal *bottom-right* shadow with no transform, but with <code>transform: rotate3d(0, 0, 1, 90deg);</code> it would become a diagonal *bottom-left* shadow...

### We've hit a snag!

<aside><p>Here's an example of this effect (which [Chris Coyier loved on CodePen](http://codepen.io/chrisburnell/details/mglHp#lovers))!</p></aside><pre class="codepen" data-height="425" data-type="result" data-href="mglHp" data-user="chrisburnell" data-safe="true"> <code> </code> <a href="http://codepen.io/chrisburnell/pen/mglHp">Check out this Pen!</a> </pre>

### How does that work?

Well, maybe if we're <code>animate</code>ing an element *(or pseudo element)* and manipulating its <code>transform</code> attribute, we can also change the <code>box-shadow</code> property at the same rate. Using the same example as above, if we say that when the box has the rule <code>transform: rotate3d(0, 0, 1, 90deg);</code>, it should *also* have <code>box-shadow: 2em -2em 0 black;</code>, which puts a shadow on the top-right of the box, which appears to be the bottom-right, as desired. Now, by switching from a 0-degree rotation to a 90-degree rotation *at the same speed* as we change from a bottom-right to a top-right shadow (and continuing this pattern for the full 360-degree rotation), our effect is be complete!

<aside><p>If you don't know what I'm talking about in this paragraph, [read this](http://css-tricks.com/the-css-box-model).</p></aside><p>It may be interesting to note that as the medium we're working with is composed of boxes, we need to add a point in our animation for every corner in our rotation&mdash;since we are going a full 360-degrees, we need four defined points, not including the <code>0%</code> and <code>100%</code> duplicates.</p>

### What else is there?

What else do you think we could do with an effect like this? I think it could do from some simplification, and I wonder if there's a solution simpler than this. If you know, let me know in the comments, or [send me a pen](http://codepen.io)!

### A little something-something extra, just for you

Firstly, a CSS3 checkbox. Uses an invisible checkbox <code>input</code> field and some **CSS2.1 selector action** to toggle the style of the checkbox.

<pre class="codepen" data-height="150" data-type="result" data-href="arouk" data-user="chrisburnell" data-safe="true"> <code> </code> <a href="http://codepen.io/chrisburnell/pen/arouk">Check out this Pen!</a> </pre>

And secondly, here's a stupid gimmick mockup I did as a joke to demonstrate to a friend at work that converting from *left-to-right* to *right-to-left* text was a piece of cake.

<pre class="codepen" data-height="200" data-type="result" data-href="DoJKw" data-user="chrisburnell" data-safe="true"> <code> </code> <a href="http://codepen.io/chrisburnell/pen/DoJKw">Check out this Pen!</a> </pre>
<script src="http://codepen.io/assets/embed/ei.js"></script>
