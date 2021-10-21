const minifier = require('html-minifier')

// Load .env variables with dotenv
require("dotenv").config()

module.exports = function htmlmin(value, outputPath) {
    if (outputPath.endsWith(".html")) {
        return minifier.minify(value, {
            useShortDoctype: true,
            removeComments: process.env.ELEVENTY_ENV == 'production' ? true : false,
            collapseWhitespace: process.env.ELEVENTY_ENV == 'production' ? true : false,
            minifyCSS: true
        })
    }
    return value
}
