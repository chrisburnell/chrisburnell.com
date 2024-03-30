import { githubData, npmDownloads, stargazers } from "../../eleventy/filters/fetch.js"
import { numberStringFormat } from "../../eleventy/filters/strings.js"
import { toNearest } from "../../eleventy/filters/utils.js"

export default {
	tags: ["project"],
	show_webmentions: true,
	eleventyComputed: {
		date: async (data) => {
			if (data.github) {
				const github = await githubData(data.github)
				return github["created_at"] || null
			}
			return data.date || null
		},
		year: async (data) => {
			if (data.github) {
				const github = await githubData(data.github)
				return github["created_at"] ? new Date(github["created_at"]).getFullYear() : null
			}
			return data.date ? new Date(data.date).getFullYear() : null
		},
		updated: async (data) => {
			if (data.github) {
				const github = await githubData(data.github)
				return github["pushed_at"] || null
			}
			return data.updated || null
		},
		tagline: async (data) => {
			return data.tagline || data.title || ""
		},
		description: async (data) => {
			if (data.github) {
				const github = await githubData(data.github)
				return github["description"]
			}
			return data.description || ""
		},
		descriptionLong: async (data) => {
			if (data.github && data.npm) {
				const github = await githubData(data.github)
				const downloads = await npmDownloads(data.npm, github["created_at"])
				let description = `${github["description"]}<br>`
				if (github["stargazers_count"] > 0) {
					description += `There ${github["stargazers_count"] > 1 ? "are" : "is"} ${numberStringFormat(github["stargazers_count"])} stargazer${github["stargazers_count"] > 1 ? "s" : ""} <a href="https://github.com/${data.github}" rel="external noopener">on GitHub</a> and it`
				} else {
					description += `It`
				}
				description += ` has over ${numberStringFormat(toNearest(downloads, 50, true))} downloads <a href="https://www.npmjs.com/package/${data.npm}" rel="external noopener">on npm</a>.`
				return description
			}
			return data.description || ""
		},
		stargazers: async (data) => {
			if (data.github) {
				return await stargazers(data.github)
			}
			return 0
		},
	},
}
