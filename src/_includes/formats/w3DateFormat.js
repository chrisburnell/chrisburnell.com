const { DateTime } = require("luxon");

module.exports = function w3DateFormat(value, showTimezone = true, iso = false) {
    if (iso) {
        return DateTime.fromJSDate(new Date(value)).toFormat("yyyy-MM-dd'T'HH:mm:ssZZ");
    }
    else if (showTimezone) {
        return DateTime.fromJSDate(new Date(value)).toFormat("yyyy-MM-dd'T'HH:mm:ssZZZ");
    }
    return DateTime.fromJSDate(new Date(value)).toFormat("yyyy-MM-dd'T'HH:mm:ss");
};
