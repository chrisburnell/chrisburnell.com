import EleventyFetch from "@11ty/eleventy-fetch"
import stats from "download-stats"
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

export const stargazers = async (repository) => {
	const github = await githubData(repository)
	return parseFloat(github["stargazers_count"])
}

/**
 * @param {string} npmPackage
 * @returns {number}
 */
export const npmDownloads = async (npmPackage, published) => {
	const start = new Date(published)
	return new Promise((resolve, reject) => {
		try {
			let downloads = 0
			stats
				.get(start, new Date(), npmPackage)
				.on("data", (data) => {
					downloads += data.downloads
				})
				.on("end", () => {
					resolve(downloads)
				})
		} catch (error) {
			console.error(error)
			reject(error)
		}
	})
}

export default {
	githubData,
	stargazers,
	npmDownloads,
}
