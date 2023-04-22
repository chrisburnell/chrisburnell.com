const autoprefixer = require("autoprefixer")
const oklab = require('@csstools/postcss-oklab-function')

module.exports = {
	syntax: "postcss-scss",
	plugins: [
		autoprefixer,
		oklab({
			preserve: true,
			subFeatures: {
				displayP3: false
			}
		})
	],
}
