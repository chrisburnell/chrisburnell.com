---
date: 2022-12-07T10:40:00+0000
title: Copilot me if you can
description: A short tale about how GitHub Copilot generated some “real” data about my website.
---

On <time datetime="">the 17<sup>th</sup> of November</time>, I received a notification that I’d been [mentioned on Twitter](https://twitter.com/lindsaykwardell/status/1593358142376931328) by someone I didn’t recognise. Since I don’t get a lot of mentions — maybe because I don’t tweet very much… — curiousity immediately got the better of me!

After some quick reading, I suddenly had mixed feelings. It turned out that another programmer out there in the ethos had been tinkering with [GitHub Copilot](https://github.com/features/copilot/), an AI-powered tool for developers to generate code on-the-fly. She had asked Copilot to generate some <q>real</q> data, and here’s what it generated:

```javascript
const content = {
  title: "The Future of the Web",
  description: "A look at the future of the web, and how we can make it better.",
  date: "2021-09-01",
  image: "https://cdn.chrisburnell.com/astro-blog/2021-09-01-the-future-of-the-web/og-image.png",
  imageAlt: " A screenshot of the web. dev website, with the text left corner.",
  imageTitle: "The Future of the Web",
  imageLink: "https://web.dev/future-of-the-web/",
  imagewidth: 1200,
  imageHeight: 630,
  imageType: "image/png",
  imageCreator: "Chris Burnell",
  imageCreatorLink: "https://chrisburnell.com",
  imageLicense: "CC BY-NC-SA 4.0 ",
  imageLicenseLink: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
}
```

Wait, what?

0. I have never published a post titled *The Future of the Web*.
0. There is no `cdn` subdomain attached to my domain, and my website is built with Eleventy, not Astro.
0. My website’s domain is `chrisburnell.com`, certainly not [`web.dev`](https://web.dev)!

What’s going on here?

If this data is meant to be about a page on *my* website, besides the last four lines which appear to be accurate, it looks like Copilot has transmogrified data from my website, [web.dev](https://web.dev), and possibly from elsewhere too into a single block of supposed <q>real</q> data.

I guess I’ll have to keep an eye on my server logs to see if I’m getting requests to URLs that look like the ones Copilot generated, and if so, how many requests are being made. I’m not very knowledgable on the subject, but I could imagine this would lead to an unintended DOS attack if my website happens to be used prevalently for generated code of this nature by Copilot.

The bright side to all of this is, of course, [Lindsay Wardell](https://www.lindsaykwardell.com/), who was so kind to track me down to reach out and let me know. It turns out she’s a super-talented software engineer and fellow D&D-enjoyer, so I now rightly know to [follow her on Mastodon](https://mastodon.social/@lindsaykwardell), and she has [a great website too](https://www.lindsaykwardell.com).

This situation, as obscure and small this instance is, still has me a little worried, and I don’t really know what to do about it, if I can or should anything at all.

One thing’s for sure, though: if we had more people like Lindsay in this world, we could all worry a little less knowing there are still wonderful people out there in the ethos looking out for us whose path just hasn’t yet crossed ours.
