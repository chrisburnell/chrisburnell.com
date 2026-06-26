import { group, isCancel, text } from "@clack/prompts";
import { postTitle, buildFrontmatter, reviewBox, writeAndOpen } from "../utils.js";

export default async (__siteroot) => {
	const post = await group({
		date: () => text({ message: "Date" }),
		slug: () => text({ message: "Slug" }),
		title: () => postTitle(),
		author: () => text({ message: "Author" }),
		rating: () => text({ message: "Rating" }),
		style: () => text({ message: "Style" }),
		url: () => text({ message: "Beer URL" }),
	});
	if (isCancel(post)) process.exit(0);

	const meta = buildFrontmatter({
		date: post.date,
		title: post.title,
		authors: [post.author],
		rating: post.rating,
		style: post.style,
		drink_of: post.url,
		badges: [{ title: "XYZ", id: 12341234 }],
	});

	const filepath = `${__siteroot}/src/posts/beer/${date.split("T")[0]}-${post.slug}.md`;

	reviewBox({ filepath, __siteroot, slug: post.slug, postDate, title: post.title });

	writeAndOpen(filepath, meta);
};
