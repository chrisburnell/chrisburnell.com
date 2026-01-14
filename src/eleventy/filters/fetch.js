import dotenv from "dotenv";
dotenv.config({ quiet: true });

import EleventyFetch from "@11ty/eleventy-fetch";
import { cacheDurations } from "../data/site.js";

const token = process.env.GH_TOKEN || process.env.GITHUB_TOKEN;

let npmNextAvailable = 0;
const npmRateLimit = async () => {
	const now = Date.now();
	const slow = Math.max(now, npmNextAvailable);
	npmNextAvailable = slow + 125;
	const wait = slow - now;
	if (wait > 0) {
		await new Promise((resolve) => setTimeout(resolve, wait));
	}
};

/**
 * @param {string} repository
 * @returns {Promise<Array<object>>}
 */
export const githubData = async (repository) => {
	const headers = {
		Accept: "application/vnd.github.v3+json",
		...(token && { Authorization: `Bearer ${token}` }),
	};
	const url = `https://api.github.com/repos/${repository}`;
	const json = await EleventyFetch(url, {
		duration: cacheDurations.daily,
		type: "json",
		fetchOptions: { headers },
	});
	return json;
};

/**
 * @param {string} repository
 * @returns {number}
 */
export const stargazers = async (repository) => {
	const repositoryData = await githubData(repository);
	return Number(repositoryData["stargazers_count"]);
};

/**
 * @param {string} repository
 * @returns {Promise<Array<object>>}
 */
export const githubTagData = async (repository) => {
	const headers = {
		Accept: "application/vnd.github.v3+json",
		...(token && { Authorization: `Bearer ${token}` }),
	};
	const url = `https://api.github.com/repos/${repository}/tags`;
	const json = await EleventyFetch(url, {
		duration: cacheDurations.daily,
		type: "json",
		fetchOptions: { headers },
	});
	return json;
};

/**
 * @param {string} repository
 * @returns {number}
 */
export const latestTag = async (repository) => {
	const tagData = await githubTagData(repository);
	return tagData.length ? tagData[0].name : null;
};

/**
 * @param {string} npmPackage
 * @param {number} year
 * @returns {number}
 */
const getNPMDownloadsForYear = async (npmPackage, year) => {
	await npmRateLimit();
	const isCurrentYear = new Date().getFullYear() === year;
	const url = `https://api.npmjs.org/downloads/point/${year}-01-01:${year}-12-31/${npmPackage}`;
	const json = await EleventyFetch(url, {
		duration: isCurrentYear ? cacheDurations.daily : "*",
		type: "json",
	});
	return json.downloads;
};

/**
 * @param {string} npmPackage
 * @param {string} published
 * @returns {number}
 */
export const npmDownloads = async (npmPackage, published) => {
	const startYear = new Date(published).getFullYear();
	const endYear = new Date().getFullYear();

	try {
		let downloads = 0;
		for (let year = startYear; year <= endYear; year++) {
			downloads += await getNPMDownloadsForYear(npmPackage, year);
		}
		return downloads;
	} catch (error) {
		if (process.env.ELEVENTY_RUN_MODE === "build") {
			return Promise.reject(error);
		}
		console.log("Failed getting npm downloads", error);
		return 0;
	}
};

export default {
	githubData,
	stargazers,
	githubTagData,
	latestTag,
	npmDownloads,
};
