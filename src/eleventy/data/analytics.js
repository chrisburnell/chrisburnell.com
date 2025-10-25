import EleventyFetch from "@11ty/eleventy-fetch";
import { cacheDurations, urls } from "./site.js";

const analyticsCache = new Map();

export default async function () {
	const url = `${urls.fathom}/summary?key=${process.env.FATHOM_SUMMARY_KEY}`;
	const pageviews = await EleventyFetch(url, {
		duration: cacheDurations.daily,
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
