/**
 * Currency Converter
 * @class
 */
class CurrencyConverter {
	constructor() {
		this.STORAGE_KEY = "currencies";
		this.inputs = [
			...document.querySelectorAll("#currency-converter input"),
		];
		this.buttons = [
			...document.querySelectorAll("#currency-controls button"),
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

		const ids = this.inputs.map((input) => input.id);
		let saved = localStorage.getItem(this.STORAGE_KEY);
		if (!saved) {
			saved = ids;
			localStorage.setItem(this.STORAGE_KEY, saved);
		}
		if (typeof saved === "string") {
			saved = saved.split(",");
		}

		this.inputs.forEach((input) => {
			const fieldset = input.parentNode;
			const others = this.inputs.filter((check) => {
				return check.id !== input.id;
			});

			input.addEventListener("change", (event) => {
				this.handleEvent(event, others, input);
			});
			input.addEventListener("input", (event) => {
				this.handleEvent(event, others, input);
			});

			if (!saved.includes(input.id)) {
				fieldset.setAttribute("hidden", true);
			}

			const inputParam = params.get(input.id);
			if (inputParam) {
				input.value = inputParam;
				this.convertOthers(others, input);
				fieldset.removeAttribute("hidden");
			}
		});

		this.buttons.forEach((button) => {
			const controls = button.dataset.controls;
			const fieldset = document.getElementById(controls).parentNode;

			if (saved.includes(controls)) {
				button.style = "background-color: var(--color-conifer);";
			}

			const buttonParam = params.get(controls);
			if (buttonParam) {
				fieldset.removeAttribute("hidden");
			}

			button.addEventListener("click", (event) => {
				event.preventDefault();
				const index = saved.indexOf(controls);
				if (index >= 0) {
					saved = saved.filter((s) => {
						return s !== controls;
					});
					localStorage.setItem(this.STORAGE_KEY, saved);
					button.removeAttribute("style");
					fieldset.setAttribute("hidden", true);
				} else {
					saved.push(controls);
					localStorage.setItem(this.STORAGE_KEY, saved);
					button.style = "background-color: var(--color-conifer);";
					fieldset.removeAttribute("hidden");
				}
			});
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
