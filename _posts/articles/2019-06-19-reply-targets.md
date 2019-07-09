---
sitemap:
  lastmod: 2019-06-26 09:00:00
date: 2019-06-19 17:13:00
title: Reply Targets
lede: Providing a useful context to content written in response to someone else's blog post, tweet, toot, etc. helps a reader to understand the conversational nature of these back-and-forths. What abstractions can we make to the data that holds these reply targets, and how can those abstractions make for a richer reading experience and for a leaner publishing workflow?
syndicate_to:
  - https://news.indieweb.org/en
---

Ever since adopting *IndieWeb* technologies, I have been posting all of my notes and replies onto my website with syndication links to *Twitter*/*Mastodon*. Because I write responses to people across a variety of channels, I wanted a means to present the context of the reply in the most meaningful manner, as can be seen on [this post](/note/1525182719)[^1].

For example, if I respond to someone on *Twitter*, the reply target is the URL to the tweet to which I am responding, e.g. [https://twitter.com/dletorey/status/991247595132551168](https://twitter.com/dletorey/status/991247595132551168){:rel="external"}.


{% include_cached content/heading.liquid title='How to present reply context' %}

This URL is exposed on the front-end as the context to my reply:

> in reply to https://twitter.com/dletorey/status/991247595132551168

But this looks a little unwieldy. There are a handful of things that we can infer from the above URL.

0. The reply target is on *Twitter*.
0. The username of the reply target is <q>dletorey</q>.

With this information, and a little [splitting](https://shopify.github.io/liquid/filters/split/){:rel="external"}, we can extract the username and present the reply target a little differently:

> in reply to {% include content/twitter_username.liquid username='dletorey' %}

This enhancement will work no matter to whom I reply on *Twitter*. But <q>{% include content/twitter_username.liquid username='dletorey' %}</q> happens to be a very good friend of mine, and I reply to him often.

For people I respond to frequently, I have created a small YAML library that uses the following syntax:

{% highlight yaml %}
- name: Dave Letorey
  twitter: dletorey
- name: Neil Mather
  twitter: loopdouble
{% endhighlight %}

Now, when I am parsing the reply target, I can compare it against the people in my YAML library to pull out their name, if I have it recorded in the library:

> in reply to Dave Letorey

The same can be done in the library for replies to non-siloed content, where the reply target is a personal website:

{% highlight yaml %}
- name: Dave Letorey
  twitter: dletorey
  link: letorey.co.uk
- name: Neil Mather
  twitter: loopdouble
  link: doubleloop.net
{% endhighlight %}


{% include_cached content/heading.liquid title='Federated Networks' %}

Things get a little bit more complicated when we consider replies to federated networks, such as *Mastodon*. The tricky part here is the decentralised aspect of these networks—users on one network can interact with people on other networks. For example, I have an account on [Mastodon.social](https://mastodon.social/){:rel="external"} and could reply to someone on [Social.coop](https://social.coop/){:rel="external"}.

So how can I differentiate a *Mastodon* URL from a *Personal Website* URL? At the time of writing, there are over 5000 *Mastodon* instances, and that number is ever-changing, some instances are private, etc. It is not entirely feasible for me to replicate and maintain this list of *Mastodon* instances, a gross majority of which I will never interact with. Instead, I opted to maintain a finite list of *Mastodon* instances, populated based on which instances I have already replied to and which instances I may reply to in the future (updated manually as and when I do).


{% include_cached content/heading.liquid title='Further Thoughts' %}

This solution works quite well and does not rely on making any network requests to pull in this information, so it can all be parsed and calculated during compilation, deferring the work away from the client.

However, there are some further steps we could make to improve the context of replies, but those steps come with some questions:

#### For Twitter/Mastodon/Silos:

Do I want my posts to be a reflection of the time they were made? Or should they be a live reflection?

If I responded to *John Doe* last year, but this year they are called *Jane Doe*, should my old replies display *John* or *Jane*?

Can I pull the name of the person to whom I am responding from the *Twitter* API[^2]? *Mastodon* API? Can it be extracted from microformats or clever parsing of the page?

#### For Personal Websites:

There is a [Microformats-2](http://microformats.org/wiki/microformats-2){:rel="external"} tool, [php-mf2](https://github.com/microformats/php-mf2){:rel="external"}, which I can use to parse the reply target URL and extract parts from the post which enhance the context of my reply:

- *Name* of the *Person* to whom I am responding?
- *Type* of the *Post* to which I am responding?
- *Content* of the *Post* to which I am responding?

[^1]: It has been pointed out that the UX of my posts' metadata could use some work. I’ll have to think about how to better present it.
[^2]: Unfortunately, when I POST a new Tweet, the response from *Twitter’s* API does not include the target’s name, so pulling this data out cannot simply be tacked onto the end of the *Micropub* work. This means that a second request to the *Twitter* API would have to be made to pull out the name of the person.
