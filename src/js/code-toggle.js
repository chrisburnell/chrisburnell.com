/*!
 * Code ARIA Toggling
 * @author Chris Burnell <@iamchrisburnell>
 */


(function() {

    'use strict';

    ////
    /// Initialisation
    ////

    var codeToggleLabels = document.querySelectorAll('.code-toggle-label');
    for (var i = 0; i < codeToggleLabels.length; i++) {
        codeToggleLabels[i].addEventListener('click', function(event) {
            toggleCode(event);
        });
    }

    function toggleCode(node) {
        node.target.setAttribute('aria-hidden', 'true');
        node.target.removeEventListener('click', function() {});
        node.target.querySelector('button').setAttribute('aria-pressed', 'true');
        node.target.parentNode.setAttribute('aria-expanded', 'true');
        window.location.hash = '#' + node.target.querySelector('button').getAttribute('aria-controls');
    }

}());
