/**
 * A simple JSON search
 * Requires jQuery (v 1.7+)
 *
 * @author  Mat Hayward - Erskine Design
 * @version  0.1
 */


 /* ==========================================================================
    Initialisation
    ========================================================================== */

var query, jsonFeedUrl = "../feed.json",
    searchForm = document.getElementsByClassName('search-form')[0],
    searchInput = document.getElementsByClassName('search-input')[0],
    searchSubmit = document.getElementsByClassName('search-submit')[0],
    resultTemplateArticle = document.getElementsByClassName('search-template-article')[0],
    resultTemplatePen = document.getElementsByClassName('search-template-pen')[0],
    resultTemplatePage = document.getElementsByClassName('search-template-page')[0],
    resultsContainer = document.getElementsByClassName('search-results')[0],
    resultsMeta = document.getElementsByClassName('search-meta')[0],
    resultsList = document.getElementsByClassName('search-results-list')[0],
    allowEmpty = false;

    // hide items found string
    resultsContainer.style.display = 'none';

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
    console.log("initSearch");

    // Get search results if query parameter is set in querystring
    if (getParameterByName('query')) {
        query = decodeURIComponent(getParameterByName('query'));
        searchInput.value = query;
        execSearch(query);
    }

    query = searchInput.value;

    // Get search results on submission of form
    if( searchForm.addEventListener ){
        searchForm.addEventListener("submit", submitCallback, false);
    } else if(searchForm.attachEvent){
        searchForm.attachEvent('onsubmit', submitCallback);
    }
}

function submitCallback(event) {
    console.log("submitCallback");
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
    console.log("execSearch");
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
    console.log("getSearchResults");

    var request = new XMLHttpRequest();
    request.open('GET', jsonFeedUrl, true);

    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            // Success!
            // var data = JSON.parse(request.responseText);
            console.log("Success");
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
    console.log("processData");
    results = [];

    return function(data) {

        var resultsCount = 0,
            results = "";

        // TODO
        Array.prototype.forEach.call(data, function(index, item) {
            // check if search term is in title, content, or introduction
            if (item.title.toLowerCase().indexOf(query.toLowerCase()) > -1 || item.content.toLowerCase().indexOf(query.toLowerCase()) > -1 || item.introduction.toLowerCase().indexOf(query.toLowerCase()) > -1 || item.categories.toLowerCase().indexOf(query.toLowerCase()) > -1 || item.tags.toLowerCase().indexOf(query.toLowerCase()) > -1) {
                if (item.categories) {
                    if (item.categories.toLowerCase().indexOf('article') > -1) {
                        var result = populateResultContent(resultTemplateArticle.html(), item);
                    } else {
                        var result = populateResultContent(resultTemplatePen.html(), item);
                    }
                } else {
                    var result = populateResultContent(resultTemplatePage.html(), item);
                }
                resultsCount++;
                results += result;
            }
        });

        populateResultsString(resultsCount);
        showSearchResults(results);

    }
}


/**
 * Add search results to placeholder
 * @param {String} results
 * @return null
 */
function showSearchResults(results) {
    console.log("showSearchResults");
    // Add results HTML to placeholder
    resultsList.html(results);
}


/**
 * Add results content to item template
 * @param {String} html
 * @param {object} item
 * @return {String} Populated HTML
 */
function populateResultContent(html, item) {
    console.log("populateResultContent");
    html = injectContent(html, item.link, '@@url@@');
    html = injectContent(html, item.title, '@@title@@');
    html = injectContent(html, item.date, '@@date@@');
    html = injectContent(html, item.date_friendly, '@@date_friendly@@');
    html = injectContent(html, item.introduction, '@@introduction@@');
    return html;
}


/**
 * Populates results string
 * @param {String} count
 * @return null
 */
function populateResultsString(count) {
    console.log("populateResultsString");
    var resultSuffix = (count > 1) ? "s" : "";
    var searchMeta = '<em>' + count + '</em> result' + resultSuffix + ' found for <q>' + query + '</q>';
    resultsMeta.html(searchMeta);
    resultsContainer.style.display = '';
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
    console.log("getParameterByName");
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
    console.log("injectContent");
    var regex = new RegExp(placeholder, 'g');
    return originalContent.replace(regex, injection);
}