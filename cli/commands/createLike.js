import { group, text, isCancel } from "@clack/prompts";
import {
	buildFrontmatter,
	epoch,
	now,
	postDate,
	postSlugDate,
	postTags,
	reviewBox,
	writeAndOpen,
	goodbye,
} from "../utils.js";

export default async (__siteroot) => {
	const post = await group({
		likeTitle: () => text({ message: "Like · Title" }),
		likeURL: () => text({ message: "Like · URL" }),
		likeAuthorName: () => text({ message: "Like · Author Name" }),
		likeAuthorURL: () => text({ message: "Like · Author URL" }),
		tags: () => postTags(),
	});
	if (isCancel(post)) {
		goodbye();
	}

	const meta = buildFrontmatter({
		date: postDate,
		like_of: {
			title: post.likeTitle,
			url: post.likeURL,
			authors: [
				{
					title: post.likeAuthorName,
					url: post.likeAuthorURL,
				},
			],
		},
		tags: post.tags.sort(),
	});

	const filepath = `${__siteroot}/src/posts/likes/${postSlugDate}-${epoch}.md`;

	reviewBox({ filepath, __siteroot, slug: post.slug, postDate, title: post.likeTitle, tags: post.tags });

	writeAndOpen(filepath, meta);
};
