import { text, isCancel } from "@clack/prompts";
import {
	buildFrontmatter,
	now,
	postDate,
	postSlugDate,
	postTags,
	writeAndOpen,
} from "../utils.js";

export default async (__siteroot) => {
	const likeTitle = await text({ message: "Like · Title" });
	if (isCancel(likeTitle)) process.exit(0);

	const likeURL = await text({ message: "Like · URL" });
	if (isCancel(likeURL)) process.exit(0);

	const likeAuthorName = await text({ message: "Like · Author Name" });
	if (isCancel(likeAuthorName)) process.exit(0);

	const likeAuthorURL = await text({ message: "Like · Author URL" });
	if (isCancel(likeAuthorURL)) process.exit(0);

	const tags = await postTags();
	if (isCancel(tags)) process.exit(0);

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
		tags: tags.sort(),
	});

	const filepath = `${__siteroot}/src/posts/likes/${postSlugDate}-${Math.floor(now / 1000)}.md`;

	writeAndOpen(filepath, meta);
};
