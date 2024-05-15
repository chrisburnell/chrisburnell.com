import { input } from "@inquirer/prompts"
import fs from "fs-extra"
import { postDate, postDescription, postSlug, postSlugDate, postTags, postTitle } from "../utils.js"

export default async (__siteroot) => {
	const title = await postTitle()
	const slug = await postSlug(title)
	const description = await postDescription()
	const bookmarkTitle = await input({ message: "Bookmark · Title", default: title })
	const bookmarkURL = await input({ message: "Bookmark · URL" })
	const tags = await postTags()

	let meta = `---
date: ${postDate}
title: "${title}"
description: ${description || "TODO"}
bookmark_of:
  title: ${bookmarkTitle}
  url: ${bookmarkURL}`

	if (tags.length > 0) {
		meta = `${meta}\ntags:\n${tags.map(tag => `  - ${tag}`).join("\n")}`
	}

	meta += `\n---\n`

	fs.writeFileSync(`${__siteroot}/src/posts/bookmarks/${postSlugDate}-${slug}.md`, meta, { flag: "wx" })
}
