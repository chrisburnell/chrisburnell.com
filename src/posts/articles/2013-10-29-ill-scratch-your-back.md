---
sitemap:
  lastmod: 2015-06-06T20:20:00+0100
edit: I have revised this technique and its explanation since originally penning this article. You can jump to the updated article, <a href="https://chrisburnell.com/article/backscratching-revisited">Backscratching Revisited</a>, or continue reading.
date: 2013-10-29T00:10:00+0000
title: I’ll Scratch Your Back, And Mine Too
lede: I've been playing around with CSS content and attribute selectors recently, and came across a useful trick for styling default elements.
tags:
  - css
banner: ill-scratch-your-back.png
caniuse: true
syndicate_to:
  - https://twitter.com/iamchrisburnell/status/395115858814840833
---

When building a site for a client who isn’t very tech-savvy, it’s important that they’re able to publish their content with the variety of options to style and format their text that are available on the web, usually in the form of a <abbr title="What You See Is What You Get">WYSIWYG editor</abbr>, which saves them the trouble of learning how to write HTML (and retain that knowledge). As a web developer, it’s then important that the CSS we write matches the output of the editor’s content. Fortunately, most of the time the editor will spit out plain old HTML with all the normal tags you’re used to.

So, for example, if an editor creates an article with lists and pictures, it’s important that our code doesn’t mistake these basic elements for something else, and apply extra styles which we’re trying to apply to a smaller subset of the given element, which we usually denote with a <abbr title="A class is a label which is assigned to element(s) to distinguish it from like elements.">class</abbr>.


<h2 id="lets-look-at-some-code">Let’s look at some code</h2>

Say we want the default ordered list to appear with `padding-left` and `list-style` that differ from the user agent stylesheet ([a whole other ballgame](https://necolas.github.io/normalize.css/ "Normalize.css")). We also have a table of contents for our template, which we’ll also use an ordered list to mark up in HTML.

```html
<ol class="table-of-contents">
    <li>Chapter 1</li>
    <li>Chapter 2</li>
</ol>
```

And the CSS:

```css
ol {
padding-left: 4em;
    list-style: outside decimal-leading-zero;
}
/* overqualified selector only for example: */
ol.table-of-contents {
    padding-left: 0;
    list-style: none;
    margin-bottom: 1em;
}
```

Due to the cascading nature of CSS, the styles we’ve given to our default ordered list will *cascade* to our table of contents! As a result, we have to *unset* the `padding-left` and `list-style` we *just* applied. This is a waste of precious code!


--------


In experimenting with CSS content and attribute selectors, I’ve discovered a neat trick to apply styles to elements **without** a class, with the caveat that you’re styling the rest of the elements **with** classes. In my opinion, this is best practice anyway as part of a movement towards a modular approach to CSS.


<h2 id="here-it-is">So here it is:</h2>

```css
ol:not([class]) {
    padding-left: 4em;
    list-style: outside decimal-leading-zero;
}
```

## What’s going on here?

We’re saying that <q>for every ordered list that doesn’t have a class attribute, apply some styles.</q> Normally, the attribute selector, `[ ]`, is used to style external links or elements with a specific `rel` attribute, but in this case we’re using the barebones and **only** checking for the instance of a class attribute at all.

Normally in CSS, we would use `.` to target an element by *class name*, but we can also use an attribute selector: `[class=table-of-contents]`. This will match elements with the class, `table-of-contents`, but what’s nice about CSS3’s attribute selectors is that they can be used like a boolean to check for the attribute’s (or multiple attributes’) existence only.


--------


In this way, we’re able to style some default elements that a content editor would output onto a page without having to *repeatedly un-style* them later on where they’re not needed. This technique has broad support—everything except IE8 and older works just fine, but, as always, check [Can I Use](http://caniuse.com/#search=css-sel3 "Can I Use - CSS3 selectors") for the specifics.

{% caniuse 'css-sel3' %}


--------


If you have any comments or performance notes about this, please let me know in the [comments below](#comments) or [on twitter](https://twitter.com/iamchrisburnell).
