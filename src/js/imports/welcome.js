/**
 * Welcome
 * @class
 */
class Welcome {
	/**
	 * @connectedCallback
	 */
	connectedCallback() {
		console.log(`%c                        █▒▒      %cchrisburnell.com`, "color: #507791", "color: inherit")
		console.log(`%c ▒▒▒▒▒▒▒▒▒             ▒███▓     %c--------------------------`, "color: #507791", "color: inherit")
		console.log(`%c  ▒▓███████▓▓▒       ▒█▓████▓    %cOS: ${navigator.oscpu}`, "color: #507791", "color: inherit")
		console.log(`%c     ▒██████▓▒▓▒   ▒▓▓██████▓█▓  %cLanguage: ${navigator.language}`, "color: #507791", "color: inherit")
		console.log(`%c      ▒▓██████▒▓█▒▒█████████▓▒▒  %cOnline: ${navigator.onLine === true ? "True" : "False"}`, "color: #507791", "color: inherit")
		console.log(`%c         ▓███████████████▓▓▒     %cService Worker: ${navigator?.serviceWorker?.controller?.state || "pending"}`, "color: #507791", "color: inherit")
		console.log(`%c             ▓███████▓▒▒▓▒`, "color: #507791")
		console.log(`%c         ▒▒▒▓██▓▓▓▓▒▓▓█▓▒▓`, "color: #507791")
		console.log(`%c ████████████▓█▓█▓▒▓  ▒▒▓▓`, "color: #507791")
		console.log(`%c   ▒▓█▓▓▓▒▓██▓▓██▓▒      ▒`, "color: #507791")
		console.log(`%c         ▒▒   ▒▓█▓▓▒`, "color: #507791")
		console.log(`%c              ▒▓█  █▓▓`, "color: #507791")
		console.log(`%c               ▒     ▒`, "color: #507791")
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
