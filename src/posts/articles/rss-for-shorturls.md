---
draft: true
date: 2023-03-26T10:00:00+0100
title: Using RSS for ShortURL Redirection
description: DESCRIPTION
tags:
  - eleventy
  - javascript
  - nunjucks
---

<nav class=" [ box ] [ flow ] " style="margin-block-end: var(--size-large);">
    <h2>Table of Contents</h2>
    <ol>
        <li><a href="/article/automatic-shorturls/">Generating Automatic ShortURLs with NewBase60</a></li>
        <li>
            <strong>{{ title }}</strong>
        </li>
    </ol>
</nav>

In the previous article, I wrote about how we can use the Sexagesimal numbering system to represent dates in an extremely-terse way. Combined with some single-character codes to represent different categories of posts, we were able to develop a convention for representing any dated post on our website until the year 2561, at which point our convention doesn’t stop working, it simply requires one extra character to represent the date.

In this article, we’ll step through building a counterpart to the URL convention we worked through before: the redirect pages themselves.

When we’re done, what we can expect is that for every blog post on our website, Eleventy will *also* generate a redirect page, where the pages’ URLs match our generated ShortURLs and they sent the user to the respective page.

<aside><p>It’s worth noting that I <em>do not</em> use this method. Rather than having <em>Eleventy</em> generate two HTML files for every blog post on my website (which is nearing 1,000), I instead opt to let <em<nginx</em> handle the redirect, following a very similar set of logic as I will step through in this article.</p></aside>

To keep things simple, we’ll be using a Meta Refresh redirect. This is not optimal—as I alluded to above—as it requires that the visitor’s browser download and parse the HTML document to determine where to send the user—as opposed to the server itself handling this (which *nginx* is good at).

### Canonical URLs

A quick note on canonical URLs.

If you’ve used microformats or microdata or Google's LD-JSON or WordPress (?TODO CHECK DOES WP STILL DO PRETTY PERMALINKS AND WHATNOT) to mark particular data on your website for machine-consumption, you’re probably already familiar with the concept of canonical URLs. In short, the <q>canonical URL</q> of a given webpage can be thought of as its <q>real URL</q>. This is useful when a visitor could reasonably arrive at the same web page through different URLs, and we want to make sure that browsers, search engines, etc. understand that both (or multiple) URLs refer to the same document/content.

Importantly, there is only ever **one** canonical URL for a given webpage.

This is rather critical in our case, as we want to ensure that ShortURLs are not referenced as the primary URL for the content at the end? (TODO rewrite), i.e. if we find our webpage linked from a search engine, we want it to link to the full URL (tends to be the most descriptive, too) and not use the ShortURL.

In fact, you may decide that the ShortURLs are the canonical URLs for your website. As long as you’re consistent in your approach and making sure that pages habve exactly one canonical URL.
