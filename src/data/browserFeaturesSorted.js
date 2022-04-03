const browserFeatures = require("./browserFeatures")

const { AssetCache } = require("@11ty/eleventy-fetch")
const caniuse = require("caniuse-api")

const site = require("./site")

const duration = site.cacheDuration
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

	sorted = sorted
		.sort((a, b) => {
			return a["id"].localeCompare(b["id"])
		})
		.sort((a, b) => {
			if (typeof a.full !== "undefined" && typeof b.full !== "undefined") {
				return b.full > a.full || (b.full == a.full && b.partial > a.partial) ? 1 : a?.full > b.full || (a.full == b.full && a.partial > b.partial) ? -1 : 0
			} else if (typeof a.full !== "undefined" && typeof b.full === "undefined") {
				return -1
			} else if (typeof a.full === "undefined" && typeof b.full !== "undefined") {
				return 1
			}
			return 0
		})

	return sorted
}
