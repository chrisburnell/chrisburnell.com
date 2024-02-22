import emojis from "../../eleventy/data/emojis.js"

export default {
	list: "shelf",
	mf_root: "review",
	mf_property: "listen-of",
	permalink: "music/{{ page.fileSlug }}/",
	category: "music",
	categoryProper: "music review",
	categoryProperPlural: "music reviews",
	categoryCode: "m",
	tags: ["music", "review"],
	emoji: emojis.music,
}
