const EleventyFetch = require("@11ty/eleventy-fetch")

const site = require("#data/site")
const author = require("#data/author")
const configWebmentions = require("../data/config/webmentions.js")

const { getWebmentions } = require("@chrisburnell/eleventy-cache-webmentions")()

const getLatestArticles = async () => {
	return await EleventyFetch(`https://dev.to/api/articles?username=${author["dev_to"]}`, {
		duration: site.cacheDurations.long,
		type: "json",
		fetchOptions: {
			method: "GET",
		},
	})
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
		externalLikes: (data) => {
			return data.page.data?.syndicate_to.reduce((numberOfLikes, link) => {
				if (link.includes("https://dev.to")) {
					const latestArticles = getLatestArticles()

					console.log(latestArticles)

					return latestArticles.filter((article) => {
						return link.includes(article["url"])
					}).reduce((numberOfLikes, article) => {
						return numberOfLikes + article["positive_reactions_count"]
					}, 0)
				}
				return numberOfLikes
			}, 0) || 0
		}
	},
}
