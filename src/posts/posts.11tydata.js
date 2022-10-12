const configWebmentions = require("../data/config/webmentions.js")

const { getWebmentions } = require("@chrisburnell/eleventy-cache-webmentions")()

module.exports = {
	layout: "post",
	tags: ["post"],
	list: "deck",
	mf_root: "entry",
	show_responses: true,
	eleventyComputed: {
		webmentions: (data) => {
			return getWebmentions(configWebmentions, configWebmentions.domain + data.page.url)
		},
	},
}
