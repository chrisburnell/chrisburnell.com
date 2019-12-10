---
page_class: page--podcasts

redirect_from:
  - podcast.html
  - category/podcast.html
  - category/podcasts.html

title: Podcasts
lede: Tracking what I listen to.

feed: /podcasts.xml
sparkline: podcasts
---

*There are {{ site.categories.podcast | size }} published Podcast Check-ins.*

<div class="h-feed" id="podcasts">
    <ol class="shelf" role="list">
        {% for page in site.categories.podcast %}
            {% include components/item_shelf.liquid %}
        {% endfor %}
    </ol>
</div>

--------

{% include components/carbon.liquid %}

{% include components/buttons_categories.liquid %}
