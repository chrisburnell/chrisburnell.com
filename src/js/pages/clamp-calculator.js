/**
 * Clamp Calculator
 * @class
 */
class ClampCalculator {
	constructor() {
		this.inputs = {
			"size-min": null,
			"size-max": null,
			"viewport-min": null,
			"viewport-max": null,
			"viewport-units": null,
			"font-size-root": null,
			"rounding-strategy": null,
			"rounding-value": null,
		}

		this.init()
	}

	/**
	 * Force a number to a specific number of decimal places.
	 * @param {Number} value
	 * @param {Number} decimals
	 * @returns {Number}
	 */
	maxDecimals(number, decimals = 3) {
		return +number.toFixed(decimals)
	}

	/**
	 * Converts a value from units in pixels to rems.
	 * @param {Number} px
	 * @param {Number} base
	 * @returns {Number}
	 */
	toRem(px, base = 16) {
		return this.maxDecimals(px / base)
	}

	/**
	 * Perform the necessary calculations and pump the results into the DOM.
	 */
	calculate() {
		const sizeMin = this.inputs["size-min"].value
		const sizeMax = this.inputs["size-max"].value
		const viewportMin = this.inputs["viewport-min"].value
		const viewportMax = this.inputs["viewport-max"].value
		const fontSizeRoot = this.inputs["font-size-root"].value
		const viewportUnits = this.inputs["viewport-units"].value
		const roundingStrategy = this.inputs["rounding-strategy"].value
		const roundingValue = this.inputs["rounding-value"].value

		const change = (sizeMax - sizeMin) / (viewportMax - viewportMin)

		const preferredSizePixels = this.maxDecimals(sizeMax - viewportMax * change)
		const preferredSize = this.toRem(sizeMax - viewportMax * change, fontSizeRoot)
		const variableSize = this.maxDecimals(change * 100)

		const computedMin = this.toRem(sizeMin, fontSizeRoot)
		const computedMax = this.toRem(sizeMax, fontSizeRoot)

		let computedValue = `clamp(${computedMin}rem, ${preferredSize}rem + ${variableSize}${viewportUnits}, ${computedMax}rem)`
		if (roundingStrategy !== "none") {
			computedValue = `clamp(${computedMin}rem, round(${roundingStrategy !== "nearest" ? `${roundingStrategy}, ` : ""}${preferredSize}rem + ${variableSize}${viewportUnits}, ${roundingValue}), ${computedMax}rem)`
		}

		this.output.value = computedValue
		this.visualOutput.style.fontSize = computedValue

		this.visual.style.fontSize = `${fontSizeRoot}px`

		this.visualRoot.querySelector("span").innerText = `Root Size: ${fontSizeRoot}px`
		this.visualOutput.querySelector("span").innerText = `Clamped Size: ${sizeMin}–${sizeMax}px`

		this.howRoot.innerHTML = `${fontSizeRoot}px`

		this.howX.innerHTML = `Change = (sizeMax - sizeMin) / (viewportMax - viewportMin)
Change = (${sizeMax}px - ${sizeMin}px) / (${viewportMax}px - ${viewportMin}px)
Change = ${this.maxDecimals(change, 5)}`

		this.howA.innerHTML = `A = sizeMax - viewportMax * Change
A = ${sizeMax}px - ${viewportMax}px * ${this.maxDecimals(change, 5)}
A = ${preferredSizePixels}px = ${preferredSize}rem`

		this.howB.innerHTML = `B = 100${viewportUnits} * Change
B = 100${viewportUnits} * ${this.maxDecimals(change, 5)}
B = ${variableSize}${viewportUnits}`

		this.howResult.innerHTML = `Result = clamp(sizeMin, A + B, sizeMax)
Result = ${computedValue}`

		this.howCheck.innerHTML = `A + B = ${preferredSize}rem + ${variableSize}${viewportUnits}
A + B = ${preferredSizePixels}px + ${variableSize}${viewportUnits}

Minimum Size ≈ ${preferredSizePixels}px + (${this.maxDecimals(change, 5)} * ${viewportMin}px)
Minimum Size ≈ ${preferredSizePixels}px + ${this.maxDecimals(change, 5) * viewportMin}px
Minimum Size ≈ ${this.maxDecimals(sizeMax - viewportMax * change + viewportMin * change)}px

Maximum Size ≈ ${preferredSizePixels}px + (${this.maxDecimals(change, 5)} * ${viewportMax}px)
Maximum Size ≈ ${preferredSizePixels}px + ${this.maxDecimals(change, 5) * viewportMax}px
Maximum Size ≈ ${this.maxDecimals(sizeMax - viewportMax * change + viewportMax * change)}px`

		this.measureViewport()
	}

	/**
	 * Calculate and inject the measure of the viewport.
	 */
	measureViewport() {
		this.visualCalculated.querySelector("span").innerText = `Current Size: ${this.maxDecimals(this.visualOutput.querySelector(".size-example").getBoundingClientRect().width, 3)}px`
		this.visualViewport.querySelector("span").innerText = `Viewport Size: ${window.innerWidth}px × ${window.innerHeight}px`
	}

	/**
	 * Update the location history based on form values.
	 */
	updateHistory() {
		if (this.inputs["rounding-strategy"].value !== "none") {
			this.inputs["rounding-value"].removeAttribute("disabled")
			history.replaceState({}, document.title, `${location.protocol}//${location.host}${location.pathname}?font-size-root=${this.inputs["font-size-root"].value}&size-min=${this.inputs["size-min"].value}&size-max=${this.inputs["size-max"].value}&viewport-min=${this.inputs["viewport-min"].value}&viewport-max=${this.inputs["viewport-max"].value}&viewport-units=${this.inputs["viewport-units"].value}&rounding-strategy=${this.inputs["rounding-strategy"].value}&rounding-value=${this.inputs["rounding-value"].value}`)
		} else {
			this.inputs["rounding-value"].disabled = true
			history.replaceState({}, document.title, `${location.protocol}//${location.host}${location.pathname}?font-size-root=${this.inputs["font-size-root"].value}&size-min=${this.inputs["size-min"].value}&size-max=${this.inputs["size-max"].value}&viewport-min=${this.inputs["viewport-min"].value}&viewport-max=${this.inputs["viewport-max"].value}&viewport-units=${this.inputs["viewport-units"].value}`)
		}
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

		if (this.inputs["rounding-strategy"].value !== "none") {
			this.inputs["rounding-value"].removeAttribute("disabled")
			document.getElementById("optional-rounding").open = true
		}

		this.inputs["viewport-units"].addEventListener("change", (event) => {
			event.preventDefault()
			this.calculate()
			this.updateHistory()
		})

		this.inputs["rounding-strategy"].addEventListener("change", (event) => {
			event.preventDefault()
			this.calculate()
			this.updateHistory()
		})

		this.form = document.getElementById("clamp-calculator")
		this.form.addEventListener("submit", (event) => {
			event.preventDefault()
			this.calculate()
			this.output.focus()
			this.updateHistory()
		})
		this.form.addEventListener("reset", (event) => {
			event.preventDefault()
			this.inputs["viewport-units"].querySelector("[data-default]").selected = true
			this.inputs["rounding-strategy"].querySelector("[data-default]").selected = true
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
