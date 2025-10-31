(async () => {
	"use strict";

	const inputRed = document.getElementById("input-hex-red");
	const inputGreen = document.getElementById("input-hex-green");
	const inputBlue = document.getElementById("input-hex-blue");
	const outputHex = document.getElementById("output-hex");

	const setHex = () => {
		outputHex.setAttribute(
			"style",
			`background-color: rgb(${inputRed.value}, ${inputGreen.value}, ${inputBlue.value});`,
		);
	};

	await [inputRed, inputGreen, inputBlue].forEach((input) => {
		input.addEventListener("change", setHex);
		input.addEventListener("input", setHex);
		input.addEventListener("touchstart", setHex);
		input.addEventListener("touchmove", setHex);
		input.addEventListener("touchend", setHex);
	});

	const inputHue = document.getElementById("input-hsl-hue");
	const inputSaturation = document.getElementById("input-hsl-saturation");
	const inputLightness = document.getElementById("input-hsl-lightness");
	const outputHSL = document.getElementById("output-hsl");

	const setHSL = () => {
		outputHSL.setAttribute(
			"style",
			`background-color: hsl(${inputHue.value} ${inputSaturation.value}% ${inputLightness.value}%);`,
		);
	};

	await [inputHue, inputSaturation, inputLightness].forEach((input) => {
		input.addEventListener("change", setHSL);
		input.addEventListener("input", setHSL);
		input.addEventListener("touchstart", setHSL);
		input.addEventListener("touchmove", setHSL);
		input.addEventListener("touchend", setHSL);
	});

	const inputL = document.getElementById("input-oklch-lightness");
	const inputC = document.getElementById("input-oklch-chroma");
	const inputH = document.getElementById("input-oklch-hue");
	const outputOKLCH = document.getElementById("output-oklch");

	const setOKLCH = () => {
		outputOKLCH.setAttribute(
			"style",
			`background-color: oklch(${inputL.value}% ${inputC.value} ${inputH.value});`,
		);
	};

	await [inputL, inputC, inputH].forEach((input) => {
		input.addEventListener("change", setOKLCH);
		input.addEventListener("input", setOKLCH);
		input.addEventListener("touchstart", setOKLCH);
		input.addEventListener("touchmove", setOKLCH);
		input.addEventListener("touchend", setOKLCH);
	});

	const inputOpacity = document.getElementById("input-opacity");
	const outputOpacity = document.getElementById("output-opacity");

	const setOpacity = () => {
		outputOpacity.setAttribute(
			"style",
			`--output-opacity: ${inputOpacity.value}%;`,
		);
	};

	await [inputOpacity].forEach((input) => {
		input.addEventListener("change", setOpacity);
		input.addEventListener("input", setOpacity);
		input.addEventListener("touchstart", setOpacity);
		input.addEventListener("touchmove", setOpacity);
		input.addEventListener("touchend", setOpacity);
	});

	const inputSnowyLightness = document.getElementById(
		"input-snowy-lightness",
	);
	const inputThunderLightness = document.getElementById(
		"input-thunder-lightness",
	);
	const inputMonochromeChroma = document.getElementById(
		"input-monochrome-chroma",
	);
	const inputMonochromeHue = document.getElementById("input-monochrome-hue");
	const inputRavenLightness = document.getElementById(
		"input-raven-lightness",
	);
	const inputRavenChroma = document.getElementById("input-raven-chroma");
	const inputRavenHue = document.getElementById("input-raven-hue");
	const outputPalette = document.getElementById("output-palette");

	const setPalette = () => {
		outputPalette.setAttribute(
			"style",
			`--snowy-lightness: ${inputSnowyLightness.value}%; --thunder-lightness: ${inputThunderLightness.value}%; --monochrome-chroma: ${inputMonochromeChroma.value}; --monochrome-hue: ${inputMonochromeHue.value}; --raven-lightness: ${inputRavenLightness.value}%; --raven-chroma: ${inputRavenChroma.value}; --raven-hue: ${inputRavenHue.value};`,
		);
	};

	await [
		inputSnowyLightness,
		inputThunderLightness,
		inputMonochromeChroma,
		inputMonochromeHue,
		inputRavenLightness,
		inputRavenChroma,
		inputRavenHue,
	].forEach((input) => {
		input.addEventListener("change", setPalette);
		input.addEventListener("input", setPalette);
		input.addEventListener("touchstart", setPalette);
		input.addEventListener("touchmove", setPalette);
		input.addEventListener("touchend", setPalette);
	});
})();
