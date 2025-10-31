/* eslint-disable no-undef */

/**
 * Currency Converter
 */
class CurrencyConverter {
	/**
	 * @class
	 */
	constructor() {
		this.STORAGE_KEY = "currencies";
		this.inputs = [
			...document.querySelectorAll("#currency-converter [type=number]"),
		];
		this.buttons = [
			...document.querySelectorAll("#currency-controls button"),
		];
		this.dateInput = document.querySelector(
			"#currency-converter [type=date]",
		);

		this.init();
	}

	/**
	 * @param {number} number
	 * @param {number} decimals
	 * @returns {string}
	 */
	maxDecimals(number, decimals = 2) {
		return number.toFixed(decimals);
	}

	/**
	 *
	 * @param {number} amount
	 * @param {string} from
	 * @param {string} to
	 * @param {number} decimals
	 * @returns {string}
	 */
	convert(amount, from, to, decimals) {
		return this.maxDecimals(
			(amount / currencies[from]) * currencies[to],
			decimals,
		);
	}

	/**
	 * @param {HTMLInputElement[]} others
	 * @param {HTMLInputElement} input
	 * @returns {void}
	 */
	convertOthers(others, input) {
		others.forEach((other) => {
			if (currencies[input.id] && currencies[other.id]) {
				other.value = this.convert(
					input.value,
					input.id,
					other.id,
					other.dataset.decimals
						? Number(other.dataset.decimals)
						: undefined,
				);
			}
		});
	}

	/**
	 * @param {Event} event
	 * @param {HTMLInputElement[]} others
	 * @param {HTMLInputElement} input
	 * @returns {void}
	 */
	handleEvent(event, others, input) {
		event.preventDefault();
		if (
			document.activeElement !== input ||
			!input.value ||
			input.value === ""
		) {
			return;
		}
		this.convertOthers(others, input);
		const url = new URL(window.location.href);
		Object.keys(currencies).forEach((currency) => {
			url.searchParams.delete(currency);
		});
		url.searchParams.append(input.id, input.value);
		window.history.replaceState({}, "", url);
	}

	/**
	 * @param {string} date
	 * @returns {void}
	 */
	async fetchRatesFromDate(date = "latest") {
		if (datedCurrencies[date]) {
			return datedCurrencies[date];
		}

		const response = await fetch(
			`https://api.frankfurter.dev/v1/${date}?base=EUR`,
		);
		const json = await response.json();
		json.rates[json.base] = json.amount;
		datedCurrencies[date] = json.rates;
		return json.rates;
	}

	/**
	 * @returns {void}
	 */
	async init() {
		const params = new URLSearchParams(window.location.search);

		const dateParam = params.get("date");
		if (dateParam) {
			this.dateInput.value = dateParam;
			currencies = await this.fetchRatesFromDate(dateParam);
			console.log(dateParam, currencies);
		}

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

			if (currencies[input.id]) {
				input.placeholder = this.maxDecimals(currencies[input.id]);
			} else {
				input.disabled = true;
				fieldset.setAttribute("hidden", true);
			}

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

		this.dateInput.addEventListener("change", async () => {
			const url = new URL(window.location.href);
			if (!this.dateInput.value || this.dateInput.value === "") {
				url.searchParams.delete("date");
				window.history.replaceState({}, "", url);
				currencies = datedCurrencies["latest"];
				this.inputs.forEach((input) => {
					const others = this.inputs.filter((check) => {
						return check.id !== input.id;
					});
					if (url.searchParams.get(input.id)) {
						this.convertOthers(others, input);
					}
					input.placeholder = this.maxDecimals(currencies[input.id]);
				});
				return;
			}

			url.searchParams.delete("date");
			url.searchParams.append("date", this.dateInput.value);
			window.history.replaceState({}, "", url);
			currencies = await this.fetchRatesFromDate(this.dateInput.value);
			this.inputs.forEach((input) => {
				const others = this.inputs.filter((check) => {
					return check.id !== input.id;
				});
				if (url.searchParams.get(input.id)) {
					this.convertOthers(others, input);
				}
				input.placeholder = this.maxDecimals(currencies[input.id]);
			});
			datedCurrencies[this.dateInput.value] = currencies;
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
 * @type {CurrencyConverter}
 */
export default CurrencyConverter;
