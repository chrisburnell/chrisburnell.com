---
date: 2024-05-09T22:43:00+0800
title: How I’m obfuscating API calls in my front end JavaScript
description: I use a rudimentary Web Component on my website to pull in data from the LastFM API, but I needed a way to prevent exposing my API key. To get around this, I put a short PHP script on my server that makes the API calls for me.
tags:
  - weblogpomo
  - weblogpomo2024
  - php
  - javascript
post_includes: weblogpomo2024.njk
---

On my [Listening](/listening/) and [/now](/now/) pages, I’m displaying data from the [LastFM API](https://www.last.fm/api): recently-listened tracks, top artists of the week, and top albums of week. I’m pulling in that information as part of my Eleventy build using [eleventy-fetch](https://github.com/11ty/eleventy-fetch), so the contents of those pages are refreshed whenever my site builds and an hour has elapsed since the previous build. This means, for visitors without JavaScript enabled (or where it fails), those pages aren’t completely empty.

Because my website only pulls in fresh data on rebuilds, this means that the data could be up to 6 hours old, and I’d like to show as up-to-date data in those places if I can! So when JavaScript *is* enabled, a slap-dash Web Component that I built, `<lastfm-listening>`, makes the same call to the LastFM API with a client-side `fetch` in order to pull in fresh data.

You have to be careful here, as it’s required to include an API key as a URL parameter with any requests to the API. This isn’t an issue for the Eleventy build side of things because I store my API keys in an `.env` file which isn’t included in [the source code on GitHub](https://github.com/chrisburnell/chrisburnell.com), and I’m able to read and use the values of those keys using [Node’s `process.env` property](https://nodejs.org/api/process.html#process_process_env).

Unfortunately, this isn’t possible in front end JavaScript, so anyone could look at my website’s source code, their browser’s Dev Tools, or even view the source of my website’s JavaScript to see where the `fetch` request comes from and grab my API key from there.

```javascript
fetch("https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracksuser&api_key=njJql0lKXnotreal4x3Wmd&username=chrisburnell&format=json")
```

If my API key was `njJql0lKXnotreal4x3Wmd` (which it isn’t <c-emoji>😜</c-emoji>), malicious people could abuse the LastFM API by using my key, and *I* would be penalised (probably by having my key revoked).

To circumvent this issue, I built a short snippet of PHP code that lives on my server to make the same API calls on my behalf:

```php
<?php

header("Content-Type: application/json");

$api_key = "njJql0lKXnotreal4x3Wmd";

$response = file_get_contents("https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&api_key=" . $api_key . "&format=json&user=" . $_GET["username"]);

echo $response;
```

Now I can replace the `fetch` request in my front end JavaScript to point at the URL of my PHP file, which makes the API request for me, obfuscating the API key, and passes on the data for me to consume as I was before.

```javascript
fetch("https://chrisburnell.com/get-lastfm-recenttracks?user=chrisburnell")
```

I also recommend putting some security in place here, because there’s still a gap in the armour. What prevents someone from using the PHP file on my server? There are a few ways to mitigate this.

One option is to set up some rules on the server to only accept connections to this file from certain referers (i.e. your own websites), e.g. with the [`ngx_http_referer_module` in nginx](https://nginx.org/en/docs/http/ngx_http_referer_module.html).

Another option is to do the same but inside the same chunk of PHP with something like this:

```php
<?php

header("Content-Type: application/json");

$api_key = "njJql0lKXnotreal4x3Wmd";

$allowed_host = "example.com";
$referer_host = parse_url($_SERVER['HTTP_REFERER'], PHP_URL_HOST);

if(substr($referer_host, 0 - strlen($allowed_host)) == $allowed_host) {
	$response = file_get_contents("https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&api_key=" . $api_key . "&format=json&user=" . $_GET["username"]);

	echo $response;
}
```

I’ve seen quite a bit of chatter online about pulling data like this into our websites recently, and I’ve had some great conversations with friends about it too. I hope you find this useful if you’re inclined to progressively enhance your website with fresh data from APIs you love!
