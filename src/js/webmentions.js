/*!
 * Conditional webmentions for article pages
 * @author Chris Burnell <me@chrisburnell.com>
 */


(() => {

    'use strict';


    const CANONICAL_URL = document.querySelector('link[rel="canonical"]').getAttribute('href');
    const WEBMENTIONS_SECTION = document.querySelector('.js-webmentions');
    const WEBMENTIONS_BUTTON = document.querySelector('.js-show-webmentions');
    const WEBMENTIONS_INPUT = document.querySelector('.js-webmentions-input');
    const WEBMENTIONS_THREAD = document.querySelector('.js-webmentions-thread');
    // `#webmention` will match both `#webmention` and `#webmentions`
    const WEBMENTIONS_HASH = ['#webmention'];
    const WEBMENTIONS_TEMPLATE = `<li id="webmention-{{id}}" class="webmentions__link" data-type="{{type}}">
                                     <a href="#webmention-{{id}}" rel="me">#</a>
                                     <time datetime="{{date}}">{{dateClean}}</time>
                                     <a href="{{url}}" rel="external">{{urlTrimmed}}</a>
                                 </li>`;
    let webmentionsCount = 0;

    // Enable the WebMentions button
    helpers.enableButton(WEBMENTIONS_BUTTON, showWebmentions);

    // initiate WebMentions if hash present on load
    window.addEventListener('load', helpers.actionFromHash(WEBMENTIONS_HASH, showWebmentions));
    // initiate WebMentions if hash present on hash change
    window.addEventListener('hashchange', helpers.actionFromHash(WEBMENTIONS_HASH, showWebmentions));

    if (WEBMENTIONS_SECTION !== null) {
        let request = new XMLHttpRequest();
        request.open('GET', `https://webmention.io/api/mentions?jsonp&target=${CANONICAL_URL}`, true);
        request.onload = function() {
            if (request.status >= 200 && request.status < 400 && request.responseText.length > 0) {
                // Success!
                let data = JSON.parse(request.responseText);
                for (let link of data.links) {
                    if (link.verified === true && link.private === false) {
                        webmentionsCount++;
                        WEBMENTIONS_THREAD.innerHTML += populateWebmentionContent(WEBMENTIONS_TEMPLATE, link);
                    }
                }
                if (WEBMENTIONS_BUTTON !== null && webmentionsCount > 0) {
                    WEBMENTIONS_BUTTON.querySelector('.js-webmention-comment-count').innerHTML = `${webmentionsCount} mention${webmentionsCount > 1 ? 's' : ''}`;
                }
            } else {
                console.log(`WebMention request status error: ${request.status}`);
            }
        };
        request.onerror = function() {
            console.log('WebMention request error');
        };
        request.send();
    }

    // Load in WebMentions and remove the WebMentions button
    function showWebmentions() {
        if (WEBMENTIONS_SECTION !== null) {
            // only if the button still exists should we load and hide the button
            if (WEBMENTIONS_BUTTON !== null && WEBMENTIONS_BUTTON.getAttribute('aria-hidden') === 'false') {
                WEBMENTIONS_BUTTON.setAttribute('aria-pressed', 'true');
                WEBMENTIONS_BUTTON.setAttribute('aria-expanded', 'true');
                WEBMENTIONS_BUTTON.setAttribute('aria-hidden', 'true');
                WEBMENTIONS_BUTTON.removeEventListener('click', () => {});
                WEBMENTIONS_SECTION.setAttribute('aria-hidden', 'false');
                WEBMENTIONS_SECTION.scrollIntoView();
                if (webmentionsCount > 1) {
                    WEBMENTIONS_THREAD.focus();
                } else {
                    WEBMENTIONS_INPUT.focus();
                }
            }
        }
    }

    ////
    /// Add results content to WebMention template
    /// @param {String} html
    /// @param {object} item
    /// @return {String} Populated HTML
    ////
    function populateWebmentionContent(html, item) {
        // ID
        html = helpers.injectContent(html, item.id, '{{id}}');

        // TYPE
        html = helpers.injectContent(html, item.activity.type, '{{type}}');

        // DATE
        html = helpers.injectContent(html, item.verified_date, '{{date}}');

        // DATE, CLEAN
        html = helpers.injectContent(html, helpers.formatDate(new Date(item.verified_date)), '{{dateClean}}');

        // URL
        html = helpers.injectContent(html, item.data.url, '{{url}}');

        // URL, TRIMMED
        html = helpers.injectContent(html, item.data.url.split('//')[1], '{{urlTrimmed}}');

        return html;
    }

})();
