/**
 * Radio Reloj Chronograph
 */
class RadioReloj {
	/**
	 * @class
	 */
	constructor() {
		this.#audioContext = new (
			window.AudioContext || window.webkitAudioContext
		)();

		this.#setupEventListeners();

		this.start();
	}

	static #TONE = "triangle";
	static #TICK = 220;
	static #MORSE = 880;
	static #DIT = 0.06;
	static #DAH = RadioReloj.#DIT * 3;
	static #GAP = RadioReloj.#DIT;
	static #LETTERGAP = RadioReloj.#DAH;
	static #KEY_SEQUENCE = ["c", "b"];

	#audioContext;
	#running = false;
	#timer = null;
	#keySequenceIndex = 0;

	start() {
		if (this.#running) return;

		this.#audioContext.resume().then(() => {
			this.#running = true;
			const now = Date.now();
			const msUntilNext = 1000 - (now % 1000);
			this.#timer = setTimeout(() => this.#tick(), msUntilNext);
		});
	}

	stop() {
		if (!this.#running) return;

		this.#running = false;
		clearTimeout(this.#timer);
		this.#timer = null;
	}

	toggle() {
		if (this.#running) {
			this.stop();
		} else {
			this.start();
		}
	}

	#playTone(t, data = {}) {
		const defaultData = {
			tone: RadioReloj.#TONE,
			frequency: RadioReloj.#TICK,
			duration: RadioReloj.#DAH * 2,
		};
		data = { ...defaultData, ...data };

		const time = (t ?? this.#audioContext.currentTime) + 0.005;
		const osc = this.#audioContext.createOscillator();
		const gain = this.#audioContext.createGain();

		osc.type = data.tone;
		osc.frequency.value = data.frequency;

		const peak = 0.25;
		const attack = Math.min(0.002, data.duration * 0.3);
		const releaseEnd = time + data.duration;
		const safety = this.#audioContext.baseLatency || 0.01;

		gain.gain.cancelScheduledValues(time);
		gain.gain.setValueAtTime(0, time);
		gain.gain.linearRampToValueAtTime(peak, time + attack);
		gain.gain.linearRampToValueAtTime(0, releaseEnd);

		osc.connect(gain).connect(this.#audioContext.destination);
		osc.start(time);
		osc.stop(releaseEnd + safety);
	}

	#playMorseTone(time, data = {}) {
		const defaultData = {
			tone: RadioReloj.#TONE,
			frequency: RadioReloj.#MORSE,
		};
		data = { ...defaultData, ...data };

		if (!data.duration) {
			return;
		}

		this.#playTone(time, {
			tone: data.tone,
			frequency: data.frequency,
			duration: data.duration,
		});
		return time + data.duration + RadioReloj.#GAP;
	}

	#playMorseSignal(t) {
		let time = (t ?? this.#audioContext.currentTime) + 0.005;

		time = this.#playMorseTone(time, { duration: RadioReloj.#DAH });
		time = this.#playMorseTone(time, { duration: RadioReloj.#DIT });
		time = this.#playMorseTone(time, { duration: RadioReloj.#DAH });
		time = this.#playMorseTone(time, { duration: RadioReloj.#DIT });

		time += RadioReloj.#LETTERGAP;

		time = this.#playMorseTone(time, { duration: RadioReloj.#DAH });
		time = this.#playMorseTone(time, { duration: RadioReloj.#DIT });
		time = this.#playMorseTone(time, { duration: RadioReloj.#DIT });
		this.#playMorseTone(time, { duration: RadioReloj.#DIT });
	}

	#tick() {
		const now = new Date();
		const secondStart = new Date(now);
		secondStart.setMilliseconds(0);

		const s = secondStart.getSeconds();
		const msSinceNow = secondStart - now;
		const audioTime = this.#audioContext.currentTime + msSinceNow / 1000;

		if (s === 0) {
			this.#playMorseSignal(audioTime);
		} else if (s !== 1) {
			this.#playTone(audioTime);
		}

		const next = new Date();
		next.setMilliseconds(0);
		next.setSeconds(next.getSeconds() + 1);
		const msUntilNext = next - new Date();

		this.#timer = setTimeout(() => this.#tick(), msUntilNext);
	}

	#setupEventListeners() {
		document.addEventListener("keydown", (e) => this.#handleKeydown(e));
	}

	#handleKeydown(e) {
		if (e.altKey || e.ctrlKey || e.metaKey) {
			return;
		}

		const key = e.key.toLowerCase();

		if (key === RadioReloj.#KEY_SEQUENCE[this.#keySequenceIndex]) {
			this.#keySequenceIndex++;
			if (this.#keySequenceIndex === RadioReloj.#KEY_SEQUENCE.length) {
				this.toggle();
				this.#keySequenceIndex = 0;
			}
		} else {
			this.#keySequenceIndex = 0;
		}
	}
}

if (window) {
	window.RadioReloj = new RadioReloj();
}

export default RadioReloj;
