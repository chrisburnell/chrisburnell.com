---
page_class: page--checkins
searchable: no-content

title: Checkins
lede: All of my checkins.
---

{%- assign checkins = site.posts | where_exp: 'page', 'page.checkin != nil' -%}

*There are {{ checkins | size }} Checkins.*

<div class="h-feed" id="checkins">
    {% for page in checkins %}
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

-------

{% include components/buttons_categories.liquid %}
