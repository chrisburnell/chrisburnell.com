import slugify from "@sindresorhus/slugify";
import fs from "fs-extra";

export default {
	async shortcodeOutput(ogImage) {
		return ogImage.outputUrl();
	},
	async outputFileSlug(ogImage) {
		return slugify(ogImage.data.page.url);
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
};
