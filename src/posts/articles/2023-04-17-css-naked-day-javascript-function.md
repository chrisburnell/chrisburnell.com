---
updated: 2023-04-19T22:22:30+0100
date: 2023-04-17T07:49:36+0100
title: CSS Naked Day JavaScript Function
description: Rather than remove CSS from my website manually on CSS Naked Day, I have employed a short JavaScript function to perform the check for me.
tags:
  - css
  - eleventy
  - javascript
wide: true
---

Recently, I wrote *[Why I participated in CSS Naked Day](/article/why-css-naked-day/)*, discussing my experience preparing for CSS Naked Day and why it was so productive. Today I’ll explain how I turned off CSS across my website.

<c-details>
<summary>TL;DR: The JavaScript function</summary>

```javascript
const isCSSNakedDay = () => {
	const now = Date.now()
	const thisYear = new Date().getFullYear()
	const startEpoch = new Date(`${thisYear}-04-09T00:00:00+1400`).getTime()
	const endEpoch = new Date(`${thisYear}-04-09T23:59:59-1200`).getTime()

	return startEpoch <= now && now <= endEpoch
}
```

</c-details>

<h2 id="in-eleventy">Getting it into Eleventy</h2>

In Eleventy, there is a concept of [Global Data Files](https://www.11ty.dev/docs/data-global/). These are files which live in a specific location in your project. Eleventy parses and exposes the data in these files to be consumed anywhere that we have access to Eleventy’s [Data Cascade](https://www.11ty.dev/docs/data-cascade/), i.e. anywhere inside Eleventy templates/pages/etc.

What is particularly useful is Eleventy’s ability to work with many types of data, allowing us, as authors, to build with what feels most comfortable. Typically, we might reach for JSON, XML, or even YAML to store some block of data, but Eleventy allows us to work with JavaScript data files as well. In the same way that Eleventy will parse data stored as JSON and expose it to us as an Object or Array, so too will Eleventy parse and expose data that is exported by a JavaScript file, whether it be an Object, Array, String, Boolean, Function, etc.

This gives us the ability to expose data that is dynamic. In other words, we have the ability to modify what data comes out of a JavaScript file based on conditional checks, information that we pass *into* the JavaScript file (in the case of an exported function, for example), information and data from other parts of Eleventy, and so on.

In our case, the question that we're concerned with is: <q>Is it CSS Naked Day?</q> When the answer is yes, **do not** include references to CSS in our HTML. We’re able to answer that question by comparing datetimes:

1. start of CSS Naked Day <span style="font-weight: 900;">&lt;</span> current datetime
2. current datetime <span style="font-weight: 900;">&lt;</span> end of CSS Naked Day

When **both** of those conditions hold true, we know that it is currently CSS Naked Day.

Now let’s put our function into a Global Data File, e.g. `_data/isCSSNakedDay.js`:

```javascript
module.exports = () => {
	const now = Date.now()
	const thisYear = new Date().getFullYear()
	const startEpoch = new Date(`${thisYear}-04-09T00:00:00+1400`).getTime()
	const endEpoch = new Date(`${thisYear}-04-09T23:59:59-1200`).getTime()

	return startEpoch <= now && now <= endEpoch
}
```

The returned value of this function, a boolean `true`/`false`, can then be used throughout our templates, wherever we might include CSS in our HTML. Here’s an example using Nunjucks:

{% raw %}
```twig
{% if not isCSSNakedDay %}
	<link rel="stylesheet" href="/css/global.css">
{% endif %}
```
{% endraw %}

This way we don’t need to worry about manual intervention, and we can simply rebuild our website or let continuous deployment take care of the CSS Naked Day check and decide whether or not to include the <samp>link</samp> tag in a template’s HTML.
