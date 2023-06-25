---
updated: 2019-06-26T09:00:00+0100
date: 2019-06-19T17:13:00+0100
title: Reply Targets
description: Providing a useful context to content written in response to someone else's blog post, tweet, toot, etc. helps a reader to understand the conversational nature of these back-and-forths. What abstractions can we make to the data that holds these reply targets, and how can those abstractions make for a richer reading experience and for a leaner publishing workflow?
tags:
  - indieweb
syndicate_to:
  - https://news.indieweb.org/en/chrisburnell.com/article/reply-targets
---

Ever since adopting *IndieWeb* technologies, I have been posting all of my notes and replies onto my website with syndication links to *Twitter*/*Mastodon*. Because I write responses to people across a variety of channels, I wanted a means to present the context of the reply in the most meaningful manner, as can be seen on [this post](/note/1525182719/).

For example, if I respond to someone on *Twitter*, the reply target is the URL to the tweet to which I am responding, e.g. [https://twitter.com/dletorey/status/991247595132551168](https://twitter.com/dletorey/status/991247595132551168).

## How to present reply context

This URL is exposed on the front end as the context to my reply:

> in reply to https://twitter.com/dletorey/status/991247595132551168

But this looks a little unwieldy. There are a handful of things that we can infer from the above URL.

1. The reply target is on *Twitter*.
2. The username of the reply target is <q>dletorey</q>.

With this information, and a little [splitting](https://shopify.github.io/liquid/filters/split/), we can extract the username and present the reply target a little differently:

> in reply to <a href="https://twitter.com/dletorey">@dletorey</a>

This enhancement will work no matter to whom I reply on *Twitter*. But <q><a href="https://twitter.com/dletorey">@dletorey</a></q> happens to be a very good friend of mine, and I reply to him often.

For people I respond to frequently, I have created a small YAML library that uses the following syntax:

```yaml
- name: Dave Letorey
  twitter: dletorey
- name: Neil Mather
  twitter: loopdouble
```

Now, when I am parsing the reply target, I can compare it against the people in my YAML library to pull out their name, if I have it recorded in the library:

> in reply to <a href="https://twitter.com/dletorey">Dave Letorey</a>

The same can be done in the library for replies to non-siloed content, where the reply target is a personal website:

```yaml
- name: Dave Letorey
  twitter: dletorey
  url: letorey.co.uk
- name: Neil Mather
  twitter: loopdouble
  url: doubleloop.net
```

> in reply to <a href="https://letorey.co.uk">Dave Letorey</a>

## Federated Networks

Things get a little bit more complicated when we consider replies to federated networks, such as *Mastodon*. The tricky part here is the decentralised aspect of these networks—users on one network can interact with people on other networks. For example, I have an account on [Mastodon.social](https://mastodon.social/about) and could reply to someone on [Social.coop](https://social.coop/about).

So how can I differentiate a *Mastodon* URL from a *Personal Website* URL? At the time of writing, there are over 5000 *Mastodon* instances, and that number is ever-changing, some instances are private, etc. It is not entirely feasible for me to replicate and maintain this list of *Mastodon* instances, a gross majority of which I will never interact with. Instead, I opted to maintain a finite list of *Mastodon* instances, populated based on which instances I have already replied to and which instances I may reply to in the future (updated manually as and when I do).

## Further Thoughts

This solution works quite well and does not rely on making any network requests to pull in this information, so it can all be parsed and calculated during compilation, deferring the work away from the client.

However, there are some further steps we could make to improve the context of replies, but those steps come with some questions:

#### For Twitter/Mastodon/Silos:

Do I want my posts to be a reflection of the time they were made? Or should they be a live reflection?

If I responded to *John Doe* last year, but this year they are called *Jane Doe*, should my old replies display *John* or *Jane*?

Can I pull the name of the person to whom I am responding from the *Twitter* API? <aside>Unfortunately, when I POST a new Tweet, the response from *Twitter’s* API does not include the target’s name, so pulling this data out cannot be tacked onto the end of the *Micropub* work. This means that a second request to the *Twitter* API would have to be made to pull out the name of the person.</aside> *Mastodon* API? Can it be extracted from microformats or clever parsing of the page?

#### For Personal Websites:

There is a [Microformats-2](http://microformats.org/wiki/microformats-2) tool, [php-mf2](https://github.com/microformats/php-mf2), which I can use to parse the reply target URL and extract parts from the post which enhance the context of my reply:

- *Name* of the *Person* to whom I am responding?
- *Type* of the *Post* to which I am responding?
- *Content* of the *Post* to which I am responding?
