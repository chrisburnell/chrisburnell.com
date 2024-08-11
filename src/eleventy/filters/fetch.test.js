import assert from "node:assert/strict";
import { describe, it } from "node:test";
import fetch from "./fetch.js";

export default async () => {
	describe("Filters: Fetch", () => {
		it("githubData() returns repository data from the GitHub API", async () => {
			assert.strictEqual(
				(await fetch.githubData("chrisburnell/svg-sparkline")).id,
				746134155,
			);
		});

		it("stargazers() returns repository data from the GitHub API", async () => {
			const stargazers = await fetch.stargazers(
				"chrisburnell/svg-sparkline",
			);
			assert.strictEqual(typeof stargazers, "number");
		});

		it("npmDownloads() returns a download count based on an npm package", async () => {
			const downloads = await fetch.npmDownloads(
				"@chrisburnell/svg-sparkline",
				"2024-01-21T09:18:33.553Z",
			);
			assert.strictEqual(typeof downloads, "number");
		});
	});
};
