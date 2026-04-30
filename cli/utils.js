import { checkbox, input } from "@inquirer/prompts";
import { Temporal } from "@js-temporal/polyfill";
import slugify from "@sindresorhus/slugify";
import { execSync, spawnSync } from "child_process";
import fs from "fs-extra";

const { year, month, day, hour, minute, second, offset } =
	Temporal.Now.zonedDateTimeISO();
export const now = `${year.toString().padStart(4, "0")}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}T${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}:${second.toString().padStart(2, "0")}${offset}`;

export const postTitle = async () => {
	return await input({ message: "Title" });
};

export const postSlug = async (title) => {
	return await input({ message: "Slug", default: slugify(title) });
};

export const postDescription = async () => {
	return await input({ message: "Description" });
};

export const postTags = async () => {
	return await checkbox({
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
			{ value: "ttrpg" },
			{ value: "ux" },
			{ value: "virtual" },
			{ value: "vim" },
			{ value: "web-components" },
			{ value: "weblogpomo" },
			{ value: "weblogpomo2024" },
			{ value: "writing" },
		],
	});
};

export const postSlugDate = now.split("T")[0];

export const postDate = now.replace(/(-|\+)(\d{2}):(\d{2})/g, "$1$2$3");

export const buildFrontmatter = (fields) => {
	const lines = ["---"];

	for (const [key, value] of Object.entries(fields)) {
		if (value === undefined || value === null) {
			continue;
		}

		if (Array.isArray(value)) {
			if (value.length === 0) {
				continue;
			}
			lines.push(`${key}:`);
			for (const item of value) {
				if (typeof item === "object") {
					const [first, ...rest] = Object.entries(item);
					lines.push(`  - ${first[0]}: ${first[1]}`);
					for (const [k, v] of rest) {
						lines.push(`    ${k}: ${v}`);
					}
				} else {
					lines.push(`  - ${item}`);
				}
			}
		} else if (typeof value === "object") {
			lines.push(`${key}:`);
			for (const [k, v] of Object.entries(value)) {
				if (v !== undefined && v !== null) {
					lines.push(`  ${k}: ${v}`);
				}
			}
		} else {
			const str = String(value);
			const needsQuotes = key !== "date" && /[:"#]/.test(str);
			lines.push(
				`${key}: ${needsQuotes ? `"${str.replace(/"/g, '\\"')}"` : str || "TODO"}`,
			);
		}
	}

	lines.push("---\n");
	return lines.join("\n");
};

export const writeAndOpen = (filepath, content) => {
	fs.writeFileSync(filepath, content, { flag: "wx" });

	const codiumExists = () => {
		try {
			execSync("which codium", { stdio: "ignore" });
			return true;
		} catch {
			return false;
		}
	};

	const editor = codiumExists()
		? "codium"
		: process.env.EDITOR || process.env.VISUAL || "vi";
	spawnSync(editor, [filepath], { stdio: "inherit" });
};

export default {
	now,
	postTitle,
	postSlug,
	postDescription,
	postTags,
	postSlugDate,
	postDate,
	buildFrontmatter,
	writeAndOpen,
};
