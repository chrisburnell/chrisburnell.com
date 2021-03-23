const site = require("../../data/site.json")
const author = require("../../data/author.json")
const queryFilters = require("../filters/queries.js")
const getTwitterAvatarUrl = require("twitter-avatar-url")
const eleventyImage = require("@11ty/eleventy-img")

const chunkArray = (arr, size) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (v, i) => arr.slice(i * size, i * size + size)
)

function getImageOptions(lookup) {
    return {
        widths: [48],
        urlPath: "/images/avatars/",
        outputDir: "images/avatars",
        formats: process.env.ELEVENTY_ENV === "production" ? ["avif", "webp", "jpeg"] : ["webp", "jpeg"],
        cacheDuration: "4w",
        cacheDirectory: ".cache",
        cacheOptions: {
            duration: "4w",
            directory: ".cache",
        },
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

async function twitterAvatar(username, classes = "") {
    // We know where the images will be
    let fakeUrl = `https://twitter.com/${username}.jpg`
    let imgData = eleventyImage.statsByDimensionsSync(fakeUrl, 48, 48, getImageOptions(username))
    let markup = eleventyImage.generateHTML(imgData, {
        alt: `${username}’s Avatar`,
        class: "[ avatar ]" + (classes ? ` ${classes}` : ""),
        loading: "lazy",
        decoding: "async",
    }, {
        whitespaceMode: "inline"
    })

    return markup
}

async function domainAvatar(domain, classes = "") {
    // We know where the images will be
    let fakeUrl = `https://chrisburnell.com/${domain}.jpg`
    let imgData = eleventyImage.statsByDimensionsSync(fakeUrl, 48, 48, getImageOptions(domain))
    let markup = eleventyImage.generateHTML(imgData, {
        alt: `Avatar for ${domain}`,
        class: "[ avatar ]" + (classes ? ` ${classes}` : ""),
        loading: "lazy",
        decoding: "async",
    }, {
        whitespaceMode: "inline"
    })

    return markup
}

module.exports = function(config) {
    let usernames
    let domains

    config.on("beforeBuild", () => {
        usernames = new Set()
        domains = new Set()
    })

    config.on("afterBuild", () => {
        let array, chunks

        array = Array.from(usernames)
        chunks = chunkArray(array, 100)
        console.log(`Generating ${array.length} Twitter avatars.`)
        for (let usernames of chunks) {
            getTwitterAvatarUrl(usernames).then(results => {
                for (let result of results) {
                    fetchImageData(result.username, result.url.large)
                }
            })
        }

        array = Array.from(domains)
        console.log(`Generating ${array.length} domain avatars.`)
        for (let domain of array) {
            fetchImageData(domain.url, domain.photo)
        }
    })

    config.addNunjucksAsyncShortcode("avatar", async function(photo, url, authorUrl, classes = "") {
        if (url.includes("twitter.com")) {
            let target = url.includes(author.twitter) ? (authorUrl.includes(site.url) ? url : authorUrl) : url
            let username = target.split("twitter.com/")[1].split("/")[0]
            usernames.add(username.toLowerCase())
            return twitterAvatar(username, classes)
        }
        else {
            if (!photo) {
                return `<picture><source type="image/webp" srcset="/images/default-profile.webp 48w"><img alt="" class="[ avatar ]" loading="lazy" decoding="async" src="/images/default-profile.jpg" width="48" height="48"></picture>`
            }

            let domain = queryFilters.getHost(authorUrl || url)
            domains.add({
                "url": domain,
                "photo": photo.toLowerCase(),
            })
            return domainAvatar(domain, classes)
        }
    })

    config.addNunjucksAsyncShortcode("twitterAvatar", async function(username, classes = "") {
        usernames.add(username.toLowerCase())
        return twitterAvatar(username, classes)
    })

    config.addNunjucksAsyncShortcode("domainAvatar", async function(photo, domain = "", classes = "") {
        if (!photo) {
            return `<picture><source type="image/webp" srcset="/images/default-profile.webp 48w"><img alt="" class="[ avatar ]" loading="lazy" decoding="async" src="/images/default-profile.jpg" width="48" height="48"></picture>`
        }

        domains.add({
            "photo": photo.toLowerCase(),
            "url": url,
        })
        return domainAvatar(domain, classes)
    })
}
