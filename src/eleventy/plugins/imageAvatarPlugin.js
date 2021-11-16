const fs = require("fs")
const site = require("../../data/site.json")
const author = require("../../data/author.json")
const queryFilters = require("../filters/queries.js")
const getTwitterAvatarUrl = require("twitter-avatar-url")
const eleventyImage = require("@11ty/eleventy-img")

// Load .env variables with dotenv
require("dotenv").config()

// Avatar Dimensions
const size = 72

const chunkArray = (arr, size) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (v, i) => arr.slice(i * size, i * size + size)
)

function getImageOptions(lookup) {
    return {
        widths: [size],
        urlPath: "/images/avatars/",
        outputDir: "./_site/images/avatars",
        formats: ["avif", "webp", "jpeg"],
        cacheDuration: "4w",
        cacheDirectory: ".cache",
        filenameFormat: function(id, src, width, format) {
            return `${lookup.toLowerCase()}.${format}`;
        }
    }
}

function fetchImageData(lookup, url) {
    if (!url) {
        console.log(lookup)
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
    let twitterUsernames, domains

    config.on("beforeBuild", () => {
        twitterUsernames = new Set()
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
                    } catch (error) {
                        console.log(results)
                    }
                })
            }

            array = Array.from(domains)
            console.log(`[${queryFilters.getHost(site.url)}] Generating ${array.length} domain avatars.`)
            for (let domain of array) {
                fetchImageData(domain.url, domain.photo)
            }
        })
    }

    config.addNunjucksAsyncShortcode("avatar", async function(photo, url, authorUrl, classes = "") {
        if (url.includes("twitter.com")) {
            let target = url.includes(author.twitter) ? (authorUrl.includes(site.url) ? url : authorUrl) : url
            let username = target.split("twitter.com/")[1].split("/")[0]
            twitterUsernames.add(username.toLowerCase())
            return storeAvatar(username, classes)
        }
        else if (photo) {
            let domain = queryFilters.getHost(authorUrl || url)
            domains.add({
                "url": domain,
                "photo": photo.toLowerCase(),
            })
            return storeAvatar(domain, classes)
        }

        return `<picture><source type="image/webp" srcset="/images/default-profile.webp 48w"><img alt="" class="[ avatar ]" loading="lazy" decoding="async" src="/images/default-profile.jpg" width="48" height="48"></picture>`
    })
}
