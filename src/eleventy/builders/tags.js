import { categoryFilter, tagFilter } from "../filters/collections.js";

/**
 * @param {import("@11ty/eleventy").CollectionApi} collection
 * @returns {Promise<Array<string>>}
 */
export default async function (collection) {
	// Combine pages and posts, but exclude stats.njk to avoid circular dependency
	const pages = collection.getFilteredByTag("page").filter((item) => {
		return item.fileSlug !== "stats";
	});
	const posts = collection.getFilteredByTag("post");
	const allItems = [...pages, ...posts];

	const allTags = await allItems
		// Only select pages with tags
		.filter((item) => {
			return "tags" in item.data;
		})
		// Map each page into an array of its tags and filter out categories
		// and ignored tags
		.map((item) => {
			return item.data.tags;
		})
		// Condense each array into a single array
		.reduce((singleArray, tagArray) => {
			return [...singleArray, ...tagArray];
		}, [])
		// Remove duplicates
		.filter((tag, index, self) => {
			return (
				index ===
				self.findIndex((t) => {
					return t === tag;
				})
			);
		})
		// Sort alphabetically
		.sort((a, b) => {
			return a.localeCompare(b, undefined, {
				numeric: true,
				ignorePunctuation: true,
				sensitivity: "base",
			});
		});

	// Filter out categories and ignored tags
	return categoryFilter(tagFilter(allTags));
}
