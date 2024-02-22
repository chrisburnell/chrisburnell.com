import emojis from "../../eleventy/data/emojis.js"

export default {
	permalink: "/book/{{ page.fileSlug }}/index.html",
	category: "book",
	categoryPlural: "books",
	categoryProper: "book review",
	categoryProperPlural: "book reviews",
	categoryCode: "r",
	list: "shelf",
	mf_root: "review",
	mf_property: "read-of",
	tags: ["book", "review"],
	emoji: emojis.book,
}
