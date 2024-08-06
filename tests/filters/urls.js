import assert from "node:assert";
import test from "node:test";
import urls from "../../src/eleventy/filters/urls.js";

export default async () => {
	test("Filters: URLs", () => {
		assert.strictEqual(
			urls.tweetback(
				`https://twitter.com/iamchrisburnell/status/345878691110334466`,
			),
			"https://twitter.chrisburnell.com/345878691110334466",
		);

		assert.strictEqual(
			urls.getHost(`https://chrisburnell.com/`),
			"chrisburnell.com",
		);

		assert.strictEqual(
			urls.getOrigin(`https://chrisburnell.com/`),
			"https://chrisburnell.com",
		);

		assert.strictEqual(
			urls.getProtocol(`https://chrisburnell.com/`),
			"https:",
		);
	});
};
