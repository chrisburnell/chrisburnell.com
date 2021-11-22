const path = require("path");
const Image = require("@11ty/eleventy-img")

// Load .env variables with dotenv
require("dotenv").config()

async function imageShortcode(src, alt, cls, widths, sizes = "100vw") {
    const originalFormat = src.includes("png") ? "png" : "jpg"
    let metadata = await Image(src, {
        widths: widths,
        urlPath: "/images/built/",
        outputDir: "./_site/images/built",
        formats: process.env.ELEVENTY_PRODUCTION ? ["avif", "webp", originalFormat] : ["webp", originalFormat],
        filenameFormat: function(id, src, width, format) {
            const extension = path.extname(src);
            const name = path.basename(src, extension);
            return `${name}-${width}.${format}`
        },
    })

    let imageAttributes = {
        class: cls,
        alt,
        sizes,
        loading: "lazy",
        decoding: "async",
    }

    // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
    return Image.generateHTML(metadata, imageAttributes, {
        whitespaceMode: "inline"
    });
}

module.exports = function(config) {
    config.addNunjucksAsyncShortcode("img", imageShortcode);
}
