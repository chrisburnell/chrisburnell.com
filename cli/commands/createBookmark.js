import { group, isCancel, text } from "@clack/prompts";
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
		title: () => postTitle(),
		slug: ({ results }) => postSlug(results.title),
		description: () => postDescription(),
		bookmarkTitle: ({ results }) => text({
			message: "Bookmark · Title",
			default: results.title,
		}),
		bookmarkURL: () => text({ message: "Bookmark · URL" }),
		tags: () => postTags(),
	});
	if (isCancel(post)) process.exit(0);

	const meta = buildFrontmatter({
		date: postDate,
		title: post.title,
		description: post.description,
		bookmark_of: { title: post.bookmarkTitle, url: post.bookmarkURL },
		tags: post.tags.sort(),
	});

	const filepath = `${__siteroot}/src/posts/bookmarks/${postSlugDate}-${post.slug}.md`;

	reviewBox({ filepath, __siteroot, slug: post.slug, postDate, title: post.title, description: post.description, tags: post.tags });

	writeAndOpen(filepath, meta);
};
