import { autocompleteMultiselect, box, confirm, isCancel, outro, text } from "@clack/prompts";
import { Temporal } from "@js-temporal/polyfill";
import slugify from "@sindresorhus/slugify";
import { execSync, spawnSync } from "child_process";
import fs from "fs-extra";
import { readFile } from "node:fs/promises";
import { styleText } from "node:util";

const { year, month, day, hour, minute, second, offset } =
	Temporal.Now.zonedDateTimeISO();
export const now = `${year.toString().padStart(4, "0")}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}T${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}:${second.toString().padStart(2, "0")}${offset}`;
export const epoch = Number(Date.now().toString().slice(0, -3));

let allTags = [];
const allTagsPath = "_site/tags.json";
if (await fs.pathExists(allTagsPath)) {
	const tagsJSON = await fs.readFile(allTagsPath, "utf8");
	allTags = JSON.parse(tagsJSON);
}

export const postTitle = async (required = true) => {
	const result = await text({
		message: "Title",
		validate: (value) => {
			if (required && (!value || value.length < 2)) {
				return "Title must be at least 2 characters";
			}
			return undefined;
		},
	});
	if (isCancel(result)) {
		goodbye();
	}
	return result;
};

export const postSlug = async (title) => {
	const defaultSlug = title.trim().length < 1 ? Date.now().toString().slice(0, -3) : slugify(title);
	const result = await text({ message: "Slug", placeholder: defaultSlug, defaultValue: defaultSlug });
	if (isCancel(result)) {
		goodbye();
	}
	return result;
};

export const postDescription = async () => {
	const result = await text({ message: "Description" });
	if (isCancel(result)) {
		goodbye();
	}
	return result;
};

export const postTags = async () => {
	const result = await autocompleteMultiselect({
		message: "Tags",
		options: allTags.map((tag) => {
			return { value: tag };
		}),
	});
	if (isCancel(result)) {
		goodbye();
	}
	return result;
};

export const postDraft = async () => {
	const result = await confirm({
		message: "Put in the drafts folder?",
	});
	if (isCancel(result)) {
		goodbye();
	}
	return result;
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

export const reviewBox = ({ filepath, __siteroot, slug, postDate, title, description, tags }) => {
	box(
		`Path: ${filepath.replace(__siteroot, ".")}\nURL: https://chrisburnell.com/note/${slug}/\nDate: ${postDate}${title?.length ? `\nTitle: ${title}` : ""}${description?.length ? `\nDescription: ${description}` : ""}${tags?.length ? `\nTags: ${tags.join()}` : ""}`,
		" File Created ",
		{
			titleAlign: "center",
			width: "auto",
			rounded: true,
		}
	);
};

export const goodbye = async () => {
	await outro(styleText(["black", "bgBlue"], " Goodbye! "));
	process.exit(0);
};

export default {
	now,
	epoch,
	postTitle,
	postSlug,
	postDescription,
	postTags,
	postSlugDate,
	postDate,
	buildFrontmatter,
	writeAndOpen,
	goodbye,
};
