---
date: 2026-05-09T09:49:02-0300
title: Fresh pixels
description: Status updates and enforcing the crispiest-possible 88x31 badges across the web
tags:
  - art
  - css
  - php
rkey: 3mnfqqqheia2u
---

Yesterday afternoon, I spent some time creating a new [88x31 badge](/88x31/) for my website footer.

In case you missed [my last post](/article/new-year-new-server-2/), I’m in the midst of migrating servers, and one of the things I migrated was [my status page](https://status.chrisburnell.com), which pings each of my websites once per minute and reports whether the request was successful, and if so, how long the request took. Each website is represented on the front end by a graph of response times across the last hour as well as 60 red or green-coloured *bloops*, which represent the successes of the last hour’s pings.

So the idea was to create a dynamic 88x31 badge that relayed information from my status page by displaying some number of the most recent *bloops*.

I set out achieving this by first creating the 88x31 image with some blank areas that I could fill in later with green or red, depending on the status of each *bloop*, and the next step was to create a short PHP script to consume this image, fill in the colours of the *bloops*, and spit out the result.

Fortunately, generating images with PHP is one of the first things I ever learned how to do outside of HTML and CSS early on in my web development journey, nearly 20 years ago, so this was a familiar task!

And the result (blown up for clarity):

<figure>
    <img src="https://chrisburnell.com/images/uptime.gif" alt="Server uptime badge" width="352" height="124" loading="lazy" decoding="async" class=" [ pixelated ] " style="margin-inline: 0;">
</figure>

<c-details class="no-padding flow">
    <summary>Backend code, if you’re interested</summary>

<p>Here’s what the JSON file of minute-by-minute data looks like:</p>

```json uptime.json
[
	{
		"timestamp": 1778260261,
		"time": 0.406,
		"response": 200,
		"http_version": "2"
	},
	{
		"timestamp": 1778260321,
		"time": 0.446,
		"response": 200,
		"http_version": "2"
	},
	{
		"timestamp": 1778260381,
		"time": 0.807,
		"response": 200,
		"http_version": "2"
	}
]
```

<p>And here’s the gist of the PHP that generates the dynamic image:</p>

{% raw %}
```php uptime.php
<?php

$image = imagecreatefromgif("uptime.gif");
$green = imagecolorallocate($image, 102, 204, 51);
$red   = imagecolorallocate($image, 153, 0, 51);
$cacheFile  = "cache.json";
$uptimeFile = "uptime.json";
$numBloops = 9;

if (!file_exists($cacheFile) || filemtime($cacheFile) < time() - 60) {
	$uptimeData = json_decode(file_get_contents($uptimeFile), true);
	usort($uptimeData, fn($a, $b) => $b["timestamp"] - $a["timestamp"]);
	$recent = array_slice($uptimeData, 0, $numBloops);
	$cache = [
		"timestamp" => $recent[0]["timestamp"],
		"bloops" => array_map(
			fn($item) => $item["time"] > 0 && $item["response"] >= 200 && $item["response"] <= 299,
			$recent
		),
	];
	file_put_contents($cacheFile, json_encode($cache));
} else {
	$cache = json_decode(file_get_contents($cacheFile), true);
}

$bloops = array_reverse($cache["bloops"]);

foreach ($bloops as $i => $ok) {
	$color = $ok ? $green : $red;
	imagefilledrectangle($image, 1, 2, 3, 4, $color);
}

header("Content-type: image/gif");
header("Cache-Control: public, max-age=60");

imagegif($image);
```
{% endraw %}

<p>And while we’re at it, here’s how I’m serving my PHP file as if it’s a GIF in <em>nginx</em>:</p>

```nginx /etc/nginx/sites-available/example.com
location = /images/uptime.gif {
    include fastcgi_params;
    fastcgi_param SCRIPT_FILENAME /absolute/path/to/uptime.php;
    fastcgi_pass unix:/run/php/php8.4-fpm.sock;
}
```

</c-details>

--------

In building this new 88x31, I was struck with another idea.

Because I so fiercely believe that (most) 88x31 badges look best on the web when they have `image-rendering: pixelated;` applied to them, why not enforce my belief across (almost) the entire web?

<p id="using-css" class="gamma">Using CSS</p>

I use the [Stylus](https://add0n.com/stylus.html) extension in my browser ([get it here](https://github.com/openstyles/stylus#releases)) to apply my own CSS to websites and pages. My custom styles are mostly to fix bugs, improve shaky layouts, or to add little quality-of-life stuff, and this seems like an ideal place for me to throw a small chunk of CSS and have my browser apply it across every page that I visit.

The CSS I came up with is pretty minimal, and although it relies on the `width` and `height` attributes being present, many websites that I visit that *do* have 88x31 badges at least have the attributes present, if not the desired CSS property applied as well:

```css
:where(img[width="88"][height="31"]) {
	image-rendering: pixelated;
}
```

Here’s how it looks in *Stylus*. Note that I’m applying this CSS to <q>Everything</q>, which means *every* webpage that you visit:

<figure>
    {% image './images/content/stylus-pixelate-88x31s.png', 'Stylus UI when adding styles for all websites to pixelate 88x31 badges', undefined, undefined, 'border: var(--size-border-thin) solid light-dark(var(--color-coyote), var(--color-wolf));' %}
</figure>

<p id="using-js" class="gamma">Using JavaScript</p>

Alternatively, if you want to achieve this for *all* 88x31 images, whether they have the correct attributes or not, there’s the [Tampermonkey](https://www.tampermonkey.net/) extension ([get it here](https://www.tampermonkey.net/#download)) that works much like Stylus but with JavaScript instead of CSS. Here’s my script that checks the width and height of images *whether their attributes are set or not* and appropriately applies the pixelated effect to 88x31 images:

```javascript
// ==UserScript==
// @name         Pixelate 88x31s
// @match        *://*/*
// @run-at       document-idle
// ==/UserScript==

[...document.querySelectorAll("img")].forEach((img) => {
	const pixelate = () => {
		if (img.naturalWidth === 88 && img.naturalHeight === 31) {
			img.style.imageRendering = "pixelated";
		}
	};
	img.complete ? pixelate() : img.addEventListener("load", pixelate);
});
```

Now properly-attributed 88x31 images will always appear nice and sharp, everywhere on the web, including but not limited to the ones in the footer of my website (though they already have the *correct* `image-rendering`)!
