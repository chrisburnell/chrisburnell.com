class ClampCalculator {
	constructor() {
		this.inputs = {
			"size-min": null,
			"size-max": null,
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
		const change = (this.inputs["size-max"].value - this.inputs["size-min"].value) / (this.inputs["viewport-max"].value - this.inputs["viewport-min"].value)

		const preferredSizePixels = this.limitDecimals(this.inputs["size-max"].value - this.inputs["viewport-max"].value * change)
		const preferredSize = this.toRem(this.inputs["size-max"].value - this.inputs["viewport-max"].value * change, this.inputs["font-size-root"].value)
		const variableSize = this.limitDecimals(change * 100)

		this.output.value = `clamp(${this.toRem(this.inputs["size-min"].value, this.inputs["font-size-root"].value)}rem, ${preferredSize}rem + ${variableSize}vw, ${this.toRem(this.inputs["size-max"].value, this.inputs["font-size-root"].value)}rem)`

		this.visual.style.fontSize = `${this.inputs["font-size-root"].value}px`
		this.visualOutput.style.fontSize = `clamp(${this.toRem(this.inputs["size-min"].value, this.inputs["font-size-root"].value)}em, ${preferredSize}em + ${variableSize}vw, ${this.toRem(this.inputs["size-max"].value, this.inputs["font-size-root"].value)}em)`

		this.visualRoot.querySelector("span").innerText = `Root: ${this.inputs["font-size-root"].value}px`
		this.visualOutput.querySelector("span").innerText = `Clamped: ${this.inputs["size-min"].value}–${this.inputs["size-max"].value}px`

		this.howRoot.innerHTML = `${this.inputs["font-size-root"].value}px`

		this.howX.innerHTML = `Change = (sizeMax - sizeMin) / (viewportMax - viewportMin)
Change = (${this.inputs["size-max"].value}px - ${this.inputs["size-min"].value}px) / (${this.inputs["viewport-max"].value}px - ${this.inputs["viewport-min"].value}px)
Change = ${this.limitDecimals(change, 5)}`

		this.howA.innerHTML = `A = sizeMax - viewportMax * Change
A = ${this.inputs["size-max"].value}px - ${this.inputs["viewport-max"].value}px * ${this.limitDecimals(change, 5)}
A = ${preferredSizePixels}px = ${preferredSize}rem`

		this.howB.innerHTML = `B = 100vw * Change
B = 100vw * ${this.limitDecimals(change, 5)}
B = ${variableSize}vw`

		this.howResult.innerHTML = `Result = clamp(sizeMin, A + B, sizeMax)
Result = clamp(${this.toRem(this.inputs["size-min"].value, this.inputs["font-size-root"].value)}rem, ${preferredSize}rem + ${variableSize}vw, ${this.toRem(this.inputs["size-max"].value, this.inputs["font-size-root"].value)}rem)`

		this.howCheck.innerHTML = `A + B = ${preferredSize}rem + ${variableSize}vw
A + B = ${preferredSizePixels}px + ${variableSize}vw

Minimum Size ≈ ${preferredSizePixels}px + (${this.limitDecimals(change, 5)} * ${this.inputs["viewport-min"].value}px)
Minimum Size ≈ ${preferredSizePixels}px + ${this.limitDecimals(change, 5) * this.inputs["viewport-min"].value}px
Minimum Size ≈ ${this.limitDecimals((this.inputs["size-max"].value - this.inputs["viewport-max"].value * change) + (change * this.inputs["viewport-min"].value))}px

Maximum Size ≈ ${preferredSizePixels}px + (${this.limitDecimals(change, 5)} * ${this.inputs["viewport-max"].value}px)
Maximum Size ≈ ${preferredSizePixels}px + ${this.limitDecimals(change, 5) * this.inputs["viewport-max"].value}px
Maximum Size ≈ ${this.limitDecimals((this.inputs["size-max"].value - this.inputs["viewport-max"].value * change) + (change * this.inputs["viewport-max"].value))}px`

		this.measureViewport()
	}

	measureViewport() {
		this.visualViewport.querySelector("span").innerText = `Viewport Width: ${window.innerWidth}px`
		this.visualCalculated.querySelector("span").innerText = `Calculated: ${this.limitDecimals(this.visualOutput.querySelector(".size-example").getBoundingClientRect().width, 3)}px`
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
			history.replaceState({}, document.title, `${location.protocol}//${location.host}${location.pathname}?font-size-root=${this.inputs["font-size-root"].value}&size-min=${this.inputs["size-min"].value}&size-max=${this.inputs["size-max"].value}&viewport-min=${this.inputs["viewport-min"].value}&viewport-max=${this.inputs["viewport-max"].value}`)
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
		this.visualViewport = document.getElementById("visual-viewport")
		this.visualRoot = document.getElementById("visual-root")
		this.visualOutput = document.getElementById("visual-output")
		this.visualCalculated = document.getElementById("visual-calculated")
		this.howRoot = document.getElementById("how-root")
		this.howX = document.getElementById("how-x")
		this.howA = document.getElementById("how-a")
		this.howB = document.getElementById("how-b")
		this.howResult = document.getElementById("how-result")
		this.howCheck = document.getElementById("how-check")

		this.calculate()
		this.measureViewport()
		window.addEventListener("resize", () => {
			this.measureViewport()
		})
	}
}

if ("HTMLElement" in window) {
	window.ClampCalculator = new ClampCalculator()
}

export default ClampCalculator
