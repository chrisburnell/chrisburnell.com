import { url as siteURL } from "./src/data/site.js"

import filters from "./src/eleventy/filters.js"

import plugins from "./src/eleventy/plugins.js"

export default async function(eleventyConfig) {
	///
	// Layouts
	///
	eleventyConfig.addLayoutAlias("base", "base.njk")
	eleventyConfig.addLayoutAlias("page", "page.njk")
	eleventyConfig.addLayoutAlias("post", "post.njk")

	///
	// Plugins
	///
	// eleventyConfig.addPlugin(plugins.browserSupport)
	eleventyConfig.addNunjucksShortcode("browserSupport", () => {
		return "BROWSER SUPPORT"
	})
	eleventyConfig.addPlugin(plugins.EleventyRenderPlugin)
	eleventyConfig.addPlugin(plugins.bundler)
	eleventyConfig.addPlugin(plugins.syntaxHighlight)
	eleventyConfig.addPlugin(plugins.image)
	// eleventyConfig.addPlugin(plugins.javascript)
	eleventyConfig.addPlugin(plugins.markdown)
	eleventyConfig.addPlugin(plugins.sass)

	///
	// Filters
	///
	Object.keys(filters).forEach((filterType) => {
		Object.keys(filters[filterType]).forEach((filterName) => {
			eleventyConfig.addFilter(filterName, filters[filterType][filterName])
		})
	})

	///
	// Static Files Passthrough
	///
	eleventyConfig.addPassthroughCopy("audio")
	eleventyConfig.addPassthroughCopy("fonts")
	eleventyConfig.addPassthroughCopy("images/*")
	eleventyConfig.addPassthroughCopy("images/animated")
	eleventyConfig.addPassthroughCopy("static")
	eleventyConfig.addPassthroughCopy("video")
	eleventyConfig.addPassthroughCopy({
		"files/cv.pdf": "cv.pdf",
		"files/qr.png": "qr.png",
	})

	///
	// Build Settings
	///
	eleventyConfig.setDataDeepMerge(true)
	eleventyConfig.setServerPassthroughCopyBehavior("passthrough")
	eleventyConfig.setQuietMode(true)
	eleventyConfig.on("beforeBuild", () => {
		console.log(`[${filters.urls.getHost(siteURL)}] Generating...`)
	})
	return {
		htmlTemplateEngine: false,
		markdownTemplateEngine: "njk",
		dir: {
			input: "src",
			output: "_site",
			data: "data",
			includes: "eleventy/includes",
			layouts: "eleventy/layouts",
		}
	}
}
