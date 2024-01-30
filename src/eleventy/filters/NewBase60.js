// 60 characters that make up the Sexagesimal numeral system
const SEQUENCE = "0123456789ABCDEFGHJKLMNPQRSTUVWXYZ_abcdefghijkmnopqrstuvwxyz"

// Converts a Decimal (Base 10) Integer to a Sexagesimal (Base 60) String
const DecimalToSexagesimal = (value) => {
	if (value === undefined || value === 0) {
		return 0
	}
	let sexagesimalValue = ""
	while (value > 0) {
		let index = value % 60
		sexagesimalValue = SEQUENCE[index] + sexagesimalValue
		value = (value - index) / 60
	}
	return sexagesimalValue
}

// Converts a JS Date Object to a Sexageismal (Base 60) String
const DateToSexagesimal = (dateObject) => {
	let sinceEpoch = new Date(dateObject).getTime()
	let epochDays = Math.floor(sinceEpoch / (1000 * 60 * 60 * 24))
	return DecimalToSexagesimal(epochDays)
}

/**
 * @param {string} date
 * @param {string} categoryCode
 * @param {object[]} collection
 * @returns {string}
 */
export const NewBase60 = (date, categoryCode, collection) => {
	// Get all posts where DATE matches in UTC
	const postsToday = collection.filter((post) => {
		if ("date" in post.data) {
			return new Date(post.data.date).toLocaleDateString("en", { timeZone: "UTC" }) === new Date(date).toLocaleDateString("en", { timeZone: "UTC" })
		}
		return false
	})

	// Get the index of the post where EPOCH TIMESTAMP matches
	// Note: Indices start at 1 for ShortURLs
	const postIndex =
		1 +
		postsToday.findIndex((post) => {
			return new Date(post.data.date).getTime() === new Date(date).getTime()
		})

	// Build the string
	return categoryCode + DateToSexagesimal(date) + postIndex
}

export default {
	NewBase60,
}
