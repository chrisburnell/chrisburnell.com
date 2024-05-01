import { categoryFilter, tagFilter } from "../filters/collections.js"

export default function (collection) {
	const allTags = collection
		.getAll()
		// Only select pages with tags
		.filter((item) => {
			return "tags" in item.data
		})
		// Map each page into an array of its tags and filter out categories
		// and ignored tags
		.map((item) => {
			return item.data.tags
		})
		// Condense each array into a single array
		.reduce((singleArray, tagArray) => {
			return [...singleArray, ...tagArray]
		}, [])
		// Remove duplicates
		.filter((tag, index, self) => {
			return (
				index ===
				self.findIndex((t) => {
					return t === tag
				})
			)
		})
		// Sort alphabetically
		.sort((a, b) => {
			return a.localeCompare(b)
		})

	// Filter out categories and ignored tags
	return categoryFilter(tagFilter(allTags))
}
