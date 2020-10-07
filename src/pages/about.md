---
title: About
eleventyComputed:
  tagline: "About me"
  lede: "{{ site.lede | safe }}"
---
{%- from 'macros/deckItem.njk' import deckItem -%}

<figure>
    <picture>
        <source type="image/webp" srcset="/images/content/rachel-and-i.webp" />
        <img src="/images/content/rachel-and-i.jpg" alt="Chris Burnell" loading="lazy">
    </picture>
</figure>

Hey, I’m <span class=" [ canada ] ">Chris</span>. Thanks for checking out my website.

<div class=" [ box ] ">I’m looking for new full-time work right now, so please <a href="#contact">get in touch</a> if you’d like to have a chat!</div>

I’m a big fan of <q>rabbit-hole deep-diving</q>, a phrase I use to describe sudden bursts of motivation and inspiration into new and weighty [projects](/projects/).

If you’d like to keep up-to-date of my work, you can follow me with [RSS](/feed.xml), on [Twitter]({{ author.urls.twitter }}), on [Mastodon]({{ author.urls.mastodon }}), or on [GitHub]({{ author.urls.github }}).

## My Work

- **[London Web Standards](https://londonwebstandards.org) & [State of the Browser](https://stateofthebrowser.com)**

    *Organiser*

    *March 2018 – Present*

- **[Squiz](https://squiz.net)**

    *Front-End Developer*

    *February 2018 – July 2020*

- **[City, University of London](https://city.ac.uk)**

    *Web Developer*

    *June 2014 – February 2018*

- **[Squiz](https://squiz.net)**

    *Front-End Web Developer / UI Developer*

    *April 2012 – April 2014*

## Recent Projects

- **[Pentatonic](/pentatonic/)**

    Turn any array of integers into a fun little melody.

- **[Bowhead](/bowhead/)**

    A small framework on which to build your design tokens in SCSS.

- **[Micrathene](https://micro.bloodbuilder.online/)**

    Super Simple PWA for building [Microlite20](https://micro.bloodbuilder.online/docs/Microlite20.pdf) characters.

## Colophon

This website was built with [Eleventy](https://11ty.dev), which I love using. It makes sense to me and has allows me all the rigid order and flexibility I want out of my website. My source code is *mostly* available for your perusal on [GitHub]({{ author.urls.github_repo }}).

There are also [quite a few](/archive/) different types of posts that I publish, and [the IndieWeb](https://indieweb.org) is the backbone of the mentality behind it all. Naturally, I support incoming [webmentions](https://indieweb.org/webmention) against posts, which *I think* is a way cooler alternative to giving my thoughts and conversations to a social network silo; *although, I totally still use some of them, mostly to syndicate my content to*.

I also serve (what I hope are unobtrusive) ads, currently coming through from [Carbon Ads](https://www.carbonads.net), whom I find to be a trustworthy and reliable service that presents sensible ads to my audience.

## Contact

<dl>
    <dt>Email:</dt>
    <dd><a class=" [ canada ] " href="mailto:{{ author.email }}">{{ author.email }}</a></dd>
    <dt>Twitter:</dt>
    <dd><a class=" [ canada ] " href="{{ author.urls.twitter }}">{{'@' + author.twitter }}</a></dd>
    <dt>Twitter DM:</dt>
    <dd><a class=" [ canada ] " href="https://twitter.com/messages/compose?recipient_id={{ author.twitter }}">{{ '@' + author.twitter }}</a></dd>
    <dt>Mastdon:</dt>
    <dd><a class=" [ canada ] " href="{{ author.urls.mastodon }}">{{ '@' + author.mastodon }}</a></dd>
</dl>
