import { text } from "@clack/prompts";
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
	const slug = await postSlug(title);
	const description = await postDescription();
	const bookmarkTitle = await text({
		message: "Bookmark · Title",
		default: title,
	});
	const bookmarkURL = await text({ message: "Bookmark · URL" });
	const tags = await postTags();

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
