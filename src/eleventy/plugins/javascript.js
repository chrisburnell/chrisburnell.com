import dotenv from "dotenv";
dotenv.config({ quiet: true });

import esbuild from "esbuild";

let cachedJS = new Map();

export default function (eleventyConfig) {
	// Recognise JS as a "template language"
	eleventyConfig.addTemplateFormats("js");

	// Ignore non front end JS files
	eleventyConfig.ignores.add("./src/data");
	eleventyConfig.ignores.add("./src/eleventy");
	eleventyConfig.ignores.add("./src/**/*.11tydata.js");

	// Compile JS
	eleventyConfig.addExtension("js", {
		outputFileExtension: "js",
		read: false,
		compile: async function (inputContent, inputPath) {
			// Ignore anything outside the front end JS folder
			if (
				!inputPath.includes("src/js/") &&
				!inputPath.includes("node_modules/")
			) {
				return;
			}

			return async () => {
				const inputPathNormalized = inputPath.replace(/^\.\//, "");
				// Skip processing and grab from the memoized cache
				if (cachedJS.has(inputPathNormalized)) {
					return cachedJS.get(inputPathNormalized);
				}

				// Pass JS through esbuild to resolve imports and minify
				const esbuildResult = await esbuild.build({
					entryPoints: [inputPath],
					nodePaths: [".", "src/js", "node_modules"],
					external: ["fs"],
					format: "esm",
					bundle: true,
					minify: process.env.ELEVENTY_RUN_MODE === "build",
					// keepNames: true,
					// minifySyntax: true,
					// minifyWhitespace: true,
					// minifyIdentifiers: false,
					write: false,
					define: {
						"import.meta.url": "import.meta.url",
					},
				});

				// Cache the result
				cachedJS.set(
					inputPathNormalized,
					esbuildResult.outputFiles[0].text,
				);

				return esbuildResult.outputFiles[0].text;
			};
		},
	});
}
