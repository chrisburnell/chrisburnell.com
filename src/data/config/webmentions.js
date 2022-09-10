const site = require("#data/site")
const urlReplacements = require("#data/urlReplacements")

const sanitizeHTML = require("sanitize-html")

// Load .env variables with dotenv
require("dotenv").config()

module.exports = {
	domain: site.url,
	feed: `https://webmention.io/api/mentions.json?domain=${new URL(site.url).hostname}&token=${process.env.WEBMENTION_IO_TOKEN}&per-page=9001`,
	key: "links",
	// feed: `https://jam.chrisburnell.com/webmention/chrisburnell.com/${process.env.GO_JAMMING_TOKEN}`,
	// key: "json",
	duration: site.cacheDurations.short,
	urlReplacements: urlReplacements,
	maximumHtmlLength: 1000,
	maximumHtmlText: "Mentioned this:",
	allowedHTML: {
		allowedTags: ["b", "i", "em", "strong", "a", "code", "s", "ins", "del", "mark", "samp", "var"],
		allowedAttributes: {
			a: ["href"],
		},
		allowedSchemes: ["http", "https"],
		nonTextTags: ["style", "script", "textarea", "option", "noscript", "pre"],
	},
}
