const fs = require("fs")
const site = require("../../data/site.json")
const author = require("../../data/author.json")
const twitterReplacements = require("../../data/twitterReplacements.json")
const queryFilters = require("../filters/queries.js")
const getTwitterAvatarUrl = require("twitter-avatar-url")
const eleventyImage = require("@11ty/eleventy-img")

// Load .env variables with dotenv
require("dotenv").config()

// Avatar Dimensions
const size = 96 // 48 * 2

const chunkArray = (arr, size) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (v, i) => arr.slice(i * size, i * size + size)
)

const fixTwitterUsername = (twitterUsername) => {
    return Object.entries(twitterReplacements).reduce((accumulator, [key, value]) => {
        return accumulator.replace(key, value)
    }, twitterUsername)
}

function getImageOptions(lookup) {
    return {
        widths: [size],
        urlPath: "/images/avatars/",
        outputDir: "./_site/images/avatars",
        formats: process.env.ELEVENTY_PRODUCTION ? ["avif", "webp", "jpeg"] : ["webp", "jpeg"],
        cacheDuration: "4w",
        cacheDirectory: ".cache",
        filenameFormat: function(id, src, width, format) {
            return `${String(lookup).toLowerCase()}.${format}`;
        }
    }
}

function fetchImageData(lookup, url) {
    if (!url) {
        throw new Error("src property required in `img` shortcode.")
    }

    eleventyImage(url, getImageOptions(lookup)).then( function() {
        // return nothing, even though this returns a promise
    })
}

async function storeAvatar(id, classes = "") {
    // We know where the images will be
    let fakeUrl = `https://chrisburnell.com/images/avatars/${id}.jpg`
    let imgData = eleventyImage.statsByDimensionsSync(fakeUrl, size, size, getImageOptions(id))
    let markup = eleventyImage.generateHTML(imgData, {
        alt: `Avatar for ${id}`,
        class: "[ avatar ] [ u-author ] " + (classes ? ` ${classes}` : ""),
        loading: "lazy",
        decoding: "async",
    }, {
        whitespaceMode: "inline"
    })

    return markup
}

function webmentionsEnabled() {
    return process.env.ELEVENTY_FEATURES && process.env.ELEVENTY_FEATURES.split(",").indexOf("webmentions") > -1
}

module.exports = function(config) {
    let twitterUsernames, mastodonHandles, domains

    config.on("beforeBuild", () => {
        twitterUsernames = new Set()
        mastodonHandles = new Set()
        domains = new Set()
    })

    if (webmentionsEnabled()) {
        config.on("afterBuild", () => {
            let array = Array.from(twitterUsernames)
            let chunks = chunkArray(array, 100)
            console.log(`[${queryFilters.getHost(site.url)}] Generating ${array.length} Twitter avatars.`)
            for (let twitterUsernames of chunks) {
                getTwitterAvatarUrl(twitterUsernames).then(results => {
                    try {
                        for (let result of results) {
                            fetchImageData(result.username, result.url.large)
                        }
                    }
                    catch (error) {
                        console.log(results)
                    }
                })
            }

            array = Array.from(mastodonHandles)
            console.log(`[${queryFilters.getHost(site.url)}] Generating ${array.length} Mastodon avatars.`)
            for (let mastodonHandle of array) {
                fetchImageData(mastodonHandle.handle, mastodonHandle.photo)
            }

            array = Array.from(domains)
            console.log(`[${queryFilters.getHost(site.url)}] Generating ${array.length} domain avatars.`)
            for (let domain of array) {
                fetchImageData(domain.url, domain.photo)
            }
        })
    }

    config.addNunjucksAsyncShortcode("avatar", async function(photo, url, authorUrl, classes = "") {
        const mastodonHandle = queryFilters.getMastodonHandle(authorUrl)
        if (url.includes("twitter.com")) {
            let target = url.includes(author.twitter) ? (authorUrl.includes(site.url) ? url : authorUrl) : url
            let username = fixTwitterUsername(target.split("twitter.com/")[1].split("/")[0])
            twitterUsernames.add(username.toLowerCase())
            return storeAvatar(username, classes)
        }
        else if (mastodonHandle !== authorUrl) {
            mastodonHandles.add({
                "handle": mastodonHandle,
                "photo": photo.toLowerCase(),
            })
            return storeAvatar(mastodonHandle, classes)
        }
        else if (photo) {
            let domain = queryFilters.getHost(authorUrl || url)
            domains.add({
                "url": domain,
                "photo": photo.toLowerCase(),
            })
            return storeAvatar(domain, classes)
        }

        return `<picture><source type="image/avif" srcset="/images/default-profile.avif 48w"><source type="image/webp" srcset="/images/default-profile.webp 48w"><img alt="" class="[ avatar ]" loading="lazy" decoding="async" src="/images/default-profile.jpg" width="48" height="48"></picture>`
    })
}
