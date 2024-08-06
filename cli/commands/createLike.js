import { input } from "@inquirer/prompts";
import fs from "fs-extra";
import { now, postDate, postSlugDate, postTags } from "../utils.js";

export default async (__siteroot) => {
	const likeTitle = await input({ message: "Like · Title" });
	const likeURL = await input({ message: "Like · URL" });
	const likeAuthorName = await input({ message: "Like · Author Name" });
	const likeAuthorURL = await input({ message: "Like · Author URL" });
	const tags = await postTags();

	let meta = `---
date: ${postDate}
like_of:`;

	if (likeTitle) {
		meta += `\n  title: ${likeTitle}`;
	}
	meta += `\n  url: ${likeURL}`;

	if (likeAuthorName || likeAuthorURL) {
		meta += `\n  authors:\n    - `;
		if (likeAuthorName) {
			meta += `title: ${likeAuthorName}`;
		}
		if (likeAuthorURL) {
			if (likeAuthorName) {
				meta += "\n      ";
			}
			meta += `url: ${likeAuthorURL}`;
		}
	}

	if (tags.length > 0) {
		meta = `${meta}\ntags:\n${tags.map((tag) => `  - ${tag}`).join("\n")}`;
	}

	meta += `\n---\n`;

	fs.writeFileSync(
		`${__siteroot}/src/posts/likes/${postSlugDate}-${Math.floor(now / 1000)}.md`,
		meta,
		{ flag: "wx" },
	);
};
