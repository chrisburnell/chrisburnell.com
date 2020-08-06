const { DateTime } = require("luxon");

module.exports = function dateFormat(value, format = "dd LLLL yyyy") {
    return DateTime.fromJSDate(new Date(value)).toFormat(format);
};
