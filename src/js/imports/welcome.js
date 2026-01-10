/**
 * Welcome
 */
class Welcome {
	/**
	 * @class
	 */
	constructor() {
		const serviceWorkerState =
			navigator?.serviceWorker?.controller?.state || "pending";
		const info = [
			`OS:              ${navigator.oscpu}`,
			`Language:        ${navigator.language}`,
			`Network:         ${navigator.onLine ? "Online" : "Offline"}`,
			`Service Worker:  ${serviceWorkerState.charAt(0).toUpperCase() + serviceWorkerState.slice(1)}`,
		];
		const divider = "-".repeat(Math.max(...info.map((s) => s.length)));

		// prettier-ignore
		const logo = [
			"                       ░█░█       ",
			" ██░░░░░█░             █████      ",
			"  ░▓▓██▓███▓█░       ██▒░▓███     ",
			"    ░░█▓▒██▓░░█░   █▓░██▓██▓██░░  ",
			"     ░█░███▓▓██░█░█▓███░░█▓██░█   ",
			"       ░░▒██▓░▒█░██▓███▓▓██▓░     ",
			"          ░░▓██████▒█▓▒▓▒░░",
			"            ░███▓▒▓▒░░▓▓░░░",
			"▒█▒▓▒▓▓▓▓▓██▓▓░░▓░░▓▒░███▒░",
			" ░▓███▓██░▒▒░░▒██▒▓█     █▒",
			"     ░██▒░░░██░▒▓█░       ░",
			"             ░▒█▓░░▓█░",
			"              ░▒▓░░▒░░░",
		];

		const raven = "color: #5f8aa6";
		const maple = "color: #e0151f";

		const lines = logo.map((line, i) => {
			const label =
				i === 0 ? "chrisburnell.com" : i === 1 ? divider : info[i - 2];
			return label ? `%c${line}%c${label}` : `%c${line}`;
		});
		lines.push(`%cChecking out the source code, %ceh%c?`);
		lines.push(
			`%cGet in touch with me if you want to know more! https://chrisburnell.com/about/#contact`,
		);

		const styles = logo.flatMap((_, i) => (i < 6 ? [raven, ""] : [raven]));
		styles.push("", maple, "");
		styles.push("");

		console.log(lines.join("\n"), ...styles);
	}
}

if ("HTMLElement" in window) {
	if ("requestIdleCallback" in window) {
		requestIdleCallback(() => {
			window.Welcome = new Welcome();
		});
	} else {
		window.Welcome = new Welcome();
	}
}

/**
 * @type {Welcome}
 */
export default Welcome;
