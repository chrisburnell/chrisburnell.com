/*!
 * Conditional comments for article pages
 * @author Chris Burnell <@iamchrisburnell>
 */


(function () {

    var commentsSection = document.querySelector('#comments');
    var commentsButton  = document.querySelector('#show-comments-button');
    var commentsHash    = ['#comment', '#disqus_thread'];

    if( commentsButton !== null ) {
        commentsButton.disabled = false;
        commentsButton.addEventListener('click', function() {
            showComments();
        });
    }

    function updateHash() {
        commentsHash.forEach( function(hash) {
            if( window.location.hash.indexOf(hash) == 0 ) {
                showComments();
            }
        });
    }

    updateHash();
    window.onhashchange = function() {
        updateHash();
    }

    function showComments() {
        if( commentsSection !== null ) {
            window.scrollTo(0, commentsSection.offsetTop);
            // Only if the button still exists should we load Disqus and remove the button
            if( commentsButton !== null ) {
                commentsButton.parentNode.removeChild(commentsButton);
                commentsButton.removeEventListener('click', function(){});
                (function() {
                    var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
                    dsq.src = '//' + DISQUS_SHORTNAME + '.disqus.com/embed.js';
                    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
                })();
                window.scrollTo(0, commentsSection.offsetTop);
            }
        }
    }

}());
