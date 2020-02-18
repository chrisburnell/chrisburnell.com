---
title: Archive
lede: Browse posts by a variety of metrics.
page_class: page--archive
searchable: no-content
redirect_from:
  - archives.html
---

{%- for page in site.posts -%}
    {%- unless page.draft or page.ignore or page.searchable == false -%}
        {%- assign posts_size = posts_size | plus: 1 -%}
    {%- endunless -%}
{%- endfor -%}
<p><em>There are {{ posts_size }} published posts.</em></p>

{%- assign category_title = site.categories.size | prepend: 'By category <small>(' | append: ')</small>' -%}
{% include_cached content/heading.liquid title=category_title %}
<ol class="shelf" role="navigation">
    {%- assign categories = site.categories | sort -%}
    {% for category in categories %}
        {%- assign category_title = category[0] -%}
        <li>
            <a class="button" href="/{{ site.data.categories | where: 'category', category_title | map: 'type' | first }}" title="Jump to all posts categorised under {% include content/capitalizer.liquid input=category_title %}">{{ site.data.categories | where: 'category', category_title | map: 'title' | first }} <small>({{ site.categories[category_title].size }})</small></a>
        </li>
    {% endfor %}
</ol>

{%- assign tag_title = site.tags.size | prepend: 'By tag <small>(' | append: ')</small>' -%}
{% include_cached content/heading.liquid title=tag_title %}
{% capture tags %}
    {% for tag in site.tags %}
        {{ tag[0] | downcase }}
    {% endfor %}
{% endcapture %}
{%- assign tags_sorted = tags | split: ' ' | uniq | sort_natural -%}
<ol class="shelf" role="navigation">
    {% for tag in tags_sorted %}
        <li>
            <a class="button" href="/tags/#{{ tag }}" title="Jump to all posts tagged under {% include content/capitalizer.liquid input=tag %}">{% include content/capitalizer.liquid input=tag %} <small>({{ site.tags[tag].size }})</small></a>
        </li>
    {% endfor %}
</ol>

{%- assign year_newest = site.posts.first.date | date: '%Y' -%}
{%- assign year_oldest = site.posts.last.date | date: '%Y' -%}
{%- assign year_title = year_newest | minus: year_oldest | plus: 1 | prepend: 'By year <small>(' | append: ')</small>' -%}
{% include_cached content/heading.liquid title=year_title %}
<ol class="shelf" role="navigation">
    {%- assign current_year = site.posts.first.date | date: '%Y' -%}
    {% for page in site.posts %}
        {% unless page.draft or page.ignore or page.searchable == false %}
            {%- assign yearly_count = yearly_count | plus: 1 -%}
            {%- assign page_year = page.date | date: '%Y' -%}
            {% if page_year != current_year or forloop.last %}
                <li>
                    <a class="button" href="/{{ current_year }}">{{ current_year }} <small>({{ yearly_count }})</small></a>
                </li>
                {%- assign current_year = page_year -%}
                {%- assign yearly_count = 0 -%}
            {% endif %}
        {% endunless %}
    {% endfor %}
</ol>

--------

{% include components/ads.liquid %}
