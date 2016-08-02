/*!
 * Code ARIA Toggling
 * @author Chris Burnell <me@chrisburnell.com>
 */


(() => {

    'use strict';


    const codeToggleLabels = document.querySelectorAll('.code-toggle-label');
    for (var index of codeToggleLabels) {
        codeToggleLabels[index].addEventListener('click', event => {
            toggleCode(event);
        });
    }

    function toggleCode(node) {
        node.target.setAttribute('aria-hidden', 'true');
        node.target.removeEventListener('click', () => {});
        node.target.querySelector('button').setAttribute('aria-pressed', 'true');
        node.target.parentNode.setAttribute('aria-expanded', 'true');
        window.location.hash = `#${node.target.querySelector('button').getAttribute('aria-controls')}`;
    }

})();
