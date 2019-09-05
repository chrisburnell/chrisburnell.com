---
page_class: page--beer

redirect_from:
- beers.html
- category/beer.html

title: Beer
lede: Reviewing beers, pint-by-pint.

feed: /beer.xml
sparkline: beer
---

*There are {{ site.categories.beer | size }} published Beer Reviews.*

[Connect with me on Untappd]({{ site.urls.untappd }}){:rel="me  external"}! Beer titles below also link out to [Untappd](https://untappd.com){:rel="external"}.

<ol class="shelf  h-feed" id="beer" role="list">
    {% for page in site.categories.beer %}
        {% include components/item_shelf.liquid %}
    {% endfor %}
</ol>

--------

{% include components/buttons_categories.liquid %}
