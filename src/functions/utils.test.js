import { describe, expect, it } from "vitest";
import utils from "./utils.js";

describe("Functions: Utils", () => {
	it("filterOut() returns an array with matches removed", () => {
		expect(
			JSON.stringify(
				utils.filterOut(["alpha", "beta", "gamma"], ["beta"]),
			),
		).toBe(JSON.stringify(["alpha", "gamma"]));
	});

	it("getMastodonHandle() returns the Mastodon handle from a Status URL", () => {
		expect(
			utils.getMastodonHandle(
				"https://fediverse.repc.co/@chrisburnell/109309270041837323",
			),
		).toBe("@chrisburnell@repc.co");
		expect(
			utils.getMastodonHandle("https://social.lol/@flamed/12345"),
		).toBe("@flamed@social.lol");
	});

	it("getTwitterHandle() returns the Twitter handle from a Status URL", () => {
		expect(
			utils.getTwitterHandle(
				"https://twitter.com/iamchrisburnell/status/12345",
			),
		).toBe("@iamchrisburnell");
	});

	it("clamp() returns a number clamped between a minimum and maximum", () => {
		expect(utils.clamp(0, 5, 10)).toBe(5);
		expect(utils.clamp(0, 11, 10)).toBe(10);
		expect(utils.clamp(0, -5, 10)).toBe(0);
	});

	it("simpleMovingAverage() returns an array of moving averages", () => {
		expect(
			JSON.stringify(
				utils.simpleMovingAverage(
					[1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144],
					3,
				),
			),
		).toBe(JSON.stringify([1, 1, 2, 3, 5, 8, 14, 22, 36, 59, 96, 116]));
	});

	it("exponentialMovingAverage() returns an exponential moving average", () => {
		expect(utils.exponentialMovingAverage(9001)).toBe(4500.5);
		expect(utils.exponentialMovingAverage(9001, 1)).toBe(4501);
		expect(utils.exponentialMovingAverage(9001, 1, 1.618)).toBe(14563);
	});
});
