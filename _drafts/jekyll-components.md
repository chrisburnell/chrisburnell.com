---
categories: article

# date: 2017-09-25 22:00:00

title: Jekyll Components
lede: I’ve been using Jekyll for over five years, and built a series of useful reusable components to streamline my templating and authoring processes.
tags:
- jekyll
- liquid

# syndicate_to:
# -
---

I think it’s worth mentioning that a lot of these snippets of *HTML* and *Liquid* were built as a way for me to experiment with what was a new CMS (*Jekyll*) to me at the time of conception. The overarching purpose of these snippets relates to my templating and content authoring processes, whether it be to automate something, keep my codebase organised, reduce mental overhead, or to enforce a [Single Source of Truth](https://en.wikipedia.org/wiki/Single_source_of_truth){:rel="external"} methodology.

And because *Jekyll* is a [static site generator](https://davidwalsh.name/introduction-static-site-generators){:rel="external"}, I don’t mind deferring the heavy-lifting to the build process and away from the user, so many of these components serve as equivalents to functionality usually relegated for *JavaScript*.

Another caveat to the challenge is that my site <s>is</s> was hosted on [GitHub Pages](https://pages.github.com){:rel="external"}, so only a [small set of plugins](https://help.github.com/articles/adding-jekyll-plugins-to-a-github-pages-site/){:rel="external"} are available to use. This means achieving solutions with pure *Liquid*.
