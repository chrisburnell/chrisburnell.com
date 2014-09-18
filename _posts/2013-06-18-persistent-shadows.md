---
layout: article
date: 2013-06-18 02:45:00
title: Persistent Shadows
introduction: How easy is it to keep a shadow’s direction consistent whilst rotating an element?
banner: persistent-shadows.png
banner_mobile: persistent-shadows_mobile.png
tags:
- CodePen
- CSS
- UX
comments: true
codepen: true
---

Nearing the end of the work-day yesterday, I was struck with an idea. Having recently read through [Google’s Visual Assets Guidelines on Behance](http://www.behance.net/gallery/Google-Visual-Assets-Guidelines-Part-1/9028077 "Google’s Visual Assets Guidelines on Behance") and stumbling upon this awesome pen (actually a fork of [Lionel’s](http://codepen.io/elrumordelaluz "Lionel on Github"), from Italy: [http://codepen.io/elrumordelaluz/pen/dobAz](http://codepen.io/elrumordelaluz/pen/dobAz "CSS3 Flat Icons")):

<pre class="codepen" data-height="220" data-type="result" data-href="kJcGE" data-user="chrisburnell" data-safe="true"> <code> </code> [Check out this Pen!](http://codepen.io/chrisburnell/pen/kJcGE) </pre>

My idea was basically this: I wonder if I could create something similar to the clock above using CSS3 *and maintain a persistent light source*. The trouble with the usual approach is that in using <code>transform</code> on an element, you are manipulating it’s <code>top</code>, <code>right</code>, <code>bottom</code>, and <code>left</code> attributes as you see them. If you <code>transform: rotate3d(0, 0, 1, 90deg);</code> a box, what you now see as the top of the box is in fact it’s <code>left</code> attribute. These shadow effects are typically done with <code>box-shadow</code>, and as the element rotates, the shadow will rotate with the element—<code>box-shadow: 2em 2em 0 black;</code> would produce a diagonal *bottom-right* shadow with no transform, but with <code>transform: rotate3d(0, 0, 1, 90deg);</code> it would become a diagonal *bottom-left* shadow...

<h3 id="hit-a-snag">We’ve hit a snag!<a href="#hit-a-snag" class="icon  heading-anchor" title="#hit-a-snag" aria-hidden="true"></a></h3>

<aside><p>Here’s an example of this effect (which [Chris Coyier loved on CodePen](http://codepen.io/chrisburnell/details/mglHp#lovers "Who loved my pen"))!</p></aside>

<pre class="codepen" data-height="425" data-type="result" data-href="mglHp" data-user="chrisburnell" data-safe="true"> <code> </code> [Check out this Pen!](http://codepen.io/chrisburnell/pen/mglHp) </pre>

<h3 id="how-does-that-work">How does that work?<a href="#how-does-that-work" class="icon  heading-anchor" title="#how-does-that-work" aria-hidden="true"></a></h3>

Well, maybe if we’re <code>animate</code>ing an element *(or pseudo element)* and manipulating its <code>transform</code> attribute, we can also change the <code>box-shadow</code> property at the same rate. Using the same example as above, if we say that when the box has the rule <code>transform: rotate3d(0, 0, 1, 90deg);</code>, it should *also* have <code>box-shadow: 2em -2em 0 black;</code>, which puts a shadow on the top-right of the box, which appears to be the bottom-right, as desired. Now, by switching from a 0-degree rotation to a 90-degree rotation *at the same speed* as we change from a bottom-right to a top-right shadow (and continuing this pattern for the full 360-degree rotation), our effect is be complete!

<aside><p>If you don’t know what I’m talking about in this paragraph, [read this](http://css-tricks.com/the-css-box-model "The CSS Box Model").</p></aside>

It may be interesting to note that as the medium we’re working with is composed of boxes, we need to add a point in our animation for every corner in our rotation—since we are going a full 360-degrees, we need four defined points, not including the <code>0%</code> and <code>100%</code> duplicates.

<h3 id="what-else">What else is there?<a href="#what-else" class="icon  heading-anchor" title="#what-else" aria-hidden="true"></a></h3>

What else do you think we could do with an effect like this? I think it could do from some simplification, and I wonder if there’s a solution simpler than this. If you know, let me know in the [comments](#comments), or [send me a pen](http://codepen.io "Codepen")!

<h3 id="something-extra">A little something-something extra, just for you<a href="#something-extra" class="icon  heading-anchor" title="#something-extra" aria-hidden="true"></a></h3>

Firstly, a CSS3 checkbox. Uses an invisible <code><input type="checkbox"></code> field and an <code>:after</code> attribute to toggle the style of the checkbox.

<aside><p>Add in a little bit of Javascript to toggle the text, but even that might not be necessary if you utilise the <code>:before</code> attribute.</p></aside>

<pre class="codepen" data-height="150" data-type="result" data-href="arouk" data-user="chrisburnell" data-safe="true"> <code> </code> [Check out this Pen!](http://codepen.io/chrisburnell/pen/arouk) </pre>

And secondly, here’s a gimmicky mockup I made as a joke to demonstrate to a friend at work that converting from *left-to-right* to *right-to-left* text was a piece of cake.

<pre class="codepen" data-height="200" data-type="result" data-href="DoJKw" data-user="chrisburnell" data-safe="true"> <code> </code> [Check out this Pen!](http://codepen.io/chrisburnell/pen/DoJKw) </pre>
