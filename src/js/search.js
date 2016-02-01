/*!
 * A simple JSON search
 * @author Mat Hayward - Erskine Design (Original Author)
 * @author Chris Burnell (Slight, poor modifications) <@iamchrisburnell>
 */


(function () {

    'use strict';

    ////
    /// Initialisation
    ////

    var query, queryFormatted, jsonFeedUrl = '../search.json',
        searchContainer       = document.querySelector('.js-search'),
        searchForm            = document.querySelector('.js-search-form'),
        searchInput           = document.querySelector('.js-search-input'),
        searchSubmit          = document.querySelector('.js-search-submit'),
        resultsMeta           = document.querySelector('.js-search-meta'),
        resultsList           = document.querySelector('.js-search-results-list'),
        resultTemplatePage    = document.querySelector('.js-search-template-page'),
        resultTemplateArticle = document.querySelector('.js-search-template-article'),
        resultTemplatePen     = document.querySelector('.js-search-template-pen'),
        resultTemplateLink    = document.querySelector('.js-search-template-link'),
        allowEmpty            = false;

    // initiate search functionality
    initSearch();

    // enable search input and submit
    searchInput.disabled  = false;
    searchSubmit.disabled = false;


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
        if( searchContainer && searchForm.addEventListener ) {
            searchForm.addEventListener('submit', submitCallback);
        } else if( searchContainer && searchForm.attachEvent ) {
            searchForm.attachEvent('onsubmit', submitCallback);
        }

    }

    function submitCallback(event) {
        event.preventDefault();
        query = searchInput.value;

        if( query.length >= 2 && query.length <= 30 ) {
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

        var request = new XMLHttpRequest();

        request.open('GET', jsonFeedUrl, true);

        request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
                // Success!
                var data = JSON.parse(request.responseText);
                processData(data);
            }
        };

        request.onerror = function() {
            // There was a connection error of some sort
        };

        request.send();

    }

    ////
    /// Process search result data
    /// @return void
    ////
    function processData(data) {

        var resultsCount = 0,
            results = '',
            item,
            titleCheck,
            ledeCheck,
            contentCheck,
            categoriesCheck,
            tagsCheck;

        for( var index = 0; index < data.length; index++ ) {

            item  = data[index];
            queryFormatted = query.toLowerCase();

            titleCheck      = item['title'].toLowerCase().indexOf(queryFormatted) > -1;
            ledeCheck       = false;
            contentCheck    = false;
            categoriesCheck = false;
            tagsCheck       = false;

            if( item['lede'] ) {
                ledeCheck = item['lede'].toLowerCase().indexOf(queryFormatted) > -1;
            }
            if( item['content'] ) {
                contentCheck = item['content'].toLowerCase().indexOf(queryFormatted) > -1;
            }
            if( item['categories'] ) {
                categoriesCheck = item['categories'].toLowerCase().indexOf(queryFormatted) > -1;
            }
            if( item['tags'] ) {
                tagsCheck = item['tags'].toLowerCase().indexOf(queryFormatted) > -1;
            }

            // check if search term is in title, content, or lede, categories or tags
            switch( item['type'] ) {
                case 'page':
                    if( titleCheck || ledeCheck || contentCheck ) {
                        resultsCount++;
                        results += populateResultContent(resultTemplatePage.innerHTML, item); }
                    break;
                case 'article':
                    if( titleCheck || ledeCheck || contentCheck || categoriesCheck || tagsCheck ) {
                        resultsCount++;
                        results += populateResultContent(resultTemplateArticle.innerHTML, item);
                    }
                    break;
                case 'link':
                    if( titleCheck || ledeCheck || contentCheck || categoriesCheck || tagsCheck ) {
                        resultsCount++;
                        results += populateResultContent(resultTemplateLink.innerHTML, item);
                    }
                    break;
                case 'pen':
                    if( titleCheck || ledeCheck || contentCheck || categoriesCheck || tagsCheck ) {
                        resultsCount++;
                        results += populateResultContent(resultTemplatePen.innerHTML, item);
                    }
                    break;
                default:
                    console.log("Unable to match category type to template.");
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
    }

    ////
    /// Add results content to item template
    /// @param {String} html
    /// @param {object} item
    /// @return {String} Populated HTML
    ////
    function populateResultContent(html, item) {
        html = injectContent(html, item['url'], '@@URL@@');
        html = injectContent(html, item['title'], '@@TITLE@@');

        if( item['date'] ) {
            html = injectContent(html, item['date'], '@@DATE@@');
            html = injectContent(html, item['date_friendly'], '@@DATE_FRIENDLY@@');
        }
        if( item['lede'] ) {
            html = injectContent(html, item['lede'], '@@LEDE@@');
        } else if( item['type'] == 'link' ) {
            html = injectContent(html, '<em>Shared Link</em>', '@@LEDE@@');
        } else if( item['type'] == 'pen' ) {
            html = injectContent(html, '<em>Featured Pen</em>', '@@LEDE@@');
        }

        return html;
    }

    ////
    /// Populates results string
    /// @param {String} count
    /// @return void
    ////
    function populateResultsString(count) {
        var resultSuffix = (count == 1) ? '' : 's';
        var searchMeta = '<strong>' + count + '</strong> result' + resultSuffix + ' found for <q>' + query + '</q>';
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
        var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
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
        var regex = new RegExp(placeholder, 'g');
        return originalContent.replace(regex, injection);
    }

}());
