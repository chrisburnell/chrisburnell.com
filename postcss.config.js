const autoprefixer = require("autoprefixer")
const postcssLogical = require("postcss-logical")

const site = require("#data/site")

module.exports = {
	syntax: "postcss-scss",
	plugins: [
		autoprefixer,
		postcssLogical({
			dir: site.dir,
		}),
	],
}
