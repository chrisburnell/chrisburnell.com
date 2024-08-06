import { getWebmentions } from "@chrisburnell/eleventy-cache-webmentions";
import dotenv from "dotenv";
import configWebmentions from "../eleventy/config/webmentions.js";
import { untappd } from "../eleventy/data/author.js";
import { url as siteURL } from "../eleventy/data/site.js";
import { getCategoryName } from "../eleventy/filters/collections.js";
import {
	markdownFormat,
	replaceLineBreaks,
} from "../eleventy/filters/strings.js";
import { getHost } from "../eleventy/filters/urls.js";
import {
	getAuthors,
	getAuthorsString,
	getMetaImage,
	getMetaTitle,
	getPropertyLabel,
	getPropertyTitle,
	getPropertyTitleFallback,
	getPropertyURL,
	getRSVPString,
	getReplyAuthor,
	getReplyAuthorString,
	getReplyTitle,
	getReplyURL,
} from "../functions/collections.js";
import { stripHTML } from "../functions/strings.js";
dotenv.config();

export default {
	layout: "post",
	tags: ["post"],
	list: "deck",
	mf_root: "entry",
	show_webmentions: true,
	pre_includes: [],
	post_includes: [],
	eleventyComputed: {
		canonical: (data) => siteURL + data.page.url,
		year: (data) => new Date(data.date).getFullYear(),
		of_url: async (data) => getPropertyURL(data),
		of_title: async (data) => getPropertyTitle(data),
		of_title_fallback: async (data) => getPropertyTitleFallback(data),
		of_label: async (data) => getPropertyLabel(data),
		reply_url: async (data) => getReplyURL(data),
		reply_title: async (data) => getReplyTitle(data),
		reply_author: async (data) => getReplyAuthor(data),
		reply_author_string: async (data) => getReplyAuthorString(data),
		rsvp_string: async (data) => getRSVPString(data),
		meta_title: async (data) => getMetaTitle(data),
		meta_description: (data) => {
			if (data.description) {
				return replaceLineBreaks(
					stripHTML(markdownFormat(data.description)),
				);
			} else if (data.rsvp) {
				return `A ${getCategoryName(data)} on ${getHost(siteURL)}`;
			} else if (data.in_reply_to) {
				return `A Reply on ${getHost(siteURL)}`;
			}
			return `A ${getCategoryName(data)} on ${getHost(siteURL)}`;
		},
		meta_authors: async (data) => getAuthors(data),
		meta_authors_string: async (data) => getAuthorsString(data),
		meta_image: (data) => getMetaImage(data),
		syndicate_to: (data) => {
			if (data.drink_of) {
				return [
					`https://untappd.com/user/${untappd}/checkin/${data.page.fileSlug}`,
				];
			} else if (data.listen_of) {
				return [data.listen_of];
			} else if (data.read_of) {
				return [data.read_of];
			}
			return data.syndicate_to || [];
		},
		webmentions: (data) =>
			process.env.WEBMENTION_IO_TOKEN
				? getWebmentions(
						configWebmentions,
						configWebmentions.domain + data.page.url,
					)
				: [],
	},
};
