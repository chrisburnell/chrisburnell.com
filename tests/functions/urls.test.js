import assert from "node:assert/strict";
import { describe, it } from "node:test";
import urls from "../../src/functions/urls.js";

export default async () => {
	describe("Functions: URLs", () => {
		it("getURLObject() should return a URL object", () => {
			assert.strictEqual(
				urls.getURLObject(`https://chrisburnell.com/about/`).length,
				new URL("https://chrisburnell.com/about/").length,
			);
		});

		it("getPathname() should return a URL’s path", () => {
			assert.strictEqual(
				urls.getPathname(`https://chrisburnell.com/about/`),
				"/about/",
			);
		});
	});
};
