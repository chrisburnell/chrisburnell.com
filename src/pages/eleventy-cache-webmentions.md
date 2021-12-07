---
title: eleventy-cache-webmentions
eleventyComputed:
  tagline: "eleventy-cache-webmentions v{{ pkg.dependencies['@chrisburnell/eleventy-cache-webmentions'] | replace('^', '') }}"
  description: "{{ github['eleventy-cache-webmentions'].description }}<br>There are {{ github['eleventy-cache-webmentions']['stargazers_count'] }} star-gazers <a href='https://github.com/chrisburnell/eleventy-cache-webmentions'>on GitHub</a> and it was downloaded {{ npm['eleventy-cache-webmentions']['downloads'] }} times in the last month <a href='https://www.npmjs.com/package/@chrisburnell/eleventy-cache-webmentions'>on npm</a>."
syndicate_to:
  - https://mastodon.social/users/chrisburnell/statuses/107399910372983580
  - https://twitter.com/iamchrisburnell/status/1467811195981860867
show_webmentions: true
toc: true
---

<nav class=" [ navigator ] ">
	<a class=" [ button ] " href="{{ github['eleventy-cache-webmentions']['svn_url'] }}">Browse on GitHub</a>
</nav>

## Introduction

It is currently hard-coded to utilise [Webmention.io](https://webmention.io), but I'm not sure how to make this plugin agnostic of that. I need to do more research into what, if any, standard API parameters and output might be: ideally close to what I’m working with now.

It utilises [eleventy-cache-assets](https://www.11ty.dev/docs/plugins/cache/) to manage caching; however, it intercepts the response so that it doesn’t request your ENTIRE webmention history every time the cache expires. Rather, it will figure out if you have an existing cache, and if so, will only request Webmentions since the last cached response and merge the existing and new. Once it has fetched the cached Webmentions (and merged with any incoming new ones) it sorts the output into an object where the keys are the target URLs found in your Webmentions and the value of each is an array containing the data for each webmention.

This allows the plugin to provide an asynchronous Nunjucks/Liquid filter that you can pass a URL to and receive an array of Webmentions for that URL.

Furthermore, it exposes the cached Webmentions in JavaScript as well, so you can perform actions against the webmention data, e.g. sort a collection based on number of Webmentions against each page.

## Installation

[Available on npm](https://www.npmjs.com/package/@chrisburnell/eleventy-cache-webmentions):

```bash
npm install @chrisburnell/eleventy-cache-webmentions --save-dev
```

You can also just download it directly [from GitHub](https://github.com/chrisburnell/eleventy-cache-webmentions): <samp>[https://github.com/chrisburnell/eleventy-cache-webmentions/archive/master.zip](https://github.com/chrisburnell/eleventy-cache-webmentions/archive/master.zip)</samp>

Once installed there are **two** more **required** set-up steps:

### Add it to your config

Inside your Eleventy config file (typically `.eleventy.js`), use `addPlugin`:

```javascript
const pluginWebmentions = require("@chrisburnell/eleventy-cache-webmentions")

module.exports = function(eleventyConfig) {
	eleventyConfig.addPlugin(pluginWebmentions, {
		domain: "https://example.com" // this is required!
	})
}
```

### Add your Webmention.io API Key

Get set up on [Webmention.io](https://webmention.io) and add your **API Key** (found on your [settings page](https://webmention.io/settings)) to your project as an environment variable, i.e. in a `.env` file:

```bash
WEBMENTION_IO_TOKEN=njJql0lKXnotreal4x3Wmd
```

## Usage

### Options

Advanced control over how the Webmentions are cached and processed is done by passing `options` into the plugin when using `addPlugin`:

```javascript
const pluginWebmentions = require("@chrisburnell/eleventy-cache-webmentions")

module.exports = function(eleventyConfig) {
	eleventyConfig.addPlugin(pluginWebmentions, {
		// domain: required or the plugin will not function
		domain: "https://example.com",
		// duration: "23h" by default
		//   see https://www.11ty.dev/docs/plugins/cache/ for more info
		duration: "23h",
		// key: "webmentions" by default
		//   dictates the name sent to eleventy-cache-assets to name the file
		key: "webmentions",
		// allowedHTML: Object by default
		//   see https://www.npmjs.com/package/sanitize-html for more info
		allowedHTML: {
			allowedTags: ["b", "i", "em", "strong", "a"],
			allowedAttributes: {
				a: ["href"],
			},
		},
		// urlReplacements: {} by default
		//   object of key:value pairs containing from:to URL replacements
		urlReplacements: {},
		// maximumHtmlLength: 2000 by default
		//   number of characters in the HTML content at which a different
		//   message is shown instead of the content
		maximumHtmlLength: 2000,
		// maximumHtmlText: "mentioned this in" by default
		//   message shown when maximumHtmlLength is reached
		maximumHtmlText: "mentioned this in",
	})
}
```

### Accessing Webmentions with JavaScript

Accessing the plugin in JavaScript in the way shown below will give you an Object containing your cached Webmentions organised in key:value pairs where the key is a URL on your domain and the value is an array of data for Webmentions sent to that URL.

```javascript
const Webmentions = require("@chrisburnell/eleventy-cache-webmentions")(null, { domain: "https://example.com" })

const webmentionsByUrl = await Webmentions()
```

You can now use this Object in a number of useful ways, not limited to things like creating a collection of posts ordered by number of webmentions:

```javascript
const Webmentions = require("@chrisburnell/eleventy-cache-webmentions")(null, { domain: "https://example.com" })

const absoluteURL = (url, domain) => {
	try {
		return new URL(url, domain).toString()
	} catch (e) {
		console.log(`Trying to convert ${url} to be an absolute url with base ${domain} and failed.`)
		return url
	}
}

module.exports = (eleventyConfig) => {
	eleventyConfig.addCollection("popular", async (collection) => {
		const webmentionsByUrl = await Webmentions()
		return await collection
			.getFilteredByTag("post")
			.filter((item) => {
				// unfortunately necessary in order to match the key
				const url = absoluteURL(item.url, "https://example.com")

				if (!url) {
					return false
				}

				return webmentionsByUrl[url]
			})
			.sort((a, b) => {
				// unfortunately necessary in order to match the key
				const aUrl = absoluteURL(a.url, "https://example.com")
				const bUrl = absoluteURL(b.url, "https://example.com")
				const aWebmentions = webmentionsByUrl[aUrl]
				const bWebmentions = webmentionsByUrl[bUrl]

				return bWebmentions.length - aWebmentions.length
			})
	})
}
```

### Accessing Webmentions with Liquid/Nunjucks

Accessing the plugin in Liquid/Nunjucks by using a Filter and passing in a URL in the way shown below will give you an Array containing the cached Webmentions for the given URL.

```twig{% raw %}
{% set responses = page.url | getWebmentions %}
{% endraw %}```

You can get back only specific [response post types](https://indieweb.org/responses#Response_Post_Types) by passing a second argument:

```twig{% raw %}
{% set reactions = page.url | getWebmentions(['like-of', 'repost-of', 'bookmark-of']) %}
{% set replies = page.url | getWebmentions(['mention-of', 'in-reply-to']) %}
{% endraw %}```

## Next steps

- Refactor sloppy code
  - Ideally, get another set of experienced eyes across it
