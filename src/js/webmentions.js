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
              .replace(/\/?$/, "")
        : null;
    let REDIRECT_FROM_URLS = [];
    const REDIRECT_FROM_LINKS = document.querySelectorAll('link[rel="redirect_from"]') ? document.querySelectorAll('link[rel="redirect_from"]') : [];
    for (let link of REDIRECT_FROM_LINKS) {
        REDIRECT_FROM_URLS.push(link.getAttribute("href").replace(/\/?$/, ""));
    }
    const WEBMENTIONS_SECTION = document.querySelector(".js-webmentions");
    const WEBMENTIONS_BUTTON = document.querySelector(".js-show-webmentions");
    const WEBMENTIONS_INPUT = document.querySelector(".js-webmentions-input");
    const WEBMENTIONS_SUBMIT = document.querySelector(".js-webmentions-submit");
    const WEBMENTIONS_RESPONSES = document.querySelector(".js-webmentions-responses");
    // `#webmention` will match both `#webmention` and `#webmentions`
    // `#respon` will match both `#respond`, `#response`, and `#responses`
    const WEBMENTIONS_HASH = ["#webmention", "#mention", "#respon"];
    const WEBMENTIONS_TEMPLATE_REACTION = `<li id="webmentions-{{ id }}" class="webmentions__response  h-cite  p-{{ type }}" data-type="{{ type }}">
    <a class="webmentions__response__avatar  p-author  h-card  u-url" href="{{ author_url }}" rel="external" title="{{ author }}">
        <img class="webmentions__response__image  u-photo" src="{{ author_image_url }}">
        <span class="webmentions__response__name  p-name">{{ author }}</span>
    </a>
    <a class="webmentions__response__type  u-url" href="{{ url }}" rel="external" title="{{ author }} {{ type_action }} this" tabindex="-1" data-reacji="{{ content }}"></a>
</li>`;
    const WEBMENTIONS_TEMPLATE_REPLY = `<li id="webmentions-{{ id }}" class="webmentions__response  h-cite  p-comment" data-type="{{ type }}">
    <a class="webmentions__response__avatar  p-author  h-card  u-url" href="{{ author_url }}" rel="external" title="{{ author }}">
        <img class="webmentions__response__image  u-photo" src="{{ author_image_url }}">
    </a>
    <div class="webmentions__response__content  e-content">{{ content }}</div>
    <div>
        <small>by</small>
        <a class="p-author  h-card  u-url" href="{{ author_url }}" rel="external">
            <span class="p-name">{{ author }}</span>
        </a>
        <small>on</small>
        <a class="u-url" href="{{ url }}" rel="external" title="Read externally">{{ date }}</a>
    </div>
</li>`;
    let responses = {
        reaction: [],
        reply: []
    };
    let webmentionsLoaded = false;

    let loadWebmentions = () => {
        if (webmentionsLoaded === false) {
            let fetchUrl = `https://webmention.io/api/mentions?jsonp&target[]=${CANONICAL_URL}&target[]=${CANONICAL_URL}/`;
            for (let link of REDIRECT_FROM_URLS) {
                fetchUrl += `&target[]=${link}`;
            }
            fetch(fetchUrl)
                .then(helpers.getFetchResponse)
                .then(response => response.json())
                .then(data => {
                    // Success!
                    webmentionsLoaded = true;
                    populateResponses(data);
                    let responsesCount = Object.keys(responses)
                        .map(type => responses[type].length)
                        .reduce((sum, count) => sum + count, 0);
                    if (WEBMENTIONS_BUTTON !== null && responsesCount > 0) {
                        for (let webmentionCount of document.querySelectorAll(".js-webmention-count")) {
                            webmentionCount.innerHTML = `${responsesCount} Response${responsesCount > 1 ? "s" : ""}`;
                        }
                        WEBMENTIONS_RESPONSES.removeAttribute("hidden");
                        // prevent hovering the button from continuing to fire
                        WEBMENTIONS_BUTTON.removeEventListener("mouseover", () => {});
                    }
                })
                .catch(error => {
                    // Fail!
                    console.error(`Webmention request status error: ${error}`);
                });
        }
    };

    let showWebmentions = () => {
        // check if already loaded the webmentions, if not, load it (again)
        if (webmentionsLoaded === false) {
            loadWebmentions();
        }
        // only if the button still exists should we hide the button
        if (WEBMENTIONS_BUTTON !== null) {
            WEBMENTIONS_BUTTON.setAttribute("aria-pressed", "true");
            WEBMENTIONS_BUTTON.setAttribute("aria-expanded", "true");
            WEBMENTIONS_BUTTON.setAttribute("hidden", true);
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
        let webmentionsReactionLabel = document.querySelector(".js-webmentions-reactions-label");
        let webmentionsReactionContent = document.querySelector(".js-webmentions-reactions-content");
        let webmentionsReplyLabel = document.querySelector(".js-webmentions-replies-label");
        let webmentionsReplyContent = document.querySelector(".js-webmentions-replies-content");

        for (let link of data.links.reverse()) {
            let type = "reaction";

            // REMOVE
            console.log(link.data.content.length);

            if (link.activity.type !== "like" && link.activity.type !== "repost" && link.data.content && link.data.content.length > 2) {
                type = "reply";
            }
            if (link.verified === true && link.private === false) {
                responses[type].push(link);
            }
        }

        if (!!responses.reaction.length) {
            webmentionsReactionLabel.innerHTML = `${responses.reaction.length} ${webmentionsReactionLabel.innerHTML}`;
            for (let response of responses.reaction) {
                webmentionsReactionContent.innerHTML += processResponses(WEBMENTIONS_TEMPLATE_REACTION, response);
            }
            webmentionsReactionContent.parentNode.removeAttribute("hidden");
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
        let typeAction = (type + "ed").replace("eed", "ed").replace("linked", "linked to");
        let url = response.data.url;
        let content = !response.data.content || type === "like" || type === "repost" ? "" : response.data.content;
        let date = response.data.published ? response.data.published : response.verified_date;
        let author = response.data.author && response.data.author.name ? response.data.author.name : response.data.name;
        let authorUrl = response.data.author && response.data.author.url ? response.data.author.url : response.data.url;
        let authorImgUrl = response.data.author && response.data.author.photo ? response.data.author.photo : "/images/default-profile.png";
        if (authorUrl.includes("twitter.com")) {
            authorImgUrl = "https://avatars.io/twitter/" + authorUrl.split("twitter.com/")[1].split("/status/")[0];
        }
        if ("connection" in navigator) {
            if (navigator.connection.saveData) {
                authorImgUrl = "/images/default-profile.png";
            }
        }

        // ID
        html = helpers.injectContent(html, /{{\s*id\s*}}/, id);

        // TYPE
        html = helpers.injectContent(html, /{{\s*type\s*}}/, type);

        // TYPE ACTION
        html = helpers.injectContent(html, /{{\s*type_action\s*}}/, typeAction);

        // CONTENT
        let textOnlyContent = document.createElement("div");
        textOnlyContent.innerHTML = content;
        html = helpers.injectContent(html, /{{\s*content\s*}}/, textOnlyContent.textContent || textOnlyContent.innerText || "");

        // AUTHOR
        html = helpers.injectContent(html, /{{\s*author\s*}}/, author);

        // URL
        html = helpers.injectContent(html, /{{\s*url\s*}}/, url);

        // AUTHOR URL
        html = helpers.injectContent(html, /{{\s*author_url\s*}}/, authorUrl);

        // AUTHOR IMAGE URL
        html = helpers.injectContent(html, /{{\s*author_image_url\s*}}/, authorImgUrl);

        // DATE
        html = helpers.injectContent(html, /{{\s*date\s*}}/, `<time class="webmentions__response__time" datetime="${date}">${helpers.formatDate(new Date(date))}</time>`);

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
        // check the connection, and initiate Webmentions if saveData is off
        if ("connection" in navigator) {
            if (!navigator.connection.saveData) {
                showWebmentions();
                observer.disconnect();
            }
        }
    }
})();
