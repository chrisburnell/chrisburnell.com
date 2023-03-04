require("dotenv").config()
const pkg = require("./package.json")
const site = require("#data/site")

// Import Eleventy plugins
const caniusePlugin = require("#plugins/caniusePlugin")
const pregenImagePlugin = require("#plugins/pregenImagePlugin")
const imagePlugin = require("#plugins/imagePlugin")
const imageAvatarPlugin = require("#plugins/imageAvatarPlugin")
// const albumCoverPlugin = require("#plugins/albumCoverPlugin")
// const inclusiveLanguagePlugin = require("@11ty/eleventy-plugin-inclusive-language")
const directoryOutputPlugin = require("@11ty/eleventy-plugin-directory-output")
const syntaxHighlightPlugin = require("@11ty/eleventy-plugin-syntaxhighlight")
const bundlerPlugin = require("@11ty/eleventy-plugin-bundle")
const webCPlugin = require("@11ty/eleventy-plugin-webc")

// Import transforms
const parseTransform = require("#transforms/parse")

// Import filters
const dateFilters = require("#filters/dates")
const stringFilters = require("#filters/strings")
const queryFilters = require("#filters/queries")
const asyncFilters = require("#filters/async")
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
	eleventyConfig.addPlugin(caniusePlugin)
	eleventyConfig.addPlugin(imagePlugin)
	eleventyConfig.addPlugin(imageAvatarPlugin)
	eleventyConfig.addPlugin(syntaxHighlightPlugin)
	eleventyConfig.addPlugin(bundlerPlugin)
	eleventyConfig.addPlugin(webCPlugin, {
		components: "./src/webc/**/*.webc",
		useTransform: true,
		transformData: {
			pkg
		}
	})
	// eleventyConfig.addPlugin(inclusiveLanguagePlugin, {
	//   // accepts an array or a comma-delimited string
	//   words: "simply,obviously,basically,of course,clearly,just,everyone knows,easy"
	// })
	// eleventyConfig.addPlugin(albumCoverPlugin)

	if (process.env.DIRECTORY_OUTPUT) {
		eleventyConfig.addPlugin(directoryOutputPlugin)
	}
	if (process.env.PREGENERATE_IMAGES) {
		eleventyConfig.addPlugin(pregenImagePlugin)
	}

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
	Object.keys(asyncFilters).forEach((filterName) => {
		eleventyConfig.addAsyncFilter(filterName, asyncFilters[filterName])
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

	// Static Files Passthrough
	eleventyConfig.addPassthroughCopy("audio")
	eleventyConfig.addPassthroughCopy("css")
	eleventyConfig.addPassthroughCopy("fonts")
	eleventyConfig.addPassthroughCopy("images/*")
	eleventyConfig.addPassthroughCopy("images/animated")
	eleventyConfig.addPassthroughCopy("js")
	eleventyConfig.addPassthroughCopy("video")
	eleventyConfig.addPassthroughCopy({
		"files/*": ".",
		"src/js/components/*": "js/components/",
		"src/js/pages/*": "js/pages/",
		"src/js/vendor/*": "js/vendor/",
		"node_modules/@chrisburnell/spark-line/spark-line.js": "js/components/spark-line.js",
		"node_modules/@zachleat/details-utils/details-utils.js": "js/components/details-utils.js",
		"node_modules/@zachleat/seven-minute-tabs/seven-minute-tabs.js": "js/components/seven-minute-tabs.js",
		"node_modules/lite-youtube-embed/src/lite-yt-embed.css": "css/components/lite-yt-embed.css",
		"node_modules/lite-youtube-embed/src/lite-yt-embed.js": "js/components/lite-yt-embed.js",
		"node_modules/speedlify-score/speedlify-score.js": "js/components/speedlify-score.js"
	})

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