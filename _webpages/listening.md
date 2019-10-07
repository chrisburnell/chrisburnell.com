---
page_class: page--listening

title: Listening
lede: What have I been listening to?
---

Powered by [LastFM](https://last.fm){:rel="external"}. Check out my [Music Reviews](/music) for more musical data.

<div id="listening" class="h-feed">
    <ol class="shelf  js-lastfm-feed" role="list">
    </ol>
</div>

{% raw %}
<script>
function timeSince(timeStamp) {
    var now = new Date(),
    secondsPast = (now.getTime() - timeStamp.getTime()) / 1000,
    relativeTime = 0;
    relativeTimeUnit = "second";

    if (secondsPast <= 86400) {
        if (secondsPast < 60) {
            relativeTime = parseInt(secondsPast);
            relativeTimeUnit = "second";
        }
        if (secondsPast < 3600) {
            relativeTime = parseInt(secondsPast/60);
            relativeTimeUnit = "minute";
        }
        else {
            relativeTime = parseInt(secondsPast/3600);
            relativeTimeUnit = "hour";
        }
        return `${relativeTime} ${relativeTimeUnit}${relativeTime != 1 ? "s" : ""} ago`;
    }
    else {
        day = timeStamp.getDate();
        month = timeStamp.toDateString().match(/ [a-zA-Z]*/)[0].replace(" ","");
        year = timeStamp.getFullYear() == now.getFullYear() ? "" :  " "  +timeStamp.getFullYear();
        return day + " " + month + year;
    }
}

(() => {
    const LASTFM_URL = "https://api.chrisburnell.com/lastfm/chrisburnell";
    const LASTFM_FEED = document.querySelector(".js-lastfm-feed");
    const LASTFM_TEMPLATE = `
<div class="h-cite  p-listen-of">
    <img class="last-fm__cover" src="{{ image }}" alt="">
    <h2 class="delta">
        <a href="{{ url }}" rel="external">
            <cite class="p-name  p-summary">{{ name }}</cite>
        </a>
    </h2>
    <div>
        <a class="h-cite" href="{{ artistURL }}" title="" rel="external">{{ artist }}</a>
    </div>
    <time class="dt-published" datetime="{{ datetime }}">{{ datetimeFriendly }}</time>
</div>
`;

    fetch(LASTFM_URL)
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                let error = new Error(response.statusText);
                error.response = response;
                throw error;
            }
        })
        .then(response => response.json())
        .then(data => {
            // Success!
            for (let track of data) {
                let url = track["url"];
                let trackName = track["name"];
                let trackArtist = track["artist"]["name"];
                let trackArtistURL = track["artist"]["url"];
                let datetime = new Date();
                let datetimeFriendly = "🎶 <em>Listening now</em>";
                if (track.hasOwnProperty("date")) {
                    datetime.setTime(Number(track["date"]["uts"]) * 1000);
                    datetimeFriendly = `🎵 <em>${timeSince(datetime)}</em>`;
                }
                let image = track["image"][0]["#text"];

                datetime = datetime.toISOString();

                let listItem = document.createElement("li");
                listItem.className = "h-review";
                listItem.setAttribute("role", "listitem");
                listItem.innerHTML =
                    LASTFM_TEMPLATE
                        .replace(/{{ url }}/g, url)
                        .replace(/{{ name }}/g, trackName)
                        .replace(/{{ artist }}/g, trackArtist)
                        .replace(/{{ artistURL }}/g, trackArtistURL)
                        .replace(/{{ datetime }}/g, datetime)
                        .replace(/{{ datetimeFriendly }}/g, datetimeFriendly)
                        .replace(/{{ image }}/g, image);

                LASTFM_FEED.appendChild(listItem);
            }
        })
        .catch(error => {
            // Fail!
            console.error(`LastFM request status error: ${error}`);
        });
})();
</script>
{% endraw %}
