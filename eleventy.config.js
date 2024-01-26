import site from "./src/data/site.js"

import { getHost } from "./src/eleventy/filters/strings.js"

export default async function(eleventyConfig) {
	eleventyConfig.setServerPassthroughCopyBehavior("passthrough")

	eleventyConfig.setDataDeepMerge(true)
	eleventyConfig.setQuietMode(true)

	eleventyConfig.on("beforeBuild", () => {
		console.log(`[${getHost(site.url)}] Generating…`)
	})

	return {
		dir: {
			input: "src",
			output: "_site",
			data: "data",
			includes: "eleventy/includes",
			layouts: "eleventy/layouts",
		}
	}
}
