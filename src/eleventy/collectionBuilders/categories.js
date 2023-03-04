module.exports = (collection) => {
	let categories = []

	collection
		.getAll()
		.filter((item) => {
			return "category" in item.data
		})
		.forEach((item) => {
			if (typeof item.data.category === "string") {
				let category = {
					title: item.data.category,
					proper: "categoryProper" in item.data ? item.data.categoryProper : item.data.category,
					plural: "categoryPlural" in item.data ? item.data.categoryPlural : item.data.category,
					properPlural: "categoryProperPlural" in item.data ? item.data.categoryProperPlural : "categoryPlural" in item.data ? item.data.categoryPlural : item.data.category,
					review: item.data.mf_root === "review",
				}
				categories.push(category)
			}
		})

	// Remove duplicates based on `title`
	categories = categories.filter((category, index, self) => index === self.findIndex((t) => t.title === category.title))

	// Sort based on `title`
	categories = categories.sort((a, b) => {
		return a.title.localeCompare(b.title)
	})

	return categories
}
