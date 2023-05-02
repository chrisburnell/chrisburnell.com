const { sotb_date } = require("#data/site")

const cssnakedday = () => {
	const now = Date.now()
	const thisYear = new Date().getFullYear()
	const startEpoch = new Date(`${thisYear}-04-09T00:00:00+1400`).getTime()
	const endEpoch = new Date(`${thisYear}-04-09T23:59:59-1200`).getTime()

	return startEpoch <= now && now <= endEpoch
}

const sotbUpcoming = () => {
	const now = Date.now()
	const startEpoch = new Date(sotb_date).getTime()
	const hundredDays = 1000 * 60 * 60 * 24 * 100

	return startEpoch - now < hundredDays
}

const random = () => {
	const segment = () => {
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
	}
	return `${segment()}-${segment()}-${segment()}`
}

module.exports = {
	now: Date.now(),
	cssnakedday: cssnakedday(),
	random: random(),
	sotb_upcoming: sotbUpcoming(),
}
