import esbuild from "esbuild"

export default function (eleventyConfig) {
	// Recognize Sass as a "template languages"
	eleventyConfig.addTemplateFormats("js")

	// Compile Sass
	eleventyConfig.addExtension("js", {
		outputFileExtension: "js",
		read: false,
		compile: async function (inputContent, inputPath) {
			if (!inputPath.includes("src/js/")) {
				return
			}

			return async (data) => {
				const esbuildResult = await esbuild.build({
					entryPoints: [inputPath],
					// nodePaths: ['.', 'src/assets/js'],
					bundle: true,
					format: "esm",
					target: "es6",
					minify: data.eleventy.env.runMode === "build",
					write: false,
					external: ["fs"],
				})

				return esbuildResult.outputFiles[0].text
			}
		},
	})
}
