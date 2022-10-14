const EleventyFetch = require("@11ty/eleventy-fetch")

const site = require("#data/site")
const author = require("#data/author")
const configWebmentions = require("../data/config/webmentions.js")

const { getWebmentions } = require("@chrisburnell/eleventy-cache-webmentions")()

const getExternalLikes = async (syndicationLinks) => {
	if (syndicationLinks) {
		const matchingLinks = syndicationLinks.filter((link) => {
			return link.includes("https://dev.to")
		})

		if (matchingLinks.length) {
			const articles = await EleventyFetch(`https://dev.to/api/articles?username=${author["dev_to"]}`, {
				duration: site.cacheDurations.weekly,
				type: "json",
				fetchOptions: {
					method: "GET",
				},
			})

			const matchingArticles = articles.filter((article) => {
				return matchingLinks[0] === article["url"]
			})

			if (matchingArticles.length) {
				return matchingArticles[0]["positive_reactions_count"] || 0
			}
		}
	}

	return 0
}

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
		externalLikes: async (data) => {
			const externalLikes = await getExternalLikes(data?.syndicate_to)
				.then((externalLikes) => externalLikes)
				.catch(() => 0)

			return externalLikes
		},
	},
}
