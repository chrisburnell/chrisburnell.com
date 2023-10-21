const EleventyFetch = require("@11ty/eleventy-fetch")

const { cacheDurations } = require("#data/site")

module.exports = {
	/**
	 * Return data from the GitHub Repository API.
	 * @param {String} repository
	 * @returns {Object}
	 */
	githubData: async (repository) => {
		let url = `https://api.github.com/repos/${repository}`
		let json = await EleventyFetch(url, {
			duration: cacheDurations.weekly,
			type: "json",
		})
		return json
	},
	/**
	 * Return data from the npm Downloads API.
	 * @param {String} package
	 * @returns {Object}
	 */
	npmData: async (package) => {
		let url = `https://api.npmjs.org/downloads/point/last-month/${package}`
		let json = await EleventyFetch(url, {
			duration: cacheDurations.weekly,
			type: "json",
		})
		return json
	},
}
