---
date: 2024-05-17T23:58:16+0800
title: The Open Source Dilemma
description: In this short post, I discuss some thoughts I’ve been mulling over about the open source nature of my website, particularly after a great discussion I had with [fLaMEd](https://flamedfury.com) that galvanised some of my recent feelings about ownership on the web.
tags:
  - weblogpomo
  - weblogpomo2024
  - jekyll
  - eleventy
  - state-of-the-web
---

If you don’t know, the source code of this website (well, *most* of it) is freely-available to browse through [on GitHub](https://github.com/chrisburnell/chrisburnell.com). This has been the case for nearly 11 years now, ever since my <q>Initial commit</q> on <time datetime="2013-05-30T03:48:54-0700">the 30<sup>th</sup> of May, 2013</time>.

For a good seven years, my website was built using [Jekyll](https://jekyllrb.com), a static site generator, and was hosted on [GitHub Pages](https://pages.github.com) (which was and is still free). I was pretty enamoured with how much fluff and complication was taken out of the picture by that setup; chiefly, what I really liked about it was how many barriers it broke down for less technical folks to build and publish their own websites. (It’s no wonder I was later drawn to the [IndieWeb](https://indieweb.org) so quickly!)

While there were (and are) a great number of excellent plugins authored for Jekyll, there are far fewer that are actually supported:

<blockquote>
    <p>GitHub Pages cannot build sites using unsupported plugins. If you want to use unsupported plugins, generate your site locally and then push your site's static files to GitHub.</p>
    <cite><a href="https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/about-github-pages-and-jekyll#plugins">GitHub Pages Docs</a></cite>
</blockquote>

So even from the outset, I decided that I wanted to build my entire website only out of the bits and pieces of Jekyll that come with GitHub Pages. This meant making some sacrifices for the more complex parts of my website, where I had to hand-write out all sorts of wacky logic using Liquid, Jekyll’s templating language of choice. On the other hand, this also meant that the entirety of my website could act as an example of what was possible to build with a free GitHub Pages website for folks of all skill levels.

I put a tremendous amount of work into my website, not just for me, but for anyone else who was curious how the sausage was made, so to speak.

During this time, I had also dipped my toes into running my own server, getting my head around [nginx](https://nginx.org), poked and patched enough holes in the back-end of a website or two, and finally had enough knowledge under my belt to host my website myself.

On <time datetime="2020-08-06T15:33:03+0000">the 6<sup>th</sup> of August, 2020</time>, after discovering [Eleventy](https://www.11ty.dev), I pushed the first commit to my repository for the next big iteration of my website. From then on, my website has been built with [GitHub Workflows](https://docs.github.com/en/actions/using-workflows) and deployed to my server.

Despite this major change to the construction of my website, I still keep the source code of my website open and public. Because the landscape of publishing websites is a lot more forgiving nowadays—you don’t *need* your own server to deploy websites of many different kinds as you once *did need*—I’m able to make full use of the wide and wonderful ecosystem of plugins (and more) that are freely-available for Eleventy.

No more did I have to contend with the double-edged sword that was having my website’s source code public *and* easily-replicated. Indeed, the two edges became one; I was free to explore and go in any direction I pleased with the build of my website.

--------

Now, don’t get me wrong, I *love* open-source software and contributing to the wealth of free and public knowledge for others to learn and replicate for their own work, but I’ve been having some second thoughts about the very fact that my website’s *entire* (again, *almost* all of it) source code is shared with the World Wide Web.

I think these feelings have been brought on by two things:

1.
    The proliferation of AI and the gratuitous pilfering of all this hard work and intellectual property by <abbr title="Large Language Models">LLMs</abbr> and their ilk. My website has a [license](/license/) that permits sharing and adaptations under the condition that doing so gives me appropriate credit, is used for non-commercial purposes, and is distributed under the same license. It’s feeling more and more like that license and its conditions are **completely and utterly meaningless and disregarded** now.

    How much do I really want to contribute to these companies and machines out to harvest my data and work for their own gain?

    **Nothing.** I want to give them **nothing at all** is the answer.

2.
    Forks are a great feature of version control software, and I’ve made a good number of them as a way to contribute to open-source projects and participate with various web-related events and initiatives.

    That feeling twists into an awkward shape when you discover that your repository for your own *personal website* has been forked. Now someone that you may not know (and may be completely anonymous) has a copy of not just the templating and logic, but also all of your posts, unfinished drafts, media, everything. What stops them from removing the license, leaving everything else as it is, and allowing that to propagate out to wherever it will?

    I don’t at all mind sharing how my website is built, but what happens when you discover that someone has taken your code, line for line, and used it for their own projects? They probably haven’t learned anything, so mission *not* accomplished in that regard. It seems like having a license is meaningless and disregarded here too.

--------

So what am I doing about it?

I’m not sure yet. In 2022, [Wouter Groeneveld](https://brainbaking.com) shared his thoughts and a powerful message about leaving GitHub behind in his post, [Give Up GitHub!](https://brainbaking.com/post/2022/07/give-up-github/), that I’ve been thinking about a lot lately. I’m going to seriously consider running my own git instance, following the sage wisdom (and even instructions!) in Wouter’s article.

There’s something to be said about the positives that come with hosting code on GitHub; it gives my projects more discoverability, provides many great tools (primarily continuous integration), and creates a real sense of being when you can see your work being used by others in your community. However, like when I permanently left Twitter, I think I’ll get over it. I’d prefer to put my chips on personal websites, RSS, decentralised networks, and my own hard work to achieve these things than to keep standing on this uncertain and unsettling ground.

There are other avenues to consider as well. CloudCannon also recently released a feature called [Site Mounting](https://cloudcannon.com/documentation/articles/site-mounting/):

<blockquote>
    <p>Site Mounting makes one site dependent on one or more other CloudCannon sites. Files from a remote site will be accessible to the local site at build time, and any updates to the remote site will trigger a build of the local site.</p>
    <cite><a href="https://cloudcannon.com/">CloudCannon</a></cite>
</blockquote>

This is a *really* intriguing concept. Rather than completely shut down the contributions I may be making to the open web by making my website’s source code completely private, I could have one set of code that contains the scaffolding and logic required to build my website, and keep the *contents* of my website (posts, drafts, media, etc.) somewhere private.

I am almost-suredly going to explore this idea. While it certainly won’t stop bad actors from scraping my website or grabbing my content in other ways, it definitely makes it harder to do, and, at the very least, means the original and exact source code for my *content* would be unknown. You can bet I’ll continue doing what I can to [block AI crawlers](https://coryd.dev/posts/2024/go-ahead-and-block-ai-web-crawlers/) in that case; although, I feel like it’s a game of cat-and-mouse that we’ve all been subjected to now, just by being citizens of the web.

A lot to think about. I’d love to hear your thoughts and ideas.

--------

{% include 'weblogpomo2024.njk' %}
