const configWebmentions = require("../data/config/webmentions.js")

const Webmentions = require("@chrisburnell/eleventy-cache-webmentions")(null, configWebmentions)

module.exports = async () => {
	return {
		layout: "page",
		tags: ["page"],
		permalink: "/{{ page.fileSlug }}/index.html",
		eleventyComputed: {
			webmentions: async (data) => {
				return await Webmentions.getWebmentions(configWebmentions, configWebmentions.domain + data.page.url)
			},
		},
	}
}
