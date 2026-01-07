import dotenv from "dotenv";
dotenv.config({ quiet: true });

import {
	getWebmentions,
	getWebmentionsByType,
} from "@chrisburnell/eleventy-cache-webmentions";
import configWebmentions from "../eleventy/config/webmentions.js";
import analytics from "../eleventy/data/analytics.js";
import { untappd } from "../eleventy/data/author.js";
import { url as siteURL } from "../eleventy/data/site.js";
import { getCategoryName } from "../eleventy/filters/collections.js";
import {
	markdownFormat,
	replaceLineBreaks,
} from "../eleventy/filters/strings.js";
import { getHost } from "../eleventy/filters/urls.js";
import {
	getDirectReplies,
	getSocialReplies,
	replaceWebmentions,
} from "../eleventy/filters/utils.js";
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

const { pageviews } = await analytics();
const webmentionsCache = new Map();
const siteHost = getHost(siteURL);

export default {
	layout: "post",
	tags: ["post"],
	list: "stack",
	mf_root: "entry",
	show_responses: true,
	eleventyComputed: {
		categoryCollectionName: (data) =>
			`category${data.category.charAt(0).toUpperCase()}${data.category.slice(1)}`,
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
			if (data.excerpt || data.description) {
				return replaceLineBreaks(
					stripHTML(markdownFormat(data.excerpt || data.description)),
				);
			} else if (data.rsvp) {
				return `A ${getCategoryName(data)} on ${siteHost}`;
			} else if (data.in_reply_to) {
				return `A Reply on ${siteHost}`;
			}
			return `A ${getCategoryName(data)} on ${siteHost}`;
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
		webmentions: async (data) => {
			if (webmentionsCache.has(data.page.url)) {
				return webmentionsCache.get(data.page.url);
			}
			const webmentions = process.env.WEBMENTION_IO_TOKEN
				? replaceWebmentions(
						await getWebmentions(
							configWebmentions,
							configWebmentions.domain + data.page.url,
						),
					)
				: [];
			const bookmarks = getWebmentionsByType(webmentions, "bookmark-of");
			const likes = getWebmentionsByType(webmentions, "like-of");
			const reposts = getWebmentionsByType(webmentions, "repost-of");
			const links = getWebmentionsByType(webmentions, "mention-of");
			const socialReplies = getSocialReplies(webmentions);
			const directReplies = getDirectReplies(webmentions);
			const all = [
				...bookmarks,
				...likes,
				...reposts,
				...links,
				...socialReplies,
				...directReplies,
			];
			const webmentionData = {
				bookmarks,
				likes,
				reposts,
				links,
				socialReplies,
				directReplies,
				all,
				length: all.length,
			};
			webmentionsCache.set(data.page.url, webmentionData);
			return webmentionData;
		},
		pageviews: (data) => {
			return pageviews[data.page.url] || {};
		},
		rank: (data) => data.rank || {},
		css_includes: (data) => [...new Set(data.css_includes)],
		js_includes: (data) => [
			...new Set([...data.js_includes, "src/js/imports/perching.js"]),
		],
		js_module_includes: (data) => [...new Set(data.js_module_includes)],
		pre_includes: (data) => [...new Set(data.pre_includes)],
		post_includes: (data) => [...new Set(data.post_includes)],
	},
};
