const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const keyInput = document.querySelector("[id=key]");
const secretInput = document.querySelector("[id=secret]");
const phraseInput = document.querySelector("[id=phrase]");
const output = document.querySelector("[id=output]");
const outputStyles = document.querySelector("[id=output-styles]");
const square = document.querySelector("[id=square]");

const translate = () => {
	const keyValue = keyInput.value.toUpperCase().replace(/[^A-Z]/g, "");
	const secretValue = secretInput.value.toUpperCase().replace(/[^A-Z]/g, "");
	const phraseValue = phraseInput.value.toUpperCase().replace(/[^A-Z]/g, "");

	if (
		keyValue === "" ||
		keyInput.value.length > 40 ||
		secretValue === "" ||
		secretInput.value.length > 40 ||
		phraseValue === "" ||
		phraseInput.value.length > 40
	) {
		return;
	}

	let caesarCipher = alphabet;
	keyValue
		.split("")
		.reverse()
		.forEach((letter) => {
			caesarCipher = letter + caesarCipher.replace(letter, "");
		});

	let vigenereTableRow = caesarCipher;
	const vigenereTable = [];
	caesarCipher.split("").forEach((letter) => {
		vigenereTable.push(vigenereTableRow);
		vigenereTableRow = vigenereTableRow.replace(letter, "") + letter;
	});

	square.innerHTML = "";
	vigenereTable.forEach((vigenereTableRow) => {
		const vigenereTableRow_string = vigenereTableRow
			.split("")
			.reduce((acc, letter) => `${acc}<td>${letter}</td>`, "");
		square.innerHTML =
			square.innerHTML + `<tr>${vigenereTableRow_string}</tr>`;
	});

	let secretRepeated = "";
	phraseValue.split("").forEach((_, index) => {
		secretRepeated += secretValue.split("")[index % secretValue.length];
	});

	let encrypted = "";
	let lineStyles = [];
	let intersectionStyles = [];
	secretRepeated.split("").forEach((_, index) => {
		const row = caesarCipher.indexOf(secretRepeated[index]);
		const column = caesarCipher.indexOf(phraseValue[index]);
		encrypted += `<span tabindex="0" row="${row + 1}" column="${column + 1}">${vigenereTable[row][column]}</span>`;
		lineStyles.push(
			`:root:has([row="${row + 1}"][column="${column + 1}"]:is(:hover, :focus)) [id="square"] tr:nth-of-type(${row + 1})`,
		);
		lineStyles.push(
			`:root:has([row="${row + 1}"][column="${column + 1}"]:is(:hover, :focus)) [id="square"] tr td:nth-of-type(${column + 1})`,
		);
		intersectionStyles.push(
			`:root:has([row="${row + 1}"][column="${column + 1}"]:is(:hover, :focus)) [id="square"] tr:nth-of-type(${row + 1}) td:nth-of-type(${column + 1})`,
		);
	});

	output.innerHTML = encrypted;
	outputStyles.textContent = `${lineStyles.join(", ")} {
	color: var(--color-maple);
	font-weight: var(--font-weight-bold);
}
${intersectionStyles.join(", ")} {
	background-color: var(--color-maple);
	color: var(--color-snowy);
	transform: scale(1.1);
}`;
};

[keyInput, secretInput, phraseInput].forEach((input) => {
	input.addEventListener("change", () => {
		translate();
	});
	input.addEventListener("input", () => {
		translate();
	});
});
