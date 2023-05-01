---
title: Feeds
description: You can follow my posts from different web feeds, depending on what content you'd like to see.
---

1. [Featured Posts Feed]({{ site.url + '/feed.xml' }})
2. [Writing Feed]({{ site.url + '/writing.xml' }})
3. [Replies Feed]({{ site.url + '/replies.xml' }})
4. [RSVPs Feed]({{ site.url + '/rsvps.xml' }})
5. [Checkins Feed]({{ site.url + '/checkins.xml' }})

<h2 class=" [ gamma ] ">By category</h2>

<ul class=" [ grid ] [ shelf ] " data-layout="natural">
{% for item in collections.categories -%}
    {%- set count = collections[item.title] | arrayKeyIncludes('data.tags', 'post') | arePublished | getCollectionCount(false, true) -%}
    <li><a href="/{{ item.plural }}.xml">{{ item.properPlural | title }} <sup>{{ count }}</sup></a></li>
{%- endfor %}
</ul>

<h2 class=" [ gamma ] ">By tag</h2>

<ul class=" [ grid ] [ shelf ] " data-layout="natural">
{% for item in collections.tags | sort -%}
    {%- set count = collections[item] | arrayKeyIncludes('data.tags', 'post') | arePublished | getCollectionCount(false, true) -%}
    <li><a href="/{{ item }}.xml">{{ item }} <sup>{{ count }}</sup></a></li>
{%- endfor %}
</ul>

<h2 class=" [ gamma ] ">Learn more</h2>

Visit [About Feeds](https://aboutfeeds.com/) to get started with newsreaders and subscribing.
