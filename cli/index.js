// Adapted from Robb Knight’s work:
// https://github.com/rknightuk/rknight.me

import select from "@inquirer/select";
import chalk from "chalk";
import { program } from "commander";
import path from "path";
import { fileURLToPath } from "url";

import checkDates from "./commands/checkDates.js";
import checkLinks from "./commands/checkLinks.js";
import createArticle from "./commands/createArticle.js";
import createBookmark from "./commands/createBookmark.js";
import createLike from "./commands/createLike.js";
import createNote from "./commands/createNote.js";
import runTests from "./commands/runTests.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __siteroot = __dirname.replace("/cli", "");

const wizard = async () => {
	console.log(chalk.hex("#5f8aa6")`
                       ░█░█
 ██░░░░░█░             █████
  ░▓▓██▓███▓█░       ██▒░▓███
    ░░█▓▒██▓░░█░   █▓░██▓██▓██░░
     ░█░███▓▓██░█░█▓███░░█▓██░█
       ░░▒██▓░▒█░██▓███▓▓██▓░
          ░░▓██████▒█▓▒▓▒░░
            ░███▓▒▓▒░░▓▓░░░
 █▒▓▒▓▓▓▓▓██▓▓░░▓░░▓▒░███▒░
 ░▓███▓██░▒▒░░▒██▒▓█     █▒
     ░██▒░░░██░▒▓█░       ░
             ░▒█▓░░▓█░
              ░▒▓░░▒░░░
`);

	const type = await select({
		message: "What do you want to do?",
		choices: [
			{
				name: "Check: Dates",
				value: "checkDates",
				description: "Check for instances of `Invalid DateTime`.",
			},
			{
				name: "Check: Links",
				value: "checkLinks",
				description: "Check for broken links/references.",
			},
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
			{
				name: "Run Tests",
				value: "test",
				description: "Run tests against functionality",
			},
		],
	});

	switch (type) {
		case "checkDates":
			checkDates();
			break;
		case "checkLinks":
			checkLinks();
			break;
		case "article":
			createArticle(__siteroot);
			break;
		case "bookmark":
			createBookmark(__siteroot);
			break;
		case "like":
			createLike(__siteroot);
			break;
		case "note":
			createNote(__siteroot);
			break;
		case "test":
			runTests();
			break;
	}
};

program
	.command("wizard")
	.description("🧙 Speak friend and enter")
	.action(() => wizard());

program
	.command("checks")
	.description("⚠️ Perform Checks")
	.action(async () => {
		await checkLinks();
		// eslint-disable-next-line no-undef
		console.log("");
		await checkDates();
	});

program
	.command("checkDates")
	.description("⚠️ Check DateTimes")
	.action(async () => {
		await checkDates();
	});

program
	.command("checkLinks")
	.description("⚠️ Check links for errors")
	.action(async () => {
		await checkLinks();
	});

program
	.command("article")
	.description("📝 Create a new Article")
	.action(() => createArticle(__siteroot));

program
	.command("bookmark")
	.description("🔖 Create a new Bookmark")
	.action(() => createBookmark(__siteroot));

program
	.command("like")
	.description("♥️ Create a new Like")
	.action(() => createLike(__siteroot));

program
	.command("note")
	.description("📝 Create a new Note")
	.action(() => createNote(__siteroot));

program
	.command("test")
	.description("🔨Run tests against functionality")
	.action(() => runTests());

program.parse();
