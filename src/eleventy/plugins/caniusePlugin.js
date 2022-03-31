const global = require("../../data/global")

const { AssetCache } = require("@11ty/eleventy-fetch")

const caniuse = require("caniuse-api")
const minifier = require("html-minifier")
const { DateTime } = require("luxon")

const duration = "23h"

const getFeatureSupport = async (feature) => {
	let asset = new AssetCache(`caniuse_${feature}`, ".cache")
	asset.ensureDir()

	if (asset.isCacheValid(duration)) {
		return await asset.getCachedValue()
	}

	const support = caniuse.getSupport(feature, true)
	await asset.save(support, "json")
	return support
}

module.exports = (eleventyConfig) => {
	eleventyConfig.addNunjucksAsyncShortcode("caniuse", async (featureName) => {
		const browsersByType = {
			Desktop: {
				Chrome: "chrome",
				Edge: "edge",
				Firefox: "firefox",
				Safari: "safari",
			},
			"Mobile / Tablet": {
				"Android Browser": "android",
				"Chrome (Android)": "and_chr",
				"Firefox (Android)": "and_ff",
				"Safari (iOS)": "ios_saf",
				"Samsung Internet": "samsung",
			},
		}

		const support = await getFeatureSupport(featureName)
			.then((support) => support)
			.catch(() => false)

		if (support) {
			// We'll rewrite these as we go
			let fullSupport = true
			let zeroSupport = true

			const browserList = Object.keys(browsersByType).reduce((outside, type) => {
				const browsers = browsersByType[type]
				return `
					${outside}
					<p class="strong">${type} support:</p>
					<ul class="browser-support">
						${Object.keys(browsers).reduce((inside, name) => {
							const id = browsers[name]
							const featureClass = support[id].y ? "supported" : support[id].a ? "partial" : "unsupported"
							const featureText = support[id].y ? `${support[id].y}+` : support[id].a ? `${support[id].a}+` : "No"
							fullSupport = !fullSupport ? false : support[id].y ? true : false
							zeroSupport = !zeroSupport ? false : support[id].y || support[id].a ? false : true
							return `
								${inside}
								<li class="${featureClass}">${name}: ${featureText}</li>`
						}, "")}
					</ul>`
			}, "")

			return minifier.minify(
				`<div class=" [ box ${fullSupport ? " box--success " : zeroSupport ? " box--error " : ""}] ">
					${browserList}
					<p class="small">Browser support data for <code>${featureName}</code> comes from <a href="https://caniuse.com/#feat=${featureName}">caniuse.com</a> and is up-to-date as of <time datetime="${DateTime.fromJSDate(new Date(global.now)).toFormat("yyyy-MM-dd")}">${DateTime.fromJSDate(new Date(global.now)).toFormat("dd LLLL yyyy")}</time>.</p>
				</div>`,
				{ collapseWhitespace: true }
			)
		}

		return `<div class=" [ box  box--warning ] "><p class="italic">Because this is still an experimental feature, <a href="https://caniuse.com/">caniuse.com</a> data is currently unavailable from API.</p></div>`
	})
}
