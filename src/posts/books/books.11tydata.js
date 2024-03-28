import emojis from "../../eleventy/data/emojis.js"

export default {
	permalink: "/book/{{ page.fileSlug }}/index.html",
	list: "shelf",
	wide: true,
	shelfAlignment: "portrait",
	mf_root: "review",
	mf_property: "read-of",
	category: "book",
	categoryPlural: "books",
	categoryProper: "book review",
	categoryProperPlural: "book reviews",
	categoryCode: "r",
	tags: ["book", "review"],
	emoji: emojis.book,
}
