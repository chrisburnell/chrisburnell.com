/*!
 * A simple JSON search
 * @author Mat Hayward - Erskine Design (Original Author)
 * @author Chris Burnell <me@chrisburnell.com> (Slight, poor modifications)
 */


(() => {

    'use strict';


    let query;
    let searchContainer = document.querySelector('.js-search');
    let searchForm      = document.querySelector('.js-search-form');
    let searchInput     = document.querySelector('.js-search-input');
    let searchSubmit    = document.querySelector('.js-search-submit');
    let resultsMeta     = document.querySelector('.js-search-meta');
    let resultsList     = document.querySelector('.js-search-results-list');
    const jsonFeedUrl = '../search.json';
    const allowEmpty = false;
    const resultTemplatePage = `<li role="listitem">
        <article role="article" itemscope itemtype="https://schema.org/Article">
            <a href="{{url}}">
                <h4 class="title" itemprop="name">{{title}}</h4>
                <p class="lede" itemprop="description">{{lede}}</p>
            </a>
        </article>
    </li>`;
    const resultTemplatePost = `<li role="listitem">
        <article role="article" itemscope itemtype="https://schema.org/TechArticle">
            <a href="{{url}}">
                <svg class="icon  icon--{{icon}}" role="img"><use xlink:href="/images/sprites.svg#svg--{{icon}}" /></svg>
                <h4 class="title" itemprop="name">{{title}}</h4>
                <p class="lede" itemprop="description">{{lede}}</p>
                <time class="date" datetime="{{date}}">{{date_friendly}}</time>
            </a>
        </article>
    </li>`;


    // initiate search functionality
    initSearch();

    // enable search input and submit
    searchInput.disabled  = false;
    searchInput.setAttribute('aria-disabled', 'false');
    searchSubmit.disabled = false;
    searchSubmit.setAttribute('aria-disabled', 'false');


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

        for (var item of data) {

            let queryFormatted = query.toLowerCase();

            let titleCheck      = item['title'].toLowerCase().indexOf(queryFormatted) > -1;
            let ledeCheck       = false;
            let dateCheck       = false;
            let contentCheck    = false;
            let categoriesCheck = false;
            let tagsCheck       = false;
            let locationCheck   = false;

            if (item['lede']) {
                ledeCheck = item['lede'].toLowerCase().indexOf(queryFormatted) > -1;
            }
            if (item['date'] || item['date_friendly']) {
                if (queryFormatted.substring(0, 5) == 'date:') {
                    dateCheck = item['date'].toLowerCase().indexOf(queryFormatted.slice(5)) > -1;
                    if (!dateCheck) {
                        dateCheck = item['date_friendly'].toLowerCase().indexOf(queryFormatted.slice(5)) > -1;
                    }
                }
                else {
                    dateCheck = item['date'].toLowerCase().indexOf(queryFormatted) > -1;
                    if (!dateCheck) {
                        dateCheck = item['date_friendly'].toLowerCase().indexOf(queryFormatted) > -1;
                    }
                }
            }
            if (item['content']) {
                contentCheck = item['content'].toLowerCase().indexOf(queryFormatted) > -1;
            }
            if (item['categories']) {
                categoriesCheck = item['categories'].toLowerCase().indexOf(queryFormatted) > -1;
            }
            if (item['tags']) {
                if (queryFormatted.substring(0, 4) == 'tag:') {
                    tagsCheck = item['tags'].toLowerCase().indexOf(queryFormatted.slice(4)) > -1;
                }
                else if (queryFormatted.substring(0, 5) == 'tags:') {
                    tagsCheck = item['tags'].toLowerCase().indexOf(queryFormatted.slice(5)) > -1;
                }
                else {
                    tagsCheck = item['tags'].toLowerCase().indexOf(queryFormatted) > -1;
                }
            }
            if (item['location']) {
                locationCheck = item['location'].toLowerCase().indexOf(queryFormatted) > -1;
            }

            // if performing a date check
            if ((queryFormatted.substring(0, 5) == 'date:') && dateCheck) {
                resultsCount++;
                results += populateResultContent(resultTemplatePost, item);
            }
            // if performing a tags check
            else if (((queryFormatted.substring(0, 4) == 'tag:') || (queryFormatted.substring(0, 5) == 'tags:')) && tagsCheck) {
                resultsCount++;
                results += populateResultContent(resultTemplatePost, item);
            }
            // or item type is a page, check if search term is in title,
            // content, or lede, categories, tags, or talk location
            else if (item['type'] == 'page' && (titleCheck || ledeCheck || contentCheck)) {
                resultsCount++;
                results += populateResultContent(resultTemplatePage, item);
            }
            // check if search term is in title, lede, content, categories,
            // tags, or talk location
            else if (titleCheck || ledeCheck || dateCheck || contentCheck || categoriesCheck || tagsCheck || locationCheck) {
                resultsCount++;
                results += populateResultContent(resultTemplatePost, item);
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
        }
        else if (item['categories'] == 'link') {
            html = injectContent(html, 'link', '{{icon}}');
        }
        else if (item['categories'] == 'pen') {
            html = injectContent(html, 'codepen', '{{icon}}');
        }
        else if (item['categories'] == 'talk') {
            html = injectContent(html, 'bullhorn', '{{icon}}');
        }

        // TITLE
        html = injectContent(html, item['title'], '{{title}}');

        // LEDE
        if (item['lede']) {
            let ledeFormatted = item['lede'].replace(/(<([^>]+)>)/ig, '').split(/(?=\s)/gi).slice(0, 20).join('');
            html = injectContent(html, ledeFormatted, '{{lede}}');
        }
        else if (item['categories'] == 'link') {
            html = injectContent(html, 'Shared Link', '{{lede}}');
        }
        else if (item['categories'] == 'pen') {
            html = injectContent(html, 'Featured Pen', '{{lede}}');
        }
        else if (item['categories'] == 'talk' && item['location']) {
            html = injectContent(html, `Talk – Given at ${item['location']}.`, '{{lede}}');
        }
        else if (item['categories'] == 'talk') {
            html = injectContent(html, `Talk`, '{{lede}}');
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
