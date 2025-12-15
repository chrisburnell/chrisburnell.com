import EleventyFetch from "@11ty/eleventy-fetch";
import { cacheDurations, urls } from "./site.js";

/** @type {Map<[key: string]: Array<object>>} */
const analyticsCache = new Map();

/**
 * @returns {{ pageviews: object, subs: object, medians: object }}
 */
export default async function () {
	if (!process.env.FATHOM_SUMMARY_KEY) {
		return {
			pageviews: {},
			sums: {},
			medians: {},
		};
	}

	const url = `${urls.fathom}/summary?key=${process.env.FATHOM_SUMMARY_KEY}`;
	const pageviews = await EleventyFetch(url, {
		duration: cacheDurations.hourly,
		type: "json",
	});

	let sums = {};
	if (analyticsCache.has("sums")) {
		sums = analyticsCache.get("sums");
	} else {
		Object.values(pageviews).forEach((item) => {
			Object.entries(item).forEach(([key, value]) => {
				if (key !== "hotness") {
					sums[key] = (sums[key] || 0) + value;
				}
			});
		});
		analyticsCache.set("sums", sums);
	}

	let medians = {};
	if (analyticsCache.has("medians")) {
		medians = analyticsCache.get("medians");
	} else {
		Object.entries(sums).forEach(([key, value]) => {
			medians[key] = value / Object.values(pageviews).length;
		});
		analyticsCache.set("medians", medians);
	}

	return { pageviews, sums, medians };
}
