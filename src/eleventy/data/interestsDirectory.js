import EleventyFetch from "@11ty/eleventy-fetch"
import dotenv from "dotenv"
import { cacheDurations } from "./site.js"
dotenv.config()

const interestsDirectoryData = async function () {
	const url = "https://api.github.com/repos/chrisburnell/interests-directory/contents/_people"
	const json = await EleventyFetch(url, {
		duration: cacheDurations.daily,
		type: "json",
	})
	return json
}

export default async function () {
	const data = await interestsDirectoryData()

	return {
		raw: data,
		count: data.length,
	}
}
