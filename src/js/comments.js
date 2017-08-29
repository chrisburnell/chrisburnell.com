/*!
 * Conditional comments for article pages
 * @author Chris Burnell <me@chrisburnell.com>
 */


(() => {

    'use strict';


    const DISQUS_SHORTNAME = 'chrisburnell';
    const COMMENTS_SECTION = document.querySelector('.js-comments');
    const COMMENTS_BUTTON = document.querySelector('.js-show-comments');
    // `#comment` will match both `#comment` and `#comments`
    const COMMENTS_HASH = ['#comment', '#disqus_thread'];

    // Enable the Comments button
    helpers.enableElement(COMMENTS_BUTTON, showComments);

    // initiate Comments if hash present on load
    window.addEventListener('load', helpers.actionFromHash(COMMENTS_HASH, showComments));
    // initiate Comments if hash present on hash change
    window.addEventListener('hashchange', helpers.actionFromHash(COMMENTS_HASH, showComments));

    // Load in Disqus comments and remove the comments button
    function showComments() {
        if (COMMENTS_SECTION !== null) {
            // only if the button still exists should we load and hide the button
            if (COMMENTS_BUTTON !== null && COMMENTS_BUTTON.getAttribute('aria-hidden') === 'false') {
                COMMENTS_BUTTON.setAttribute('aria-pressed', 'true');
                COMMENTS_BUTTON.setAttribute('aria-expanded', 'true');
                COMMENTS_BUTTON.setAttribute('aria-hidden', 'true');
                COMMENTS_BUTTON.removeEventListener('click', () => {});
                (() => {
                    const DISQUS_SCRIPT = document.createElement('script');
                    DISQUS_SCRIPT.type = 'text/javascript';
                    DISQUS_SCRIPT.async = true;
                    DISQUS_SCRIPT.src = `//${DISQUS_SHORTNAME}.disqus.com/embed.js`;
                    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(DISQUS_SCRIPT);
                })();
                COMMENTS_SECTION.setAttribute('aria-hidden', 'false');
                COMMENTS_SECTION.scrollIntoView();
            }
        }
    }

})();
