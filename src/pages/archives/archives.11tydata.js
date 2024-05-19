import { url as siteURL } from "../../eleventy/data/site.js"
import { markdownFormat, stripNewLines } from "../../eleventy/filters/strings.js"
import { getHost } from "../../eleventy/filters/urls.js"
import { getMetaImage, getMetaTitle } from "../../functions/collections.js"
import { stripHTML } from "../../functions/strings.js"

export default {
	layout: "archive",
	by_year: true,
	show_images: true,
	excludeFromSearch: true,
	eleventyComputed: {
		canonical: (data) => siteURL + data.page.url,
		meta_title: (data) => getMetaTitle(data),
		meta_description: (data) => {
			if (data.description) {
				return stripNewLines(stripHTML(markdownFormat(data.description)))
			}
			return `A page on ${getHost(siteURL)}`
		},
		meta_image: (data) => getMetaImage(data),
	},
}
