const EleventyFetch = require("@11ty/eleventy-fetch")

const { cacheDurations } = require("#data/site")

module.exports = {
	githubData: async (repository) => {
		let url = `https://api.github.com/repos/${repository}`
		let json = await EleventyFetch(url, {
			duration: cacheDurations.weekly,
			type: "json",
		})

		return json
	},
	npmData: async (package) => {
		let url = `https://api.npmjs.org/downloads/point/last-month/${package}`
		let json = await EleventyFetch(url, {
			duration: cacheDurations.weekly,
			type: "json",
		})

		return json
	},
}
