import { checkbox, input } from "@inquirer/prompts"
import select from "@inquirer/select"
import slugify from "@sindresorhus/slugify"
import fs from "fs-extra"
import { DateTime } from "luxon"

export default async (__siteroot) => {
	const title = await input({ message: "Post title" })
	const slug = await input({ message: "Post slug", default: slugify(title) })
	const category = await select({
		message: "What category is this post a part of?",
		choices: [
			{
				name: "Article",
				value: "articles",
			},
			// {
			// 	name: "Beer Review",
			// 	value: "beer",
			// },
			{
				name: "Book Review",
				value: "books",
			},
			{
				name: "Bookmark",
				value: "bookmarks",
			},
			{
				name: "Code Demo",
				value: "code",
			},
			{
				name: "Game Review",
				value: "games",
			},
			{
				name: "Like",
				value: "likes",
			},
			{
				name: "Music Review",
				value: "music",
			},
			{
				name: "Note",
				value: "notes",
			},
			{
				name: "Recipe",
				value: "recipes",
			},
			{
				name: "Talk",
				value: "talks",
			},
		],
	})
	const tags = await checkbox({
		message: "Tags",
		choices: [
			{ value: "accessibility" },
			{ value: "ai" },
			{ value: "art" },
			{ value: "blog" },
			{ value: "bushcraft" },
			{ value: "calculator" },
			{ value: "canvas" },
			{ value: "color" },
			{ value: "conference" },
			{ value: "css" },
			{ value: "css-variables" },
			{ value: "design-systems" },
			{ value: "developer-relations" },
			{ value: "eleventy" },
			{ value: "feature" },
			{ value: "game-dev" },
			{ value: "github" },
			{ value: "html" },
			{ value: "indieweb" },
			{ value: "javascript" },
			{ value: "jekyll" },
			{ value: "liquid" },
			{ value: "meetup" },
			{ value: "motion" },
			{ value: "nunjucks" },
			{ value: "performance" },
			{ value: "personal" },
			{ value: "pinned" },
			{ value: "photo" },
			{ value: "php" },
			{ value: "rss-only" },
			{ value: "scss" },
			{ value: "sotb" },
			{ value: "state-of-the-web" },
			{ value: "svg" },
			{ value: "ux" },
			{ value: "virtual" },
			{ value: "vim" },
			{ value: "web-components" },
			{ value: "weblogpomo" },
			{ value: "weblogpomo2024" },
			{ value: "writing" },
		],
	})

	const now = DateTime.now()
	const slugDate = now.toISO().split("T")[0]
	const postDate = now.toFormat("yyyy-MM-dd'T'HH:mm:ssZZ").replace(/(-|\+)(\d{2}):(\d{2})/g, "$1$2$3")

	let meta = `---
date: ${postDate}
title: "${title}"
description: TODO`

	if (tags.length > 0) {
		meta = `${meta}\ntags:\n${tags.map(tag => `  - ${tag}`).join("\n")}`
	}

	meta += `\n---`

	fs.writeFileSync(`${__siteroot}/src/posts/${category}/${slugDate}-${slug}.md`, meta, { flag: "wx" })
}
