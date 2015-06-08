/**
 * Comment toggling for article pages
 */
var commentsSection = document.getElementById('comments');
var commentsButton  = document.getElementById('show-comments-button');
var commentsHash    = ['#comment', '#disqus_thread'];
commentsHash.forEach( function(hash) {
    if( window.location.hash.indexOf(hash) == 0 ) {
        showComments();
    }
});
window.onhashchange = function() {
    commentsHash.forEach( function(hash) {
        if( location.hash.indexOf(hash) == 0 ) {
            showComments();
        }
    });
}
commentsButton.disabled = false;
commentsButton.addEventListener('click', function() {
    showComments();
});
function showComments() {
    window.scrollTo(0, commentsSection.offsetTop);
    // Only if the button still exists should we load Disqus and remove the button
    if( document.getElementById('show-comments-button') ) {
        commentsButton.parentNode.removeChild(commentsButton);
        (function() {
            var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
            dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
            (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
        })();
        window.scrollTo(0, commentsSection.offsetTop);
    }
}