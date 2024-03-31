---
date: 2015-03-12T10:00:00+0000
title: Theming Pinboard
description: I recently decided I would embark on the task of theming Pinboard. Here's how I did it.
tags:
  - css
  - ux
banner:
  url: theming-pinboard.png
  alt: a screenshot of Pinboard, an online tool for managing and organising bookmarks
syndicate_to:
  - https://twitter.com/iamchrisburnell/status/576014944627490816
---

I’ve been inspired by sites like [CSS Zen Garden](http://www.csszengarden.com/) and [Adactio: Jeremy Keith’s website](https://adactio.com/) to finally tackle a design problem that’ve been dealing with for a couple of months. What really pushed me to do it was a *misleading* tweet by [Jake Archibald](https://jakearchibald.com/):

<blockquote>
    <p>Pinboard implemented their own simpler layout model & used canvas for the drawing which is GPU-backed.</p>
    <cite>Jake Archibald (@jaffathecake) <a href="https://twitter.com/jaffathecake/status/569894563147608066">February 23, 2015</a></cite>
</blockquote>

Excited, I quickly jumped to my *Pinboard* tab and hammered the refresh button. Nothing changed. I dug into my account settings looking for a flag to switch on for this newfangled layout, but couldn’t find one. *What’s going on?!*

<blockquote>
    <p>(hah, I mean Flipboard, not Pinboard)</p>
    <cite>Jake Archibald (@jaffathecake) <a href="https://twitter.com/jaffathecake/status/569895188367319042">February 23, 2015</a></cite>
</blockquote>

*Okay then.*

Suddenly annoyed by this fact, I decided I’d once-and-for-all tackle the less-than-ideal design of *Pinboard*, which I use mostly to archive and bookmark pages on the web I don’t want to lose. You can read more about what *Pinboard* is useful for [here](https://pinboard.in/tour).

<figure>
    <a href="https://pinboard.in">
        {% image './images/content/pinboard-logo.png', 'Pinboard’s logo' %}
        <figcaption>Pinboard © Nine Fives Software.</figcaption>
    </a>
</figure>

## The First Step

<aside><p>What do I mean when I say <em>theming</em> or <em>skinning</em>? In essense, this the practice of applying a secondary or tertiary design or colour palette to a website or application. You can see this in action on <a href="http://www.csszengarden.com" rel="external noopener">CSS Zen Garden</a> or <a href="https://adactio.com/about/site/#skins" rel="external noopener">Adactio</a>.</p></aside>To begin with, I wanted to find the pain points of *Pinboard’s* default design and address them in my theme. Most of the problems I have with the design have to do with white-space and poorly distinguished categorisation.

<figure>
    {% image './images/content/pinboard-before.png', 'A screenshot of Pinboard’s default dashboard design' %}
    <figcaption><p>The <q>before shot.</q></p></figcaption>
</figure>

Let’s break down how bookmarks are categorised, at least as far as I use them on *Pinboard*:

- tags
- public/private
- starred/unstarred

So it was important for me to make these parts distinct in the new design, whilst maintaining a level of minimalism and a muted colour palette.

<h2 id="injection">injection"); DROP TABLE Bookmarks;--</h2>

<aside>
    <video src="/images/animated/idontbelievemyeyes.mp4" autoplay loop muted width="250" height="250"></video>
</aside>

That was a <del>hilarious</del> decent joke, right? And I'm sure you appreciated <del>that moment of tear-filled laughter</del> that I tried.

Anyway, I needed to find a way to inject my CSS into pages on *Pinboard*, for which I settled on [Stylish](https://userstyles.org/), a browser plugin (for [Chrome](https://chrome.google.com/webstore/detail/stylish-custom-themes-for/fjnbnpbmkenffdnngjfgmeleoegfcffe), [Firefox](https://addons.mozilla.org/en-US/firefox/addon/stylish/), and [Opera](https://addons.opera.com/en-gb/extensions/details/stylish/)) that <q>lets you easily install [and create] themes and skins for many popular sites.</q>

<figure>
    <a href="https://userstyles.org">
        {% image './images/content/stylish-logo.png', 'Stylish’s logo' %}
        <figcaption>Stylish - Open Source, by contributors.</figcaption>
    </a>
</figure>

The gist of the plugin is that you can define CSS styles and apply them to pages you visit on the web, with the option to restrict collections of styles to URLs and/or URL patterns. The styles are injected with JavaScript into a <samp>style</samp> tag in the <samp>head</samp>:

```html
<style id="stylish-3" class="stylish">
	...
</style>
```

<aside><p>I actually wish that the way in which styles are saved and stored could be improved—after switching to <a href="https://git-scm.com" rel="external noopener">git</a>, I have a tendency to want to add versioning to all of my projects. If there was some sort of <a href="https://gist.github.com" rel="external noopener">GitHub Gist</a> hook or something—Let me know <a href="#respond">in the comments</a> if you know of anything like what I’m looking for!</p></aside>The injected CSS actually refreshes as well, à la [LiveReload](http://livereload.com), so you don’t need to refresh your browser when saving changes. The in-browser code editor isn’t terrible either; it’s running on [CodeMirror](http://codemirror.net).

<h2 id="brass-tacks">Good old Brass Tacks</h2>

You can either write the stylesheets yourself or choose from [their vast selection](https://userstyles.org/categories). If you do install a theme from that repository, the styles manager in the *Pinboard* plugin will actually be able to update from the author at the click of a link. You can even build upon and modify stylesheets which you’ve installed, but I’m unsure what happens if you modify the stylesheet and install an update ([please comment if you do](#respond)).

I took a look at a few of the top plugins available under the [Pinboard category](https://userstyles.org/styles/browse/pinboard) to see how other people were accomplishing their designs—what kind of selector overriding might be necessary, how easy is the markup to manipulate, etc.

After tinkering with my own file for a few days and experimenting through daily use, I came up with what I think is a pretty decent, clean design:

<figure>
    {% image './images/content/pinboard-after.png', 'A screenshot of Pinboard’s dashboard design with my custom styles applied' %}
    <figcaption>The final piece.</figcaption>
</figure>

<figure>
    {% image './images/content/pinboard-private.png', 'A screenshot of a private/non-public bookmark with my custom styles applied' %}
    <figcaption>Private bookmarks.</figcaption>
</figure>

<figure>
    <picture>
        <img src="/images/animated/pinboard-icons-transition.gif" alt="An animated GIF of the hover/focus states of the main action buttons for each bookmark on the Dashboard" loading="lazy">
    </picture>
    <figcaption>The icons transition. An example of the new sitewide transitions.</figcaption>
</figure>

<figure>
    <picture>
        <img src="/images/animated/pinboard-star-transition.gif" alt="An animated GIF of the hover/focus state of the ‘star’ feature button" loading="lazy">
    </picture>
    <figcaption>The ‘star’ feature transition.</figcaption>
</figure>

## Challenges

The CSS that I’ve written isn’t anything for me to brag about; unfortunately, *Pinboard’s* CSS wasn’t exactly the holy grail of CSS to begin with, so having to work with poor CSS specificity was a challenge that was difficult to get around. Essentially in order to theme *any website*, you should be prepared to *(1) write a lot of overqualified selectors*, and *(2) use some reactive <samp>!importants</samp>*.

Once you’ve figured out how to navigate around whatever specificity hurdles may be in your way, you’ve also got to figure out what CSS architecture problems exist, namely: is the markup consistent in its use of the CSS; does the CSS follow any naming conventions or methodologies you should maintain and build upon; how often does the architecture itself actually change—will you have to modify your stylesheet every two weeks?

Some of my personal gripes with *Pinboard’s* CSS specifically included:

- a lot of unnecessary nesting
- over-qualified selectors
- IDs in CSS
- inconsistent use of the CSS in the markup
- inconsistent application of classes/IDs to elements

These factors made it difficult to nail down and style things exactly the way I wanted. It feels awkward for me to write CSS under these restrictions, but it’s always important to remember that although our pursuit of performant CSS is a necessary goal, CSS performance (painting and rendering after load aside) is relatively low on the totem pole.

One avenue I could have investigated, but never did, was a similar browser plugin to modify the HTML of the page in conjunction and to compliment the CSS, but I thought that that would result in a heavier performance hit than injecting a small stylesheet.

## Changes

I made a couple of over-arching changes to the CSS of *Pinboard*, which affected the rest of the design, those being:

- responsified the layout with media queries
- applying <samp>box-sizing: border-box;</samp> to the entire document:

```css
html {
	box-sizing: border-box;
}
*, *:before, *:after {
	box-sizing: inherit;
}
```

- including *normalize* with <samp>@import</samp>:

```css
@import url("https://chrisburnell.com/css/normalize.min.css");
```

- changing the base <samp>font-family</samp> to <samp>Open Sans</samp>, hosted by [Google Fonts](https://fonts.google.com/) with <samp>@import</samp>:

```css
@import url("https:/fonts.googleapis.com/css?family=Open+Sans:400italic,400,600");
```

- changing the base <samp>font-size</samp> to <samp>16px</samp> and changing many properties to be relative to the <samp>font-size</samp> with <samp>ems</samp> and <samp>rems</samp>
- changing a handful of action buttons from textual links to icon links: star, edit, delete, mark as read
    - for this I used a CSS trick to take the element’s text out of the flow and hide it, and instead display a base64-encoded <samp>background-image</samp> with an arbitary <samp>width</samp>, <samp>height</samp>, and <samp>background-size</samp>

```css
.edit_links a.edit,
.edit_links a.edit:visited,
.edit_links a.delete,
.edit_links a.delete:visited,
.edit_links a.mark_read,
.edit_links a.mark_read:visited {
	background-color: transparent;
	background-position: center;
	background-size: 19px 19px;
	background-repeat: no-repeat;
	opacity: .4;
	width:  19px;
	height: 19px;
	display: inline-block;
	padding: .25rem;
	position: relative;
	overflow: hidden;
	vertical-align: middle;
	text-indent: 100%;
	white-space: nowrap;
	-webkit-transition: opacity .1s ease;
	transition: opacity .1s ease;
}
.edit_links a.edit:hover,
.edit_links a.edit:focus,
.edit_links a.delete:hover,
.edit_links a.delete:focus,
.edit_links a.mark_read:hover,
.edit_links a.mark_read:focus {
	opacity: 1;
}

...

/* dark colour green */
.edit_links a.edit {
	background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lv...);
}
	/* light colour green */
	.edit_links a.edit:hover,
	.edit_links a.edit:focus {
		background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lv...);
	}
```

- modified the colour palette to match [my style guide](/styleguide/)
- implemented hooks with [IFTTT](https://ifttt.com/) to create bookmarks for specific events: Github stars, Twitter favourites, tweets by me with links, etc.

--------

**You can view the final stylesheet that I’m using on Github Gist:**

<nav class=" [ grid ] [ navigator ] ">
    <a href="https://gist.github.com/{{ author.github }}/ef5367e7dd263356c48a" class="button">gist.github.com →</a>
</nav>

## Conclusion

I’m not trying to point any fingers, but there’s a lesson in there: that it’s our job as developers to eliminate trifling work like this. We need to educate our peers, colleagues, and fellow developers on subjects we’re strong with, building towards the goal of creating a better web for everyone.

I think the ideas discussed in [Rik Schennink’s](http://rikschennink.nl/) article in Smashing Magazine, [Design Last](https://www.smashingmagazine.com/2015/02/design-last/), are a great ethos to take on when building websites. Content is king. If we understand first how we want to present and differentiate content from one another, then the design and development stage is much easier, and promotes a component-driven architecture.

If all we’re doing is changing a few colours, fonts, and sizes of elements on websites we use everyday, and finding it to be a cumbersome task, imagine the difficulty the developers of these websites face when updating their own websites. This isn’t the foundation for the web I want to use and build for in the future. We can do better.
