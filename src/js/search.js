/*!
 * A simple JSON search
 * @author Mat Hayward - Erskine Design (Original Author)
 * @author Chris Burnell <me@chrisburnell.com> (Slight, poor modifications)
 */


(() => {

    'use strict';


    let query;
    let queryFormatted;
    const jsonFeedUrl = '../search.json';
    const allowEmpty = false;
    const searchContainer = document.querySelector('.js-search');
    const searchForm      = document.querySelector('.js-search-form');
    const searchInput     = document.querySelector('.js-search-input');
    const searchSubmit    = document.querySelector('.js-search-submit');
    const resultsMeta     = document.querySelector('.js-search-meta');
    const resultsList     = document.querySelector('.js-search-results-list');
    const resultTemplatePage = `<li role="listitem">
        <a href="{{url}}">
            <h4 class="title">{{title}}</h4>
            <p class="lede">{{lede}}</p>
        </a>
    </li>`;
    const resultTemplatePost = `<li role="listitem">
        <a href="{{url}}">
            <svg class="icon  icon--{{icon}}" role="img"><use xlink:href="#svg--{{icon}}" /></svg>
            <h4 class="title">{{title}}</h4>
            <p class="lede">{{lede}}</p>
            <time class="date" datetime="{{date}}">{{date_friendly}}</time>
        </a>
    </li>`;


    // initiate search functionality
    initSearch();

    // enable search input and submit
    searchInput.disabled  = false;
    searchInput.setAttribute('aria-disabled', 'false');
    searchSubmit.disabled = false;
    searchSubmit.setAttribute('aria-disabled', 'false');


    ////
    /// Search Functions
    ////

    ////
    /// Initiate search functionality.
    /// Shows results based on querystring if present.
    /// Binds search function to form submission.
    ////
    function initSearch() {

        // Get search results if query parameter is set in querystring
        if (getParameterByName('query')) {
            query = decodeURIComponent(getParameterByName('query'));
            searchInput.value = query;
            execSearch(query);
        }

        query = searchInput.value;

        // Catch the form submission and initiate search lookup
        if (searchContainer && searchForm.addEventListener) {
            searchForm.addEventListener('submit', submitCallback);
        } else if (searchContainer && searchForm.attachEvent) {
            searchForm.attachEvent('onsubmit', submitCallback);
        }

    }

    function submitCallback(event) {
        event.preventDefault();
        query = searchInput.value;

        if (query.length >= 2 && query.length <= 30) {
            execSearch(query);
        } else {
            resultsMeta.innerHTML = 'Your search query must be 2–30 characters in length.';
        }
    }

    ////
    /// Executes search
    /// @param {String} query
    /// @return void
    ////
    function execSearch(query) {
        if (query != '' || allowEmpty) {
            getSearchResults();
        }
    }

    ////
    /// Get Search results from JSON
    /// @param {Function} callbackFunction
    /// @return void
    ////
    function getSearchResults() {

        const request = new XMLHttpRequest();

        request.open('GET', jsonFeedUrl, true);

        request.onload = () => {
            if (request.status >= 200 && request.status < 400) {
                // Success!
                const data = JSON.parse(request.responseText);
                processData(data);
            }
        };

        request.onerror = () => {
            // There was a connection error of some sort
        };

        request.send();

    }

    ////
    /// Process search result data
    /// @return void
    ////
    function processData(data) {

        let resultsCount = 0;
        let results = '';
        let titleCheck;
        let ledeCheck;
        let contentCheck;
        let categoriesCheck;
        let tagsCheck;
        let locationCheck;

        for (var item of data) {

            queryFormatted = query.toLowerCase();

            titleCheck = item['title'].toLowerCase().indexOf(queryFormatted) > -1;
            ledeCheck       = false;
            contentCheck    = false;
            categoriesCheck = false;
            tagsCheck       = false;
            locationCheck   = false;

            if (item['lede']) {
                ledeCheck = item['lede'].toLowerCase().indexOf(queryFormatted) > -1;
            }
            if (item['content']) {
                contentCheck = item['content'].toLowerCase().indexOf(queryFormatted) > -1;
            }
            if (item['categories']) {
                categoriesCheck = item['categories'].toLowerCase().indexOf(queryFormatted) > -1;
            }
            if (item['tags']) {
                tagsCheck = item['tags'].toLowerCase().indexOf(queryFormatted) > -1;
            }
            if (item['location']) {
                locationCheck = item['location'].toLowerCase().indexOf(queryFormatted) > -1;
            }

            // check if search term is in title, content, or lede, categories, tags, or talk location
            if (item['type'] == 'page') {
                if (titleCheck || ledeCheck || contentCheck) {
                    resultsCount++;
                    results += populateResultContent(resultTemplatePage, item);
                }
            } else {
                if (titleCheck || ledeCheck || contentCheck || categoriesCheck || tagsCheck || locationCheck) {
                    resultsCount++;
                    results += populateResultContent(resultTemplatePost, item);
                }
            }

        }

        populateResultsString(resultsCount);
        showSearchResults(results);

        ga('send', 'event', 'search', resultsCount, query);
    }

    ////
    /// Add search results to placeholder
    /// @param {String} results
    /// @return void
    ////
    function showSearchResults(results) {
        // Add results HTML to placeholder
        resultsList.innerHTML = results;
        // Remove focus from the search input by toggling focus on the resultsList
        document.activeElement.blur();
        // And scroll to the results
        resultsMeta.scrollIntoView();
        // And mark the resultsList as `aria-expanded="true"`
        resultsList.setAttribute('aria-expanded', 'true');
    }

    ////
    /// Add results content to item template
    /// @param {String} html
    /// @param {object} item
    /// @return {String} Populated HTML
    ////
    function populateResultContent(html, item) {
        // URL
        html = injectContent(html, item['url'], '{{url}}');

        // ICON
        if (item['categories'] == 'article') {
            html = injectContent(html, 'article', '{{icon}}');
        } else if (item['categories'] == 'link') {
            html = injectContent(html, 'link', '{{icon}}');
        } else if (item['categories'] == 'pen') {
            html = injectContent(html, 'codepen', '{{icon}}');
        } else if (item['categories'] == 'talk') {
            html = injectContent(html, 'bullhorn', '{{icon}}');
        }

        // TITLE
        html = injectContent(html, item['title'], '{{title}}');

        // LEDE
        if (item['lede']) {
            html = injectContent(html, item['lede'], '{{lede}}');
        } else if (item['categories'] == 'link') {
            html = injectContent(html, '<em>Shared Link</em>', '{{lede}}');
        } else if (item['categories'] == 'pen') {
            html = injectContent(html, '<em>Featured Pen</em>', '{{lede}}');
        } else if (item['categories'] == 'talk' && item['location']) {
            html = injectContent(html, `<em>A talk that I gave at ${item['location']}.</em>`, '{{lede}}');
        }

        // DATE
        if (item['type'] == 'post') {
            html = injectContent(html, item['date'], '{{date}}');
            html = injectContent(html, item['date_friendly'], '{{date_friendly}}');
        }

        return html;
    }

    ////
    /// Populates results string
    /// @param {String} count
    /// @return void
    ////
    function populateResultsString(count) {
        const resultSuffix = (count == 1) ? '' : 's';
        const searchMeta = `<strong>${count}</strong> result${resultSuffix} found for <q>${query}</q>`;
        resultsMeta.innerHTML = searchMeta;
    }


    ////
    /// Helper Functions
    ////

    ////
    /// Gets query string parameter
    /// Taken from `http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript`
    /// @param {String} name
    /// @return {String} parameter value
    ////
    function getParameterByName(name) {
        const match = RegExp(`[?&]${name}=([^&]*)`).exec(window.location.search);
        return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
    }

    ////
    /// Injects content into template using placeholder
    /// @param {String} originalContent
    /// @param {String} injection
    /// @param {String} placeholder
    /// @return {String} injected content
    ////
    function injectContent(originalContent, injection, placeholder) {
        const regex = new RegExp(placeholder, 'g');
        return originalContent.replace(regex, injection);
    }

})();
