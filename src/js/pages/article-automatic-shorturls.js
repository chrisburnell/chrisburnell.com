class NumberConverter {
	constructor() {
		this.SEQUENCE = "0123456789ABCDEFGHJKLMNPQRSTUVWXYZ_abcdefghijkmnopqrstuvwxyz"
		this.inputs = {
			decimal: null,
			binary: null,
			sexagesimal: null,
		}

		this.init()
	}

	DecimalToSexagesimal(value) {
		if (value === undefined || value === 0) {
			return 0
		}
		let sexagesimalValue = ""
		while (value > 0) {
			let index = value % 60
			sexagesimalValue = this.SEQUENCE[index] + sexagesimalValue
			value = (value - index) / 60
		}
		return sexagesimalValue
	}

	SexagesimalToDecimal(value) {
		let output = 0
		for (var i = 0; i < value.length; i++) {
			let c = value[i].charCodeAt(0)
			if (c >= 48 && c <= 57) {
				c = c - 48
			} else if (c >= 65 && c <= 72) {
				c -= 55
			} else if (c == 73 || c == 108) {
				c = 1
			}
			else if (c >= 74 && c <= 78) {
				c -= 56
			} else if (c == 79) {
				c = 0
			}
			else if (c >= 80 && c <= 90) {
				c -= 57
			} else if (c == 95) {
				c = 34
			}
			else if (c >= 97 && c <= 107) {
				c -= 62
			} else if (c >= 109 && c <= 122) {
				c -= 63
			} else {
				c = 0
			}
			output = 60 * output + c
		}
		return output
	}

	convertFromDecimal() {
		this.binary.value = (parseInt(this.decimal.value) >>> 0).toString(2)
		this.sexagesimal.value = this.DecimalToSexagesimal(parseInt(this.decimal.value))
	}

	convertFromBinary() {
		this.decimal.value = parseInt(this.binary.value, 2)
		this.sexagesimal.value = this.DecimalToSexagesimal(parseInt(this.decimal.value))
	}

	convertFromSexagesimal() {
		this.decimal.value = this.SexagesimalToDecimal(parseInt(this.sexagesimal.value))
		this.binary.value = (parseInt(this.decimal.value) >>> 0).toString(2)
	}

	init() {
		this.decimal = document.getElementById("decimal")
		this.binary = document.getElementById("binary")
		this.sexagesimal = document.getElementById("sexagesimal")

		this.decimal.addEventListener("blur", (event) => {
			this.convertFromDecimal()
		})
		this.decimal.addEventListener("keydown", (event) => {
			if (event.keyCode == 13) {
				this.convertFromDecimal()
			}
		})

		this.binary.addEventListener("blur", (event) => {
			this.convertFromBinary()
		})
		this.binary.addEventListener("keydown", (event) => {
			if (event.keyCode == 13) {
				this.convertFromBinary()
			}
		})

		this.sexagesimal.addEventListener("blur", (event) => {
			this.convertFromSexagesimal()
		})
		this.sexagesimal.addEventListener("keydown", (event) => {
			if (event.keyCode == 13) {
				this.convertFromSexagesimal()
			}
		})
	}
}

if ("HTMLElement" in window) {
	window.NumberConverter = new NumberConverter()
}

export default NumberConverter
