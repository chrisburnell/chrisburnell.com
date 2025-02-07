import EleventyFetch from "@11ty/eleventy-fetch";
import { cacheDurations } from "./site.js";

const currencies = async function () {
	const url = `https://api.frankfurter.dev/v1/latest?base=EUR&symbols=CAD,DKK,GBP,JPY,MYR,SGD,THB,USD`;
	const json = await EleventyFetch(url, {
		duration: cacheDurations.daily,
		type: "json",
	});
	return json;
};

export default currencies;
