import { url as siteURL } from "./src/data/site.js"

import filters from "./src/eleventy/filters.js"

import plugins from "./src/eleventy/plugins.js"

import markdownParser from "markdown-it"
import markdownAbbr from "markdown-it-abbr"
import markdownFootnote from "markdown-it-footnote"

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
	eleventyConfig.addPlugin(plugins.bundler, {
		// transforms: [
		// 	async function (code) {
		// 		// if (this.type === 'css') {
		// 		// 	let result = await postcss([
		// 		// 		autoprefixer,
		// 		// 		cleanCSS
		// 		// 	]).process(code, {
		// 		// 		from: this.page.inputPath,
		// 		// 		to: null
		// 		// 	}).catch(error => {
		// 		// 		if (error.name === 'CssSyntaxError') {
		// 		// 			process.stderr.write(error.message + error.showSourceCode())
		// 		// 		} else {
		// 		// 			throw error
		// 		// 		}
		// 		// 	})
		// 		// 	return result.css
		// 		// }
		// 		if (this.type === 'js') {
		// 			let minified = UglifyJS.minify(code)
		// 			if (minified.error) {
		// 				console.log(`UglifyJS error: `, minified.error)
		// 				return code
		// 			}
		// 			return minified.code
		// 		}
		// 		return code
		// 	}
		// ]
	})
	eleventyConfig.addPlugin(plugins.syntaxHighlight)
	eleventyConfig.addPlugin(plugins.image)

	///
	// Filters
	///
	Object.keys(filters).forEach((filterType) => {
		Object.keys(filters[filterType]).forEach((filterName) => {
			eleventyConfig.addFilter(filterName, filters[filterType][filterName])
		})
	})

	///
	// Markdown Configuration
	///
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
