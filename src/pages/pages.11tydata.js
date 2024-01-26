import site from "../data/site.js"

import { stripHTML } from "../eleventy/filters/strings.js"

export default {
	layout: `page`,
	tags: ["page"],
	permalink: `/{{ page.fileSlug }}/index.html`,
	eleventyComputed: {
		meta_title: (data) => {
			if (data.page.url !== "/") {
				if (data.title) {
					return `${stripHTML(data.title)} · ${site.title}`
				}
				return `THING from ${data.page.date} · ${site.title}`
			}
			return site.title
		}
	}
}
