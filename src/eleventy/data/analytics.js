import EleventyFetch from "@11ty/eleventy-fetch";
import { cacheDurations, urls } from "./site.js";

export default async function () {
	const url = `${urls.fathom}/summary?key=${process.env.FATHOM_SUMMARY_KEY}`;
	const json = await EleventyFetch(url, {
		duration: cacheDurations.daily,
		type: "json",
	});

	return json;
}
