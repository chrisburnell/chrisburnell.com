/**
 * Welcome
 * @class
 */
class Welcome {
	/**
	 * @constructor
	 */
	constructor() {
		const osString = `OS:              ${navigator.oscpu}`
		const languageString = `Language:        ${navigator.language}`
		const networkString = `Network:         ${navigator.onLine === true ? "Online" : "Offline"}`
		const swStatus = (navigator?.serviceWorker?.controller?.state || "pending")
		const swString = `Service Worker:  ${swStatus.charAt(0).toUpperCase() + swStatus.slice(1)}`

		console.log(`%c                        ░█░█      %cchrisburnell.com`, "color: #507791", "color: inherit")
		console.log(`%c  ██░░░░░█░             █████     %c${"-".repeat(Math.max(osString.length, languageString.length, networkString.length, swString.length))}`, "color: #507791", "color: inherit")
		console.log(`%c   ░▓▓██▓███▓█░       ██▒░▓███    %c${osString}`, "color: #507791", "color: inherit")
		console.log(`%c     ░░█▓▒██▓░░█░   █▓░██▓██▓██░░ %c${languageString}`, "color: #507791", "color: inherit")
		console.log(`%c      ░█░███▓▓██░█░█▓███░░█▓██░█  %c${networkString}`, "color: #507791", "color: inherit")
		console.log(`%c        ░░▒██▓░▒█░██▓███▓▓██▓░    %c${swString}`, "color: #507791", "color: inherit")
		console.log(`%c           ░░▓██████▒█▓▒▓▒░░`, "color: #507791")
		console.log(`%c             ░███▓▒▓▒░░▓▓░░░`, "color: #507791")
		console.log(`%c ▒█▒▓▒▓▓▓▓▓██▓▓░░▓░░▓▒░███▒░`, "color: #507791")
		console.log(`%c  ░▓███▓██░▒▒░░▒██▒▓█     █▒`, "color: #507791")
		console.log(`%c      ░██▒░░░██░▒▓█░       ░`, "color: #507791")
		console.log(`%c              ░▒█▓░░▓█░`, "color: #507791")
		console.log(`%c               ░▒▓░░▒░░░`, "color: #507791")
		console.log(`Checking out the source code, %ceh%c?`, "color: #e0151f", "color: inherit")
		console.log(`Get in touch with me if you want to know more! %chttps://chrisburnell.com/about/#contact`, "color: #e0151f")
	}
}

if ("HTMLElement" in window) {
	/**
	 * @type {Welcome}
	 */
	window.Welcome = new Welcome()
}

/**
 * @type {Welcome}
 */
export default Welcome
