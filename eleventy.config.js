require("dotenv").config()
const pkg = require("./package.json")
const { url } = require("#data/site")

// Import Eleventy plugins
const caniusePlugin = require("#plugins/caniusePlugin")
const imageAvatarPlugin = require("#plugins/imageAvatarPlugin")
const imagePlugin = require("#plugins/imagePlugin")
const pregenImagePlugin = require("#plugins/pregenImagePlugin")
// const albumCoverPlugin = require("#plugins/albumCoverPlugin")
// const inclusiveLanguagePlugin = require("@11ty/eleventy-plugin-inclusive-language")
const bundlerPlugin = require("@11ty/eleventy-plugin-bundle")
const directoryOutputPlugin = require("@11ty/eleventy-plugin-directory-output")
const rssPlugin = require("@11ty/eleventy-plugin-rss")
const syntaxHighlightPlugin = require("@11ty/eleventy-plugin-syntaxhighlight")
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
const intlFilters = require("#filters/intl")
const NewBase60 = require("#filters/NewBase60")

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
const markdownFootnote = require("markdown-it-footnote")

module.exports = (eleventyConfig) => {
	// Plugins
	eleventyConfig.addPlugin(caniusePlugin)
	eleventyConfig.addPlugin(imageAvatarPlugin)
	eleventyConfig.addPlugin(imagePlugin)
	if (process.env.PREGENERATE_IMAGES) {
		eleventyConfig.addPlugin(pregenImagePlugin)
	}
	eleventyConfig.addPlugin(bundlerPlugin)
	if (process.env.DIRECTORY_OUTPUT) {
		eleventyConfig.addPlugin(directoryOutputPlugin)
	}
	eleventyConfig.addPlugin(rssPlugin)
	eleventyConfig.addPlugin(syntaxHighlightPlugin)
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
	Object.keys(intlFilters).forEach((filterName) => {
		eleventyConfig.addFilter(filterName, intlFilters[filterName])
	})
	Object.keys(collectionFilters).forEach((filterName) => {
		eleventyConfig.addFilter(filterName, collectionFilters[filterName])
	})
	Object.keys(asyncFilters).forEach((filterName) => {
		eleventyConfig.addAsyncFilter(filterName, asyncFilters[filterName])
	})
	eleventyConfig.addFilter("NewBase60", NewBase60)

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
	eleventyConfig.addLayoutAlias("wrapper", "wrapper.njk")
	eleventyConfig.addLayoutAlias("base", "base.njk")
	eleventyConfig.addLayoutAlias("page", "page.njk")
	eleventyConfig.addLayoutAlias("archive", "archive.njk")
	eleventyConfig.addLayoutAlias("post", "post.njk")
	eleventyConfig.addLayoutAlias("portal", "portal.njk")
	eleventyConfig.addLayoutAlias("feed", "feed.njk")

	// Static Files Passthrough
	eleventyConfig.addPassthroughCopy("audio")
	eleventyConfig.addPassthroughCopy("css")
	eleventyConfig.addPassthroughCopy("fonts")
	eleventyConfig.addPassthroughCopy("images/*")
	eleventyConfig.addPassthroughCopy("images/animated")
	eleventyConfig.addPassthroughCopy("js")
	eleventyConfig.addPassthroughCopy("static")
	eleventyConfig.addPassthroughCopy("video")
	eleventyConfig.addPassthroughCopy({
		"files/*": ".",
		"src/js/components/*": "js/components/",
		"node_modules/speedlify-score/speedlify-score.js": "js/components/speedlify-score.js",
		"node_modules/@zachleat/details-utils/details-utils.js": "js/components/details-utils.js",
		"node_modules/lite-youtube-embed/src/lite-yt-embed.{css,js}": "css/components/",
		"node_modules/@chrisburnell/spark-line/spark-line.{css,js}": "js/components/",
		"node_modules/@zachleat/seven-minute-tabs/seven-minute-tabs.{css,js}": "js/components/",
	})

	// Watch targets
	eleventyConfig.addWatchTarget("./src/css/")
	eleventyConfig.addWatchTarget("./src/js/")

	// Customised markdown config
	const md = markdownParser({
			html: true,
			breaks: true,
			linkify: true,
		})
			.use(markdownAbbr)
			.use(markdownFootnote)
			.disable("code")
	md.renderer.rules.footnote_block_open = () => {
		return `<hr>
		<nav aria-label="Footnotes">
			<ol>`
	}
	md.renderer.rules.footnote_block_close = () => {
		return `</ol>
		</nav>`
	}
	md.renderer.rules.render_footnote_caption = (tokens, idx) => {
		let n = Number(tokens[idx].meta.id + 1).toString()

		if (tokens[idx].meta.subId > 0) {
			n += ':' + tokens[idx].meta.subId
		}

		return `${n}`
	}
	md.renderer.rules.render_footnote_open = (tokens, idx, options, env, slf) => {
		var id = slf.rules.footnote_anchor_name(tokens, idx, options, env, slf)

		if (tokens[idx].meta.subId > 0) {
			id += ':' + tokens[idx].meta.subId
		}

		return `<li id="fn${id}">`
	}
	eleventyConfig.setLibrary("md", md)

	// Build Settings
	eleventyConfig.setDataDeepMerge(true)
	eleventyConfig.setServerPassthroughCopyBehavior("passthrough")
	eleventyConfig.setQuietMode(true)
	eleventyConfig.on("beforeBuild", () => {
		console.log(`[${queryFilters.getHost(url)}] Building…`)
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
