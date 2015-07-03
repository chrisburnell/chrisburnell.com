///
/// Conditional comments for article pages
///

var commentsSection = document.getElementById('comments');
var commentsButton  = document.getElementById('show-comments-button');
var commentsHash    = ['#comment', '#disqus_thread'];

commentsButton.disabled = false;

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

commentsButton.addEventListener('click', function() {
    showComments();
});

function showComments() {
    window.scrollTo(0, commentsSection.offsetTop);
    // Only if the button still exists should we load Disqus and remove the button
    if( document.getElementById('show-comments-button') ) {
        commentsButton.parentNode.removeChild(commentsButton);
        commentsButton.removeEventListener('click', function(){});
        (function() {
            var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
            dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
            (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
        })();
        window.scrollTo(0, commentsSection.offsetTop);
    }
}
