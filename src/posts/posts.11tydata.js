const configWebmentions = require("../data/config/webmentions.js")

const Webmentions = require("@chrisburnell/eleventy-cache-webmentions")(null, configWebmentions)

module.exports = async () => {
	return {
		layout: "post",
		tags: ["post"],
		list: "deck",
		mf_root: "entry",
		show_webmentions: true,
		eleventyComputed: {
			webmentions: async (data) => {
				return await Webmentions.getWebmentions(configWebmentions, configWebmentions.domain + data.page.url)
			},
		},
	}
}
