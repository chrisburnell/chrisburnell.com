---
layout: article
categories: article

date: 2014-08-27 15:00:00

title: A Slice of Heaven
lede: We know that webpages are composed of text and boxes. Lots and lots of boxes. But with the power and might of CSS3 we can do some fancy stuff that never used to be possible.
tags:
- codepen
- css
- tutorials

# banner:        a-slice-of-heaven.png
# banner_mobile: a-slice-of-heaven_mobile.png

shorturl: ynt2q
codepen: true
comments: true
---

I’ve been making quite a few pens over on [Codepen](http://codepen.io) lately, mostly exploring what can be achieved with just CSS where in the past we would have to look to JavaScript or bloating our user’s pipes with image requests—which is a [whole other universe](http://www.w3.org/html/wg/drafts/html/master/embedded-content.html#the-picture-element "The Picture Element") nowadays.

All of the examples are interactive, so make sure you hover or click where necessary; although, they are best suited for a tablet or desktop, so if you’re viewing on mobile, they may not work as intended.


{% include heading.html title='Psychedelic Slice' %}

Hover the slice to see how this one works.

{% include codepen.html slug="apogK" height="350" %}

In this Pen, I’m taking advantage of `border-radius` and `overflow` on an element affecting its children—in this case pseudo elements—to create a one-third slice of a circle without images and a transparent background.

*Edit: There is a [Chrome bug](https://code.google.com/p/chromium/issues/detail?id=157218) with `border-radius` and `overflow` not masking child elements property when modified with a `transform`. Hopefully this is fixed soon, but in the meantime, I’ve added a `border-radius` and an associated `transform` on the `:before` and `:after` elements.*


{% include heading.html title='Zoomy Anchor Thing' %}

This pen was inspired by an neat effect I saw on [Square](https://squareup.com#verticals).

{% include codepen.html slug="lcEvB" height="350" %}

*Edit: This pen was featured on [Codepen’s front page](http://ss.chrisburnell.com/2014-08-28_1411.png "ego boost manifested in PNG format"), netting me some [sweet internet points](http://codepen.io/chrisburnell/details/lcEvB/#stats "Stats for this pen")! Achievement Unlocked.*


{% include heading.html title='Modal Container without JS' %}

This pen was inspired by Chris Coyier’s [blog post on Codepen](http://codepen.io/chriscoyier/blog/a-closeable-noscript-warning-modal "A Closeable Noscript Warning Modal") explaining how they handle users who have turned off JavaScript and won’t be able to use Codepen properly, as Codepen relies on JavaScript to display Pens.

{% include codepen.html slug="scyKF" height="350" %}

One of the often underused but **powerful** utilities available in HTML is the relationship between an `input` element and its `label` element—you can even use multiple `label`s to control your `input` field. This allows you a JavaScript-free toggle, which you can use to show/hide elements, toggle styles, and more.


{% include heading.html title='Slip-n-slide Modal' %}

This was an effect I’ve seen used across the web before that I’d wanted to try building for myself but simply never got around to it. It’s a bit jittery, so if you can figure out how to make this one [jank-free](http://jankfree.org/ "Jank Free"), let me know in the [comments](#comments). It uses the same concept as the *Modal Container without JS* to show and hide the modal content.

{% include codepen.html slug="sDBJk" height="630" %}


{% include heading.html title='Simple CSS Checkbox Revisited' %}

This is a pen which I overhauled a bit since I first wrote about it in <a href="{% post_url 2013-06-18-persistent-shadows %}">Persistent Shadows</a>:

{% include codepen.html slug="arouk" height="250" %}

And the revisited version:

{% include codepen.html slug="Cbiun" height="250" %}

Input fields have always been a point of pain for front-end developers. Using this method we get around having to worry about styling them and rely on the sibling selectors (`+` and `~`, see more [on Can I Use](http://caniuse.com/#search=sibling "Sibling Selectors")) to modify the styles applied to the `input`’s associated `label` element based on the `:checked` state of the `input`.

Big thanks goes to [Dan Simmons](https://twitter.com/dansimau "Dan Simmons on Twitter") for helping me improve this even further by adding keyboard support for the hidden `input` field.


{% include heading.html title='Over to you' %}

Interested in these sorts of projects? Check out [A Single Div](http://a.singlediv.com/ "A Single Div"), a <q>CSS drawing experiment to see what's possible with a single div</q>, by [Lynn Fisher](https://twitter.com/lynnandtonic "Lynn Fisher").

Let me know in the [comments](#comments) if you have any examples or cool pens of your own!
