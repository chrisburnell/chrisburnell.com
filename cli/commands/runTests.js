import stringFilters from "../../tests/filters/strings.test.js";
import urlFilters from "../../tests/filters/urls.test.js";
import stringFunctions from "../../tests/functions/strings.test.js";
import urlFunctions from "../../tests/functions/urls.test.js";

export default async () => {
	await stringFilters();
	await urlFilters();

	await stringFunctions();
	await urlFunctions();
};
