import dotenv from "dotenv"
dotenv.config()

import builders from "./src/eleventy/builders.js"
import collections from "./src/eleventy/collections.js"
import config from "./src/eleventy/config.js"
import { url as siteURL } from "./src/eleventy/data/site.js"
import { filtersSync } from "./src/eleventy/filters.js"
import plugins from "./src/eleventy/plugins.js"
import shortcodes from "./src/eleventy/shortcodes.js"
import transforms from "./src/eleventy/transforms.js"

export default async function(eleventyConfig) {
	///
	// Layouts
	///
	eleventyConfig.addLayoutAlias("base", "base.njk")
	eleventyConfig.addLayoutAlias("page", "page.njk")
	eleventyConfig.addLayoutAlias("archive", "archive.njk")
	eleventyConfig.addLayoutAlias("httpstatus", "httpstatus.njk")
	eleventyConfig.addLayoutAlias("post", "post.njk")
	eleventyConfig.addLayoutAlias("feed", "feed.njk")

	///
	// Collections
	///
	Object.keys(collections).forEach((collectionName) => {
		eleventyConfig.addCollection(collectionName, collections[collectionName])
	})

	///
	// Collection Builders
	///
	eleventyConfig.addCollection("categories", builders.categories)
	eleventyConfig.addCollection("tags", builders.tags)

	///
	// Shortcodes
	///
	Object.keys(shortcodes).forEach((shortcodeName) => {
		eleventyConfig.addShortcode(shortcodeName, shortcodes[shortcodeName])
	})

	///
	// Plugins
	///
	eleventyConfig.addPlugin(plugins.avatar)
	eleventyConfig.addPlugin(plugins.browserSupport)
	eleventyConfig.addPlugin(plugins.EleventyRenderPlugin)
	eleventyConfig.addPlugin(plugins.bundler, config.bundler)
	eleventyConfig.addPlugin(plugins.image)
	eleventyConfig.addPlugin(plugins.javascript)
	eleventyConfig.addPlugin(plugins.markdown)
	eleventyConfig.addPlugin(plugins.ogImage, config.ogImage)
	eleventyConfig.addPlugin(plugins.rss)
	eleventyConfig.addPlugin(plugins.sass)
	eleventyConfig.addPlugin(plugins.syntaxHighlight)
	eleventyConfig.addPlugin(plugins.webc, config.webc)
	eleventyConfig.addPlugin(plugins.webmentions, config.webmentions)
	// if (process.env.ELEVENTY_RUN_MODE === "build") {
	// 	eleventyConfig.addPlugin(plugins.eleventyImageTransformPlugin, {
	// 		// which file extensions to process
	// 		extensions: "html",
	// 		// optional, output image formats
	// 		formats: ["avif", "webp", "auto"],
	// 		// optional, output image widths
	// 		// widths: ["auto"],

	// 		// optional, attributes assigned on <img> override these values.
	// 		defaultAttributes: {
	// 			loading: "lazy",
	// 			decoding: "async"
	// 		}
	// 	})
	// }
	if (process.env.DIRECTORY_OUTPUT) {
		eleventyConfig.addPlugin(plugins.directoryOutput, config.directoryOutput)
	}
	if (process.env.PREGENERATE_IMAGES) {
		eleventyConfig.addPlugin(plugins.pregenerateImages)
	}

	///
	// Filters
	///
	Object.keys(filtersSync).forEach((filterType) => {
		Object.keys(filtersSync[filterType]).forEach((filterName) => {
			eleventyConfig.addFilter(filterName, filtersSync[filterType][filterName])
		})
	})
	// Object.keys(filtersAsync).forEach((filterType) => {
	// 	Object.keys(filtersAsync[filterType]).forEach((filterName) => {
	// 		eleventyConfig.addAsyncFilter(filterName, filtersAsync[filterType][filterName])
	// 	})
	// })

	///
	// Transforms
	///
	eleventyConfig.addTransform("parse", transforms.parse)

	///
	// Static Files Passthrough
	///
	eleventyConfig.addPassthroughCopy("audio")
	eleventyConfig.addPassthroughCopy("css")
	eleventyConfig.addPassthroughCopy("fonts")
	eleventyConfig.addPassthroughCopy("images")
	eleventyConfig.addPassthroughCopy("static")
	eleventyConfig.addPassthroughCopy("video")
	eleventyConfig.addPassthroughCopy({
		"files": ".",
		"src/js/components": "js/components/",
		"node_modules/@chrisburnell/spark-line/spark-line.{css,js}": "js/components/",
		"node_modules/@zachleat/details-utils/details-utils.{css,js}": "js/components/",
	})

	///
	// Build Settings
	///
	eleventyConfig.setDataDeepMerge(true)
	eleventyConfig.setServerPassthroughCopyBehavior("passthrough")
	eleventyConfig.setQuietMode(true)
	eleventyConfig.on("beforeBuild", () => {
		console.log(`[${filtersSync.urls.getHost(siteURL)}] Generating...`)
	})
	return {
		htmlTemplateEngine: false,
		markdownTemplateEngine: "njk",
		dir: {
			input: "src",
			output: "_site",
			data: "eleventy/data",
			includes: "eleventy/includes",
			layouts: "eleventy/layouts",
		}
	}
}
