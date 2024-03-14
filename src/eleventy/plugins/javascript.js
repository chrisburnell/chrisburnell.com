import esbuild from "esbuild"

let cachedJS = {}

export default function (eleventyConfig) {
	// Recognise JS as a "template language"
	eleventyConfig.addTemplateFormats("js")

	// Ignore non-front-end JS files
	eleventyConfig.ignores.add("./src/data")
	eleventyConfig.ignores.add("./src/eleventy")
	eleventyConfig.ignores.add("./src/**/*.11tydata.js")

	// Compile JS
	eleventyConfig.addExtension("js", {
		outputFileExtension: "js",
		read: false,
		compile: async function (inputContent, inputPath) {
			// Ignore anything outside the front end JS folder
			if (!inputPath.includes("src/js/")) {
				return
			}

			return async () => {
				const inputPathNormalized = inputPath.replace(/^\.\//, "")
				// Skip processing and grab from the memoized cache
				if (inputPathNormalized in cachedJS) {
					return cachedJS[inputPathNormalized]
				}

				// Pass JS through esbuild to resolve imports and minify
				const esbuildResult = await esbuild.build({
					entryPoints: [inputPath],
					nodePaths: ["src/js", "node_modules"],
					external: ["fs"],
					format: "esm",
					target: "es6",
					bundle: true,
					minify: true,
					keepNames: true,
					write: false,
				})

				// Cache the result
				cachedJS[inputPathNormalized] = esbuildResult.outputFiles[0].text

				return esbuildResult.outputFiles[0].text
			}
		},
	})
}
