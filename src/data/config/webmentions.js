const { defaults } = require("@chrisburnell/eleventy-cache-webmentions")()

const site = require("#data/site")
const urlReplacements = require("#data/urlReplacements")

// Load .env variables with dotenv
require("dotenv").config()

module.exports = Object.assign(defaults, {
	domain: site.url,
	feed: `https://webmention.io/api/mentions.json?domain=${new URL(site.url).hostname}&token=${process.env.WEBMENTION_IO_TOKEN}&per-page=9001`,
	key: "links",
	// feed: `https://jam.chrisburnell.com/webmention/chrisburnell.com/${process.env.GO_JAMMING_TOKEN}`,
	// key: "json",
	duration: site.cacheDurations.hourly,
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
})
