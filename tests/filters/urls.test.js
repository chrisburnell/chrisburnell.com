import assert from "node:assert/strict";
import { describe, it } from "node:test";
import urls from "../../src/eleventy/filters/urls.js";

export default async () => {
	describe("Filters: URLs", () => {
		it("tweetback() should return the Twitter Archive version of a Twitter status URL", () => {
			assert.strictEqual(
				urls.tweetback(
					`https://twitter.com/iamchrisburnell/status/345878691110334466`,
				),
				"https://twitter.chrisburnell.com/345878691110334466",
			);
		});

		it("getHost() should return a URL’s hostname", () => {
			assert.strictEqual(
				urls.getHost(`https://chrisburnell.com/`),
				"chrisburnell.com",
			);
		});

		it("getOrigin() should return a URL’s origin", () => {
			assert.strictEqual(
				urls.getOrigin(`https://chrisburnell.com/`),
				"https://chrisburnell.com",
			);
		});

		it("getProtocol() should return a URL’s protocol", () => {
			assert.strictEqual(
				urls.getProtocol(`https://chrisburnell.com/`),
				"https:",
			);
		});
	});
};
