class ClampCalculator {
	constructor() {
		this.ids = ["font-size-min", "font-size-max", "viewport-width-min", "viewport-width-max"]
		this.inputs = {}

		this.init()
	}

	limitDecimals(value, decimals = 3) {
		return parseFloat(value.toFixed(decimals))
	}

	toRem(px) {
		return this.limitDecimals(px / 16)
	}

	calculate() {
		const fsMax = this.inputs["font-size-max"].value
		const fsMin = this.inputs["font-size-min"].value
		const vwMax = this.inputs["viewport-width-max"].value
		const vwMin = this.inputs["viewport-width-min"].value

		const x = (fsMax - fsMin) / (vwMax - vwMin)

		const a = this.toRem(fsMax - vwMax * x)
		const b = this.limitDecimals(x * 100)

		this.output.value = `clamp(${this.toRem(fsMin)}rem, ${a}rem + ${b}vw, ${this.toRem(fsMax)}rem)`

		this.result.innerHTML = `X = (fontSizeMax - fontSizeMin) / (viewportWidthMax - viewportWidthMin)
X = (${fsMax}px - ${fsMin}px) / (${vwMax}px - ${vwMin}px)
X = ${this.limitDecimals(x, 5)}

A = fontSizeMax - viewportWidthMax * X
A = ${fsMax}px - ${vwMax}px * ${this.limitDecimals(x, 5)}
A = ${this.limitDecimals(fsMax - vwMax * x)}px = ${a}rem

B = X * 100vw
B = ${this.limitDecimals(x, 5)} * 100vw
B = ${b}vw

Result = clamp(fontSizeMin, A + B, fontSizeMax)
Result = clamp(${this.toRem(fsMin)}rem, ${a}rem + ${b}vw, ${this.toRem(fsMax)}rem)`
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
		this.result = document.getElementById("result")

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
