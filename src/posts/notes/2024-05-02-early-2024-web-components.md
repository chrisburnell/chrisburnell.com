---
date: 2024-05-02T12:00:00+0800
title: Web Components from early 2024
description: I’ve been having a lot of fun creating reusable Web Components, so here are three that I’ve built and been using this so far this year.
tags:
  - weblogpomo
  - WeblogPoMo2024
  - writing
  - web-components
  - javascript
syndicate_to:
  - https://fediverse.repc.co/@chrisburnell/112371549706920942
---

<h2 id="relative-time"><span class=" [ gamma  monospace ] ">&lt;relative-time&gt;</span></h2>

<ul class=" [ cluster ] [ center ] ">
    <li><a href="/relative-time/">Project Page</a></li>
    <li><a href="https://chrisburnell.github.io/relative-time/demo.html">Demo</a></li>
    <li><a href="https://github.com/chrisburnell/relative-time/" rel="external noopener">GitHub</a></li>
    <li><a href="https://www.npmjs.com/package/@chrisburnell/relative-time" rel="external noopener">npm</a></li>
</ul>

> There are many like it, but this one is mine.

There are myriad resources out there for formatting dates and times as a relative time, whether it be snippets of code, native Web Components, or otherwise. Regardless, I wanted to build one for myself, if only to learn more about the fantastic [`Intl.RelativeTimeFormat` constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat).

This constructor allows developers to consume a JavaScript DateTime and spit back out a string formatted to represent that date and time as relative to the present. What’s more, it even has the ability to consider the locale (language) of the document it’s in, the language of the user’s browser, etc.

I combined these things to make a Web Component that can wrap around a `<time>` element to present certain DateTimes around my website—on my [RSVPs page](/rsvps/), for example—to give a better context around when certain things will take place (in the future) or took place (in the past). By carefully crafting the HTML, this means that the Web Component acts as a beautiful little progressive enhancement:

```html
This post was published <relative-time><time datetime="2024-04-25T12:00:00+00:00">on 25 April 2024</time></relative-time>
```

*Without* JavaScript, the user will see this:

<figure class=" [ box ] ">
    <p>This post was published <time datetime="2024-04-25T12:00:00+00:00">25 April 2024</time>.</p>
</figure>

*With* JavaScript, the user will instead see this (assuming it’s presently the 2<sup>nd</sup> of May, 2024):

<figure class=" [ box ] ">
    <p>This post was published <time datetime="2024-04-25T12:00:00+00:00" title="25/04/2024, 12:00:00 (local time)">1 week ago</time>.</p>
</figure>

There are also a number of other attributes that can be applied to the Web Component that control how often the relative time is updated, what units to format the relative time with, and a maximum unit to use (i.e. only go up to days even if the distance is time is greater than a month).

--------

<h2 id="event-countdown"><span class=" [ gamma  monospace ] ">&lt;event-countdown&gt;</span></h2>

<ul class=" [ cluster ] [ center ] ">
    <li><a href="/event-countdown/">Project pPage</a></li>
    <li><a href="https://chrisburnell.github.io/event-countdown/demo.html">Demo</a></li>
    <li><a href="https://github.com/chrisburnell/event-countdown/" rel="external noopener">GitHub</a></li>
    <li><a href="https://www.npmjs.com/package/@chrisburnell/event-countdown" rel="external noopener">npm</a></li>
</ul>

This Web Component is very similar to the previous one, but with the explicit intention of being used for events with a specific duration. I built it specifically for [CSS Naked Day this year](https://css-naked-day.github.io/2024.html), as I wanted a way to display a countdown until the event started as well as provide a duration for the event while it was happening.

Very much like my `<relative-time>` web component, its functionality hinges on one or two nested `<time>` elements, representing the start/end times of a given event.

```html
<event-countdown name="My event">
    My event starts on <time start datetime="2024-04-25T12:00:00+00:00">25 April 2024</time> and ends on <time end datetime="2024-05-09T12:00:00+00:00">9 May 2024</time>.
</event-countdown>
```

*Without* JavaScript, the user will see this:

<figure class=" [ box ] ">
    <p>My event starts on <time start datetime="2024-04-25T12:00:00+00:00">25 April 2024</time> and ends on <time end datetime="2024-05-07T12:00:00+00:00">7 May 2024</time>.</p>
</figure>

*With* JavaScript, the user will instead see this (assuming it’s presently the 2<sup>nd</sup> of May, 2024):

<figure class=" [ box ] ">
    <p>My event started <time start datetime="2024-04-25T12:00:00+00:00" title="25/04/2024, 12:00:00 (local time)">1 week ago</time> and ends <time end datetime="2024-05-07T12:00:00+00:00" title="07/05/2024, 12:00:00 (local time)">in 5 days</time>.</p>
</figure>

There are a number of other attributes here as well that, like the `<relative-time>` web component, control its update frequency and units to be used. There is also the ability to designate the event as <q>annual</q>, so the countdown will roll over to next year’s DateTime when the event has passed.

--------

<h2 id="paper-stamp"><span class=" [ gamma  monospace ] ">&lt;paper-stamp&gt;</span></h2>

<ul class=" [ cluster ] [ center ] ">
    <li><a href="/paper-stamp/">Project Page</a></li>
    <li><a href="https://chrisburnell.github.io/paper-stamp/demo.html">Demo</a></li>
    <li><a href="https://github.com/chrisburnell/paper-stamp/" rel="external noopener">GitHub</a></li>
    <li><a href="https://www.npmjs.com/package/@chrisburnell/paper-stamp" rel="external noopener">npm</a></li>
</ul>

This last component I’m showcasing today probably has less use cases, but is more of a fun little idea I had for displaying an image like a paper postage stamp.

Now, this web component is *probably* better suited to be composed using only HTML and CSS, but it was a fun experiment nonetheless.

```html
<paper-stamp>
    <img src="/images/rolbie-stamp.png" alt="..." width="100" height="150">
</paper-stamp>
```

*Without* JavaScript, the user will see this:

<figure class=" [ box ] ">
    <paper-stamp-nojs>
        <img src="/images/rolbie-stamp.png" alt="..." width="100" height="150">
    </paper-stamp-nojs>
</figure>

*With* JavaScript, the user will instead see this:

<figure class=" [ box ] ">
    <paper-stamp>
        <img src="/images/rolbie-stamp.png" alt="..." width="100" height="150">
    </paper-stamp>
</figure>

This Web Component comes with a number of attributes to control the `background-color` of the stamp, the padding between the image and the edge of the stamp, and the size and spacing of the perforations along the stamp’s edge.

--------

{% include 'weblogpomo2024.njk' %}

<style>
paper-stamp {
    background-image:
        radial-gradient(
            4px,
            transparent 95%,
            antiquewhite
        ),
        linear-gradient(antiquewhite 0 0);
    background-size:
        calc(8px * 3.5 / 2) calc(8px * 3.5 / 2),
        calc(100% - 8px * 3.5 / 2) calc(100% - 8px * 3.5 / 2);
    background-position:
        calc(8px * 3.5 / -4) calc(8px * 3.5 / -4),
        50%;
    background-repeat:
        round,
        no-repeat;
    max-inline-size: 100%;
    display: inline-block;
    image-rendering: pixelated;
}
paper-stamp img {
    display: block;
    margin: 15px;
}
paper-stamp-nojs {
    background-color: antiquewhite;
    display: inline-block;
    padding: 15px;
}
paper-stamp-nojs img {
    display: block;
}
</style>
