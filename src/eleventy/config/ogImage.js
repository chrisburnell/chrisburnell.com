import fs from "fs-extra"

export default {
	generateHTML: (outputURL) => outputURL,
	satoriOptions: {
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
