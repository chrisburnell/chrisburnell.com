import fs from "fs-extra"
import { now, postDate, postDescription, postSlug, postSlugDate, postTags, postTitle } from "../utils.js"

export default async (__siteroot) => {
	const title = await postTitle()
	const slug = await postSlug(title)
	const description = await postDescription()
	const tags = await postTags()

	let meta = `---
date: ${postDate}`

	if (title) {
		if (title.match(/[:"#]/g)) {
			meta += `\ntitle: "${title.replace(/"/g, `\\"`)}"`
		} else {
			meta += `\ntitle: ${title}`
		}
	}

	if (description) {
		if (description.match(/[:"#]/g)) {
			meta += `\ndescription: "${description.replace(/"/g, `\\"`)}"`
		} else {
			meta += `\ndescription: ${description}`
		}
	}

	if (tags.length > 0) {
		meta = `${meta}\ntags:\n${tags.map(tag => `  - ${tag}`).join("\n")}`
	}

	meta += `\n---\n`

	fs.writeFileSync(`${__siteroot}/src/posts/notes/${postSlugDate}-${slug || Math.floor(now / 1000)}.md`, meta, { flag: "wx" })
}
