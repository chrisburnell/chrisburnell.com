// by Robb Knight: https://rknight.me/blog/blocking-bots-with-nginx/

import EleventyFetch from "@11ty/eleventy-fetch"
import { cacheDurations } from "./site.js"

export default async function() {
	const url = "https://raw.githubusercontent.com/ai-robots-txt/ai.robots.txt/main/robots.txt"
	let txt = await EleventyFetch(url, {
		duration: cacheDurations.weekly,
		type: "text",
	})

	txt = txt.split("\n")
		.filter(line => line !== "User-agent: Applebot")
		.join("\n")

	const bots = txt.split("\n")
		.filter(line => {
			return line.startsWith("User-agent:") && line !== "User-agent: Applebot"
		})
		.map(line => line.split(":")[1].trim())

	return {
		txt: txt,
		nginx: bots.join('|'),
	}
}
