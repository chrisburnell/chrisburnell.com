import dotenv from "dotenv"
dotenv.config()

import EleventyFetch from "@11ty/eleventy-fetch"
import { cacheDurations } from "../eleventy/data//site.js"

const API_ORIGIN = process.env.PERSONAL_API_URL
const TOKEN = process.env.PERSONAL_API_TOKEN
const TYPES = ["breweries", "gamePublishers", "humans", "meetups", "musicArtists", "publications"]

const getPeopleByType = async (type) => {
	return await EleventyFetch(`${API_ORIGIN}/${type}.json?token=${TOKEN}`, {
		duration: cacheDurations.daily,
		type: "json",
		fetchOptions: {
			method: "GET",
		},
	})
}

const getPeople = async () => {
	let people = []

	for (let type of TYPES) {
		let lookup = await getPeopleByType(type)
		people = [...people, ...lookup]
	}

	return people
}

const people = await getPeople()

export default people
