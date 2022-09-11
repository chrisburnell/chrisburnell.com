const configWebmentions = require("../data/config/webmentions.js")

const { getWebmentions } = require("@chrisburnell/eleventy-cache-webmentions")(null, configWebmentions)

module.exports = {
	layout: "page",
	tags: ["page"],
	permalink: "/{{ page.fileSlug }}/index.html",
	eleventyComputed: {
		webmentions: (data) => {
			return getWebmentions(configWebmentions, configWebmentions.domain + data.page.url)
		},
	},
}
