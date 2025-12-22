import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		exclude: [
			...configDefaults.exclude,
			"src/eleventy/filters/fetch.test.js",
		],
	},
});
