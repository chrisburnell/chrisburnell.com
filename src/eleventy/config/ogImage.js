import fs from "node:fs"

export default {
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
