const demos = [...document.querySelectorAll(".demo")];
const demosLength = demos.length;

const inverseLightnessFunctions = {
	1: (inverse, lightness) => {
		inverse.value = (1 - lightness) * 100;
	},
	2: (inverse, lightness) => {
		inverse.value = (1 - Math.round(lightness)) * 100;
	},
	3: (inverse, lightness) => {
		inverse.value = (1 - Math.round(lightness)) * 100;
	},
	4: (inverse, lightness) => {
		inverse.value =
			(1 - Math.round(lightness)) * 70 + Math.round(lightness) * 30;
	},
};

const inverseChromaFunctions = {
	default: (inverse, chroma) => {
		inverse.value = chroma;
	},
	3: (inverse, chroma) => {
		inverse.value = 0;
	},
	4: (inverse, chroma) => {
		inverse.value = 0;
	},
};

Array.from({ length: demosLength }, (_, i) => i + 1).forEach((n) => {
	const demo = document.querySelector(`#demo-${n}`);
	const lightness = demo.querySelector(`#demo-${n}-lightness`);
	const inverseLightness = demo.querySelector(`#demo-${n}-inverse-lightness`);
	const chroma = demo.querySelector(`#demo-${n}-chroma`);
	const inverseChroma = demo.querySelector(`#demo-${n}-inverse-chroma`);
	const hue = demo.querySelector(`#demo-${n}-hue`);
	const inverseHue = demo.querySelector(`#demo-${n}-inverse-hue`);
	const graph = demo.querySelector(`#demo-${n} .graph`);
	["change", "input"].forEach((type) => {
		lightness.addEventListener(type, (event) => {
			const lightness = Math.round(event.target.value) / 100;
			demo.style.setProperty("--l", lightness);
			const chroma = Number(demo.style.getPropertyValue("--c"));
			const hue = Number(demo.style.getPropertyValue("--h"));

			if (inverseLightness) {
				const fn = inverseLightnessFunctions[n]
					? inverseLightnessFunctions[n]
					: inverseLightnessFunctions.default;
				fn(inverseLightness, lightness);
			}
		});
		if (chroma) {
			chroma.addEventListener(type, (event) => {
				const chroma = event.target.value;
				demo.style.setProperty("--c", chroma);
				const lightness = Number(demo.style.getPropertyValue("--l"));
				const hue = Number(demo.style.getPropertyValue("--h"));

				if (inverseChroma) {
					const fn = inverseChromaFunctions[n]
						? inverseChromaFunctions[n]
						: inverseChromaFunctions.default;
					fn(inverseChroma, chroma);
				}
			});
		}
		if (hue) {
			hue.addEventListener(type, (event) => {
				const hue = event.target.value;
				demo.style.setProperty("--h", hue);
				inverseHue.value = hue;
				const lightness = Number(demo.style.getPropertyValue("--l"));
				const chroma = Number(demo.style.getPropertyValue("--c"));
			});
		}
	});
});
