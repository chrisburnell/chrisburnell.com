/*!
 * Code ARIA Toggling
 * @author Chris Burnell <me@chrisburnell.com>
 */


(() => {

    'use strict';


    const codeToggleLabels = document.querySelectorAll('.code-toggle-label');

    for (let codeToggleLabel of codeToggleLabels) {
        codeToggleLabel.addEventListener('click', event => {
            event.preventDefault();
            let codeToggleIDArray = event.target.getAttribute('id').split('--');
            toggleCode(codeToggleIDArray[1]);
        });
    }


    function toggleCode(codeToggleID) {
        let codeToggle       = document.querySelector(`#code-toggle--${codeToggleID}`);
        let codeToggleInput  = codeToggle.querySelector(`#code-toggle-input--${codeToggleID}`);
        let codeToggleLabel  = codeToggle.querySelector(`#code-toggle-label--${codeToggleID}`);
        let codeToggleButton = codeToggleLabel.querySelector(`#code-toggle-button--${codeToggleID}`);

        codeToggleInput.checked = true;
        codeToggle.setAttribute('aria-expanded', 'true');
        codeToggleLabel.setAttribute('aria-hidden', 'true');
        codeToggleLabel.removeEventListener('click', () => {});
        codeToggleButton.setAttribute('aria-pressed', 'true');

        window.location.hash = `#code-toggle--${codeToggleID}`;
    }

})();
