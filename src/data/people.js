const Cache = require("@11ty/eleventy-cache-assets")

// Load .env variables with dotenv
require("dotenv").config()

const API_ORIGIN = process.env.PERSONAL_API_URL
const TOKEN = process.env.WEBMENTION_IO_TOKEN
const TYPES = ["breweries", "gamePublishers", "humans", "meetups", "musicArtists", "publications"]

async function getPeopleByType(type) {
	return await Cache(`${API_ORIGIN}/${type}.json?token=${TOKEN}`, {
		duration: "23h",
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
