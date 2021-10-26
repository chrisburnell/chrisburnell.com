---
title: About
tagline: About me
eleventyComputed:
  lede: "{{ site.lede | safe }}"
---
{%- from 'macros/deckItem.njk' import deckItem -%}

<figure>
    <picture>
        <source type="image/webp" srcset="/images/content/rachel-and-i.webp" />
        <img src="/images/content/rachel-and-i.jpg" alt="Chris Burnell">
    </picture>
</figure>

Hey, I’m <span class=" [ canada ] ">Chris</span>. Thanks for checking out my website.

The web my passion—my website is my favourite thing that I own. I believe the web to be a powerful agent for change and empowering people, and I love nothing more than helping people feel connected, knowledgable, and in-control of their experience online.

For the most part, I live in the world of front-end, mostly to do with CSS and performance; although, in recent years I’ve been more and more interested in the wider world of web development. With the emergence of ES6, I’ve grown particularly keen on JavaScript and have really enjoyed rebuilding my website using Eleventy. I also continue to tinker other technologies to help support my website as part of the [IndieWeb](https://indieweb.org/) and my other <q>rabbit-hole deep-dives</q>, a phrase I use to describe sudden bursts of motivation and inspiration into new and weighty [projects](/projects/).

If you’d like to keep up-to-date of my work, you can follow me with [RSS](/feed.xml), on [Twitter]({{ author.urls.twitter }}), on [Mastodon]({{ author.urls.mastodon }}), or on [GitHub]({{ author.urls.github }}).

I also play the piano, bake bread from time to time, and play and DM Dungeons & Dragons here and there too.

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
