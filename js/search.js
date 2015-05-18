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
    $searchForm = $(".search-form"),
    $searchInput = $(".search-input"),
    $resultTemplateArticle = $(".search-template-article"),
    $resultTemplatePen = $(".search-template-pen"),
    $resultTemplatePage = $(".search-template-page"),
    $resultsPlaceholder = $(".search-results-list"),
    $foundContainer = $(".search-results"),
    $foundTerm = $(".search-results-query"),
    $foundCount = $(".search-results-count"),
    allowEmpty = false,
    showLoader = false,
    loadingClass = "is--loading";


$(document).ready( function() {

    // hide items found string
    $foundContainer.hide();

    // initiate search functionality
    initSearch();
});




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
        $searchInput.val(query);
        execSearch(query);
    }

    // Get search results on submission of form
    $(document).on("submit", $searchForm, function(e) {
        e.preventDefault();
        query = $searchInput.val();
        execSearch(query);
    });
}


/**
 * Executes search
 * @param {String} query
 * @return null
 */
function execSearch(query) {
    if (query != '' || allowEmpty) {
        if (showLoader) {
            toggleLoadingClass();
        }

        getSearchResults(processData());
    }
}


/**
 * Toggles loading class on results and found string
 * @return null
 */
function toggleLoadingClass() {
    $resultsPlaceholder.toggleClass(loadingClass);
    $foundContainer.toggleClass(loadingClass);
}


/**
 * Get Search results from JSON
 * @param {Function} callbackFunction
 * @return null
 */
function getSearchResults(callbackFunction) {
    $.get(jsonFeedUrl, callbackFunction, 'json');
}


/**
 * Process search result data
 * @return null
 */
function processData() {
    $results = [];

    return function(data) {

        var resultsCount = 0,
            results = "";

        $.each(data, function(index, item) {
            // check if search term is in title, content, or introduction
            if (item.title.toLowerCase().indexOf(query.toLowerCase()) > -1 || item.content.toLowerCase().indexOf(query.toLowerCase()) > -1 || item.introduction.toLowerCase().indexOf(query.toLowerCase()) > -1 || item.categories.toLowerCase().indexOf(query.toLowerCase()) > -1 || item.tags.toLowerCase().indexOf(query.toLowerCase()) > -1) {
                if (item.categories) {
                    if (item.categories.toLowerCase().indexOf('article') > -1) {
                        var result = populateResultContent($resultTemplateArticle.html(), item);
                    } else {
                        var result = populateResultContent($resultTemplatePen.html(), item);
                    }
                } else {
                    var result = populateResultContent($resultTemplatePage.html(), item);
                }
                resultsCount++;
                results += result;
            }
        });

        if (showLoader) {
            toggleLoadingClass();
        }

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
    // Add results HTML to placeholder
    $resultsPlaceholder.html(results);
}


/**
 * Add results content to item template
 * @param {String} html
 * @param {object} item
 * @return {String} Populated HTML
 */
function populateResultContent(html, item) {
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
    $foundTerm.text(query);
    $foundCount.text(count);
    $foundContainer.show();
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