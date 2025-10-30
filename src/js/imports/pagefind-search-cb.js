/* eslint-disable no-undef */

/**
 * @tag pagefind-search
 * @summary A web component to search with Pagefind.
 */
export default class PagefindSearchCB extends PagefindSearch {
	/**
	 * @param {boolean} [isCSSNakedDay]
	 * @class
	 */
	async connectedCallback(isCSSNakedDay) {
		if (this.hasAttached) {
			return;
		}

		this.inputElement = this.querySelector("input[type=text]");
		this.hasAttached = true;
		this.count = PagefindSearchCB.count++;
		this.setAttribute("id", this.id);

		// capture query search parameters
		const params = new URLSearchParams(window.location.search);
		if (params.has("q") || params.has("query")) {
			this.inputElement.value = params.get("q") ?? params.get("query");
		}

		// clear out fallback content
		this.replaceChildren();

		// we load these in every instance but the browser de-dupes requests for us
		if (!isCSSNakedDay) {
			let stylesheetUrl = `${this.bundlePath}pagefind-ui.css`;
			let link = document.createElement("link");
			link.rel = "stylesheet";
			link.href = stylesheetUrl;
			this.appendChild(link);
		}
		let scriptUrl = `${this.bundlePath}pagefind-ui.js`;
		this.scriptPromise = import(scriptUrl);
		if (!this.hasAttribute(PagefindSearchCB.attrs.manualInit)) {
			await this.scriptPromise;
			await this.pagefind();
		}
	}
}
