import pentatonic from "@chrisburnell/pentatonic"

const pentatonicLoop = () => {
	for (let target of document.querySelectorAll(".pentatonic")) {
		target.addEventListener("click", () => {
			let values = target.values || target.dataset.values
			let duration = target.getAttribute("duration") ? parseFloat(target.getAttribute("duration")) : target.dataset.duration ? parseFloat(target.dataset.duration) : 4000
			let keyStart = target.getAttribute("key-start") ? parseFloat(target.getAttribute("key-start")) : target.dataset.keyStart ? parseFloat(target.dataset.keyStart) : 29
			let keyLimit = target.getAttribute("key-limit") ? parseFloat(target.getAttribute("key-limit")) : target.dataset.keyLimit ? parseFloat(target.dataset.keyLimit) : 12
			let keyIntervals = target.getAttribute("key-intervals")
				? target
						.getAttribute("key-intervals")
						.split(",")
						.map((interval) => parseFloat(interval))
				: target.dataset.keyIntervals
				? target.dataset.keyIntervals.split(",").map((interval) => parseFloat(interval))
				: [2, 2, 3, 2, 3]
			if (values) {
				console.log("duration", duration)
				console.log("keyStart", keyStart)
				console.log("keyLimit", keyLimit)
				console.log("keyIntervals", keyIntervals)
				pentatonic(values.split(","), duration, 0.5, keyStart, keyIntervals, keyLimit)
			}
		})
	}
}

export default pentatonicLoop
