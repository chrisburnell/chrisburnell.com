const nowEpoch = Date.now();

const currentYear = new Date().getFullYear();

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

const midwinterPeriodEarlyStart = `${currentYear}-12-01T00:00:00+14:00`;
const midwinterPeriodEnd = `${currentYear}-01-05T23:59:59-12:00`;
const midwinterPeriodStart = `${currentYear}-12-25T00:00:00+14:00`;
export const isEarlyMidwinterPeriod =
	new Date(midwinterPeriodEarlyStart).getTime() <= nowEpoch &&
	nowEpoch <= new Date(midwinterPeriodStart).getTime();
export const isMidwinterPeriod =
	nowEpoch <= new Date(midwinterPeriodEnd).getTime() ||
	new Date(midwinterPeriodStart).getTime() <= nowEpoch;

export default {
	isJSNakedDay,
	isCSSNakedDay,
	isEarlyMidwinterPeriod,
	isMidwinterPeriod,
};
