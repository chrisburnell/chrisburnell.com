---
page_class: page--chess

redirect_from:
  - category/chess.html

title: Chess Games
lede: Tracking chess games I've played.

feed: /chess.xml
sparkline: chess
---

*There are {{ site.categories.chess | size }} published Chess Games.*

<div class="h-feed" id="chess">
    <ol class="shelf" role="list">
        {% for page in site.categories.chess %}
            {% include components/item_shelf.liquid %}
        {% endfor %}
    </ol>
</div>

--------

{% include components/ads.liquid %}

{% include components/buttons_categories.liquid %}
