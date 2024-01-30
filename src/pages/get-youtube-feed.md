---
published: false
title: Get YouTube Feed
description: Paste a YouTube channel URL and get the URL to the equivalent Atom Feed for use in your Microsub setup.
---

<noscript><p>Unfortunately, this page requires JavaScript for the form to function correctly.</p></noscript>

Expects a URL in the following format:

<pre><code>https://www.youtube.com/channel/AaBbCcDdEeFfGg0123456789</code></pre>

<!-- </textarea> -->
<!-- '"´ -->
<form class=" [ responses__form ] ">
    <input type="text" inputmode="url" id="url">
    <button type="submit">Submit</button>
</form>

{% js 'module' -%}
/**
 * Get YouTube RSS Feed
 * @class
 */
class GetYouTubeFeed {
	/**
	 * @constructor
	 */
	constructor() {
		this.form = document.querySelector(".get-youtube-feed")
		this.input = this.form.querySelector("input")

		this.form.addEventListener("submit", (event) => {
			event.preventDefault()
			this.convertURL()
			this.input.focus()
		})

		this.input.addEventListener("blur", (event) => {
			event.preventDefault()
			this.convertURL()
		})
	}

	/**
	 * Figures out how to extract the channel from the input URL and then
	 * injects the input to hold the URL of the respective feed.
	 */
	convertURL() {
		const url = this.input.value

		if (url.includes("/channel/")) {
			const channel = url.split("/channel/")[1].replace(/\/$/, "")
			this.input.value = `https://www.youtube.com/feeds/videos.xml?channel_id=${channel}`
		}
	}
}

if ("HTMLElement" in window) {
	/**
	 * @type {GetYouTubeFeed}
	 */
	window.GetYouTubeFeed = new GetYouTubeFeed()
}

/**
 * @type {GetYouTubeFeed}
 */
export default GetYouTubeFeed
{%- endjs %}
