import emojis from "../../eleventy/data/emojis.js";

export default {
	permalink: "talk/{{ page.fileSlug }}/",
	category: "talk",
	categoryPlural: "talks",
	categoryCode: "t",
	tags: ["talk", "blog", "feature"],
	emoji: emojis.talk,
}
