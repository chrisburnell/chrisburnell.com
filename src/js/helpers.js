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
    injectContent: function(originalContent, injection, placeholder) {
        const REGEX = new RegExp(placeholder, "g");

        return originalContent.replace(REGEX, injection);
    },

    ////
    /// Gets query string parameter
    /// Taken from `http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript`
    /// @param {String} name
    /// @return {String} parameter value
    ////
    getParameterByName: function(name) {
        const regex = RegExp(`[?&]${name}=([^&]*)`).exec(window.location.search);

        return regex && decodeURIComponent(regex[1].replace(/\+/g, " "));
    },

    ////
    /// Enable a button
    /// @param {Element} element
    /// @param {Function} action
    /// @return false
    ////
    enableElement: function(element, action) {
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
    formatDate: function(date) {
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
    formatTime: function(date, includeSeconds = false, includeMeridiem = true) {
        let hours = date.getHours();
        let minutes = `:${date.getMinutes()}`;
        let seconds = includeSeconds ? `:${date.getSeconds()}` : "";
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
    actionFromHash: function(hashes, action) {
        for (let hash of hashes) {
            if (window.location.hash.indexOf(hash) !== -1) {
                action();
            }
        }
    }
};
