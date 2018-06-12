/*!
 * Code ARIA Toggling
 * @author Chris Burnell <me@chrisburnell.com>
 */

(() => {
    "use strict";

    const CODE_TOGGLE_LABELS = document.querySelectorAll(".code-toggle-label");

    for (let codeToggleLabel of CODE_TOGGLE_LABELS) {
        codeToggleLabel.addEventListener("click", event => {
            event.preventDefault();
            let codeToggleIDArray = event.target.getAttribute("id").split("--");
            toggleCode(codeToggleIDArray[1]);
        });
    }

    function toggleCode(codeToggleID) {
        let codeToggle = document.querySelector(`#code-toggle--${codeToggleID}`);
        let codeToggleInput = document.querySelector(`#code-toggle-input--${codeToggleID}`);
        let codeToggleLabel = document.querySelector(`#code-toggle-label--${codeToggleID}`);
        let codeToggleButton = document.querySelector(`#code-toggle-button--${codeToggleID}`);

        codeToggleInput.checked = true;
        codeToggle.setAttribute("aria-expanded", "true");
        codeToggleLabel.setAttribute("aria-hidden", "true");
        codeToggleLabel.removeEventListener("click", () => {});
        codeToggleButton.setAttribute("aria-pressed", "true");

        window.location.hash = `#code-toggle--${codeToggleID}`;
    }
})();
