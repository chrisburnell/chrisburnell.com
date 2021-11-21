const CacheAsset = require("@11ty/eleventy-cache-assets")
const { DateTime } = require("luxon")
const uniqBy = require("lodash/uniqBy")

const site = require("./site.json")
const queryFilters = require("../eleventy/filters/queries.js")
const urlReplacements = require("./urlReplacements.json")

const domain = queryFilters.getHost(site.url)

// Load .env variables with dotenv
require("dotenv").config()

const TOKEN = process.env.WEBMENTION_IO_TOKEN

async function getWebmentions() {
    return await CacheAsset(`https://webmention.io/api/mentions.jf2?domain=${domain}&token=${TOKEN}&per-page=9999`, {
        duration: "1d",
        type: "json",
        fetchOptions: {
            method: "GET"
        }
    })
}

module.exports = async function() {
    const rawWebmentions = await getWebmentions()
    let webmentions = {}

    // Sort webmentions into groups by target
    for (let webmention of rawWebmentions.children) {
        let url = queryFilters.getBaseUrl(queryFilters.fixUrl(webmention["wm-target"]))

        if (!webmentions[url]) {
            webmentions[url] = []
        }

        webmentions[url].push(webmention)
    }

    // Sort mentions in groups by date
    for (let url in webmentions) {
        webmentions[url] = uniqBy(webmentions[url], function(item) {
            return item["wm-id"]
        })
    }

    console.log(`Wrote ${rawWebmentions.children.length} webmentions to cache.`)

    return webmentions
}
