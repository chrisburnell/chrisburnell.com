---
page_class: page--games

redirect_from:
  - game.html
  - category/game.html
  - category/games.html

title: Game Reviews
lede: Reviewing games one-by-one.

feed: /games.xml
sparkline: games
---

*There are {{ site.categories.game | size }} published Game Reviews.*

<div class="h-feed" id="music">
        <ol class="shelf" role="list">
        {% for page in site.categories.game %}
            {% include components/item_shelf.liquid %}
        {% endfor %}
    </ol>
</div>

--------

{% include components/buttons_categories.liquid %}
