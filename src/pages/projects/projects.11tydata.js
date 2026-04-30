import {
	githubData,
	latestTag,
	npmDownloads,
	stargazers,
} from "../../eleventy/filters/fetch.js";
import { numberStringFormat } from "../../eleventy/filters/strings.js";
import { toNearest } from "../../eleventy/filters/utils.js";

export default {
	tags: ["project"],
	show_responses: true,
	eleventyComputed: {
		date: async (data) => {
			if (data.git) {
				const github = await githubData(data.git);
				return github["created_at"] || null;
			}
			return data.date || null;
		},
		year: async (data) => {
			if (data.git) {
				const github = await githubData(data.git);
				return github["created_at"]
					? new Date(github["created_at"]).getFullYear()
					: null;
			}
			return data.date ? new Date(data.date).getFullYear() : null;
		},
		updated: async (data) => {
			if (data.git) {
				const github = await githubData(data.git);
				return github["pushed_at"] || null;
			}
			return data.updated || null;
		},
		tagline: async (data) => {
			return data.tagline || data.title || "";
		},
		description: async (data) => {
			if (data.description) {
				return data.description;
			} else if (data.git) {
				const github = await githubData(data.git);
				return github["description"];
			}
			return "";
		},
		descriptionLong: async (data) => {
			let description = data.description || "";
			if (data.git) {
				const github = await githubData(data.git);
				const stargazers = github["stargazers_count"];
				description = data.description || github["description"];
				if (stargazers > 0) {
					description += `<br>There ${stargazers > 1 ? "are" : "is"} ${numberStringFormat(stargazers)} stargazer${stargazers > 1 ? "s" : ""} <a href="https://github.com/${data.git}" rel="external noopener">on GitHub</a>`;
				}
				if (data.npm) {
					const downloads = await npmDownloads(
						data.npm,
						github["created_at"],
					);
					if (downloads >= 50) {
						if (stargazers > 0) {
							description += " and it ";
						} else {
							description += "<br>It ";
						}
						description += `has over ${numberStringFormat(toNearest(downloads, 50, true))} downloads <a href="https://www.npmjs.com/package/${data.npm}" rel="external noopener">on npm</a>.`;
					} else if (stargazers > 0) {
						description += ".";
					}
				} else {
					description += ".";
				}
			}
			return description;
		},
		downloads: async (data) => {
			if (data.git && data.npm) {
				const github = await githubData(data.git);
				const downloads = await npmDownloads(
					data.npm,
					github["created_at"],
				);
				return downloads;
			}
			return 0;
		},
		stargazers: async (data) => {
			if (data.git) {
				return await stargazers(data.git);
			}
			return 0;
		},
		latest_tag: async (data) => {
			if (data.git) {
				return await latestTag(data.git);
			}
			return null;
		},
	},
};
