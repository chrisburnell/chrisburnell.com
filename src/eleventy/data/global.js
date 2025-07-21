import { Temporal } from "@js-temporal/polyfill";
import dotenv from "dotenv";
dotenv.config({ quiet: true });

export const personalApiKeyForLocal = process.env.PERSONAL_API_KEY_FOR_LOCAL;

export const nowEpoch = Date.now();

const { year, month, day, hour, minute, second, offset } =
	Temporal.Now.zonedDateTimeISO();
export const nowISO = `${year.toString().padStart(4, "0")}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}T${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}:${second.toString().padStart(2, "0")}${offset}`;

export const currentYear = new Date().getFullYear();

const cssNakedDayStart = `${currentYear}-04-09T00:00:00+1400`;
const cssNakedDayEnd = `${currentYear}-04-09T23:59:59-1200`;
const cssNakedDayStartEpoch = new Date(cssNakedDayStart).getTime();
const cssNakedDayEndEpoch = new Date(cssNakedDayEnd).getTime();
export const isCSSNakedDay =
	cssNakedDayStartEpoch <= nowEpoch && nowEpoch <= cssNakedDayEndEpoch;

const jsNakedDayStart = `${currentYear}-04-24T00:00:00+1400`;
const jsNakedDayEnd = `${currentYear}-04-24T23:59:59-1200`;
const jsNakedDayStartEpoch = new Date(jsNakedDayStart).getTime();
const jsNakedDayEndEpoch = new Date(jsNakedDayEnd).getTime();
export const isJSNakedDay =
	jsNakedDayStartEpoch <= nowEpoch && nowEpoch <= jsNakedDayEndEpoch;

const segment = () => {
	return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
};
export const random = `${segment()}-${segment()}-${segment()}`;

export default {
	personalApiKeyForLocal,
	currentYear,
	nowEpoch,
	nowISO,
	isCSSNakedDay,
	isJSNakedDay,
	random,
};
