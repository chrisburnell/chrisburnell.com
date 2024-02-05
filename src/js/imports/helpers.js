/*!
 * Helpers
 * @author Chris Burnell <me@chrisburnell.com>
 */
const helpers = {
	/**
	 * Inject content into some string based on finding a provided placeholder.
	 * @param {String} originalContent
	 * @param {String} placeholder
	 * @param {String} injection
	 * @param {String} [flags]
	 * @returns {String}
	 */
	injectContent: (originalContent, placeholder, injection, flags = "g") => {
		const PATTERN = new RegExp(placeholder, flags)
		return originalContent.replace(PATTERN, injection)
	},

	/**
	 * Grab query string values by name.
	 * @see {@link http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript}
	 * @param {String} name
	 * @returns {String}
	 */
	getParameterByName: (name) => {
		const regex = RegExp(`[?&]${name}=([^&]*)`).exec(window.location.search)
		return regex && decodeURIComponent(regex[1].replace(/\+/g, " "))
	},

	/**
	 * Remove disabled attributes from an element and optionally attach a click
	 * event callback function.
	 * @param {HTMLElement} element
	 * @param {Function} [action]
	 */
	enableElement: (element, action) => {
		if (element !== null) {
			element.disabled = false
			element.setAttribute("aria-disabled", "false")
			if (action) {
				element.addEventListener("click", action)
			}
		}
	},

	/**
	 * Format a Date.
	 * @param {Datetime} date
	 * @param {Boolean} [includeWeekday]
	 * @returns {String}
	 */
	formatDate: (date, includeWeekday = false) => {
		const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
		const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

		let day = date.getDate()
		if (day < 10) {
			day = `0${day}`
		}
		let month = months[date.getMonth()]
		let year = date.getFullYear()

		let weekday = includeWeekday ? `${weekdays[date.getDay()]} ` : ""

		return `${weekday}${day} ${month} ${year}`
	},

	/**
	 * Format a Time.
	 * @param {Datetime} date
	 * @param {Boolean} [includeSeconds]
	 * @param {Boolean} [includeMerdiem]
	 * @returns {String}
	 */
	formatTime: (date, includeSeconds = false, includeMeridiem = true) => {
		let hours = date.getHours()
		const minutes = date.getMinutes().toString().padStart(2, "0")
		const seconds = includeSeconds ? `:${date.getSeconds().toString().padStart(2, "0")}` : ""
		const meridiem = includeMeridiem ? ` ${hours < 12 ? "am" : "pm"}` : ""

		// format from 24-hours to 12-hours if including meridiem
		hours = includeMeridiem ? hours % 12 || 12 : hours

		return `${hours}:${minutes}${seconds}${meridiem}`
	},

	/**
	 * Perform an action based on the hash in the URL.
	 * @param {Array} hashes
	 * @param {Function} action
	 * @returns false
	 */
	actionFromHash: (hashes, action) => {
		for (let hash of hashes) {
			if (window.location.hash.indexOf(hash) !== -1) {
				action()
			}
		}
	},

	/**
	 * Ensure fetch response is OK.
	 * @param {Object} response
	 * @returns {Object}
	 * @throws Response must return correctly.
	 */
	getFetchResponse: (response) => {
		if (response.ok) {
			return response
		} else {
			let error = new Error(response.statusText)
			error.response = response
			throw error
		}
	},

	/**
	 * Format a number by padding with zeroes.
	 * @param {Number} number
	 * @param {Number} [integersMax]
	 * @returns {String}
	 */
	padWithZeroes: (number, integersMax = 2) => {
		const [integers, decimals] = number.toString().split(".")
		return integers.toString().padStart(integersMax, "0") + (decimals ? `.${decimals}` : "")
	},

	/**
	 * Extract text from a string of HTML.
	 * @param {String} html
	 * @returns {String}
	 */
	decodeHTML: (html) => {
		let text = document.createElement("textarea")
		text.innerHTML = html
		return text.value
	},

	/**
	 * Truncate text to n words.
	 * @param {String} string
	 * @param {Number} [maximum]
	 * @returns {String}
	 */
	truncate: (string, maximum = 10) => {
		let array = string.trim().split(" ")
		let ellipsis = array.length > maximum ? "…" : ""
		return (
			array
				.slice(0, maximum)
				.join(" ")
				.replace(/[,.;]$/, "") + ellipsis
		)
	},

	/**
	 * Return a string based on the recency of a Datetime.
	 * @param {Datetime} datetime
	 * @returns {String}
	 */
	since: (datetime) => {
		const today = Math.floor(Date.now() / 1000)
		const compare = Math.floor(datetime.getTime() / 1000)
		const difference = Math.abs(compare - today)

		const minute = 60
		const hour = 60 * minute
		const day = 24 * hour
		const week = 7 * day
		const month = 30.436875 * day
		const year = 12 * month

		const rtf = new Intl.RelativeTimeFormat("en", {
			localeMatcher: "best fit", // other values: "lookup"
			numeric: "always", // other values: "auto"
			style: "long", // other values: "short" or "narrow"
		})

		if (difference < minute * 2) {
			return "just moments ago"
		} else if (difference < hour * 2) {
			return rtf.format(Math.ceil((compare - today) / minute), "minute")
		} else if (difference < day * 2) {
			return rtf.format(Math.ceil((compare - today) / hour), "hour")
		} else if (difference < week * 2) {
			return rtf.format(Math.ceil((compare - today) / day), "day")
		} else if (difference < month * 2) {
			return rtf.format(Math.ceil((compare - today) / week), "week")
		} else if (difference < year * 2) {
			return rtf.format(Math.ceil((compare - today) / month), "month")
		}
		return rtf.format(Math.ceil((compare - today) / year), "year")
	},

	/**
	 * Search for a value within all nodes of an Object.
	 * @param {Object} object
	 * @param {any} searchValue
	 * @param {Boolean} [caseSensitive]
	 * @returns {Boolean}
	 */
	includesDeep: (object, searchValue, caseSensitive = true) => {
		const normalizeValue = (value) => (caseSensitive && typeof value === "string" ? value : value.toString().toLowerCase())

		const normalizedSearchValue = typeof searchValue === "string" ? normalizeValue(searchValue) : searchValue

		const checkValue = (value) => {
			if (typeof value === "number") {
				return value === normalizedSearchValue || `${value}`.includes(normalizedSearchValue)
			} else if (typeof value === "string") {
				return normalizeValue(value).includes(normalizedSearchValue)
			} else if (typeof value === "object") {
				return helpers.includesDeep(value, normalizedSearchValue, caseSensitive)
			}
			return false
		}

		return Object.values(object).some(checkValue)
	},

	/**
	 * Loop through an array to set a variable.
	 * @param {Object} object
	 * @param {Object[]} array
	 * @param {any} value
	 */
	setByArray(object, array, value) {
		const last = array.pop()
		array.reduce(function (v, k) {
			return (v || {})[k]
		}, object)[last] = value
	},
}

export default helpers
