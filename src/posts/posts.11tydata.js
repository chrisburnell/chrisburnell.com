import { url as siteURL } from "../data/site.js"

import { getPropertyAuthors, getPropertyAuthorsString, getTitle } from "../eleventy/filters/collections.js"

export default {
	layout: `post`,
	tags: ["post"],
	list: `deck`,
	mf_root: `entry`,
	show_webmentions: true,
	eleventyComputed: {
		canonical: (data) => siteURL + data.page.url,
		meta_title: (data) => getTitle(data),
		meta_description: (data) => data.description,
		meta_authors: (data) => getPropertyAuthors(data),
		meta_authors_string: (data) => getPropertyAuthorsString(data),
	}
}
