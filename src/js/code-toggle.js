/*!
 * Code ARIA Toggling
 * @author Chris Burnell <me@chrisburnell.com>
 */


(() => {

    'use strict';


    const codeToggleLabels = document.querySelectorAll('.code-toggle-label');

    for (let codeToggleLabel of codeToggleLabels) {
        codeToggleLabel.addEventListener('click', event => {
            toggleCode(event.target);
        });
    }

    function toggleCode(codeToggleLabel) {
        let codeToggle = codeToggleLabel.parentNode;
        let codeToggleButton = codeToggleLabel.querySelector('button');
        let codeToggleHash = `#${codeToggleLabel.querySelector('button').getAttribute('aria-controls')}`;

        codeToggle.setAttribute('aria-expanded', 'true');
        codeToggleLabel.setAttribute('aria-hidden', 'true');
        codeToggleLabel.removeEventListener('click', () => {});
        codeToggleButton.setAttribute('aria-pressed', 'true');

        window.location.hash = codeToggleHash;
    }

})();
