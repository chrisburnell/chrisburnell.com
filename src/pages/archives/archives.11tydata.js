import { url as siteURL } from "../../eleventy/data/site.js";
import {
	markdownFormat,
	replaceLineBreaks,
} from "../../eleventy/filters/strings.js";
import { getHost } from "../../eleventy/filters/urls.js";
import { getMetaImage, getMetaTitle } from "../../functions/collections.js";
import { stripHTML } from "../../functions/strings.js";

export default {
	layout: "archive",
	list: "stack",
	by_year: true,
	show_categories: true,
	show_images: true,
	excludeFromSearch: true,
	eleventyComputed: {
		canonical: (data) => siteURL + data.page.url,
		meta_title: (data) => getMetaTitle(data),
		meta_description: (data) => {
			if (data.excerpt || data.description) {
				return replaceLineBreaks(
					stripHTML(markdownFormat(data.excerpt || data.description)),
				);
			}
			return `A page on ${getHost(siteURL)}`;
		},
		meta_image: (data) => getMetaImage(data),
	},
};
