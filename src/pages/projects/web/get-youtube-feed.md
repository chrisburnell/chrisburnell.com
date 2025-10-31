---
published: false
title: Get YouTube Feed
description: Paste a YouTube channel URL and get the URL to the equivalent Atom Feed for use in your Microsub setup.
js_module_includes:
  - src/js/pages/get-youtube-feed.js
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
