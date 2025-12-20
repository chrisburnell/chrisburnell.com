import dotenv from "dotenv";
dotenv.config({ quiet: true });

import {
	getWebmentions,
	getWebmentionsByType,
} from "@chrisburnell/eleventy-cache-webmentions";
import configWebmentions from "../eleventy/config/webmentions.js";
import analytics from "../eleventy/data/analytics.js";
import { url as siteURL } from "../eleventy/data/site.js";
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
import { getMetaImage, getMetaTitle } from "../functions/collections.js";
import { stripHTML } from "../functions/strings.js";

const { pageviews } = await analytics();
const webmentionsCache = new Map();
const siteHost = getHost(siteURL);

export default {
	layout: "page",
	tags: ["page"],
	permalink: "/{{ page.fileSlug }}/index.html",
	eleventyComputed: {
		canonical: (data) => siteURL + data.page.url,
		meta_title: (data) => getMetaTitle(data),
		meta_description: (data) => {
			if (data.excerpt || data.description) {
				return replaceLineBreaks(
					stripHTML(markdownFormat(data.excerpt || data.description)),
				);
			}
			return `A page on ${siteHost}`;
		},
		meta_image: (data) => getMetaImage(data),
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
		js_includes: (data) => [...new Set(data.js_includes)],
		js_module_includes: (data) => [...new Set(data.js_module_includes)],
		pre_includes: (data) => [...new Set(data.pre_includes)],
		post_includes: (data) => [...new Set(data.post_includes)],
	},
};
