---
date: 2024-07-20T15:17:49+0800
title: July Project Updates
description: An update on two projects I’ve been working on—one new and one old—based on some development oversights I’ve made in the past that I’d like to prevent going forward.
tags:
  - eleventy
  - javascript
---

Howdy folks!

It’s been a little while since my last post. I think I gassed myself out a little bit after [posting every day during May](/article/weblogpomo2024-wrap-up/), but I’ve still been keeping busy working on a couple of projects.

## eleventy-cache-webmentions v2.1.0 Beta

I managed to finish an important fix for my Webmentions plugin for Eleventy.

The problem that this new version fixes comes from an oversight that I made in the project’s documentation with regards to pulling down Webmentions from [Webmention.io](https://webmention.io).

In short, *Webmention.io* provides basic pagination support by using the `per-page` and `page` parameters. In an attempt to simplify my plugin’s code, the documentation instructs using the `per-page` parameter to request `9001` Webmentions per page. At the time, my entire website only had a few hundred Webmentions, so, naïvely, this seemed like a number of Webmentions that would reasonably never be reached.

It’s abundantly clear now that this number is *not* reasonably high enough, particularly when I come across others’ websites that have as many Webmentions per post as I’ve ever received on *all* my posts.

I try to be sympathetic towards the pivotal role *Webmention.io* plays for so many people, so rather than changing the recommended `per-page` value in the documentation to an even higher number, I decided to rewrite part of the plugin to traverse multiple pages of results from the *Webmention.io* API.

Unless a specific `per-page` value is dictated in your plugin configuration, the `per-page` parameter now has a default value of `1000`. For fresh builds, where the list of Webmentions hasn’t yet been cached, the plugin will continue incrementing the `page` value until it finds a page from the API with less results than the `per-page` value.

This means that if your website has 1,600 total Webmentions and you’re using the default `per-page` value of `1000`, the plugin will make two requests to the *Webmention.io* API: one request with 1,000 results and a second request with 600 results.

As before, when the list of Webmentions is *already* cached, the plugin will use the DateTime of the most recent cached Webmention with the `since` parameter to only pull down Webmentions that were received by the API *after* the most recent Webmention in your cache.

Beta releases are currently available on both [GitHub](https://github.com/chrisburnell/eleventy-cache-webmentions/releases/tag/v2.1.0-beta.2) and [npm](https://www.npmjs.com/package/@chrisburnell/eleventy-cache-webmentions/v/2.1.0-beta.2).

You can install the latest beta release with the following:

```bash
npm install @chrisburnell/eleventy-cache-webmentions@beta
```

If you’d like to provide feedback on this beta release, you can [get in touch with me directly](/about/#contact) or through the related [Issue](https://github.com/chrisburnell/eleventy-cache-webmentions/issues/6) or [Pull Request](https://github.com/chrisburnell/eleventy-cache-webmentions/pull/7) on GitHub.

## check-invalid-datetimes

Earlier this year, when I was refactoring my website build to take advantage of Eleventy’s ESM support, I kept running into issues with how I was handling DateTimes with [luxon](https://moment.github.io/luxon/). This resulted in `Invalid ​DateTime` being printed in my output HTML and XML files, which would have caused issues for my RSS feeds and been *less-than-ideal* to see on the front end of my website, to say the least.

Because these issues could have been caused by wrongly-formatted DateTimes in the front matter of posts or by using *luxon* incorrectly, it felt like playing a constant game of cat and mouse trying to track down where the problems originated from.

A few weeks ago, I took a swing at building a more robust solution to tracking down these problems and came up with a package called `check-invalid-datetimes`.

It’s based on the [`check-html-links`](https://www.npmjs.com/package/check-html-links) package by [Modern Web](https://modern-web.dev/) which crawls a given directory to alert on any broken links and references in HTML files, which I’ve been using for a couple of months.

Similarly, my package crawls a given directory to alert on any instances of `Invalid ​DateTime` that it finds in HTML and XML files.

It’s still a work-in-progress, as there are some cases that it needs to account for so that it doesn’t flag intentional instances of the string (in technical articles, for example). I’m considering refactoring the package further to only search for the string inside specific elements, e.g. inside `<time>` elements and their `datetime` attribute in HTML files.
