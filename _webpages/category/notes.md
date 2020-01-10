---
page_class: page--notes

redirect_from:
  - note.html
  - category/note.html
  - category/notes.html

title: Notes
lede: All of my notes.

feed: /notes.xml
sparkline: notes
---

*There are {{ site.categories.note | size }} published Notes.*

<div class="h-feed" id="notes">
    {% for page in site.categories.note %}
        {% assign page_year = page.date | date: '%Y' %}

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

{% include components/ads.liquid %}

{% include components/buttons_categories.liquid %}
