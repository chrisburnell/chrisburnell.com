---
categories: article

date: 2013-06-18 02:45:00

title: Persistent Shadows
lede: How easy is it to keep a shadow’s direction consistent whilst rotating an element?
tags:
- codepen
- css
- ux

banner:
- persistent-shadows.png
banner_mobile:
- persistent-shadows_mobile.png

comments: disqus
codepen: true
---


Nearing the end of the work-day yesterday, I was struck with an idea. Having recently read through [Google’s Visual Assets Guidelines on Behance](https://www.behance.net/gallery/Google-Visual-Assets-Guidelines-Part-1/9028077 "Google’s Visual Assets Guidelines on Behance"){:rel="external"} and stumbling upon this awesome pen (actually a fork of [Lionel’s](https://codepen.io/elrumordelaluz "Lionel on Github"){:rel="external"}, from Italy: [https://codepen.io/elrumordelaluz/pen/dobAz](https://codepen.io/elrumordelaluz/pen/dobAz "CSS3 Flat Icons"){:rel="external"}):

{% include content/codepen.html slug='kJcGE' height='220' theme='tabfree' %}

My idea was as such: I wonder if I could create something similar to the clock above using CSS3 *and maintain a persistent light source*. The trouble with the usual approach is that in using `transform` on an element, you are manipulating it’s `top`, `right`, `bottom`, and `left` attributes as you see them. If you `transform: rotate3d(0, 0, 1, 90deg);` a box, what you now see as the top of the box is in fact it’s `left` attribute. These shadow effects are typically done with `box-shadow`, and as the element rotates, the shadow will rotate with the element—`box-shadow: 2em 2em 0 black;` would produce a diagonal *bottom-right* shadow with no transform, but with `transform: rotate3d(0, 0, 1, 90deg);` it would become a diagonal *bottom-left* shadow…


{% include_cached content/heading.html title='We’ve hit a snag!' id='hit-a-snag' %}

<aside><p>Here’s an example of this effect (which <a href="https://codepen.io/chrisburnell/details/mglHp#lovers">Chris Coyier loved on <em>CodePen</em></a>)!</p></aside>

{% include content/codepen.html slug='mglHp' height='425' %}


{% include_cached content/heading.html title='How does that work?' %}

Well, maybe if we’re `animate`ing an element *(or pseudo element)* and manipulating its `transform` attribute, we can also change the `box-shadow` property at the same rate. Using the same example as above, if we say that when the box has the rule `transform: rotate3d(0, 0, 1, 90deg);`, it should *also* have `box-shadow: 2em -2em 0 black;`, which puts a shadow on the top-right of the box, which appears to be the bottom-right, as desired. Now, by switching from a 0-degree rotation to a 90-degree rotation *at the same speed* as we change from a bottom-right to a top-right shadow (and continuing this pattern for the full 360-degree rotation), our effect is be complete!

<aside><p>If you don’t know what I’m talking about in this paragraph, [read this](https://css-tricks.com/the-css-box-model "The CSS Box Model"){:rel="external"}.</p></aside>

It may be interesting to note that as the medium we’re working with is composed of boxes, we need to add a point in our animation for every corner in our rotation—since we are going a full 360-degrees, we need four defined points, not including the `0%` and `100%` duplicates.


{% include_cached content/heading.html title='What else is there?' id='what-else' %}

What else do you think we could do with an effect like this? I think it could do from some simplification, and I wonder if there’s a solution more basic than this. If you know, let me know in the [comments](#comments), or [send me a pen](https://codepen.io "CodePen"){:rel="external"}!


{% include_cached content/heading.html title='A little something-something extra, just for you' id='something-extra' %}

Firstly, a CSS3 checkbox. Uses an invisible `<input type="checkbox">` field and an `:after` attribute to toggle the style of the checkbox.

<aside><p>Add in a little bit of JavaScript to toggle the text, but even that might not be necessary if you utilise the <code>:before</code> attribute.</p></aside>

{% include content/codepen.html slug='arouk' height='150' %}

And secondly, here’s a gimmicky mockup I made as a joke to demonstrate to a friend at work that converting from *left-to-right* to *right-to-left* text was a piece of cake.

{% include content/codepen.html slug='DoJKw' height='200' %}
