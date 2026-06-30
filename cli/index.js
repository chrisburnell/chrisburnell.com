import { autocomplete, intro, isCancel, outro, spinner } from "@clack/prompts";
import { program } from "commander";
import { styleText } from "node:util";
import path from "path";
import { fileURLToPath } from "url";

import checkCSSComplexity from "./commands/checkCSSComplexity.js";
import checkStats from "./commands/checkStats.js";
import checkDates from "./commands/checkDates.js";
import checkLinks from "./commands/checkLinks.js";
import createArticle from "./commands/createArticle.js";
import createBeer from "./commands/createBeer.js";
import createBookmark from "./commands/createBookmark.js";
import createLike from "./commands/createLike.js";
import createNote from "./commands/createNote.js";
import performChecks from "./commands/performChecks.js";
import { goodbye } from "./utils.js";

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

	intro(styleText(["black", "bgBlue"], " chrisburnell.com CLI Wizard "));

	const type = await autocomplete({
		message: "What do you want to do?",
		options: [
			{
				label: "Check: CSS Complexity",
				value: "checkCSSComplexity",
				hint: "Calculate the complexity of CSS and get violations data.",
			},
			{
				label: "Check: Dates",
				value: "checkDates",
				hint: "Look for instances of `Invalid DateTime`.",
			},
			{
				label: "Check: Links",
				value: "checkLinks",
				hint: "Look for broken links/references.",
			},
			{
				label: "Check: Stats",
				value: "checkStats",
				hint: "Confirm that Eleventy built correctly by confirming some build stats.",
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
	});

	if (isCancel(type)) {
		goodbye();
	}

	if (type.startsWith("check")) {
		const s = spinner();
		if (type === "checkCSSComplexity") {
			s.start("Checking CSS complexity...");
			await checkCSSComplexity();
			s.stop("Checked CSS complexity!");
		} else if (type === "checkDates") {
			s.start("Checking build dates...");
			await checkDates({ quiet: true });
			s.stop("Checked build dates!");
		} else if (type === "checkLinks") {
			s.start("Checking build links...");
			await checkLinks({ quiet: true });
			s.stop("Checked build links!");
		} else if (type === "checkStats") {
			s.start("Checking build stats...");
			await checkStats({ quiet: true });
			s.stop("Checked build stats!");
		}
	} else if (type === "article") {
		await createArticle(__siteroot);
	} else if (type === "beer") {
		await createBeer(__siteroot);
	} else if (type === "bookmark") {
		await createBookmark(__siteroot);
	} else if (type === "like") {
		await createLike(__siteroot);
	} else if (type === "note") {
		await createNote(__siteroot);
	}

	goodbye();
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
	.command("checkStats")
	.description("⚠️  Check build for Eleventy errors")
	.action(async () => {
		await checkStats();
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
