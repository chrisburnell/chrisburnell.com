const { DateTime } = require("luxon")

module.exports = {
    prepareDate: value => {
        // format() expects Date or Number
        // YAML dates are already in RFC3339 and it gives us dates in UTC.
        // They may be a string or an object.
        // If string, convert to RFC date object first.
        // If an object, no need to do anything. We can directly format it.
        switch (typeof value) {
            case "string":
                return parseISO(value)
            case "object":
            default:
                return value
        }
    },
    friendlyDate: (value, format = "dd LLLL yyyy") => {
        return DateTime.fromJSDate(new Date(value)).toFormat(format)
    },
    rfcDate: (value, showTimezone = true) => {
        let format = "yyyy-MM-dd'T'HH:mm:ss" + (showTimezone ? "ZZZ" : "")
        return DateTime.fromJSDate(new Date(value)).toFormat(format)
    },
    httpDate: (value) => {
        return DateTime.fromJSDate(new Date(value)).toHTTP()
    },
    epoch: (value) => {
        return new Date(value).getTime()
    },
    friendlyTime: (value, showTimezone = true) => {
        if (showTimezone) {
            return DateTime.fromJSDate(new Date(value)).toFormat("HH:mm ZZZZ").replace('GMT+1', 'BST')
        }
        return DateTime.fromJSDate(new Date(value)).toFormat("HH:mm")
    },
    friendlyTimezone: (value) => {
        return DateTime.fromJSDate(new Date(value)).zoneName
    }
}
