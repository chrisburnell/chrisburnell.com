const Cache = require("@11ty/eleventy-cache-assets")
const uniqBy = require("lodash/uniqBy")

const site = require("./site.json")
const queryFilters = require("../eleventy/filters/queries.js")

const domain = queryFilters.getHost(site.url)

// Load .env variables with dotenv
require("dotenv").config()

const TOKEN = process.env.WEBMENTION_IO_TOKEN

const getWebmentions = async (since) => {
	const url = `https://webmention.io/api/mentions.jf2?domain=${domain}&token=${TOKEN}&per-page=9001${since ? `&since=${since}` : ``}`
	return await Cache(url, {
		removeUrlQueryParams: true,
		duration: "23h",
		type: "json",
		fetchOptions: {
			method: "GET",
		},
	})
}

module.exports = async () => {
	const rawWebmentions = await getWebmentions()
	let webmentions = {}

	// Sort webmentions into groups by target
	for (let webmention of rawWebmentions.children) {
		let url = queryFilters.getBaseUrl(queryFilters.fixUrl(webmention["wm-target"].replace(/\/?$/, "/")))

		if (!webmentions[url]) {
			webmentions[url] = []
		}

		webmentions[url].push(webmention)
	}

	// Sort mentions in groups by url
	for (let url in webmentions) {
		webmentions[url] = uniqBy(webmentions[url], (item) => {
			return item["wm-id"]
		})
	}

	return webmentions
}
