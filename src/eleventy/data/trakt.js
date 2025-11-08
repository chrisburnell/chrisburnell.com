import EleventyFetch from "@11ty/eleventy-fetch";
import dotenv from "dotenv";
import { trakt } from "./author.js";
import { cacheDurations } from "./site.js";
dotenv.config({ quiet: true });

/** @type {{ headers: { [key: string: string|number] } }} */
const fetchOptions = {
	headers: {
		"Content-Type": "application/json",
		"trakt-api-version": 2,
		"trakt-api-key": process.env.TRAKT_CLIENT_ID,
	},
};

/**
 * @returns {Promise<Array<object>>}
 */
const movies = async function () {
	const url = `https://api.trakt.tv/users/${trakt}/history/movies?page=1&limit=20`;
	const json = await EleventyFetch(url, {
		duration: cacheDurations.hourly,
		type: "json",
		fetchOptions,
	});
	return json;
};

/**
 * @returns {Promise<Array<object>>}
 */
const shows = async function () {
	const url = `https://api.trakt.tv/users/${trakt}/history/shows?page=1&limit=20`;
	const json = await EleventyFetch(url, {
		duration: cacheDurations.hourly,
		type: "json",
		fetchOptions,
	});
	return json;
};

/**
 * @returns {{ movies: Array<object>, shows: Array<object> }}
 */
export default async function () {
	if (process.env.TRAKT_CLIENT_ID) {
		return {
			movies: await movies(),
			shows: await shows(),
		};
	}
	return {
		movies: [],
		shows: [],
	};
}
