// by Robb Knight: https://rknight.me/blog/blocking-bots-with-nginx/

import { AssetCache } from "@11ty/eleventy-fetch";
import { cacheDurations } from "./site.js";

export default async function () {
	let asset = new AssetCache("robots.txt");

	if (asset.isCacheValid(cacheDurations.daily)) {
		return await asset.getCachedValue();
	}

	const res = await fetch(
		"https://raw.githubusercontent.com/ai-robots-txt/ai.robots.txt/main/robots.txt",
	);
	let txt = await res.text();

	txt = txt
		.split("\n")
		.filter((line) => line !== "User-agent: Applebot")
		.join("\n");

	const bots = txt
		.split("\n")
		.filter((line) => {
			return (
				line.startsWith("User-agent:") &&
				line !== "User-agent: Applebot"
			);
		})
		.map((line) => line.split(":")[1].trim());

	const data = {
		txt: txt,
		nginx: bots.join("|"),
	};

	await asset.save(data, "json");

	return data;
}
