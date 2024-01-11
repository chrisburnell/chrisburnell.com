const autoprefixer = require("autoprefixer")
const cssnano = require("cssnano")

module.exports = {
	syntax: "postcss-scss",
	plugins: [
		autoprefixer,
		cssnano
	],
}
