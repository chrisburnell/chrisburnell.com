/*!
 * Add `http://` to URL input fields on blur or when Enter is pressed
 */

(function() {
    "use strict";

    let addDefaultScheme = target => {
        if (target.value.match(/^(?!https?:).+\..+/)) {
            target.value = `http://${target.value}`;
        }
    };

    let elements = document.querySelectorAll('input[type="url"]');

    for (let element of elements) {
        element.addEventListener("blur", event => {
            addDefaultScheme(event.target);
        });
        element.addEventListener("keydown", event => {
            if (event.keyCode == 13) {
                addDefaultScheme(event.target);
            }
        });
    }
})();
