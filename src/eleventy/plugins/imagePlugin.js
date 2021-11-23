const path = require("path")
const Image = require("@11ty/eleventy-img")

// Load .env variables with dotenv
require("dotenv").config()

async function imageShortcode(src, alt, widths = [null]) {
    const originalFormat = src.includes("png") ? "png" : "jpg"

    let options = Object.assign({}, {
        width: widths,
        formats: process.env.ELEVENTY_PRODUCTION ? ["avif", "webp", originalFormat] : ["webp", originalFormat],
        urlPath: "/images/built/",
        outputDir: "./_site/images/built",
        sharpAvifOptions: {},
        filenameFormat: function(id, src, width, format) {
            const extension = path.extname(src)
            const name = path.basename(src, extension)
            return `${name}.${format}`
        },
    }, {})

    let metadata = await Image(src, options)

    let imageAttributes = Object.assign({
        alt: alt,
        loading: "lazy",
        decoding: "async",
    }, {})

    // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
    return Image.generateHTML(metadata, imageAttributes, {
        whitespaceMode: "inline"
    })
}

module.exports = function(config) {
    config.addNunjucksAsyncShortcode("img", imageShortcode)
}
