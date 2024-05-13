// Adapted from Robb Knight’s work:
// https://github.com/rknightuk/rknight.me

import select from "@inquirer/select"
import chalk from "chalk"
import { program } from "commander"
import path from "path"
import { fileURLToPath } from "url"

import createPost from "./commands/createPost.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const __siteroot = __dirname.replace("/cli", "")

const runWizard = async () => {
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
				name: "Create a new post",
				value: "post",
				description: "Create a new post",
			},
		],
	})

	switch (type) {
		case "post":
			createPost(__siteroot)
			break
	}
}

program
	.command("run")
	.description("🧙‍♂️ run the site wizard")
	.action(() => runWizard())

program
	.command("post")
	.description("📝 Create a new post")
	.action(() => createPost())

program.parse()
