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

		this.result.innerHTML = `X = (fontSizeMax - fontSizeMin) / (viewportWidthMax - viewportWidthMin)
X = (${this.inputs["font-size-max"].value}px - ${this.inputs["font-size-min"].value}px) / (${this.inputs["viewport-width-max"].value}px - ${this.inputs["viewport-width-min"].value}px)
X = ${this.limitDecimals(vp)}

A = fontSizeMax - viewportWidthMax * X
A = ${this.inputs["font-size-max"].value}px - ${this.inputs["viewport-width-max"].value}px * ${this.limitDecimals(vp)}
A = ${this.limitDecimals(this.inputs["font-size-max"].value - this.inputs["viewport-width-max"].value * vp)}px = ${rem}rem

B = X * 100vw
B = ${this.limitDecimals(vp)} * 100vw
B = ${vw}vw

Result = clamp(fontSizeMin, A + B, fontSizeMax)
Result = clamp(${this.toRem(this.inputs["font-size-min"].value)}rem, ${rem}rem + ${vw}vw, ${this.toRem(this.inputs["font-size-max"].value)}rem)`
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
