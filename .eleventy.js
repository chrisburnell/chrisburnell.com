const site = require("#data/site")

// Import Eleventy plugins
const caniusePlugin = require("#plugins/caniusePlugin")
const pregenImagePlugin = require("#plugins/pregenImagePlugin")
const imagePlugin = require("#plugins/imagePlugin")
const imageAvatarPlugin = require("#plugins/imageAvatarPlugin")
// const albumCoverPlugin = require("#plugins/albumCoverPlugin")
const directoryOutputPlugin = require("@11ty/eleventy-plugin-directory-output")
const syntaxHighlightPlugin = require("@11ty/eleventy-plugin-syntaxhighlight")
const webmentionsPlugin = require("@chrisburnell/eleventy-cache-webmentions")

// Import transforms
const parseTransform = require("#transforms/parse")
const htmlMinTransform = require("#transforms/html-min")

// Import filters
const dateFilters = require("#filters/dates")
const stringFilters = require("#filters/strings")
const queryFilters = require("#filters/queries")
const utilityFilters = require("#filters/utils")
const collectionFilters = require("#filters/collections")
const newBase60 = require("#filters/newBase60")

// Import shortcodes
const shortcodes = require("#core/shortcodes")

// Import collections
const collections = require("#core/collections")

// Import collection builders
const categoriesBuilder = require("#builders/categories")
const tagsBuilder = require("#builders/tags")

// Import other bits and bobs
const urlReplacements = require("#data/urlReplacements")
const markdownParser = require("markdown-it")

module.exports = (eleventyConfig) => {
	if (process.env.ELEVENTY_PRODUCTION) {
		eleventyConfig.setQuietMode(true)
		eleventyConfig.addPlugin(directoryOutputPlugin)
	}

	// Eleventy Plugins
	eleventyConfig.addPlugin(caniusePlugin)
	eleventyConfig.addPlugin(pregenImagePlugin)
	eleventyConfig.addPlugin(imagePlugin)
	eleventyConfig.addPlugin(imageAvatarPlugin)
	// eleventyConfig.addPlugin(albumCoverPlugin)
	eleventyConfig.addPlugin(syntaxHighlightPlugin)
	eleventyConfig.addPlugin(webmentionsPlugin, {
		domain: site.url,
		duration: site.cacheDuration,
		urlReplacements: urlReplacements,
		maximumHtmlLength: 1000,
		maximumHtmlText: "Mentioned this:",
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

	// Collection Builders
	eleventyConfig.addCollection("categories", categoriesBuilder)
	eleventyConfig.addCollection("tags", tagsBuilder)

	// Layouts
	eleventyConfig.addLayoutAlias("base", "base.njk")
	eleventyConfig.addLayoutAlias("page", "page.njk")
	eleventyConfig.addLayoutAlias("archive", "archive.njk")
	eleventyConfig.addLayoutAlias("post", "post.njk")
	eleventyConfig.addLayoutAlias("feed", "feed.njk")

	// Static Files
	eleventyConfig.addPassthroughCopy("audio")
	eleventyConfig.addPassthroughCopy("css")
	eleventyConfig.addPassthroughCopy("fonts")
	eleventyConfig.addPassthroughCopy("images/*")
	eleventyConfig.addPassthroughCopy("images/animated")
	eleventyConfig.addPassthroughCopy("js")
	eleventyConfig.addPassthroughCopy("src/js/pages")

	// Watch targets
	eleventyConfig.addWatchTarget("./src/css/")
	eleventyConfig.addWatchTarget("./src/js/")

	// Customised markdown config
	eleventyConfig.setLibrary(
		"md",
		markdownParser({
			html: true,
			breaks: true,
			linkify: true,
		}).disable("code")
	)

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
