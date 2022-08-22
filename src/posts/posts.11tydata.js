const site = require("#data/site")
const webmentionsConfig = require("../data/webmentionsConfig.js")

const dateFilters = require("#filters/dates")

const Webmentions = require("@chrisburnell/eleventy-cache-webmentions")(null, webmentionsConfig)

module.exports = async () => {
	const filteredWebmentions = await Webmentions()

	return {
		layout: "post",
		list: "deck",
		mf_root: "entry",
		tags: ["post"],
		show_webmentions: true,
		eleventyComputed: {
			webmentions: (data) => {
				const urlWebmentions = filteredWebmentions[site.url + data.page.url] || []

				if (urlWebmentions.length) {
					return urlWebmentions.sort((a, b) => dateFilters.epoch(a.data.published || a.verified_date) - dateFilters.epoch(b.data.published || b.verified_date))
				}
				return []
			},
		},
	}
}
