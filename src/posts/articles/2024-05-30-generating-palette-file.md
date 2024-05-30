---
date: 2024-05-30T23:50:26+0800
title: Generating a Palette File from Site Colours
description: In this post, I explain how I dynamically-generate a GIMP palette file based on the design tokens for my website’s colours.
tags:
  - weblogpomo
  - weblogpomo2024
post_includes:
  - weblogpomo2024.njk
---

In my early teenage years on the internet, I got really into creating pixel art. Back then, I used MS Paint, but around 2018 I rediscovered my love for the hobby and downloaded [Aseprite](https://www.aseprite.org/), an image editor built specifically for work on sprites and pixel art. Since then, I’ve continued to dabble in my hobby here and there, and have used what skills I do have to create <q>logos</q> for some of [my projects](/projects/) and [badges](/note/88x31-early-2024/).

<figure class=" [ requires-motion ] ">
	<img src="/images/animated/88x31.gif" alt="chrisburnell.com 88x31 animated badge" width="88" height="31" loading="lazy" decoding="async" class=" [ pixelated ] ">
</figure>

<figure>
    {% image './images/content/rolbie-stamp-standalone.png', 'A monochromatic stamp picturing a cow', 'pixelated' %}
</figure>

<figure>
    {% image './images/content/pentatonic.png', 'A pixel-art graphic of some piano keys where the keys of the C Major Pentatonic scale are highlighted', 'pixelated' %}
</figure>

<figure>
    {% image './images/content/bowhead.png', 'A pixel art graphic of a bowhead whale, which is coming towards the viewer, its tail fading into the dark water around it', 'pixelated' %}
</figure>

What I really love about *Aseprite* is just how much attention to detail and thought has been put into creating such a world-class product. It’s got all the bells and whistles that I cut my teeth with when I used MS Paint on Windows XP, but it has a helluva lot more than that: a robust layering system; a tiling mode; intuitive animation tools; pixel-perfect strokes; an immensely-powerful shading mode; custom brushes and gradients; smart and powerful keyboard shortcuts; and even a <abbr title="command line interface">CLI</abbr>, to name but a few of its features.

In fact, you can browse through [the entire source code](https://github.com/aseprite/aseprite), if you’re so inclined. Because the entire experience of using *Aseprite* is so open and extendable, this has made possible a wonderful community of designers and developers who have created a rich ecosystem of plugins and add-ons, which makes it possible to modify the program’s UI, use custom algorithms for adjusting shapes and sizes, modifying colours, adding gradient algorithms, etc.

I could go on and on, but that’s not what I’m discussing today.

## Building the file

One of my favourite features in *Aseprite* is its colour palette. The program comes bundled with dozens of pre-selected colour palettes to help you create pixel art using the colours of retro video game consoles, old computers, etc. And just like the rest of the program, adding custom palettes to this list is extremely

When I discovered this feature, I dug in a bit deeper and learned about the GIMP palette file format (`.gpl`), which is used to store the data for any given palette of colours. So I decided to create a palette file that represents the [colours used on my website](/styleguide/#colours).

First, let’s look at what’s in a GIMP palette file:

```text
GIMP Palette
# Ravenous by Chris Burnell
# https://chrisburnell.com
# Colors: 16
  9  18  23 Lynx
 32  50  61 Wolf
 62  92 109 Bowhead
 95 138 166 Raven
141 180 215 Highland
192 219 237 Coyote
235 243 249 Bear
  6   6   6 Thunder
 43  43  43 Mineshaft
 79  79  79 Kaiser
115 115 115 Nickel
221 221 221 Yeti
249 249 249 Snowy
255 215   0 Aspen
 61 129  55 Conifer
224  21  31 Maple
```

So, in all, the file contains an identifier that this is a GIMP palette file (`GIMP Palette`), some comments with metadata about the palette (lines starting with `#`), followed by the RGB values and name of each colour in the palette.

I already store the design tokens for my website’s CSS in a series of JSON files and consume them in SCSS by converting them into [Maps](https://sass-lang.com/documentation/values/maps/) of names and values using the npm package, [json-to-scss](https://www.npmjs.com/package/json-to-scss), and then looping through those Maps to generate CSS Variables. I can use the JSON file containing my colour design tokens to generate the colours in the palette file.

```json
{
  "lynx": "#091217",
  "wolf": "#20323d",
  "bowhead": "#3e5c6d",
  "raven": "#5f8aa6",
  "highland": "#8db4d7",
  "coyote": "#c0dbed",
  "bear": "#ebf3f9",
  "thunder": "#060606",
  "mineshaft": "#2b2b2b",
  "kaiser": "#4f4f4f",
  "nickel": "#737373",
  "yeti": "#dddddd",
  "snowy": "#f9f9f9",
  "aspen": "#ffd700",
  "conifer": "#3d8137",
  "maple": "#e0151f"
}
```

By storing this JSON file in my Eleventy data folder, I can loop through it using Nunjucks, but first I need a way to convert the Hexadecimal colours to their RGB counterparts. A filter does the trick.

```javascript
const getRGB = (hex) => {
	const COLOR = hex.replace("#", "").slice(0, 6)
	return COLOR.match(/.{1,2}/g).map((value) => {
		return parseInt(value, 16)
	})
}
```

This filter consumes a Hex colour value and returns an array with three values corresponding to the respective **r**ed, **g**reen, and **b**lue values (0–255).

The last step is to create the Nunjucks file that will build out the palette file, e.g. `Ravenous.gpl.njk`, where the file’s permalink is set to equal the `fileSlug`, `Ravenous.gpl` in this case.

{% raw %}
```twig
GIMP Palette
# Ravenous by Chris Burnell
# https://chrisburnell.com
# Colors: {{ colors | length }}
{% for name, color in colors -%}
{% for component in (color | getRGB) %}{% if component.toString().length == 1 %}  {% elif component.toString().length == 2 %} {% endif %}{{ component }} {% endfor %}{{ name | title }}
{%- endfor %}
```
{% endraw %}

This code loops through each of the key-value pairs in the JSON file and outputs a line for each. Inside this loop is *another* loop which uses the filter to get the array of RGB values for the colours, which are then printed before the colour’s name. There’s a little hackery using `if` statements in there so that the RGB values are aligned vertically in the output, but that’s entirely optional.

<hr style="--rule-space: var(--size-medium);">

You can download the Ravenous GIMP palette file here: [Ravenous.gpl](/Ravenous.gpl). Let me know if you create anything with it!
