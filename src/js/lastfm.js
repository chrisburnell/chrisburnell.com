/*!
 * Load in the latest tune from LastFM
 * @author Chris Burnell <me@chrisburnell.com>
 */

(() => {
    "use strict";

    const LASTFM_URL = "https://micropub.chrisburnell.com/lastfm.php";
    const LASTFM_SECTION = document.querySelectorAll(".js-lastfm");
    const LASTFM_STATUS = document.querySelector(".js-lastfm-status");
    const LASTFM_ARTIST = document.querySelector(".js-lastfm-artist");
    const LASTFM_TRACK = document.querySelector(".js-lastfm-track");
    const LASTFM_LINK = document.querySelector(".js-lastfm-link");

    if (LASTFM_SECTION.length > 0) {
        fetch(LASTFM_URL)
            .then(helpers.getFetchResponse)
            .then(response => response.json())
            .then(data => {
                // Success!
                let datetime = new Date();
                let playingLabel = "🎶 Now Playing";
                if (data.hasOwnProperty("date")) {
                    datetime.setSeconds(Number(data.date.uts));
                    playingLabel = "🎵 Last Played";
                }
                LASTFM_STATUS.innerHTML = `<time datetime="${datetime.toISOString()}">${playingLabel}</time>`;
                LASTFM_ARTIST.innerHTML = data["artist"]["#text"] ? ` —  <em>${data["artist"]["#text"]}</em>` : "";
                LASTFM_TRACK.innerHTML = data["name"] ? `<em>${data["name"]}</em>` : "";
                LASTFM_LINK.href = data.url;
                for (let section of LASTFM_SECTION) {
                    section.removeAttribute("hidden");
                }
            })
            .catch(error => {
                // Fail!
                console.error(`LastFM request status error: ${error.status} ${error.statusText}`);
            });
    }
})();
