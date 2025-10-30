import dotenv from "dotenv";
dotenv.config({ quiet: true });

import EleventyFetch from "@11ty/eleventy-fetch";
import { cacheDurations } from "./site.js";

const interestsDirectoryData = async function () {
	const headers = {
		Accept: "application/vnd.github.v3+json",
		Authorization: `token ${process.env.GH_TOKEN || ""}`,
	};
	const url =
		"https://api.github.com/repos/chrisburnell/interests-directory/contents/_people";
	const json = await EleventyFetch(url, {
		duration: cacheDurations.daily,
		type: "json",
		fetchOptions: { headers },
	});
	return json;
};

export default async function () {
	const data = await interestsDirectoryData();

	return {
		raw: data,
		count: data.length,
	};
}
