const minifier = require("html-minifier")

// Load .env variables with dotenv
require("dotenv").config()

module.exports = function htmlmin(value, outputPath) {
	if (outputPath.endsWith(".html")) {
		return minifier.minify(value, {
			useShortDoctype: true,
			removeComments: process.env.ELEVENTY_PRODUCTION,
			collapseWhitespace: process.env.ELEVENTY_PRODUCTION,
			minifyCSS: true,
		})
	}
	return value
}
