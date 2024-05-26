// Adapted from Robb Knight’s work:
// https://github.com/rknightuk/rknight.me

import select from "@inquirer/select"
import chalk from "chalk"
import { program } from "commander"
import path from "path"
import { fileURLToPath } from "url"

import createArticle from "./commands/createArticle.js"
import createBookmark from "./commands/createBookmark.js"
import createLike from "./commands/createLike.js"
import createNote from "./commands/createNote.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const __siteroot = __dirname.replace("/cli", "")

const wizard = async () => {
	console.log(chalk.hex("#5f8aa6") `
                        ░█░█
  ██░░░░░█░             █████
   ░▓▓██▓███▓█░       ██▒░▓███
     ░░█▓▒██▓░░█░   █▓░██▓██▓██░░
      ░█░███▓▓██░█░█▓███░░█▓██░█
        ░░▒██▓░▒█░██▓███▓▓██▓░
           ░░▓██████▒█▓▒▓▒░░
             ░███▓▒▓▒░░▓▓░░░
 ▒█▒▓▒▓▓▓▓▓██▓▓░░▓░░▓▒░███▒░
  ░▓███▓██░▒▒░░▒██▒▓█     █▒
      ░██▒░░░██░▒▓█░       ░
              ░▒█▓░░▓█░
               ░▒▓░░▒░░░
`)

	const type = await select({
		message: "What do you want to do?",
		choices: [
			{
				name: "Create: Article",
				value: "article",
				description: "Create a new Article",
			},
			{
				name: "Create: Bookmark",
				value: "bookmark",
				description: "Create a new Bookmark",
			},
			{
				name: "Create: Like",
				value: "like",
				description: "Create a new Like",
			},
			{
				name: "Create: Note",
				value: "note",
				description: "Create a new Note",
			},
		],
	})

	switch (type) {
		case "article":
			createArticle(__siteroot)
			break
		case "bookmark":
			createBookmark(__siteroot)
			break
		case "like":
			createLike(__siteroot)
			break
		case "note":
			createNote(__siteroot)
			break
	}
}

program
	.command("wizard")
	.description("🧙 Speak, friend, and enter")
	.action(() => wizard())

program
	.command("article")
	.description("📝 Create a new Article")
	.action(() => createArticle(__siteroot))

program
	.command("bookmark")
	.description("🔖 Create a new Bookmark")
	.action(() => createBookmark(__siteroot))

program
	.command("like")
	.description("♥️ Create a new Like")
	.action(() => createLike(__siteroot))

program
	.command("note")
	.description("📝 Create a new Note")
	.action(() => createNote(__siteroot))

program.parse()
