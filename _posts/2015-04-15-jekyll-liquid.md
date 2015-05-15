---
layout: article
category: article

date: 2015-04-15 10:00:00

title: Tips and Tricks for Liquid in Jekyll
introduction: As you might be aware, my website is powered by Jekyll, a static site generator. Over the last year or so I’ve amassed a couple of useful snippets that you, too, might find some use in.
tags:
- Jekyll
---

{% highlight liquid %}{% raw %}
{% capture tags %}
    {% for tag in site.tags %}
        {{ tag[0] }}
    {% endfor %}
{% endcapture %}
{% assign tags_sorted = tags | split:' ' | sort %}
{% for tag in tags_sorted %}
    {% assign posts_by_tag = "" | split: "" %}
    {% for post in site.tags.[tag] %}
        {% assign posts_by_tag = posts_by_tag | push: post %}
    {% endfor %}
    {% if tag == "codepen" %}
        {% for post in site.pens reversed %}
            {% assign posts_by_tag = posts_by_tag | push: post %}
        {% endfor %}
    {% endif %}
    {% assign posts_by_tag_sorted = posts_by_tag | sort: "date" %}
    <h3 id="{{ tag | slugify }}">{{ tag }} <span class="tags-count">({{ posts_by_tag_sorted.size }})</span><a href="#{{ tag | slugify }}" class="heading-anchor" aria-hidden="true">#{{ tag | slugify }}</a></h3>
    <ol class="small-articles-list" role="list">
        {% for post in posts_by_tag_sorted %}
            <li>
                <a href="{{ post.url }}">
                    {% if post.category == "pen" %}
                        <svg class="icon--codepen"><use xlink:href="#svg--codepen" /></svg>
                    {% endif %}
                    <h4 class="small-article-title">{{ post.title }}</h4>
                    <time class="small-article-date" datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%B %d, %Y" }}</time>
                    {% if post.introduction %}
                        <p class="small-article-introduction">{{ post.introduction | truncatewords: 15 | replace: '....', '...' | replace: ',...', '...' }}</p>
                    {% elsif post.category == "pen" %}
                        <p class="small-article-introduction"><em>Featured Pen</em></p>
                    {% endif %}
                </a>
            </li>
        {% endfor %}
    </ol>
{% endfor %}
{% endraw %}{% endhighlight %}
