---
title: Privacy Policy
description: Your right to privacy on this website.
---

<h2 id="tracking">Tracking</h2>

I’m currently using [Fathom Lite](https://usefathom.com/) [(self-hosted)](https://logs.chrisburnell.com) as a means of keeping track of popular pages and page referrals, mostly to see what pages are popular, make sure those pages are functioning as intended, and to see where my referral traffic is coming from. It presents the following metrics: page views, unique visitors, average time spent on the website, bounce rate, and referrals.

*Fathom Lite* sets a (first-party) cookie in your browser in order to keep track of page visits and distinguish unique visitors. I welcome you to disable cookies and/or requests to `logs.chrisburnell.com` if you do not want to be tracked in this way. If you have JavaScript enabled, you can also <a href="#settings">open the settings modal</a> to <a href="#analytics-toggle">disable analytics</a> which will prevent the network requests that go out to my Fathom server.

You can read more about what Fathom has to say about the [data that they track](https://github.com/usefathom/fathom/blob/master/docs/FAQ.md#what-data-does-fathom-track).

--------

<h2 id="activity">Activity and Backfeed</h2>

I pull Webmentions (hosted on [Webmention.io](https://webmention.io)) into relevant pages, but only Webmentions sent deliberately in reply to one of my pages are displayed. Likes, reposts, bookmarks, replies made on social media, etc. (i.e. backfeed from [Bridgy](https://brid.gy)) are anonymised and are only shown as part of a count in the responses section of relevant pages.

If you have responded to, liked, reposted, quoted, or commented on my activity on Bluesky, Mastodon, Twitter, or this website, it may be stored and displayed as a <q>response</q> on this website. If you would like your interaction(s) removed, blocked, or even corrected, please don’t hesitate to [get in touch](/about/#contact), and I would be happy to oblige your request as quickly as possible.

--------

<h2 id="third-party">Third-party Resources</h2>

I have made every attempt to limit calls to third-party resources.

Where possible, I am using self-hosted endpoints whose data and output I control, hopefully limiting vectors for attacks and failure points (). Unfortunately, this is *not* possible for certain resources hosted by third parties, like YouTube video embeds.

I’ve also tried to bake as many third-party network requests into my static site generator (Eleventy) as possible, which limits the network requests that need to be made on the front end and actually makes my website faster! (At least, I hope it makes it faster; either way, I’ll still offload as much work from the front end as I can.)

--------

<h2 id="offline">Offline Support</h2>

My website installs a Service Worker in supported browsers to make my website function when an internet connection is not available, basically a form of client-side caching. This means that core assets will be cached by your browser to speed up subsequent usage of those files. Important top-level pages are also cached-on-install, and while you’re online, any pages you visit are also cached, making them available next time you’re offline!

I do not (and cannot) collect any information about you or your browsing experience from Service Workers.

--------

<h2 id="contact">Contact me</h2>

If you have any further questions or concerns regarding your privacy on this website, please [contact me](/about/#contact) so that I can address it as soon as possible.
