---
draft: true
date: 2021-11-28T10:00:00+0000
title: Getting Webmentions with `eleventy-cache-assets`
description: DESCRIPTION
tags:
  - eleventy
  - indieweb
  - javascript
---

I’ve flip-flopped a great deal on the ways I display webmentions on pages across my website. From client-side JavaScript making a request every page-load to caching webmentions using from-scratch Node.js code to caching ALL webmentions every 24 hours, it’s never been ideal for everyone: users *and* me.

But I put my nose to the grindstone and did some research into the inner workings of `eleventy-cache-assets`, and, along with [this section of the 11ty docs](https://www.11ty.dev/docs/plugins/cache/#manually-store-your-own-data-in-the-cache), I put together something that utilises `eleventy-cache-assets` to manage caching and some extra JavaScript to
