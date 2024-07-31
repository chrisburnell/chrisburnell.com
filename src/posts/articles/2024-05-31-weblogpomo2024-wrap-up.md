---
date: 2024-06-02T20:55:41+0800
title: WeblogPoMo 2024 Wrap Up
description: It’s officially June now, which means <a href="/tag/weblogpomo2024/">#WeblogPoMo2024</a> has come to a close! Let’s review what I wrote about and what I’m taking away from participating in this event.
tags:
  - weblogpomo
---

*Somehow* I managed to post every single day this month. It was oftentimes tiring and some days a real struggle to get things done and published, but I’m really happy that I managed to stay committed and see it through to the end.

Over the course of the event, there’s been a dramatic shift in my attitude towards perfectionism when it comes to finishing and getting articles published. On the {{ 3 | ordinal | safe }}, I wrote this on the [32-Bit Café thread for WeblogPoMo 2024](https://discourse.32bit.cafe/t/weblogpomo-2024/):

> There’s typically at least a week between starting writing something on my website and publishing it—sometimes even months—but learning not to stress too much about making everything I publish as perfect as I can has been truly cathartic. I’m hoping I have the sense to remember these feelings when the month is over. 😅

Lo and behold, it actually became easier and easier for me to write as the days passed by. It felt more and more natural for me to hone in on the idea(s) and information I wanted to convey, get it out of my brain and onto the metaphorical page, make some quick revisions and edits, and hit publish.

There are certainly times where my words were more meandering that I’d have preferred, but I’m glad that didn’t stop me from publishing at all, rather than let my ideas pile up and clog the drain. And what better way to get comfortable writing and find my own, unique writing style than to do it for 31 days straight!

That being said, publishing something new *every day* isn’t something that always fit into my schedule. There were days where coming up with post ideas, writing, and publishing weren’t in the cards, but my desire to stay committed to posting every day had me pushing through those mental barriers, and I don’t think that’s a healthy headspace to be in. If I was working a full-time job, I don’t know how I would have managed to cope; at the very least, I wouldn’t have been able to publish as much content as I did last month.

Even though I feel like I’ve broken the shackles of heavily-editing my posts before I feel comfortable publishing them, having the time and mental capacity to plan out the flow of posts and do more than a cursory read-through of my words would benefit the readability and strength of the ideas I’m conveying.

## Takeaways

I feel really accomplished. *Really* accomplished and proud of the work that I put into this. As tired as I am now, I’m pretty confident that I’ll be participating again next year, although with perhaps a bit more planning ahead of time. Participating did a lot more for me than just add 31 new posts to the archives.

- Got over my obsession with perfection and endless editing before publishing
- Found myself looking forward to reading again every day
- Made and documented numerous technical changes and improvements to my website
- Finally got the idea for <code style="white-space: nowrap;">/interests</code> pages out into the wild and [made a directory](https://chrisburnell.github.io/interests-directory/) for folks to join
- Extremely thankful to have had a lot of fun conversations with friends as we supported each other in ideating and writing (and coping!) over the month
- Discovered more than a handful of excellent blogs and the wonderful people behind them that I’ve since added to [my blogroll](/blogroll/)—check out a [list of participators on Anne Studivant’s website](https://weblog.anniegreens.lol/weblog-posting-month-2024/participators)

<h2 id="stats">Some stats</h2>

<dl>
	<dt>Word Count</dt>
	<dd>15,863</dd>
	<dt>Most Verbose Post</dt>
	<dd><a href="/article/open-source-dilemma/">The Open Source Dilemma</a> <small>with</small> 1,266 words</dd>
</dl>

Based on [my stats page](/stats/), this month’s posts account for a whopping **26%** of the words published on this website to date!

<figure class="requires-js">
    <svg-sparkline values="{% for item in (collections.weblogpomo2024 | arePublished) %}{% if page.url != item.url %}{% if not loop.first %},{% endif %}{{ item.content | cleanTagsForWordcount | striptags | safe | wordcount }}{% endif %}{% endfor %}" fill="true" start-label="Word Count"></svg-sparkline>
    <is-land class=" [ visually-hidden ] "><template webc:raw data-island="once"><script type="module" src="/js/components/svg-sparkline.js"></script></template></is-land>
</figure>


### Categories

{% renderTemplate 'webc' %}
<c-stats-table :@items="[{ label: 'Article', count: 12 }, { label: 'Music Review', count: 1 }, { label: 'Note', count: 16 }, { label: 'Recipe', count: 2 }]" style="font-size: var(--font-size-small);"></c-stats-table>
{% endrenderTemplate %}

### Tags

{% renderTemplate 'webc' %}
<c-stats-table :@items="[{ label: 'AI', count: 1 }, { label: 'Art', count: 2 }, { label: 'Color', count: 2 }, { label: 'Crossword', count: 1 }, { label: 'CSS', count: 5 }, { label: 'CSS Variables', count: 2 }, { label: 'Eleventy', count: 5 }, { label: 'GitHub', count: 1 }, { label: 'HTML', count: 1 }, { label: 'JavaScript', count: 6 }, { label: 'Jekyll', count: 1 }, { label: 'Nunjucks', count: 1 }, { label: 'Personal', count: 3 }, { label: 'PHP', count: 2 }, { label: 'State of the Web', count: 1 }, { label: 'TTRPG', count: 1 }, { label: 'Web Components', count: 3 }]" style="font-size: var(--font-size-small);"></c-stats-table>
{% endrenderTemplate %}

<h2 id="favourites">My favourite posts</h2>

{% set favourite_indices = [1, 2, 7, 17, 18, 21, 24, 27, 28, 31] -%}
<ul style="--list-space: 1em;" data-skip-wordcount>
    {% for index in favourite_indices -%}
        {% set item = (collections.weblogpomo2024 | arePublished)[index - 1] -%}
        <li>
            <div class="cluster"><span><a href="{{ item.url }}" class=" [ cluster ] "><strong>{{ item.data.title }}</strong></a></span> <span>{{ item.data.categoryProper | default(item.data.category) | supertitle }}</span> <time datetime="{{ item.data.date | rfc3339Date }}"><em>{{ item.data.date | friendlyDate('d') | ordinal | safe }} {{ item.data.date | friendlyDate('LLLL') }}</em></time></div>
            {% if item.data.excerpt or item.data.description -%}
                <p>{{ item.data.excerpt | default(item.data.description) | markdownFormat | excerptize | safe }}</p>
            {%- elif ['bookmark', 'like', 'note', 'talk'].includes(item.data.category) and item.content -%}
                <p>{{ item.content | markdownFormat | excerptize | maxWords | safe }}</p>
            {%- elif item.data.category == 'code' -%}
                <p>One of my code demos.</p>
            {%- elif item.data.category == 'recipe' -%}
                <p>A {{ item.data.categoryProper | default(item.data.category) }}{% if item.data.authors %} by {{ item.data.meta_authors_string | safe }}{% endif %}</p>
            {%- endif %}
        </li>
    {%- endfor %}
</ul>

<h2 id="others">My other posts</h2>

{% set other_indices = [3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15, 16, 19, 20, 22, 23, 25, 26, 29, 30] -%}
<ul style="--list-space: 1em;" data-skip-wordcount>
    {% for index in other_indices -%}
        {% set item = (collections.weblogpomo2024 | arePublished)[index - 1] -%}
        <li>
            <div class="cluster"><span><a href="{{ item.url }}" class=" [ cluster ] "><strong>{{ item.data.title }}</strong></a></span> <span>{{ item.data.categoryProper | default(item.data.category) | supertitle }}</span> <time datetime="{{ item.data.date | rfc3339Date }}"><em>{{ item.data.date | friendlyDate('d') | ordinal | safe }} {{ item.data.date | friendlyDate('LLLL') }}</em></time></div>
            {% if item.data.excerpt or item.data.description -%}
                <p>{{ item.data.excerpt | default(item.data.description) | markdownFormat | excerptize | safe }}</p>
            {%- elif ['bookmark', 'like', 'note', 'talk'].includes(item.data.category) and item.content -%}
                <p>{{ item.content | markdownFormat | excerptize | maxWords | safe }}</p>
            {%- elif item.data.category == 'code' -%}
                <p>One of my code demos.</p>
            {%- elif item.data.category == 'recipe' -%}
                <p>A {{ item.data.categoryProper | default(item.data.category) }}{% if item.data.authors %} by {{ item.data.meta_authors_string | safe }}{% endif %}</p>
            {%- endif %}
        </li>
    {%- endfor %}
</ul>

--------

Huge thanks for [Anne Studivant](https://weblog.anniegreens.lol) for organising this event.

Whether you read all my Weblog Posting Month posts or only a few, thank you for reading, and I’ll see you again next year!
