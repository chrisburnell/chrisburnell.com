import pentatonic from "@chrisburnell/pentatonic";

/**
 * Website Sounds
 */
class WebsiteSounds {
	/**
	 * @class
	 */
	constructor() {
		this.STORAGE_KEY = "user-sounds";

		// Defaults for sitewide pentatonic
		this.defaults = {
			duration: 4000,
			volume: 0.1,
			keyStart: 29,
			keyLimit: 12,
			keyIntervals: [2, 2, 3, 2, 3],
		};
		// Navigation defaults
		this.navigationDefaults = {
			duration: 150,
			volume: 0.1,
			keyLimit: 4,
		};
		// Roboty-Human Voice Singing "PhonemeAh" waveform
		this.waveform = {
			real: new Float32Array([
				0, 0.246738, 0.08389, 0.095378, 0.087885, 0.165621, 0.287369,
				-0.328845, -0.099613, -0.198535, 0.260484, 0.012771, 0.013351,
				0.006221, 0.003106, 0.000629, -0.003591, -0.002876, -0.003527,
				-0.002975, -0.002648, -0.006996, -0.004165, -0.004266,
				-0.000731, 0.003727, 0.018167, 0.012018, -0.017044, -0.004816,
				-0.001255, -0.002032,
			]),
			imag: new Float32Array([
				0, -0.011959, 0.106385, 0.027196, 0.04077, 0.010807, -0.17632,
				-0.376644, 0.052966, 0.242678, 0.322558, -0.029071, -0.017862,
				-0.018765, -0.010794, -0.010157, -0.004212, -0.001923,
				-0.002589, -0.000607, -0.001983, -0.000421, -0.001835, 0.003069,
				0.005389, 0.012023, 0.003422, -0.013914, -0.008548, 0.007815,
				0.002234, 0.003867,
			]),
		};

		this.nameAudio = null;
		this.nameAudioPath = "/audio/name.mp3";
		this.cawAudio = null;
		this.cawAudioPath = "/audio/caw.mp3";
		this.wacAudio = null;
		this.wacAudioPath = "/audio/wac.mp3";
		this.isPlaying = false;
		this.timeout = 50;

		this.init();
	}

	/**
	 * Plays the raven’s caw.
	 */
	playCaw() {
		if (!this.isPlaying) {
			if (!this.cawAudio) {
				this.cawAudio = new Audio(this.cawAudioPath);
			}
			this.isPlaying = true;
			this.cawAudio.play();
			window.setTimeout(() => {
				this.isPlaying = false;
			}, this.cawAudio.duration);
		}
	}

	/**
	 * .wac s'nevar eht syalP
	 */
	playWac() {
		if (!this.isPlaying) {
			if (!this.wacAudio) {
				this.wacAudio = new Audio(this.wacAudioPath);
			}
			this.isPlaying = true;
			this.wacAudio.play();
			window.setTimeout(() => {
				this.isPlaying = false;
			}, this.wacAudio.duration);
		}
	}

	/**
	 * Plays the author name audio file.
	 */
	playName() {
		if (!this.isPlaying) {
			if (!this.nameAudio) {
				this.nameAudio = new Audio(this.nameAudioPath);
			}
			this.isPlaying = true;
			this.nameAudio.play();
			window.setTimeout(() => {
				this.isPlaying = false;
			}, this.nameAudio.duration);
		}
	}

	/**
	 * Initialises Website Sounds.
	 */
	init() {
		// Content + Sparklines
		const pentatonicElements = document.querySelectorAll(".pentatonic");
		pentatonicElements.forEach((element) => {
			element.addEventListener("click", () => {
				let target = element;
				if (
					!element.getAttribute("values") &&
					!element.dataset.values
				) {
					target = [...element.children].filter((child) => {
						return (
							child.getAttribute("values") || child.dataset.values
						);
					})[0];
				}
				let values =
					target.getAttribute("values") || target.dataset.values;
				if (values) {
					let duration = target.getAttribute("duration")
						? Number(target.getAttribute("duration"))
						: target.dataset.duration
							? Number(target.dataset.duration)
							: this.defaults.duration;
					let keyStart = target.getAttribute("key-start")
						? Number(target.getAttribute("key-start"))
						: target.dataset.keyStart
							? Number(target.dataset.keyStart)
							: this.defaults.keyStart;
					let keyLimit = target.getAttribute("key-limit")
						? Number(target.getAttribute("key-limit"))
						: target.dataset.keyLimit
							? Number(target.dataset.keyLimit)
							: this.defaults.keyLimit;
					let keyIntervals = target.getAttribute("key-intervals")
						? target
								.getAttribute("key-intervals")
								.split(",")
								.map((interval) => Number(interval))
						: target.dataset.keyIntervals
							? target.dataset.keyIntervals
									.split(",")
									.map((interval) => Number(interval))
							: this.defaults.keyIntervals;
					pentatonic(
						values.split(","),
						duration,
						this.defaults.volume,
						keyStart,
						keyIntervals,
						keyLimit,
						this.waveform,
					);
				}
			});
		});

		// Navigation
		const navigationElements = document.querySelectorAll(
			".navigation a, .navigation button, .badges a img",
		);
		navigationElements.forEach((element) => {
			let navigationTimeout = null;
			element.addEventListener("mouseenter", () => {
				if (localStorage.getItem(this.STORAGE_KEY) === "true") {
					navigationTimeout = window.setTimeout(() => {
						const randomKey = Math.floor(
							Math.random() * this.navigationDefaults.keyLimit,
						);
						pentatonic(
							[randomKey],
							this.navigationDefaults.duration,
							this.navigationDefaults.volume,
							undefined,
							undefined,
							undefined,
							this.waveform,
						);
					}, this.timeout);
				}
			});
			element.addEventListener("mouseleave", () => {
				window.clearTimeout(navigationTimeout);
			});
		});

		// Logo & Badges
		const tonics = document.querySelectorAll(".logo, .badges li > img");
		tonics.forEach((tonic) => {
			let cawTimeout = null;
			tonic.addEventListener("mouseenter", () => {
				if (localStorage.getItem(this.STORAGE_KEY) === "true") {
					cawTimeout = window.setTimeout(() => {
						this.playCaw();
					}, this.timeout);
				}
			});
			tonic.addEventListener("mouseleave", () => {
				window.clearTimeout(cawTimeout);
			});
		});
		if (location.hash === "#caw") {
			this.playCaw();
		}

		// Author
		const authorElements = document.querySelectorAll(
			".author__information, .footer__navigation [href='/license/']",
		);
		authorElements.forEach((element) => {
			let wacTimeout = null;
			element.addEventListener("mouseenter", () => {
				if (localStorage.getItem(this.STORAGE_KEY) === "true") {
					wacTimeout = window.setTimeout(() => {
						this.playWac();
					}, this.timeout);
				}
			});
			element.addEventListener("mouseleave", () => {
				window.clearTimeout(wacTimeout);
			});
		});

		// Author Name
		const nameButtons = document.querySelectorAll(".js-name-button");
		nameButtons.forEach((button) => {
			button.addEventListener("click", () => {
				this.playName();
			});
		});
		if (location.hash === "#name") {
			this.playName();
		}
	}
}

if ("HTMLElement" in window) {
	/**
	 * @type {WebsiteSounds}
	 */
	window.WebsiteSounds = new WebsiteSounds();
}

/**
 * @type {WebsiteSounds}
 */
export default WebsiteSounds;
