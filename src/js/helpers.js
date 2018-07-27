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
    /// Taken from `http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript`
    /// @param {String} name
    /// @return {String} parameter value
    ////
    getParameterByName: (name) => {
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
    formatDate: (date) => {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        let day = date.getDate();
        if (day < 10) {
            day = `0${day}`;
        }
        let month = months[date.getMonth()];
        let year = date.getFullYear();

        return `${day} ${month} ${year}`;
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
    }
};
