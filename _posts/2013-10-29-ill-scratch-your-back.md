---
layout: article
date: 2013-10-28 23:22:00
title: I'll Scratch Your Back, I'll Scratch Mine
slug: ill-scratch-your-back
introduction: I've been playing around with CSS content and attribute selectors recently, and come across a useful trick for styling default elements.
tags:
- CSS
- Tutorials
---

When building a site for a client who isn't very tech-savvy, it's important that they're able to publish their content with the variety of options to style and format their text that are available on the web, usually in the form of a <abbr title="What You See Is What You Get">WYSIWYG editor</abbr>, which saves them the trouble of learning how to write HTML (and retain that knowledge). As a web developer, it's then important that the CSS we write matches the output of the editor's content. Fortunately, most of the time the editor will spit out plain and simple HTML with all the normal tags you're used to.

So, for example, if an editor creates an article with lists and pictures, it's important that our code doesn't mistake these basic elements for something else, and apply extra styles which we're trying to apply to a smaller subset of the given element, which we usually denote with a <dfn title="A class is a label which is assigned to element(s) to distinguish it from like elements.">class</dfn>.

### Let's look at some code.

Say we want the default ordered list to appear with <code>padding-left</code> and <code>list-style</code> that differ from the user agent stylesheet ([a whole other ballgame](http://necolas.github.io/normalize.css/)). We also have a table of contents for our template, which we'll also use an ordered list to mark up in HTML.

    <ol class="table-of-contents">
        <li>Chapter 1</li>
        <li>Chapter 2</li>
    </ol>

And the CSS:

	ol {
		padding-left: 4em;
        list-style: outside decimal-leading-zero;
    }
    /* overqualified selector just for example: */
    ol.table-of-contents {
        padding-left: 0;
        list-style: none;
        margin-bottom: 1em;
    }

Due to the cascading nature of CSS, the styles we've given to our default ordered list will *cascade* to our table of contents! As a result, we have to unset the <code>padding-left</code> and <code>list-style</code> we *just* applied. This is a waste of precious code!

Well, in experimenting with CSS content and attribute selectors, I've discovered a neat trick to apply styles to elements **without** a class, with the caveat that you're styling the rest of the elements **with** classes. In my opinion, this is best practice anyway as part of a movement towards a modular approach to CSS.

### So here it is:

	ol:not([class]) {
		padding-left: 4em;
        list-style: outside decimal-leading-zero;
    }

### What's going on here?

We're basically saying that <q>for every ordered list that doesn't have a class attribute, apply some styles.</q> Normally, the attribute selector, <code>[ ]</code>, is used to style external links or elements with a specific <code>rel</code> attribute, but in this case we're using the barebones and **just** checking for the instance of a class attribute at all.

In this simple way, we're able to style some default elements that a content editor would output onto a page without having to repeatedly un-style them later on where they're not needed. Depending on when you're reading this article, check [Can I Use](http://caniuse.com/#search=not) for the statistics on using this technique.

If you have any comments or performance notes about this, please let me know in the comments below or [on twitter](http://twitter.com/iamchrisburnell).
