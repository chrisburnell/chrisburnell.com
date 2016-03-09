/*!
 * Conditional comments for article pages
 * @author Chris Burnell <@iamchrisburnell>
 */


(function() {

    'use strict';

    ////
    /// Initialisation
    ////

    var commentsSection = document.querySelector('.js-comments');
    var commentsButton  = document.querySelector('.js-show-comments');
    // `#comment` will match both `#comment` and `#comments`
    var commentsHash = ['#comment', '#disqus_thread'];

    ////
    /// Conditions to initiate `showComments()`
    ////

    // if Comments Button exists, enable it and attach Event Listener
    if (commentsButton !== null) {
        commentsButton.disabled = false;
        commentsButton.setAttribute('aria-disabled', 'false');
        commentsButton.addEventListener('click', showComments);
    }

    // run `updateFromHash()` on window load
    window.addEventListener('load', updateFromHash);
    // run `updateFromHash()` on window hashchange
    window.addEventListener('hashchange', updateFromHash);
    ////
    /// If URL contains a hash from `commentsHash`, initiate `showComments()`
    ////
    function updateFromHash() {
        commentsHash.forEach(function(hash) {
            if (window.location.hash.indexOf(hash) === 0) {
                showComments();
            }
        });
    }

    ////
    /// Load in Disqus comments and remove the comments button
    ////
    function showComments() {
        if (commentsSection !== null) {
            // only if the button still exists should we load Disqus and remove the button
            if (commentsButton !== null && commentsButton.getAttribute('aria-hidden') === 'false') {
                commentsButton.setAttribute('aria-pressed', 'true');
                commentsButton.setAttribute('aria-hidden', 'true');
                commentsButton.removeEventListener('click', function() {});
                (function() {
                    var dsq = document.createElement('script');
                    dsq.type = 'text/javascript';
                    dsq.async = true;
                    dsq.src = '//' + DISQUS_SHORTNAME + '.disqus.com/embed.js';
                    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
                })();
                // make sure we are indeed scrolled to the right part of the page
                commentsSection.setAttribute('aria-hidden', 'false');
                commentsSection.setAttribute('aria-expanded', 'true');
            }
        }
    }

}());
