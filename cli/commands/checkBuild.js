/* global console, process */
import { load } from "cheerio";
import { readFile } from "node:fs/promises";
import { styleText } from "node:util";

const MINIMUMS = {
	posts: 1200,
	blogPosts: 220,
	wordCount: 66000,
	years: 14,
	tags: 39,
};

const parseNumber = (text) => parseInt(text.replace(/,/g, ""), 10);

/**
 * Check build output stats against known minimums
 */
export default async (statsPath = "_site/stats/index.html") => {
	const start = Date.now();

	let html;
	try {
		html = await readFile(statsPath, "utf8");
	} catch {
		console.log(`Check Build Stats\n`);
		console.error(`  ❌ Could not read ${statsPath}`);
		process.exit(1);
	}

	const $ = load(html);

	const tagCount = $("summary")
		.filter((_, el) => $(el).text().trim() === "Blog Posts by tag")
		.closest("details")
		.find("table tbody tr").length;

	const yearCount = $("summary")
		.filter((_, el) => $(el).text().trim() === "Blog Posts by year")
		.closest("details")
		.find("table tbody tr").length;

	const wordCount = parseNumber(
		$("dt")
			.filter((_, el) => $(el).text().trim() === "Blog Word Count")
			.next("dd")
			.text()
			.trim(),
	);

	const posts = parseNumber(
		$("dt")
			.filter(
				(_, el) =>
					$(el).text().includes("№ Posts") &&
					!$(el).text().includes("Blog"),
			)
			.first()
			.next("dd")
			.text()
			.trim(),
	);

	const blogPosts = parseNumber(
		$("dt")
			.filter((_, el) => $(el).text().includes("№ Blog Posts"))
			.next("dd")
			.text()
			.trim(),
	);

	const checks = [
		["№ Posts", posts, MINIMUMS.posts],
		["№ Blog Posts", blogPosts, MINIMUMS.blogPosts],
		["Blog Word Count", wordCount, MINIMUMS.wordCount],
		["Blog Posts by year", yearCount, MINIMUMS.years],
		["Blog Posts by tag", tagCount, MINIMUMS.tags],
	];

	const elapsed = ((Date.now() - start) / 1000).toFixed(3);
	const failed = checks.filter(([, actual, min]) => actual < min);

	console.log(`${styleText("bold", "Check Build Stats")}\n`);
	for (const [label, actual, min] of checks) {
		const icon = actual >= min ? "✅" : "❌";
		console.log(
			`  ${icon} ${styleText("bold", label)}: ${actual} (>= ${min})`,
		);
	}
	console.log(`\n  🕑 Checked ${checks.length} stats in ${elapsed} seconds.`);

	if (failed.length > 0) {
		process.exit(1);
	}
};
