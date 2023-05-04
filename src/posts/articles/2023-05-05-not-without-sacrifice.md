---
draft: true
date: 2023-05-05T00:20:09+0100
title: Not without sacrifice
description: With the boom of JavaScript frameworks and legends-come-true like the new CSS parent selector, we’ve borne witness to an explosion of new technologies and ways to build for the web. But what tradeoffs have we made for all these new bells and whistles?
tags:
  - state-of-the-web
---

<figure>
    <div id="bars-1" class="flow" title="Then">
        <data class="dx  background--maple" title="DX" value="50%"></data>
        <data class="ux  background--highland" title="UX" value="50%"></data>
    </div>
</figure>

In recent years, there has been a growing emphasis on the importance of Developer Experience (*DX*) in front end development. This has lead to the creation of powerful tools that assist developers in building and organising more feature-rich websites. With the introduction of new web technologies and seeing the maturity of beloved tools that have become essential to many in the field, suffice to say it has been an exciting time for web development.

<figure>
    <div id="bars-2" class="flow" title="Now">
        <data class="dx  background--maple" title="DX" value="67%"></data>
        <data class="ux  background--highland" title="UX" value="33%"></data>
    </div>
</figure>

However, when we compare our efforts in *DX* to efforts in User Experience (*UX*), it is important to remember that resources are not infinite. We can only expect to complete a day’s work in *nothing less* than a day. A decade ago, when the capabilities of the web were fewer and we didn’t have such a wide array of tools to aid in our work, we had more time to focus on the user’s experience. Assuming, of course, you hadn’t spent the entire week debugging a dropdown in Internet Explorer.

As [new web features bubbled to the surface](/feature-watch/) (growing now to a *rolling boil!*) the responsibility for learning and implementing new and/or complex has shifted to the front end developer. As a result, the time we once dedicated to ensuring the best experience for all users has been consumed by more developer-centric tasks. Unfortunately, this has left experiences for users who are not browsing under optimal conditions neglected.

In light of these constraints, our priorities as front end developers and the time we have to dedicate to each part of our work has shifted, and changing how we look at this shift puts the <q>battle</q> between *DX* and *UX* in a different perspective:

<figure>
    <div id="pie-2" title="Now">
        <data class="dx  background--maple" title="DX" value="67%"></data>
        <data class="ux  background--highland" title="UX" value="33%"></data>
    </div>
</figure>

That being said, it seems like there’s a shift nowadays to once again turn our attention more to the *UX* of our work—not to say that it’s *DX’s* <q>turn</q> to be thrown to the wayside, but that a concerted effort needs to be made to maintain an *appropriate balance*.

This is being done not just by dutiful practitioners of the web and inspirational speakers motivating designers and developers, but also by the new web features themselves, creating a powerful positive feedback loop. It’s heartwarming to see concerns about performance, sub-optimal browsing conditions, diversity, and more being brought back to the forefront of our discussions about how we should build for the open and inclusive web that we want.

**And I think it’s working.**

{% css %}
@layer overrides {
    [id*="bars-"],
    [id*="pie-"] {
        max-inline-size: 25rem;
        position: relative;
    }
    [id*="bars-"] {
        min-inline-size: 20rem;
    }
    [id*="bars-"] data,
    [id*="pie-"] data {
        font-weight: var(--font-weight-bold);
    }
    [id*="bars-"]::after,
    [id*="pie-"]::after {
        content: attr(title);
        font-size: var(--font-size-gamma);
        font-weight: var(--font-weight-semibold);
        position: absolute;
    }
    [id*="bars-"]::after {
        inset-inline-end: 0;
        inset-block-start: 50%;
        transform: translateY(-50%);
    }
    [id*="pie-"]::after {
        inset-inline-start: 100%;
        inset-block-start: 50%;
        transform: translateY(-50%);
        margin-inline-start: 1em;
    }
    [id*="bars-"] data {
        display: block;
        padding: 1em;
        position: relative;
        text-align: end;
    }
    [id*="bars-"] data::before,
    [id*="pie-"] data::before {
        content: attr(title);
    }
    #bars-1 data,
    #bars-2 .ux {
        inline-size: 10rem;
    }
    #bars-2 .dx {
        inline-size: 15rem;
    }
    [id*="pie-"] {
        block-size: 12rem;
        inline-size: 12rem;
        border-radius: 50%;
    }
    [id*="pie-"] data {
        position: absolute;
    }
    #pie-1 {
        background-image: conic-gradient(hsl(var(--hsl-maple)) 50%, hsl(var(--hsl-highland)) 0%);
    }
    #pie-2 {
        background-image: conic-gradient(hsl(var(--hsl-maple)) 60%, hsl(var(--hsl-highland)) 0%);
    }
    #pie-1 .dx {
        inset-inline-end: 20%;
        inset-block-start: 50%;
        transform: translateY(-50%);
    }
    #pie-2 .dx {
        inset-inline-end: 20%;
        inset-block-end: 33%;
    }
    #pie-1 .ux {
        inset-inline-start: 20%;
        inset-block-start: 50%;
        transform: translateY(-50%);
    }
    #pie-2 .ux {
        inset-inline-start: 20%;
        inset-block-start: 33%;
    }
}
{% endcss %}
