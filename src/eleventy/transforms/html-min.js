require("dotenv").config()

const minifier = require("html-minifier")

module.exports = (value, outputPath) => {
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
