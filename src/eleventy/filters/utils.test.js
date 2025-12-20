import { describe, expect, it } from "vitest";
import utils from "./utils.js";

describe("Filters: Utils", () => {
	it("minDecimals() returns a number with minimum decimal places", () => {
		expect(utils.minDecimals(1, 2)).toBe(1);
		expect(utils.minDecimals(1, 2, false)).toBe("1.00");
	});

	it("maxDecimals() returns a number with maximum decimal places", () => {
		expect(utils.maxDecimals(1.23456, 2)).toBe(1.23);
		expect(utils.maxDecimals(1.23456, 2, false)).toBe("1.23");
	});

	it("setDecimals() returns a number with exact decimal places", () => {
		expect(utils.setDecimals(1.5, 2)).toBe(1.5);
		expect(utils.setDecimals(1.5, 2, false)).toBe("1.50");
	});

	it("padWithZeroes() returns a zero-padded number string", () => {
		expect(utils.padWithZeroes(5, 3)).toBe("005");
		expect(utils.padWithZeroes(42, 2)).toBe("42");
	});

	it("modulo() returns the remainder of division", () => {
		expect(utils.modulo(10, 3)).toBe(1);
		expect(utils.modulo(8, 4)).toBe(0);
	});

	it("keyValue() returns a nested value from an object using dot notation", () => {
		const obj = { data: { title: "Test", nested: { value: 42 } } };
		expect(utils.keyValue(obj, "data.title")).toBe("Test");
		expect(utils.keyValue(obj, "data.nested.value")).toBe(42);
	});

	it("keyValueEquals() checks if nested key equals value", () => {
		const obj = { data: { title: "Test" } };
		expect(utils.keyValueEquals(obj, "data.title", "Test")).toBe(true);
		expect(utils.keyValueEquals(obj, "data.title", "test", false)).toBe(
			true,
		);
		expect(utils.keyValueEquals(obj, "data.title", "Other")).toBe(false);
	});

	it("arrayKeyValueEquals() filters array by nested key value", () => {
		const items = [
			{ data: { category: "article" } },
			{ data: { category: "note" } },
			{ data: { category: "article" } },
		];
		const filtered = utils.arrayKeyValueEquals(
			items,
			"data.category",
			"article",
		);
		expect(filtered.length).toBe(2);
		expect(filtered[0].data.category).toBe("article");
	});

	it("arrayKeyIncludes() filters array where nested key includes value", () => {
		const items = [
			{ data: { tags: ["javascript", "web"] } },
			{ data: { tags: ["python", "api"] } },
			{ data: { tags: ["javascript", "node"] } },
		];
		const filtered = utils.arrayKeyIncludes(
			items,
			"data.tags",
			"javascript",
		);
		expect(filtered.length).toBe(2);
	});

	it("arrayKeySet() filters array where nested key is truthy", () => {
		const items = [
			{ data: { draft: true } },
			{ data: {} },
			{ data: { draft: false } },
		];
		const filtered = utils.arrayKeySet(items, "data.draft");
		expect(filtered.length).toBe(1);
		expect(filtered[0].data.draft).toBe(true);
	});

	it("arrayKeyNotSet() filters array where nested key is falsy", () => {
		const items = [
			{ data: { draft: true } },
			{ data: {} },
			{ data: { draft: false } },
		];
		const filtered = utils.arrayKeyNotSet(items, "data.draft");
		expect(filtered.length).toBe(2);
	});

	it("keySort() sorts array by nested key value", () => {
		const items = [
			{ data: { title: "Zebra" } },
			{ data: { title: "Apple" } },
			{ data: { title: "Mango" } },
		];
		const sorted = utils.keySort(items.slice(), "data.title");
		expect(sorted[0].data.title).toBe("Apple");
		expect(sorted[2].data.title).toBe("Zebra");
	});

	it("toArray() converts value to array", () => {
		expect(utils.toArray("test")).toEqual(["test"]);
		expect(utils.toArray(["test"])).toEqual(["test"]);
	});

	it("toNearest() rounds to nearest multiple", () => {
		expect(utils.toNearest(23, 5)).toBe(25);
		expect(utils.toNearest(23, 5, true)).toBe(20);
		expect(utils.toNearest(27, 10)).toBe(30);
	});

	it("rangeMap() maps value from one range to another", () => {
		expect(utils.rangeMap(5, 0, 10, 0, 100, 0)).toBe("50");
		expect(utils.rangeMap(2.5, 0, 10, 0, 100, 1)).toBe("25.0");
	});

	it("stringToPercent() converts fraction string to percentage", () => {
		expect(utils.stringToPercent("1/2")).toBe(50);
		expect(utils.stringToPercent("3/4", 2)).toBe(75);
	});

	it("getRGB() converts hex color to RGB array", () => {
		expect(utils.getRGB("#ff0000")).toEqual([255, 0, 0]);
		expect(utils.getRGB("#00ff00")).toEqual([0, 255, 0]);
	});

	it("limit() returns first n items from array", () => {
		const items = [1, 2, 3, 4, 5];
		expect(utils.limit(items, 3)).toEqual([1, 2, 3]);
		expect(utils.limit(items, 10).length).toBe(5);
	});

	it("isString() checks if value is a string", () => {
		expect(utils.isString("test")).toBe(true);
		expect(utils.isString(123)).toBe(false);
		expect(utils.isString(null)).toBe(false);
	});

	it("getPagefindWeight() calculates search weight with three-tiered priority", () => {
		expect(utils.getPagefindWeight({ data: { searchWeight: 2.5 } })).toBe(
			2.5,
		);

		expect(utils.getPagefindWeight({ data: { rank: { hot: 1 } } })).toBe(
			Math.log2(11),
		);
		expect(
			utils.getPagefindWeight({ data: { rank: { popular: 3 } } }),
		).toBe(Math.log2(9));

		expect(
			utils.getPagefindWeight({ data: { searchCollectionWeight: 1.8 } }),
		).toBe(1.8);

		expect(utils.getPagefindWeight({ data: {} })).toBe(null);
	});
});
