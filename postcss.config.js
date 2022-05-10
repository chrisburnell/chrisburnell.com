module.exports = {
	syntax: "postcss-scss",
	plugins: [require("postcss-import-ext-glob"), require("postcss-import"), require("cssnano")],
}
