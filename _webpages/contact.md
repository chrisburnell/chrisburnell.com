---
title: Contact
lede: Let's get in touch!
page_class: page--contact
searchable: false
sitemap:
  priority: 1.0
---

<dl>
    <dt>Email:</dt>
    <dd><a class="canada" href="mailto:{{ site.author.email }}">{{ site.author.email }}</a></dd>
    <dt>Twitter:</dt>
    <dd><a class="canada" href="{{ site.author.urls.twitter }}">{{ site.author.twitter | prepend: '@' }}</a></dd>
    <dt>Twitter Direct Message:</dt>
    <dd><a class="canada" href="https://twitter.com/messages/compose?recipient_id={{ site.author.twitter }}">{{ site.author.twitter | prepend: '@' }}</a></dd>
    <dt>Mastdon:</dt>
    <dd><a class="canada" href="{{ site.author.urls.mastodon }}">{{ site.author.mastodon | prepend: '@' }}</a></dd>
</dl>

<p>There are a number of Feeds you also can subscribe to:</p>

<ul class="shelf" role="navigation">
    <li><a class="button" href="/feed.xml" rel="alternate">All Posts</a></li>
    {% for page in site.data.categories %}
        <li>
            <a class="button" href="/{{ page.type }}.xml" rel="alternate">{{ page.title }}</a>
        </li>
    {% endfor %}
</ul>

--------

{% include components/ads.liquid %}
