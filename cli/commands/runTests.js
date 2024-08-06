import stringFilters from "../../tests/filters/strings.js";
import urlFilters from "../../tests/filters/urls.js";
import stringFunctions from "../../tests/functions/strings.js";
import urlFunctions from "../../tests/functions/urls.js";

export default async () => {
	await stringFilters();
	await urlFilters();

	await stringFunctions();
	await urlFunctions();
};
