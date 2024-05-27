import emojis from "../../eleventy/data/emojis.js"

export default {
	permalink: "music/{{ page.fileSlug }}/",
	list: "shelf",
	full: true,
	shelfAlignment: "square",
	mf_root: "review",
	mf_property: "listen-of",
	category: "music",
	categoryProper: "music review",
	categoryProperPlural: "music reviews",
	categoryCode: "m",
	tags: ["music", "review"],
	emoji: emojis.music,
	post_includes: ["post/listen-of.njk"],
}
