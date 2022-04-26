(function () {
	"use strict";

	const LASTFM_URL = "https://api.chrisburnell.com/lastfm/chrisburnell";
	const LASTFM_FEED = document.querySelector(".js-lastfm-feed");
	const LASTFM_TEMPLATE = `
<a href="{{ url }}">
	<picture>
		<img class=" [ cover ] [ u-photo ] " src="{{ image }}" alt="" role="presentation">
	</picture>
</a>
<h3>
	<a href="{{ url }}">
		<cite class=" [ p-name  p-summary ] ">{{ name }}</cite>
	</a>
</h3>
<div>
	<a class=" [ h-cite ] " href="{{ artistURL }}" title="" rel="external">{{ artist }}</a>
</div>
<time class=" [ dt-published ] " datetime="{{ datetime }}">{{ datetimeFriendly }}</time>
`;

	const since = (datetime) => {
		const today = Math.floor(Date.now() / 1000);
		const compare = Math.floor(datetime.getTime() / 1000);
		const difference = Math.abs(compare - today);

		const minute = 60;
		const hour = 60 * minute;
		const day = 24 * hour;
		const week = 7 * day;
		const month = 30.436875 * day;
		const year = 12 * month;

		const rtf = new Intl.RelativeTimeFormat("en", {
			localeMatcher: "best fit", // other values: "lookup"
			numeric: "always", // other values: "auto"
			style: "long", // other values: "short" or "narrow"
		});

		if (difference < minute * 2) {
			return "just moments ago";
		} else if (difference < hour * 2) {
			return rtf.format(Math.ceil((compare - today) / minute), "minute");
		} else if (difference < day * 2) {
			return rtf.format(Math.ceil((compare - today) / hour), "hour");
		} else if (difference < week * 2) {
			return rtf.format(Math.ceil((compare - today) / day), "day");
		} else if (difference < month * 2) {
			return rtf.format(Math.ceil((compare - today) / week), "week");
		} else if (difference < year * 2) {
			return rtf.format(Math.ceil((compare - today) / month), "month");
		}
		return rtf.format(Math.ceil((compare - today) / year), "year");
	};

	fetch(LASTFM_URL)
		.then((response) => {
			if (response.ok) {
				return response;
			} else {
				let error = new Error(response.statusText);
				error.response = response;
				throw error;
			}
		})
		.then((response) => response.json())
		.then((data) => {
			// Success!
			for (let track of data) {
				let url = track["url"];
				let trackName = track["name"];
				let trackArtist = track["artist"]["name"];
				let trackArtistURL = track["artist"]["url"];
				let datetime = new Date();
				let datetimeFriendly = "<em>listening now</em>";
				if (track.hasOwnProperty("date")) {
					datetime.setTime(Number(track["date"]["uts"]) * 1000);
					datetimeFriendly = `<em>listened ${since(datetime)}</em>`;
				}
				let image = track["image"][3]["#text"];

				datetime = datetime.toISOString();

				let article = document.createElement("article");
				article.className = "h-review";
				article.innerHTML = LASTFM_TEMPLATE.replace(/{{ url }}/g, url)
					.replace(/{{ name }}/g, trackName)
					.replace(/{{ artist }}/g, trackArtist)
					.replace(/{{ artistURL }}/g, trackArtistURL)
					.replace(/{{ datetime }}/g, datetime)
					.replace(/{{ datetimeFriendly }}/g, datetimeFriendly)
					.replace(/{{ image }}/g, image);

				LASTFM_FEED.appendChild(article);
			}
		})
		.catch((error) => {
			// Fail!
			console.error(`Last.fm request status error: ${error}`);
		});
})();
