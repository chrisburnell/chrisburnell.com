const glob = require("glob-promise")
const path = require("path")
const Image = require("@11ty/eleventy-img")

module.exports = async (eleventyConfig) => {
	// Only run when GENERATE_FAVICON is true
	if (process.env.GENERATE_FAVICON) {
		const options = {
			urlPath: "/images/",
			outputDir: "./images",
		}

		const favicons = await glob("./images/raven*.svg")
		for (const f of favicons) {
			console.log(`Generating image varieties from: ${f}`)
			await Image(
				f,
				Object.assign(
					{
						formats: ["avif", "webp", "png"],
						widths: [16, 32, 48, 64, 128, 180, 192, 256, 310, 512],
						filenameFormat: (id, src, width, format) => {
							const extension = path.extname(src)
							const name = path.basename(src, extension)
							return `${name.replace(`raven`, `favicon-${width}`)}.${format}`
						},
					},
					options
				)
			)
		}

		const avatar = await glob("./images/avatar-full.jpg")
		for (const a of avatar) {
			console.log(`Generating image varieties from: ${a}`)
			await Image(
				a,
				Object.assign(
					{
						formats: ["avif", "webp", "jpg"],
						widths: [100, 200, 300, 400],
						filenameFormat: (id, src, width, format) => {
							const extension = path.extname(src)
							const name = path.basename(src, extension)
							return `avatar${width > 100 ? `@${width / 100}x` : ``}.${format}`
						},
					},
					options
				)
			)
		}

		const pixelated = await glob("./images/avatar-pixelated.png")
		const defaultProfile = await glob("./images/default-profile.jpg")
		for (const g of [...pixelated, ...defaultProfile]) {
			console.log(`Generating image varieties from: ${g}}`)
			await Image(
				g,
				Object.assign(
					{
						formats: ["avif", "webp", "jpg", "png"],
						filenameFormat: (id, src, width, format) => {
							const extension = path.extname(src)
							const name = path.basename(src, extension)
							return `${name}.${format}`
						},
					},
					options
				)
			)
		}
	}
}
