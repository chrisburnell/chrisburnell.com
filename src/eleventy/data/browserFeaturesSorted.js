import { AssetCache } from "@11ty/eleventy-fetch";
import caniuse from "caniuse-api";
import { createRequire } from "node:module";
import browserFeatures from "./browserFeatures.js";
import browsersByType from "./browsersByType.js";
import { cacheDurations } from "./site.js";
const require = createRequire(import.meta.url);
const mdnBrowserData = require("../../../node_modules/@mdn/browser-compat-data/data.json");
// import mdnBrowserData from "@mdn/browser-compat-data" assert { type: "json" }

/**
 * @param {string} feature
 * @returns {object}
 */
const getCaniuseSupport = async (feature) => {
	const asset = new AssetCache(`caniuse_${feature}`, ".cache");

	if (asset.isCacheValid(cacheDurations.daily)) {
		return await asset.getCachedValue();
	}

	const caniuseSupport = caniuse.getSupport(feature, true);
	await asset.save(caniuseSupport, "json");
	return caniuseSupport;
};

/**
 * @param {string} feature
 * @returns {object}
 */
const getBrowserslistSupport = async (feature) => {
	const featureData = browserFeatures.filter(
		(browserFeature) => feature === browserFeature.id,
	)[0];
	const featureSet = mdnBrowserData[featureData.language][featureData.type];
	const browserslistData = featureData["key"]
		.split(".")
		.reduce((object, key) => {
			return object[key];
		}, featureSet);
	return browserslistData["__compat"]["support"];
};

/**
 * @returns {Array<object>}
 */
export default async function () {
	let sorted = [];

	for (const feature of browserFeatures) {
		const caniuseSupport = await getCaniuseSupport(feature.id)
			.then((caniuseSupport) => caniuseSupport)
			.catch(() => {
				return false;
			});

		if (caniuseSupport) {
			feature.full = 0;
			feature.partial = 0;

			browsersByType.forEach((browser) => {
				const support = caniuseSupport[browser.id];
				if (support?.y) {
					feature.full += 1;
				} else if (support?.a) {
					feature.partial += 1;
				}
			});
		} else {
			const browserslistSupport = await getBrowserslistSupport(feature.id)
				.then((browserslistSupport) => browserslistSupport)
				.catch(() => {
					return false;
				});

			if (browserslistSupport) {
				feature.full = 0;
				feature.partial = 0;

				browsersByType.forEach((browser) => {
					const support = Array.isArray(
						browserslistSupport[browser.key],
					)
						? browserslistSupport[browser.key][0]
						: browserslistSupport[browser.key];
					if (
						(support?.version_added && support?.flags) ||
						(support?.version_added + "").match(/preview/)
					) {
						feature.partial += 1;
					} else if (support?.version_added) {
						feature.full += 1;
					}
				});
			}
		}

		sorted.push(feature);
	}

	sorted = sorted.sort((a, b) => {
		if (typeof a.full !== "undefined" && typeof b.full !== "undefined") {
			return b.full > a.full ||
				(b.full == a.full && b.partial > a.partial)
				? 1
				: a?.full > b.full ||
					  (a.full == b.full && a.partial > b.partial)
					? -1
					: 0;
		} else if (
			typeof a.full !== "undefined" &&
			typeof b.full === "undefined"
		) {
			return -1;
		} else if (
			typeof a.full === "undefined" &&
			typeof b.full !== "undefined"
		) {
			return 1;
		}
		return a["id"].localeCompare(b["id"]);
	});

	return sorted;
}
