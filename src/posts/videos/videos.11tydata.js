import emojis from "../../eleventy/data/emojis.js"

export default {
	permalink: "video/{{ page.fileSlug }}/",
	list: "shelf",
	category: "video",
	categoryPlural: "videos",
	categoryCode: "v",
	tags: ["video", "blog", "feature"],
	emoji: emojis.video,
}
