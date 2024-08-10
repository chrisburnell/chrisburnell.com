import stringFilters from "../../src/eleventy/filters/strings.test.js";
import urlFilters from "../../src/eleventy/filters/urls.test.js";
import stringFunctions from "../../src/functions/strings.test.js";
import urlFunctions from "../../src/functions/urls.test.js";

export default async () => {
	await stringFilters();
	await urlFilters();

	await stringFunctions();
	await urlFunctions();
};
