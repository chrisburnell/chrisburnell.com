import { postTitle, buildFrontmatter, writeAndOpen } from "../utils.js";
import { text } from "@clack/prompts";

export default async (__siteroot) => {
	const date = await text({ message: "Date" });
	const slug = await text({ message: "Slug" });
	const title = await postTitle();
	const author = await text({ message: "Author" });
	const rating = await text({ message: "Rating" });
	const style = await text({ message: "Style" });
	const url = await text({ message: "Beer URL" });

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
