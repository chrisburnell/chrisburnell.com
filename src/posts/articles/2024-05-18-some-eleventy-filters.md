---
date: 2024-05-18T22:18:38+0800
title: Some of my Eleventy Filters
description: In refactoring my website earlier this year, part of my process was to evaluate and revise the many, many [Eleventy Filters](https://www.11ty.dev/docs/filters/) I use throughout my website’s build, so in this post, I’ll run through a handful of them.
tags:
  - weblogpomo
  - weblogpomo2024
  - javascript
  - eleventy
---

Before diving in, I think it’s helpful here to note that these filters are defined using JavaScript and made available to use as Nunjucks filters in my [Eleventy config file](https://www.11ty.dev/docs/config/). Because they’re defined in JavaScript, this means that I’m also able to reference them in JavaScript files used in the build my website. So the filters I review in this article may be useful when authoring content, others more useful in the build of my website (e.g. setting up [Collections](https://www.11ty.dev/docs/collections/)), and some are useful in both cases.

In no particular order, here are some of my most crucial and frequently-used filters.

<h2 id="published"><span class="monospace">isPublished</span> / <span class="monospace">arePublished</span></h2>

These two filters I use protect me from printing out any pages or posts to the front end that shouldn’t be there. These pages include drafts, posts whose publish date is in the future, and other keys used for marking a page as <q>should not be published</q>.

The first filter, `isPublished`, checks a page or post for five conditions, and if any of these conditions are true, considers the page as <q>not published</q>:

1. Does it have the property `draft: true`?
2. Does it have the property `published: false`?
3. Is it tagged as `ignore`?
4. Is its `date` property in the future?
5. Does it have a URL?

This creates a gate through which *only* a page or post that should be published can get through.

```javascript
/**
 * @param {object} item
 * @returns {boolean}
 */
const isPublished = (item) => {
	if ("data" in item) {
		if ("draft" in item.data && item.data.draft === true) {
			return false
		}
		if ("published" in item.data && item.data.published === false) {
			return false
		}
		if ("tags" in item.data && item.data.tags.includes("ignore")) {
			return false
		}
		if ("date" in item.data && epoch(item.data.date) > nowEpoch) {
			return false
		}
	}
	return !!item.url
}
```

I can then use this filter when I’m looping through a collection, e.g.

{% raw %}
```twig
{% for post in collections.posts %}
	{% if (post | isPublished) %}
		...
	{% endif %}
{% endfor %}
```
{% endraw %}

The second filter, `arePublished`, aims to improve/add to the usability of the previous `isPublished` filter and is used against collections of pages and posts.

```javascript
/**
 * @param {object[]} array
 * @returns {object[]}
 */
const arePublished = (array) => {
	return array.filter(isPublished)
}
```

The previous example could then be rewritten in this way:

{% raw %}
```twig
{% for post in collections.posts | arePublished %}
	...
{% endfor %}
```
{% endraw %}

<h2><span class="monospace">maxDecimals</span></h2>

To be fair, I don’t use this filter particularly often, but it’s extremely useful wherever I’m performing some kind of mathematics calculation and the result is going to have an unknown number of decimals. I use this cheifly on my [Stats page](/stats/) where I list out a number of different metrics about my website and its content.

This filter takes two arguments: a given number and the desired number of decimals in the output (optional).

```javascript
/**
 * @param {number} number
 * @param {number} [decimals]
 * @returns {number}
 */
const maxDecimals = (number, decimals = 3) => {
	return +number.toFixed(decimals)
}
```

On my Stats page, I print out how many commits I have made to my website’s git repository per day, on average. This could result in a number with many decimal places, so to avoid that, I use the `maxDecimals` filter.

{% raw %}
```twig
{{ (number_of_commits / days_since_first_commit) | maxDecimals(2) }}
```
{% endraw %}

<h2><span class="monospace">numberStringFormat</span></h2>

I got this filter from [Zach Leatherman](https://github.com/zachleat/zachleat.com/blob/50a7550d05f6b953154fb767b63a439ce931f53b/eleventy.config.js#L159-L165), and its purpose (for me, at least) is to satisfy a grammar rule that I learned in high school and has stuck with me: when describing a numerical amount of something, numbers less than 10 should be spelled out.

This filter takes in a given number, and if it’s less than 10, replaces it with its spelled-out equivalent; otherwise, it returns a localised version of the number (i.e. adds commas every three digits from the right for numbers with four or greater digits).

```javascript
const stringNumbers = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]

/**
 * @param {number} number
 * @returns {string}
 */
export const numberStringFormat = (number) => {
	if (number < stringNumbers.length) {
		return stringNumbers[number]
	}
	return Math.floor(Number(number)).toLocaleString()
}
```

Whenever I encounter a number that would fall into this grammatical ruling and the value of that number is unknown, I like to err on the side of caution and apply the `numberStringFormat` filter:

{% raw %}
```twig
Raven Count: {{ number_of_ravens | numberStringFormat }}
```
{% endraw %}

<h2><span class="monospace">markdownFormat</span></h2>

This next filter uses the [markdown-it](https://github.com/markdown-it/markdown-it) package to allow me to format a given string as if it were Markdown. I make use of this abundantly throughout my website; in particular, I will often use Markdown formatting in the front-matter descriptions of pages and posts, and this filter is run against those (otherwise) strings before being printed to the page.

This allows me to insert anchors, emphasis tags, strong tags, etc. in non-Markdown places without having to use the more verbose HTML equivalents.

```javascript
import markdownParser from "markdown-it"

const markdown = markdownParser()

/**
 * @param {string} string
 * @returns {string}
 */
const markdownFormat = (string) => {
	return markdown.render(string)
}
```

Take the description of this article, for example, which runs through the `markdownFormat` filter in order to output the anchor inside it:

```yaml
description: In refactoring my website earlier this year, part of my process was to evaluate and revise the many, many [Eleventy Filters](https://www.11ty.dev/docs/filters/) I use throughout my website’s build, so in this post, I’ll run through a handful of them.
```

<h2><span class="monospace">supertitle</span></h2>

While Nunjucks *does* have its [own built-in filter](https://mozilla.github.io/nunjucks/templating.html#title) for converting a string to <q>Title Case</q>, where the first letter of each word is capitalised, there are certainly some words and abbreviations that should be wholly-capitalised. I could always remember to capitalise them while authoring, so this filter is mostly a means of *making sure*.

For example, pages that are tagged with `html` appear on my [HTML tag page](/tag/html/), where the page’s title runs through this filter to present it on the front end as <q>HTML</q> instead of <q>html</q> or <q>Html</q>.

This filter depends on having a pre-defined array of words that you want to be capitalised in a particular way. It consumes a string, capitalises each of the words inside (like the Nunjucks-standard `title` filter), and then replaces any words in the string that are present in the array of special words with the desired equivalent.

```javascript
const capitalizers = ["HTML", "CSS", "JavaScript"]

/**
 * @param {string} string
 * @return {string}
 */
const supertitle = (string) => {
	let formatted = string
		.split(" ")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ")

	capitalizers.forEach((word) => {
		const regex = new RegExp(word, "gi")
		if (formatted.match(regex)) {
			formatted = formatted.replace(regex, word)
		}
	})

	return formatted
}
```

Check out the title on my [CSS tag page](/tag/css/) for an example.

<hr style="--rule-space: var(--size-medium);">

What useful filters do you use on your website? I’d love to hear from you!

--------

{% include 'weblogpomo2024.njk' %}
