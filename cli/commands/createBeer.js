import { input } from "@inquirer/prompts";
import fs from "fs-extra";
import { postTitle } from "../utils.js";

export default async (__siteroot) => {
	const date = await input({ message: "Date" });
	const slug = await input({ message: "Slug" });
	const title = await postTitle();
	const author = await input({ message: "Author" });
	const rating = await input({ message: "Rating" });
	const style = await input({ message: "Style" });
	const url = await input({ message: "URL" });

	let meta = `---
date: ${date}
title: "${title}"
authors:
  - "${author}"
rating: ${rating}
style: "${style}"
drink_of: ${url}
badges:
  - title: "XYZ"
    id: 12341234`;

	meta += `\n---\n`;

	const postSlugDate = date.split("T")[0];

	fs.writeFileSync(
		`${__siteroot}/src/posts/beer/${postSlugDate}-${slug}.md`,
		meta,
		{ flag: "wx" },
	);
};
