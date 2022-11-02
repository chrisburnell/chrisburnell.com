require("dotenv").config()
const pkg = require("./package.json")
const site = require("#data/site")
const configWebmentions = require("./src/data/config/webmentions.js")

// Import Eleventy plugins
const caniusePlugin = require("#plugins/caniusePlugin")
const pregenImagePlugin = require("#plugins/pregenImagePlugin")
const imagePlugin = require("#plugins/imagePlugin")
const imageAvatarPlugin = require("#plugins/imageAvatarPlugin")
// const albumCoverPlugin = require("#plugins/albumCoverPlugin")
// const inclusiveLanguagePlugin = require("@11ty/eleventy-plugin-inclusive-language")
const directoryOutputPlugin = require("@11ty/eleventy-plugin-directory-output")
const syntaxHighlightPlugin = require("@11ty/eleventy-plugin-syntaxhighlight")
const webCPlugin = require("@11ty/eleventy-plugin-webc")
const { EleventyRenderPlugin } = require("@11ty/eleventy")
const webmentionsPlugin = require("@chrisburnell/eleventy-cache-webmentions")

// Import transforms
const parseTransform = require("#transforms/parse")

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
const markdownParser = require("markdown-it")
const markdownAbbr = require("markdown-it-abbr")

module.exports = (eleventyConfig) => {
	// Plugins
	eleventyConfig.addPlugin(EleventyRenderPlugin)
	eleventyConfig.addPlugin(caniusePlugin)
	eleventyConfig.addPlugin(pregenImagePlugin)
	eleventyConfig.addPlugin(imagePlugin)
	eleventyConfig.addPlugin(imageAvatarPlugin)
	eleventyConfig.addPlugin(syntaxHighlightPlugin)
	eleventyConfig.addPlugin(webmentionsPlugin, configWebmentions)
	eleventyConfig.addPlugin(webCPlugin, {
		components: "./src/webc/**/*.webc",
		useTransform: true,
		transformData: {
			pkg
		}
	})
	// eleventyConfig.addPlugin(inclusiveLanguagePlugin, {
	// 	// accepts an array or a comma-delimited string
	// 	words: "simply,obviously,basically,of course,clearly,just,everyone knows,easy"
	// })
	// eleventyConfig.addPlugin(albumCoverPlugin)

	if (process.env.ELEVENTY_PRODUCTION) {
		eleventyConfig.addPlugin(directoryOutputPlugin)
	}

	// Ignores
	eleventyConfig.ignores.add("./src/webc/**/*.webc")

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
	eleventyConfig
		.addPassthroughCopy("audio")
		.addPassthroughCopy("css")
		.addPassthroughCopy("fonts")
		.addPassthroughCopy("images/*")
		.addPassthroughCopy("images/animated")
		.addPassthroughCopy("js")
		.addPassthroughCopy("src/js/pages")
		.addPassthroughCopy("src/js/vendor")
		.addPassthroughCopy("video")
		.addPassthroughCopy({ "files/**/*": "." })

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
		})
			.use(markdownAbbr)
			.disable("code")
	)

	// Build Settings
	eleventyConfig.setDataDeepMerge(true)
	eleventyConfig.setServerPassthroughCopyBehavior("copy")
	eleventyConfig.setQuietMode(true)
	eleventyConfig.on("beforeBuild", () => {
		console.log(`[${queryFilters.getHost(site.url)}] Building…`)
	})
	return {
		dataTemplateEngine: "njk",
		htmlTemplateEngine: false,
		markdownTemplateEngine: "njk",
		dir: {
			input: "src",
			includes: "eleventy/includes",
			layouts: "eleventy/layouts",
			data: "data",
		},
	}
}
