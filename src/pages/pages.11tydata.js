const configWebmentions = require("../data/config/webmentions.js")
const dateFilters = require("#filters/dates")

const Webmentions = require("@chrisburnell/eleventy-cache-webmentions")(null, configWebmentions)
const sanitizeHTML = require("sanitize-html")

module.exports = async () => {
	const webmentionsByUrl = await Webmentions()

	return {
		layout: "page",
		tags: ["page"],
		permalink: "/{{ page.fileSlug }}/index.html",
		eleventyComputed: {
			webmentions: (data) => {
				const webmentionsForUrl = webmentionsByUrl[configWebmentions.domain + data.page.url] || []

				return webmentionsForUrl
					.map((entry) => {
						if (entry.data?.content) {
							entry.data.content = sanitizeHTML(entry.data.content, configWebmentions.allowedHTML)
							if (entry.data.content.length > configWebmentions.maximumHtmlLength) {
								entry.data.content = `${configWebmentions.maximumHtmlText} <a href="${entry.data.url}">${entry.data.url}</a>`
							}
						}
						return entry
					})
					.sort((a, b) => {
						return dateFilters.epoch(a.data.published || a.verified_date) - dateFilters.epoch(b.data.published || b.verified_date)
					})
			},
		},
	}
}
