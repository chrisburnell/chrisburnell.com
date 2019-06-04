---
date: 2018-02-02 16:48:00

title: Scaling and Pixelating

codepen_slug: vdNeEa

syndicate_to:
- https://twitter.com/iamchrisburnell/status/959107237590589441
---


{% include content/codepen.html height='750' %}

This Pen demonstrates the differences between scaling an image with a transform and scaling an image by modifying the dimensions.

Designating the `image-rendering` property as `pixelated` with a **transform** scale seems to result in anti-aliasing around the edges of the image. Applying the same property value to a **dimensional** scale does not seem to exhibit the same anti-aliasing.
