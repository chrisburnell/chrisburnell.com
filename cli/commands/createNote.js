import {
	buildFrontmatter,
	now,
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
	const tags = await postTags();

	const meta = buildFrontmatter({
		date: postDate,
		title,
		description,
		tags,
	});

	const filepath = `${__siteroot}/src/posts/notes/drafts/${postSlugDate}-${slug || Math.floor(now / 1000)}.md`;

	writeAndOpen(filepath, meta);
};
