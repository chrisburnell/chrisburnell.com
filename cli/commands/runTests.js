import collectionFilters from "../../src/eleventy/filters/collections.test.js";
import dateFilters from "../../src/eleventy/filters/dates.test.js";
// import fetchFilters from "../../src/eleventy/filters/fetch.test.js";
import NewBase60Filters from "../../src/eleventy/filters/NewBase60.test.js";
import stringFilters from "../../src/eleventy/filters/strings.test.js";
import urlFilters from "../../src/eleventy/filters/urls.test.js";

import collectionFunctions from "../../src/functions/collections.test.js";
import stringFunctions from "../../src/functions/strings.test.js";
import urlFunctions from "../../src/functions/urls.test.js";
import utilFunctions from "../../src/functions/utils.test.js";

export default async () => {
	await collectionFilters();
	await dateFilters();
	// await fetchFilters();
	await NewBase60Filters();
	await stringFilters();
	await urlFilters();

	await collectionFunctions();
	await stringFunctions();
	await urlFunctions();
	await utilFunctions();
};
