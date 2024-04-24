import { getWebmentions } from "@chrisburnell/eleventy-cache-webmentions"
import dotenv from "dotenv"
import configWebmentions from "../eleventy/config/webmentions.js"
import { url as siteURL } from "../eleventy/data/site.js"
import { formatAsMarkdown, stripNewLines } from "../eleventy/filters/strings.js"
import { getHost } from "../eleventy/filters/urls.js"
import { getMetaImage, getMetaTitle } from "../functions/collections.js"
import { stripHTML } from "../functions/strings.js"
dotenv.config()

export default {
	layout: "page",
	tags: ["page"],
	permalink: "/{{ page.fileSlug }}/index.html",
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
		webmentions: (data) => (process.env.WEBMENTION_IO_TOKEN ? getWebmentions(configWebmentions, configWebmentions.domain + data.page.url) : []),
	},
}
