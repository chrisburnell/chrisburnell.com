---
title: eleventy-cache-webmentions
photo: eleventy-cache-webmentions.png
emoji: 💬
eleventyComputed:
  date: "{{ github[page.fileSlug].created_at }}"
  updated: "{{ github[page.fileSlug].updated_at }}"
  tagline: "eleventy-cache-webmentions v{{ pkg.dependencies['@chrisburnell/eleventy-cache-webmentions'] | replace('^', '') }}"
  description: "{{ github[page.fileSlug].description }}"
tags:
  - eleventy
  - indieweb
  - javascript
  - package
syndicate_to:
  - https://mastodon.social/users/chrisburnell/statuses/107399910372983580
  - https://twitter.com/iamchrisburnell/status/1467811195981860867
toc: true
---

<figure>
    {% image './images/content/eleventy-cache-webmentions.png', ''%}
</figure>

[![chrisburnell - eleventy-cache-webmentions](https://img.shields.io/static/v1?label=chrisburnell&message=eleventy-cache-webmentions&color=5f8aa6&logo=github)](https://github.com/chrisburnell/eleventy-cache-webmentions "Go to GitHub repo") [![stars - eleventy-cache-webmentions](https://img.shields.io/github/stars/chrisburnell/eleventy-cache-webmentions?style=social)](https://github.com/chrisburnell/eleventy-cache-webmentions) [![forks - eleventy-cache-webmentions](https://img.shields.io/github/forks/chrisburnell/eleventy-cache-webmentions?style=social)](https://github.com/chrisburnell/eleventy-cache-webmentions)

[![GitHub release](https://img.shields.io/github/release/chrisburnell/eleventy-cache-webmentions?include_prereleases=&sort=semver&color=5f8aa6)](https://github.com/chrisburnell/eleventy-cache-webmentions/releases/) [![License](https://img.shields.io/badge/License-MIT-5f8aa6)](https://github.com/chrisburnell/eleventy-cache-webmentions/blob/main/LICENSE)

## Installation

[Available on npm](https://www.npmjs.com/package/@chrisburnell/eleventy-cache-webmentions):

```bash
npm install @chrisburnell/eleventy-cache-webmentions --save-dev
```

You can also just download it directly [from GitHub](https://github.com/chrisburnell/eleventy-cache-webmentions): <samp>[https://github.com/chrisburnell/eleventy-cache-webmentions/archive/main.zip](https://github.com/chrisburnell/eleventy-cache-webmentions/archive/main.zip)</samp>

Once installed there are **two** more **required** set-up steps:

### Add it to your config

Inside your Eleventy config file (typically `.eleventy.js`), use `addPlugin`:

```javascript
const pluginWebmentions = require("@chrisburnell/eleventy-cache-webmentions")

module.exports = function(eleventyConfig) {
    eleventyConfig.addPlugin(pluginWebmentions, {
        // these 3 fields are all required!
        domain: "https://example.com",
        feed: "https://webmentions.example.com?token=S3cr3tT0k3n",
        key: "children"
    })
}
```

## Usage

### Options

Advanced control over how the Webmentions are cached and processed is done by passing `options` into the plugin when using `addPlugin`:

```javascript
const pluginWebmentions = require("@chrisburnell/eleventy-cache-webmentions")

module.exports = function(eleventyConfig) {
    eleventyConfig.addPlugin(pluginWebmentions, {
        // domain: required or the plugin will not function
        //   this is the website that you want to pull in webmentions for
        domain: "https://example.com",
        // feed: required or the plugin will not function
        //   defines the URL of your webmention server where a feed of webmentions for your domain can be found
        feed: "https://webmentions.example.com?token=S3cr3tT0k3n",
        // key: required or the plugin will not function
        //   dictates the key inside the feed where the array of webmentions is located
        key: "children",
        // directory: ".cache" by default
        //   see https://www.11ty.dev/docs/plugins/cache/#cache-directory for more info
        directory: ".cache",
        // duration: "1d" by default
        //   see https://www.11ty.dev/docs/plugins/cache/#change-the-cache-duration for more info
        duration: "1d",
        // uniquekey: "webmentions" by default
        //   dictates the name sent to eleventy-fetch to name the file
        uniqueKey: "webmentions",
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
const Webmentions = require("@chrisburnell/eleventy-cache-webmentions")(null, {
    domain: "https://example.com",
    feed: "https://webmentions.example.com?token=S3cr3tT0k3n",
    key: "children"
})

const webmentionsByUrl = await Webmentions()
```

You can now use this Object in a number of useful ways, not limited to things like creating a collection of posts ordered by number of webmentions:

```javascript
const Webmentions = require("@chrisburnell/eleventy-cache-webmentions")(null, {
    domain: "https://example.com",
    feed: "https://webmentions.example.com?token=S3cr3tT0k3n",
    key: "children"
})

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

```twig
{% raw %}{% set responses = page.url | getWebmentions %}{% endraw %}
```

You can get back only specific [response post types](https://indieweb.org/responses#Response_Post_Types) by passing a second argument:

```twig
{% raw %}{% set reactions = page.url | getWebmentions(['like-of', 'repost-of', 'bookmark-of']) %}
{% set replies = page.url | getWebmentions(['mention-of', 'in-reply-to']) %}{% endraw %}
```

And, if you need it, the entire Object of sorted Webmentions is available too:

```twig
{% raw %}{% set count = 0 %}
{% for url, array in webmentions %}
    {% set count = array.length + count %}
{% endfor %}
<p>This site has received {{ count }} WebMentions!</p>{% endraw %}
```

## Usage with Webmention.io

See [Webmention.io](https://webmention.io) for more information on usage.

### Add your token

Get set up on [Webmention.io](https://webmention.io) and add your **API Key** (found on your [settings page](https://webmention.io/settings)) to your project as an environment variable, i.e. in a `.env` file in the root of your project:

```text
WEBMENTION_IO_TOKEN=njJql0lKXnotreal4x3Wmd
```

### Set your feed and key config options

```javascript
const pluginWebmentions = require("@chrisburnell/eleventy-cache-webmentions")

module.exports = function(eleventyConfig) {
    eleventyConfig.addPlugin(pluginWebmentions, {
        domain: "https://example.com",
        feed: `https://webmention.io/api/mentions.jf2?domain=example.com&per-page=9001&token=${process.env.WEBMENTION_IO_TOKEN}`,
        key: "children"
    })
}
```

## Usage with go-jamming

See [go-jamming on GitHub](https://github.com/wgroeneveld/go-jamming) for more information on usage.

### Add your token

Once you’ve set up your *go-jamming* server and you’ve defined your token, you’ll need add it to your project as an environment variable, i.e. in a `.env` file in the root of your project:

```text
GO_JAMMING_TOKEN=njJql0lKXnotreal4x3Wmd
```

### Set your feed and key config options

```javascript
const pluginWebmentions = require("@chrisburnell/eleventy-cache-webmentions")

module.exports = function(eleventyConfig) {
    eleventyConfig.addPlugin(pluginWebmentions, {
        domain: "https://example.com",
        feed: `https://jam.example.com/webmention/example.com/${process.env.GO_JAMMING_TOKEN}`,
        key: "json"
    })
}
```
