---
title: "/ideas"
tagline: Ideas
description: Things I’d like to work on.
toc: true
---

{% set last_updated = "2024-04-05T02:45:00+0800" -%}
<p><strong>Last updated:</strong> <time datetime="{{ last_updated | rfc3339Date }}">{{ last_updated | friendlyDate | safe }} @ {{ last_updated | friendlyTime | safe }}</time></p>

## Posts

- Review drafts

## CSS

- review and refactor CSS and make tasty usage of layers, revert-layer, :where, :is, :has, etc.
- use utopia-core-scss to generate fluid spaces, type, etc.
- figure out how to resize code elements with `font-size-adjust: from-font;"
- figure out how to de-dupe `navigation__list` for the popover
- why do shelf items on /explore /posts /feeds etc. not show any of the content in the print stylesheet? dev tools print mode shows them correctly… is it an OS thing?
- review showing the URL after anchors in print stylesheet

## JS

- refactor getPlace()
- functional tests for functions, filters, etc.

## Eleventy Build

- figure out logic for pinned posts
- figure out how to manage "RSS-only" posts (that become visible on the site after site.limits.recentDays)
- use new eleventy-img transform instead of image shortcode
    - keep an eye on performance here
- pull data out of fathom analytics for page popularity

## Admin

- testimonials for /about and /cv
- finish transcript for "Middle Out in CSS" on YouTube
