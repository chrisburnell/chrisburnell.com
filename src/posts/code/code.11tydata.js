import emojis from "../../eleventy/data/emojis.js";

export default {
	permalink: "code/{{ page.fileSlug }}/",
	category: "code",
	categoryProper: "code demo",
	categoryProperPlural: "code demos",
	categoryCode: "c",
	tags: ["code", "blog"],
	on_this_day: true,
	emoji: emojis.code,
}
