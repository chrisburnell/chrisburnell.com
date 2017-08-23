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
        const REGEX = new RegExp(placeholder, 'g');

        return originalContent.replace(REGEX, injection);
    },

    ////
    /// Gets query string parameter
    /// Taken from `http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript`
    /// @param {String} name
    /// @return {String} parameter value
    ////
    getParameterByName: function(name) {
        const REGEX = RegExp(`[?&]${name}=([^&]*)`).exec(window.location.search);

        return REGEX && decodeURIComponent(REGEX[1].replace(/\+/g, ' '));
    },

    ////
    /// Enable a button
    /// @param {Element} element
    /// @param {Function} action
    /// @return false
    ////
    enableButton: function(element, action) {
        if (element !== null) {
            element.disabled = false;
            element.setAttribute('aria-disabled', 'false');
            element.addEventListener('click', action);
        }

        return false;
    },

    ////
    /// Format a Date
    /// @param {String} date
    /// @return {String} formattedDate
    ////
    formatDate: function(date) {
        const MONTHS = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ];

        let day = date.getDate();
        if (day < 10) {
            day = '0' + day;
        }
        let monthIndex = date.getMonth();
        let year = date.getFullYear();

        return `${day} ${MONTHS[monthIndex]} ${year}`;
    },

    ////
    ///
    ////
    actionFromHash: function(hashes, action) {
        for (let hash of hashes) {
            if (window.location.hash.indexOf(hash) === 0) {
                action();
            }
        }
    },

};
