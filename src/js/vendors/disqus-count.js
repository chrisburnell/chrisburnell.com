/*!
 * Show comment counts on home and articles archive page
 */


(function() {

    'use strict';

    var dsqc = document.createElement('script');
    dsqc.type = 'text/javascript';
    dsqc.id = 'dsq-count-scr';
    dsqc.async = true;
    dsqc.src = '//' + DISQUS_SHORTNAME + '.disqus.com/count.js';

    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsqc);

}());
