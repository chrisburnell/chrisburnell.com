const cheerio = require("cheerio")
const slugify = require("slugify")
const { PurgeCSS } = require("purgecss")

const env = require("#datajs/env")

const minify = (input) => {
	return input.replace(/\s{2,}/g, "").replace(/\'/g, '"')
}

module.exports = async (value, outputPath) => {
	if (outputPath && outputPath.endsWith(".html")) {
		const $ = cheerio.load(value)

		// We have to process headings from table of contents before adding
		// the permalink to them later, or the links will include the text of
		// the permalink.
		const tocHeadings = $(".generate-toc h2")
		if (tocHeadings.length) {
			let tocHtml = `<div class=" [ meta ] [ flow ] "><div class=" [ box ] [ flow ] [ table-of-contents ] "><ol class=" [ default-list ] ">`
			tocHeadings.each((i, element) => {
				const headingText = $(element)
					.html()
					.replace(/\s+<small>.*<\/small>$/g, "")
				const headingID = $(element).attr("id") || slugify(headingText.toLowerCase())
				tocHtml += `<li><a href="#${headingID}">${headingText}</a></li>`
			})
			tocHtml += `</ol></div></div>`
			$(tocHtml).insertBefore(".content")
			$(".generate-toc").removeClass("generate-toc")
		}

		// Process and generate fragment anchors for content headings
		const articleHeadings = $(".content h2")
		articleHeadings.each((i, element) => {
			const headingID =
				$(element).attr("id") ||
				slugify(
					$(element)
						.text()
						.toLowerCase()
						.replace(/([.‘’“”])/g, "")
				)
			$(element).html(
				minify(`
				${$(element).html()}
				<a class=" [ fragment-anchor ] " href="#${headingID}" title="Permalink for ${$(element).text().trim()}">
					<span class="hidden"> permalink</span>
					¶
				</a>
			`)
			)
			$(element).attr("id", headingID)
		})

		// Make sure <ul> elements are accessible even with `list-style: none` in Safari
		const unordered = $("ul")
		unordered.each((i, element) => {
			$(element).attr("role", "list")
		})

		// Make <pre> code blocks keyboard-accessible by adding `tabindex="0"`
		const preformatted = $("pre > code")
		preformatted.each((i, element) => {
			$(element).attr("tabindex", 0)
		})

		// Run PurgeCSS against the page and inject the styles
		// if (env.ELEVENTY_PRODUCTION) {
		// 	const purged = await new PurgeCSS().purge({
		// 		content: [outputPath],
		// 		css: ["./css/main.css"]
		// 	})
		// 	const cssContents = purged[0].css
		// 	$(`<style>${cssContents}</style>`).append("head")
		// }

		return $.root().html()
	}
	return value
}
