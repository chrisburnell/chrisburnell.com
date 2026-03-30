import EleventyFetch from "@11ty/eleventy-fetch";
import { cacheDurations, urls } from "./site.js";

/** @type {Map<[key: string]: number>} */
const iineCache = new Map();

/**
 * @returns {object}
 */
export default async function () {
	if (!process.env.IINE_TOKEN) {
		return {};
	}

	if (iineCache.size > 0) {
		return Object.fromEntries(iineCache);
	}

	const url = `${urls.iine}/hits/all?token=${process.env.IINE_TOKEN}`;
	const unordered = await EleventyFetch(url, {
		duration: cacheDurations.hourly,
		type: "json",
	});

	unordered.forEach((item) => {
		iineCache.set(item.id, Number(item.count));
	});

	return Object.fromEntries(iineCache);
}
