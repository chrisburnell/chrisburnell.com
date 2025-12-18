import dotenv from "dotenv";
dotenv.config({ quiet: true });

import { Temporal } from "@js-temporal/polyfill";
import {
	isCSSNakedDay,
	isEarlyMidwinterPeriod,
	isJSNakedDay,
	isMidwinterPeriod,
} from "./timeRanges.js";
export {
	isCSSNakedDay,
	isEarlyMidwinterPeriod,
	isJSNakedDay,
	isMidwinterPeriod,
} from "./timeRanges.js";

export const personalApiKeyForLocal = process.env.PERSONAL_API_KEY_FOR_LOCAL;

export const nowEpoch = Date.now();

const { year, month, day, hour, minute, second, offset } =
	Temporal.Now.zonedDateTimeISO();
export const nowISO = `${year.toString().padStart(4, "0")}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}T${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}:${second.toString().padStart(2, "0")}${offset}`;

export const currentYear = new Date().getFullYear();

export const flexibleSorting = {
	numeric: true,
	ignorePunctuation: true,
	sensitivity: "base",
};

const segment = () => {
	return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
};
export const random = `${segment()}-${segment()}-${segment()}`;

export default {
	personalApiKeyForLocal,
	currentYear,
	flexibleSorting,
	nowEpoch,
	nowISO,
	isCSSNakedDay,
	isJSNakedDay,
	isEarlyMidwinterPeriod,
	isMidwinterPeriod,
	random,
};
