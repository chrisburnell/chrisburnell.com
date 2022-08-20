const cheerio = require("cheerio")
const slugify = require("slugify")

const minify = (input) => {
	return input.replace(/\s{2,}/g, "").replace(/\'/g, '"')
}

module.exports = (value, outputPath) => {
	if (outputPath && outputPath.endsWith(".html")) {
		const $ = cheerio.load(value)

		// We have to process headings from table of contents before adding
		// the permalink to them later, or the links will include the text of
		// the permalink.
		const tocHeadings = $(".generate-toc h2")
		if (tocHeadings.length) {
			let tocHtml = `<div class=" [ meta ] [ flow ] "><div class=" [ box ] [ flow ] [ table-of-contents ] "><ol class=" [ default-list ] ">`
			tocHeadings.each(function () {
				const headingText = $(this)
					.html()
					.replace(/\s+<small>.*<\/small>$/g, "")
				const headingID = $(this).attr("id") || slugify(headingText.toLowerCase())
				tocHtml += `<li><a href="#${headingID}">${headingText}</a></li>`
			})
			tocHtml += `</ol></div></div>`
			$(tocHtml).insertBefore(".content")
		}

		// Process and generate fragment anchors for content headings
		const articleHeadings = $(".content h2")
		articleHeadings.each(function () {
			const headingID =
				$(this).attr("id") ||
				slugify(
					$(this)
						.text()
						.toLowerCase()
						.replace(/([.‘’“”])/g, "")
				)
			$(this).html(
				minify(`
				${$(this).html()}
				<a class=" [ fragment-anchor ] " href="#${headingID}" title="Permalink for ${$(this).text().trim()}">
					<span class="hidden"> permalink</span>
					¶
				</a>
			`)
			)
			$(this).attr("id", headingID)
		})

		// Make <pre> code blocks keyboard-accessible by adding `tabindex="0"`
		const preformatted = $("pre > code")
		preformatted.each(function () {
			$(this).attr("tabindex", 0)
		})

		// Look for Custom HTML elements on the page, conditionally adding a
		// scripts to the page when found
		const scriptMap = [
			{
				comment: "<details-utils> extends functionality of the details element",
				selector: "details",
				file: "details-utils.js",
				wrap: "details-utils",
			},
			{
				comment: "Allows different sorting options for shelf components",
				selector: "button[data-sort]",
				module: "librarian.js",
				function: "librarian",
			},
			{
				comment: "<spark-line> generates a sparkline chart",
				selector: "spark-line",
				module: "spark-line.js",
				function: "sparkline",
			},
			{
				comment: "Tidies the input of a URL input",
				selector: "input[type=url]",
				module: "url-input.js",
				feature: "urlInput",
			},
			{
				comment: "CodePen Embeds",
				selector: "pre.codepen",
				url: "https://codepen.io/assets/embed/ei.js",
			},
			{
				comment: "Speaker Deck Embeds",
				selector: ".speakerdeck-embed",
				url: "https://speakerdeck.com/assets/embed.js",
			},
		]
		for (let script of scriptMap) {
			if ($(script.selector).length) {
				$(`<!-- ${script.comment} -->\n`).appendTo("body")
				if (script.module) {
					$(
						minify(`
							<script defer type="module">
								import ${script.feature} from "/js/${script.module}";
								${script.feature}();
							</script>
						`) + "\n"
					).appendTo("body")
				} else if (script.file) {
					$(`<script defer src="/js/${script.file}"></script>\n`).appendTo("body")
				} else if (script.url) {
					$(`<script defer src="${script.url}"></script>\n`).appendTo("body")
				}
				if (script.wrap) {
					$(script.selector).each(function (i, element) {
						$(element).wrap(`<${script.wrap}></${script.wrap}>`)
					})
				}
			}
		}

		return $.root().html()
	}
	return value
}
