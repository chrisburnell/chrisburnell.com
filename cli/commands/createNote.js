import { confirm, isCancel } from "@clack/prompts";
import {
	buildFrontmatter,
	now,
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
	const title = await postTitle(false);
	if (isCancel(title)) process.exit(0);

	const slug = await postSlug(title);
	if (isCancel(slug)) process.exit(0);

	const description = await postDescription();
	if (isCancel(description)) process.exit(0);

	const tags = await postTags();
	if (isCancel(tags)) process.exit(0);

	const isDraft = await confirm({
		message: "Put in the drafts folder?",
	});
	if (isCancel(isDraft)) process.exit(0);

	const meta = buildFrontmatter({
		date: postDate,
		title,
		description,
		tags: tags.sort(),
	});

	const filepath = `${__siteroot}/src/posts/notes/${isDraft ? "drafts/" : ""}${postSlugDate}-${slug}.md`;

	reviewBox({ filepath, __siteroot, slug, postDate, title, description, tags });

	writeAndOpen(filepath, meta);
};
