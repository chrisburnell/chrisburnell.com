class InteractiveSparkline {
	constructor() {
		this.inputs = {
			inputValues: document.querySelector("#input-values"),
			inputLineWidth: document.querySelector("#input-line-width"),
			inputCurve: document.querySelector("#input-curve"),
			inputEndpoint: document.querySelector("#input-endpoint"),
			inputColor: document.querySelector("#input-color"),
			inputEndpointColor: document.querySelector("#input-endpoint-color"),
			component: document.querySelector("#interactive-sparkline"),
		}

		this.inputs.inputColor.value = this.rgbToHex(window.getComputedStyle(document.body, null).getPropertyValue("color"))

		this.processSparkline(this.inputs)
		Object.values(this.inputs).forEach((input) => {
			input.addEventListener("change", () => {
				this.processSparkline(this.inputs)
			})
			input.addEventListener("input", () => {
				this.processSparkline(this.inputs)
			})
		})
	}

	rgbToHex(rgb) {
		return `#${rgb
			.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)
			.slice(1)
			.map((n) => parseInt(n, 10).toString(16).padStart(2, "0"))
			.join("")}`
	}

	processSparkline(inputs) {
		// strip non-numbers from the input
		inputs.inputValues.value = inputs.inputValues.value.replace(/(?![0-9])./gim, "")
		inputs.inputLineWidth.value = inputs.inputLineWidth.value.replace(/(?![0-9])./gim, "")

		inputs.component.setAttribute("values", inputs.inputValues.value.split(""))
		inputs.component.setAttribute("line-width", inputs.inputLineWidth.value)
		inputs.component.setAttribute("curve", inputs.inputCurve.checked)
		inputs.component.setAttribute("endpoint", inputs.inputEndpoint.checked)
		inputs.component.setAttribute("color", inputs.inputColor.value)
		inputs.component.setAttribute("endpoint-color", inputs.inputEndpointColor.value)
	}
}

if ("HTMLElement" in window) {
	window.InteractiveSparkline = new InteractiveSparkline()
}

export default InteractiveSparkline
