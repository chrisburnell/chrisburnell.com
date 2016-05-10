/*!
 * Fragment Anchor ARIA Toggling
 * @author Chris Burnell <@iamchrisburnell>
 */


(function() {

    'use strict';

    ////
    /// Initialisation
    ////

    var fragmentAnchorClass = '.fragment-anchor';
    var fragmentAnchors = document.querySelectorAll(fragmentAnchorClass);

    ////
    /// Handle Events on Headings (and their children)
    ////

    for (var i = 0; i < fragmentAnchors.length; i++) {
        fragmentAnchors[i].parentNode.addEventListener('mouseenter', function(event) {
            toggleFragmentAnchor(event, 'false');
        });
        fragmentAnchors[i].parentNode.addEventListener('mouseleave', function(event) {
            toggleFragmentAnchor(event, 'true');
        });
        fragmentAnchors[i].parentNode.addEventListener('focus', function(event) {
            toggleFragmentAnchor(event, 'false');
        });
        fragmentAnchors[i].parentNode.addEventListener('blur', function(event) {
            toggleFragmentAnchor(event, 'true');
        });
    }

    ////
    /// Toggle `aria-hidden`
    ////

    function toggleFragmentAnchor(node, state) {
        node.target.querySelector(fragmentAnchorClass).setAttribute('aria-hidden', state);
    }

}());
