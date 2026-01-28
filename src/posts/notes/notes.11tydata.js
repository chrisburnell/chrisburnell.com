import { notReply } from "../../functions/collections.js";

export default {
	permalink: "note/{{ page.fileSlug }}/",
	category: "note",
	categoryPlural: "notes",
	categoryCode: "n",
	tags: ["categoryNote", "blog"],
	eleventyComputed: {
		tags: (data) => {
			const baseTags = data.tags || [];
			if (notReply({ data })) {
				return [...baseTags, "feature"];
			}
			return baseTags;
		},
	},
};
