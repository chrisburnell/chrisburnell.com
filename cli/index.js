import { autocomplete } from "@clack/prompts";
import { program } from "commander";
import { styleText } from "node:util";
import path from "path";
import { fileURLToPath } from "url";

import calculateCSSComplexity from "./commands/calculateCSSComplexity.js";
import checkBuild from "./commands/checkBuild.js";
import checkDates from "./commands/checkDates.js";
import checkLinks from "./commands/checkLinks.js";
import createArticle from "./commands/createArticle.js";
import createBeer from "./commands/createBeer.js";
import createBookmark from "./commands/createBookmark.js";
import createLike from "./commands/createLike.js";
import createNote from "./commands/createNote.js";
import performChecks from "./commands/performChecks.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __siteroot = __dirname.replace("/cli", "");

const wizard = async () => {
	console.log(
		styleText(
			"blue",
			`
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
`,
		),
	);

	const type = await autocomplete({
		message: "What do you want to do?",
		options: [
			{
				label: "Calculate: CSS Complexity",
				value: "calculateCSSComplexity",
				hint: "Calculate the complexity of CSS and get violations data.",
			},
			{
				label: "Check: Build",
				value: "checkBuild",
				hint: "Check that Eleventy built correctly.",
			},
			{
				label: "Check: Dates",
				value: "checkDates",
				hint: "Check for instances of `Invalid DateTime`.",
			},
			{
				label: "Check: Links",
				value: "checkLinks",
				hint: "Check for broken links/references.",
			},
			{
				label: "Create: Article",
				value: "article",
			},
			{
				label: "Create: Beer",
				value: "beer",
			},
			{
				label: "Create: Bookmark",
				value: "bookmark",
			},
			{
				label: "Create: Like",
				value: "like",
			},
			{
				label: "Create: Note",
				value: "note",
			},
		],
		placeholder: "Type to search...",
		maxItems: 1,
	});

	switch (type) {
		case "calculateCSSComplexity":
			calculateCSSComplexity();
			break;
		case "checkBuild":
			checkBuild();
			break;
		case "checkDates":
			checkDates();
			break;
		case "checkLinks":
			checkLinks();
			break;
		case "article":
			createArticle(__siteroot);
			break;
		case "beer":
			createBeer(__siteroot);
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
	}
};

program
	.command("wizard")
	.description("🧙 Speak friend and enter")
	.action(() => wizard());

program
	.command("calculateCSSComplexity")
	.description("⚠️  Calculate CSS Complexity")
	.action(() => {
		calculateCSSComplexity();
	});

program
	.command("check")
	.description("⚠️  Perform all checks")
	.action(() => {
		performChecks();
	});

program
	.command("checkBuild")
	.description("⚠️  Check build for Eleventy errors")
	.action(async () => {
		await checkBuild();
	});

program
	.command("checkDates")
	.description("⚠️  Check DateTimes")
	.action(async () => {
		await checkDates();
	});

program
	.command("checkLinks")
	.description("⚠️  Check links for errors")
	.action(async () => {
		await checkLinks();
	});

program
	.command("article")
	.description("📝 Create a new Article")
	.action(() => createArticle(__siteroot));

program
	.command("beer")
	.description("🍺 Checkin a Beer")
	.action(() => createBookmark(__siteroot));

program
	.command("bookmark")
	.description("🔖 Create a new Bookmark")
	.action(() => createBookmark(__siteroot));

program
	.command("like")
	.description("♥️  Create a new Like")
	.action(() => createLike(__siteroot));

program
	.command("note")
	.description("📝 Create a new Note")
	.action(() => createNote(__siteroot));

program.parse();
