---
date: 2022-05-11T19:07:00+0100
title: Changing with the times
description: Lessons learned, pieces of wisdom (and folly), and other things I have to say after running a website blog for a while.
tags:
  - eleventy
  - html
  - personal
---

Now, I don’t exactly *publish* a lot of content, but I do like to think about how I *present* and *structure* the content of my website, and after nine years and over 5000 git commits—am I working smart or working hard?… There are some important lessons I’ve internalised over the years and some philosophies core to my website’s success that I’d like to share.

## Eliminate barriers to authoring and publishing

Really just a fancy way of saying <q>Keep It Simple, Stupid</q>!

When I first got my hands on Jekyll at this blog’s inception, I went a big off-the-rails with over-engineered ways to optimise and keep my blog posts <q>clean</q>, even so far as using *shortcodes* as a way of adding <dfn title="links that allow the user to jump to a specific part of a page">skip-links</dfn> to headings, rather than using Markdown’s terse and readable syntax. Not only did this add bloat to the build time of my website, but more importantly, made authoring new posts cumbersome. Further, as months passed and I didn't write for a while, returning to this style of authoring was extremely unwieldy, and I’m the one who wrote it all!

This is all to illustrate that you should aim to give yourself as much freedom to write the ideas you want to express, rather than get lost in the weeds of syntax. Nowadays, I write my headings using Markdown’s standard syntax and let my build script take care of adding skip-links to them. I enjoy writing using Markdown, so I do what I can *outside* of my Markdown files to achieve what I need, allowing me to focus on writing when I want to write, and not programming.

This also applies to publishing. Whether coincidence or *destiny*, my preference for writing with Markdown works well with the website I have. This means that when it comes to actually publishing what I’ve written, I don’t need to prepare a bunch of code-specific metadata. As it applies to my blog posts in particular, this means taking advtantage of [default/cascading data](https://www.11ty.dev/docs/data-cascade/) so that, once again, the heavy lifting on the programming side of things is handled, wherever possible, *outside* of where I write, the Markdown files. This has a huge effect in reducing my mental overhead when writing new content, which is *always* welcome!

## Trust in HTML, it knows what it’s doing

It probably comes as no surprise that, as someone who’s made an egregious number of changes, reverts, tests, features, and bugs on this website, I’ve also gone through an atrocious number of minute iterations to the design over the years as well. Throughout that time, the most robust and resilient pieces of markup and functionality that have survived have been plain, old HTML. Nothing more fancy than that.

I think, with the sheer volume of functionality available to us nowadays on the front end, it can be easy to forget how powerful and strong the functionality is that we get right off shelf with HTML. Yes, you read that right, *functionality*.

Think about how much JavaScript you would have to write to replicate something like the `<details>` element. Think about how much JavaScript *you’ve seen* out in the wild *attempting* to replicate something akin to the `<details>` element. What about an `<input>` element? 🤯 Mindblowing to think about.

But what’s *even more mindblowing* is this: the functionality that we get from HTML elements *for free* works in *all the browsers (well, mostly… work with me here)*, they don’t require a single line of JavaScript, or for JavaScript to be on *at all*, and don’t even get me started on the portability of these things.

The point is, by making proper use of HTML’s wide array of powerful elements, suitably chosen for the needs at hand, I’ve saved myself countless hours and given my code an ephemeral quality by relying on HTML, rather than weaving a transient web of my own.

## Just write. Just publish.

On the eve of [State of the Browser 2018](https://2018.stateofthebrowser.com/), while enjoying a beer at a favourite pub, I was meekly voicing my personal worries and concerns whenever I write and try to publish my work, and the fact that everything that I wanted to write about had already been covered more eloquently and in more detail than me. [Dave Letorey](https://letorey.co.uk) and [Jeremy Keith](https://adactio.com/) then gave me some of the most powerful advice of my entire <q>career</q> (paraphrased):

<blockquote>
    <p>But no one has read an article on that subject that was written by <strong>you</strong>.</p>
    <cite>Dave Letorey and Jeremy Keith (roughly)</cite>
</blockquote>

Don’t underestimate yourself. The context and viewpoint that you have on the world is entirely unique and your own. *Who* are you writing for? What level of *expertise* and *detail* are you hoping to convey to the reader? Identify a goal for your words and make them work towards that goal, and you’ll find you end up with something *oozing* with expertise, detail, and tremendous value. And don’t be shy to seek out feedback and create discourse around what you know and like to talk about!
