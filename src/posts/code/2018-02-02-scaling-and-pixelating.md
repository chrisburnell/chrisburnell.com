---
date: 2018-02-02T16:48:00+0000
title: Scaling and Pixelating
tags:
  - css
  - ux
codepen_slug: vdNeEa
syndicate_to:
  - https://codepen.io/chrisburnell/pen/vdNeEa
  - https://twitter.com/iamchrisburnell/status/959107237590589441
---

<c-codepen slug="{{ codepen_slug }}" height="750px"></c-codepen>

This Pen demonstrates the differences between scaling an image with a transform and scaling an image by modifying the dimensions.

Designating the `image-rendering` property as `pixelated` with a **transform** scale seems to result in anti-aliasing around the edges of the image. Applying the same property value to a **dimensional** scale does not seem to exhibit the same anti-aliasing.
