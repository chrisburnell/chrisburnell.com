---
page_class: page--movies

redirect_from:
- movie.html
- category/movie.html

title: Movies
lede: Tracking what I watch.

feed: /movies.xml
sparkline: movies
---

*There are {{ site.categories.movie | size }} published Movie Reviews.*

<ol class="shelf  h-feed" id="movies" role="list">
    {% for page in site.categories.movie %}
        {% include components/item_shelf.liquid %}
    {% endfor %}
</ol>

--------

{% include components/buttons_categories.liquid %}
