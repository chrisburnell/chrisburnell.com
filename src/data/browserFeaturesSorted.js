const { AssetCache } = require("@11ty/eleventy-fetch")
const caniuse = require("caniuse-api")

const site = require("#data/site")

const browserFeatures = require("#data/browserFeatures")
const browsersByType = require("#data/browsersByType")
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

module.exports = async () => {
	const latestStableBrowsers = await getLatestStableBrowsers()
		.then((latestStableBrowsers) => latestStableBrowsers)
		.catch(() => false)

	let sorted = []

	for (let feature of browserFeatures) {
		const support = await getFeatureSupport(feature.id)
			.then((support) => support)
			.catch(() => false)

		if (support) {
			feature.full = 0
			feature.partial = 0

			Object.values(browsersByType).forEach((browsers) => {
				Object.values(browsers).forEach((id) => {
					if (support[id]?.y) {
						feature.full += 1
					} else if (support[id]?.a) {
						feature.partial += 1
					}
				})
			})
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
