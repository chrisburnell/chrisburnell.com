---
date: 2024-05-29T23:19:17+0800
title: Layout Update
description: A short update on my website’s layout.
tags:
  - css
  - weblogpomo
  - weblogpomo2024
post_includes:
  - weblogpomo2024.njk
---

Over the last few days, I’ve been working on some minor redesign of my website’s overall layout that I mentioned [in yesterday’s post, <q>Indent Outdent</q>](/note/indent-outdent/).

After some thinking, I’ve decided to do away with the sidebar that’s been part of my website’s layout for many, many years. This puts the *content* of my page and posts in a much more prominent and distinct location within the viewport at wide enough screen sizes. I was starting to feel like the sidebar was pushing a lot of dense information right up alongside the start of each page, which made things a little cluttered and fought for attention and focus with the content of each page.

That’s not to say that the information in the sidebar is gone, I’ve just done a little refactoring of the grid layout to move that stuff underneath the main content, which fills horizontally across the page (given enough space in the viewport) instead of vertically. I’ve been eagerly reading a lot of articles and thoughts in the front end community regarding [masonry layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Masonry_layout), and I’m eager to see the technology mature and a solid standard come out of it. It would certainly help tidy up the meta information at the bottom of pages.

There are still some things I’d like to take another look at to see what improvements I can make, but I think it’s in a good enough state now that I’m happy to push it live, and not have to juggle two branches of code anymore.

As a result of the sidebar going away, I also took the opportunity to bump up some of the font sizes across my site to make use of the reclaimed real estate, and I think it makes for an easier reading experience across viewport sizes. Another thing I’ll likely be tinkering with as time goes on. This also means that it will be easier for me to re-explore the idea of having aside text within the content of my pages and posts because I won’t have to contend with convoluted styles to take into account the unknown size of the sidebar when positioning them.

I hope you enjoy it! [Let me know](/about/#contact) if you encounter any issues or if you have any ideas or suggestions. I’m all ears!
