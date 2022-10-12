// Load .env variables with dotenv
require("dotenv").config()

const EleventyFetch = require("@11ty/eleventy-fetch")

const site = require("#data/site")

const API_ORIGIN = process.env.PERSONAL_API_URL
const TOKEN = process.env.PERSONAL_API_TOKEN
const TYPES = ["breweries", "gamePublishers", "humans", "meetups", "musicArtists", "publications"]

const getPeopleByType = async (type) => {
	return await EleventyFetch(`${API_ORIGIN}/${type}.json?token=${TOKEN}`, {
		duration: site.cacheDurations.short,
		type: "json",
		fetchOptions: {
			method: "GET",
		},
	})
}

module.exports = async () => {
	let people = []

	for (let type of TYPES) {
		let lookup = await getPeopleByType(type)
		people = [...people, ...lookup]
	}

	return people
}
