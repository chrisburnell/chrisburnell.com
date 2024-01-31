export default function (collection) {
	return (
		collection
			.getAll()
			// Only select pages with a string-type category
			.filter((item) => {
				return typeof item.data?.category === "string"
			})
			// Remap each page into its category
			.map((item) => {
				return {
					title: item.data.category,
					emoji: item.data.emoji,
					proper: "categoryProper" in item.data ? item.data.categoryProper : item.data.category,
					plural: "categoryPlural" in item.data ? item.data.categoryPlural : item.data.category,
					properPlural: "categoryProperPlural" in item.data ? item.data.categoryProperPlural : "categoryPlural" in item.data ? item.data.categoryPlural : item.data.category,
					review: item.data.mf_root === "review",
				}
			})
			// Remove duplicates based on `title`
			.filter((category, index, self) => {
				return (
					index ===
					self.findIndex((t) => {
						return t.title === category.title
					})
				)
			})
			// Sort based on `title`
			.sort((a, b) => {
				return a.title.localeCompare(b.title)
			})
	)
}
