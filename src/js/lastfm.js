/*!
 * Load in the latest tune from LastFM
 * @author Chris Burnell <me@chrisburnell.com>
 */

(() => {
    "use strict";

    const LASTFM_URL = "https://api.chrisburnell.com/lastfm/chrisburnell";
    const LASTFM_ELEMENTS = document.querySelectorAll(".js-lastfm");
    const LASTFM_LABEL = document.querySelector(".js-lastfm-label");
    const LASTFM_COVER = document.querySelector(".js-lastfm-cover");
    const LASTFM_ARTIST = document.querySelector(".js-lastfm-artist");
    const LASTFM_TRACK = document.querySelector(".js-lastfm-track");
    const LASTFM_LINK = document.querySelector(".js-lastfm-link");
    const LASTFM_STATUS = document.querySelector(".js-lastfm-status");
    const LASTFM_DATETIME = document.querySelector(".js-lastfm-datetime");

    if (LASTFM_ELEMENTS.length > 0) {
        fetch(LASTFM_URL)
            .then(helpers.getFetchResponse)
            .then(response => response.json())
            .then(response => {
                const data = response[0];
                // Success!
                let datetime = new Date();
                let playingLabel = "Now Playing <small>🎶</small>";
                let status = 'playing';
                if (data.hasOwnProperty("date")) {
                    datetime.setSeconds(Number(data.date.uts));
                    playingLabel = "Last Played <small>🎵</small>";
                    status = 'finished';
                }
                datetime = datetime.toISOString();
                LASTFM_LABEL.innerHTML = `<time datetime="${datetime}">${playingLabel}</time>`;
                LASTFM_COVER.src = data["image"][1]["#text"] ? data["image"][1]["#text"] : "";
                if ('connection' in navigator) {
                    if (navigator.connection.saveData) {
                        LASTFM_COVER.src = "";
                    }
                }
                LASTFM_ARTIST.innerHTML = data["artist"]["#text"] ? data["artist"]["#text"] : "";
                LASTFM_TRACK.innerHTML = data["name"] ? data["name"] : "";
                LASTFM_LINK.href = data.url;
                LASTFM_STATUS.value = status;
                LASTFM_STATUS.innerHTML = status.charAt(0).toUpperCase() + status.slice(1);
                LASTFM_DATETIME.setAttribute("datetime", datetime);
                LASTFM_DATETIME.innerHTML = datetime;
                for (let section of LASTFM_ELEMENTS) {
                    section.setAttribute("aria-hidden", "false");
                    section.removeAttribute("hidden");
                }
            })
            .catch(error => {
                // Fail!
                console.error(`LastFM request status error: ${error}`);
            });
    }
})();
