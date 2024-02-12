---
date: 2024-01-18T17:00:00+0800
title: Kaprekar’s Constant
description: I came across an interesting mathematical observation today called Kaprekar’s constant, named after the mathematician, Dattatreya Ramchandra Kaprekar, and built an interactive tool to demonstrate it.
tags:
  - calculator
---

<blockquote>
    <ol>
        <li>Take any four-digit number, using at least two different digits (leading zeros are allowed).</li>
        <li>Arrange the digits in descending and then in ascending order to get two four-digit numbers, adding leading zeros if necessary.</li>
        <li>Subtract the smaller number from the bigger number.</li>
        <li>Go back to step 2 and repeat.</li>
    </ol>
    <cite><a href="https://en.wikipedia.org/wiki/6174">Wikipedia</a></cite>
</blockquote>

Following the above steps always leads you to the same number: 6174.

<!-- </textarea> -->
<!-- '"´ -->
<form id="calculator">
	<legend class=" [ hidden ] ">
		<h2>{{ title }}</h2>
	</legend>
	<fieldset>
		<label for="start" class=" [ delta ] ">Starting number</label>
		<input id="start" class=" [ center  monospace ] " style="inline-size: 100%; font-size: var(--font-size-gamma); line-height: 2.5;" type="number" step="1" min="1" max="9999" inputmode="numeric" pattern="^[0-9]{4}$" value="8145"></input>
	</fieldset>
	<fieldset class=" [ navigator center ] " style="margin-block-start: 1em">
		<button type="submit" style="">Submit</button>
	</fieldset>
</form>

<table id="output" style="margin-inline: auto;">
	<tbody>
		<tr>
			<td class="monospace">8541 - 1458 = 7083</td>
		</tr>
		<tr>
			<td class="monospace">8730 - 0378 = 8352</td>
		</tr>
		<tr>
			<td class="monospace">8532 - 2358 = 6174</td>
		</tr>
	</tbody>
</table>

{% js 'module' -%}
class KaprekarConstantCalculator {
	constructor() {
		this.init()
	}

	arrayToNumber(value) {
		return Number(value.join(""))
	}

	performRoutine(value) {
		const array = String(value).split("").sort()

		const descending = this.arrayToNumber(array.slice().reverse())
		const ascending = this.arrayToNumber(array)
		const total = descending - ascending

		const dString = String(descending).padStart(4, "0")
		const aString = String(ascending).padStart(4, "0")
		const tString = String(total).padStart(4, "0")

		const row = this.table.insertRow()

		const cell = row.insertCell()
		cell.classList.add("monospace")
		cell.appendChild(document.createTextNode(`${dString} - ${aString} = ${tString}`))

		return tString
	}

	submitForm() {
		this.table.innerHTML = ""

		if (this.input.value.match(/^\d{4}$/g) && !this.input.value.match(/^(\d)\1{3}$/g)) {
			let result = this.performRoutine(this.input.value)
			let count = 1

			while (result !== "6174" && count < 8) {
				result = this.performRoutine(result)
				count++
			}
		} else {
			const errorText = `The starting number must be a 4-digit number and contain at least 2 different digits. ${this.input.value} does not meet this criteria.`

			const row = this.table.insertRow()

			const cellError = row.insertCell()
			cellError.appendChild(document.createTextNode(errorText))

			console.log(errorText)
		}
	}

	init() {
		this.form = document.getElementById("calculator")
		this.input = document.getElementById("start")
		this.table = document.getElementById("output")

		this.form.addEventListener("submit", (event) => {
			event.preventDefault()
			this.submitForm()
		})
	}
}

if ("HTMLElement" in window) {
	window.KaprekarConstantCalculator = new KaprekarConstantCalculator()
}

export default KaprekarConstantCalculator
{%- endjs %}
