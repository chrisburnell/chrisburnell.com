---
title: Get YouTube Feed
lede: Paste a YouTube channel URL and get the URL to the equivalent Atom Feed for use in your Microsub setup.
webmentions: true
redirect_from:
  - gyf.html
coil: true
---

Expects a URL in the following format:

<pre><code>https://www.youtube.com/channel/AaBbCcDdEeFfGg0123456789</code></pre>

<form class="get-youtube-feed">
    <input type="text" inputmode="url" id="url">
    <button role="button" type="submit">Submit</button>
</form>

<script>
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
</script>

--------

{% include components/carbon.liquid %}
