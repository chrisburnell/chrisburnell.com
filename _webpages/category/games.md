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

<div class="h-feed" id="books">
        <ol class="shelf" role="list">
        {% assign games_unstarted = site.categories.game | default: site.emptyArray | where_exp: 'game', 'game.date == nil' | sort: 'release' | reverse %}
        {% for page in games_unstarted %}
            {% include components/item_shelf.liquid %}
        {% endfor %}
        {% assign games_unfinished = site.categories.game | default: site.emptyArray | where_exp: 'game', 'game.finish == nil' | sort: 'release' | reverse %}
        {% for page in games_unfinished %}
            {% include components/item_shelf.liquid %}
        {% endfor %}
        {% assign games = site.categories.game | where_exp: 'game', 'game.date' | where_exp: 'game', 'game.finish' | sort: 'release' | reverse %}
        {% for page in games %}
            {% include components/item_shelf.liquid %}
        {% endfor %}
    </ol>
</div>

--------

{% include components/buttons_categories.liquid %}
