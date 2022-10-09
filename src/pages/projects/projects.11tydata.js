const fetchFilter = require("#filters/fetch")

const pkg = require("../../../package.json")

module.exports = {
	tags: ["project"],
	show_webmentions: true,
	eleventyComputed: {
		date: async (data) => {
			if (data.github) {
				const github = await fetchFilter.githubData(data.github)
				return github["created_at"]
			}
			return data.date || ""
		},
		updated: async (data) => {
			if (data.github) {
				const github = await fetchFilter.githubData(data.github)
				return github["updated_at"]
			}
			return data.updated || ""
		},
		tagline: async (data) => {
			if (data.npm) {
				return data.title + " v" + (pkg.dependencies[data.npm] || pkg.devDependencies[data.npm]).replace("^", "")
			}
			return data.tagline || data.title || ""
		},
		description: async (data) => {
			if (data.github) {
				const github = await fetchFilter.githubData(data.github)
				return github["description"]
			}
			return data.description || ""
		},
		descriptionLong: async (data) => {
			if (data.github && data.npm) {
				const github = await fetchFilter.githubData(data.github)
				const npm = await fetchFilter.npmData(data.npm)
				return `${github["description"]}

				There are ${github["stargazers_count"].toLocaleString()} star-gazers <a href="https://github.com/${data.github}" rel="external">on GitHub</a> and it was downloaded ${npm["downloads"].toLocaleString()} times in the last month <a href="https://www.npmjs.com/package/${data.npm}" rel="external">on npm</a>.`
			}
			return data.description || ""
		},
		stargazers: async (data) => {
			if (data.github) {
				const github = await fetchFilter.githubData(data.github)
				return github["stargazers_count"]
			}
			return 0
		}
	},
}
