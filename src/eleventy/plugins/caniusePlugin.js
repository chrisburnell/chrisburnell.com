const { AssetCache } = require("@11ty/eleventy-fetch")
const { DateTime } = require("luxon")
const caniuse = require("caniuse-api")
const minifier = require("html-minifier")

const global = require("../../data/global")
const site = require("../../data/site")

const browsersByType = require("../../data/browsersByType")
const duration = site.cacheDuration

const getLatestStableBrowsers = async () => {
	let asset = new AssetCache(`caniuse_latest_browsers`, ".cache")
	asset.ensureDir()

	if (asset.isCacheValid(duration)) {
		return await asset.getCachedValue()
	}

	const browsers = caniuse.getLatestStableBrowsers()
	await asset.save(browsers, "json")
	return browsers
}

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
	eleventyConfig.addNunjucksAsyncShortcode("caniuse", async (featureID) => {
		const latestStableBrowsers = await getLatestStableBrowsers()
			.then((latestStableBrowsers) => latestStableBrowsers)
			.catch(() => false)

		const support = await getFeatureSupport(featureID)
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
							const featureText = support[id].y ? `${support[id].y}` : support[id].a ? `${support[id].a}` : "No"
							fullSupport = !fullSupport ? false : support[id].y ? true : false
							zeroSupport = !zeroSupport ? false : support[id].y || support[id].a ? false : true
							return `
								${inside}
								<li class="${featureClass}">${name}: ${featureText}</li>`
						}, "")}
					</ul>`
			}, "")

			return minifier.minify(
				`<div class=" [ box ${fullSupport ? " box--success " : zeroSupport ? " box--error " : ""}] [ flow ] ">
					${browserList}
					<p class="small">Browser support data for <code>${featureID}</code> comes from <a href="https://caniuse.com/#feat=${featureID}">caniuse.com</a> and is up-to-date as of <time datetime="${DateTime.fromJSDate(new Date(global.now)).toFormat("yyyy-MM-dd")}">${DateTime.fromJSDate(new Date(global.now)).toFormat("dd LLLL yyyy")}</time>.</p>
				</div>`,
				{ collapseWhitespace: true }
			)
		}

		return `<div class=" [ box  box--warning ] [ flow ] "><p class="italic">Because this is still an experimental feature, <a href="https://caniuse.com/">caniuse.com</a> data is currently unavailable from API.</p></div>`
	})
}
