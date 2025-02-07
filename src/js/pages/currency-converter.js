/**
 * Currency Converter
 * @class
 */
class CurrencyConverter {
	constructor() {
		this.inputs = [
			...document.querySelectorAll("#currency-converter input"),
		];

		this.init();
	}

	maxDecimals(number, decimals = 2) {
		return number.toFixed(decimals);
	}

	convert(amount, from, to, decimals) {
		return this.maxDecimals(
			(amount / currencies[from]) * currencies[to],
			decimals,
		);
	}

	convertOthers(others, input) {
		others.forEach((other) => {
			other.value = this.convert(
				input.value,
				input.id,
				other.id,
				other.dataset.decimals
					? Number(other.dataset.decimals)
					: undefined,
			);
		});
	}

	handleEvent(event, others, input) {
		event.preventDefault();
		if (document.activeElement !== input) {
			return;
		}
		this.convertOthers(others, input);
	}

	init() {
		const params = new URLSearchParams(window.location.search);

		this.inputs.forEach((input) => {
			const others = this.inputs.filter((check) => {
				return check.id !== input.id;
			});

			input.addEventListener("change", (event) => {
				this.handleEvent(event, others, input);
			});
			input.addEventListener("input", (event) => {
				this.handleEvent(event, others, input);
			});

			const inputParam = params.get(input.id);
			if (inputParam) {
				input.value = inputParam;
				this.convertOthers(others, input);
			}
		});
	}
}

if ("HTMLElement" in window) {
	/**
	 * @type {CurrencyConverter}
	 */
	window.CurrencyConverter = new CurrencyConverter();
}

/**
 * @type {ClampCalculator}
 */
export default CurrencyConverter;
