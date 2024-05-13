import EleventyFetch from "@11ty/eleventy-fetch"
import dotenv from "dotenv"
import { trakt } from "./author.js"
import { cacheDurations } from "./site.js"
dotenv.config()

const shows = async function () {
	let url = `https://api.trakt.tv/users/${trakt}/history/shows?page=1&limit=20`
	let json = await EleventyFetch(url, {
		duration: cacheDurations.hourly,
		type: "json",
		fetchOptions: {
			headers: {
				"Content-Type": "application/json",
				"trakt-api-version": 2,
				"trakt-api-key": process.env.TRAKT_CLIENT_ID,
			},
		},
	})
	return json
}

const movies = async function () {
	let url = `https://api.trakt.tv/users/${trakt}/history/movies?page=1&limit=20`
	let json = await EleventyFetch(url, {
		duration: cacheDurations.hourly,
		type: "json",
		fetchOptions: {
			headers: {
				"Content-Type": "application/json",
				"trakt-api-version": 2,
				"trakt-api-key": process.env.TRAKT_CLIENT_ID,
			},
		},
	})
	return json
}

export default async function () {
	if (process.env.TRAKT_CLIENT_ID) {
		return {
			shows: await shows(),
			movies: await movies(),
		}
	}
	return {
		shows: [],
		movies: [],
	}
}
