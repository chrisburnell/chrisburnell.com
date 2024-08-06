class KaprekarConstantCalculator {
	constructor() {
		this.init();
	}

	arrayToNumber(value) {
		return Number(value.join(""));
	}

	performRoutine(value) {
		const array = String(value).split("").sort();

		const descending = this.arrayToNumber(array.slice().reverse());
		const ascending = this.arrayToNumber(array);
		const total = descending - ascending;

		const dString = String(descending).padStart(4, "0");
		const aString = String(ascending).padStart(4, "0");
		const tString = String(total).padStart(4, "0");

		const row = this.table.insertRow();

		const cell = row.insertCell();
		cell.classList.add("monospace");
		cell.appendChild(
			document.createTextNode(`${dString} - ${aString} = ${tString}`),
		);

		return tString;
	}

	submitForm() {
		this.table.innerHTML = "";

		if (
			this.input.value.match(/^\d{4}$/g) &&
			!this.input.value.match(/^(\d)\1{3}$/g)
		) {
			let result = this.performRoutine(this.input.value);
			let count = 1;

			while (result !== "6174" && count < 8) {
				result = this.performRoutine(result);
				count++;
			}
		} else {
			const errorText = `The starting number must be a 4-digit number and contain at least 2 different digits. ${this.input.value} does not meet this criteria.`;

			const row = this.table.insertRow();

			const cellError = row.insertCell();
			cellError.appendChild(document.createTextNode(errorText));

			console.log(errorText);
		}
	}

	init() {
		this.form = document.getElementById("calculator");
		this.input = document.getElementById("start");
		this.table = document.getElementById("output");

		this.form.addEventListener("submit", (event) => {
			event.preventDefault();
			this.submitForm();
		});
	}
}

if ("HTMLElement" in window) {
	window.KaprekarConstantCalculator = new KaprekarConstantCalculator();
}

export default KaprekarConstantCalculator;
