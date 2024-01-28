import { url as siteURL } from "../data/site.js"

import { stripHTML } from "../eleventy/filters/strings.js"

export default {
	layout: `page`,
	tags: ["page"],
	permalink: `/{{ page.fileSlug }}/index.html`,
	eleventyComputed: {
		canonical: (data) => siteURL + data.page.url,
		meta_title: (data) => stripHTML(data.title),
	},
}
