const fs = require("fs")

const site = require("./src/data/site.json")

// Import Eleventy plugins
const pregenImagePlugin = require("./src/eleventy/plugins/pregenImagePlugin.js")
const imageAvatarPlugin = require("./src/eleventy/plugins/imageAvatarPlugin.js")
const imagePlugin = require("./src/eleventy/plugins/imagePlugin.js")
const albumCoverPlugin = require("./src/eleventy/plugins/albumCoverPlugin.js")
const syntaxHighlightPlugin = require("@11ty/eleventy-plugin-syntaxhighlight")
const webmentionsPlugin = require("@chrisburnell/eleventy-cache-webmentions")

// Import transforms
const parseTransform = require("./src/eleventy/transforms/parse.js")
const htmlMinTransform = require("./src/eleventy/transforms/html-min.js")

// Import filters
const dateFilters = require("./src/eleventy/filters/dates.js")
const stringFilters = require("./src/eleventy/filters/strings.js")
const queryFilters = require("./src/eleventy/filters/queries.js")
const utilityFilters = require("./src/eleventy/filters/utils.js")
const collectionFilters = require("./src/eleventy/filters/collections.js")
const newBase60 = require("./src/eleventy/filters/newBase60.js")

// Import shortcodes
const shortcodes = require("./src/eleventy/shortcodes.js")

// Import collections
const collections = require("./src/eleventy/collections.js")

// Import collectionsbuilders
const categoriesBuilder = require("./src/eleventy/builders/categories.js")
const tagsBuilder = require("./src/eleventy/builders/tags.js")

// Import other bits and bobs
const urlReplacements = require("./src/data/urlReplacements.json")

module.exports = (eleventyConfig) => {
	// Eleventy Plugins
	eleventyConfig.addPlugin(pregenImagePlugin)
	eleventyConfig.addPlugin(imageAvatarPlugin)
	eleventyConfig.addPlugin(imagePlugin)
	eleventyConfig.addPlugin(albumCoverPlugin)
	eleventyConfig.addPlugin(syntaxHighlightPlugin)
	eleventyConfig.addPlugin(webmentionsPlugin, {
		domain: site.url,
		urlReplacements: urlReplacements,
	})

	// Transforms
	eleventyConfig.addTransform("parse", parseTransform)
	// eleventyConfig.addTransform("htmlmin", htmlMinTransform)

	// Filters
	Object.keys(dateFilters).forEach((filterName) => {
		eleventyConfig.addFilter(filterName, dateFilters[filterName])
	})
	Object.keys(stringFilters).forEach((filterName) => {
		eleventyConfig.addFilter(filterName, stringFilters[filterName])
	})
	Object.keys(queryFilters).forEach((filterName) => {
		eleventyConfig.addFilter(filterName, queryFilters[filterName])
	})
	Object.keys(utilityFilters).forEach((filterName) => {
		eleventyConfig.addFilter(filterName, utilityFilters[filterName])
	})
	Object.keys(collectionFilters).forEach((filterName) => {
		eleventyConfig.addFilter(filterName, collectionFilters[filterName])
	})
	eleventyConfig.addFilter("newBase60", newBase60)

	// Shortcodes
	Object.keys(shortcodes).forEach((shortcodeName) => {
		eleventyConfig.addShortcode(shortcodeName, shortcodes[shortcodeName])
	})

	// Collections
	Object.keys(collections).forEach((collectionName) => {
		eleventyConfig.addCollection(collectionName, collections[collectionName])
	})

	// Builder Collections
	eleventyConfig.addCollection("categories", categoriesBuilder)
	eleventyConfig.addCollection("tags", tagsBuilder)

	// Layouts
	eleventyConfig.addLayoutAlias("base", "base.njk")
	eleventyConfig.addLayoutAlias("page", "page.njk")
	eleventyConfig.addLayoutAlias("archive", "archive.njk")
	eleventyConfig.addLayoutAlias("post", "post.njk")
	eleventyConfig.addLayoutAlias("feed", "feed.njk")

	// Static Files
	eleventyConfig.addPassthroughCopy("css")
	eleventyConfig.addPassthroughCopy("fonts")
	eleventyConfig.addPassthroughCopy("images/*")
	eleventyConfig.addPassthroughCopy("images/animated")
	eleventyConfig.addPassthroughCopy("static")
	eleventyConfig.addPassthroughCopy("src/js")

	// Watch targets
	eleventyConfig.addWatchTarget("./src/scss/")
	eleventyConfig.addWatchTarget("./src/js/")

	// BrowserSync and Local 404
	eleventyConfig.setBrowserSyncConfig({
		callbacks: {
			ready: (err, browserSync) => {
				const content_404 = fs.readFileSync("_site/404.html")
				browserSync.addMiddleware("*", (req, res) => {
					// Provides the 404 content without redirect.
					res.write(content_404)
					res.end()
				})
			},
		},
		ui: false,
		ghostMode: false,
	})

	eleventyConfig.setDataDeepMerge(true)

	eleventyConfig.on("beforeBuild", () => {
		console.log(`[${queryFilters.getHost(site.url)}] Building…`)
	})

	return {
		dataTemplateEngine: "njk",
		htmlTemplateEngine: "njk",
		markdownTemplateEngine: "njk",
		passthroughFileCopy: true,
		dir: {
			input: "src",
			includes: "includes",
			layouts: "layouts",
			data: "data",
		},
	}
}
