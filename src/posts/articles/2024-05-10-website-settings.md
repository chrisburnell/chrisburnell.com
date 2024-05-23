---
date: 2024-05-10T11:04:55+0800
title: Website Settings
description: In this post, I’m going to run through how I’m using some exciting <q>new</q> browser features to power the settings/preferences on my website.
tags:
  - weblogpomo
  - weblogpomo2024
  - html
  - javascript
  - css
  - web-components
post_includes: weblogpomo2024.njk
---

While still riding the high of the fantastic [11ty Conference](https://conf.11ty.dev/) yesterday (which ended at <time datetime="{{ '2024-05-10T05:00:00+0800' | rfc3339Date }}">5 in the morning</time> here in Singapore…), I was inspired to write this post off the back of two talks in particular: [Don't Fear the Cascade](https://conf.11ty.dev/2024/dont-fear-the-cascade/) by [Mayank](https://www.mayank.co/) and [](https://conf.11ty.dev/2024/light-mode-versus-dark-mode/) by [Light mode versus Dark mode](https://conf.11ty.dev/2024/light-mode-versus-dark-mode/) by [Sara Joy](https://sarajoy.dev/).

While there’s certainly a lot to look forward to in the [Web Preferences API](https://wicg.github.io/web-preferences-api/), it hasn’t yet become a fully-fledged web standard and become available in browsers. Until that time comes, I’m using a combination of relatively-modern but stable browser features to serve up a series of settings/preferences that website visitors can use to control and modify their browsing experience.

<aside><p>If you’re not familiar, the settings window can be opened from the top-right corner of any of my pages<span class="rss-only">; although, you’ll have to visit my website to see it in action: <a href="{{ canonical }}">{{ canonical }}</a></span>!</p></aside>

## Popovers

Historically, attaching functionality to buttons has, for the most part, required JavaScript, save for some bits and pieces like submit buttons in forms. The <q>new</q> [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API) provides a method for displaying popover content on top other page content, like a modal window, and wonderfully does *not* require JavaScript, as it’s baked right into the browser.

At its simplest, turning an element into a popover element is done by applying a `popover` attribute; likewise, attaching a button to that popover element (to open and close it) is done by adding a `popovertarget` attribute whose values is the `id` of the popover element:

```html
<div id="wibble" popover>Popover content here</div>
<button popovertarget="wibble">Toggle Popover</button>
```
<figure>
    <div id="wibble" popover>Popover content here</div>
    <button popovertarget="wibble">Toggle Popover</button>
</figure>

Included with popover elements is a new pseudo-element, `::backdrop`, that covers the entire viewport, can be styled with CSS, and can even intercept clicks to hide/close the popover.

There are a tonne of other features that I won’t go into detail about today, but includes other quality-of-life things like the <kbd>Escape</kbd> key closing popovers, being able to control whether buttons should open, close, or toggle its respective popover element, etc.

I’m using this great new browser feature to hold my website’s settings, which tucks them away neatly when not in use and saves me from having to write and maintain some JavaScript to control the interactions!

If you want to learn more about Popovers, [Hidde de Vries](https://hidde.blog/blog/) has written extensively on their intricate details, how to use them effectively, and accessibility related to their use. I can’t recommend Hidde’s work enough. It’s absolutely worth the read!

--------

<h2 id="has-selector">The :has() selector</h2>

I spent *many* years as a developer wishing, hoping, and deeply-lamenting the non-existence of <q>the parent selector</q>. I cannot count the number of times that I’d be working on something and mourned how much more readable and easy life would have been had there been a way to style a *parent element* based on *its children element(s)*.

So with the introduction of the indomitable `:has()` selector, my hopes and dreams were finally realised.

For example, in the past, if I wanted to style my `<h2>` elements in a particular way when it contains an `<a>` element, I’d have to do something like create a specific class that I would *also* need to remember to include in my HTML:

```html
<h2>This is a heading</h2>

<h2 class="has-anchor">
	<a href="#_">This is also a heading</a>
</h2>
```

```css
h2.has-anchor {
	/* apply specific styles */
}
```

With the `:has()` selector, a lot of the mental overhead involved with that solution just floats away:

```html
<h2>This is a heading</h2>

<h2>
	<a href="#_">This is also a heading</a>
</h2>
```

```css
h2:has(a) {
	/* apply specific styles */
}
```

When it comes to applying the settings on my website, I’m providing a series of `<select>` elements that visitors can use to control things like the colour scheme, theme, and smooth scroll. I’m applying a set of styles based on the selected `<option>` inside those `<select>` elements and their associated values in conjunction with the `:has()` selector.

Let’s look at the HTML for the colour scheme setting controls:

```html
<label for="color-scheme-selector">Light/Dark:</label>
<select id="color-scheme-selector" name="color-scheme">
	<optgroup label="Select a colour scheme">
		<option value="" selected>OS Default</option>
		<option value="light">Light</option>
		<option value="dark">Dark</option>
	</optgroup>
</select>
```

By default, I’m leaving it up to the browser / operating system to define whether a visitor prefers a light or dark colour scheme. When this setting is left alone, I can use a media query to match whatever this preference may be, e.g.:

```css
@media (prefers-color-scheme: dark) {
	html {
		/* apply dark colour scheme styles */
	}
}
```

However, if the visitor were to select either the <q>Light</q> or <q>Dark</q> options, I can use the `:has()` selector to match their selection and apply those same styles:

```css
html:has([name="color-scheme"] [value*="dark"]:checked) {
	/* apply dark colour scheme styles */
}
```

Although this selector might look a little unwieldy, what it’s doing is checking the DOM to see if the `<html>` element contains an element that has a `name` attribute whose values is `color-scheme`, which matches the `<select name="color-scheme">` element. And if the child element `<option value="dark">` is selected, then apply my dark colour scheme styles.

I’m using this same pattern for all of my website’s settings, and I couldn’t be more thankful that the fabled parent selector is finally a reality!

--------

<h2 id="storage-form">&lt;storage-form&gt;</h2>

The last piece of the puzzle here is a critical one. Being able to open and close the settings popover and make some choices to control how to experience my website is one thing, but if those choices don’t persist when navigating between pages, then the settings could be more of a headache than the lovely feature that I’d like them to be!

That’s where [`<storage-form>`](https://darn.es/storage-form-web-component/), a Web Component by [David Darnes](https://darn.es) that allows form elements to persist and be saved, comes in. It uses the browser’s [Local Storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) to save what the visitor has typed/checked/selected in form elements, and reads those saved values from Local Storage so they can be reapplied whenever the visitor navigates between pages and even when completely leaving the site and returning later.

Usage is very straightforward and done by wrapping `<form>` elements with the Web Component:

```html
<storage-form>
	<form>
		<!-- settings form inputs here -->
	</form>
</storage-form>
```

Unfortunately, this *does* mean that persisting visitor choices of settings between pages requires JavaScript, but I cannot overstate how useful this Web Component is. I feel so lucky that great folks like David are contributing to the ecosystem of Web Components!

If you’re interested in exploring the wealth of amazing Web Components that you can just about drag-and-drop into your own projects and start using, I’ve got [a list of Web Components on GitHub](https://github.com/stars/chrisburnell/lists/web-components) that you might want to browse through.
