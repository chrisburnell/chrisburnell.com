import { describe, expect, it } from "vitest";
import fetch from "./fetch.js";

describe("Filters: Fetch", () => {
	it("githubData() returns repository data from the GitHub API", async () => {
		expect((await fetch.githubData("chrisburnell/svg-sparkline")).id).toBe(
			746134155,
		);
	});

	it("stargazers() returns repository data from the GitHub API", async () => {
		const stargazers = await fetch.stargazers("chrisburnell/svg-sparkline");
		expect(typeof stargazers).toBe("number");
	});

	it("githubTagData() returns repository tag data from the GitHub API", async () => {
		const tagData = await fetch.githubTagData("chrisburnell/svg-sparkline");
		expect(tagData[tagData.length - 1].name).toBe("v0.0.1");
	});

	it("latestTag() returns repository tag data from the GitHub API", async () => {
		const latestTag = await fetch.latestTag("chrisburnell/svg-sparkline");
		expect(/v\d+\.\d+\.\d+/.test(latestTag)).toBe(true);
	});

	it("npmDownloads() returns a download count based on an npm package", async () => {
		const downloads = await fetch.npmDownloads(
			"@chrisburnell/svg-sparkline",
			"2024-01-21T09:18:33.553Z",
		);
		expect(typeof downloads).toBe("number");
	});
});
