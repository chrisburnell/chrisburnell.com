import emojis from "../../eleventy/data/emojis.js"

export default {
	permalink: "bookmark/{{ page.fileSlug }}/",
	list: "deck",
	mf_property: "bookmark-of",
	category: "bookmark",
	categoryPlural: "bookmarks",
	categoryCode: "h",
	tags: ["bookmark", "clickthrough"],
	excludeFromSearch: true,
	emoji: emojis.bookmark,
}
