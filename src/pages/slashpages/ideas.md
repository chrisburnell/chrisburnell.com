---
title: "/ideas"
tagline: Ideas
description: Things I’d like to work on.
last_updated: 2026-01-16T20:52:11-0400
toc: true
redirect_from:
  - /todo
---

<p><strong>Last updated:</strong> <time datetime="{{ last_updated | rfc3339Date }}">{{ last_updated | friendlyDate | safe }} @ {{ last_updated | friendlyTime | safe }}</time></p>

## Posts

- review drafts
- get around to adding more to my /interests page

## CSS

- figure out how to resize code elements with `font-size-adjust: from-font;"
- figure out how to de-dupe `navigation__list` for the popover

## JS

- refactor getPlace()

## Eleventy Build

- figure out how to upgrade past eleventy v3.1.0
    - [https://github.com/11ty/eleventy/issues/4182](https://github.com/11ty/eleventy/issues/4182)
- use new [eleventy-img transform](https://www.11ty.dev/docs/plugins/image/#html-transform) instead of image shortcode
    - ~keep an eye on performance here~ to my understanding, the generated images are cached similarly to eleventy-fetch
- use APIs to pull in cover images for:
    - books
    - music albums
    - movies & TV shows
