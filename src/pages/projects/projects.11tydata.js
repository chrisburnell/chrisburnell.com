const pkg = require("../../../package.json")

const { githubData, npmData } = require("#filters/fetch")

const getExternalLikes = async (syndicationLinks) => {
	if (syndicationLinks) {
		const matchingLinks = syndicationLinks.filter((link) => {
			return link.includes("https://dev.to")
		})

		if (matchingLinks.length) {
			const articles = await EleventyFetch(`https://dev.to/api/articles?username=${author["dev_to"]}`, {
				duration: site.cacheDurations.weekly,
				type: "json",
				fetchOptions: {
					method: "GET",
				},
			})

			const matchingArticles = articles.filter((article) => {
				return matchingLinks[0] === article["url"]
			})

			if (matchingArticles.length) {
				return matchingArticles[0]["positive_reactions_count"] || 0
			}
		}
	}
	return 0
}

module.exports = {
	tags: ["project"],
	show_responses: true,
	eleventyComputed: {
		date: async (data) => {
			if (data.github) {
				const github = await githubData(data.github)
				return github["created_at"]
			}
			return data.date || ""
		},
		updated: async (data) => {
			if (data.github) {
				const github = await githubData(data.github)
				return github["updated_at"] || ""
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
		externalLikes: async (data) => {
			if (data.show_responses && data.syndicate_to) {
				const externalLikes = await getExternalLikes(data.syndicate_to)
					.then((externalLikes) => externalLikes)
					.catch(() => 0)

				return externalLikes
			}
			return 0
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
