import emojis from "../../eleventy/data/emojis.js"

export default {
	permalink: "recipe/{{ page.fileSlug }}/",
	list: "deck",
	mf_root: "recipe",
	mf_property: "recipe-of",
	category: "recipe",
	categoryPlural: "recipes",
	categoryCode: "d",
	tags: ["recipe", "blog", "feature"],
	emoji: emojis.recipe,
	pre_includes: ["post/recipe.njk"],
}
