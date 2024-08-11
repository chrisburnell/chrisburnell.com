import assert from "node:assert/strict";
import { describe, it } from "node:test";
import utils from "./utils.js";

export default async () => {
	describe("Functions: Utils", () => {
		///
		// TODO
		///

		it("filterOut() should return TODO", () => {
			assert.strictEqual(typeof utils.filterOut, "function");
		});

		it("getMastodonHandle() should return TODO", () => {
			assert.strictEqual(typeof utils.getMastodonHandle, "function");
		});

		it("getTwitterHandle() should return TODO", () => {
			assert.strictEqual(typeof utils.getTwitterHandle, "function");
		});

		it("clamp() should return TODO", () => {
			assert.strictEqual(typeof utils.clamp, "function");
		});

		it("simpleMovingAverage() should return TODO", () => {
			assert.strictEqual(typeof utils.simpleMovingAverage, "function");
		});

		it("exponentialMovingAverage() should return TODO", () => {
			assert.strictEqual(
				typeof utils.exponentialMovingAverage,
				"function",
			);
		});
	});
};
