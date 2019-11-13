---
page_class: page--talks

redirect_from:
  - talk.html
  - slides.html
  - presentations.html
  - category/talk.html
  - category/talks.html

title: Talks
lede: All of my talks.

feed: /talks.xml
sparkline: talks
---

*There are {{ site.categories.talk | size }} published Talks.*

<div class="h-feed" id="talks">
    {% for page in site.categories.talk %}
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

{% include components/buttons_categories.liquid %}
