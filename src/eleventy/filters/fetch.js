import EleventyFetch from "@11ty/eleventy-fetch"
import { cacheDurations } from "../data/site.js"

/**
 * Return data from the GitHub Repository API.
 * @param {string} repository
 * @returns {object}
 */
export const githubData = async (repository) => {
	let url = `https://api.github.com/repos/${repository}`
	let json = await EleventyFetch(url, {
		duration: cacheDurations.weekly,
		type: "json",
	})
	return json
}

/**
 * Return data from the npm Downloads API.
 * @param {string} npmPackage
 * @returns {object}
 */
export const npmData = async (npmPackage) => {
	let url = `https://api.npmjs.org/downloads/point/last-month/${npmPackage}`
	let json = await EleventyFetch(url, {
		duration: cacheDurations.weekly,
		type: "json",
	})
	return json
}

export default {
	githubData,
	npmData,
}
