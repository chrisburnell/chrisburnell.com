/*!
 * Conditional webmentions for article pages
 * @author Chris Burnell <me@chrisburnell.com>
 */

(() => {
    "use strict";

    const CANONICAL_URL = document.querySelector('link[rel="canonical"]')
        ? document
              .querySelector('link[rel="canonical"]')
              .getAttribute("href")
        : null;
    const WEBMENTIONS_SECTION = document.querySelector(".js-webmentions");
    const WEBMENTIONS_BUTTON = document.querySelector(".js-show-webmentions");
    const WEBMENTIONS_INPUT = document.querySelector(".js-webmentions-input");
    const WEBMENTIONS_SUBMIT = document.querySelector(".js-webmentions-submit");
    const WEBMENTIONS_RESPONSES = document.querySelector(".js-webmentions-responses");
    // `#webmention` will match both `#webmention` and `#webmentions`
    // `#respon` will match both `#respond` and `#response`
    const WEBMENTIONS_HASH = ["#webmention", "#mention", "#respon"];
    let webmentionsLoaded = false;
    let responses = {
        like: [],
        repost: [],
        reply: []
    };

    let loadWebmentions = () => {
        fetch(`https://webmention.io/api/mentions?jsonp&target=${CANONICAL_URL}`)
            .then(helpers.getFetchResponse)
            .then(response => response.json())
            .then(data => {
                if (webmentionsLoaded === false) {
                    // Success!
                    webmentionsLoaded = true;
                    populateResponses(data);
                    let responsesCount = Object.keys(responses)
                        .map(type => {
                            return responses[type].length;
                        })
                        .reduce((sum, count) => sum + count, 0);
                    if (WEBMENTIONS_BUTTON !== null && responsesCount > 0) {
                        for (let webmentionCount of document.querySelectorAll(".js-webmention-count")) {
                            webmentionCount.innerHTML = `${responsesCount} Response${responsesCount > 1 ? "s" : ""}`;
                        }
                        WEBMENTIONS_RESPONSES.removeAttribute("hidden");
                        // prevent hovering the button from continuing to fire
                        WEBMENTIONS_BUTTON.removeEventListener("mouseover", () => {});
                    }
                }
            })
            .catch(error => {
                // Fail!
                console.error(`Webmention request status error: ${error.status} ${error.statusText}`);
            });
    };

    let showWebmentions = () => {
        // check if already loaded the webmentions, if not, load it (again)
        if (webmentionsLoaded === false) {
            loadWebmentions();
        }
        // only if the button still exists should we hide the button
        if (WEBMENTIONS_BUTTON !== null && WEBMENTIONS_BUTTON.getAttribute("hidden") !== "true") {
            WEBMENTIONS_BUTTON.setAttribute("aria-pressed", "true");
            WEBMENTIONS_BUTTON.setAttribute("aria-expanded", "true");
            WEBMENTIONS_BUTTON.parentNode.setAttribute("hidden", true);
            WEBMENTIONS_BUTTON.removeEventListener("click", () => {});
        }
        WEBMENTIONS_SECTION.removeAttribute("hidden");
    };

    let checkVisibility = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.intersectionRatio > 0) {
                showWebmentions();
                observer.disconnect();
            }
        });
    };

    ////
    /// Add responses content to Webmention template
    /// @return {String} Populated HTML
    ////
    let populateResponses = data => {
        const WEBMENTIONS_TEMPLATE_DEFAULT = document.querySelector(".webmentions-template-default") ? decodeURI(document.querySelector(".webmentions-template-default").innerHTML.trim()) : "";
        const WEBMENTIONS_TEMPLATE_REPLY = document.querySelector(".webmentions-template-reply") ? decodeURI(document.querySelector(".webmentions-template-reply").innerHTML.trim()) : "";

        let webmentionsLikeLabel = document.querySelector(".js-webmentions-likes-label");
        let webmentionsLikeContent = document.querySelector(".js-webmentions-likes-content");
        let webmentionsRepostLabel = document.querySelector(".js-webmentions-reposts-label");
        let webmentionsRepostContent = document.querySelector(".js-webmentions-reposts-content");
        let webmentionsReplyLabel = document.querySelector(".js-webmentions-replies-label");
        let webmentionsReplyContent = document.querySelector(".js-webmentions-replies-content");

        for (let link of data.links.reverse()) {
            link.activity.type = link.activity.type === "link" ? "reply" : link.activity.type;
            if (link.verified === true && link.private === false && (link.activity.type === "like" || link.activity.type === "repost" || link.activity.type === "reply")) {
                responses[link.activity.type].push(link);
            }
        }

        if (!!responses.like.length) {
            webmentionsLikeLabel.innerHTML = `${responses.like.length} ${webmentionsLikeLabel.innerHTML}`;
            for (let response of responses.like) {
                webmentionsLikeContent.innerHTML += processResponses(WEBMENTIONS_TEMPLATE_DEFAULT, response);
            }
            webmentionsLikeLabel.removeAttribute("hidden");
            webmentionsLikeContent.removeAttribute("hidden");
        }

        if (!!responses.repost.length) {
            webmentionsRepostLabel.innerHTML = `${responses.repost.length} ${webmentionsRepostLabel.innerHTML}`;
            for (let response of responses.repost) {
                webmentionsRepostContent.innerHTML += processResponses(WEBMENTIONS_TEMPLATE_DEFAULT, response);
            }
            webmentionsRepostLabel.removeAttribute("hidden");
            webmentionsRepostContent.removeAttribute("hidden");
        }

        if (!!responses.reply.length) {
            webmentionsReplyLabel.innerHTML = `${responses.reply.length} ${webmentionsReplyLabel.innerHTML}`;
            for (let response of responses.reply) {
                webmentionsReplyContent.innerHTML += processResponses(WEBMENTIONS_TEMPLATE_REPLY, response);
            }
            webmentionsReplyLabel.removeAttribute("hidden");
            webmentionsReplyContent.parentNode.removeAttribute("hidden");
        }
    };

    ////
    /// Process responses
    /// @return {String} Process HTML
    ////
    let processResponses = (html, response) => {
        // Store some variables we'll check often
        let id = response.id;
        let type = response.activity.type;
        let url = response.data.url;
        let content = response.data.content;
        let date = response.data.published ? response.data.published : response.verified_date;
        let author = response.data.author.name ? response.data.author.name : response.data.name;
        let authorUrl = response.data.author.url;
        let authorImgUrl = response.data.author.photo ? response.data.author.photo : "/images/default_profile.png";
        if ('connection' in navigator) {
            if (navigator.connection.saveData) {
                authorImgUrl = "";
            }
        }

        // ID
        html = helpers.injectContent(html, /{{\s*id\s*}}/, id);

        // TYPE
        html = helpers.injectContent(html, /{{\s*type\s*}}/, type);

        // CONTENT
        html = helpers.injectContent(html, /{{\s*content\s*}}/, `<q>${content}</q>`);

        // AUTHOR
        html = helpers.injectContent(html, /{{\s*author\s*}}/, author);

        // URL
        html = helpers.injectContent(html, /{{\s*url\s*}}/, url);

        // AUTHOR URL
        html = helpers.injectContent(html, /{{\s*author_url\s*}}/, authorUrl);

        // AUTHOR IMAGE URL
        html = helpers.injectContent(html, /{{\s*author_image_url\s*}}/, authorImgUrl);

        // DATE
        html = helpers.injectContent(html, /{{\s*date\s*}}/, `<time class="webmentions__response__time" datetime="${date}"><small>on ${helpers.formatDate(new Date(date))}</small></time>`);

        return html;
    };

    if (WEBMENTIONS_SECTION !== null) {
        let observer = new IntersectionObserver(checkVisibility);
        // initiate Webmentions if hash present on load
        window.addEventListener("load", helpers.actionFromHash(WEBMENTIONS_HASH, showWebmentions));
        // initiate Webmentions if hash present on hash change
        window.addEventListener("hashchange", helpers.actionFromHash(WEBMENTIONS_HASH, showWebmentions));
        // enable the Webmentions button, input, and submit
        helpers.enableElement(WEBMENTIONS_BUTTON, showWebmentions);
        WEBMENTIONS_BUTTON.addEventListener("mouseover", () => {
            if (webmentionsLoaded === false) {
                loadWebmentions();
            }
        });
        helpers.enableElement(WEBMENTIONS_INPUT);
        helpers.enableElement(WEBMENTIONS_SUBMIT);
        // observe the Webmentions button to load in data
        observer.observe(WEBMENTIONS_BUTTON);
    }
})();
