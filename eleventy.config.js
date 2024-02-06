require("dotenv").config()
const pkg = require("./package.json")
const { url: siteUrl } = require("#data/site")

// Import Eleventy plugins
const pluginAvatar = require("#plugins/avatar")
const pluginBrowserSupport = require("#plugins/browserSupport")
const pluginImage = require("#plugins/image")
const pluginPregenerateImages = require("#plugins/pregenerateImages")
// const pluginCover = require("#plugins/cover")
const pluginBundler = require("@11ty/eleventy-plugin-bundle")
const pluginDirectoryOutput = require("@11ty/eleventy-plugin-directory-output")
const pluginRSS = require("@11ty/eleventy-plugin-rss")
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight")
const pluginWebC = require("@11ty/eleventy-plugin-webc")
const pluginWebmentions = require("@chrisburnell/eleventy-cache-webmentions")
const configWebmentions = require("#datajs/config/webmentions")

// Import transforms
const transformParse = require("#transforms/parse")

// Import filters
const filterDates = require("#filters/dates")
const filterStrings = require("#filters/strings")
const filterQueries = require("#filters/queries")
const filterUtils = require("#filters/utils")
const filterIntl = require("#filters/intl")
const filterCollections = require("#filters/collections")
const filterAsync = require("#filters/async")
const filterNewBase60 = require("#filters/NewBase60")

// Import shortcodes
const shortcodes = require("#eleventy/shortcodes")

// Import collections
const collections = require("#eleventy/collections")

// Import collection builders
const builderCategories = require("#builders/categories")
const builderTags = require("#builders/tags")

// Import other bits and bobs
const markdownParser = require("markdown-it")
const markdownAbbr = require("markdown-it-abbr")
const markdownFootnote = require("markdown-it-footnote")
// const postcss = require("postcss")
// const cleanCSS = require("postcss-clean")
// const autoprefixer = require("autoprefixer")
const UglifyJS = require("uglify-js")

module.exports = (eleventyConfig) => {
	// Plugins
	eleventyConfig.addPlugin(pluginAvatar)
	eleventyConfig.addPlugin(pluginBrowserSupport)
	eleventyConfig.addPlugin(pluginImage)
	if (process.env.PREGENERATE_IMAGES) {
		eleventyConfig.addPlugin(pluginPregenerateImages)
	}
	eleventyConfig.addPlugin(pluginBundler, {
		transforms: [
			async function (code) {
				// if (this.type === 'css') {
				// 	let result = await postcss([
				// 		autoprefixer,
				// 		cleanCSS
				// 	]).process(code, {
				// 		from: this.page.inputPath,
				// 		to: null
				// 	}).catch(error => {
				// 		if (error.name === 'CssSyntaxError') {
				// 			process.stderr.write(error.message + error.showSourceCode())
				// 		} else {
				// 			throw error
				// 		}
				// 	})
				// 	return result.css
				// }
				if (this.type === "js") {
					let minified = UglifyJS.minify(code)
					if (minified.error) {
						console.log(`UglifyJS error: `, minified.error)
						return code
					}
					return minified.code
				}
				return code
			}
		]
	})
	if (process.env.DIRECTORY_OUTPUT) {
		eleventyConfig.addPlugin(pluginDirectoryOutput, {
			columns: {
				filesize: true,
				benchmark: true,
			}
		})
	}
	eleventyConfig.addPlugin(pluginRSS)
	eleventyConfig.addPlugin(pluginSyntaxHighlight)
	eleventyConfig.addPlugin(pluginWebC, {
		components: "./src/components/**/*.webc",
		useTransform: true,
		transformData: {
			pkg,
		},
	})
	eleventyConfig.addPlugin(pluginWebmentions, configWebmentions)
	// eleventyConfig.addPlugin(pluginCover)

	// Transforms
	eleventyConfig.addTransform("parse", transformParse)

	// Filters
	Object.keys(filterDates).forEach((filterName) => {
		eleventyConfig.addFilter(filterName, filterDates[filterName])
	})
	Object.keys(filterStrings).forEach((filterName) => {
		eleventyConfig.addFilter(filterName, filterStrings[filterName])
	})
	Object.keys(filterQueries).forEach((filterName) => {
		eleventyConfig.addFilter(filterName, filterQueries[filterName])
	})
	Object.keys(filterUtils).forEach((filterName) => {
		eleventyConfig.addFilter(filterName, filterUtils[filterName])
	})
	Object.keys(filterIntl).forEach((filterName) => {
		eleventyConfig.addFilter(filterName, filterIntl[filterName])
	})
	Object.keys(filterCollections).forEach((filterName) => {
		eleventyConfig.addFilter(filterName, filterCollections[filterName])
	})
	Object.keys(filterAsync).forEach((filterName) => {
		eleventyConfig.addAsyncFilter(filterName, filterAsync[filterName])
	})
	eleventyConfig.addFilter("NewBase60", filterNewBase60)

	// Shortcodes
	Object.keys(shortcodes).forEach((shortcodeName) => {
		eleventyConfig.addShortcode(shortcodeName, shortcodes[shortcodeName])
	})

	// Collections
	Object.keys(collections).forEach((collectionName) => {
		eleventyConfig.addCollection(collectionName, collections[collectionName])
	})

	// Collection Builders
	eleventyConfig.addCollection("categories", builderCategories)
	eleventyConfig.addCollection("tags", builderTags)

	// Layouts
	eleventyConfig.addLayoutAlias("base", "base.njk")
	eleventyConfig.addLayoutAlias("page", "page.njk")
	eleventyConfig.addLayoutAlias("archive", "archive.njk")
	eleventyConfig.addLayoutAlias("httpstatus", "httpstatus.njk")
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
		"node_modules/@chrisburnell/spark-line/spark-line.{css,js}": "js/components/",
		"node_modules/@zachleat/details-utils/details-utils.{css,js}": "js/components/",
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
	md.renderer.rules.footnote_caption = (tokens, idx) => {
		let n = Number(tokens[idx].meta.id + 1).toString()
		if (tokens[idx].meta.subId > 0) {
			n += ":" + tokens[idx].meta.subId
		}
		return `${n}`
	}
	md.renderer.rules.footnote_open = (tokens, idx, options, env, slf) => {
		var id = slf.rules.footnote_anchor_name(tokens, idx, options, env, slf)
		if (tokens[idx].meta.subId > 0) {
			id += ":" + tokens[idx].meta.subId
		}
		return `<li id="fn${id}">`
	}
	eleventyConfig.setLibrary("md", md)

	// Build Settings
	eleventyConfig.setDataDeepMerge(true)
	eleventyConfig.setServerPassthroughCopyBehavior("passthrough")
	eleventyConfig.setQuietMode(true)
	eleventyConfig.on("beforeBuild", () => {
		console.log(`[${filterQueries.getHost(siteUrl)}] Generating…`)
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
