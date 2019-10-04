---
page_class: page--listening

title: Listening
lede: What have I been listening to?
---

<div id="listening" class="h-feed">
    <ol class="shelf  js-lastfm-feed" role="list">
    </ol>
</div>

{% raw %}
<script>
function timeSince(timeStamp) {
  var now = new Date(),
    secondsPast = (now.getTime() - timeStamp.getTime()) / 1000;
  if(secondsPast < 60){
    return parseInt(secondsPast) + 's';
  }
  if(secondsPast < 3600){
    return parseInt(secondsPast/60) + 'm';
  }
  if(secondsPast <= 86400){
    return parseInt(secondsPast/3600) + 'h';
  }
  if(secondsPast > 86400){
      day = timeStamp.getDate();
      month = timeStamp.toDateString().match(/ [a-zA-Z]*/)[0].replace(" ","");
      year = timeStamp.getFullYear() == now.getFullYear() ? "" :  " "+timeStamp.getFullYear();
      return day + " " + month + year;
  }
}

(() => {
    const LASTFM_URL = "https://api.chrisburnell.com/lastfm/chrisburnell";
    const LASTFM_FEED = document.querySelector(".js-lastfm-feed");
    const LASTFM_TEMPLATE = `
<div class="h-cite  p-listen-of">
    <h2 class="delta">
        <cite class="p-name  p-summary">{{ name }}</cite>
    </h2>
    <div class="h-cite">{{ artist }}</div>
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
                let trackName = track["name"];
                let trackArtist = track["artist"]["#text"];
                let datetime = new Date();
                let datetimeFriendly = "🎶 <em>Listening now</em>";
                if (track.hasOwnProperty("date")) {
                    datetime.setSeconds(Number(track["date"]["uts"]) / 1000);
                    console.log(datetime);
                    datetimeFriendly = `🎵 <em>${timeSince(datetime)}</em>`;
                }

                // datetime = datetime.toISOString();

                let listItem = document.createElement("li");
                listItem.className = "h-review";
                listItem.setAttribute("role", "listitem");
                listItem.innerHTML =
                    LASTFM_TEMPLATE
                        .replace(/{{ name }}/g, trackName)
                        .replace(/{{ artist }}/g, trackArtist)
                        .replace(/{{ datetime }}/g, datetime)
                        .replace(/{{ datetimeFriendly }}/g, datetimeFriendly);

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
