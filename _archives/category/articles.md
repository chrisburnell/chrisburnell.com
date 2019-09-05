---
page_class: page--articles

redirect_from:
- article.html
- category/article.html

title: Articles
lede: All of my self-authored articles.

feed: /articles.xml
sparkline: articles
---

*There are {{ site.categories.article | size }} published Articles.*

<div class="h-feed" id="articles">
    {% for page in site.categories.article %}
        {%- assign page_year = page.date | date: '%Y' -%}

        {% if page_year != current_year %}
            {%- assign current_year = page_year -%}
            {% unless forloop.first %}
                </ol>
            {% endunless %}
            {% include_cached content/heading.liquid title=page_year id=page_year %}
            <ol class="content-list" role="list">
        {% endif %}

        {% include components/item_content_list.liquid %}

        {% if forloop.last %}
            </ol>
        {% endif %}
    {% endfor %}
</div>

--------

{% include components/buttons_categories.liquid %}
