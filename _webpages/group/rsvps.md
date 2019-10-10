---
page_class: page--rsvps
searchable: no-content

title: RSVPs
lede: All of my RSVPs.

feed: /rsvps.xml
---

{%- assign rsvps = site.posts | where_exp: 'page', 'page.rsvp != nil' -%}

*There are {{ rsvps | size }} RSVPs.*

<div class="h-feed" id="rsvps">
    {% for page in rsvps %}
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