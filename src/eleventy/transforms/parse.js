const cheerio = require("cheerio")
var he = require("he")
const slugify = require("slugify")

const minify = (input) => {
	return input.replace(/\s{2,}/g, "").replace(/\'/g, '"')
}

module.exports = (value, outputPath) => {
	if (outputPath.endsWith(".html")) {
		const $ = cheerio.load(value)

		// We have to process headings from table of contents before adding
		// the permalink to them later, or the links will include the text of
		// the permalink.
		const tocHeadings = $(".generate-toc h2")
		if (tocHeadings.length) {
			let tocHtml = `<div class=" [ meta ] "><div class=" [ box ] [ table-of-contents ] "><ol class=" [ default-list ] ">`
			tocHeadings.each(function () {
				const headingText = $(this)
					.html()
					.replace(/\s+<small>.*<\/small>$/g, "")
				const headingID = $(this).attr("id") || slugify(headingText.toLowerCase())
				tocHtml += `<li><a href="#${headingID}">${headingText}</a></li>`
			})
			tocHtml += `</ol></div></div>`
			$(tocHtml).insertBefore(".content__body")
		}

		const articleHeadings = $("main :is(article, .archive) .content__body h2")
		articleHeadings.each(function () {
			const headingID = $(this).attr("id") || slugify($(this).text().toLowerCase())
			$(this).html(
				minify(`
				${$(this).html()}
				<a class=" [ fragment-anchor ] " href="#${headingID}" title="Permalink for ${$(this).text().trim()}">
					<span class="hidden"> permalink</span>
					<svg fill="currentColor" aria-hidden="true" focusable="false" width="1em" height="1em">
						<use href="/images/sprites.svg#svg--link"></use>
					</svg>
				</a>
			`)
			)
			$(this).attr("id", headingID)
		})

		return $.root().html()
	}
	return value
}
