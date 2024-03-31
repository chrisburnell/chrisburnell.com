---
draft: true
date: 2022-08-26T8:54:00+00:00
title: Dynamically mutating HTML with cheerio
description: Description
tags:
  - eleventy
  - html
  - javascript
---

### Example HTML

```html
<pre
	class="codepen"
	data-slug-hash="WNrqYLV"
	data-theme-id="119"
	data-user="chrisburnell">
	<code></code>
</pre>
```

### `.eleventy.js`

```javascript
const parseTransform = require("src/eleventy/transforms/parse.js")

module.exports = (eleventyConfig) => {
	eleventyConfig.addTransform("parse", parseTransform)
}
```

### `parse.js`

```javascript
const cheerio = require("cheerio")

module.exports = (value, outputPath) => {
	if (outputPath && outputPath.endsWith(".html")) {
		const $ = cheerio.load(value)

		if ($("pre.codepen").length) {
				$(`<script defer src="https://codepen.io/assets/embed/ei.js"></script>\n`)
					.appendTo("body")
			}
		}

		return $.root().html()
	}
	return value
}
```

Now, only when a page contains a `pre` element with the class <q>codepen</q> will the necessary `script` also be included above the closing `body` tag.

I‘ve taken this idea a little bit further by using it for all similar `script` tags above the closing `body` tag by building out an array of

```javascript
const cheerio = require("cheerio")

module.exports = (value, outputPath) => {
	if (outputPath && outputPath.endsWith(".html")) {
		const $ = cheerio.load(value)

		const scriptMap = [
			{
				comment: "<details-utils> extends functionality of the details element",
				selector: "details",
				file: "details-utils.js",
				wrap: "details-utils",
			},
			{
				comment: "<spark-line> generates a sparkline chart",
				selector: "spark-line",
				module: "spark-line.js",
				feature: "sparkline",
			},
			{
				comment: "CodePen Embeds",
				selector: "pre.codepen",
				url: "https://codepen.io/assets/embed/ei.js",
			},
		]

		for (let script of scriptMap) {
			if ($(script.selector).length) {
				$(`<!-- ${script.comment} -->\n`)
					.appendTo("body")
				if (script.module) {
					$(`
						<script defer type="module">
							import ${script.feature} from "/js/${script.module}";
							${script.feature}();
						</script>
					`)
						.appendTo("body")
				} else if (script.file) {
					$(`<script defer src="/js/${script.file}"></script>\n`)
						.appendTo("body")
				} else if (script.url) {
					$(`<script defer src="${script.url}"></script>\n`)
						.appendTo("body")
				}
				if (script.wrap) {
					$(script.selector).each(function (i, element) {
						$(element)
							.wrap(`<${script.wrap}></${script.wrap}>`)
					})
				}
			}
		}

		return $.root().html()
	}
	return value
}
```
