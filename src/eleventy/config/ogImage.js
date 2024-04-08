import slugify from "@sindresorhus/slugify"
import { OgImage } from "eleventy-plugin-og-image/og-image"
import fs from "fs-extra"

export class CustomOgImage extends OgImage {
	async generateHTML() {
		return this.outputUrl()
	}

	async getOutputFileSlug() {
		return slugify(this.data.page.url)
	}
}

export const satoriOptions = {
	width: 1200,
	height: 675,
	fonts: [
		{
			name: "Proxima Nova",
			data: fs.readFileSync("./files/proxima-nova-semibold.woff"),
			weight: 600,
			style: "normal",
		},
	],
}

export default {
	CustomOgImage,
	satoriOptions,
}
