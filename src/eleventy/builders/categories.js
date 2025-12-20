/**
 * @typedef Category
 * @property {string} title
 * @property {string} [emoji]
 * @property {string} proper
 * @property {string} plural
 * @property {string} properPlural
 * @property {boolean} review
 * @property {boolean} full
 * @property {boolean} masonry
 */

/**
 * @param {import("@11ty/eleventy").CollectionApi} collection
 * @returns {Promise<Array<Category>>}
 */
export default async function (collection) {
	return await collection
		.getFilteredByTag("post")
		// Only select pages with a string-type category
		.filter((item) => {
			return typeof item.data?.category === "string";
		})
		// Remap each page into its category
		.map((item) => {
			return {
				title: item.data.category,
				emoji: item.data.emoji,
				proper:
					"categoryProper" in item.data
						? item.data.categoryProper
						: item.data.category,
				plural:
					"categoryPlural" in item.data
						? item.data.categoryPlural
						: item.data.category,
				properPlural:
					"categoryProperPlural" in item.data
						? item.data.categoryProperPlural
						: "categoryPlural" in item.data
							? item.data.categoryPlural
							: item.data.category,
				review: item.data.mf_root === "review",
				full: "categoryFull" in item.data || "full" in item.data,
				masonry: "categoryMasonry" in item.data,
			};
		})
		// Remove duplicates based on `title`
		.filter((category, index, self) => {
			return (
				index ===
				self.findIndex((t) => {
					return t.title === category.title;
				})
			);
		})
		// Sort based on `title`
		.sort((a, b) => {
			return a.title.localeCompare(b.title, undefined, {
				numeric: true,
				ignorePunctuation: true,
				sensitivity: "base",
			});
		});
}
