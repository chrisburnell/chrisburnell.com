/*!
 * A simple JSON search
 * @author  Mat Hayward - Erskine Design (Original Author)
 * @author  Chris Burnell <@iamchrisburnell>
 */


/*------------------------------------*\
    INITIALISATION
\*------------------------------------*/

var query, jsonFeedUrl = '../search.json',
    searchContainer = document.getElementById('search'),
    searchForm      = document.getElementById('search-form'),
    searchInput     = document.getElementById('search-input'),
    searchSubmit    = document.getElementById('search-submit'),
    resultsMeta     = document.getElementById('search-meta'),
    resultsList     = document.getElementById('search-results-list'),
    resultTemplatePage    = document.getElementsByClassName('search-template-page')[0],
    resultTemplateArticle = document.getElementsByClassName('search-template-article')[0],
    resultTemplatePen     = document.getElementsByClassName('search-template-pen')[0],
    allowEmpty = false;

    // initiate search functionality
    initSearch();

    // enable search input and submit
    searchInput.disabled  = false;
    searchSubmit.disabled = false;


/*------------------------------------*\
    SEARCH FUNCTIONS
\*------------------------------------*/

/**
 * Initiate search functionality.
 * Shows results based on querystring if present.
 * Binds search function to form submission.
 */
function initSearch() {

    // Get search results if query parameter is set in querystring
    if (getParameterByName('query')) {
        query = decodeURIComponent(getParameterByName('query')).toLowerCase();
        searchInput.value = query;
        execSearch(query);
    }

    query = searchInput.value;

    // Catch the form submission and initiate search lookup
    if( searchContainer && searchForm.addEventListener ) {
        searchForm.addEventListener('submit', submitCallback, false);
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
        resultsMeta.innerHTML = "Your search query must be 2–30 characters in length.";
    }
}

/**
 * Executes search
 * @param {String} query
 * @return void
 */
function execSearch(query) {
    if (query != '' || allowEmpty) {
        getSearchResults();
    }
}

/**
 * Get Search results from JSON
 * @param {Function} callbackFunction
 * @return void
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
 * @return void
 */
function processData(data) {

    var resultsCount = 0,
        results = '',
        item,
        titleCheck,
        introductionCheck,
        contentCheck,
        categoriesCheck,
        tagsCheck;

    for( var index = 0; index < data.length; index++ ) {

        item = data[index];
        query = query.toLowerCase();

        titleCheck = item['title'].toLowerCase().indexOf(query) > -1;
        introductionCheck = false;
        contentCheck      = false;
        categoriesCheck   = false;
        tagsCheck         = false;

        if( item['introduction'] ) {
            introductionCheck = item['introduction'].toLowerCase().indexOf(query) > -1;
        }
        if( item['content'] ) {
            contentCheck = item['content'].toLowerCase().indexOf(query) > -1;
        }
        if( item['categories'] ) {
            categoriesCheck = item['categories'].toLowerCase().indexOf(query) > -1;
        }
        if( item['tags'] ) {
            tagsCheck = item['tags'].toLowerCase().indexOf(query) > -1;
        }

        // check if search term is in title, content, or introduction, categories or tags
        switch( item['type'] ) {
            case 'page':
                if( titleCheck || introductionCheck || contentCheck ) {
                    resultsCount++;
                    results += populateResultContent(resultTemplatePage.innerHTML, item);
                }
                break;
            case 'article':
                if( titleCheck || introductionCheck || contentCheck || categoriesCheck || tagsCheck ) {
                    resultsCount++;
                    results += populateResultContent(resultTemplateArticle.innerHTML, item);
                }
                break;
            case 'pen':
                if( titleCheck || introductionCheck || contentCheck || categoriesCheck || tagsCheck ) {
                    resultsCount++;
                    results += populateResultContent(resultTemplatePen.innerHTML, item);
                }
                break;
        }

    }

    populateResultsString(resultsCount);
    showSearchResults(results);

}

/**
 * Add search results to placeholder
 * @param {String} results
 * @return void
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
    if( item['introduction'] ) {
        html = injectContent(html, item['introduction'], '@@introduction@@');
    } else if( item['type'] == "pen" ) {
        html = injectContent(html, '<em>Featured Pen</em>', '@@introduction@@');
    }
    return html;
}

/**
 * Populates results string
 * @param {String} count
 * @return void
 */
function populateResultsString(count) {
    var resultSuffix = (count == 1) ? 's' : '';
    var searchMeta = '<em>' + count + '</em> result' + resultSuffix + ' found for <q>' + query.toLowerCase() + '</q>';
    resultsMeta.innerHTML = searchMeta;
}


/*------------------------------------*\
    HELPER FUNCTIONS
\*------------------------------------*/

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
