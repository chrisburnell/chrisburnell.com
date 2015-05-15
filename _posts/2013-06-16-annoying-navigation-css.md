---
layout: article
category: article

date: 2013-06-16 03:58:00

title: Annoying Navigation CSS
introduction: Navigation is crucial to a functional website. It is how your users find the information they're after; get it right, and your users are happy—get it wrong, and they go insane!
tags:
- codepen
- css
- ux

banner:        annoying-navigation-css.png
banner_mobile: annoying-navigation-css_mobile.png

shorturl: nmwge
codepen: true
comments: true
---

Here’s a quick, little CodePen showcasing two annoying bits of CSS that many developers, sadly, are guilty of writing. It’s interactive, so make sure you hover and click around:

{% include embed-codepen.html slug="LHqFy" theme="tabfree" height="740" %}


{% include heading.html title="What’s going on here?" id="whats-going-on" %}

This is basically just a User Experience or accessibility issue. Anything we can do to make our users feel like we’re taking care of them should be pursued, and this is no exception. In fact, by not creating block links in these navigation list scenarios, these mistakes are potentially driving away clicks in situations where the padding is relatively thick and users try to click, but nothing happens. The everyday user doesn’t *know* that the developer has forgotten to do this for them, and could easily think that the intended purpose was nothing, when in fact we’ve got some juicy content behind that link.


{% include heading.html" title="Don’t throw away your visitors!" id="dont-throw-away-visitors" %}

Check me out [on CodePen](http://codepen.io/chrisburnell "Chris Burnell on Codepen"), if you you’ve got some spare time. I highly recommend taking part in the [Pattern Rodeo](http://blog.codepen.io/rodeo/ "The Pattern Rodeo") if your motivation needs a kick up the rear!
