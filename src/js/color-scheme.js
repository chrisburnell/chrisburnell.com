(() => {
    "use strict";

    const STORAGE_KEY = "user-color-scheme";
    const COLOR_SCHEME_KEY = "--color-scheme";

    const schemeToggleButton = document.querySelector(".js-color-scheme-toggle")
    const schemeStatusText = document.querySelector(".js-color-scheme-status");

    const getCSSCustomProp = propKey => {
        let response = getComputedStyle(document.documentElement).getPropertyValue(propKey);

        if (response.length) {
            response = response.replace(/\"/g, "").trim();
        }

        return response;
    };

    const applySetting = passedSetting => {
        let currentSetting = passedSetting || localStorage.getItem(STORAGE_KEY);

        if (currentSetting) {
            document.documentElement.setAttribute("data-user-color-scheme", currentSetting);
            schemeStatusText.innerText = `Enable ${currentSetting === "dark" ? "Light" : "Dark"} Theme`;
        } else {
            schemeStatusText.innerText = `Enable ${getCSSCustomProp(COLOR_SCHEME_KEY)} Theme`;
        }
    };

    const toggleSetting = () => {
        let currentSetting = localStorage.getItem(STORAGE_KEY);

        switch (currentSetting) {
            case null:
                currentSetting = getCSSCustomProp(COLOR_SCHEME_KEY) === "dark" ? "default" : "dark";
                break;
            case "default":
                currentSetting = "dark";
                break;
            case "dark":
                currentSetting = "default";
                break;
        }

        localStorage.setItem(STORAGE_KEY, currentSetting);

        return currentSetting;
    };

    schemeToggleButton.addEventListener("click", event => {
        event.preventDefault();

        applySetting(toggleSetting());
    });

    applySetting();

})();
