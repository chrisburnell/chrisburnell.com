---
draft: true
title: "/ideas"
tagline: Ideas
description: Things I’d like to work on.
toc: true
---

## Posts

- Version 4.0.0
- How I shaved 1.5 minutes off my Eleventy build time
    - Edit this to remove some bits about the refactor/rebuild
- Post about /interests page
- Short post about my guestbook
- How I'm handling dates in 11ty now that I've moved timezones
- Post about RelativeTimeFormats as both an 11ty filter and front-end
- Review drafts

## CSS

- review and refactor CSS and make tasty usage of layers, revert-layer, :where, :is, :has, etc.
- use utopia-core-scss to generate fluid spaces, type, etc.
- figure out how to resize code elements with `font-size-adjust: from-font;"
- figure out how to de-dupe `navigation__list` for the popover
- why do shelf items on /explore /posts /feeds etc. not show any of the content when printing? dev tools print mode shows them correctly… is it an OS thing?
- review showing the URL after anchors in print stylesheet

## JS

- move svg-sparkline.js to inline?
- refactor getPlace()
- functional tests for functions, filters, etc.

## Eleventy Build

- figure out logic for pinned posts
- figure out how to manage "RSS-only" posts (that become visible on the site after site.upcomingDaysLead)
- get dates (and descriptions?) working in OG Images
    - https://github.com/KiwiKilian/eleventy-plugin-og-image
- use new eleventy-img transform instead of image shortcode
    - keep an eye on performance here

## Admin

- testimonials for /about and /cv
- rework clients logo list into marquee
- finish transcript for "Middle Out in CSS" on YouTube
