/* global console */
import { calculate } from "@projectwallace/css-code-quality";
import fs from "fs-extra";
import util from "node:util";

/**
 * Calculate the complexity of /css/main.css
 */
export default async (file = "_site/css/main.css") => {
	let css = fs.readFileSync(file, "utf8");
	let result = calculate(css);

	console.log(util.inspect(result, { depth: null, colors: true }));
};
