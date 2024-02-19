import { createRequire } from "node:module"
const require = createRequire(import.meta.url)
const pkg = require("../../../package.json")
// import pkg from "../../../package.json" assert { type: "json" }

export default {
	components: "./src/components/**/*.webc",
	useTransform: true,
	transformData: {
		pkg,
	},
}
