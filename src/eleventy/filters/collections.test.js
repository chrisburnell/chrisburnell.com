import assert from "node:assert/strict";
import { describe, it } from "node:test";
import collections from "./collections.js";

export default async () => {
	describe("Filters: Collections", () => {
		it("arePublished() should return an array of items passing the `isPublished()` check", () => {
			assert.strictEqual(
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
				1,
			);
		});

		///
		// TODO
		///

		it("sitemapFilter() should return TODO", () => {
			assert.strictEqual(typeof collections.sitemapFilter, "function");
		});

		it("getCategoryName() should return TODO", () => {
			assert.strictEqual(typeof collections.getCategoryName, "function");
		});

		it("categoryFilter() should return TODO", () => {
			assert.strictEqual(typeof collections.categoryFilter, "function");
		});

		it("tagFilter() should return TODO", () => {
			assert.strictEqual(typeof collections.tagFilter, "function");
		});

		it("noPinnedFilter() should return TODO", () => {
			assert.strictEqual(typeof collections.noPinnedFilter, "function");
		});

		it("pinnedSort() should return TODO", () => {
			assert.strictEqual(typeof collections.pinnedSort, "function");
		});

		it("getCollectionCount() should return TODO", () => {
			assert.strictEqual(
				typeof collections.getCollectionCount,
				"function",
			);
		});

		it("getCollectionCountByYear() should return TODO", () => {
			assert.strictEqual(
				typeof collections.getCollectionCountByYear,
				"function",
			);
		});

		it("getCollectionCountByWeekday() should return TODO", () => {
			assert.strictEqual(
				typeof collections.getCollectionCountByWeekday,
				"function",
			);
		});
	});
};
