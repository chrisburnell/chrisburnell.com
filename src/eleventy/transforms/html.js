import slugify from "@sindresorhus/slugify";
import { load } from "cheerio";
import striptags from "striptags";
import { isCSSNakedDay, isJSNakedDay } from "../data/global.js";

/**
 * @param {string} value
 * @param {string} outputPath
 * @returns {string}
 */
export default async function (value, outputPath) {
	if (outputPath && outputPath.endsWith(".html")) {
		const $ = load(value);

		// Remove stylesheet <link> elements with empty `href` attributes
		$(`link[rel="stylesheet"][href=""]`).each((_, element) => {
			$(element).remove();
		});

		// Remove <style> elements with no content
		$("style").each((_, element) => {
			const content = $(element).html().trim();
			if (content === "") {
				$(element).remove();
			}
		});

		// Remove <script> elements with empty `src` attributes and no content
		$("script").each((_, element) => {
			const src = $(element).attr("src");
			const content = $(element).html().trim();
			if ((!src || src === "") && content === "") {
				$(element).remove();
			}
		});

		// We have to process headings from table of contents before adding
		// the permalink to them later, or the links will include the text of
		// the permalink.
		const tocHeadings = $(".generate-toc h2:not(.no-fragment)");
		if (tocHeadings.length) {
			let tocHtml = `
				<div class=" [ toc ] " data-pagefind-ignore>
					<is-land>
						<details-utils force-close="(max-width: 850px)" force-restore>
							<details open class=" [ table-of-contents ] ">
								<summary>Table of Contents</summary>
								<nav class=" [ box ] " aria-label="Table of Contents">
									<ol>`;
			tocHeadings.each((i, element) => {
				const headingHTML = striptags(
					$(element)
						.html()
						.replace(/\s+<small>.*<\/small>$/g, "")
						.replace("&amp;", "and"),
				);
				const headingID =
					$(element).attr("id") ||
					slugify(headingHTML.replace(/([.‘’“”])/g, ""));
				tocHtml += `<li><a href="#${headingID}">${headingHTML}</a></li>`;
			});
			tocHtml += `			</ol>
								</nav>
							</details>
						</details-utils>
						<template data-island="once"><script src="/js/components/details-utils.js"></script></template>
					</is-land>
				</div>`;
			$(tocHtml).insertBefore(".content");
			$(".generate-toc").removeClass("generate-toc");
		}

		// Process and generate fragment anchors for content headings
		$(".content h2:not(.no-fragment)").each((i, element) => {
			const headingHTML = striptags(
				$(element)
					.html()
					.replace(/\s+<small>.*<\/small>$/g, "")
					.replace("&amp;", "and"),
			);
			const headingID =
				$(element).attr("id") ||
				slugify(headingHTML.replace(/([.‘’“”])/g, ""));
			const headingTitle =
				$(element).attr("title") || $(element).text().trim();
			$(element).html(`
				${$(element).html()}
				<a href="#${headingID}" class=" [ fragment-anchor ] " title="Permalink for ${headingTitle}" data-pagefind-ignore><small class="visually-hidden">Permalink </small>¶</a>
			`);
			$(element).removeAttr("title");
			$(element).attr("id", headingID);
		});

		// Skip presentational emojis
		$(".emoji").each((i, element) => {
			$(element).attr("aria-hidden", true);
		});

		// Strip .no-fragment classes
		$(".no-fragment").each((_, element) => {
			$(element).removeClass("no-fragment");
		});

		// Strip wordcount attributes
		$(".skip-wordcount").each((_, element) => {
			$(element).removeClass("skip-wordcount");
		});
		$("[data-skip-wordcount]").each((_, element) => {
			$(element).removeAttr("data-skip-wordcount");
		});

		// Strip RSS-excluding attributes
		$(".no-rss").each((_, element) => {
			$(element).removeClass("no-rss");
		});
		$("[data-no-rss]").each((_, element) => {
			$(element).removeAttr("data-no-rss");
		});

		// Remove content that is intended for RSS only
		$(".rss-only, [data-rss-only]").each((_, element) => {
			$(element).remove();
		});

		// Make sure <ul> elements are accessible even with `list-style: none`
		$("ul").each((_, element) => {
			$(element).attr("role", "list");
		});

		// Clean up languages/filenames for code blocks with empty values
		$(`pre[data-language=""]`).each((_, element) => {
			$(element).removeAttr("data-language");
		});
		$(`pre[data-language-friendly=""]`).each((_, element) => {
			$(element).removeAttr("data-language-friendly");
		});
		$(`pre[data-filename=""]`).each((_, element) => {
			$(element).removeAttr("data-filename");
		});

		// Add markup around fenced code blocks
		$(`pre[data-language]`).each((_, element) => {
			$(element).wrap(
				`<div class=" [ code-block ] " style="position: relative;"></div>`,
			);
			$(element).before(
				`<button class=" [ anchor ] [ requires-js  copy-code ] " tabindex="-1">Copy</button>`,
			);
		});

		// Make <pre> code blocks keyboard-accessible by adding `tabindex="0"`
		$("pre > code").attr("tabindex", 0);

		// Remove CSS during CSS Naked Day
		if (isCSSNakedDay) {
			$(`link[rel="stylesheet"], style:not([data-keep])`).remove();

			$("[style]:not([data-keep-styles])").removeAttr("style");
		}

		// Remove JS during JS Naked Day
		if (isJSNakedDay) {
			$("script:not([data-keep])").remove();

			$("[onload]:not([data-keep-script])").removeAttr("onload");

			$("noscript").each((i, element) => {
				$(element).replaceWith($(element).html());
			});
		}

		// Tidy up tags that should be kept for special events
		$("[data-keep]").removeAttr("data-keep");
		$("[data-keep-style]").removeAttr("data-keep-style");
		$("[data-keep-script]").removeAttr("data-keep-script");
		$("[data-skip-wordcount]").removeAttr("data-skip-wordcount");

		return $.root().html();
	}

	return value;
}
