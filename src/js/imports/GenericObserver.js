/**
 * @typedef {object} GenericObserverConfig
 * @property {HTMLElement} element
 * @property {Function} [onStart]
 * @property {(mutations: MutationRecord[], observer: MutationObserver, instance: GenericObserver) => void} [onMutation]
 * @property {boolean} [overwriteOptions]
 * @property {object} [options]
 * @property {boolean} [startImmediately]
 */
export default class GenericObserver {
	/**
	 * @class
	 * @param {GenericObserverConfig} config
	 */
	constructor({
		element,
		onStart = () => {},
		onMutation = () => {},
		overwriteOptions = false,
		options = {},
		startImmediately = false,
	}) {
		if (!(element instanceof HTMLElement)) {
			throw new TypeError(
				"GenericObserver: `element` must be an HTMLElement",
			);
		}

		/** @type {HTMLElement} **/
		this.element = element;
		/** @type {Function} **/
		this.onStart = onStart;
		/** @type {Function} **/
		this.onMutation = onMutation;
		/** @type {boolean} **/
		this.overwriteOptions = overwriteOptions;
		/** @type {object} **/
		this.options = this.overwriteOptions
			? options
			: {
					childList: true,
					subtree: true,
					...options,
				};
		/** @type {boolean} **/
		this.startImmediately = startImmediately;
		/** @type {boolean} **/
		this.isObserving = false;

		if (startImmediately) {
			this.observe();
		}
	}

	/**
	 * @returns {void}
	 */
	disconnect() {
		this.observer?.disconnect();
		this.isObserving = false;
	}

	/**
	 * @returns {void}
	 */
	observe() {
		this.disconnect();
		this.onStart();
		this.observer = new MutationObserver((mutations, observer) => {
			this.onMutation(mutations, observer, this);
		});
		this.observer.observe(this.element, this.options);
		this.isObserving = true;
	}
}
