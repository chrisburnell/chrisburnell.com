---
page_class: page--movies

redirect_from:
  - movie.html
  - category/movie.html
  - category/movies.html

title: Movies
lede: Tracking what I watch.

feed: /movies.xml
sparkline: movies
---

*There are {{ site.categories.movie | size }} published Movie Reviews.*

<div class="h-feed" id="movies">
        <ol class="shelf" role="list">
        {% for page in site.categories.movie %}
            {% include components/item_shelf.liquid %}
        {% endfor %}
    </ol>
</div>

--------

{% include components/ads.liquid %}

{% include components/buttons_categories.liquid %}
