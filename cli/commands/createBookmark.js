import { text, isCancel } from "@clack/prompts";
import {
	buildFrontmatter,
	postDate,
	postDescription,
	postSlug,
	postSlugDate,
	postTags,
	postTitle,
	writeAndOpen,
} from "../utils.js";

export default async (__siteroot) => {
	const title = await postTitle();
	if (isCancel(title)) process.exit(0);

	const slug = await postSlug(title);
	if (isCancel(slug)) process.exit(0);

	const description = await postDescription();
	if (isCancel(description)) process.exit(0);

	const bookmarkTitle = await text({
		message: "Bookmark · Title",
		default: title,
	});
	if (isCancel(bookmarkTitle)) process.exit(0);

	const bookmarkURL = await text({ message: "Bookmark · URL" });
	if (isCancel(bookmarkURL)) process.exit(0);

	const tags = await postTags();
	if (isCancel(tags)) process.exit(0);

	const meta = buildFrontmatter({
		date: postDate,
		title,
		description,
		bookmark_of: { title: bookmarkTitle, url: bookmarkURL },
		tags,
	});

	const filepath = `${__siteroot}/src/posts/bookmarks/${postSlugDate}-${slug}.md`;

	writeAndOpen(filepath, meta);
};
