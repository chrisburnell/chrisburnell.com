import assert from "node:assert/strict";
import { describe, it } from "node:test";
import utils from "./utils.js";

export default async () => {
	describe("Functions: Utils", () => {
		it("filterOut() should return an array with matches removed", () => {
			assert.strictEqual(
				JSON.stringify(
					utils.filterOut(["alpha", "beta", "gamma"], ["beta"]),
				),
				JSON.stringify(["alpha", "gamma"]),
			);
		});

		it("getMastodonHandle() should return the Mastodon handle from a Status URL", () => {
			assert.strictEqual(
				utils.getMastodonHandle(
					"https://fediverse.repc.co/@chrisburnell/109309270041837323",
				),
				"@chrisburnell@repc.co",
			);
			assert.strictEqual(
				utils.getMastodonHandle("https://social.lol/@flamed/12345"),
				"@flamed@social.lol",
			);
		});

		it("getTwitterHandle() should return the Twitter handle from a Status URL", () => {
			assert.strictEqual(
				utils.getTwitterHandle(
					"https://twitter.com/iamchrisburnell/status/12345",
				),
				"@iamchrisburnell",
			);
		});

		it("clamp() should return a number clamped between a minimum and maximum", () => {
			assert.strictEqual(utils.clamp(0, 5, 10), 5);
			assert.strictEqual(utils.clamp(0, 11, 10), 10);
			assert.strictEqual(utils.clamp(0, -5, 10), 0);
		});

		it("simpleMovingAverage() should return an array of numbers", () => {
			assert.strictEqual(
				JSON.stringify(
					utils.simpleMovingAverage(
						[1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144],
						3,
					),
				),
				JSON.stringify([1, 1, 2, 3, 5, 8, 14, 22, 36, 59, 96, 116]),
			);
		});

		it("exponentialMovingAverage() should return number based on a number in a sequence", () => {
			assert.strictEqual(utils.exponentialMovingAverage(9001), 4500.5);
			assert.strictEqual(utils.exponentialMovingAverage(9001, 1), 4501);
			assert.strictEqual(
				utils.exponentialMovingAverage(9001, 1, 1.618),
				14563,
			);
		});
	});
};
