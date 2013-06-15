---
title: First Article Ever
slug: first-article-ever
date: 2013-05-15 13:21:00
layout: article
page_class: page-articles
introduction: Well, I've finally gotten my site up and running to a point where I can consider it to be a success. What was the process, and what did it involve? What mistakes did I make that you can avoid?
tags:
- CSS
- GitHub
- Jekyll
- Markdown
---

I can tell you it wasn't a completely smooth process. And it's not even like I'm new to migrating things or trying out new technologies&mdash;over the years, I've gone from static to WordPress to static, back to WordPress, back again to static for a long time, then I dabbled with Anchor CMS and finally settled most happily with Jekyll hosted not on my server. The problem with each of these migrations was that it wasn't easy to port the content because of how specifically I wanted each to be set up. It was basically poor planning on my part over and over again. Pretty stupid. That's where Jekyll came in; I needed a platform to host my site/blog on that wasn't going to restrict my design ideas, and it needed to be pretty future-proof if I wanted to migrate at a later time.

### What is Jekyll?

> Jekyll (<http://jekyllrb.com/>) is a simple, blog aware, static site generator. It takes a template directory (representing the raw form of a website), runs it through Textile or Markdown and Liquid converters, and spits out a complete, static website suitable for serving with Apache or your favorite web server. This is also the engine behind [GitHub Pages](http://pages.github.com), which you can use to host your project's page or blog \[on\] GitHub.

### Better, Faster, Stronger

I'm not going to give you what I *think* Jekyll does because I honestly don't know more than a few commands in Ruby, and I couldn't do it justice; I'm still quite new to using its different file structure and keywords in markup, but learning quickly. What I enjoy the most about it is the flexibility and freedom I feel as a developer working with it. Coupled with versioning on GitHub, it makes for a frictionless workflow while developing the site, and even moreso when writing&mdash;<span class="gray">(Edit: and editing)</span>&mdash; actual content.

That's something else I'm quite new to but thoroughly enjoying picking up: writing content in Markdown.

> Markdown is a text-to-HTML conversion tool for web writers. Markdown allows you to write using an easy-to-read, easy-to-write plain text format, then convert it to structurally valid XHTML (or HTML).

This is what it looks like when you're writing it:

    # This is an H1
    ### This is an H3
    > This is a blockquote
        Tabbed content becomes a code block like this one.
    This is some paragraph, and [this](http://foo.com) is a link.

<aside><p>Again, if you have any suggestions as far as the source code or post content goes, please fork [the GitHub repository](https://github.com/chrisburnell/chrisburnell.github.io) and send me a push request with your changes!</p></aside> The CSS for this latest iteration of chrisburnell.com was also a labour of love. Really being fed up with the older version of my site and having grown immensely since I pushed that update in February 2011, I started working on this design a few months ago and tinkered away at it here and there when my spare time allowed it. I did, in fact, rewrite the bulk of it twice before I got to the current state it is in.

### So, what's new in the stylesheet?

Since my last design update, I started working at [Squiz](http://squiz.net) and expanded my web development horizons exponentially, stepping into the fast-paced role of front-end web developer at their London office. Since September of last year, I've been part of a strong team at Squiz working with gambling giant, William Hill, in migrating their expansive network of sites from their previous systems onto [Matrix](http://www.squiz.net/uk/suite/matrix), an extremely powerful and flexible Content Management System. My role in the team of developers, technical leads, account and project managers was to oversee the CSS of the migration project and ensure that we're adhering to standards as part of making improvements to HTML, CSS, JavaScript, and implementation during the migration.

### More than meets the eye

Enforcing strict CSS standards goes beyond keeping an eye out for <code>!important</code>s or excessively long chained selectors&mdash;the simple pitfalls to avoid. It involved also overseeing our naming conventions and architecture of both markup and CSS. Being put in charge of this monumental task, I knew I had to step up to the plate and deliver not just as part of my job, but as a member of a closely-knit team (I'll be writing on this soon!)

Part of the challenge was realising that decisions I made at the beginning would have a profound impact on how certain aspects of the project would go further on: the naming convention, architecture of both CSS and the file structure on which Matrix (the Content Management System) was built, etc.

### Let's get down to brass tacks

During this learning phase, I adopted a number of intelligent and new technologies to take advantage of what we developers can do with CSS. This included switching from pixels to ems for font-sizes, but I took it even further and made many attributes (padding, margins, line-height, to name a few) directly related to the font-size of the particular element. I also adopted a fun technique to arrange my asides with my main content using floats and negative margin that allows me a simple transition from desktop to mobile responsive layouts as well as making the process in Markdown simple as well. It's been a flurry of knowledge into my *super-powerful* (read: tiny) brain, and these have only been a handful of the things I've learned.

I encourage everyone to approach their passions with the same aggression and vigour that I can say that I have in the past two years; the results are well and truly worth the efforts. Make time for yourself to think about difficult ideas and [experiment](http://codepen.io) often whenever anything intriguing crosses your mind. I'm really enjoying having more control over my HTML, CSS, JS as well as other new areas for me, including typography and some new design skills due to following these simple steps. Over the next few months I hope to be able to share a majority of these concepts and fundamental ideas that I learned, in hopes of creating a healthy discussion about modern technologies in front-end web development.

The most important lesson of them all, of course, is to **keep it simple**. Whether it's code or design, just stick to what you need and you're sure to find success.

### Major props

I can't take all the credit for this website, really. It's the culmination of being lucky enough to work in a field where *cream of the crop* knowledge is available for everyone, so I'm going to give a few shout-outs to some awesome people who helped me immensely.

<aside><a href="http://browser.londonwebstandards.org/gallery_2013.php"><img src="{{ site.url }}/images/articles/sotb-2013.png" class="banner  rounded"></a><p class="italic  gray">Image courtesy of [London Web Standards](http://browser.londonwebstandards.org/).</p></aside>I was lucky enough to be able to attend the annual web conference held by [London Web Standards](http://londonwebstandards.org/), [State of the Browser](http://browser.londonwebstandards.org/), which was really motivating for me, and opened my eyes to some parts of the browser space that I don't pay enough attention to. I was super fortunate to be able to be present for talks by some insanely talented and motivating people, who I'm just going to reel off here in no particular order (other than alphabetical):

- [Jake Archibald (Google)](http://www.jakearchibald.com/)
- [Martin Beeby (Microsoft)](http://blogs.msdn.com/b/thebeebs/)
- [Andreas Bovens (Opera)](http://dev.opera.com/)
- [Christian Heilmann (Mozilla)](http://christianheilmann.com/)
- [Laura Kalbag](http://laurakalbag.com/)
- [Paul Kinlan (Google)](http://paul.kinlan.me/)
- [Seb Lee-Delisle](http://seb.ly/)
- [Alp Toker (Nuanti Browser Labs)](http://www.atoker.com/)

I also have to mention a few blogs run by some clever folks because they're what gave me the knowledge that helped me really improve my CSS skills, again in no particular order:

- [A List Apart](http://alistapart.com/)
- [CSS Wizardry](http://csswizardry.com/) by [Harry Roberts](https://twitter.com/csswizardry)
- [CSS-Tricks](http://css-tricks.com/) by [Chris Coyier](https://twitter.com/chriscoyier)
- [Smashing Magazine](http://www.smashingmagazine.com/)
- [Responsive Design Newsletter](http://responsivedesignweekly.com/) by [Justin Avery](http://surfthedream.com.au/)
- [Visual Idiot](http://visualidiot.com/)

### And that's basically it!

Like I said before, I hope to be able to write about a number of topics in front-end web development and CSS in the coming months, and hopefully years! You can [subscribe (http://chrisburnell.com/feed.xml)](http://chrisburnell.com/feed.xml) if you're interested in what I have to say. If you have any feedback on this post or the design or the code, hit me up on <a href="{{ site.twitter_url }}">twitter</a> or <a href="mailto:me@chrisburnell">send me an email</a>! I hope to get comments up here soon! I'm still trying to decide between a Jekyll plugin, [Disqus](http://disqus.com/), or an alternative, so if you have any suggestions, see above. :)
