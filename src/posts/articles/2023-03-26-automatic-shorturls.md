---
date: 2023-03-26T10:00:00+0100
title: Generating Automatic ShortURLs with NewBase60
description: I’m still auto-generating ShortURLs for each of my posts using Tantek Çelik’s <a href="http://tantek.pbworks.com/w/page/19402946/NewBase60" rel="external">NewBase60</a>, but in a much more organised fashion and leaning into the JavaScript-based ecosystem of Eleventy.
tags:
  - eleventy
  - javascript
  - liquid
  - nunjucks
---

<nav class=" [ box ] [ flow ] " style="margin-block-end: var(--size-large);">
    <h2>Table of Contents</h2>
    <ol>
        <li>
            <strong>{{ title }}</strong>
            <ol>
                <li><a href="#refresh">Wait, where are we?</a></li>
                <li><a href="#category-code">Category Code</a></li>
                <li><a href="#sexagesimal-epoch-days">Sexagesimal Epoch Days</a></li>
                <li><a href="#post-index-for-the-day">Post Index for the Day</a></li>
                <li><a href="#generating-redirect-pages">Generating redirect pages</a></li>
                <li><a href="#eleventy-filter">Eleventy Filter</a></li>
                <li><a href="#in-closing">In Closing</a></li>
            </ol>
        </li>
        <li>Using RSS for ShortURL Redirection <small><em>(Coming soon…)</em></small></li>
    </ol>
</nav>

In 2019, I wrote about generating unique ShortURLs for each of my blog posts [using just Liquid templating](/article/liquid-base-60/). Back when we were beholden to just 140 characters to express ourselves, and before big silos took it upon themselves to generate their own ShortURLs, including a link on a social media post meant less room for your own thoughts. This catalysed an eruption of URL-shortening services, often putting an ad between visitors and their destination. Since I had discovered the IndieWeb, felt at home in its ecosystem, and despised the idea of putting barriers around my content—let alone someone else’s barriers—this motivated me to build my own.

I’ve moved over to [Mastodon](https://fediverse.repc.co/@chrisburnell) where the character-limit is 500 and better tooling diminish the usefulness of ShortURLs. Regardless, I like having them, and since my website is also now built using Eleventy, that change brought with it the ability to generate the same ShortURLs with some simpler JavaScript logic. Furthermore, an open source implementation of JavaScript-based NewBase60 [already exists](http://tantek.pbworks.com/w/page/19402946/NewBase60#runsinbothPHPandjavascript), so the work of getting it integrated into Eleventy is already started for us.

In this article, I’ll walk through how I implemented this in the latest iteration of my website. Of course, while I personally use Nunjucks instead of Liquid for my website, you can always continue to use the Liquid method if that’s your preference, as Eleventy supports both <q>out of the box</q>.

<h2 id="refresh">Wait, where are we?</h2>

Let’s refresh by taking a look at an example ShortURL and what each of its constituent parts represents:

<figure>
    <samp class=" [ beta ] " style="font-weight: var(--font-weight-regular);"><a href="https://repc.co/a4zK2" title="Permalink: LiquidBase60, a previous article on NewBase60">repc.co/<strong style="color: var(--color-bowhead);">a</strong><strong style="color: var(--color-maple);">4zK</strong><strong style="color: var(--color-liquid);">2</strong></a></samp>
</figure>

1. <samp class="strong" style="color: var(--color-bowhead);">a</samp> — <a href="#category-code">**Category Code**</a> *(required, 1 character)*
2. <samp class="strong" style="color: var(--color-maple);">4zK</samp> — **[Sexagesimal Epoch Days](#sexagesimal-epoch-days)** *(required, 3 characters)*
3. <samp class="strong" style="color: var(--color-liquid);">2</samp> — <a href="#post-index-for-the-day">**Post Index for the Day**</a> *(optional, 1 character, default = 1)*

These three segments allow us to uniquely identify any given post by referencing:

1. Which **category** the post belongs to (article, note, bookmark, etc.)<br>*Note: this implementation assumes each post is assigned to a single category; tagging is used to group posts into multiple collections*
2. The post’s **published date** (year, month, and day)<br>*Note: this implementation assumes each post has a unique date*
3. *If there are other posts in the **same category** with the **same published date**,* the post’s **published time** is compared against those posts to chronologically determine if the post is the {{ 1 | ordinal | safe }}, {{ 2 | ordinal | safe }}, {{ 3 | ordinal | safe }}, etc. for the day

## Category Code

<figure>
    <p class=" [ beta  center ] " style="font-weight: var(--font-weight-default);"><a href="#refresh" style="color: var(--color-nickel);" title="Jump to Refresh section">repc.co/<strong style="color: var(--color-bowhead);">a</strong>4zK2</a></p>
</figure>

One way to attach the category code to each post is to use Front Matter:

```markdown
---
title: My First Article
category: article
categoryCode: a
---

Lorem ipsum dolor sit amet, consectetur adipiscing elit.
```

However, I think a cleaner way is to use Eleventy’s [Template and Directory Specific Data Files](https://www.11ty.dev/docs/data-template-dir/). We can make things easier by organising our posts into subfolders based on their category. Something like this:

<pre class="language-none"><code class="language-none">posts/
├ posts.11tydata.js
├ articles/
│ ├ articles.11tydata.js
│ └ my-first-article.md
├ notes/
│ ├ notes.11tydata.js
│ └ my-first-note.md
…</code></pre>

By organising our posts in this way, we can attach metadata to every post within a subfolder/category without filling our Markdown files’ Front Matter with repeated metadata.

For every post in the `articles` folder, we can define some default metadata in <samp>articles.11tydata.js</samp>:

{% raw %}
```javascript
module.exports = {
	permalink: "article/{{ page.fileSlug }}/",
	tags: ["article"], // this creates an Article Collection
	category: "article",
	categoryCode: "a",
}
.replace(/^ {4}/gm, '	').replace(/^ {4}/gm, '	')```
{% endraw %}

Likewise, for every post in the `notes` folder, we can define some default metadata in <samp>notes.11tydata.js</samp>:

{% raw %}
```javascript
module.exports = {
	permalink: "note/{{ page.fileSlug }}/",
	tags: ["note"], // this creates a Note Collection
	category: "note",
	categoryCode: "n",
}
.replace(/^ {4}/gm, '	')```
{% endraw %}

We can also define some default metadata for every post in the `posts` folder, including subfolders like `articles` and `notes` above, in <samp>posts.11tydata.js</samp>:

{% raw %}
```javascript
module.exports = {
	tags: ["post"], // this creates a Post Collection
}
```
{% endraw %}

## Sexagesimal Epoch Days

<figure>
    <p class=" [ beta  center ] " style="font-weight: var(--font-weight-default);"><a href="#refresh" style="color: var(--color-nickel);" title="Jump to Refresh section">repc.co/a<strong style="color: var(--color-maple);">4zK</strong>2</a></p>
</figure>

Compared to the previous Liquid solution, things are quite a bit more terse in Eleventy where we can essentially implement NewBase60 [as provided by Tantek Çelik](http://tantek.pbworks.com/w/page/19402946/NewBase60).

However, that doesn’t mean this is simple by any means. I won’t even try to explain it, but it seems that humans—whether through nature, nurture, or something else—have an inherent preference for a **base-10**, or **Decimal numeral system**. So when it comes to even understanding how numbers represented in a different system relate to our familiar Decimal system, it certainly doesn’t come easily.

I would guess that the most widely-understood numeral system that is not <q>our own</q> (Decimal) is probably the **binary numeral system**, or <q class="silly">the language of computers</q> some might say.

Things get quite a bit more tricky beyond that. In the case of what we’re building, we’ll be using a **Sexagesimal**, or **base-60 numeral system**. While difficult to translate to Decimal in your head, this numeral system isn’t completely foreign to us.

<blockquote>
    <p>It originated with the ancient Sumerians in the {{ 3 | ordinal | safe }} millennium BC, was passed down to the ancient Babylonians, and is still used—in a modified form—for measuring time, angles, and geographic coordinates.</p>
    <cite><a href="https://en.wikipedia.org/wiki/Sexagesimal">Sexagesimal on Wikipedia</a></cite>
</blockquote>

One immensely-useful aspect about the number 60 is that it divides nicely into 1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30, and 60 (it has twelve factors). It’s a bit of a shame that a 60-column grid system didn’t gain traction back when projects like the [960 Grid System](https://960.gs) and its ilk were extremely popular!

--------

Let’s get building.

First, we need to decide how we want to represent a base-60 numeral system. Fortunately for us, Tantek has already thought this out and came up with the following sequence. I suggest reading [Tantek’s explanation](http://tantek.pbworks.com/w/page/19402946/NewBase60#Methodology) as to why these particular characters were chosen.

```javascript
// 60 characters that make up our Sexagesimal numeral system
const SEQUENCE = "0123456789ABCDEFGHJKLMNPQRSTUVWXYZ_abcdefghijkmnopqrstuvwxyz"
```

Now we can just about drop Tantek’s JavaScript implemention of NewBase60 into our project.

<aside class="inline-aside">
    <div id="packages" class=" [ box  box--warning ] ">
        <p>If you prefer, there are a number of <a href="https://www.npmjs.com/search?q=newbase60">npm packages</a> and <a href="https://github.com/search?q=newbase60+language%3AJavaScript&type=repositories&l=JavaScript">projects on GitHub</a> that will provide the same NewBase60 conversion that we’ll be building below.</p>
    </div>
</aside>

The purpose of this code is to consume a JavaScript Date Object and return the Sexagesimal value for how many days since [Epoch](https://en.wikipedia.org/wiki/Epoch_(computing)), 01 January 1970 00:00:00 UTC, the given date is:

```javascript
// Converts a Decimal (Base 10) Integer to a Sexagesimal (Base 60) String
const DecimalToSexagesimal = (value) => {
	if (value === undefined || value === 0) {
		return 0
	}
	let sexagesimalValue = ""
	while (value > 0) {
		let index = value % 60
		sexagesimalValue = SEQUENCE[index] + sexagesimalValue
		value = (value - index) / 60
	}
	return sexagesimalValue
}

// Converts a JS Date Object to a Sexageismal (Base 60) String
const DateToSexagesimal = (dateObject) => {
	let sinceEpoch = dateObject.getTime()
	let epochDays = Math.floor(sinceEpoch / (1000 * 60 * 60 * 24))
	return DecimalToSexagesimal(epochDays)
}
```

<c-details>
<summary>Example Conversions</summary>
<table>
    <thead>
        <tr>
            <th>Decimal</th>
            <th>Binary</th>
            <th>Sexagesimal</th>
        </tr>
    </thead>
    <tbody class=" [ monospace ] ">
        <tr>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td>1</td>
            <td>1</td>
            <td>1</td>
        </tr>
        <tr>
            <td>2</td>
            <td>10</td>
            <td>2</td>
        </tr>
        <tr>
            <td>10</td>
            <td>1010</td>
            <td>A</td>
        </tr>
        <tr>
            <td>59</td>
            <td>111011</td>
            <td>z</td>
        </tr>
        <tr>
            <td>60</td>
            <td>111100</td>
            <td>10</td>
        </tr>
        <tr>
            <td>901</td>
            <td>1110000101</td>
            <td>F1</td>
        </tr>
        <tr>
            <td>9001</td>
            <td>10001100101001</td>
            <td>2W1</td>
        </tr>
        <tr>
            <td>90001</td>
            <td>10101111110010001</td>
            <td>R01</td>
        </tr>
    </tbody>
</table>
</c-details>

<div class=" [ box ] [ flow ] ">
    <h2><a href="/newbase60-calculator/">NewBase60 Calculator</a></h2>
    <p>I’ve built a calculator to convert between decimal (base 10), binary (base 2), sexagesimal (base 60), and even the date, based on the number of days since Epoch.</p>
    <nav class=" [ grid ] [ navigator ] " style="--flow-space: inherit;">
        <a href="/newbase60-calculator/" class=" [ button ] ">NewBase60 Calculator</a>
    </nav>
</div>

## Post Index for the Day

<figure>
    <p class=" [ beta  center ] " style="font-weight: var(--font-weight-default);"><a href="#refresh" style="color: var(--color-nickel);" title="Jump to Refresh section">repc.co/a4zK<strong style="color: var(--color-liquid);">2</strong></a></p>
</figure>

The last step in building the ShortURL is to pull everything together into a function that we can pass to Eleventy to use as a Filter:

```javascript
// Export a function for an Eleventy Filter
module.exports = (date, categoryCode, collection) => {
	// Get all posts where DATE matches in UTC
	const postsToday = collection.filter((post) => {
		if ("date" in post.data) {
			return new Date(post.data.date).toLocaleDateString("en", { timeZone: "UTC" }) === new Date(date).toLocaleDateString("en", { timeZone: "UTC" })
		}
		return false
	})

	// Get the index of the post where EPOCH TIMESTAMP matches
	// Note: Indices start at 1 for ShortURLs
	const postIndex = 1 + postsToday.findIndex((post) => {
		return new Date(post.data.date).getTime() === new Date(date).getTime()
	})

	// Build the string
	return categoryCode + DateToSexagesimal(date) + postIndex
}
```

Predictably, the function accepts three parameters, the same ones that we [outlined above](#refresh), and spits out a unique string identifier. The *Post Index for the Day* is determined at this stage, where we have access to the Collections objects in Eleventy. This is done by building an array of posts made on the same day, ordered chronologically, and selecting the index of our respective post out of that array.

## Generating redirect pages

At this point, Eleventy still doesn’t know what to do if a user hits our site requesting a ShortURL, so let’s address that by creating a new file somewhere in [Eleventy’s input directory](https://www.11ty.dev/docs/config/#input-directory). In this page, we’ll use Pagination to get Eleventy to generate a complementary redirect page for every content page in the Post collection:

<c-details>
<summary>Liquid</summary>

{% raw %}
```liquid
---
layout: null
pagination:
  data: collections.post
  size: 1
  alias: item
permalink: "{{ item.data.date | NewBase60: item.data.categoryCode, collections[item.data.category] }}/"
---

<!DOCTYPE html><html><head><meta http-equiv=refresh content="0; url={{ item.url }}">
```
{% endraw %}

</c-details>

<c-details>
<summary>Nunjucks</summary>

{% raw %}
```twig
---
layout: null
pagination:
  data: collections.post
  size: 1
  alias: item
permalink: "{{ item.data.date | NewBase60(item.data.categoryCode, collections[item.data.category]) }}/"
---

<!DOCTYPE html><html><head><meta http-equiv=refresh content="0; url={{ item.url }}">
```
{% endraw %}

</c-details>

<aside class="inline-aside" style="--inset-block-start: -5em">
    <div class=" [ box  box--warning ] ">
        <p>Like me, you might choose to handle your redirects outside of Eleventy, maybe using a different, shorter domain name and processing redirection on the server rather than client-side. I’ll speak more on this in <strong>Part Two</strong>.</p>
    </div>
</aside>

## Eleventy Filter

Almost there now.

We need to let Eleventy know that this file exists so it can be used as a Filter in Layouts, Content, etc., so we’ll save the complete code to a JavaScript file somewhere in our project:

<c-details>
<summary>See the complete Eleventy Filter</summary>

```javascript
// 60 characters that make up the Sexagesimal numeral system
const SEQUENCE = "0123456789ABCDEFGHJKLMNPQRSTUVWXYZ_abcdefghijkmnopqrstuvwxyz"

// Converts a Decimal (Base 10) Integer to a Sexagesimal (Base 60) String
const DecimalToSexagesimal = (value) => {
	if (value === undefined || value === 0) {
		return 0
	}
	let sexagesimalValue = ""
	while (value > 0) {
		let index = value % 60
		sexagesimalValue = SEQUENCE[index] + sexagesimalValue
		value = (value - index) / 60
	}
	return sexagesimalValue
}

// Converts a JS Date Object to a Sexagesimal (Base 60) String
const DateToSexagesimal = (dateObject) => {
	let sinceEpoch = dateObject.getTime()
	let epochDays = Math.floor(sinceEpoch / (1000 * 60 * 60 * 24))
	return DecimalToSexagesimal(epochDays)
}

// Export a function for an Eleventy Filter
module.exports = (date, categoryPrefix, collection) => {
	// Get all posts where DATE matches in UTC
	const postsToday = collection.filter((post) => {
		if ("date" in post.data) {
			return new Date(post.data.date).toLocaleDateString("en", { timeZone: "UTC" }) === new Date(date).toLocaleDateString("en", { timeZone: "UTC" })
		}
		return false
	})

	// Get the index of the post where EPOCH TIMESTAMP matches
	// Note: Indices start at 1 for ShortURLs
	const postIndex = 1 + postsToday.findIndex((post) => {
		return new Date(post.data.date).getTime() === new Date(date).getTime()
	})

	// Build the string
	return categoryCode + DateToSexagesimal(date) + postIndex
}
```
</c-details>

Next, we’ll pull it into our Eleventy Config and add it as a Filter:

```javascript
const NewBase60 = require("./YOUR_CHOSEN_PATH/NewBase60.js")

module.exports = (eleventyConfig) => {
	eleventyConfig.addFilter("NewBase60", NewBase60)
}
```

<p class="center  strong">That’s all, folks!</p>

You can now use it in your posts’ Layout or wherever else you have access to a post’s metadata, e.g. looping through a collection. Here’s a Liquid and Nunjucks example demonstrating how to create a link to a post’s ShortURL that the user can copy and share:

<c-details>
<summary>Liquid</summary>

{% raw %}
```liquid
{% assign shorturl_id = page.date | NewBase60: categoryCode, collections[category] %}
<a href="http://repc.co/{{ shorturl_id }}">
    repc.co/{{ shorturl_id }}
</a>
```
{% endraw %}

</c-details>

<c-details>
<summary>Nunjucks</summary>

{% raw %}
```twig
{% set shorturl_id = page.date | NewBase60(categoryCode, collections[category]) %}
<a href="http://repc.co/{{ shorturl_id }}">
	repc.co/{{ shorturl_id }}
</a>
```
{% endraw %}

</c-details>

<aside class="inline-aside">
    <div class=" [ box  box--warning ] ">
        <p>As I mentioned <a href="#packages">above</a>, there are a number of open-source projects already available to handle NewBase60 conversion for you, but I’d be remiss if I didn’t also mention <a href="https://www.benji.dog/">benji’s</a> plugin for Eleventy, <a href="https://www.npmjs.com/package/eleventy-plugin-shortlinks">eleventy-plugin-shortlinks</a> <a href="https://github.com/benjifs/eleventy-plugin-shortlinks">(GitHub)</a>, which can handle <strong>everything</strong> we’ve built above!</p>
    </div>
</aside>

## In Closing

I think the real heavy-lifting in this solution is in its use of the Sexagesimal numeral system and its ability to express a long Decimal number with far fewer Sexagesimal digits. In our case, because we’re representing the number of days since Epoch, that means that our Sexagesimal number will be only 3-digits long (making the ShortURL only 5-characters long) until…

<p class=" [ center ] "><time datetime="2561-05-22T00:00:00+0000" class=" [ beta ] ">{{ '2561-05-22T00:00:00+0000' | friendlyDate }}</time></p>

That’s some longevity I can live with! <small>… and, presumably, die with!</small>

### What comes next?

The next major step is to complement what we’ve built here with a website to handle redirecting ShortURLs to their respective blog posts.

In an upcoming **Part Two**, we’ll dive deeper into how I built that for myself and how we can maintain a feeling of control over what we build by removing barriers to publishing through catering our code to our precise, personal needs.
