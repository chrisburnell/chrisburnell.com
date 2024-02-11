---
published: false
date: 2022-01-21T22:43:00+0000
title: Finding Purpose in CSS
tags:
  - css
  - html
  - writing
in_reply_to:
  title: Writing CSS with Purpose
  url: https://binyam.in/p/writing-css-with-purpose/
---

I think you hit the nail on the head with this one.

As I like to think CSS is my strongest language (the ego on this guy, honestly), your simile with the layout of a keyboard was spot on—*layout*, in particular, is the most fundamental piece of a strong understanding of CSS for me. Beginning with understanding what defines an inline element versus a block element (**block formatting contexts**) and from there understanding, on some shallow level, at least, that everything on a webpage can be seen a series of boxes flowing naturally here and standing rigidly there.

I think that’s a step a lot of new developers inadvertently skip because the big pieces of a website that we look at are made using Flex or Grid. The ironic reality is that most people aren't looking at websites through the lenses of a creator; they’re there to consume the content. By that I mean that they're not paying attention to the way the navigation wraps real sweet at a particular breakpoint and how the colours are managed in a tidy design system, they're looking at paragraphs, headings, tables, lists—these aren't places where <q>newfangled</q> CSS comes much into play, but they make up a staggering majority of our websites. Understanding how to present the *meat and potatoes* of a website is important.

From there, expand your repertoire by exploring Flex, a *one-dimensional* method for layout, understanding how the different properties play with each other, *particularly* between the `row` and `column` directions (which one do I need again, `align-items` or `justify-content`?…).

Moving from there to Grid, a *two-dimensional* method for layout, you will realise that you're by no means starting fresh; many of the properties and how they play together will carry over and work in similar, if not the same ways.

I've deliberately spoken little towards <q>mastering</q> Flex or Grid because the fundamental, *OG* ways of layout are that important to me, and work so well in our favour, in fact, that even with *zero CSS applied at all*, HTML still works and serve its purpose. Tied to an understanding of CSS is a crucial necessity to have some understanding of which HTML elements adopt which defaults, e.g. a `div` is a block element, by default, but so is a `nav` element… What makes the most semantic sense? How much of the visual layout of a page can be *predicted* simply by looking at the HTML with an understanding of the default properties of elements and the trust that the CSS isn't working against nature? (A tremendous amount, in my experience!)

Writing CSS with purpose, to me, is about seeing what little you need to do in order to achieve a particular layout. Like playing music, if you only work on your C major scales, you're not likely to perform so hotly on the many, many others. Expose yourself to as much variety in CSS as you're comfortable with, explore, truly play the <q>guess and check</q> game until it clicks, or whatever works best for you, and remember that practice makes perfect!

--------

That's the end of my rambling! I hope my two cents has some value for you. 😄
