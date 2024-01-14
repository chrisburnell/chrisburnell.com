require("dotenv").config()

const { cacheDurations, url: siteUrl } = require("#data/site")
const urlReplacements = require("#data/urlReplacements")

const blocklist = require("./blocklist.js")

module.exports = {
	domain: siteUrl,
	feed: `https://webmention.io/api/mentions.jf2?domain=${new URL(siteUrl).hostname}&token=${process.env.WEBMENTION_IO_TOKEN}&per-page=9001`,
	key: "children",
	// feed: `https://jam.chrisburnell.com/webmention/chrisburnell.com/${process.env.GO_JAMMING_TOKEN}`,
	// key: "json",
	duration: cacheDurations.hourly,
	allowedHTML: {
		allowedTags: ["b", "i", "em", "strong", "a", "code", "s", "ins", "del", "mark", "samp", "var"],
		allowedAttributes: {
			a: ["href"],
		},
		allowedSchemes: ["https"],
		nonTextTags: ["style", "script", "textarea", "option", "noscript", "pre"],
	},
	urlReplacements: urlReplacements,
	maximumHtmlText: "Mentioned this:",
	allowlist: [],
	blocklist: blocklist,
}
