const pkg = require("../../../package.json")

const { githubData, npmData } = require("#filters/fetch")

module.exports = {
	tags: ["project"],
	show_responses: true,
	eleventyComputed: {
		date: async (data) => {
			if (data.github) {
				const github = await githubData(data.github)
				return github["created_at"] || null
			}
			return data.date || null
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
				const npm = await npmData(data.npm)
				return `${github["description"]}<br>There are ${github["stargazers_count"].toLocaleString()} stargazers <a href="https://github.com/${data.github}" rel="external">on GitHub</a> and it was downloaded ${npm["downloads"].toLocaleString()} times in the last month <a href="https://www.npmjs.com/package/${data.npm}" rel="external">on npm</a>.`
			}
			return data.description || ""
		},
		stargazers: async (data) => {
			if (data.github) {
				const github = await githubData(data.github)
				return parseFloat(github["stargazers_count"])
			}
			return 0
		},
	},
}
