---
date: 2022-08-25T16:31:04+0100
title: Webmention Setup for Eleventy
description: Here’s a quick run-through of how I retrieve and utilise Webmentions with my Eleventy website.
tags:
  - eleventy
  - indieweb
  - javascript
  - writing
---

<h2 id="1">Step № 1. Account Creation</h2>

Unless you already have your own Webmention receiver, sign up for one and add the secret key/token to your project. Below are two examples:

If you’re using **[Webmention.io](https://webmention.io/)**, add your **API Key** (found on your [settings page](https://webmention.io/settings)) to your project as an environment variable, i.e. in a `.env` file in the root of your project:

```text
WEBMENTION_IO_TOKEN=njJql0lKXnotreal4x3Wmd
```

If you’re using **[go-jamming](https://git.brainbaking.com/wgroeneveld/go-jamming)**, once you’ve set up your server and defined your token, you’ll need add it to your project as an environment variable, i.e. in a `.env` file in the root of your project:

```text
GO_JAMMING_TOKEN=njJql0lKXnotreal4x3Wmd
```

<h2 id="2">Step № 2. Installation</h2>

Install the [`eleventy-cache-webmentions`](/eleventy-cache-webmentions/) from *npm*:

```bash
npm install @chrisburnell/eleventy-cache-webmentions --save-dev
```

<h2 id="3">Step № 3. Configuration</h2>

Create a config file for `eleventy-cache-webmentions`:

If you’re using **[Webmention.io](https://webmention.io/)**:

```javascript
const { defaults } = require("@chrisburnell/eleventy-cache-webmentions")()

// Load .env variables with dotenv
require("dotenv").config()

module.exports = Object.assign(defaults, {
    domain: "https://EXAMPLE.COM",
    feed: `https://webmention.io/api/mentions.json?domain=EXAMPLE.COM&token=${process.env.WEBMENTION_IO_TOKEN}&per-page=9001`,
    key: "links",
})
```

If you’re using **[go-jamming](https://git.brainbaking.com/wgroeneveld/go-jamming)**:

```javascript
const { defaults } = require("@chrisburnell/eleventy-cache-webmentions")()

// Load .env variables with dotenv
require("dotenv").config()

module.exports = Object.assign(defaults, {
    domain: "https://EXAMPLE.COM",
    feed: `https://JAM.EXAMPLE.COM/webmention/EXAMPLE.COM/${process.env.GO_JAMMING_TOKEN}`,
    key: "json",
})
```

<h2 id="4">Step № 4. Integrate with Eleventy</h2>

Add both to your `.eleventy.js` config file:

```javascript
const pluginWebmentions = require("@chrisburnell/eleventy-cache-webmentions")
const configWebmentions = require("configWebmentions.js")

module.exports = function(eleventyConfig) {
    eleventyConfig.addPlugin(pluginWebmentions, configWebmentions)
}
```

<h2 id="5">Step № 5. Attach Webmentions to Pages</h2>

Add some [Directory Specific Data Files](https://www.11ty.dev/docs/data-template-dir/) wherever your pages and/or posts live. For example, if your pages all live in a `pages/` folder, you would add the following code block to a `pages.11tydata.js` file inside `pages/`:

```javascript
const configWebmentions = require("configWebmentions.js")

const { getWebmentions } = require("@chrisburnell/eleventy-cache-webmentions")()

module.exports = {
    eleventyComputed: {
        webmentions: (data) => {
            return getWebmentions(configWebmentions, configWebmentions.domain + data.page.url)
        },
    }
}
```

<h2 id="6">Step № 6. Use Webmentions</h2>

Webmentions are now attached to each page!

You can access them quite easily on a given page:

{% raw %}
```twig
{% for webmention in webmentions %}
    <!-- Loop through all webmentions on a given page -->
    {{ webmention.author.name }} sent this page a {{ webmention.activity.type }}
{% endfor %}
```
{% endraw %}

And even when looping through something like a collection:

{% raw %}
```twig
{% for item in collections.pages %}
    <!-- Loop through all items in a collection -->
    <h2>{{ item.data.title }}</h2>
    <p>This page has {{ item.data.webmentions.length }} webmention{{ 's' if item.data.webmentions.length == 2 }}</p>
{% endfor %}
```
{% endraw %}

How you want to filter the array of Webmentions attached to each page is up to you, but I recommend using the *type* value (`activity.type` in [Webmention.io](https://webmention.io/); `type` in [go-jamming](https://git.brainbaking.com/wgroeneveld/go-jamming)) to split Webmentions into groups categorised by type—this will make it easier to figure out which Webmentions are binary interactions (e.g. likes, reposts) and which have richer content you might want to display (e.g. mentions, replies).

--------

And that's pretty much all there is to it! Let me know if you have any suggestions or issues, and feel free to contribute back to the Eleventy plugin that is the workhorse behind this implementation [over on GitHub](https://github.com/chrisburnell/eleventy-cache-webmentions) or just [get in touch](/about/#contact).
