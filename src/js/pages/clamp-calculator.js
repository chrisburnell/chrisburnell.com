class ClampCalculator {
	constructor() {
		this.inputs = {
			"font-size-min": null,
			"font-size-max": null,
			"viewport-min": null,
			"viewport-max": null,
			"font-size-root": null,
		}

		this.init()
	}

	limitDecimals(value, decimals = 3) {
		return parseFloat(value.toFixed(decimals))
	}

	toRem(px, base = 16) {
		return this.limitDecimals(px / base)
	}

	calculate() {
		const change = (this.inputs["font-size-max"].value - this.inputs["font-size-min"].value) / (this.inputs["viewport-max"].value - this.inputs["viewport-min"].value)

		const startingFontSize = this.toRem(this.inputs["font-size-max"].value - this.inputs["viewport-max"].value * change, this.inputs["font-size-root"].value)
		const variableFontSize = this.limitDecimals(change * 100)

		this.output.value = `clamp(${this.toRem(this.inputs["font-size-min"].value, this.inputs["font-size-root"].value)}rem, ${startingFontSize}rem + ${variableFontSize}vw, ${this.toRem(this.inputs["font-size-max"].value, this.inputs["font-size-root"].value)}rem)`

		this.visual.style.fontSize = `${this.inputs["font-size-root"].value}px`
		this.visual.querySelector("li:last-child").style.fontSize = `clamp(${this.toRem(this.inputs["font-size-min"].value, this.inputs["font-size-root"].value)}em, ${startingFontSize}em + ${variableFontSize}vw, ${this.toRem(this.inputs["font-size-max"].value, this.inputs["font-size-root"].value)}em)`

		this.visual.querySelector("li:first-child span").innerText = `Root: ${this.inputs["font-size-root"].value}px`
		this.visual.querySelector("li:last-child span").innerText = `Clamped: ${this.inputs["font-size-min"].value}–${this.inputs["font-size-max"].value}px`

		this.howRoot.innerHTML = `${this.inputs["font-size-root"].value}px`

		this.howX.innerHTML = `Change = (fontSizeMax - fontSizeMin) / (viewportMax - viewportMin)
Change = (${this.inputs["font-size-max"].value}px - ${this.inputs["font-size-min"].value}px) / (${this.inputs["viewport-max"].value}px - ${this.inputs["viewport-min"].value}px)
Change = ${this.limitDecimals(change, 5)}`

		this.howA.innerHTML = `A = fontSizeMax - viewportMax * Change
A = ${this.inputs["font-size-max"].value}px - ${this.inputs["viewport-max"].value}px * ${this.limitDecimals(change, 5)}
A = ${this.limitDecimals(this.inputs["font-size-max"].value - this.inputs["viewport-max"].value * change)}px = ${startingFontSize}rem`

		this.howB.innerHTML = `B = 100vw * Change
B = 100vw * ${this.limitDecimals(change, 5)}
B = ${variableFontSize}vw`

		this.howResult.innerHTML = `Result = clamp(fontSizeMin, A + B, fontSizeMax)
Result = clamp(${this.toRem(this.inputs["font-size-min"].value, this.inputs["font-size-root"].value)}rem, ${startingFontSize}rem + ${variableFontSize}vw, ${this.toRem(this.inputs["font-size-max"].value, this.inputs["font-size-root"].value)}rem)`
	}

	init() {
		const params = new URLSearchParams(window.location.search)

		Object.keys(this.inputs).forEach((id) => {
			this.inputs[id] = document.getElementById(id)
			if (params.get(id)) {
				this.inputs[id].value = params.get(id)
			}
		})

		this.form = document.getElementById("clamp-calculator")
		this.form.addEventListener("submit", (event) => {
			event.preventDefault()
			this.calculate()
			this.output.focus()
			history.replaceState({}, document.title, `${location.protocol}//${location.host}${location.pathname}?font-size-root=${this.inputs["font-size-root"].value}&font-size-min=${this.inputs["font-size-min"].value}&font-size-max=${this.inputs["font-size-max"].value}&viewport-min=${this.inputs["viewport-min"].value}&viewport-max=${this.inputs["viewport-max"].value}`)
		})
		this.form.addEventListener("reset", (event) => {
			event.preventDefault()
			Object.values(this.inputs).forEach((element) => {
				element.value = element.dataset.default
			})
			this.calculate()
			history.replaceState({}, document.title, `${location.protocol}//${location.host}${location.pathname}`)
		})

		this.output = document.getElementById("output")
		this.visual = document.getElementById("visual")
		this.howRoot = document.getElementById("how-root")
		this.howX = document.getElementById("how-x")
		this.howA = document.getElementById("how-a")
		this.howB = document.getElementById("how-b")
		this.howResult = document.getElementById("how-result")

		this.calculate()
	}
}

if ("HTMLElement" in window) {
	window.ClampCalculator = new ClampCalculator()
}

export default ClampCalculator
