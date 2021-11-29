const fetch = require("node-fetch")
const uniqBy = require("lodash/uniqBy")
const { AssetCache } = require("@11ty/eleventy-cache-assets")

const site = require("./site.json")
const dateFilters = require("../eleventy/filters/dates.js")
const queryFilters = require("../eleventy/filters/queries.js")

const domain = queryFilters.getHost(site.url)
const duration = "10m"

// Load .env variables with dotenv
require("dotenv").config()

const TOKEN = process.env.WEBMENTION_IO_TOKEN

const fetchWebmentions = async () => {
	let asset = new AssetCache("webmentions")
	asset.ensureDir()

	let webmentions = {
		type: "feed",
		name: "Webmentions",
		children: [],
	}

	// If there is a cached file at all, grab its contents now
	if (asset.isCacheValid("9001y")) {
		webmentions = await asset.getCachedValue()
	}

	// If there is a cached file but it is outside of expiry, fetch fresh
	// results since the most recent
	if (!asset.isCacheValid(duration)) {
		const since = asset._cache.getKey("webmentions") ? asset._cache.getKey("webmentions").cachedAt : false
		const url = `https://webmention.io/api/mentions.jf2?domain=${domain}&token=${TOKEN}&per-page=9001${since ? `&since=${since}` : ``}`
		const response = await fetch(url)
		if (response.ok) {
			const feed = await response.json()
			if (feed.children.length) {
				console.log(`[${queryFilters.getHost(site.url)}] ${feed.children.length} new Webmentions fetched into cache.`)
			}
			webmentions.children = [...feed.children, ...webmentions.children].sort((a, b) => {
				return dateFilters.epoch(b.published || b["wm-received"]) - dateFilters.epoch(a.published || a["wm-received"])
			})
			await asset.save(webmentions, "json")
			return webmentions
		}
	}

	return webmentions
}

module.exports = async () => {
	const rawWebmentions = await fetchWebmentions()
	let webmentions = {}

	// Sort Webmentions into groups by target
	rawWebmentions.children.forEach((webmention) => {
		// Get the target of the Webmention and fix it up
		let url = queryFilters.getBaseUrl(queryFilters.fixUrl(webmention["wm-target"].replace(/\/?$/, "/")))

		if (!webmentions[url]) {
			webmentions[url] = []
		}

		webmentions[url].push(webmention)
	})

	// Sort Webmentions in groups by url and remove duplicates by wm-id
	for (let url in webmentions) {
		webmentions[url] = uniqBy(webmentions[url], (item) => {
			return item["wm-id"]
		})
	}

	return webmentions
}
