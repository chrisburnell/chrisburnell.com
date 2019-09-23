---
title: Projects
lede: A list of my side-projects and rabbit-hole-deep-dives.
page_class: page--projects
---

<div class="h-feed" id="projects">
    <ol class="content-list" role="list">
        {% for page in site.data.projects %}
            {% include components/item_content_list.liquid %}
        {% endfor %}
    </ol>
</div>
