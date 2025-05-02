import { checkbox, input } from "@inquirer/prompts";
import { Temporal } from "@js-temporal/polyfill";
import slugify from "@sindresorhus/slugify";

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

export default {
	now,
	postTitle,
	postSlug,
	postDescription,
	postTags,
	postSlugDate,
	postDate,
};
