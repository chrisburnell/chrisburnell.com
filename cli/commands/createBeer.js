import { postTitle, buildFrontmatter, writeAndOpen } from "../utils.js";
import { input } from "@inquirer/prompts";

export default async (__siteroot) => {
	const date = await input({ message: "Date" });
	const slug = await input({ message: "Slug" });
	const title = await postTitle();
	const author = await input({ message: "Author" });
	const rating = await input({ message: "Rating" });
	const style = await input({ message: "Style" });
	const url = await input({ message: "Beer URL" });

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
