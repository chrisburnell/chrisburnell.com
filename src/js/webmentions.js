/*!
 * Conditional webmentions for article pages
 * @author Chris Burnell <me@chrisburnell.com>
 */

(() => {
    "use strict";

    const CANONICAL_URL = document.querySelector('link[rel="canonical"]') ? document.querySelector('link[rel="canonical"]').getAttribute("href") : null;
    const WEBMENTIONS_SECTION = document.querySelector(".js-webmentions");
    const WEBMENTIONS_BUTTON = document.querySelector(".js-show-webmentions");
    const WEBMENTIONS_INPUT = document.querySelector(".js-webmentions-input");
    const WEBMENTIONS_SUBMIT = document.querySelector(".js-webmentions-submit");
    const WEBMENTIONS_THREAD = document.querySelector(".js-webmentions-thread");
    // `#webmention` will match both `#webmention` and `#webmentions`
    const WEBMENTIONS_HASH = ["#webmention", "#mention"];
    const WEBMENTIONS_TEMPLATE = document.querySelector(".webmentions-template") ? document.querySelector(".webmentions-template").innerHTML.trim() : "";
    let webmentionsLoaded = false;
    let webmentionsCount = 0;

    if (WEBMENTIONS_SECTION !== null) {
        let observer = new IntersectionObserver(checkVisibility);
        // initiate WebMentions if hash present on load
        window.addEventListener("load", helpers.actionFromHash(WEBMENTIONS_HASH, showWebmentions));
        // initiate WebMentions if hash present on hash change
        window.addEventListener("hashchange", helpers.actionFromHash(WEBMENTIONS_HASH, showWebmentions));
        // enable the WebMentions button, input, and submit
        helpers.enableElement(WEBMENTIONS_BUTTON, showWebmentions);
        WEBMENTIONS_BUTTON.addEventListener("mouseover", () => {
            if (webmentionsLoaded === false) {
                loadWebmentions();
            }
        });
        helpers.enableElement(WEBMENTIONS_INPUT);
        helpers.enableElement(WEBMENTIONS_SUBMIT);
        // observe the WebMentions button to load in data
        observer.observe(WEBMENTIONS_BUTTON);
    }

    function loadWebmentions() {
        let request = new XMLHttpRequest();
        request.open("GET", `https://webmention.io/api/mentions?jsonp&target=${CANONICAL_URL}`, true);
        request.onload = function() {
            if (webmentionsLoaded === false && request.status >= 200 && request.status < 400 && request.responseText.length > 0) {
                // Success!
                webmentionsLoaded = true;
                // prevent hovering the button from continuing to fire
                WEBMENTIONS_BUTTON.removeEventListener("mouseover", () => {});
                let data = JSON.parse(request.responseText);
                for (let link of data.links.reverse()) {
                    if (link.verified === true && link.private === false) {
                        webmentionsCount++;
                        WEBMENTIONS_THREAD.innerHTML += populateWebmentionContent(WEBMENTIONS_TEMPLATE, link);
                    }
                }
                if (WEBMENTIONS_BUTTON !== null && webmentionsCount > 0) {
                    WEBMENTIONS_BUTTON.querySelector(".js-webmention-comment-count").innerHTML = `${webmentionsCount} mention${webmentionsCount > 1 ? "s" : ""}`;
                }
            } else {
                console.log(`WebMention request status error: ${request.status}`);
            }
        };
        request.onerror = function() {
            console.log("WebMention request error");
        };
        request.send();
    }

    function showWebmentions() {
        // check if already loaded the webmentions, if not, load it (again)
        if (webmentionsLoaded === false) {
            loadWebmentions();
        }
        // only if the button still exists should we hide the button
        if (WEBMENTIONS_BUTTON !== null && WEBMENTIONS_BUTTON.getAttribute("aria-hidden") === "false") {
            WEBMENTIONS_BUTTON.setAttribute("aria-pressed", "true");
            WEBMENTIONS_BUTTON.setAttribute("aria-expanded", "true");
            WEBMENTIONS_BUTTON.setAttribute("aria-hidden", "true");
            WEBMENTIONS_BUTTON.removeEventListener("click", () => {});
        }
        WEBMENTIONS_SECTION.setAttribute("aria-hidden", "false");
    }

    function checkVisibility(entries, observer) {
        entries.forEach(entry => {
            if (entry.intersectionRatio > 0) {
                showWebmentions();
                observer.disconnect();
            }
        });
    }

    ////
    /// Add results content to WebMention template
    /// @param {String} html
    /// @param {object} item
    /// @return {String} Populated HTML
    ////
    function populateWebmentionContent(html, item) {
        // Store some variables we'll check often
        let id = item.id;
        let type = item.activity.type;
        let content = item.data.content;
        let url = item.data.url;
        let urlAuthor = item.data.author.url.replace(/\/$/, "");
        let author = item.data.author.name ? item.data.author.name : item.data.name;
        let date = item.data.published ? item.data.published : item.verified_date;

        // ID
        html = helpers.injectContent(html, /{{\s*id\s*}}/, id);

        // TYPE
        html = helpers.injectContent(html, /{{\s*type\s*}}/, type);
        html = helpers.injectContent(html, /{{\s*typeLink\s*}}/, `<a href="${url}" class="webmentions__item__activity" rel="external">{{ typePrefix }}</a>`);
        html = helpers.injectContent(html, /{{\s*typePrefix\s*}}/, type === "like" ? "Liked" : type === "reply" ? "Response" : type === "repost" ? "Reposted" : "Posted");

        // CONTENT / URL
        html = helpers.injectContent(html, /{{\s*content\s*}}/, type === "like" || type === "repost" ? "" : type === "reply" && content ? `<div><q>${content}</q></div>` : `<div><a href="${url}" rel="external">${url.split("//")[1]}</a></div>`);

        // AUTHOR
        html = helpers.injectContent(html, /{{\s*author\s*}}/, author && urlAuthor ? `by <a href="${urlAuthor}" class="webmentions__item__name" rel="external">${author}</a>` : author ? `by <span class="webmentions__item__name">${author}</span>` : "");

        // DATE
        html = helpers.injectContent(html, /{{\s*date\s*}}/, `on <time class="webmentions__item__time" datetime="${date}">${helpers.formatDate(new Date(date))} <small>@</small> ${helpers.formatTime(new Date(date))}</time>`);

        return html;
    }
})();
