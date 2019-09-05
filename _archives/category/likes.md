---
page_class: page--likes

redirect_from:
- like.html
- category/like.html

title: Likes
lede: Stuff from around the web I've liked, believe it or not!

feed: /likes.xml
sparkline: likes
---

*There are {{ site.categories.like | size }} published Likes.*

<ol class="shelf  h-feed" id="likes" role="list">
    {% for page in site.categories.like %}
        {% include components/item_shelf.liquid %}
    {% endfor %}
</ol>

--------

{% include components/buttons_categories.liquid %}
