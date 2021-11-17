const fs = require("fs")
const fetch = require("node-fetch")

// Load .env variables with dotenv
require("dotenv").config()

// Define Cache Location and API Endpoint
const CACHE_DIR = ".cache"
const API_ORIGIN = process.env.PERSONAL_API_URL
const TOKEN = process.env.WEBMENTION_IO_TOKEN
const TYPES = ["breweries", "gamePublishers", "humans", "meetups", "musicArtists", "publications"]

async function fetchPeople() {
    // If we dont have a token, abort
    if (!TOKEN) {
        console.warn("Unable to fetch data: no access token specified in environment!")
        return false
    }

    const output = await Promise.all(
        TYPES.map(async (type) => {
            const response = await fetch(`${API_ORIGIN}/${type}.json?token=${TOKEN}`)
            if (response.ok) {
                const feed = await response.json()
                console.log(`${feed.length} ${type} fetched`)
                return feed
            }
            return []
        })
    )

    return [].concat.apply([], output)
}

// save combined webmentions in cache file
function writeToCache(data) {
    const filePath = `${CACHE_DIR}/people.json`
    const fileContent = JSON.stringify(data, null, 2)

    // create cache folder if it doesnt exist already
    if (!fs.existsSync(CACHE_DIR)) {
        fs.mkdirSync(CACHE_DIR)
    }
    // write data to cache json file
    fs.writeFile(filePath, fileContent, err => {
        if (err) throw err
        console.log(`People Data cached to ${filePath}.`)
    })
}

// get cache contents from json file
async function readFromCache() {
    const filePath = `${CACHE_DIR}/people.json`
    let cacheExists = await fs.existsSync(filePath)

    if (cacheExists) {
        const cacheFile = await fs.readFileSync(filePath)
        return JSON.parse(cacheFile)
    }

    return {
        lastFetched: null,
        people: []
    }
}

function enablePeople() {
    return process.env.ELEVENTY_FEATURES && process.env.ELEVENTY_FEATURES.split(",").indexOf("people") > -1
}

module.exports = async function() {
    const cache = await readFromCache()
    let { lastFetched, people } = cache

    if (enablePeople() || !lastFetched) {
        const feed = await fetchPeople(lastFetched)

        if (feed) {
            people = []

            for (let person of feed) {
                people.push(person)
            }

            const data = {
                lastFetched: new Date(),
                count: people.length,
                people: people
            }

            writeToCache(data)
            console.log(`Wrote ${data.count} people to cache.`)
            return data
        }
    }

    // console.log(`Loaded ${cache.count} people from cache.`)
    return cache
}
