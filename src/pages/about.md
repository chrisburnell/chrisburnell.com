---
title: About
eleventyComputed:
  lede: "{{ site.lede | safe }}"
---

<figure>
    <img src="/images/content/rachel-and-i.jpg" alt="Chris Burnell">
</figure>

Hey, I’m <span class=" [ canada ] ">Chris</span>. Thanks for checking out my website.

<div class=" [ box ] ">I’m looking for new full-time work right now, so please [get in touch](#contact) if you’d like to have a chat!</div>

From 2018–2020 I worked at [Squiz](https://squiz.net) as a *Front-End Developer* where I championed heavily for CSS, worked on the foundations for using design systems, and helped to build code frameworks that aimed to strengthen communication about design elements and reduce mental overhead, as well as serve the needs of our projects.

That was, in fact, my second time working at *Squiz*—I had worked there from 2012–2014 where I cut my teeth and my interests in web were able to flourish. I always say I learned more in my first year of full-time employment than I even cumulatively knew before. I’m proud to say that I organised and ran a session called *Imp Scrum* for developers and designers to unwind for half an hour, discuss fun aspects of our work that week, learn something from a peer, build something together, etc. This drive to learn and eagerness to share set the foundation for my mentality towards development to this day.

In between those years, having already been steeping in the world of higher education websites (the majority of *Squiz’s* clients at the time), I joined [City, University of London](https://city.ac.uk) as a *Web Developer*. From 2014–2018 I contributed to a number of long-lasting behemoth projects for the university and its other schools, but most importantly for me, I was responsible for the HTML/CSS side of these projects, and it spurned my learning hugely and lead to the inception of many techniques and projects I still use today.

Since 2018, I’ve also been an *Organiser* for [London Web Standards](https://londonwebstandards.org) monthly meetups and [State of the Browser](https://stateofthebrowser.com) annual conferences ([2018](https://2018.stateofthebrowser.com), [2019](https://2019.stateofthebrowser.com)).

I’m a big fan of <q>rabbit-hole deep-diving</q>, a phrase I use to describe sudden bursts of motivation and inspiration into new and weighty [projects](/projects/).

If you’d like to keep up-to-date of my work, you can follow me with [RSS](/feed.xml), on [Twitter]({{ author.urls.twitter }}), on [Mastodon]({{ author.urls.mastodon }}), or on [GitHub]({{ author.urls.github }}).

## Colophon

This website was built with [Eleventy](https://11ty.dev). The code is *mostly* available for your perusal on [GitHub]({{ author.urls.github_repo }}).

There are [quite a few](/archive/) different types of posts that I publish, and [the IndieWeb](https://indieweb.org) is the backbone of the mentality behind it all. Naturally, I support incoming [webmentions](https://indieweb.org/webmention) against posts, which *I think* is a way cooler alternative to giving my thoughts and conversations so a social network silo; *although, I totally still use some of them, mostly to syndicate my content to*.

I’m also seeing how I feel about serving ads, currently coming through from [Carbon Ads](https://www.carbonads.net), which I find to be an unobtrusive service with ads that actually make sense for my audience.

## Contact

<dl>
    <dt>Email:</dt>
    <dd><a class=" [ canada ] " href="mailto:{{ author.email }}">{{ author.email }}</a></dd>
    <dt>Twitter:</dt>
    <dd><a class=" [ canada ] " href="{{ author.urls.twitter }}">{{'@' + author.twitter }}</a></dd>
    <dt>Twitter Direct Message:</dt>
    <dd><a class=" [ canada ] " href="https://twitter.com/messages/compose?recipient_id={{ author.twitter }}">{{ '@' + author.twitter }}</a></dd>
    <dt>Mastdon:</dt>
    <dd><a class=" [ canada ] " href="{{ author.urls.mastodon }}">{{ '@' + author.mastodon }}</a></dd>
</dl>
