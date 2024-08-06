const demo = document.querySelector(".demo");
const inputs = document.querySelectorAll(".demo input");
const colorMethodSelect = document.getElementById("color-method");
const hueMethodSelect = document.getElementById("hue-method");

inputs.forEach((input) => {
	input.addEventListener("change", () => {
		demo.style.setProperty(`--${input.id}`, input.value);
	});
});

colorMethodSelect.addEventListener("change", () => {
	if (colorMethodSelect.value === "srgb") {
		hueMethodSelect.disabled = true;
	} else {
		hueMethodSelect.removeAttribute("disabled");
	}
});
