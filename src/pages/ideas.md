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
- Review drafts

## CSS

- get rid of hyphens, i can't stand to see them on my pages
- review and refactor CSS and make tasty usage of layers, revert-layer, :where, :is, :has, etc.
- use utopia-core-scss to generate fluid spaces, type, etc.
- figure out how to resize code elements with `font-size-adjust: from-font;"
- figure out how to de-dupe `navigation__list` for the popover
- why do shelf items on /explore /posts /feeds etc. not show any of the content when printing? dev tools print mode shows them correctly… is it an OS thing?
- review showing the URL after anchors in print stylesheet

## JS

- review comments in JS
- move svg-sparkline.js to inline?
- use fast-xml-parser to pull in latest posts for blogroll items
- refactor getPlace()
- functional tests for functions, filters, etc.

## Eleventy Build

- figure out logic for pinned posts
- figure out how to manage "RSS-only" posts (that become visible on the site after site.upcomingDaysLead)
- get dates (and descriptions?) working in OG Images
    - https://github.com/KiwiKilian/eleventy-plugin-og-image
- use new eleventy-img transform instead of image shortcode
- use client-side Intl.RelativeTimeFormat for RSVP datetimes (i.e. don’t rely purely on builds to keep them accurate to <q>now</q>)

## Admin

- testimonials for /about and /cv
- rework clients logo list into marquee
- build a [/now](/now/) page that shows:
    - near-upcoming events
    - reviews (books, games, etc?) that don't yet have a rating (i.e. are currently being read/played/etc.)
- finish transcript for "Middle Out in CSS" on YouTube
