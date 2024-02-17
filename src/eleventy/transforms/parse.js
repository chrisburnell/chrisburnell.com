import slugify from "@sindresorhus/slugify"
import { load } from "cheerio"
import striptags from "striptags"

export default async function (value, outputPath) {
	if (outputPath && outputPath.endsWith(".html")) {
		const $ = load(value)

		// We have to process headings from table of contents before adding
		// the permalink to them later, or the links will include the text of
		// the permalink.
		const tocHeadings = $(".generate-toc h2:not(.no-fragment)")
		if (tocHeadings.length) {
			let tocHtml = `
				<aside class=" [ meta ] " role="complementary" data-pagefind-ignore>
					<is-land class=" [ table-of-contents ] " on:idle on:visible>
						<details-utils force-close="(max-width: 850px)" force-restore>
							<details open>
								<summary>Table of Contents</summary>
								<nav class=" [ box ] " aria-label="Table of Contents">
									<ol>`
			tocHeadings.each((i, element) => {
				const headingHTML = striptags(
					$(element)
						.html()
						.replace(/\s+<small>.*<\/small>$/g, ""),
				)
				const headingID = $(element).attr("id") || slugify(headingHTML.replace(/([.‘’“”])/g, ""))
				tocHtml += `<li><a href="#${headingID}">${headingHTML}</a></li>`
			})
			tocHtml += `			</ol>
								</nav>
							</details>
						</details-utils>
						<template data-island="once"><script src="/js/components/details-utils.js"></script></template>
					</is-land>
				</aside>`
			$(tocHtml).insertBefore(".content")
			$(".generate-toc").removeClass("generate-toc")
		}

		// Process and generate fragment anchors for content headings
		const articleHeadings = $(".content h2:not(.no-fragment)")
		articleHeadings.each((i, element) => {
			const headingID =
				$(element).attr("id") ||
				slugify(
					$(element)
						.text()
						.replace(/([.‘’“”])/g, ""),
				)
			$(element).html(`
				${$(element).html()}
				<a class=" [ fragment-anchor ] " href="#${headingID}" title="Permalink for ${$(element).text().trim()}"><span class="visually-hidden">Permalink </span>¶</a>
			`)
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

		return $.root().html()
	}

	return value
}
