import emojis from "../../eleventy/data/emojis.js"

export default {
	permalink: "beer/{{ page.fileSlug }}/",
	list: "shelf",
	mf_root: "review",
	mf_property: "pk-drank",
	category: "beer",
	categoryProper: "beer review",
	categoryProperPlural: "beer reviews",
	categoryCode: "b",
	tags: ["beer", "review"],
	emoji: emojis.beer,
}
