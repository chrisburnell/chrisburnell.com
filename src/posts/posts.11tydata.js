import { getWebmentions } from "@chrisburnell/eleventy-cache-webmentions"
import webmentionsConfig from "../data/config/webmentions.js"
import { url as siteURL } from "../eleventy/data/site.js"
import {
	getAuthors,
	getAuthorsString,
	getCategoryName,
	getMetaImage,
	getMetaTitle,
	getPropertyTitle,
	getPropertyURL,
	getRSVPString,
	getReplyAuthors,
	getReplyAuthorsString,
	getReplyTitle,
	getReplyURL
} from "../eleventy/filters/collections.js"
import { formatAsMarkdown, stripHTML, stripNewLines } from "../eleventy/filters/strings.js"
import { getHost } from "../eleventy/filters/urls.js"

export default {
	layout: "post",
	tags: ["post"],
	list: "deck",
	mf_root: "entry",
	show_webmentions: true,
	eleventyComputed: {
		canonical: (data) => siteURL + data.page.url,
		meta_title: (data) => getMetaTitle(data),
		meta_description: (data) => {
			if (data.description) {
				return stripNewLines(stripHTML(formatAsMarkdown(data.description)))
			}
			return `A ${getCategoryName(data)} on ${getHost(siteURL)}`
		},
		meta_authors: (data) => getAuthors(data),
		meta_authors_string: (data) => getAuthorsString(data),
		meta_image: (data) => getMetaImage(data),
		of_url: (data) => getPropertyURL(data),
		of_title: (data) => getPropertyTitle(data),
		reply_title: (data) => getReplyTitle(data),
		reply_url: (data) => getReplyURL(data),
		reply_authors: (data) => getReplyAuthors(data),
		reply_authors_string: (data) => getReplyAuthorsString(data),
		rsvp_string: (data) => getRSVPString(data),
		syndicate_to: (data) => {
			if (data.drink_of) {
				return ["https://untappd.com/user/${untappd}/checkin/${data.page.fileSlug}"]
			} else if (data.listen_of) {
				return ["https://album.link/s/${data.listen_of}"]
			} else if (data.read_of) {
				return ["https://openlibrary.org/isbn/${data.read_of}"]
			}
			return data.syndicate_to || []
		},
		webmentions: (data) => getWebmentions(webmentionsConfig, webmentionsConfig.domain + data.page.url),
	},
}
