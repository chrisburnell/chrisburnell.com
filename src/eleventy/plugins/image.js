import Image from "@11ty/eleventy-img"
import path from "path"
import { cacheDurations } from "../data/site.js"

export default function (eleventyConfig) {
	eleventyConfig.addNunjucksShortcode("image", (src, alt, classes = "", widths = [800, 500], styles = "") => {
		let formats
		if (src.includes(".svg")) {
			formats = ["svg"]
		} else {
			const originalFormat = src.includes("png") ? "png" : "jpg"
			formats = process.env.ELEVENTY_RUN_MODE === "build" ? ["avif", "webp", originalFormat] : ["webp", originalFormat]
		}

		let options = {
			widths: widths,
			formats: formats,
			urlPath: "/images/built/",
			outputDir: "./_site/images/built/",
			duration: cacheDurations.monthly,
			sharpOptions: {
				animated: true,
				quality: 100,
			},
			filenameFormat: (id, src, width, format, options) => {
				const extension = path.extname(src)
				const name = path.basename(src, extension)
				return `${name}${widths.length > 1 ? "-" + width : ""}.${format}`
			},
		}

		Image(src, options)

		let metadata = Image.statsSync(src, options)
		let attributes = {
			alt: alt,
			title: alt,
			class: classes,
			style: styles,
			sizes: "100vw",
			loading: "lazy",
			decoding: "async",
		}
		return Image.generateHTML(metadata, attributes)
	})
}
