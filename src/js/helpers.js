/*!
 * Helpers
 * @author Chris Burnell <me@chrisburnell.com>
 */

helpers = {
    ////
    /// Injects content into template using placeholder
    /// @param {String} originalContent
    /// @param {String} injection
    /// @param {String} placeholder
    /// @return {String} injected content
    ////
    injectContent: (originalContent, placeholder, injection, flags = "g") => {
        const PATTERN = new RegExp(placeholder, flags);

        return originalContent.replace(PATTERN, injection);
    },

    ////
    /// Gets query string parameter
    /// @see Taken from `http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript`
    /// @param {String} name
    /// @return {String} parameter value
    ////
    getParameterByName: name => {
        const regex = RegExp(`[?&]${name}=([^&]*)`).exec(window.location.search);

        return regex && decodeURIComponent(regex[1].replace(/\+/g, " "));
    },

    ////
    /// Enable a button
    /// @param {Element} element
    /// @param {Function} action
    /// @return false
    ////
    enableElement: (element, action) => {
        if (element !== null) {
            element.disabled = false;
            element.setAttribute("aria-disabled", "false");
            if (action) {
                element.addEventListener("click", action);
            }
        }
    },

    ////
    /// Format a Date
    /// @param {String} date
    /// @return {String} formattedDate
    ////
    formatDate: (date, includeWeekday = false) => {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        let day = date.getDate();
        if (day < 10) {
            day = `0${day}`;
        }
        let month = months[date.getMonth()];
        let year = date.getFullYear();

        let weekday = includeWeekday ? `${weekdays[date.getDay()]} ` : "";

        return `${weekday}${day} ${month} ${year}`;
    },

    ////
    /// Format a Time
    /// @param {Date} date
    /// @param {Boolean} [false] includeSeconds
    /// @param {Boolean} [true] includeMerdiem
    /// @return {String} formattedTime
    ////
    formatTime: (date, includeSeconds = false, includeMeridiem = true) => {
        let hours = date.getHours();
        let minutes = `:${date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}`;
        let seconds = includeSeconds ? `:${date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()}` : "";
        let meridiem = includeMeridiem ? ` ${hours < 12 ? "am" : "pm"}` : "";

        // format from 24-hours to 12-hours if including meridiem
        hours = includeMeridiem ? hours % 12 || 12 : hours;

        return `${hours}${minutes}${seconds}${meridiem}`;
    },

    ////
    /// Action from Hash
    /// @param {Array} hashes
    /// @param {Function} action
    /// @return false
    ////
    actionFromHash: (hashes, action) => {
        for (let hash of hashes) {
            if (window.location.hash.indexOf(hash) !== -1) {
                action();
            }
        }
    },

    ////
    /// Ensure fetch response is OK
    /// @param {Object} response
    /// @return {Object} response
    /// @throw {Object} error
    ////
    getFetchResponse: response => {
        if (response.ok) {
            return response;
        } else {
            let error = new Error(response.statusText);
            error.response = response;
            throw error;
        }
    },

    ////
    /// Return a frequency based on starting key and interval
    /// @param {Number} keyStart [49]
    /// @return {Number} frequency
    ////
    getFrequencyFromKeys: (key = 49) => {
        return 2 ** ((key - 49) / 12) * 440;
    },

    ////
    /// Return a frequency based on starting key and interval
    /// @param {Number} keyStart [49]
    /// @param {Number} keyInterval [0]
    /// @return {Number} frequency
    ////
    padWithZeroes: (number, integersMax = 2) => {
        const [integers, decimals] = number.toString().split(".");
        return integers.toString().padStart(integersMax, "0") + (decimals ? `.${decimals}` : "");
    },

    ////
    /// Reliably extract text from HTML
    /// @param {String} html
    /// @return {String} text
    ////
    decodeHTML: html => {
        let text = document.createElement("textarea");
        text.innerHTML = html;
        return text.value;
    },

    ////
    /// Truncate text to n words
    ////
    truncate: (string, maximum = 10) => {
        let array = string.trim().split(" ");
        let ellipsis = array.length > maximum ? "…" : "";
        return (
            array
                .slice(0, maximum)
                .join(" ")
                .replace(/[\,\.\;]$/, "") + ellipsis
        );
    },

    since: (datetime) => {
        const today = Math.floor(Date.now() / 1000);
        const compare = Math.floor(datetime.getTime() / 1000);
        const difference = Math.abs(compare - today);

        const minute = 60;
        const hour = 60 * minute;
        const day = 24 * hour;
        const week = 7 * day;
        const month = 30.436875 * day;
        const year = 12 * month;

        const rtf = new Intl.RelativeTimeFormat("en", {
            localeMatcher: "best fit", // other values: "lookup"
            numeric: "always", // other values: "auto"
            style: "long" // other values: "short" or "narrow"
        });

        if (difference < minute * 2) {
            return "just moments ago";
        } else if (difference < hour * 2) {
            return rtf.format(Math.ceil((compare - today) / minute), "minute");
        } else if (difference < day * 2) {
            return rtf.format(Math.ceil((compare - today) / hour), "hour");
        } else if (difference < week * 2) {
            return rtf.format(Math.ceil((compare - today) / day), "day");
        } else if (difference < month * 2) {
            return rtf.format(Math.ceil((compare - today) / week), "week");
        } else if (difference < year * 2) {
            return rtf.format(Math.ceil((compare - today) / month), "month");
        }
        return rtf.format(Math.ceil((compare - today) / year), "year");
    },

    ////
    /// Wilson Score Interval
    /// @see https://en.wikipedia.org/wiki/Binomial_proportion_confidence_interval#Wilson_score_interval
    /// @param {Number} positive items
    /// @param {Number} total items
    /// @return {Object} confidence percentages
    ////
    wilson: (positive, total) => {
        if (total === 0) {
            return {
                left: 0,
                right: 0
            };
        }

        // phat is the proportion of successes in a Bernoulli trial process
        const phat = positive / total;

        // z is 1-alpha/2 percentile of a standard normal distribution for error alpha = 5%
        const z = 1.96;

        // implement the algorithm
        const a = phat + (z * z) / (2 * total);
        const b = z * Math.sqrt((phat * (1 - phat) + (z * z) / (4 * total)) / total);
        const c = 1 + (z * z) / total;

        return {
            left: (a - b) / c,
            right: (a + b) / c
        };
    }
};
