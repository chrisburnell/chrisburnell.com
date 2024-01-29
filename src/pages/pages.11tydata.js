import { url as siteURL } from "../data/site.js"

import { formatAsMarkdown, stripHTML } from "../eleventy/filters/strings.js"
import { getHost } from "../eleventy/filters/urls.js"

export default {
	layout: `page`,
	tags: ["page"],
	permalink: `/{{ page.fileSlug }}/index.html`,
	eleventyComputed: {
		canonical: (data) => siteURL + data.page.url,
		meta_title: (data) => stripHTML(data.title),
		meta_description: (data) => {
			if (data.description) {
				return formatAsMarkdown(data.description)
					.replace("\n", " ")
					.replace(/(<([^>]+)>)/gi, "")
			}
			return `A page on ${getHost(siteURL)}`
		},
	},
}
