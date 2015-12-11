/*!
 * Conditional comments for article pages
 * @author Chris Burnell <@iamchrisburnell>
 */


(function () {

    'use strict';

    ////
    /// Initialisation
    ////

    var commentsSection = document.querySelector('#comments');
    var commentsButton  = document.querySelector('#show-comments-button');
    var commentsHash    = ['#comment', '#disqus_thread'];

    ////
    /// Conditions to initiate `showComments()`
    ////

    // if Comments Button exists, enable it and attach Event Listener
    if( commentsButton !== null ) {
        commentsButton.disabled = false;
        commentsButton.addEventListener('click', function() {
            showComments();
        });
    }

    // if URL contains a hash from `commentsHash`, initiate `showComments()`
    function updateFromHash() {
        commentsHash.forEach( function(hash) {
            if( window.location.hash.indexOf(hash) === 0 ) {
                showComments();
            }
        });
    }
    // run `updateFromHash()` onload
    window.onload = function() {
        updateFromHash();
    }
    // run `updateFromHash()` onhashchange
    window.onhashchange = function() {
        updateFromHash();
    }

    ////
    /// Load in Disqus comments and remove the comments button
    ////
    function showComments() {
        if( commentsSection !== null ) {
            window.scrollTo(0, commentsSection.offsetTop);
            // only if the button still exists should we load Disqus and remove the button
            if( commentsButton !== null ) {
                commentsButton.parentNode.removeChild(commentsButton);
                commentsButton.removeEventListener('click', function(){});
                (function() {
                    var dsq = document.createElement('script');
                        dsq.type = 'text/javascript';
                        dsq.async = true;
                        dsq.src = '//' + DISQUS_SHORTNAME + '.disqus.com/embed.js';
                    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
                })();
                // make sure we are indeed scrolled to the right part of the page
                window.scrollTo(0, commentsSection.offsetTop);
            }
        }
    }

}());
