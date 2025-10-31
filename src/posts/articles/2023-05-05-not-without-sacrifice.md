---
updated: 2023-05-13T09:13:00+0100
date: 2023-05-05T00:20:09+0100
title: Not without sacrifice
description: With the boom of JavaScript frameworks and legends-come-true like the new CSS parent selector, we’ve borne witness to an explosion of new technologies and ways to build for the web. But what tradeoffs have we made for all these new bells and whistles?
tags:
  - state-of-the-web
css_includes:
  - src/css/pages/not-without-sacrifice.scss
---

I recently had the pleasure of watching [Jack Franklin’s](https://www.jackfranklin.co.uk) talk from [All Day Hey! 2023](https://heypresents.com/conferences/2023), [<q>Abstractions, complexities and off-ramps</q>](https://www.youtube.com/watch?v=Siq8eBkgpjY), and a couple of slides [at the end](https://youtu.be/Siq8eBkgpjY?t=2582) got me thinking about the landscape of developer concerns in front end; *a bit cynically, I’ll admit, but it comes back around in the end!*

----

In recent years, there has been a growing emphasis on the importance of Developer Experience (*DX*) in front end development. This has led to the creation of powerful tools that assist developers in building and organising more feature-rich websites. With the introduction of new web technologies and seeing the maturity of beloved tools that have become essential to many in the field, suffice to say it has been an exciting time for web development.

<figure>
    <div id="bars-2" class="flow" title="Now">
        <data class="dx  background--maple" title="DX" value="67%"></data>
        <data class="ux  background--highland" title="UX" value="33%"></data>
    </div>
</figure>

However, when we compare our efforts in *DX* to efforts in User Experience (*UX*), it is important to remember that **resources are not infinite**. We can only expect to complete a day’s work in *nothing less* than a day. A decade ago, when the capabilities of the web were fewer and we didn’t have such a wide array of tools to aid in our work, we had more time to focus on the user’s experience. Assuming, of course, you hadn’t spent the entire week debugging a <q>dropdown</q> in Internet Explorer.

As [new web features](/feature-watch/) bubble to the surface (growing now to a *rolling boil!*) the responsibility for learning and implementing new and/or complex has shifted to the front end developer. As a result, the time we once dedicated to ensuring the best experience for all users has been consumed by more developer-centric tasks. Unfortunately, this has left experiences for users who are not browsing under optimal conditions neglected.

In light of these constraints, our priorities as front end developers and the time we have to dedicate to each part of our work has shifted. Changing how we look at this shift puts the <q>battle</q> between *DX* and *UX* in a different perspective:

<figure>
    <div id="pie-2" title="Now">
        <data class="dx  background--maple" title="DX" value="67%"></data>
        <data class="ux  background--highland" title="UX" value="33%"></data>
    </div>
</figure>

That being said, it seems like things are moving once again focus more on the *UX* of our work—not to say that it’s *DX’s* <q>turn</q> to be thrown to the wayside, but that a concerted effort needs to be made to maintain an *appropriate balance*.

This shift hasn’t only just begun; we’ve seen great articles musing on this subject and even evidence of this shift in different forms today, e.g.

- *[The <q>Developer Experience</q> Bait-and-Switch](https://infrequently.org/2018/09/the-developer-experience-bait-and-switch/)* by [Alex Russell](https://infrequently.org/)
- *[Split](https://adactio.com/journal/15050)* by [Jeremy Keith](https://adactio.com/)
- accessibility overlays ([though mileage may vary](https://adrianroselli.com/tag/overlay))
- web features like [`prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) and [`color-scheme`](https://developer.mozilla.org/en-US/docs/Web/CSS/color-scheme)
- [accessibility compliance laws](https://www.gov.uk/guidance/accessibility-requirements-for-public-sector-websites-and-apps)
- an ever-growing focus on [building greener websites](https://css-irl.info/building-a-greener-web/)

It’s heartwarming to see concerns about performance, sub-optimal browsing conditions, diversity, and more being brought back to the forefront of our discussions about how we should build for the open and inclusive web that we want.

> A society grows great when there are those who would plant trees under whose shade they know they will never sit.
