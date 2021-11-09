const fs = require("fs")
const fetch = require("node-fetch")
const { DateTime } = require("luxon")
const uniqBy = require("lodash/uniqBy")
const queryFilters = require("../eleventy/filters/queries.js")
const site = require("./site.json")
const urlReplacements = require("./urlReplacements.json")

const domain = queryFilters.getHost(site.url)

// Load .env variables with dotenv
require("dotenv").config()

// Define Cache Location and API Endpoint
const CACHE_DIR = ".cache"
const API_ORIGIN = "https://webmention.io/api/mentions.jf2"
const TOKEN = process.env.WEBMENTION_IO_TOKEN

const fixUrl = (url) => {
    return Object.entries(urlReplacements).reduce((accumulator, [key, value]) => {
        return accumulator.replace(key, value)
    }, url)
}

const getBaseUrl = (url) => {
    let hashSplit = url.split("#")
    let queryparamSplit = hashSplit[0].split("?")
    return queryparamSplit[0].replace(/\/?$/, "/")
}

async function fetchWebmentions(since, perPage = 9001) {
    // If we dont have a token, abort
    if (!TOKEN) {
        console.warn(`[${queryFilters.getHost(site.url)}] Unable to fetch WebMentions: no access token specified in environment!`)
        return false
    }
    // If we dont have a domain, abort
    if (!domain) {
        console.warn(`[${queryFilters.getHost(site.url)}] Unable to fetch WebMentions: no url specified in site metadata!`)
        return false
    }

    // TODO move to use since_id instead of since date
    let url = `${API_ORIGIN}?domain=${domain}&token=${TOKEN}&per-page=${perPage}`
    if (since) url += `&since=${since}` // only fetch new mentions

    const response = await fetch(url)
    if (response.ok) {
        const feed = await response.json()
        console.log(`[${queryFilters.getHost(site.url)}] ${feed.children.length} webmentions fetched from ${API_ORIGIN}`)
        return feed
    }

    return null
}

// save combined webmentions in cache file
function writeToCache(data) {
    const filePath = `${CACHE_DIR}/webmentions.json`
    const fileContent = JSON.stringify(data, null, 2)

    // create cache folder if it doesnt exist already
    if (!fs.existsSync(CACHE_DIR)) {
        fs.mkdirSync(CACHE_DIR)
    }
    // write data to cache json file
    fs.writeFile(filePath, fileContent, err => {
        if (err) throw err
        console.log(`[${queryFilters.getHost(site.url)}] webmentions cached to ${filePath}.`)
    })
}

// get cache contents from json file
async function readFromCache() {
    const filePath = `${CACHE_DIR}/webmentions.json`
    let cacheExists = await fs.existsSync(filePath)

    if (cacheExists) {
        const cacheFile = await fs.readFileSync(filePath)
        return JSON.parse(cacheFile)
    }

    return {
        lastFetched: null,
        mentions: {}
    }
}

function webmentionsEnabled() {
    return process.env.ELEVENTY_FEATURES && process.env.ELEVENTY_FEATURES.split(",").indexOf("webmentions") > -1
}

module.exports = async function() {
    const cache = await readFromCache()
    const { lastFetched, mentions } = cache

    if (webmentionsEnabled() || !lastFetched) {
        const feed = await fetchWebmentions(lastFetched)

        if (feed) {
            for (let webmention of feed.children) {
                let url = getBaseUrl(fixUrl(webmention["wm-target"]))
                if (!mentions[url]) {
                    mentions[url] = []
                }

                mentions[url].push(webmention)
            }

            let totalCount = 0
            for (let url in mentions) {
                mentions[url] = uniqBy(mentions[url], function(entry) {
                    return entry["wm-id"]
                })

                totalCount += mentions[url].length
                mentions[url].sort((a, b) => {
                    return DateTime.fromISO(a.published || a["wm-received"], { zone: "utc" }).toJSDate().getTime() - DateTime.fromISO(b.published || b["wm-received"], { zone: "utc" }).toJSDate().getTime()
                })
            }

            const webmentions = {
                lastFetched: new Date(),
                count: totalCount,
                mentions: mentions
            }

            writeToCache(webmentions)
            console.log(`Wrote ${webmentions.count} webmentions to cache.`)
            return webmentions
        }
    }

    // console.log(`[${queryFilters.getHost(site.url)}] Loaded ${cache.count} webmentions from cache.`)
    return cache
}
