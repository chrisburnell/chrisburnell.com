import {
	postDate,
	postDescription,
	postSlug,
	postSlugDate,
	postTags,
	postTitle,
	buildFrontmatter,
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

	const filepath = `${__siteroot}/src/posts/articles/drafts/${postSlugDate}-${slug}.md`;

	writeAndOpen(filepath, meta);
};
