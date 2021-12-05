---
title: eleventy-cache-webmentions
eleventyComputed:
  tagline: "eleventy-cache-webmentions v{{ pkg.dependencies['@chrisburnell/eleventy-cache-webmentions'] | replace('^', '') }}"
  description: "{{ github['eleventy-cache-webmentions'].description }}<br>There are {{ github['eleventy-cache-webmentions']['stargazers_count'] }} star-gazers <a href='https://github.com/chrisburnell/eleventy-cache-webmentions'>on GitHub</a> and it was downloaded {{ npm['eleventy-cache-webmentions']['downloads'] }} times in the last month <a href='https://www.npmjs.com/package/@chrisburnell/eleventy-cache-webmentions'>on npm</a>."
show_webmentions: true
toc: true
---

<nav class=" [ navigator ] ">
	<a class=" [ button ] " href="{{ github['eleventy-cache-webmentions']['svn_url'] }}">Browse on GitHub</a>
</nav>

## Introduction

It is currently hard-coded to utilise [webmention.io](https://webmention.io), but I'm not sure how to make this plugin agnostic of that. I need to do more research into what, if any, standard API parameters and output might be: ideally close to what I’m working with now.

It utilises [eleventy-cache-assets](https://www.11ty.dev/docs/plugins/cache/) to manage caching; however, it intercepts the response so that it doesn’t request your ENTIRE webmention history every time the cache expires. Rather, it will figure out if you have an existing cache, and if so, will only request webmentions since the last cached response and merge the existing and new. Once it has fetched the cached webmentions (and merged with any incoming new ones) it sorts the output into an object where the keys are the target URLs found in your webmentions and the value of each is an array containing the data for each webmention.

This allows the plugin to provide an asynchronous filter (although Nunjucks only at present…) that you can pass a URL to and receive an array of webmentions for that URL.

Furthermore, it exposes the cached webmentions in JavaScript as well, so you can perform actions against the webmention data, e.g. sort a collection based on number of webmentions against each page.

## Next steps

- Refactor sloppy code
  - Ideally, get another set of experienced eyes across it
- Improve the README
  - how to access the webmentions from JS
  - how to use the filter
  - options, domain and TOKEN in particular
