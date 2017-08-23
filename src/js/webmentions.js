/*!
 * Conditional webmentions for article pages
 * @author Chris Burnell <me@chrisburnell.com>
 */


(() => {

    'use strict';


    const CANONICAL_URL = document.querySelector('link[rel="canonical"]').getAttribute('href').replace('http://localhost:4000', 'https://chrisburnell.com');
    const webmentionsSection = document.querySelector('.js-webmentions');
    const webmentionsButton = document.querySelector('.js-show-webmentions');
    const webmentionsInput = document.querySelector('.js-webmentions-input');
    const webmentionsThread = document.querySelector('.js-webmentions-thread');
    // `#webmention` will match both `#webmention` and `#webmentions`
    const webmentionsHash = ['#webmention'];
    const webmentionsTemplate = `<li id="webmention-{{id}}" class="webmentions__link" data-type="{{type}}">
                                     <a href="#webmention-{{id}}" rel="me">#</a>
                                     <time datetime="{{date}}">{{dateClean}}</time>
                                     <a href="{{url}}" rel="external">{{urlTrimmed}}</a>
                                 </li>`;

    // if WebMentions Button exists, enable it and attach Event Listener
    helpers.enableButton(webmentionsButton, showWebmentions);

    // run `actionFromHash()` on window load
    window.addEventListener('load', helpers.actionFromHash(webmentionsHash, showWebmentions));
    // run `actionFromHash()` on window hashchange
    window.addEventListener('hashchange', helpers.actionFromHash(webmentionsHash, showWebmentions));

    if (webmentionsSection !== null) {
        let request = new XMLHttpRequest();
        request.open('GET', `https://webmention.io/api/mentions?jsonp&target=${CANONICAL_URL}`, true);
        webmentionsRequest.onload = function() {
            if (request.status >= 200 && request.status < 400 && request.responseText.length > 0) {
                // Success!
                let data = JSON.parse(request.responseText);
                let count = 0;
                for (let link of data.links) {
                    if (link.verified === true && link.private === false) {
                        count++;
                        webmentionsThread.innerHTML += populateWebmentionContent(webmentionsTemplate, link);
                    }
                }
                if (webmentionsButton !== null && count > 0) {
                    webmentionsButton.querySelector('.js-webmention-comment-count').innerHTML = `${count} mention${count > 1 ? 's' : ''}`;
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
    function showWebmentions(numberOfWebmentions) {
        if (webmentionsSection !== null) {
            // only if the button still exists should we load and hide the button
            if (webmentionsButton !== null && webmentionsButton.getAttribute('aria-hidden') === 'false') {
                webmentionsButton.setAttribute('aria-pressed', 'true');
                webmentionsButton.setAttribute('aria-expanded', 'true');
                webmentionsButton.setAttribute('aria-hidden', 'true');
                webmentionsButton.removeEventListener('click', () => {});
                webmentionsSection.setAttribute('aria-hidden', 'false');
                webmentionsSection.scrollIntoView();
                if (numberOfWebmentions > 1) {
                    webmentionsThread.focus();
                } else {
                    webmentionsInput.focus();
                }
            }
        }
    }

    ////
    /// Add results content to item template
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
