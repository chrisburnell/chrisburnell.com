import { Temporal } from "@js-temporal/polyfill";
import dotenv from "dotenv";
dotenv.config({ quiet: true });

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

const cssNakedDayStart = `${currentYear}-04-09T00:00:00+14:00`;
const cssNakedDayEnd = `${currentYear}-04-09T23:59:59-12:00`;
const cssNakedDayStartEpoch = new Date(cssNakedDayStart).getTime();
const cssNakedDayEndEpoch = new Date(cssNakedDayEnd).getTime();
export const isCSSNakedDay =
	cssNakedDayStartEpoch <= nowEpoch && nowEpoch <= cssNakedDayEndEpoch;

const jsNakedDayStart = `${currentYear}-04-24T00:00:00+14:00`;
const jsNakedDayEnd = `${currentYear}-04-24T23:59:59-12:00`;
const jsNakedDayStartEpoch = new Date(jsNakedDayStart).getTime();
const jsNakedDayEndEpoch = new Date(jsNakedDayEnd).getTime();
export const isJSNakedDay =
	jsNakedDayStartEpoch <= nowEpoch && nowEpoch <= jsNakedDayEndEpoch;

const snowyPeriodStart = `${currentYear}-12-01T00:00:00+14:00`;
const snowyPeriodEnd = `${currentYear + 1}-01-07T23:59:59-12:00`;
export const isSnowyPeriod =
	new Date(snowyPeriodStart).getTime() <= nowEpoch &&
	nowEpoch <= new Date(snowyPeriodEnd).getTime();

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
	random,
};
