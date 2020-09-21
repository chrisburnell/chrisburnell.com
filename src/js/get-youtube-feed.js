(() => {
    "use strict";

    let form = document.querySelector(".get-youtube-feed");
    let input = form.querySelector('input');

    form.addEventListener('submit', event => {
        event.preventDefault();
        convertURL(input.value);
    });

    input.addEventListener('blur', event => {
        event.preventDefault();
        convertURL(input.value);
    });

    let convertURL = text => {
        if (text.includes("/channel/")) {
            let channel = text.split("/channel/")[1].replace(/\/$/, "");
            input.value = `https://www.youtube.com/feeds/videos.xml?channel_id=${channel}`;
            input.focus();
        }
    };
})();
