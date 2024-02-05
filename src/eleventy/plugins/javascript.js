import esbuild from "esbuild"

export default function (eleventyConfig) {
	// Recognize JS as a "template language"
	eleventyConfig.addTemplateFormats("js")

	// Ignore non-asset JS files
	eleventyConfig.ignores.add("./src/data")
	eleventyConfig.ignores.add("./src/eleventy")
	eleventyConfig.ignores.add("./src/**/*.11tydata.js")

	// Compile JS
	eleventyConfig.addExtension("js", {
		outputFileExtension: "js",
		read: false,
		compile: async function (inputContent, inputPath) {
			if (!inputPath.includes("src/js/")) {
				return
			}

			return async () => {
				const esbuildResult = await esbuild.build({
					entryPoints: [inputPath],
					nodePaths: ["src/js", "node_modules"],
					format: "esm",
					target: "es6",
					bundle: true,
					minify: true,
					write: false,
					external: ["fs"],
				})

				return esbuildResult.outputFiles[0].text
			}
		},
	})
}
