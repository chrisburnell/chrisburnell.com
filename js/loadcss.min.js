/*!
loadCSS: load a CSS file asynchronously.
[c]2015 @scottjehl, Filament Group, Inc.
Licensed MIT
*/
!function(w){"use strict";w.loadCSS=function(href,before,media){var ref,doc=w.document,ss=doc.createElement("link");if(before)ref=before;else{var refs=(doc.body||doc.getElementsByTagName("head")[0]).childNodes;ref=refs[refs.length-1]}var sheets=doc.styleSheets;ss.rel="stylesheet",ss.href=href,ss.media="only x",ref.parentNode.insertBefore(ss,before?ref:ref.nextSibling);var onloadcssdefined=function(cb){for(var resolvedHref=ss.href,i=sheets.length;i--;)if(sheets[i].href===resolvedHref)return cb();setTimeout(function(){onloadcssdefined(cb)})};return ss.onloadcssdefined=onloadcssdefined,onloadcssdefined(function(){ss.media=media||"all"}),ss}}(this);