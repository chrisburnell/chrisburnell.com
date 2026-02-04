import { describe, expect, it } from "vitest";
import collections from "./collections.js";

const past = "2013-06-15T13:21:00+0100";
const future = "9001-06-15T13:21:56+0100";

describe("Filters: Collections", () => {
	it("arePublished() returns an array of items passing the isPublished() check", () => {
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

	it("feedFilter() returns an array excluding no-rss tagged items", () => {
		expect(
			collections.feedFilter([
				{
					url: "https://example.com/a/",
					data: {
						tags: ["categoryArticle"],
					},
				},
				{
					url: "https://example.com/b/",
					data: {
						tags: ["categoryArticle", "no-rss"],
					},
				},
			]).length,
		).toBe(1);
	});

	it("sitemapFilter() returns an array of items that should be included in sitemap", () => {
		expect(
			collections.sitemapFilter([
				{
					url: "https://example.com/a/",
					data: {},
				},
				{
					url: "https://example.com/b/",
					data: {
						excludeFromSitemap: true,
					},
				},
				{
					url: "https://example.com/c/",
					data: {
						sitemap: {
							exclude: true,
						},
					},
				},
				{
					url: "https://example.com/d/",
					data: {
						noindex: true,
					},
				},
			]).length,
		).toBe(1);
	});

	it("getCategoryName() returns a capitalized category name", () => {
		expect(
			collections.getCategoryName({
				category: "article",
			}),
		).toBe("Article");
		expect(
			collections.getCategoryName({
				category: "note",
				categoryProper: "Note",
			}),
		).toBe("Note");
	});

	it("categoryFilter() returns an array with category tags removed", () => {
		const tags = ["categoryArticle", "tag1", "categoryNote", "tag2"];
		const filtered = collections.categoryFilter(tags);
		expect(filtered).toContain("tag1");
		expect(filtered).toContain("tag2");
		expect(filtered).not.toContain("categoryArticle");
		expect(filtered).not.toContain("categoryNote");
	});

	it("tagFilter() returns an array with ignored tags removed", () => {
		const tags = ["tag1", "post", "page", "tag2"];
		const filtered = collections.tagFilter(tags);
		expect(filtered).toContain("tag1");
		expect(filtered).toContain("tag2");
		expect(filtered.length).toBeLessThan(tags.length);
	});

	it("noYearTagFilter() returns an array with year tags removed", () => {
		expect(
			collections.noYearTagFilter(["tag1", "2024", "tag2", "2023"]),
		).toEqual(["tag1", "tag2"]);
	});

	it("noPinnedFilter() returns an array with pinned items removed", () => {
		expect(
			collections.noPinnedFilter([
				{
					data: {
						tags: ["categoryArticle"],
					},
				},
				{
					data: {
						tags: ["categoryArticle", "pinned"],
					},
				},
			]).length,
		).toBe(1);
	});

	it("pinnedSort() sorts pinned items first", () => {
		const items = [
			{
				data: {
					tags: ["categoryArticle"],
				},
			},
			{
				data: {
					tags: ["categoryArticle", "pinned"],
				},
			},
		];
		items.sort(collections.pinnedSort);
		expect(items[0].data.tags).toContain("pinned");
	});

	it("getCollectionCount() returns the count of published items", () => {
		expect(
			collections.getCollectionCount([
				{
					url: "/a/",
				},
				{
					url: "/b/",
					data: {
						draft: true,
					},
				},
			]),
		).toBe(1);
	});

	it("getCollectionCountByYear() returns the count of published items for a specific year", () => {
		expect(
			collections.getCollectionCountByYear(
				[
					{
						url: "/a/",
						data: {
							date: past,
						},
						date: new Date(past),
					},
					{
						url: "/b/",
						data: {
							date: future,
						},
						date: new Date(future),
					},
				],
				2013,
			),
		).toBe(1);
	});

	it("getCollectionCountByWeekday() returns the count of published items for a specific weekday", () => {
		expect(
			collections.getCollectionCountByWeekday(
				[
					{
						url: "/a/",
						data: {
							date: past,
						},
						date: new Date(past),
					},
					{
						url: "/b/",
						data: {
							date: future,
						},
						date: new Date(future),
					},
				],
				"Saturday",
			),
		).toBe(1);
	});

	it("getByUrl() returns an item by its URL", () => {
		const collection = [
			{ url: "/posts/first/", data: { title: "First Post" } },
			{ url: "/posts/second/", data: { title: "Second Post" } },
			{ url: "/about/", data: { title: "About" } },
		];

		expect(collections.getByUrl(collection, "/posts/second/")).toEqual({
			url: "/posts/second/",
			data: { title: "Second Post" },
		});
		expect(collections.getByUrl(collection, "/about/")).toEqual({
			url: "/about/",
			data: { title: "About" },
		});
		expect(
			collections.getByUrl(collection, "/nonexistent/"),
		).toBeUndefined();
	});
});
