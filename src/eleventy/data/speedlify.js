import EleventyFetch from "@11ty/eleventy-fetch";
import { cacheDurations, urls } from "./site.js";

/**
 * @returns {Promise<{ [url: string]: object }>}
 */
export default async function () {
	const url = `${urls.speedlify}/api/urls.json`;
	const json = await EleventyFetch(url, {
		duration: cacheDurations.weekly,
		type: "json",
	});
	return json;
}
