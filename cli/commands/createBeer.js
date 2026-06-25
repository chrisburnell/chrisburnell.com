import { text, isCancel } from "@clack/prompts";
import { postTitle, buildFrontmatter, writeAndOpen } from "../utils.js";

export default async (__siteroot) => {
	const date = await text({ message: "Date" });
	if (isCancel(date)) process.exit(0);

	const slug = await text({ message: "Slug" });
	if (isCancel(slug)) process.exit(0);

	const title = await postTitle();
	if (isCancel(title)) process.exit(0);

	const author = await text({ message: "Author" });
	if (isCancel(author)) process.exit(0);

	const rating = await text({ message: "Rating" });
	if (isCancel(rating)) process.exit(0);

	const style = await text({ message: "Style" });
	if (isCancel(style)) process.exit(0);

	const url = await text({ message: "Beer URL" });
	if (isCancel(url)) process.exit(0);

	const meta = buildFrontmatter({
		date,
		title,
		authors: [author],
		rating,
		style,
		drink_of: url,
		badges: [{ title: "XYZ", id: 12341234 }],
	});

	const filepath = `${__siteroot}/src/posts/beer/${date.split("T")[0]}-${slug}.md`;

	writeAndOpen(filepath, meta);
};
