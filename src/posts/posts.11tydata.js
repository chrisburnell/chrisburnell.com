import { url as siteURL } from "../data/site.js"

import {
	getCategoryName,
	getPropertyAuthors,
	getPropertyAuthorsString,
	getTitle
} from "../eleventy/filters/collections.js"
import { formatAsMarkdown } from "../eleventy/filters/strings.js"
import { getHost } from "../eleventy/filters/urls.js"

export default {
	layout: `post`,
	tags: ["post"],
	list: `deck`,
	mf_root: `entry`,
	show_webmentions: true,
	eleventyComputed: {
		canonical: (data) => siteURL + data.page.url,
		meta_title: (data) => getTitle(data),
		meta_description: (data) => {
			if (data.description) {
				return formatAsMarkdown(data.description)
					.replace("\n", " ")
					.replace(/(<([^>]+)>)/gi, "")
			}
			return `A ${getCategoryName(data)} on ${getHost(siteURL)}`
		},
		meta_authors: (data) => getPropertyAuthors(data),
		meta_authors_string: (data) => getPropertyAuthorsString(data),
	},
}
