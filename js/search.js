/*!
 * A simple JSON search
 *
 * @author   Chris Burnell
 * @author   Mat Hayward - Erskine Design
 * @version  0.2
 */


 /* ==========================================================================
    Initialisation
    ========================================================================== */

var query, jsonFeedUrl = "../search.json",
    searchContainer = document.getElementById('search'),
    searchForm = document.getElementById('search-form'),
    searchInput = document.getElementById('search-input'),
    searchSubmit = document.getElementById('search-submit'),
    resultsMeta = document.getElementById('search-meta'),
    resultsList = document.getElementById('search-results-list'),
    resultTemplatePage = document.getElementsByClassName('search-template-page')[0],
    resultTemplateArticle = document.getElementsByClassName('search-template-article')[0],
    resultTemplatePen = document.getElementsByClassName('search-template-pen')[0],
    allowEmpty = false;

    // initiate search functionality
    initSearch();

    // enable search input and submit
    searchInput.disabled = false;
    searchSubmit.disabled = false;




 /* ==========================================================================
    Search functions
    ========================================================================== */


/**
 * Initiate search functionality.
 * Shows results based on querystring if present.
 * Binds search function to form submission.
 */
function initSearch() {

    // Get search results if query parameter is set in querystring
    if (getParameterByName('query')) {
        query = decodeURIComponent(getParameterByName('query'));
        searchInput.value = query;
        execSearch(query);
    }

    query = searchInput.value;

    // Get search results on submission of form
    if( searchContainer && searchForm.addEventListener ) {
        searchForm.addEventListener('submit', submitCallback, false);
    } else if( searchContainer && searchForm.attachEvent ) {
        searchForm.attachEvent('onsubmit', submitCallback);
    }

}

function submitCallback(event) {
    event.preventDefault();
    query = searchInput.value;
    execSearch(query);
}


/**
 * Executes search
 * @param {String} query
 * @return null
 */
function execSearch(query) {
    if (query != '' || allowEmpty) {
        getSearchResults();
    }
}


/**
 * Get Search results from JSON
 * @param {Function} callbackFunction
 * @return null
 */
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


/**
 * Process search result data
 * @return null
 */
function processData(data) {
    results = [];

    var resultsCount = 0,
        results = "";

    for( var index = 0; index < data.length; index++ ) {
        var item = data[index];
        // check if search term is in title, content, or introduction, categories or tags
        if (item['title'].toLowerCase().indexOf(query.toLowerCase()) > -1 || item['content'].toLowerCase().indexOf(query.toLowerCase()) > -1 || item['introduction'].toLowerCase().indexOf(query.toLowerCase()) > -1 || item['categories'].toLowerCase().indexOf(query.toLowerCase()) > -1 || item['tags'].toLowerCase().indexOf(query.toLowerCase()) > -1) {
            if (item['categories']) {
                if (item['categories'].toLowerCase().indexOf('article') > -1) {
                    var result = populateResultContent(resultTemplateArticle.innerHTML, item);
                } else {
                    var result = populateResultContent(resultTemplatePen.innerHTML, item);
                }
            } else {
                var result = populateResultContent(resultTemplatePage.innerHTML, item);
            }
            resultsCount++;
            results += result;
        }
    }

    populateResultsString(resultsCount);
    showSearchResults(results);

}


/**
 * Add search results to placeholder
 * @param {String} results
 * @return null
 */
function showSearchResults(results) {
    // Add results HTML to placeholder
    resultsList.innerHTML = results;
}


/**
 * Add results content to item template
 * @param {String} html
 * @param {object} item
 * @return {String} Populated HTML
 */
function populateResultContent(html, item) {
    html = injectContent(html, item['link'], '@@url@@');
    html = injectContent(html, item['title'], '@@title@@');
    html = injectContent(html, item['date'], '@@date@@');
    html = injectContent(html, item['date_friendly'], '@@date_friendly@@');
    html = injectContent(html, item['introduction'], '@@introduction@@');
    return html;
}


/**
 * Populates results string
 * @param {String} count
 * @return null
 */
function populateResultsString(count) {
    var resultSuffix = (count > 1) ? "s" : "";
    var searchMeta = '<em>' + count + '</em> result' + resultSuffix + ' found for <q>' + query + '</q>';
    resultsMeta.innerHTML = searchMeta;
}




 /* ==========================================================================
    Helper functions
    ========================================================================== */


/**
 * Gets query string parameter - taken from http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
 * @param {String} name
 * @return {String} parameter value
 */
function getParameterByName(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}


/**
 * Injects content into template using placeholder
 * @param {String} originalContent
 * @param {String} injection
 * @param {String} placeholder
 * @return {String} injected content
 */
function injectContent(originalContent, injection, placeholder) {
    var regex = new RegExp(placeholder, 'g');
    return originalContent.replace(regex, injection);
}