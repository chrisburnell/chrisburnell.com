import { url as siteURL } from "./src/data/site.js"

import filters from "./src/eleventy/filters.js"

export default async function(eleventyConfig) {
	eleventyConfig.setServerPassthroughCopyBehavior("passthrough")

	eleventyConfig.setDataDeepMerge(true)
	eleventyConfig.setQuietMode(true)

	Object.keys(filters).forEach((filterTypes) => {
		Object.keys(filters[filterTypes]).forEach((filterName) => {
			eleventyConfig.addFilter(filterName, filterTypes[filterName])
		})
	})

	eleventyConfig.on("beforeBuild", () => {
		console.log(`[${filters.urls.getHost(siteURL)}] Generating...`)
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
