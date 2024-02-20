import emojis from "../../eleventy/data/emojis.js";

export default {
	list: "shelf",
	mf_root: "review",
	mf_property: "play-of",
	permalink: "game/{{ page.fileSlug }}/",
	category: "game",
	categoryProper: "game review",
	categoryPlural: "games",
	categoryProperPlural: "game reviews",
	categoryCode: "g",
	tags: ["game", "review"],
	emoji: emojis.game,
}
