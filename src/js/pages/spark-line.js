(function () {
	"use strict";

	const inputValues = document.querySelector("#input-values");
	const inputLineWidth = document.querySelector("#input-line-width");
	const inputCurve = document.querySelector("#input-curve");
	const inputEndpoint = document.querySelector("#input-endpoint");
	const inputColor = document.querySelector("#input-color");
	const inputEndpointColor = document.querySelector("#input-endpoint-color");

	const customSparkline = document.querySelector("#sparkline");

	const processSparkline = () => {
		// strip non-numbers from the input
		inputValues.value = inputValues.value.replace(/(?![0-9])./gim, "");

		// set attributes of the custom sparkline
		customSparkline.setAttribute("values", inputValues.value.split(""));
		customSparkline.setAttribute("line-width", inputLineWidth.value);
		customSparkline.setAttribute("curve", inputCurve.checked);
		customSparkline.setAttribute("endpoint", inputEndpoint.checked);
		customSparkline.setAttribute("color", inputColor.value);
		customSparkline.setAttribute("endpoint-color", inputEndpointColor.value);
	};
	processSparkline();

	[inputValues, inputLineWidth, inputCurve, inputEndpoint, inputColor, inputEndpoint].forEach(input => {
		input.addEventListener("change", processSparkline);
		input.addEventListener("input", processSparkline);
	});
})();
