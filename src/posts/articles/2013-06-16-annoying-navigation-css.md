---
date: 2013-06-16T03:58:00+0100
title: Annoying Navigation CSS
description: Navigation is crucial to a functional website. It is how your users find the information they're after; get it right, and your users are happy—get it wrong, and they go insane!
tags:
  - css
  - ux
banner:
  url: annoying-navigation-css.png
  alt: a photograph showing a dizzying scene of dozens, if not hundreds, of cars arranged tightly in all sorts of directions in what may be some kind of parking lot
---

Here’s a quick, little *CodePen* showcasing two annoying bits of CSS that many developers, sadly, are guilty of writing. It’s interactive, so make sure you hover and click around:

<c-codepen slug="LHqFy" height="740px"></c-codepen>

## What’s going on here?

This is a User Experience or Accessibility issue. Anything we can do to make our users feel like we’re taking care of them should be pursued, and this is no exception. In fact, by not creating block links in these navigation list scenarios, these mistakes are potentially driving away clicks in situations where the padding is relatively thick and users try to click, but nothing happens. The everyday user doesn’t *know* that the developer has forgotten to do this for them, and could easily think that the intended purpose was nothing, when in fact we’ve got some juicy content behind that link.

## Don’t throw away your visitors!

Check me out [on *CodePen*](https://codepen.io/chrisburnell "Chris Burnell on CodePen"), if you you’ve got some spare time. I highly recommend taking part in the [Pattern Rodeo](https://blog.codepen.io/rodeo/ "The Pattern Rodeo") if your motivation needs a kick up the rear!
