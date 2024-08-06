import assert from "node:assert";
import test from "node:test";
import urls from "../../src/functions/urls.js";

// getURLObject,
// getPathname,

export default async () => {
	test("Functions: URLs", () => {
		assert.strictEqual(
			urls.getURLObject(`https://chrisburnell.com/about/`).length,
			new URL("https://chrisburnell.com/about/").length,
		);

		assert.strictEqual(
			urls.getPathname(`https://chrisburnell.com/about/`),
			"/about/",
		);
	});
};
