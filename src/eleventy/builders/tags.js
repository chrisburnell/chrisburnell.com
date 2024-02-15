import ignoredTags from "../../data/ignoredTags.js"
import categories from "./categories.js"

export default function (collection) {
	const categoriesCollection = categories(collection)

	return collection
		.getAll()
		// Only select pages with tags
		.filter((item) => {
			return "tags" in item.data
		})
		// Remap each page into its tags
		.map((item) => {
			return item.data.tags.filter((tag) => {
				return !ignoredTags.includes(tag) && !categoriesCollection.map((category) => category.title).includes(tag)
			})
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
		// Sort
		.sort((a, b) => {
			return a.localeCompare(b)
		})
}
