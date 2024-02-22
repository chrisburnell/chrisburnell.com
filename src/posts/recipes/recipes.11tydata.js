import emojis from "../../eleventy/data/emojis.js"

export default {
	mf_root: "recipe",
	mf_property: "recipe-of",
	permalink: "recipe/{{ page.fileSlug }}/",
	category: "recipe",
	categoryPlural: "recipes",
	categoryCode: "d",
	tags: ["recipe", "blog", "feature"],
	emoji: emojis.recipe,
}
