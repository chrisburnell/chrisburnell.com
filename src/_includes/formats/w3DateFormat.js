const { DateTime } = require("luxon");

module.exports = function w3DateFormat(value, showTimezone = true) {
    if (showTimezone) {
        return DateTime.fromJSDate(new Date(value)).toFormat("yyyy-MM-dd'T'HH:mm:ssZZZ");
    }
    return DateTime.fromJSDate(new Date(value)).toFormat("yyyy-MM-dd'T'HH:mm:ss");
};
