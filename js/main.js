(function () {
	'use strict';

	const navigatorHandler = () => {
		/*!
		 * Navigator
		 * @author Chris Burnell <me@chrisburnell.com>
		 */
		if (navigator.serviceWorker) {
			navigator.serviceWorker
				.register("/serviceworker.js")
				.then((registration) => {
					console.log("ServiceWorker registration successful with scope:", registration.scope);
					if (registration.installing) ; else if (registration.waiting) ; else if (registration.active) ;
				})
				.catch((err) => {
					console.log("ServiceWorker registration failed:", err);
				});
			window.addEventListener("load", () => {
				if (navigator.serviceWorker.controller) {
					navigator.serviceWorker.controller.postMessage({
						command: "trimCaches",
					});
				}
			});
		} else {
			console.log("ServiceWorkers are not supported in your browser.");
		}
	};

	const colorScheme = () => {
		const STORAGE_KEY = "user-color-scheme";
		const COLOR_SCHEME_KEY = "--color-scheme";

		const schemeToggleButton = document.querySelector(".js-color-scheme-toggle");
		const schemeStatusText = document.querySelector(".js-color-scheme-status");

		const getCSSCustomProp = (propKey) => {
			let response = getComputedStyle(document.documentElement).getPropertyValue(propKey);

			if (response.length) {
				response = response.replace(/\"/g, "").trim();
			}

			return response;
		};

		const applySetting = (passedSetting) => {
			let currentSetting = passedSetting || localStorage.getItem(STORAGE_KEY);

			if (currentSetting) {
				document.documentElement.setAttribute("data-user-color-scheme", currentSetting);
				schemeStatusText.innerText = `Enable ${currentSetting === "dark" ? "light" : "dark"} mode`;
			} else {
				schemeStatusText.innerText = `Enable ${getCSSCustomProp(COLOR_SCHEME_KEY) === "dark" ? "light" : "dark"} mode`;
			}
		};

		const toggleSetting = () => {
			let currentSetting = localStorage.getItem(STORAGE_KEY);

			switch (currentSetting) {
				case null:
					currentSetting = getCSSCustomProp(COLOR_SCHEME_KEY) === "dark" ? "light" : "dark";
					break;
				case "light":
					currentSetting = "dark";
					break;
				case "dark":
					currentSetting = "light";
					break;
			}

			localStorage.setItem(STORAGE_KEY, currentSetting);

			return currentSetting;
		};

		schemeToggleButton.addEventListener("click", (event) => {
			event.preventDefault();

			applySetting(toggleSetting());
		});

		applySetting();
	};

	const neofetch = () => {
		console.log(`%cRAVEN                                %cchrisburnell.com`, "color: #507791", "color: inherit");
		console.log(`%c  OUSRAV                             %c------------------------`, "color: #507791", "color: inherit");
		console.log(`%c    ENOUSRA                          %cOS: ${navigator.oscpu}`, "color: #507791", "color: inherit");
		console.log(`%c      VENOUSRA                       %cLanguage: ${navigator.language}`, "color: #507791", "color: inherit");
		console.log(`%c       VENOUSR                       %cOnline: ${navigator.onLine === true ? "True" : "False"}`, "color: #507791", "color: inherit");
		console.log(`%c       AVENOUSR               A`, "color: #507791");
		console.log(`%c        VENOUSR             A VE`, "color: #507791");
		console.log(`%c        NOUSRAVE         NO USRA V`, "color: #507791");
		console.log(`%c         ENOUSRAV     ENOUSRAVENOU`, "color: #507791");
		console.log(`%c          SRAVENOUSRAVENOUSRAVENOU`, "color: #507791");
		console.log(`%c           SRAVENOUSRAVENOUSRAVENO`, "color: #507791");
		console.log(`%cUSR      AVENOUSRAVENOUSRAVENOUSRA`, "color: #507791");
		console.log(`%c VENOUSRAVENOUSRAVENOUSRAVEN`, "color: #507791");
		console.log(`%c  OUSRAVENOUSRAVENOUSRAVEN`, "color: #507791");
		console.log(`%c   OUSRAVENOUSRAVENOUSRAV`, "color: #507791");
		console.log(`%c     ENOUSRAVENOUSRAVEN%cO%cUS`, "color: #507791", "color: #eb2d37", "color: #507791");
		console.log(`%c            RAVEN     OUS`, "color: #507791");
		console.log(`%c          RAVEN        OU`, "color: #507791");
		console.log(`%c         SR AV`, "color: #507791");
		console.log(`%c            EN`, "color: #507791");
		console.log(`Checking out the source code, %ceh%c?`, "color: #eb2d37", "color: inherit");
		console.log(`Get in touch with me if you want to know more!`);
		return;
	};

	const librarian = () => {
		let shelvers = document.querySelectorAll("[data-sort]");
		let shelfItems = document.querySelectorAll(".shelf article");

		if (shelvers.length > 0) {
			let sortingStyles = {
				chronological: [...shelfItems],
				alphabetical: [...shelfItems].sort((a, b) => {
					return a.innerText.localeCompare(b.innerText);
				}),
				release: [...shelfItems].sort((a, b) => {
					if (a.querySelector(".release") && b.querySelector(".release")) {
						return b.querySelector(".release").dateTime.localeCompare(a.querySelector(".release").dateTime);
					}
					return false;
				}),
				rating: [...shelfItems]
					.sort((a, b) => {
						return a.innerText.localeCompare(b.innerText);
					})
					.sort((a, b) => {
						return (b.querySelector(".rating") ? b.querySelector(".rating").value : 0) - (a.querySelector(".rating") ? a.querySelector(".rating").value : 0);
					}),
				author: [...shelfItems]
					.sort((a, b) => {
						if (a.querySelector(".release") && b.querySelector(".release")) {
							return b.querySelector(".release").dateTime.localeCompare(a.querySelector(".release").dateTime);
						}
						return false;
					})
					.sort((a, b) => {
						return (a.querySelector(".h-cite") ? a.querySelector(".h-cite").innerText : "").localeCompare(b.querySelector(".h-cite") ? b.querySelector(".h-cite").innerText : "");
					}),
			};

			for (let button of shelvers) {
				button.addEventListener("click", () => {
					let set = sortingStyles[button.dataset.sort];
					if (button.getAttribute("aria-current")) {
						set = set.reverse();
					}
					button.dataset.direction = button.dataset.direction == "descending" ? "ascending" : "descending";
					for (let i in set) {
						set[i].style.order = i;
					}
					document.querySelector("[data-sort][aria-current]").removeAttribute("aria-current");
					button.setAttribute("aria-current", "true");
				});
			}
		}
	};

	const urlInput = () => {
		/*!
		 * Add `http://` to URL input fields on blur or when Enter is pressed
		 */
		let addDefaultScheme = (target) => {
			if (target.value.match(/^(?!https?:).+\..+/)) {
				target.value = `http://${target.value}`;
			}
		};

		let elements = document.querySelectorAll('input[type="url"]');

		for (let element of elements) {
			element.addEventListener("blur", (event) => {
				addDefaultScheme(event.target);
			});
			element.addEventListener("keydown", (event) => {
				if (event.keyCode == 13) {
					addDefaultScheme(event.target);
				}
			});
		}
	};

	/**
	 * Curve function for canvas 2.3.1
	 * Epistemex (c) 2013-2014
	 * License: MIT
	 */
	// prettier-ignore
	function curve(d,j,u,g,c){u=(typeof u==="number")?u:0.5;g=g?g:25;var k,e=1,f=j.length,o=0,n=(f-2)*g+2+(c?2*g:0),m=new Float32Array(n),a=new Float32Array((g+2)*4),b=4;k=j.slice(0);if(c){k.unshift(j[f-1]);k.unshift(j[f-2]);k.push(j[0],j[1]);}else {k.unshift(j[1]);k.unshift(j[0]);k.push(j[f-2],j[f-1]);}a[0]=1;for(;e<g;e++){var p=e/g,q=p*p,s=q*p,r=s*2,t=q*3;a[b++]=r-t+1;a[b++]=t-r;a[b++]=s-2*q+p;a[b++]=s-q;}a[++b]=1;h(k,a,f);if(c){k=[];k.push(j[f-4],j[f-3],j[f-2],j[f-1]);k.push(j[0],j[1],j[2],j[3]);h(k,a,4);}function h(H,A,C){for(var B=2,I;B<C;B+=2){var D=H[B],E=H[B+1],F=H[B+2],G=H[B+3],J=(F-H[B-2])*u,K=(G-H[B-1])*u,L=(H[B+4]-D)*u,M=(H[B+5]-E)*u;for(I=0;I<g;I++){var v=I<<2,w=A[v],x=A[v+1],y=A[v+2],z=A[v+3];m[o++]=w*D+x*F+y*J+z*L;m[o++]=w*E+x*G+y*K+z*M;}}}f=c?0:j.length-2;m[o++]=j[f];m[o]=j[f+1];for(e=0,f=m.length;e<f;e+=2){d.lineTo(m[e],m[e+1]);}return m}

	const sparkline = () => {
	    if (!("customElements" in window) || !("HTMLCanvasElement" in window)) {
	        return
	    }

	    const NAME = "spark-line";

	    customElements.define(
	        NAME,
	        class extends HTMLElement {
	            connectedCallback() {
	                if (!this.values) {
	                    console.log(`Missing \`values\` attribute in <${NAME}>`);
	                    return
	                }

	                this.init();
	            }

	            static get observedAttributes() {
	                return ["values", "width", "height", "line-width", "curve", "endpoint", "color", "endpoint-color", "start", "end"]
	            }

	            attributeChangedCallback(name, oldValue, newValue) {
	                this.init();
	            }

	            async init() {
	                if (this.getAttribute("values") === "") {
	                    console.log(`Empty \`values\` attributes in <${NAME}>`);
	                    return
	                }

	                this.textContent = "";

	                this.values = this.getAttribute("values");
	                this.width = parseFloat(this.getAttribute("width")) || 160;
	                this.height = parseFloat(this.getAttribute("height")) || 28;
	                this.lineWidth = parseFloat(this.getAttribute("line-width")) || 2;
	                this.curve = this.getAttribute("curve") !== "false";
	                this.endpoint = this.getAttribute("endpoint") !== "false";
	                this.color = this.getAttribute("color") || "currentColor";
	                this.endpointColor = this.getAttribute("endpoint-color") || this.color;
	                this.startLabel = this.getAttribute("start-label");
	                this.endLabel = this.getAttribute("end-label");

	                if (this.startLabel) {
	                    const startElement = document.createElement("span");
	                    startElement.textContent = this.startLabel;
	                    this.appendChild(startElement);
	                }

	                this.appendChild(this.render(this.values.match(/\d+/g)));

	                if (this.endLabel) {
	                    const endElement = document.createElement("span");
	                    endElement.textContent = this.endLabel;
	                    this.appendChild(endElement);
	                }
	            }

	            render(values) {
	                const canvas = document.createElement("canvas");
	                canvas.width = this.width;
	                canvas.height = this.height;
	                canvas.tabIndex = "0";

	                let ctx = canvas.getContext("2d");
	                let max = Math.max.apply(Math, values);
	                let xStep = (this.width - this.lineWidth * 2) / (values.length - 1);
	                let yStep = (this.height - this.lineWidth * 3) / max;

	                ctx.clearRect(0, 0, this.width, this.height);
	                ctx.beginPath();
	                ctx.translate(0.5, 0.5);
	                ctx.strokeStyle = this.color;
	                ctx.lineWidth = this.lineWidth;

	                let x, y;
	                let coordinates = [];
	                for (let i in values) {
	                    x = this.lineWidth + i * xStep;
	                    y = this.height - this.lineWidth * 1.5 - values[i] * yStep;
	                    if (this.curve) {
	                        coordinates.push(x);
	                        coordinates.push(y);
	                    } else if (i === 0) {
	                        ctx.moveTo(x, y);
	                    } else {
	                        ctx.lineTo(x, y);
	                    }
	                }
	                if (this.curve) {
	                    curve(ctx, coordinates, 0.5, 25, false);
	                }
	                ctx.stroke();

	                if (this.endpoint) {
	                    ctx.beginPath();
	                    ctx.fillStyle = this.endpointColor;
	                    ctx.arc(x - this.lineWidth / 2, y, this.lineWidth * 1.5, 0, Math.PI * 2);
	                    ctx.fill();
	                }

	                return canvas
	            }
	        }
	    );
	};

	const getFrequencyFromKeys = (key = 49) => {
	    return 2 ** ((key - 49) / 12) * 440
	};

	let isPlaying = false;

	const pentatonic = (notes, duration = 4000, volume = 0.5, keyStart = 29, keyIntervals = [2, 2, 3, 2, 3], keyLimit = 12) => {
	    if ((!window.AudioContext && !window.webkitAudioContext) || !notes || isPlaying) {
	        return
	    }
	    let frequencies = [getFrequencyFromKeys(keyStart)];
	    let keyInterval = 0;
	    for (let count = 0; count < keyLimit; count++) {
	        keyInterval = keyInterval + keyIntervals[count % keyIntervals.length];
	        frequencies.push(getFrequencyFromKeys(keyStart + keyInterval));
	    }
	    let note = 0;
	    let noteLength = Math.floor(duration / notes.length);
	    let output = new (window.AudioContext || window.webkitAudioContext)();
	    let instrument = output.createOscillator();
	    let amplifier = output.createGain();
	    let playNotes = () => {
	        try {
	            if (note < notes.length) {
	                instrument.frequency.value = frequencies[Math.min(keyLimit, notes[note])];
	                note = note + 1;
	            } else {
	                amplifier.gain.value = 0;
	            }
	            window.setTimeout(playNotes, noteLength);
	        } catch {
	            amplifier.gain.value = 0;
	            isPlaying = false;
	        }
	    };
	    // This creates a "PhonemeAh" waveform!
	    let real = new Float32Array([0, 0.246738, 0.08389, 0.095378, 0.087885, 0.165621, 0.287369, -0.328845, -0.099613, -0.198535, 0.260484, 0.012771, 0.013351, 0.006221, 0.003106, 0.000629, -0.003591, -0.002876, -0.003527, -0.002975, -0.002648, -0.006996, -0.004165, -0.004266, -0.000731, 0.003727, 0.018167, 0.012018, -0.017044, -0.004816, -0.001255, -0.002032, 0.000272, -0.001849, 0.004334, 0.000773, -0.00069, -0.000207, 0.000136, -0.000108, 0.000508, -0.000701, -0.000958, -0.004677, 0.002005, -0.001925, -0.00145, -0.002212, -0.001163, -0.000227, 0.000182, -0.000448, 0.000152, -0.000316, -0.000054, -0.000193, -0.00017, -0.000138, -0.000179, 0.000059, 0.000017, 0.000008, 0.000252, 0.000382, -0.000319, 0.00002, -0.000087, 0.00002, -0.000024, -0.000002, 0.000044, -0.000131, 0.000145, -0.000581, -0.000182, -0.001087, -0.000746, -0.002759, -0.001195, -0.002868, -0.000729, -0.002915, 0.000325, -0.001489, 0.000419, -0.000322, 0.000054, -0.0002, 0.000032, 0.000071, 0.000196, -0.000127, 0.000355, -0.000328, 0.000518, -0.00028, 0.00062, -0.00036, 0.000553, -0.000153, 0.000088, 0.000227, 0.000454, -0.000071, 0.0002, -0.000214, 0.000326, -0.00043, 0.000123, -0.000226, 0.000094, -0.000102, -0.000003, -0.000096, 0.000084, 0.000037, -0.000107, -0.000201, 0.000152, -0.0003, -0.000197, -0.000083, 0.000063, -0.000092, 0.000009, -0.000076, -0.000057, 0.000094, 0.000096, -0.000071, -0.000529, -0.000336, -0.000661, -0.000637, -0.001247, -0.000167, -0.001025, -0.001483, 0.000107, -0.000321, -0.000251, 0.000186, 0.000315, -0.000163, -0.000102, -0.001242, -0.001912, -0.000113, 0.000724, 0.00079, 0.000078, -0.000061, 0.000077, -0.000069, 0.00005, 0.000002, -0.000077, -0.000168, 0.000073, 0.000044, 0.000047, 0.000093, -0.000101, -0.000012, -0.000048, -0.000033, 0.000034, -0.000304, -0.000188, -0.000116, -0.000167, -0.000096, -0.000298, -0.000044, -0.000107, -0.000036, -0.000012, 0.000043, 0.000191, -0.000126, -0.000011, 0.0001, 0.000098, -0.000021, -0.000129, -0.000016, -0.000182, -0.000203, -0.000249, -0.000452, -0.000216, -0.000162, 0.000092, 0.000246, -0.000028, -0.000214, 0.000035, 0.000038, -0.000032, -0.000037, -0.000015, -0.00001, -0.000011, -0.00004, -0.000014, -0.00002, -0.000031, -0.000023, -0.000012, 0, 0, 0.000004, 0.000008, 0.000014, 0.000015, 0.000016, 0.000018, 0.000019, 0.000019, 0.000017, 0.000016, 0.000015, 0.000014, 0.000012, 0.000011, 0.00001, 0.00001, 0.000009, 0.000008, 0.000008, 0.000008, 0.000007, 0.000006, 0.000007, 0.000007, 0.000006, 0.000005, 0.000006, 0.000006, 0.000005, 0.000005, 0.000005, 0.000005, 0.000004, 0.000004, 0.000004, 0.000005, 0.000004, 0.000004, 0.000004, 0.000004, 0.000004, 0.000003, 0.000004, 0.000004, 0.000003, 0.000003, 0.000003, 0.000004, 0.000003, 0.000003, 0.000003, 0.000003, 0.000003, 0.000003, 0.000003, 0.000003, 0.000003, 0.000002, 0.000003, 0.000003, 0.000003, 0.000002, 0.000003, 0.000003, 0.000002, 0.000002, 0.000002, 0.000003, 0.000002, 0.000002, 0.000002, 0.000003, 0.000002, 0.000002, 0.000002, 0.000002, 0.000002, 0.000002, 0.000002, 0.000002, 0.000002, 0.000002, 0.000002, 0.000002, 0.000002, 0.000002, 0.000002, 0.000002, 0.000002, 0.000002, 0.000002, 0.000002, 0.000002, 0.000001, 0.000002, 0.000002, 0.000002, 0.000001, 0.000002, 0.000002, 0.000002, 0.000001, 0.000002, 0.000002, 0.000002, 0.000001, 0.000002, 0.000002, 0.000001, 0.000001, 0.000001, 0.000002, 0.000001, 0.000001, 0.000001, 0.000002, 0.000001, 0.000001, 0.000001, 0.000002, 0.000001, 0.000001, 0.000001, 0.000002, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0, 0.000001, 0.000001, 0.000001, 0, 0.000001, 0.000001, 0.000001, 0, 0.000001, 0.000001, 0.000001, 0, 0.000001, 0.000001, 0.000001, 0, 0.000001, 0.000001, 0.000001, 0, 0.000001, 0.000001, 0.000001, 0, 0.000001, 0.000001, 0.000001, 0, 0.000001, 0.000001, 0.000001, 0, 0.000001, 0.000001, 0, 0, 0.000001, 0.000001, 0, 0, 0, 0.000001, 0, 0, 0, 0.000001, 0, 0, 0, 0.000001, 0, 0, 0, 0.000001, 0, 0, 0, 0.000001, 0, 0, 0, 0.000001, 0, 0, 0, 0.000001, 0, 0, 0, 0.000001, 0, 0, 0, 0.000001, 0, 0, 0, 0.000001, 0]);
	    let imag = new Float32Array([0, -0.011959, 0.106385, 0.027196, 0.04077, 0.010807, -0.17632, -0.376644, 0.052966, 0.242678, 0.322558, -0.029071, -0.017862, -0.018765, -0.010794, -0.010157, -0.004212, -0.001923, -0.002589, -0.000607, -0.001983, -0.000421, -0.001835, 0.003069, 0.005389, 0.012023, 0.003422, -0.013914, -0.008548, 0.007815, 0.002234, 0.003867, 0.000488, 0.000824, -0.002685, -0.000085, -0.002967, -0.000125, -0.000831, -0.000192, -0.000222, -0.003892, 0.000474, -0.002069, 0.001899, 0.001648, -0.00049, 0.001615, -0.000309, -0.000211, -0.000327, -0.000702, 0.000325, -0.000152, 0.000048, 0.000011, 0.000152, -0.000106, -0.000003, -0.000063, 0.000026, -0.000104, -0.000479, -0.000528, -0.000551, -0.000202, -0.00024, -0.000079, -0.000078, 0.000053, -0.000058, 0.000163, 0.000573, -0.000025, 0.000171, -0.001189, 0.000385, -0.000574, -0.000608, -0.000859, -0.00066, -0.000638, -0.002096, -0.000233, -0.002119, 0.000081, -0.001687, -0.000175, -0.00059, 0.000237, 0.000237, 0.000232, 0.000473, 0.000578, 0.00056, 0.000534, 0.000858, 0.001336, 0.000692, 0.001099, 0.000203, -0.000084, -0.000032, -0.000114, -0.000094, -0.000085, -0.000034, -0.000303, 0.000267, 0.000139, -0.000143, 0.000062, -0.000023, -0.000049, -0.000084, -0.000129, -0.000141, -0.000123, 0.000102, 0.000171, -0.000007, 0.000123, 0.000116, 0.00012, 0.000003, 0.000098, 0.000055, -0.000044, -0.000258, -0.000552, -0.000945, -0.00028, -0.000222, -0.000038, -0.000132, -0.000249, 0.00088, 0.000518, 0.001033, 0.000874, 0.000496, 0.000873, 0.000276, -0.000206, -0.000785, -0.000948, -0.000148, 0.001179, 0.000101, -0.000833, -0.000357, -0.000168, -0.000115, -0.000072, -0.000116, -0.000215, -0.000148, -0.000118, 0.000104, 0.000058, -0.000093, -0.000217, -0.000153, -0.000159, -0.000116, -0.000134, -0.000078, -0.000215, -0.000206, 0.000099, -0.000054, -0.000095, 0.000029, -0.000054, 0.000009, -0.000064, -0.000038, -0.000046, -0.000145, -0.000362, -0.00014, -0.000172, -0.000209, -0.000191, -0.000257, -0.000252, -0.000234, -0.000525, -0.00026, -0.000337, 0.000005, 0.000083, 0.000142, -0.000229, -0.000192, 0.000069, 0.000069, 0.000006, -0.000001, -0.000011, 0.000027, 0.000008, 0.000009, 0.000003, 0.000004, 0.000022, 0.000025, 0.00004, 0.000038, 0.000034, 0.000036, 0.000037, 0.000033, 0.000028, 0.000026, 0.000023, 0.00002, 0.000016, 0.000012, 0.000009, 0.000008, 0.000006, 0.000005, 0.000003, 0.000004, 0.000003, 0.000003, 0.000002, 0.000003, 0.000003, 0.000002, 0.000002, 0.000002, 0.000003, 0.000002, 0.000002, 0.000002, 0.000002, 0.000002, 0.000001, 0.000002, 0.000002, 0.000002, 0.000001, 0.000002, 0.000002, 0.000001, 0.000001, 0.000001, 0.000002, 0.000001, 0.000001, 0.000001, 0.000002, 0.000001, 0.000001, 0.000001, 0.000002, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0.000001, 0, 0.000001, 0.000001, 0.000001, 0, 0.000001, 0.000001, 0.000001, 0, 0.000001, 0.000001, 0.000001, 0, 0.000001, 0.000001, 0.000001, 0, 0.000001, 0.000001, 0.000001, 0, 0.000001, 0.000001, 0.000001, 0, 0.000001, 0.000001, 0.000001, 0, 0.000001, 0.000001, 0, 0, 0.000001, 0.000001, 0, 0, 0.000001, 0.000001, 0, 0, 0, 0.000001, 0, 0, 0, 0.000001, 0, 0, 0, 0.000001, 0, 0, 0, 0.000001, 0, 0, 0, 0.000001, 0, 0, 0, 0.000001, 0, 0, 0, 0.000001, 0, 0, 0, 0.000001, 0, 0, 0, 0.000001, 0, 0, 0, 0.000001, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
	    let periodicWave = output.createPeriodicWave(real, imag);
	    instrument.setPeriodicWave(periodicWave);
	    instrument.start();
	    instrument.connect(amplifier);
	    // Set the volume to the correct value
	    amplifier.gain.value = volume;
	    amplifier.connect(output.destination);
	    // Start playing notes!
	    playNotes();
	    // And prevent the user from blowing their ears up by stacking sounds
	    isPlaying = true;
	    window.setTimeout(() => {
	        isPlaying = false;
	    }, duration);
	};

	const shareButton = () => {
		const testButton = document.createElement("button");
		testButton.setAttribute("type", "share");
		if (testButton.type !== "share") {
			const button = document.querySelector("button[type=share]");
			if (button) {
				button.addEventListener("click", (event) => {
					event.preventDefault();

					const title = document.querySelector("title").innerText;
					const url = window.location.href;

					if (navigator.share) {
						navigator.share({
							title: title,
							url: url,
						});
					} else {
						window.location.href = "mailto:?subject=" + title + "&body=" + url;
					}
				});
			}
		}
	};

	navigatorHandler();
	colorScheme();
	neofetch();
	librarian();
	urlInput();
	sparkline();
	for (let target of document.querySelectorAll(".pentatonic")) {
		target.addEventListener("click", () => {
			let values = target.values || target.dataset.values;
			let duration = parseFloat(target.getAttribute("duration")) || 4000;
			let keyStart = parseFloat(target.getAttribute("key-start")) || 29;
			let keyIntervals = target.getAttribute("key-intervals")
				? target
						.getAttribute("key-intervals")
						.split(",")
						.map((interval) => parseFloat(interval))
				: [2, 2, 3, 2, 3];
			let keyLimit = parseFloat(target.getAttribute("key-limit")) || 12;
			if (values) {
				pentatonic(values.split(","), duration, 0.5, keyStart, keyIntervals, keyLimit);
			}
		});
	}
	shareButton();

})();
