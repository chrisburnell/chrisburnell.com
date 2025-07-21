import { describe, expect, it } from "vitest";
import collections from "./collections.js";

describe("Filters: Collections", () => {
	it("arePublished() should return an array of items passing the `isPublished()` check", () => {
		expect(
			collections.arePublished([
				{
					url: "https://example.com/a/",
				},
				{
					url: "https://example.com/b/",
					data: {
						draft: true,
					},
				},
			]).length,
		).toBe(1);
	});

	///
	// TODO
	///

	it("sitemapFilter() should return TODO", () => {
		expect(typeof collections.sitemapFilter).toBe("function");
	});

	it("getCategoryName() should return TODO", () => {
		expect(typeof collections.getCategoryName).toBe("function");
	});

	it("categoryFilter() should return TODO", () => {
		expect(typeof collections.categoryFilter).toBe("function");
	});

	it("tagFilter() should return TODO", () => {
		expect(typeof collections.tagFilter).toBe("function");
	});

	it("noPinnedFilter() should return TODO", () => {
		expect(typeof collections.noPinnedFilter).toBe("function");
	});

	it("pinnedSort() should return TODO", () => {
		expect(typeof collections.pinnedSort).toBe("function");
	});

	it("getCollectionCount() should return TODO", () => {
		expect(typeof collections.getCollectionCount).toBe("function");
	});

	it("getCollectionCountByYear() should return TODO", () => {
		expect(typeof collections.getCollectionCountByYear).toBe("function");
	});

	it("getCollectionCountByWeekday() should return TODO", () => {
		expect(typeof collections.getCollectionCountByWeekday).toBe("function");
	});
});
