---
page_class: page--music

redirect_from:
  - album.html
  - albums.html
  - category/music.html

title: Music
lede: Reviewing music albums one-by-one.

feed: /music.xml
sparkline: music
---

*There are {{ site.categories.music | size }} published Music Reviews.*

If you like hip-hop, check out my chronological playlist, [Hippity Hop and Whatnot Through the Ages](https://open.spotify.com/playlist/75emnP49rQPR8D95pMIa3u), or, if you’re into synthwave, check out my playlist, [OutRetroSynthVapourRunWave](https://open.spotify.com/playlist/3H8w4bXd8Kwz70Z1cFNdc0).

Check out my [Listening page](/listening) to see what I’ve been listening to regularly.

--------

<div class="h-feed" id="music">
        <ol class="shelf" role="list">
        {% for page in site.categories.music %}
            {% include components/item_shelf.liquid %}
        {% endfor %}
    </ol>
</div>

--------

{% include components/buttons_categories.liquid %}
