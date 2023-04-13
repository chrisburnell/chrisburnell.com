const cssnakedday = (now) => {
	const thisYear = new Date().getFullYear()
	const startEpoch = new Date(`${thisYear}-04-09T00:00:00+1400`).getTime()
	const endEpoch = new Date(`${thisYear}-04-09T23:59:59-1200`).getTime()

	return startEpoch <= now && now <= endEpoch
}

const random = () => {
	const segment = () => {
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
	}
	return `${segment()}-${segment()}-${segment()}`
}

module.exports = {
	now: Date.now(),
	cssnakedday: cssnakedday(Date.now()),
	random: random(),
}
