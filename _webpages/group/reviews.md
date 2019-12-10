---
page_class: page--reviews
searchable: no-content

title: Reviews
lede: All of my review posts.
---

{%- assign reviews = site.posts | where: 'layout', 'review' -%}

*There are {{ reviews | size }} published Reviews.*

<div class="h-feed" id="reviews">
    {% for page in reviews %}
        {%- assign page_year = page.date | date: '%Y' -%}

        {% if page_year != current_year %}
            {% assign current_year = page_year %}
            {% unless forloop.first %}
                </ol>
            {% endunless %}
            {% include_cached content/heading.liquid title=page_year id=page_year %}
            <ol class="deck" role="list">
        {% endif %}

        {% include components/item_deck.liquid %}

        {% if forloop.last %}
            </ol>
        {% endif %}
    {% endfor %}
</div>

--------

{% include components/carbon.liquid %}

{% include components/buttons_categories.liquid %}
