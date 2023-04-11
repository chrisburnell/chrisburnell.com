const pkg = require("../../../package.json")

const { AssetCache } = require("@11ty/eleventy-fetch")
const browserData = require("@mdn/browser-compat-data")
const { DateTime } = require("luxon")
const caniuse = require("caniuse-api")
const minifier = require("html-minifier")

const { now } = require("#datajs/global")
const { cacheDurations } = require("#data/site")

const browserFeatures = require("#data/browserFeatures")
const browsersByType = require("#data/browsersByType")
const duration = cacheDurations.daily

const getCaniuseSupport = async (feature) => {
	let asset = new AssetCache(`caniuse_${feature}`, ".cache")
	asset.ensureDir()

	if (asset.isCacheValid(duration)) {
		return await asset.getCachedValue()
	}

	const caniuseSupport = caniuse.getSupport(feature, true)
	await asset.save(caniuseSupport, "json")
	return caniuseSupport
}

const getBrowserslistSupport = async (feature) => {
	const featureData = browserFeatures.filter((lookup) => feature === lookup.id)[0]
	const featureSet = browserData[featureData.language][featureData.type]
	const browserslistData = featureData['key'].split(".").reduce((object, key) => {
		return object[key]
	}, featureSet)
	return browserslistData["__compat"]["support"]
}

module.exports = (eleventyConfig) => {
	eleventyConfig.addNunjucksAsyncShortcode("caniuse", async (featureID) => {
		const caniuseSupport = await getCaniuseSupport(featureID)
			.then((caniuseSupport) => caniuseSupport)
			.catch(() => false)

		if (caniuseSupport) {
			// We'll rewrite these as we go
			let fullSupport = true
			let zeroSupport = true

			const browserList = ["Desktop", "Mobile"].reduce((output, type) => {
				return (output += `
					<p class="strong">${type} support:</p>
					<ul class=" [ browser-support ] ">
						${browsersByType.reduce((output, browser) => {
							if (browser.type === type) {
								const support = caniuseSupport[browser.id]
								const featureClass = support.y ? "supported" : support.a ? "partial" : "unsupported"
								const featureText = support.y ? support.y : support.a ? support.a : "No"
								fullSupport = !fullSupport ? false : support.y ? true : false
								zeroSupport = !zeroSupport ? false : support.y || support.a ? false : true
								return output + `<li class=" [ ${featureClass} ] ">${browser.name}: ${featureText}</li>`
							}
							return output
						}, "")}
					</ul>
				`)
			}, "")

			return minifier.minify(
				`<div class=" [ support ] [ box ${fullSupport ? " box--success " : zeroSupport ? " box--error " : ""}] [ flow ] ">
					${browserList}
					<p class="small">Browser support data for <code>${featureID}</code> comes from <a href="https://caniuse.com/#feat=${featureID}" rel="external nofollow">caniuse.com</a> and is up-to-date as of <time datetime="${DateTime.fromJSDate(new Date(now)).toFormat("yyyy-MM-dd")}">${DateTime.fromJSDate(new Date(now)).toFormat("dd LLLL yyyy")}</time>.</p>
				</div>`,
				{ collapseWhitespace: true }
			)
		}

		const browserslistSupport = await getBrowserslistSupport(featureID)
			.then((browserslistSupport) => browserslistSupport)
			.catch(() => false)

		if (browserslistSupport) {
			// We'll rewrite these as we go
			let fullSupport = true
			let zeroSupport = true

			const browserList = ["Desktop", "Mobile"].reduce((output, type) => {
				return (output += `
					<p class="strong">${type} support:</p>
					<ul class=" [ browser-support ] ">
						${browsersByType.reduce((output, browser) => {
							if (browser.type === type) {
								const support = Array.isArray(browserslistSupport[browser.key]) ? browserslistSupport[browser.key][0] : browserslistSupport[browser.key]
								const featureClass = (support.version_added && support.flags) || (support?.version_added + "").match(/preview/) ? "partial" : support.version_added ? "supported" : "unsupported"
								const featureText = support.version_added ? support.version_added.replace("≤", "").replace("preview", "Preview") : "No"
								fullSupport = !fullSupport ? false : support.version_added ? true : false
								zeroSupport = !zeroSupport ? false : support.version_added ? false : true
								return output + `<li class=" [ ${featureClass} ] ">${browser.name}: ${featureText}</li>`
							}
							return output
						}, "")}
					</ul>
				`)
			}, "")

			return minifier.minify(
				`<div class=" [ support ] [ box ${fullSupport ? " box--success " : zeroSupport ? " box--error " : ""}] [ flow ] ">
					${browserList}
					<p class="small">Browser support data for <code>${featureID}</code> comes from <a href="https://github.com/mdn/browser-compat-data">MDN’s <code>browser-compat-data</code></a> and is up-to-date as of <a href="https://www.npmjs.com/package/@mdn/browser-compat-data" rel="external nofollow">version ${pkg.dependencies['@mdn/browser-compat-data'].replace("^", "")}</a>.</p>
				</div>`,
				{ collapseWhitespace: true }
			)
		}

		return `<div class=" [ box  box--warning ] [ flow ] "><p class="italic">Because this is still an experimental feature, <a href="https://caniuse.com/">caniuse.com</a> data is currently unavailable from API.</p></div>`
	})

	eleventyConfig.addNunjucksAsyncShortcode("caniuse_table_row", async (feature) => {
		const caniuseSupport = await getCaniuseSupport(feature.id)
			.then((caniuseSupport) => caniuseSupport)
			.catch(() => false)

		if (caniuseSupport) {
			// We'll rewrite these as we go
			let fullSupport = true
			let zeroSupport = true

			const browserList = browsersByType.reduce((output, browser) => {
				const support = caniuseSupport[browser.id]
				const featureClass = support.y ? "supported" : support.a ? "partial" : "unsupported"
				const featureText = support.y ? support.y : support.a ? support.a : "<strong>No</strong>"
				fullSupport = !fullSupport ? false : support.y ? true : false
				zeroSupport = !zeroSupport ? false : support.y || support.a ? false : true
				return output + `<td class=" [ center ] [ ${featureClass} ] ">${featureText}</td>`
			}, "")

			return minifier.minify(
				`<tr>
					<th><a href="#${feature.id}">${feature.title}</a></th>
					${browserList}
				</tr>`,
				{ collapseWhitespace: true }
			)
		}

		const browserslistSupport = await getBrowserslistSupport(feature.id)
			.then((browserslistSupport) => browserslistSupport)
			.catch(() => false)

		if (browserslistSupport) {
			// We'll rewrite these as we go
			let fullSupport = true
			let zeroSupport = true

			const browserList = browsersByType.reduce((output, browser) => {
				const support = Array.isArray(browserslistSupport[browser.key]) ? browserslistSupport[browser.key][0] : browserslistSupport[browser.key]
				const featureClass = (support.version_added && support.flags) || (support?.version_added + "").match(/preview/) ? "partial" : support.version_added ? "supported" : "unsupported"
				const featureText = support.version_added ? support.version_added.replace("≤", "").replace("preview", "<abbr title=\"Preview\" style=\"color: inherit\">P</abbr>") : "No"
				fullSupport = !fullSupport ? false : support.version_added ? true : false
				zeroSupport = !zeroSupport ? false : support.version_added ? false : true
				return output + `<td class=" [ center ] [ ${featureClass} ] ">${featureText}</td>`
			}, "")

			return minifier.minify(
				`<tr>
					<th><a href="#${feature.id}">${feature.title}</a></th>
					${browserList}
				</tr>`,
				{ collapseWhitespace: true }
			)
		}

		return ""
	})
}
