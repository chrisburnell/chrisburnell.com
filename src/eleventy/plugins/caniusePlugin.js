const global = require("../../data/global")

const caniuse = require("caniuse-api")
const minifier = require("html-minifier")
const { DateTime } = require("luxon")

module.exports = (eleventyConfig) => {
	eleventyConfig.addNunjucksShortcode("caniuse", (feature) => {
		const support = caniuse.getSupport(feature, true)

		return minifier.minify(
			`
			<div class="box">
				<p class="strong">Desktop support:</p>
				<ul class="browser-support">
					<li class="${support.chrome.y ? "supported" : support.chrome.a ? "partial" : "unsupported"}">Chrome: ${support.chrome.y ? `${support.chrome.y}+` : support.chrome.a ? `${support.chrome.a}+` : "No"}</li>
					<li class="${support.edge.y ? "supported" : support.edge.a ? "partial" : "unsupported"}">Edge: ${support.edge.y ? `${support.edge.y}+` : support.edge.a ? `${support.edge.a}+` : "No"}</li>
					<li class="${support.firefox.y ? "supported" : support.firefox.a ? "partial" : "unsupported"}">Firefox: ${support.firefox.y ? `${support.firefox.y}+` : support.firefox.a ? `${support.firefox.a}+` : "No"}</li>
					<li class="${support.safari.y ? "supported" : support.safari.a ? "partial" : "unsupported"}">Safari: ${support.safari.y ? `${support.safari.y}+` : support.safari.a ? `${support.safari.a}+` : "No"}</li>
				</ul>
				<p class="strong">Mobile / Tablet support:</p>
				<ul class="browser-support">
					<li class="${support.android.y ? "supported" : support.android.a ? "partial" : "unsupported"}">Android Browser: ${support.android.y ? `${support.android.y}+` : support.android.a ? `${support.android.a}+` : "No"}</li>
					<li class="${support.and_chr.y ? "supported" : support.and_chr.a ? "partial" : "unsupported"}">Android Chrome: ${support.and_chr.y ? `${support.and_chr.y}+` : support.and_chr.a ? `${support.and_chr.a}+` : "No"}</li>
					<li class="${support.and_ff.y ? "supported" : support.and_ff.a ? "partial" : "unsupported"}">Android Firefox: ${support.and_ff.y ? `${support.and_ff.y}+` : support.and_ff.a ? `${support.and_ff.a}+` : "No"}</li>
					<li class="${support.ios_saf.y ? "supported" : support.ios_saf.a ? "partial" : "unsupported"}">iOS Safari: ${support.ios_saf.y ? `${support.ios_saf.y}+` : support.ios_saf.a ? `${support.ios_saf.a}+` : "No"}</li>
					<li class="${support.samsung.y ? "supported" : support.samsung.a ? "partial" : "unsupported"}">Samsung Internet: ${support.samsung.y ? `${support.samsung.y}+` : support.samsung.a ? `${support.samsung.a}+` : "No"}</li>
				</ul>
				<p class="small">Browser support data for <code>${feature}</code> comes from <a href="https://caniuse.com/#feat=${feature}">caniuse.com</a> and is up-to-date as of ${DateTime.fromJSDate(new Date(global.now)).toFormat("dd LLLL yyyy")}.</p>
			</div>
		`,
			{
				collapseWhitespace: true,
			}
		)
	})
}
