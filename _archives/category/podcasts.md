---
page_class: page--podcasts

redirect_from:
- podcast.html
- category/podcast.html

title: Podcasts
lede: Tracking what I listen to.

feed: /podcasts.xml
sparkline: podcasts
---

*There are {{ site.categories.podcast | size }} published Podcast Check-ins.*

<ol class="shelf  h-feed" id="podcasts" role="list">
    {% for page in site.categories.podcast %}
        {% include components/item_shelf.liquid %}
    {% endfor %}
</ol>

--------

{% include components/buttons_categories.liquid %}
