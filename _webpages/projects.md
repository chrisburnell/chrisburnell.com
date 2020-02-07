---
title: Projects
lede: A list of my side-projects and rabbit-hole-deep-dives.
page_class: page--projects
---

<div class="h-feed" id="projects">
    <link rel="stylesheet" href="/css/deck.min.css">
    <ol class="deck" role="list">
        {% for page in site.data.projects %}
            {% include components/item_deck.liquid %}
        {% endfor %}
    </ol>
</div>

--------

{% include components/ads.liquid %}
