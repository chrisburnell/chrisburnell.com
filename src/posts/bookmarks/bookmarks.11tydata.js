import emojis from "../../eleventy/data/emojis.js"

export default {
	mf_property: "bookmark-of",
	permalink: "bookmark/{{ page.fileSlug }}/",
	category: "bookmark",
	categoryPlural: "bookmarks",
	categoryCode: "h",
	tags: ["bookmark", "clickthrough"],
	excludeFromSearch: true,
	emoji: emojis.bookmark,
}
