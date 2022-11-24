class ClampCalculator {
	constructor() {
		this.ids = ["font-size-min", "font-size-max", "viewport-width-min", "viewport-width-max"]
		this.inputs = {}

		this.init()
	}

	limitDecimals(value) {
		return parseFloat(value.toFixed(3))
	}

	toRem(px) {
		return this.limitDecimals(px / 16)
	}

	calculate() {
		const vp = (this.inputs["font-size-max"].value - this.inputs["font-size-min"].value) / (this.inputs["viewport-width-max"].value - this.inputs["viewport-width-min"].value)
		const rem = this.toRem(this.inputs["font-size-max"].value - this.inputs["viewport-width-max"].value * vp)
		const vw = this.limitDecimals(vp * 100)

		this.output.value = `clamp(${this.toRem(this.inputs["font-size-min"].value)}rem, ${rem}rem + ${vw}vw, ${this.toRem(this.inputs["font-size-max"].value)}rem)`
	}

	init() {
		this.form = document.getElementById("clamp-calculator")
		this.form.addEventListener("submit", (event) => {
			event.preventDefault()
		})

		const params = new URLSearchParams(window.location.search)

		this.ids.forEach((id) => {
			this.inputs[id] = document.getElementById(id)
			if (params.get(id)) {
				this.inputs[id].value = params.get(id)
			}
		})
		this.output = document.getElementById("output")

		this.button = document.getElementById("submit")
		this.button.addEventListener("click", (event) => {
			event.preventDefault()
			this.calculate()
			this.output.focus()
		})

		this.calculate()
	}
}

if ("HTMLElement" in window) {
	window.ClampCalculator = new ClampCalculator()
}

export default ClampCalculator
