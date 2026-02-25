import checkBuild from "./checkBuild.js";
import checkDates from "./checkDates.js";
import checkLinks from "./checkLinks.js";

export default async () => {
	await checkLinks();
	// eslint-disable-next-line no-undef
	console.log("");
	await checkDates();
	// eslint-disable-next-line no-undef
	console.log("");
	await checkBuild();
};
