export const nowEpoch = Date.now()
export const nowISO = new Date().toISOString()

export const thisYear = new Date().getFullYear()

const cssNakedDayStartEpoch = new Date(`${thisYear}-04-09T00:00:00+1400`).getTime()
const cssNakedDayEndEpoch = new Date(`${thisYear}-04-09T23:59:59-1200`).getTime()

export const isCSSNakedDay = cssNakedDayStartEpoch <= nowEpoch && nowEpoch <= cssNakedDayEndEpoch

const segment = () => {
	return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
}
export const random = `${segment()}-${segment()}-${segment()}`

export default {
	thisYear,
	nowEpoch,
	nowISO,
	isCSSNakedDay,
	random,
}
