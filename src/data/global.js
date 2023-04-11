const cssnakedday = (now) => {
	const thisYear = new Date().getFullYear()
	const startEpoch = new Date(`${thisYear}-04-08T12:00:00Z`).getTime()
	const endEpoch = new Date(`${thisYear}-04-10T12:00:00Z`).getTime()

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
