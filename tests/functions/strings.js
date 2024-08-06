import assert from "node:assert";
import test from "node:test";
import strings from "../../src/functions/strings.js";

export default async () => {
	test("Functions: Strings", () => {
		assert.strictEqual(strings.capitalize("lorem ipsum"), "Lorem Ipsum");

		assert.strictEqual(
			strings.stripHTML("<p>lorem ipsum</p>"),
			"lorem ipsum",
		);

		assert.strictEqual(strings.numberNthFormat(1), "first");
		assert.strictEqual(strings.numberNthFormat(20), "twentieth");
		assert.strictEqual(strings.numberNthFormat(21), "twenty-first");
	});
};
