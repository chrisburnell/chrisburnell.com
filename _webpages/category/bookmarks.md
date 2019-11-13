---
page_class: page--bookmarks

redirect_from:
  - bookmark.html
  - link.html
  - links.html
  - category/bookmark.html
  - category/bookmarks.html

title: Bookmarks
lede: All of my bookmarks.

feed: /bookmarks.xml
sparkline: bookmarks
---

*There are {{ site.categories.bookmark | size }} published Bookmarks.*

<div class="h-feed" id="bookmarks">
    {% for page in site.categories.bookmark %}
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
