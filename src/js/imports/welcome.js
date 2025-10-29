/**
 * Welcome
 */
class Welcome {
	/**
	 * @class
	 */
	constructor() {
		const serviceWorkerStatus =
			navigator?.serviceWorker?.controller?.state || "pending";

		const operatingSystemString = `OS:              ${navigator.oscpu}`;
		const languageString = `Language:        ${navigator.language}`;
		const networkString = `Network:         ${navigator.onLine === true ? "Online" : "Offline"}`;
		const serviceWorkerString = `Service Worker:  ${serviceWorkerStatus.charAt(0).toUpperCase() + serviceWorkerStatus.slice(1)}`;

		const divider = "-".repeat(
			Math.max(
				operatingSystemString.length,
				languageString.length,
				networkString.length,
				serviceWorkerString.length,
			),
		);

		// prettier-ignore
		const raven = [
			`%c                       ░█░█       %cchrisburnell.com`,
			`%c ██░░░░░█░             █████      %c${divider}`,
			`%c  ░▓▓██▓███▓█░       ██▒░▓███     %c${operatingSystemString}`,
			`%c    ░░█▓▒██▓░░█░   █▓░██▓██▓██░░  %c${languageString}`,
			`%c     ░█░███▓▓██░█░█▓███░░█▓██░█   %c${networkString}`,
			`%c       ░░▒██▓░▒█░██▓███▓▓██▓░     %c${serviceWorkerString}`,
			`%c          ░░▓██████▒█▓▒▓▒░░`,
			`%c            ░███▓▒▓▒░░▓▓░░░`,
			`%c▒█▒▓▒▓▓▓▓▓██▓▓░░▓░░▓▒░███▒░`,
			`%c ░▓███▓██░▒▒░░▒██▒▓█     █▒`,
			`%c     ░██▒░░░██░▒▓█░       ░`,
			`%c             ░▒█▓░░▓█░`,
			`%c              ░▒▓░░▒░░░\n`,
			`%cChecking out the source code, %ceh%c?\n`,
			`%cGet in touch with me if you want to know more! https://chrisburnell.com/about/#contact`,
		]

		console.log(
			raven.join("\n"),
			"color: #5f8aa6",
			"color: inherit",
			"color: #5f8aa6",
			"color: inherit",
			"color: #5f8aa6",
			"color: inherit",
			"color: #5f8aa6",
			"color: inherit",
			"color: #5f8aa6",
			"color: inherit",
			"color: #5f8aa6",
			"color: inherit",
			"color: #5f8aa6",
			"color: #5f8aa6",
			"color: #5f8aa6",
			"color: #5f8aa6",
			"color: #5f8aa6",
			"color: #5f8aa6",
			"color: #5f8aa6",
			"color: inherit",
			"color: #e0151f",
			"color: inherit",
			"color: inherit",
		);
	}
}

if ("HTMLElement" in window) {
	/**
	 * @type {Welcome}
	 */
	window.Welcome = new Welcome();
}

/**
 * @type {Welcome}
 */
export default Welcome;
