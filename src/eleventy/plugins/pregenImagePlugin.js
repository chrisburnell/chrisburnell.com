require("dotenv").config()

const glob = require("glob-promise")
const path = require("path")
const Image = require("@11ty/eleventy-img")

module.exports = async (eleventyConfig) => {
	// Only run when PREGENERATE_IMAGES is true
	if (process.env.PREGENERATE_IMAGES) {
		const options = {
			urlPath: "/images/",
			outputDir: "./images/",
		}

		const favicon_colour = await glob("./images/raven.svg")
		const favicon_bw = await glob("./images/raven-bw.svg")
		for (const f of [...favicon_colour, ...favicon_bw]) {
			console.log(`Generating image varieties from: ${f}`)
			await Image(
				f,
				Object.assign(
					{
						formats: ["avif", "webp", "png"],
						widths: [16, 32, 48, 64, 128, 180, 192, 256, 310, 512],
						sharpOptions: {
							quality: 100,
						},
						filenameFormat: (id, src, width, format, options) => {
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
						sharpOptions: {
							quality: 100,
						},
						filenameFormat: (id, src, width, format, options) => {
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
						sharpOptions: {
							quality: 100,
						},
						filenameFormat: (id, src, width, format, options) => {
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
