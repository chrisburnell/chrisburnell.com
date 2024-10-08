---
title: "/ideas"
tagline: Ideas
description: Things I’d like to work on.
toc: true
redirect_from:
  - /todo
---
{% set last_updated = '2024-07-13T14:00:53+0800' -%}

<p><strong>Last updated:</strong> <time datetime="{{ last_updated | rfc3339Date }}">{{ last_updated | friendlyDate | safe }} @ {{ last_updated | friendlyTime | safe }}</time></p>

## Posts

- Review drafts
- Get around to adding more to my /interests page

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

- work out how to feature more tags/collections in the post meta description (alongside `writing`-tagged posts)
- use new eleventy-img transform instead of image shortcode
    - keep an eye on performance here
- use APIs to pull in cover images for:
    - books
    - music albums
    - movies & TV shows

## Admin

- testimonials for /about and /cv
- finish transcript for "Middle Out in CSS" on YouTube
