const { DateTime } = require("luxon")

module.exports = {
    rfcDate: (value, showTimezone = true) => {
        let format = "yyyy-MM-dd'T'HH:mm:ss" + (showTimezone ? "ZZZ" : "")
        return DateTime.fromJSDate(new Date(value)).toFormat(format)
    },
    friendlyDate: (value, format = "dd LLLL yyyy") => {
        return DateTime.fromJSDate(new Date(value)).toFormat(format)
    },
    friendlyTime: (value, showTimezone = true) => {
        if (showTimezone) {
            return DateTime.fromJSDate(new Date(value)).toFormat("HH:mm ZZZZ").replace('GMT+1', 'BST')
        }
        return DateTime.fromJSDate(new Date(value)).toFormat("HH:mm")
    },
    friendlyTimezone: (value) => {
        return DateTime.fromJSDate(new Date(value)).zoneName
    },
    httpDate: (value) => {
        return DateTime.fromJSDate(new Date(value)).toHTTP()
    },
    epoch: (value) => {
        return new Date(value).getTime()
    }
}
