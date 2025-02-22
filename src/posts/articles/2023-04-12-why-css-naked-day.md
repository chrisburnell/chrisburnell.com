---
date: 2023-04-14T00:30:00+0100
title: Why I participated in CSS Naked Day
description: "CSS Naked Day has come and gone for this year, but I’ll be making it a point to participate for many years to come."
tags:
  - html
  - css
  - ux
banner:
  url: emperors-new-clothes.jpeg
  alt: "The Emperor’s New Clothes, by Vilhelm Pedersen. The illustration depicts a royal parade where the emperor is wearing just his undergarments, and the onlooking spectators display shocked expressions on their faces."
  caption: "Illustration by [Vilhelm Pedersen](https://en.wikipedia.org/wiki/Vilhelm_Pedersen). Taken from [Wikipedia](https://en.wikipedia.org/wiki/The_Emperor%27s_New_Clothes)."
---

An annual event falling on April {{ 9 | ordinal | safe }} of every year since 2006, the <dfn title="the reason for existing">raison d’être</dfn> of [CSS Naked Day](https://css-naked-day.github.io/) is to promote <q id="cssnakedday-quote">proper use of HTML, semantic markup, [and] a good hierarchy structure</q> by completely stripping CSS from our websites.

## How long is a day?

Although the event takes place on April {{ 9 | ordinal | safe }}, *CSS Naked Day* actually lasts for <s>48</s> 50 hours ^[Through writing this article, I learned that [UTC offsets](https://en.wikipedia.org/wiki/List_of_UTC_offsets) actually extend to [UTC+13](https://en.wikipedia.org/wiki/UTC%2B13:00) and [UTC+14](https://en.wikipedia.org/wiki/UTC%2B14:00).]. This is so that no matter where in the world a website’s visitor might be—in other words, no matter their timezone—if it’s April {{ 9 | ordinal | safe }} on *their calendar*, our websites should be served without CSS.

For example, someone living in the <abbr title="Coordinated Universal Time">UTC</abbr>+14 timezone will arrive on April {{ 9 | ordinal | safe }} first, whilst the rest of the world is still on April {{ 7 | ordinal | safe }} / {{ 8 | ordinal | safe }}, so we need to make sure that our CSS is disabled *by then*.

Likewise, someone in the <abbr title="Coordinated Universal Time">UTC</abbr>-12 timezone will be in the last timezone to tick over from the {{ 9 | ordinal | safe }} to the {{ 10 | ordinal | safe }}, so we need to make sure CSS is disabled *until then*.

This leaves us with a 50-hour period during which time participants’ websites will be served without CSS, stretching from <time datetime="2023-04-08T10:00:00+00:00">April {{ 8 | ordinal | safe }} @ 10:00:00 UTC</time> until <time datetime="2023-04-10T12:00:00+00:00">April {{ 10 | ordinal | safe }} @ 12:00:00 UTC</time>.

## What’s the point?

In a time where the waters of front end development were churning with the currents of strong opinions and a swiftly-changing development landscape, an individual strode forth to bear the storm’s fury. Suddenly, the currents dissapated and the churning waters relaxed until they were calmed, as the individual spoke clearly forth:

> Be the browser’s mentor, not its micromanager

I’ve said it before, but I’ll say it again. Andy Bell’s talk, named above, is one of my **all-time favourites**. In it, Andy walks through building a website from scratch, and if you haven’t seen the talk, I urge you to do so:

<c-youtube slug="5uhIiI9Ld5M" label="Andy Bell – Be the browser’s mentor, not its micromanager"></c-youtube>

<aside class="inline-aside" style="--inset-block-start: -5em">
    <div class=" [ box ] ">
        <p>If you’re in the mood for some more great talks, why not check out <a href="https://www.youtube.com/watch?v=F3OpvEX2fhs"><q>The Web Is Agreement</q></a> by <a href="https://adactio.com/">Jeremy Keith</a> or <a href="https://www.youtube.com/watch?v=H9DTDbnwQyE"><q>The World-Wide Work</q></a> by <a href="">Ethan Marcotte</a>.</p>
    </div>
</aside>

### Why am I bringing this up?

At the start of the talk, Andy runs through the high-level CSS technologies he’ll be using to build a website [(here’s the website)](https://buildexcellentwebsit.es/), and, most notably, that they’re <q>all underpinned by progressive enhancement</q>. *This is important.* As he continues through the talk, he shows that progressive enhancement can and should start *way* before where we have grown accustomed to thinking about it.

I don’t think it’s uncommon that progressive enhancement is thought of in the context of, <q>I’ve got my page, and I’ll enhance it with this new CSS property for modern browsers, and I’ll even make sure my forms work without JavaScript</q>. This isn’t wrong at all—these are good things to do: making sure that your *un*enhanced experience works just as well as a fully-enhanced one. Because one experience is enhanced should not mean another experience suffers.

But I think what Andy really drove home for me was that progressive enhancement can start all the way back at the inception of HTML and we can think of CSS itself as a progressive enhancement: we should aim to get as much of what the page wants to achieve just through carefully-crafted HTML.

This means that before we even apply styles, we should make sure that our page follows a clear hierarchy, provides semantic markup, etc. *Hold on*, [this sounds familiar](#cssnakedday-quote), doesn’t it…

### Brass tacks

By stripping our websites of CSS, and even building our websites *without CSS first*, we are making a clear division between content and styles, and when we do this, we have to rely on the browser’s default method of presenting HTML. This seems to me like a reasonable place to start progressively enhancing the content with styles, so let’s make sure that the foundation we’re building off of is absolutely rock-solid.

We’re doing ourselves innumerable favours by building in this way, too. By making sure that buttons are represented by `<button>` elements, headings and menus follow a natural hierarchy, what is part of the page’s content is not tucked into a pseudo element, etc. we have baked functionality, styles, and even critical accessibility hooks into our webpages.

By removing veils between us and the browser, we get a much clearer picture of what the browser is doing when it interprets and represents our HTML, and making drastically more apparent when there are issues. Just by preparing my website for this year, I was able to quickly find and rectify a number of problems with relatively-trivial fixes. To name a few:

- a more-complete understanding of the `hidden`/`disabled`/`inert`/`aria-hidden` attributes, and finding ways to better use them alongside <q>visually-hidden</q> classes, etc.
- a number of semantic HTML fixes, not limited to:
  - heading hierarchy
  - presentational imagery
  - hidden content
- order of content without CSS, where typically I would only concern myself with the <q>mobile</q> order and I am able to reorder items using Flex or Grid

## Annual check-up

This was an extremely-rewarding task to work through, and I feel like my website is better as a result of doing it. I’ll definitely be participating for years to come. In fact, unless I change or break things, my website is already prepared for next year, and I just need to wait for the automatic build of my website to occur on April {{ 8 | ordinal | safe }} in 2024.

Even though this is an annual event, I think there’s value in checking things out without CSS at regular intervals over a project’s life, if only to make sure everything is whirring and ticking along as it should. I think there are ways to lint or even automated test for some of the issues the practice has highlighted to me, so I’ll have to explore that. I’ve also proposed this to my team at work, and happily (and unsurprisingly, my teammates rule) they’re on-board with adding this to our regression testing!

Looking forward to participating next year and hoping to see your name on [the list](https://css-naked-day.github.io/2023.html)!
