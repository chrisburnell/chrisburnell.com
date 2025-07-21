import { describe, expect, it } from "vitest";
import utils from "./utils.js";

describe("Functions: Utils", () => {
	it("filterOut() should return an array with matches removed", () => {
		expect(
			JSON.stringify(
				utils.filterOut(["alpha", "beta", "gamma"], ["beta"]),
			),
		).toBe(JSON.stringify(["alpha", "gamma"]));
	});

	it("getMastodonHandle() should return the Mastodon handle from a Status URL", () => {
		expect(
			utils.getMastodonHandle(
				"https://fediverse.repc.co/@chrisburnell/109309270041837323",
			),
		).toBe("@chrisburnell@repc.co");
		expect(
			utils.getMastodonHandle("https://social.lol/@flamed/12345"),
		).toBe("@flamed@social.lol");
	});

	it("getTwitterHandle() should return the Twitter handle from a Status URL", () => {
		expect(
			utils.getTwitterHandle(
				"https://twitter.com/iamchrisburnell/status/12345",
			),
		).toBe("@iamchrisburnell");
	});

	it("clamp() should return a number clamped between a minimum and maximum", () => {
		expect(utils.clamp(0, 5, 10)).toBe(5);
		expect(utils.clamp(0, 11, 10)).toBe(10);
		expect(utils.clamp(0, -5, 10)).toBe(0);
	});

	it("simpleMovingAverage() should return an array of numbers", () => {
		expect(
			JSON.stringify(
				utils.simpleMovingAverage(
					[1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144],
					3,
				),
			),
		).toBe(JSON.stringify([1, 1, 2, 3, 5, 8, 14, 22, 36, 59, 96, 116]));
	});

	it("exponentialMovingAverage() should return number based on a number in a sequence", () => {
		expect(utils.exponentialMovingAverage(9001)).toBe(4500.5);
		expect(utils.exponentialMovingAverage(9001, 1)).toBe(4501);
		expect(utils.exponentialMovingAverage(9001, 1, 1.618)).toBe(14563);
	});
});
