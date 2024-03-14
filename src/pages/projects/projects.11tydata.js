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
				return `${github["description"]}<br>There are ${numberStringFormat(github["stargazers_count"])} stargazers <a href="https://github.com/${data.github}" rel="external">on GitHub</a> and it has over ${numberStringFormat(toNearest(downloads, 50, true))} downloads <a href="https://www.npmjs.com/package/${data.npm}" rel="external">on npm</a>.`
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
