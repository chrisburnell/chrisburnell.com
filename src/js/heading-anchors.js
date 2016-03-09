/*!
 * Heading Anchor ARIA Toggling
 * @author Chris Burnell <@iamchrisburnell>
 */


(function() {

    'use strict';

    ////
    /// Initialisation
    ////

    var headingAnchors = document.querySelectorAll('.heading-anchor');

    ////
    /// Handle Events on Headings (and their children)
    ////

    for (var i = 0; i < headingAnchors.length; i++) {
        headingAnchors[i].parentNode.addEventListener('mouseenter', function(event) {
            showHeadingAnchor(event);
        });
        headingAnchors[i].parentNode.addEventListener('mouseleave', function(event) {
            hideHeadingAnchor(event);
        });
        headingAnchors[i].parentNode.addEventListener('focus', function(event) {
            showHeadingAnchor(event);
        });
        headingAnchors[i].parentNode.addEventListener('blur', function(event) {
            hideHeadingAnchor(event);
        });
    }

    ////
    /// Toggle `aria-hidden`
    ////

    function showHeadingAnchor(node) {
        node.target.querySelector('.heading-anchor').setAttribute('aria-hidden', 'false');
    }

    function hideHeadingAnchor(node) {
        node.target.querySelector('.heading-anchor').setAttribute('aria-hidden', 'true');
    }

}());
