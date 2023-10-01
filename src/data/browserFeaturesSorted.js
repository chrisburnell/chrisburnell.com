const { AssetCache } = require("@11ty/eleventy-fetch")
const mdnBrowserData = require("@mdn/browser-compat-data")
const caniuse = require("caniuse-api")

const {
	cacheDurations: { daily },
} = require("#data/site")

const browserFeatures = require("#data/browserFeatures")
const browsersByType = require("#data/browsersByType")

const getCaniuseSupport = async (feature) => {
	let asset = new AssetCache(`caniuse_${feature}`, ".cache")
	asset.ensureDir()

	if (asset.isCacheValid(daily)) {
		return await asset.getCachedValue()
	}

	const caniuseSupport = caniuse.getSupport(feature, true)
	await asset.save(caniuseSupport, "json")
	return caniuseSupport
}

const getBrowserslistSupport = async (feature) => {
	const featureData = browserFeatures.filter((lookup) => feature === lookup.id)[0]
	const featureSet = mdnBrowserData[featureData.language][featureData.type]
	const browserslistData = featureData["key"].split(".").reduce((object, key) => {
		return object[key]
	}, featureSet)
	return browserslistData["__compat"]["support"]
}

module.exports = async () => {
	let sorted = []

	for (let feature of browserFeatures) {
		const caniuseSupport = await getCaniuseSupport(feature.id)
			.then((caniuseSupport) => caniuseSupport)
			.catch((error) => {
				// console.error("No CanIUse Support", error)
				return false
			})

		if (caniuseSupport) {
			feature.full = 0
			feature.partial = 0

			browsersByType.forEach((browser) => {
				const support = caniuseSupport[browser.id]
				if (support?.y) {
					feature.full += 1
				} else if (support?.a) {
					feature.partial += 1
				}
			})
		} else {
			const browserslistSupport = await getBrowserslistSupport(feature.id)
				.then((browserslistSupport) => browserslistSupport)
				.catch((error) => {
					// console.error("No Browserslist Support", error)
					return false
				})

			if (browserslistSupport) {
				feature.full = 0
				feature.partial = 0

				browsersByType.forEach((browser) => {
					const support = Array.isArray(browserslistSupport[browser.key]) ? browserslistSupport[browser.key][0] : browserslistSupport[browser.key]
					if ((support?.version_added && support?.flags) || (support?.version_added + "").match(/preview/)) {
						feature.partial += 1
					} else if (support?.version_added) {
						feature.full += 1
					}
				})
			}
		}

		sorted.push(feature)
	}

	sorted = sorted.sort((a, b) => {
		if (typeof a.full !== "undefined" && typeof b.full !== "undefined") {
			return b.full > a.full || (b.full == a.full && b.partial > a.partial) ? 1 : a?.full > b.full || (a.full == b.full && a.partial > b.partial) ? -1 : 0
		} else if (typeof a.full !== "undefined" && typeof b.full === "undefined") {
			return -1
		} else if (typeof a.full === "undefined" && typeof b.full !== "undefined") {
			return 1
		}
		return a["id"].localeCompare(b["id"])
	})

	return sorted
}
