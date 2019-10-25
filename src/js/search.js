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
    const ALLOW_AS_YOU_TYPE = false;
    const JSON_FEED_URL = "/search.json";
    const author = document.querySelector("meta[name=author]").content;
    const rootUrl = document.querySelector("link[rel=self]").href.replace("feed.xml", "");
    const SEARCH_PAGE_TEMPLATE =
`<li role="listitem">
    <article class="h-entry" role="article">
        <a class="u-url" href="#">
            <h3 class="delta  title  p-name">{{ title }}</h3>
            <div class="lede  p-summary">{{ lede }}</div>
        </a>
        <a class="p-author  h-card" href="${rootUrl}" hidden aria-hidden="true" tabindex="-1">${author}</a>
    </article>
</li>`;
    const SEARCH_POST_TEMPLATE =
`<li role="listitem">
    <article class="h-entry" role="article">
        <a class="u-url" href="#">
            <h3 class="delta  title  p-name"{{ hidden }}>{{ title }}</h3>
            <div class="lede  p-summary">{{ lede }}</div>
            <time class="date" datetime="{{ date_full }}">{{ date_friendly }}</time>
        </a>
        <a class="p-author  h-card" href="${rootUrl}" hidden aria-hidden="true" tabindex="-1">${author}</a>
    </article>
</li>`;

    ////
    /// Initiate search functionality.
    /// Shows results based on querystring if present.
    /// Binds search function to form submission.
    ////
    let initSearch = () => {
        if (!searchContainer) {
            return;
        }

        // Get search results if query parameter is set in querystring
        if (helpers.getParameterByName("q") || helpers.getParameterByName("query")) {
            query = decodeURIComponent(helpers.getParameterByName("q") ? helpers.getParameterByName("q") : helpers.getParameterByName("query"));
            searchInput.value = query;
            execSearch(query);
        }

        query = searchInput.value;

        // Catch the form submission and initiate search lookup
        searchForm.addEventListener("submit", submitCallback);
        if (ALLOW_AS_YOU_TYPE) {
            let inputCheck;
            searchInput.addEventListener("focus", () => {
                inputCheck = setInterval(() => {
                    if (searchInput.value != query && searchInput.value.length >= 2 && searchInput.value.length <= 30) {
                        submitCallback(false);
                    }
                }, 50);
            });
            searchInput.addEventListener("blur", () => {
                window.clearInterval(inputCheck);
            });
        }
    };

    let submitCallback = (event = false) => {
        if (event) {
            event.preventDefault();
        }
        query = searchInput.value;

        if (query.length >= 2 && query.length <= 30) {
            execSearch(query);
        } else {
            resultsMeta.innerHTML = "Your search query must be 2–30 characters in length.";
        }
    };

    ////
    /// Executes search
    /// @param {String} query
    /// @return void
    ////
    let execSearch = query => {
        if (query !== "" || ALLOW_EMPTY) {
            getSearchResults();
        }
    };

    ////
    /// Get Search results from JSON
    /// @param {Function} callbackFunction
    /// @return void
    ////
    let getSearchResults = () => {
        let resultData, people, mastodonInstances;
        fetch(JSON_FEED_URL)
            .then(helpers.getFetchResponse)
            .then(response => response.json())
            .then(data => {
                // Success!
                resultData = data["results"];
                people = data["people"];
                mastodonInstances = data["mastodon-instances"];
                processData(resultData, people, mastodonInstances);
            })
            .catch(error => {
                // Fail!
                console.error(`Search results request status error: ${error}`);
            });
    };

    ////
    /// Process search result data
    /// @return void
    ////
    let processData = (resultData, people, mastodonInstances) => {
        // Sort the results by:
        //   1. Priority
        //   2. Occurrence
        //   3. Pages then Post Time
        let queryRegex = new RegExp(query, "gi");
        resultData.sort((a, b) => {
            let aText = (a.title ? a.title : "") + (a.lede ? a.lede : "") + (a.content ? a.content : "");
            let bText = (b.title ? b.title : "") + (b.lede ? b.lede : "") + (b.content ? b.content : "");
            return (bText.match(queryRegex) || []).length - (aText.match(queryRegex) || []).length;
        });
        resultData.sort((a, b) => {
            return b.priority - a.priority;
        });

        let resultsCount = 0,
            results = "";

        for (let item of resultData) {
            let queryFormatted = query.toLowerCase(),
                titleCheck = false,
                ledeCheck = false,
                contentCheck = false,
                dateCheck = false,
                categoryCheck = false,
                tagsCheck = false,
                checkinCheck = false;

            if (item.title) {
                titleCheck = item.title.toLowerCase().indexOf(queryFormatted) > -1;
            }

            if (item.lede) {
                ledeCheck = item.lede.toLowerCase().indexOf(queryFormatted) > -1;
                item.lede = helpers.truncate(item.lede, 20);
            }
            else if (item.category) {
                item.lede = item.category.charAt(0).toUpperCase() + item.category.slice(1);
            }

            if (item.codepen_featured) {
                item.lede = `Featured ${item.lede}`;
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
                item.content = helpers.truncate(item.content, 30);
            }
            if (item.category) {
                categoryCheck = item.category.toLowerCase().indexOf(queryFormatted) > -1;

                if (item.category == "beer") {
                    item.lede = `Beer by ${item.authors}.` + (item.checkin ? ` Drank at ${item.checkin}.` : ``) + (item.badges ? `<data class="badges" value="${item.badges}"><span class="emoji">🏅</span> Earned ${item.badges} badge${item.badges > 1 ? `s` : ``}.</data>` : ``) + (item.rating ? `<data class="rating" value="${item.rating}"> </data>` : ``);
                }
                else if (item.category == "book") {
                    item.lede = `Book by ${item.authors}.` + (item.rating ? `<div><data class="rating" value="${item.rating}"> </data></div>` : ``);
                }
                else if (item.category == "music") {
                    item.lede = `Album by ${item.authors}.` + (item.rating ? `<div><data class="rating" value="${item.rating}"> </data></div>` : ``);
                }
                else if (item.category == "talk") {
                    item.lede = "Talk";
                    if (item.checkin) {
                        item.lede += ` – Given at ${item.checkin}`;
                    }
                }
            }
            if (item.banner || item.cover || item.has_image) {
                item.lede = `<span class="emoji">🖼️</span> ${item.lede}`;
            }
            if (item.rsvp) {
                item.lede = `<span class="emoji">📅</span> ${item.lede}`;
            }
            if (item.emoji) {
                item.lede = `<span class="emoji">${item.emoji}</span> ${item.lede}`;
            }
            if (item.in_reply_to) {
                let reply = null;
                let mastodonInstance = null;
                let mastodonUsername = null;
                let twitterUsername = null;
                let replyTarget = null;
                for (let result of resultData) {
                    if (item.in_reply_to.includes(result.url) && !item.titlefree) {
                        replyTarget = item.title;
                        break;
                    }
                }
                for (let target of people) {
                    if ("mastodon" in target) {
                        for (let target_mastodon of target.mastodon) {
                            let targetInstance = target_mastodon.split('@')[1];
                            let targetUsername = target_mastodon.split('@')[0];
                            if (item.in_reply_to.includes(targetInstance) && item.in_reply_to.includes(targetUsername)) {
                                replyTarget = target.name;
                                break;
                            }
                        }
                    }
                }
                if (!replyTarget) {
                    for (let instance of mastodonInstances) {
                        if (item.in_reply_to.includes(instance)) {
                            mastodonInstance = instance;
                            break;
                        }
                    }
                    if (mastodonInstance) {
                        if (item.in_reply_to.includes("/@")) {
                            mastodonUsername = item.in_reply_to.split("/@")[1].split("/")[0];
                        }
                        else if (item.in_reply_to.includes("/users/")) {
                            mastodonUsername = item.in_reply_to.split("/users/")[1].split("/")[0];
                        }
                    }
                    else if (item.in_reply_to.includes("twitter.com")) {
                        twitterUsername = item.in_reply_to.split("/status/")[0].split("twitter.com/")[1];
                        for (let target of people) {
                            if ("twitter" in target) {
                                for (let target_twitter of target.twitter) {
                                    if (target_twitter === twitterUsername) {
                                        replyTarget = target.name;
                                        break;
                                    }
                                }
                            }
                        }
                    }
                    else {
                        for (let target of people) {
                            if ("link" in target) {
                                for (let target_link of target.link) {
                                    if (item.in_reply_to.includes(target_link)) {
                                        replyTarget = target.name;
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
                if (replyTarget) {
                    reply = replyTarget;
                }
                else if (mastodonInstance) {
                    if (mastodonUsername) {
                        reply = `@${mastodonUsername}@${mastodonInstance}`;
                    }
                    else {
                        reply = "a Toot";
                    }
                }
                else if (item.in_reply_to.includes("twitter.com")) {
                    if (twitterUsername) {
                        reply = `@${twitterUsername}`;
                    }
                    else {
                        reply = "a Tweet";
                    }
                }
                else {
                    reply = item.in_reply_to;
                }
                item.lede = `<span class="emoji">↩️</span> In reply to: <span class="h-cite  p-in-reply-to">${reply}</span><br>${item.lede}`;
            }
            if (item.tags) {
                if (queryFormatted.substring(0, 4) == "tag:") {
                    tagsCheck = item.tags.toLowerCase().indexOf(queryFormatted.slice(4)) > -1;
                }
                else if (queryFormatted.substring(0, 5) == "tags:") {
                    tagsCheck = item.tags.toLowerCase().indexOf(queryFormatted.slice(5)) > -1;
                }
                else {
                    tagsCheck = item.tags.toLowerCase().indexOf(queryFormatted) > -1;
                }
            }
            if (item.checkin) {
                checkinCheck = item.checkin.toLowerCase().indexOf(queryFormatted) > -1;
            }

            // if performing a date check
            if (queryFormatted.substring(0, 5) == "date:" && dateCheck) {
                resultsCount++;
                results += populateResultContent(SEARCH_POST_TEMPLATE, item, query);
            }
            // if performing a tags check
            else if ((queryFormatted.substring(0, 4) == "tag:" || queryFormatted.substring(0, 5) == "tags:") && tagsCheck) {
                resultsCount++;
                results += populateResultContent(SEARCH_POST_TEMPLATE, item, query);
            }
            // or item type is a page, check if search term is in title,
            // content, or lede, category, tags, or talk checkin
            else if (item.type == "page" && (titleCheck || ledeCheck || contentCheck)) {
                resultsCount++;
                results += populateResultContent(SEARCH_PAGE_TEMPLATE, item, query);
            }
            // check if search term is in title, lede, content, category,
            // tags, or talk checkin
            else if (titleCheck || ledeCheck || dateCheck || contentCheck || categoryCheck || tagsCheck || checkinCheck) {
                resultsCount++;
                results += populateResultContent(SEARCH_POST_TEMPLATE, item, query);
            }
        }

        populateResultsString(resultsCount);
        showSearchResults(results);
    };

    ////
    /// Add search results to placeholder
    /// @param {String} results
    /// @return void
    ////
    let showSearchResults = results => {
        // Add results HTML to placeholder
        resultsList.innerHTML = results;
        // And mark the resultsList as `aria-expanded="true"`
        resultsList.setAttribute("aria-expanded", "true");
    };

    ////
    /// Add results content to item templates
    /// @param {String} html
    /// @param {object} item
    /// @return {String} Populated HTML
    ////
    let populateResultContent = (html, item, query) => {
        let queryHighlightRegex = new RegExp(query, "gi");

        // URL
        html = helpers.injectContent(html, "#", item.url);

        // TITLE
        if (item.category == "note") {
            html = helpers.injectContent(html, /{{\s*title\s*}}/, item.date_friendly.replace(queryHighlightRegex, `<mark>$&</mark>`));
        } else {
            html = helpers.injectContent(html, /{{\s*title\s*}}/, item.title.replace(queryHighlightRegex, `<mark>$&</mark>`));
        }

        // LEDE
        if (item.lede) {
            let ledeFormatted = helpers.decodeHTML(item.lede).replace(queryHighlightRegex, `<mark>$&</mark>`);

            html = helpers.injectContent(html, /{{\s*lede\s*}}/, ledeFormatted);
        }

        // DATE
        if (item.type == "post") {
            html = helpers.injectContent(html, /{{\s*date_friendly\s*}}/, item.date_friendly);

            if (item.category == "note") {
                html = helpers.injectContent(html, /{{\s*hidden\s*}}/, " hidden");
            } else {
                html = helpers.injectContent(html, /{{\s*hidden\s*}}/, "");
            }

            html = helpers.injectContent(html, /{{\s*date_full\s*}}/, item.date);
        }

        return html;
    };

    ////
    /// Populates results string
    /// @param {String} count
    /// @return void
    ////
    let populateResultsString = count => {
        let resultSuffix = count == 1 ? "" : "s";
        let searchMeta = `<strong>${count}</strong> result${resultSuffix} found for <q>${query}</q>`;

        resultsMeta.innerHTML = searchMeta;
    };

    // enable Search
    if (searchInput !== null && searchSubmit !== null) {
        searchInput.disabled = false;
        searchInput.setAttribute("aria-disabled", "false");
        searchSubmit.disabled = false;
        searchSubmit.setAttribute("aria-disabled", "false");
        initSearch();
    }
})();
