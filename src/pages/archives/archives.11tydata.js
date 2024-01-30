import { url as siteURL } from "../../eleventy/data/site.js"
import { getMetaImage, getMetaTitle } from "../../eleventy/filters/collections.js"
import { formatAsMarkdown, stripHTML, stripNewLines } from "../../eleventy/filters/strings.js"
import { getHost } from "../../eleventy/filters/urls.js"

export default {
	layout: "archive",
	by_year: true,
	hfeed: true,
	show_photos: true,
	eleventyComputed: {
		canonical: (data) => siteURL + data.page.url,
		meta_title: (data) => getMetaTitle(data),
		meta_description: (data) => {
			if (data.description) {
				return stripNewLines(stripHTML(formatAsMarkdown(data.description)))
			}
			return `A page on ${getHost(siteURL)}`
		},
		meta_image: (data) => getMetaImage(data),
	},
}
