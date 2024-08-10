import assert from "node:assert/strict";
import { describe, it } from "node:test";
import strings from "./strings.js";

export default async () => {
	describe("Functions: Strings", () => {
		it("capitalize() should return a capitalized string", () => {
			assert.strictEqual(
				strings.capitalize("lorem ipsum"),
				"Lorem Ipsum",
			);
		});

		it("stripHTML() should return a string with HTML tags stripped", () => {
			assert.strictEqual(
				strings.stripHTML("<p>lorem ipsum</p>"),
				"lorem ipsum",
			);
		});

		it("numberNthFormat() should return a sequence-based English variant of a number", () => {
			assert.strictEqual(strings.numberNthFormat(1), "first");
			assert.strictEqual(strings.numberNthFormat(20), "twentieth");
			assert.strictEqual(strings.numberNthFormat(21), "twenty-first");
		});
	});
};
