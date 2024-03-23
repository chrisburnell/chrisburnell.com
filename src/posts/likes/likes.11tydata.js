import emojis from "../../eleventy/data/emojis.js"

export default {
	permalink: "/like/{{ page.fileSlug }}/index.html",
	list: "deck",
	mf_property: "like-of",
	category: "like",
	categoryPlural: "likes",
	categoryCode: "f",
	tags: ["like", "clickthrough"],
	excludeFromSearch: true,
	emoji: emojis.heart,
}
