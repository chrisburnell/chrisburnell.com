import emojis from "../../eleventy/data/emojis.js"

export default {
	permalink: "code/{{ page.fileSlug }}/",
	list: "deck",
	category: "code",
	categoryProper: "code demo",
	categoryProperPlural: "code demos",
	categoryCode: "c",
	tags: ["code", "blog"],
	emoji: emojis.code,
}
