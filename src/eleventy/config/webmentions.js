import dotenv from "dotenv";
dotenv.config({ quiet: true });

import { defaults } from "@chrisburnell/eleventy-cache-webmentions";
import { cacheDurations, url as siteURL } from "../data/site.js";
import urlReplacements from "../data/urlReplacements.js";
import { getHost } from "../filters/urls.js";
import blocklist from "./blocklist.js";

export default Object.assign({}, defaults, {
	domain: siteURL,
	feed: `https://webmention.io/api/mentions.jf2?domain=${getHost(siteURL)}&token=${process.env.WEBMENTION_IO_TOKEN}`,
	key: "children",
	// feed: `https://jam.chrisburnell.com/webmention/chrisburnell.com/${process.env.GO_JAMMING_TOKEN}`,
	// key: "json",
	duration: cacheDurations.hourly,
	allowedHTML: {
		allowedTags: [
			"p",
			"b",
			"i",
			"em",
			"strong",
			"a",
			"code",
			"s",
			"ins",
			"del",
			"mark",
			"samp",
			"var",
		],
		allowedAttributes: {
			a: ["href"],
		},
		allowedSchemes: ["https"],
		nonTextTags: [
			"style",
			"script",
			"textarea",
			"option",
			"noscript",
			"pre",
		],
	},
	urlReplacements: urlReplacements,
	maximumHtmlText: "Mentioned this:",
	allowlist: [],
	blocklist: blocklist,
});
