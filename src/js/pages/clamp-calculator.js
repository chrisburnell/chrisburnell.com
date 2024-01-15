/**
 * Clamp Calculator
 * @class
 */
class ClampCalculator {
	connectedCallback() {
		this.inputs = {
			"size-min": null,
			"size-max": null,
			"viewport-min": null,
			"viewport-max": null,
			"viewport-units": null,
			"font-size-root": null,
		}

		this.init()
	}

	/**
	 * Force a number to a specific number of decimal places.
	 * @param {Number} value
	 * @param {Number} decimals
	 * @returns {Number}
	 */
	limitDecimals(value, decimals = 3) {
		return parseFloat(value.toFixed(decimals))
	}

	/**
	 * Converts a value from units in pixels to rems.
	 * @param {Number} px
	 * @param {Number} base
	 * @returns {Number}
	 */
	toRem(px, base = 16) {
		return this.limitDecimals(px / base)
	}

	/**
	 * Perform the necessary calculations and pump the results into the DOM.
	 */
	calculate() {
		const viewportUnits = this.inputs["viewport-units"].value
		const change = (this.inputs["size-max"].value - this.inputs["size-min"].value) / (this.inputs["viewport-max"].value - this.inputs["viewport-min"].value)

		const preferredSizePixels = this.limitDecimals(this.inputs["size-max"].value - this.inputs["viewport-max"].value * change)
		const preferredSize = this.toRem(this.inputs["size-max"].value - this.inputs["viewport-max"].value * change, this.inputs["font-size-root"].value)
		const variableSize = this.limitDecimals(change * 100)

		this.output.value = `clamp(${this.toRem(this.inputs["size-min"].value, this.inputs["font-size-root"].value)}rem, ${preferredSize}rem + ${variableSize}${viewportUnits}, ${this.toRem(this.inputs["size-max"].value, this.inputs["font-size-root"].value)}rem)`

		this.visual.style.fontSize = `${this.inputs["font-size-root"].value}px`
		this.visualOutput.style.fontSize = `clamp(${this.toRem(this.inputs["size-min"].value, this.inputs["font-size-root"].value)}em, ${preferredSize}em + ${variableSize}${viewportUnits}, ${this.toRem(this.inputs["size-max"].value, this.inputs["font-size-root"].value)}em)`

		this.visualRoot.querySelector("span").innerText = `Root Size: ${this.inputs["font-size-root"].value}px`
		this.visualOutput.querySelector("span").innerText = `Clamped Size: ${this.inputs["size-min"].value}–${this.inputs["size-max"].value}px`

		this.howRoot.innerHTML = `${this.inputs["font-size-root"].value}px`

		this.howX.innerHTML = `Change = (sizeMax - sizeMin) / (viewportMax - viewportMin)
Change = (${this.inputs["size-max"].value}px - ${this.inputs["size-min"].value}px) / (${this.inputs["viewport-max"].value}px - ${this.inputs["viewport-min"].value}px)
Change = ${this.limitDecimals(change, 5)}`

		this.howA.innerHTML = `A = sizeMax - viewportMax * Change
A = ${this.inputs["size-max"].value}px - ${this.inputs["viewport-max"].value}px * ${this.limitDecimals(change, 5)}
A = ${preferredSizePixels}px = ${preferredSize}rem`

		this.howB.innerHTML = `B = 100${viewportUnits} * Change
B = 100${viewportUnits} * ${this.limitDecimals(change, 5)}
B = ${variableSize}${viewportUnits}`

		this.howResult.innerHTML = `Result = clamp(sizeMin, A + B, sizeMax)
Result = clamp(${this.toRem(this.inputs["size-min"].value, this.inputs["font-size-root"].value)}rem, ${preferredSize}rem + ${variableSize}${viewportUnits}, ${this.toRem(this.inputs["size-max"].value, this.inputs["font-size-root"].value)}rem)`

		this.howCheck.innerHTML = `A + B = ${preferredSize}rem + ${variableSize}${viewportUnits}
A + B = ${preferredSizePixels}px + ${variableSize}${viewportUnits}

Minimum Size ≈ ${preferredSizePixels}px + (${this.limitDecimals(change, 5)} * ${this.inputs["viewport-min"].value}px)
Minimum Size ≈ ${preferredSizePixels}px + ${this.limitDecimals(change, 5) * this.inputs["viewport-min"].value}px
Minimum Size ≈ ${this.limitDecimals(this.inputs["size-max"].value - this.inputs["viewport-max"].value * change + change * this.inputs["viewport-min"].value)}px

Maximum Size ≈ ${preferredSizePixels}px + (${this.limitDecimals(change, 5)} * ${this.inputs["viewport-max"].value}px)
Maximum Size ≈ ${preferredSizePixels}px + ${this.limitDecimals(change, 5) * this.inputs["viewport-max"].value}px
Maximum Size ≈ ${this.limitDecimals(this.inputs["size-max"].value - this.inputs["viewport-max"].value * change + change * this.inputs["viewport-max"].value)}px`

		this.measureViewport()
	}

	/**
	 * Calculate and inject the measure of the viewport.
	 */
	measureViewport() {
		this.visualCalculated.querySelector("span").innerText = `Current Size: ${this.limitDecimals(this.visualOutput.querySelector(".size-example").getBoundingClientRect().width, 3)}px`
		this.visualViewport.querySelector("span").innerText = `Viewport Size: ${window.innerWidth}px × ${window.innerHeight}px`
	}

	/**
	 * Look for URL parameters and attach event listeners to form elements.
	 */
	init() {
		const params = new URLSearchParams(window.location.search)

		Object.keys(this.inputs).forEach((id) => {
			this.inputs[id] = document.getElementById(id)
			if (params.get(id)) {
				this.inputs[id].value = params.get(id)
			}
		})

		this.inputs["viewport-units"].addEventListener("change", (event) => {
			event.preventDefault()
			this.calculate()
			history.replaceState({}, document.title, `${location.protocol}//${location.host}${location.pathname}?font-size-root=${this.inputs["font-size-root"].value}&size-min=${this.inputs["size-min"].value}&size-max=${this.inputs["size-max"].value}&viewport-min=${this.inputs["viewport-min"].value}&viewport-max=${this.inputs["viewport-max"].value}&viewport-units=${this.inputs["viewport-units"].value}`)
		})

		this.form = document.getElementById("clamp-calculator")
		this.form.addEventListener("submit", (event) => {
			event.preventDefault()
			this.calculate()
			this.output.focus()
			history.replaceState({}, document.title, `${location.protocol}//${location.host}${location.pathname}?font-size-root=${this.inputs["font-size-root"].value}&size-min=${this.inputs["size-min"].value}&size-max=${this.inputs["size-max"].value}&viewport-min=${this.inputs["viewport-min"].value}&viewport-max=${this.inputs["viewport-max"].value}&viewport-units=${this.inputs["viewport-units"].value}`)
		})
		this.form.addEventListener("reset", (event) => {
			event.preventDefault()
			this.inputs["viewport-units"].querySelector("[data-default]").selected = true
			Object.values(this.inputs)
				.filter((element) => {
					return element.localName === "input"
				})
				.forEach((element) => {
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
	/**
	 * @type {ClampCalculator}
	 */
	window.ClampCalculator = new ClampCalculator()
}

/**
 * @type {ClampCalculator}
 */
export default ClampCalculator
