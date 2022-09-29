---
title: About
tagline: About me
eleventyComputed:
  description: "{{ site.description | safe }}"
---

Hey, I’m <span class=" [ canada ] ">Chris</span>, and thanks for checking out my website! I’ve got a [CV](/cv/) too, if you’re interested.

<figure>
    {% image './images/content/rachel-and-i.jpg', 'Chris Burnell', ' [ canada ] ', [500, 672, 1000] %}
</figure>

The web is my passion and my website is my favourite thing that I own, something which I hope shines through my work and the way that I communicate about it. I believe the web to be one of the most powerful catalysts for change, and I consider it both my duty and responsibility to help curate and protect the future of the web to ensure it’s a catalyst for good. Helping people feel empowered, knowledgable, safe, and in-control of their experiences online is the uncompromising motive behind everything that I do.

Although my love for the web extends across multiple fields and disciplines, I am most interested and capable in the world of Front End. This manifests in my desire to create accessible, performant, and future-friendly websites, where the end-user is the most important stakeholder in every decision that I make.

I feed this desire by continuously finding myself in <q>rabbit-hole deep-dives</q>, a phrase I use to describe deep and exhilirating research into future technologies as well as using existing technologies to do incredible things, which, more often than not, serve as inspiration for new and weighty [projects](/projects/).

If you’d like to keep up-to-date of my work, you can follow me with [RSS](/feed.xml), on [Mastodon](https://{{ author.mastodon.split('@') | last }}/users/{{ author.mastodon.split('@') | first }}), on [Twitter](https://twitter.com/{{ author.twitter }}), or on [GitHub](https://github.com/{{ author.github }}).

I also play the piano, bake bread from time to time, and play and DM Dungeons & Dragons here and there too.

## Colophon

This website was built with [Eleventy](https://11ty.dev), which I love using. It makes sense to me and has allows me all the rigid order and flexibility I want out of my website. My source code is *mostly* available for your perusal on [GitHub](https://github.com/{{ author.github }}/{{ site.repository }}).

There are also [quite a few](/archive/) different types of posts that I publish, and [the IndieWeb](https://indieweb.org) and ownership of my content is the backbone of the mentality behind it all. I support incoming [Webmentions](https://indieweb.org/webmention) against posts, which *I think* is a way cooler alternative to giving my thoughts and conversations exclusively to a social network silo; *although, I totally still use some of them, mostly for syndicating my content*.

I also serve (what I hope are unobtrusive) ads, currently coming through from [Carbon Ads](https://www.carbonads.net), whom I find to be a trustworthy and reliable service that presents sensible ads to my audience.

## Contact

<dl>
    <dt>Email:</dt>
    <dd><a class=" [ canada ] " href="mailto:{{ author.email }}">{{ author.email }}</a></dd>
    <dt>Mastodon:</dt>
    <dd><a class=" [ canada ] " href="https://{{ author.mastodon.split('@') | last }}/users/{{ author.mastodon.split('@') | first }}">{{ '@' + author.mastodon }}</a></dd>
    <dt>Twitter:</dt>
    <dd><a class=" [ canada ] " href="https://twitter.com/{{ author.twitter }}">{{'@' + author.twitter }}</a></dd>
    <dt>Twitter DM:</dt>
    <dd><a class=" [ canada ] " href="https://twitter.com/messages/compose?recipient_id={{ author.twitter }}">{{ '@' + author.twitter }}</a></dd>
</dl>

## Support

On the peculiar off-chance you *really*, *really* like the work that I do, you can help support me by sponsoring me [on GitHub](https://github.com/sponsors/{{ author.github }}):

<figure>
    <iframe src="https://github.com/sponsors/{{ author.github }}/card" title="Sponsor {{ author.github }}" height="225" width="360" style="border: 0;"></iframe>
</figure>
