import slugify from "@sindresorhus/slugify"
import { load } from "cheerio"
import striptags from "striptags"
import { isCSSNakedDay, isJSNakedDay } from "../data/global.js"

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
					<is-land class=" [ table-of-contents ] ">
						<details-utils force-close="(max-width: 850px)" force-restore>
							<details open>
								<summary>Table of Contents</summary>
								<nav class=" [ box ] " aria-label="Table of Contents">
									<ol>`
			tocHeadings.each((i, element) => {
				const headingHTML = striptags(
					$(element)
						.html()
						.replace(/\s+<small>.*<\/small>$/g, "")
						.replace("&amp;", "and"),
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
		$(".content h2:not(.no-fragment)").each((i, element) => {
			const headingHTML = striptags(
				$(element)
					.html()
					.replace(/\s+<small>.*<\/small>$/g, "")
					.replace("&amp;", "and"),
			)
			const headingID = $(element).attr("id") || slugify(headingHTML.replace(/([.‘’“”])/g, ""))
			$(element).html(`
				${$(element).html()}
				<a href="#${headingID}" class=" [ fragment-anchor ] " title="Permalink for ${$(element).text().trim()}" data-pagefind-ignore><small class="visually-hidden">Permalink </small>¶</a>
			`)
			$(element).attr("id", headingID)
		})

		// Strip .no-fragment classes
		$(".no-fragment").removeClass("no-fragment")

		// Make sure <ul> elements are accessible even with `list-style: none`
		$("ul").attr("role", "list")

		// Make <pre> code blocks keyboard-accessible by adding `tabindex="0"`
		$("pre > code").attr("tabindex", 0)

		// Remove CSS during CSS Naked Day
		if (isCSSNakedDay) {
			$(`link[rel="stylesheet"], style:not([data-keep])`).remove()

			$("[style]:not([data-keep-styles])").removeAttr("style")
		}

		// Remove JS during JS Naked Day
		if (isJSNakedDay) {
			$("script:not([data-keep])").remove()

			$("[onload]:not([data-keep-script])").removeAttr("onload")

			$("noscript").each((i, element) => {
				$(element).replaceWith($(element).html())
			})
		}

		// Tidy up tags that should be kept for special events
		$("[data-keep]").removeAttr("data-keep")
		$("[data-keep-style]").removeAttr("data-keep-style")
		$("[data-keep-script]").removeAttr("data-keep-script")

		return $.root().html()
	}

	return value
}
