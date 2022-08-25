const configWebmentions = require("../data/config/webmentions.js")

const dateFilters = require("#filters/dates")

const Webmentions = require("@chrisburnell/eleventy-cache-webmentions")(null, configWebmentions)

module.exports = async () => {
	const webmentionsByUrl = await Webmentions()

	return {
		layout: "page",
		tags: ["page"],
		permalink: "/{{ page.fileSlug }}/index.html",
		eleventyComputed: {
			webmentions: (data) => {
				const webmentionsForUrl = webmentionsByUrl[configWebmentions.domain + data.page.url] || []

				if (webmentionsForUrl.length) {
					return webmentionsForUrl.sort((a, b) => {
						return dateFilters.epoch(a.data.published || a.verified_date) - dateFilters.epoch(b.data.published || b.verified_date)
					})
				}
				return []
			},
		},
	}
}
