import EleventyFetch from "@11ty/eleventy-fetch";
import { cacheDurations } from "./site.js";

const currencies = async function () {
	const url = `https://api.frankfurter.dev/v1/latest?base=EUR&symbols=ARS,AUD,CAD,CHF,CNY,DKK,GBP,HKD,IDR,INR,JPY,MXN,MYR,NZD,PLN,SGD,THB,USD,ZAR`;
	const json = await EleventyFetch(url, {
		duration: cacheDurations.daily,
		type: "json",
	});

	// Add base currency to rates
	json.rates[json.base] = json.amount;

	return json;
};

export default currencies;
