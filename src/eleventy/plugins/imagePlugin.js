const site = require("../../data/site.json")
const queryFilters = require("../filters/queries.js")
const eleventyImage = require("@11ty/eleventy-img")

// Load .env variables with dotenv
require("dotenv").config()

function getImageOptions(lookup) {
    return {
        widths: [null],
        urlPath: "/images/content/",
        outputDir: "./_site/images/content",
        formats: process.env.ELEVENTY_PRODUCTION ? ["avif", "webp", "jpeg"] : ["webp", "jpeg"],
        cacheDuration: "4w",
        filenameFormat: function(id, src, width, format) {
            return `${String(lookup)}.${format}`;
        }
    }
}

function fetchImageData(lookup, src) {
    if (!src) {
        throw new Error("src property required in `img` shortcode.")
    }

    eleventyImage(`https://chrisburnell.com/images/content/${src}`, getImageOptions(lookup)).then( function() {
        // return nothing, even though this returns a promise
    })
}

async function storeImage(src, alt = "") {
    // We know where the images will be
    let fakeUrl = `https://chrisburnell.com/images/content/${src}`
    let imgData = eleventyImage.statsByDimensionsSync(fakeUrl, 810, 300, getImageOptions(src))
    let markup = eleventyImage.generateHTML(imgData, {
        alt: alt,
        loading: "lazy",
        decoding: "async",
    }, {
        whitespaceMode: "inline"
    })

    return markup
}

module.exports = function(config) {
    let contentImages

    config.on("beforeBuild", () => {
        contentImages = new Set()
    })

    config.on("afterBuild", () => {
        array = Array.from(contentImages)
        console.log(`[${queryFilters.getHost(site.url)}] Generating ${array.length} content images.`)
        for (let contentImage of array) {
            fetchImageData(contentImage.alt, contentImage.src)
        }
    })

    config.addNunjucksAsyncShortcode("img", async function(src, alt) {
            contentImages.add({
                "src": src,
                "alt": alt
            })
            return storeImage(src, alt)
    })
}
