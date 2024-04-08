import slugify from "@sindresorhus/slugify"
import fs from "fs-extra"

export default {
	async generateHTML() {
		return this.outputURL()
	},
	async getOutputFileSlug() {
		return slugify(this.data.page.url)
	},
	satoriOptions: {
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
	},
}
