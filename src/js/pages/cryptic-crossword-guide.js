const examples = document.querySelectorAll(".clue-example");

examples.forEach((example) => {
	const inputs = example.querySelectorAll("input");
	const hintButtons = example.querySelectorAll("[aria-controls*=hint]");
	const resetButton = example.querySelector("[data-type=reset]");
	const solveButton = example.querySelector("[data-type=solve]");

	// Control <input> elements
	inputs.forEach((input, index) => {
		input.addEventListener("focus", (event) => {
			input.select();
		});

		input.addEventListener("input", (event) => {
			if (!input.value.length) {
				return;
			}

			// Check if all inputs are valid
			const fullMatch = [...inputs].reduce((match, input) => {
				return (
					match &&
					input.value.toUpperCase() ===
						input.getAttribute("pattern").match(/[A-Z]/)?.[0]
				);
			}, true);

			if (fullMatch) {
				inputs.forEach((input) => {
					input.disabled = true;
				});
				hintButtons.forEach((button) => {
					button.disabled = true;
				});
				solveButton.disabled = true;
				return;
			}

			// Loop until a next valid input is found and focus it
			let nextIndex = (index + 1) % inputs.length;
			while (
				inputs[nextIndex].getAttribute("disabled") !== null &&
				nextIndex !== index
			) {
				nextIndex = (nextIndex + 1) % inputs.length;
			}

			if (nextIndex === index) {
				return;
			}

			inputs[nextIndex].focus();
		});

		input.addEventListener("keyup", (event) => {
			if (event.key === "Backspace" && !input.value.length) {
				// Loop until a previous valid input is found and focus it
				let previousIndex = (index - 1) % inputs.length;
				while (
					inputs[previousIndex].getAttribute("disabled") !== null &&
					previousIndex !== index
				) {
					previousIndex = (previousIndex - 1) % inputs.length;
				}

				if (previousIndex < 0 || previousIndex === index) {
					return;
				}

				inputs[previousIndex].focus();
			}
		});
	});

	// Control Hint buttons
	hintButtons.forEach((button) => {
		const rid = button.getAttribute("aria-controls");
		const input = [...inputs].filter((input) => input.id === rid)[0];
		const letter = input.pattern.match(/[A-Z]/)?.[0];
		button.addEventListener("click", (event) => {
			input.value = letter;
			input.setAttribute("value", letter);
			input.disabled = true;
			button.disabled = true;
		});
	});

	// Set up reset button
	resetButton.addEventListener("click", (event) => {
		inputs.forEach((input) => {
			input.value = "";
			input.removeAttribute("value");
			input.removeAttribute("disabled");
		});
		hintButtons.forEach((button) => {
			button.removeAttribute("disabled");
		});
		solveButton.removeAttribute("disabled");
	});

	// Set up solve button
	solveButton.addEventListener("click", (event) => {
		inputs.forEach((input) => {
			const letter = input.pattern.match(/[A-Z]/)?.[0];
			input.value = letter;
			input.setAttribute("value", letter);
			input.disabled = true;
		});
		hintButtons.forEach((button) => {
			button.disabled = true;
		});
		solveButton.disabled = true;
	});
});
