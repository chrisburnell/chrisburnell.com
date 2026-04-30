import { input } from "@inquirer/prompts";
import {
	buildFrontmatter,
	now,
	postDate,
	postSlugDate,
	postTags,
	writeAndOpen,
} from "../utils.js";

export default async (__siteroot) => {
	const likeTitle = await input({ message: "Like · Title" });
	const likeURL = await input({ message: "Like · URL" });
	const likeAuthorName = await input({ message: "Like · Author Name" });
	const likeAuthorURL = await input({ message: "Like · Author URL" });
	const tags = await postTags();

	const meta = buildFrontmatter({
		date: postDate,
		like_of: {
			title: likeTitle,
			url: likeURL,
			authors: [
				{
					title: likeAuthorName,
					url: likeAuthorURL,
				},
			],
		},
		tags,
	});

	const filepath = `${__siteroot}/src/posts/likes/${postSlugDate}-${Math.floor(now / 1000)}.md`;

	writeAndOpen(filepath, meta);
};
