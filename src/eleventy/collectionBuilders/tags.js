const ignoredTags = require("#data/ignoredTags")
const categoriesMap = require("#builders/categories")

module.exports = (collection) => {
	let tagSet = new Set()
	let categories = categoriesMap(collection)

	collection
		.getAll()
		.filter((item) => {
			return "tags" in item.data
		})
		.filter((item) => {
			return Object.values(item.data.tags).indexOf("post") > -1
		})
		.forEach((item) => {
			let tags = item.data.tags

			tags = tags.filter((item) => {
				if (ignoredTags.includes(item)) {
					return false
				}
				for (let category of categories) {
					if (item == category.title) {
						return false
					}
				}
				return true
			})

			for (const tag of tags) {
				tagSet.add(tag)
			}
		})

	return [...tagSet]
}
