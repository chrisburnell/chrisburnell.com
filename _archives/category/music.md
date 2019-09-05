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

If you like hip-hop, check out my chronological playlist, [Hippity Hop and Whatnot Through the Ages](https://open.spotify.com/playlist/75emnP49rQPR8D95pMIa3u){:rel="external"}.

Or, if you like synthwave, check out [OutRetroSynthVapourRunWave](https://open.spotify.com/playlist/3H8w4bXd8Kwz70Z1cFNdc0){:rel="external"}.

<dl>
    {% include components/lastfm.liquid %}
</dl>

--------

<ol class="shelf  h-feed" id="music" role="list">
    {% for page in site.categories.music %}
        {% include components/item_shelf.liquid %}
    {% endfor %}
</ol>

--------

{% include components/buttons_categories.liquid %}
