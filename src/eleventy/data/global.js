export const now = Date.now()
export const nowISO = new Date().toISOString()

const thisYear = new Date().getFullYear()
const startEpoch = new Date(`${thisYear}-04-09T00:00:00+1400`).getTime()
const endEpoch = new Date(`${thisYear}-04-09T23:59:59-1200`).getTime()

export const isCSSNakedDay = startEpoch <= now && now <= endEpoch

const segment = () => {
	return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
}
export const random = `${segment()}-${segment()}-${segment()}`

export default {
	now,
	nowISO,
	isCSSNakedDay,
	random,
}
