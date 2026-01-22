(() => {
	const KEY_SEQUENCE = ["c", "b"];
	let sequenceIndex = 0;
	let mainScriptLoaded = false;

	const handleKeys = (e) => {
		if (e.altKey || e.ctrlKey || e.metaKey || mainScriptLoaded) {
			return;
		}

		const key = e.key.toLowerCase();

		if (key === KEY_SEQUENCE[sequenceIndex]) {
			sequenceIndex++;
			if (sequenceIndex === KEY_SEQUENCE.length) {
				loadMainScript();
				sequenceIndex = 0;
			}
		} else {
			sequenceIndex = 0;
		}
	};

	const loadMainScript = () => {
		if (mainScriptLoaded) return;
		mainScriptLoaded = true;

		const script = document.createElement("script");
		script.src = "/js/components/radio-reloj.js";
		script.type = "module";
		document.head.appendChild(script);
		document.removeEventListener("keydown", handleKeys);
	};

	document.addEventListener("keydown", handleKeys);
})();
