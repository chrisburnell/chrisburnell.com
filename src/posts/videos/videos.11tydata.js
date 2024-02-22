import emojis from "../../eleventy/data/emojis.js"

export default {
	list: "shelf",
	permalink: "video/{{ page.fileSlug }}/",
	category: "video",
	categoryPlural: "videos",
	categoryCode: "v",
	tags: ["video", "blog", "feature"],
	emoji: emojis.video,
}
