import NewBase60 from "./filters/NewBase60.js"
import collections from "./filters/collections.js"
import dates from "./filters/dates.js"
import fetch from "./filters/fetch.js"
import strings from "./filters/strings.js"
import urls from "./filters/urls.js"
import utils from "./filters/utils.js"

export const filtersSync = {
	collections,
	dates,
	NewBase60,
	strings,
	urls,
	utils,
}

export const filtersAsync = {
	fetch,
}

export default {
	collections,
	dates,
	fetch,
	NewBase60,
	strings,
	urls,
	utils,
}
