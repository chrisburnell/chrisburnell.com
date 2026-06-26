import { group, isCancel } from "@clack/prompts";
import {
	buildFrontmatter,
	postDate,
	postDescription,
	postSlug,
	postSlugDate,
	postTags,
	postTitle,
	reviewBox,
	writeAndOpen,
} from "../utils.js";

export default async (__siteroot) => {
	const post = await group({
		title: () => postTitle(false),
		slug: ({ results }) => postSlug(results.title),
		description: () => postDescription(),
		tags: () => postTags(),
		isDraft: () => postDraft(),
	});
	if (isCancel(post)) process.exit(0);

	const meta = buildFrontmatter({
		date: postDate,
		title: post.title,
		description: post.description,
		tags: post.tags.sort(),
	});

	const filepath = `${__siteroot}/src/posts/notes/${post.isDraft ? "drafts/" : ""}${postSlugDate}-${post.slug}.md`;

	reviewBox({ filepath, __siteroot, slug: post.slug, postDate, title: post.title, description: post.description, tags: post.tags });

	writeAndOpen(filepath, meta);
};
