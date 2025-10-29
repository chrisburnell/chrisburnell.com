---
date: 2025-10-24T12:01:00-0300
title: Color Scheming
description: "It’s been about a year and a half since I changed how colour schemes (i.e., light and dark themes) work on my website, and after reviewing and refactoring things again recently, I thought I would share how everything ties together and allows for different levels of control over colour schemes."
tags:
  - color
  - css
  - javascript
  - web-components
  - writing
  - rss-only
redirect_from:
  - /article/colour-scheming
syndicate_to:
  - https://fediverse.repc.co/@chrisburnell/115448234760009095
  - https://bsky.app/profile/chrisburnell.com/post/3m47e6ly74s2s
---

In this article, I’ll cover *how* to implement a colour-scheming system, gain some understanding of how to control the colour scheme in different ways, and write some CSS that leverages the strengths of the language to build a hierarchy of colour scheme controls.

*Note: We’re going to build this hierarchy of controls out of order, but we’ll wrap everything back around to honour its order by the end.*

<ol style="line-height: var(--line-height-small);">
    <li><a href="#part-2">Element-level Override</a></li>
    <li><a href="#part-2">Page-level Override</a></li>
    <li><a href="#part-3">Site-level Preference</a></li>
    <li><a href="#part-1"><abbr title="Operating System">OS</abbr>/Browser-level Preference</a></li>
</ol>

<div class=" [ box  box--success ] [ line-length  center ] [ skip-wordcount  no-rss ] " style="margin: var(--size-large) auto 0;">
    <p><a href="#try">Try it out at the bottom of this article <span aria-hidden="true">↓</span></a></p>
</div>

--------

<h2 id="build">Let’s build</h2>

<h3 id="part-1">4. <abbr title="Operating System">OS</abbr>/Browser-level Preference</h3>

<ol style="line-height: var(--line-height-small);" aria-hidden="true">
    <li style="color: oklch(from currentColor l c h / 0.6);"><a href="#part-2">Element-level Override</a></li>
    <li style="color: oklch(from currentColor l c h / 0.6);"><a href="#part-2">Page-level Override</a></li>
    <li style="color: oklch(from currentColor l c h / 0.6);"><a href="#part-3">Site-level Preference</a></li>
    <li class="strong">OS/Browser-level Preference</li>
</ol>

To begin with, we should make sure to include this `meta` tag in the `head` of our page(s). This <q>indicates a suggested \[colour\] scheme that user agents should use for a page</q> ([MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/name/color-scheme)).

```html
<meta name="color-scheme" content="light dark">
```

Next, we need to indicate in our CSS what colour schemes we want to have available, and we can apply this to the document root (`<html>` in *most* cases) and the cascade will apply the appropriate colour scheme to the entire document:

```css
:root {
	color-scheme: light dark;
}
```

This, alone, allows us to write CSS that responds dynamically to the *OS/Browser-level Preference* for a light or dark colour scheme. Where colours are concerned in our CSS, we can use the `light-dark()` function to hook into which of the two colour schemes is active and provide an appropriate colour for both conditions.

Also, because we’ve written `light dark`, we have indicated that where an *OS/Browser-level Preference* does not exist, we should default to the first value. This means that in the absense of all preferences and overrides, the default colour scheme will be the `light` one. If we had instead written `dark light`, the `dark` colour scheme would be the default.


<h3 id="part-2">1 & 2. Element-level & Page-level Overrides</h3>

<ol style="line-height: var(--line-height-small);" aria-hidden="true">
    <li class="strong">Element-level Override</li>
    <li class="strong">Page-level Override</li>
    <li style="color: oklch(from currentColor l c h / 0.6);"><a href="#part-3">Site-level Preference</a></li>
    <li style="color: oklch(from currentColor l c h / 0.6);"><a href="#part-1">OS/Browser-level Preference</a></li>
</ol>

Next, let’s take care of Page-level and Element-level colour scheme overrides. The way I’ve chosen to do this is by creating classes for each colour scheme that can be appled to any element and use a specific colour scheme for itself and its children:

```css
.light {
	color-scheme: light;
}
.dark {
	color-scheme: dark;
}
```

We can apply these classes to the `html` element to force an entire page to use a specific colour scheme:

```html
<html class="dark">
```

Similarly, we might want a particular section of a page to always use a specific colour scheme, so we can apply the class to a wrapper element and allow the `color-scheme` value to cascade to its children:

```html
<main class="light">
	...
</main>
```


<h3 id="part-3">3. Site-level Preference</h3>

<ol style="line-height: var(--line-height-small);" aria-hidden="true">
    <li style="color: oklch(from currentColor l c h / 0.6);"><a href="#part-2">Element-level Override</a></li>
    <li style="color: oklch(from currentColor l c h / 0.6);"><a href="#part-2">Page-level Override</a></li>
    <li class="strong">Site-level Preference</li>
    <li style="color: oklch(from currentColor l c h / 0.6);"><a href="#part-1">OS/Browser-level Preference</a></li>
</ol>

The last part is unfortunately the most complex, so let’s dive in and flesh out how we can allow website visitors to override their *OS/Browser-level Preference* *without* stepping on top of our *Page-level/Element-level Overrides*.

To start with, I’m using [David Darnes’](https://darn.es/) web component, [`<storage-form>`](https://github.com/daviddarnes/storage-form/), to capture the *Site-level Preference*. This works by wrapping a `<form>` that contains a `<select>`. The `<storage-form>` web component listens for selection changes on the `<select>` value and saves those changes to local storage.

```html
<storage-form>
	<form autocomplete="off">
		<select name="color-scheme">
			<optgroup label="Select a colour scheme">
				<option value="" selected>OS Default</option>
				<option value="light">Light</option>
				<option value="dark">Dark</option>
			</optgroup>
		</select>
	</form>
</storage-form>
```

From then on, whenever the web component’s JavaScript finds the same `<select>` (matched by `name` attribute) on subsequent page loads or on other pages, it will modify the selected `<option>` in the DOM to match the local storage value.

This takes care of persistence of *Site-level Preferences*. I cannot overstate how amazingly powerful this little web component is! I use it every time I need to manage some sort of <q>state</q> on my website.

What’s great about this approach is that we can leave `<storage-form>` alone from here and continue using CSS to control and manage how we respond to different colour schemes. We can build selectors that match when a particular `<option>` is selected (i.e., `checked`), and using the `:has()` selector, we can then apply a specific colour scheme based on that selection:

```css
:root:has([name="color-scheme"] [value="light"]:checked) {
	color-scheme: light;
}
:root:has([name="color-scheme"] [value="dark"]:checked) {
	color-scheme: dark;
}
```

So when the `light` option has been selected, we are applying the light colour scheme to the document root, and vice versa for the `dark` option.


<h3 id="part-4">A nod to performance</h3>

Before we can put everything together, there are some problems we need to address.

Firstly, we need to think about *how* we initiate the JavaScript that defines the `<storage-form>` web component because until it is loaded, the *Site-level Preference* that exists in local storage won’t have been mirrored onto the `<select>` on the page. At present, we’re *relying* on the value of the `<select>` to apply a *Site-level Preference*.

This gives us some options and a choice to make.

We *could* instantiate the web component in the `head` of our page(s) and be sure that by the time the HTML parser reaches our `<storage-form>` and `<select>`, the browser will know what to do with it, and the correct colour scheme will be applied; however, this will block the parsing of HTML while the entirety of the web component’s JavaScript is being processed.

We might think to defer the script or run it asynchronously, but no matter how we slice it—loading the JavaScript before the HTML or vice versa—we’re going to run into an unsightly problem. The effect will be more pronounced on slower devices and/or slower connections, but there *will* be a period of time where some portion of HTML has been parsed and rendered *before* the locally-stored colour scheme value has been applied to the HTML. Depending on how different in brightness the light and dark colour schemes are, this can result in an intense shift from light to dark or dark to light before and after the locally-stored colour scheme value is applied.

What *I’ve* done to solve this is to defer the loading of the JavaScript that initiates the web component and instead include a small snippet of (minified) JavaScript in the `<head>` that *is technically* parser-blocking, but will reliably run (or fail) very quickly.

```javascript
const COLOR_SCHEME = localStorage.getItem("color-scheme");
if (COLOR_SCHEME) {
	document.documentElement.setAttribute("data-color-scheme", COLOR_SCHEME);
}

window.addEventListener("load", () => {
	document.documentElement.removeAttribute("data-color-scheme");
});
```

What this does is independently check the browser’s local storage for the same value that gets set by the `<select>` in the `<storage-form>` web component. *If* a value is found, then it sets a data attribute on the document root. When the window has finished loading, this means that the `<storage-form>` JavaScript has completed, so the data attribute on the document root gets removed, allowing the CSS selector based on the `<select>` value (which is now in parity with local storage) to once again take control.

We can apply some further CSS that will apply the correct colour scheme during this <q>in-between</q> state when the data attribute is present on the document root:

```css
[data-color-scheme="light"] {
	color-scheme: light;
}
[data-color-scheme="dark"] {
	color-scheme: dark;
}
```

<h3 id="part-5">Review and Refactor</h3>

Let’s put all of our CSS together. We’ll combine our initial `:root` declaration alongside two other declarations, one for each of two groups, selectors that should apply the light colour scheme and selectors that should apply the dark colour scheme.

*<span class="strong" style="color: color-mix(in oklab, currentColor, var(--color-maple));">Warning!</span> The CSS below is not the full solution! Keep reading below to learn about what we need to do to fix its problems.*

```css
:root {
	color-scheme: light dark;
}

:root:has([name="color-scheme"] [value="light"]:checked),
[data-color-scheme="light"],
.light {
	color-scheme: light;
}
:root:has([name="color-scheme"] [value="dark"]:checked),
[data-color-scheme="dark"],
.dark {
	color-scheme: dark;
}
```

Unfortunately, while this CSS does target the different parts of the DOM that we need, there are a few last considerations to make before this will preserve the order of preferences and overrides that we want. We’re going to use two important features of CSS to help us tailor things to do that.

First of all, we can amend our first declaration with the `:where()` selector. This selector *nullifies* the specifity of all selectors inside it, so when our `:root` selector becomes `:where(:root)`, it has a specificity of `(0,0,0)`. This makes it very easy to *out-specify* later on.

```diff-css
-:root {
+:where(:root) {
	color-scheme: light dark;
}
```

Next, we’ll consider the three methods of control (`<select>` value, data attribute, class) and which should be more specific.

The `<select>` value selector and data attribute selector can be treated as one—that is to say that their specificity in this hierarchy should be identical, as they both *actually* represent the same thing, the value of the `<select>`.

Based on the hierarchy that we want, the specificity of the class-based controls should be higher than the `<select>` value and data attribute controls.

Let’s consider the specificity of the three selectors in each group:

<table class=" [ zebra ] ">
    <tbody>
        <tr>
            <th><code style="white-space: pre-wrap;">:root:has([name=color-scheme] [value=light]:checked)</code></th>
            <td>(0,4,0)</td>
        </tr>
        <tr>
            <th><code style="white-space: pre-wrap;">[data-color-scheme=light]</code></th>
            <td>(0,1,0)</td>
        </tr>
        <tr>
            <th><code style="white-space: pre-wrap;">.light</code></th>
            <td>(0,1,0)</td>
        </tr>
    </tbody>
</table>

Given that their specificities don’t align with what we want, we can leverage a second important feature of CSS, source order.

Let’s use the `:where()` selector again to nullify the specificity of the `<select>` value selector and data attribute selector:

```diff-css
-:root:has([name="color-scheme"] [value="light"]:checked),
-[data-color-scheme="light"],
+:where(:root:has([name="color-scheme"] [value="light"]:checked)),
+:where([data-color-scheme="light"]),
.light {
	color-scheme: light;
}
-:root:has([name="color-scheme"] [value="dark"]:checked),
-[data-color-scheme="dark"],
+:where(:root:has([name="color-scheme"] [value="dark"]:checked)),
+:where([data-color-scheme="dark"]),
.dark {
	color-scheme: dark;
}
```

But why do this? Won’t they have the same specificity as the `:where(:root)` declaration?

They **do** have the same specificity `(0,0,0)`, but, **critically**, they come *after* the `:where(:root)` declaration in source order. This means that our new `<select>` value and data attribute selectors take precedence over `:where(:root)`.

I’ve inlined the specificity of each selector to demonstrate this below:

```css
/**
 * (0,0,0) — 1st in source order
 */
:where(:root) {
	color-scheme: light dark;
}

/**
 * Order of selector specificities below:
 * (0,0,0) – 2nd in source order
 * (0,0,0) – 2nd in source order
 * (0,1,0)
 */
:where(:root:has([name="color-scheme"] [value="light"]:checked)),
:where([data-color-scheme="light"]),
.light {
	color-scheme: light;
}
:where(:root:has([name="color-scheme"] [value="dark"]:checked)),
:where([data-color-scheme="dark"]),
.dark {
	color-scheme: dark;
}
```

--------

<h2 id="part-6">Fin.</h2>

At this point, the build is complete! For the most part, the code involved in this solution *rarely* needs amending or changing, so I tend to put it wherever you might find things like resets in my CSS.

We can make powerful use of the `light-dark()` function to toggle between colour values depending on the active colour scheme, e.g.:

```css
main {
	background-color: light-dark(#e1e1e1, #1e1e1e);
	color: light-dark(#1e1e1e, #e1e1e1);
}
```

Furthermore, because we’ve set up a hierarchy for the controls that we’ve made available to us, we’ve instructed our styles to hook into visitors’ *OS/Browser-level Preference*. If they’d rather not let their OS/Browser dictate their preference, they can use the `<select>` to choose a *Site-level Preference* that will persist across tabs, windows, and even sessions, thanks to the power of local storage.

We’ve also thought about user experience and poor-performance situations by introducing a light sprinkling of JavaScript. Despite incurring a small performance impact itself, this gives us the tremendous benefit of applying a chosen colour scheme to the page as *early* as possible to prevent the *wrong* colour scheme from being shown *before* the heftier parts of this solution have had a chance to make their impact.

On top of that, we, as website authors, can override the user’s *Site-level Preference* to be able to say that certain pages or parts of pages should *always* be rendered with a specific colour scheme.

<c-details class="no-border no-padding">
<summary>Full CSS Solution</summary>

```css
:where(:root) {
	color-scheme: light dark;
}

:where(:root:has([name="color-scheme"] [value="light"]:checked)),
:where([data-color-scheme="light"]),
.light {
	color-scheme: light;
}
:where(:root:has([name="color-scheme"] [value="dark"]:checked)),
:where([data-color-scheme="dark"]),
.dark {
	color-scheme: dark;
}
```

</c-details>

#### Bonus!

Although it isn’t stable across browsers yet, the [`if()` selector](/feature-watch/#css-if) will allow us to toggle non-colour property values based on the resolved colour scheme. This is great for things like changing a `background-image` based on the colour scheme. That would look something like this:

```css
background-image: if(color-scheme(light): url("/light.png"); else: url("/dark.png"));
```

--------

<h2 id="part-7" class="silly">Fin. Part 2: Electric Boogaloo</h2>

We can actually take this one step further without *much* extra CSS, and this gives us the ability to set a Page-level or Element-level colour scheme that is more of a *suggestion* than a *rule*, and can be overridden by a *Site-level Preference*.

This gives us two new ways to apply colour schemes to our pages and an amended hierarchy of how colour schemes can be applied:

<ol style="line-height: var(--line-height-small);">
    <li style="color: oklch(from currentColor l c h / 0.6);"><a href="#part-2">Element-level Override</a></li>
    <li style="color: oklch(from currentColor l c h / 0.6);"><a href="#part-2">Page-level Override</a></li>
    <li style="color: oklch(from currentColor l c h / 0.6);"><a href="#part-3">Site-level Preference</a></li>
    <li class="strong">Element-level Suggestion</li>
    <li class="strong">Page-level Suggestion</li>
    <li style="color: oklch(from currentColor l c h / 0.6);"><a href="#part-1">OS/Browser-level Preference</a></li>
</ol>

```diff-css
:where(:root) {
	color-scheme: light dark;
}

+:where(:root:has([name="color-scheme"] [value=""]:checked):not([data-color-scheme], .light, .dark)) {
+	&:where(.suggested-light),
+	& :where(.suggested-light) {
+		color-scheme: light;
+	}
+	&:where(.suggested-dark),
+	& :where(.suggested-dark) {
+		color-scheme: dark;
+	}
+}

:where(:root:has([name="color-scheme"] [value="light"]:checked)),
:where([data-color-scheme="light"]),
.light {
	color-scheme: light;
}
:where(:root:has([name="color-scheme"] [value="dark"]:checked)),
:where([data-color-scheme="dark"]),
.dark {
	color-scheme: dark;
}
```

<div class=" [ box  box--warning ] ">
    <p>This introduces a rather unwieldy selector, <code style="white-space: pre-wrap;">:where(:root:has([name="color-scheme"] [value=""]:checked):not([data-color-scheme], .light, .dark))</code>, so let’s break down what it does:</p>
    <ul>
        <li><code style="white-space: pre-wrap;">:root:has([name="color-scheme"] [value=""]:checked)</code> checks if the <code>&lt;select&gt;</code> on the page has its default value but targets the document root when applying styles. When this is the case, it means that the user has selected neither <code>light</code> nor <code>dark</code> as their <em>Site-level Preference</em>.</li>
        <li><code style="white-space: pre-wrap;">:not([data-color-scheme], .light, .dark)</code> ensures that the document root has neither a <code>data-color-scheme</code> attribute nor the classes <code>light</code> or <code>dark</code> applied to it.</li>
        <li><code>:where(...)</code> makes sure that this complex selector has a specificity of <code>(0,0,0)</code>. This ensures that it doesn’t compete in specificity with other important parts of this solution, but rather takes a specific place in the source order to help define its place in the hierarchy (see below).</li>
    </ul>
</div>

The two extra classes that this introduces, `.suggested-light` and `.suggested-dark`, can be applied to our HTML in the same way as our previous classes (`.light` and `.dark`), but the important thing to note here again is the source order.

By placing these declarations *between* the two parts of our previous solution (and matching the specificity of `(0,0,0)`), they receive *higher* precendence than the *OS/Browser-level Preference* but *lower* precedence than the *Site-level Preference*.

This can be useful in situations where, for artistic reasons, you'd like a particular page or section to be a specific colour scheme, but if the user has set a *Site-level Preference*—maybe for reasons relating to eyesight or otherwise—then that choice should be respected and the particular page/section should be rendered as they’ve chosen, *not* from your <q>suggested</q> colour scheme.

<hr class=" [ no-rss ] ">

<h2 id="try" class=" [ no-rss ] ">Try it out</h2>

<div class=" [ box  box--success ] [ line-length  center ] [ skip-wordcount  no-rss ] " style="margin-inline: auto; margin-block-end: var(--size-large);">
    <p><a href="#top">Jump to the top</a> and <a href="#settings">open the settings modal</a> to <a href="#color-scheme-selector">toggle the colour scheme</a>. (See: <q>Light/Dark</q>).</p>
</div>

<div class=" [ demo ] [ box ] [ no-rss ] ">This section will always use the resolved colour scheme, <code>light</code> <em>or</em> <code>dark</code>, based on the hierarchy of controls.</div>

<div class=" [ demo ] [ box ] [ light ] [ no-rss ] ">This section will always use the <code>light</code> colour scheme.</div>

<div class=" [ demo ] [ box ] [ dark ] [ no-rss ] ">This section will always use the <code>dark</code> colour scheme.</div>

<div class=" [ demo ] [ box ] [ suggested-light ] [ no-rss ] ">This section will use the <code>light</code> colour scheme as a <em>suggestion</em>, but if the user has selected a <em>Site-level Preference</em> or a <em>Page-level Override</em> exists, that will be used instead.</div>

<div class=" [ demo ] [ box ] [ suggested-dark ] [ no-rss ] ">This section will use the <code>dark</code> colour scheme as a <em>suggestion</em>, but if the user has selected a <em>Site-level Preference</em> or a <em>Page-level Override</em> exists, that will be used instead.</div>
