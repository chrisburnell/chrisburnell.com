import emojis from "../../eleventy/data/emojis.js";

export default {
	permalink: "/like/{{ page.fileSlug }}/index.html",
	category: "like",
	categoryPlural: "likes",
	categoryCode: "f",
	tags: ["like", "clickthrough"],
	excludeFromSearch: true,
	emoji: emojis.heart,
}
