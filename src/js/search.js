/*!
 * A simple JSON search
 * @author Mat Hayward - Erskine Design (Original Author)
 * @author Chris Burnell <me@chrisburnell.com> (Slight, poor modifications)
 */

(() => {
    "use strict";

    let query;
    let searchContainer = document.querySelector(".js-search");
    let searchForm = document.querySelector(".js-search-form");
    let searchInput = document.querySelector(".js-search-input");
    let searchSubmit = document.querySelector(".js-search-submit");
    let resultsMeta = document.querySelector(".js-search-meta");
    let resultsList = document.querySelector(".js-search-results-list");
    const ALLOW_EMPTY = false;
    const JSON_FEED_URL = "../search.json";
    const SEARCH_PAGE_TEMPLATE = document.querySelector(".search-template--page") ? document.querySelector(".search-template--page").innerHTML.trim() : "";
    const SEARCH_POST_TEMPLATE = document.querySelector(".search-template--post") ? document.querySelector(".search-template--post").innerHTML.trim() : "";

    // enable Search
    if (searchInput !== null && searchSubmit !== null) {
        searchInput.disabled = false;
        searchInput.setAttribute("aria-disabled", "false");
        searchSubmit.disabled = false;
        searchSubmit.setAttribute("aria-disabled", "false");
        initSearch();
    }

    ////
    /// Initiate search functionality.
    /// Shows results based on querystring if present.
    /// Binds search function to form submission.
    ////
    function initSearch() {
        if (!searchContainer) {
            return;
        }

        // Get search results if query parameter is set in querystring
        if (helpers.getParameterByName("query")) {
            query = decodeURIComponent(helpers.getParameterByName("query"));
            searchInput.value = query;
            execSearch(query);
        }

        query = searchInput.value;

        // Catch the form submission and initiate search lookup
        searchForm.addEventListener("submit", submitCallback);
    }

    function submitCallback(event) {
        event.preventDefault();
        query = searchInput.value;

        if (query.length >= 2 && query.length <= 30) {
            execSearch(query);
        } else {
            resultsMeta.innerHTML = "Your search query must be 2–30 characters in length.";
        }
    }

    ////
    /// Executes search
    /// @param {String} query
    /// @return void
    ////
    function execSearch(query) {
        if (query !== "" || ALLOW_EMPTY) {
            getSearchResults();
        }
    }

    ////
    /// Get Search results from JSON
    /// @param {Function} callbackFunction
    /// @return void
    ////
    function getSearchResults() {
        let request = new XMLHttpRequest();

        request.open("GET", JSON_FEED_URL, true);

        request.onload = () => {
            if (request.status >= 200 && request.status < 400) {
                // Success!
                let data = JSON.parse(request.responseText);
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
        let resultsCount = 0,
            results = "";

        for (let item of data) {
            let queryFormatted = query.toLowerCase(),
                titleCheck = false,
                ledeCheck = false,
                dateCheck = false,
                contentCheck = false,
                categoriesCheck = false,
                tagsCheck = false,
                locationCheck = false;

            if (item.title) {
                titleCheck = item.title.toLowerCase().indexOf(queryFormatted) > -1;
            }

            if (item.lede) {
                ledeCheck = item.lede.toLowerCase().indexOf(queryFormatted) > -1;
            }
            if (item.date || item.date_friendly) {
                if (queryFormatted.substring(0, 5) == "date:") {
                    dateCheck = item.date.toLowerCase().indexOf(queryFormatted.slice(5)) > -1;
                    if (!dateCheck) {
                        dateCheck = item.date_friendly.toLowerCase().indexOf(queryFormatted.slice(5)) > -1;
                    }
                } else {
                    dateCheck = item.date.toLowerCase().indexOf(queryFormatted) > -1;
                    if (!dateCheck) {
                        dateCheck = item.date_friendly.toLowerCase().indexOf(queryFormatted) > -1;
                    }
                }
            }
            if (item.content) {
                contentCheck = item.content.toLowerCase().indexOf(queryFormatted) > -1;
            }
            if (item.categories) {
                categoriesCheck = item.categories.toLowerCase().indexOf(queryFormatted) > -1;
            }
            if (item.tags) {
                if (queryFormatted.substring(0, 4) == "tag:") {
                    tagsCheck = item.tags.toLowerCase().indexOf(queryFormatted.slice(4)) > -1;
                } else if (queryFormatted.substring(0, 5) == "tags:") {
                    tagsCheck = item.tags.toLowerCase().indexOf(queryFormatted.slice(5)) > -1;
                } else {
                    tagsCheck = item.tags.toLowerCase().indexOf(queryFormatted) > -1;
                }
            }
            if (item.location) {
                locationCheck = item.location.toLowerCase().indexOf(queryFormatted) > -1;
            }

            // if performing a date check
            if (queryFormatted.substring(0, 5) == "date:" && dateCheck) {
                resultsCount++;
                results += populateResultContent(SEARCH_POST_TEMPLATE, item);
            }
            // if performing a tags check
            else if ((queryFormatted.substring(0, 4) == "tag:" || queryFormatted.substring(0, 5) == "tags:") && tagsCheck) {
                resultsCount++;
                results += populateResultContent(SEARCH_POST_TEMPLATE, item);
            }
            // or item type is a page, check if search term is in title,
            // content, or lede, categories, tags, or talk location
            else if (item.type == "page" && (titleCheck || ledeCheck || contentCheck)) {
                resultsCount++;
                results += populateResultContent(SEARCH_PAGE_TEMPLATE, item);
            }
            // check if search term is in title, lede, content, categories,
            // tags, or talk location
            else if (titleCheck || ledeCheck || dateCheck || contentCheck || categoriesCheck || tagsCheck || locationCheck) {
                resultsCount++;
                results += populateResultContent(SEARCH_POST_TEMPLATE, item);
            }
        }

        populateResultsString(resultsCount);
        showSearchResults(results);
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
        resultsList.setAttribute("aria-expanded", "true");
    }

    ////
    /// Add results content to item templates
    /// @param {String} html
    /// @param {object} item
    /// @return {String} Populated HTML
    ////
    function populateResultContent(html, item) {
        // URL
        html = helpers.injectContent(html, "URL", item.url);

        // ICON
        if (item.categories == "article") {
            html = helpers.injectContent(html, "ICON", "article");
        } else if (item.categories == "link") {
            html = helpers.injectContent(html, "ICON", "link");
        } else if (item.categories == "note") {
            html = helpers.injectContent(html, "ICON", "feather");
        } else if (item.categories == "pen") {
            html = helpers.injectContent(html, "ICON", "codepen");
        } else if (item.categories == "talk") {
            html = helpers.injectContent(html, "ICON", "bullhorn");
        }

        // TITLE
        if (item.categories == "note") {
            html = helpers.injectContent(html, "TITLE", item.date_friendly);
        } else {
            html = helpers.injectContent(html, "TITLE", item.title);
        }

        // LEDE
        if (item.lede) {
            let ledeFormatted = item.lede
                .replace(/(<([^>]+)>)/gi, "")
                .split(/(?=\s)/gi)
                .slice(0, 20)
                .join("");
            html = helpers.injectContent(html, "LEDE", ledeFormatted);
        } else if (item.categories == "link") {
            html = helpers.injectContent(html, "LEDE", "Shared Link");
        } else if (item.categories == "note") {
            html = helpers.injectContent(html, "LEDE", "Shared Note");
        } else if (item.categories == "pen") {
            html = helpers.injectContent(html, "LEDE", "Featured Pen");
        } else if (item.categories == "talk" && item.location) {
            html = helpers.injectContent(html, "LEDE", `Talk – Given at ${item.location}.`);
        } else if (item.categories == "talk") {
            html = helpers.injectContent(html, "LEDE", "Talk");
        }

        // DATE
        if (item.type == "post") {
            html = helpers.injectContent(html, "DATE_FRIENDLY", item.date_friendly);

            if (item.categories == "note") {
                html = helpers.injectContent(html, "DATE_CLASS", "  hidden");
            } else {
                html = helpers.injectContent(html, "DATE_CLASS", "");
            }

            html = helpers.injectContent(html, "DATE", item.date);
        }

        return html;
    }

    ////
    /// Populates results string
    /// @param {String} count
    /// @return void
    ////
    function populateResultsString(count) {
        let resultSuffix = count == 1 ? "" : "s";
        let searchMeta = `<strong>${count}</strong> result${resultSuffix} found for <q>${query}</q>`;

        resultsMeta.innerHTML = searchMeta;
    }
})();
