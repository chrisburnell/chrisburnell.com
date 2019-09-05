---
page_class: page--tv

redirect_from:
- television.html
- category/tv.html

title: TV Shows
lede: Tracking what I watch.

feed: /tv.xml
sparkline: tv
---

*There are {{ site.categories.tv | size }} published TV Reviews.*

<ol class="shelf  h-feed" id="tv" role="list">
    {% for page in site.categories.tv %}
        {% include components/item_shelf.liquid %}
    {% endfor %}
</ol>

--------

{% include components/buttons_categories.liquid %}
