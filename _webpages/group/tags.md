---
page_class: page--tags
searchable: no-content

redirect_from:
  - tag.html

title: Tags
lede: A list of tags and their counterpart posts.
---

{% capture tags %}
    {% for tag in site.tags %}
        {{ tag[0] | downcase }}
    {% endfor %}
{% endcapture %}
{% assign tags_sorted = tags | split: ' ' | uniq | sort_natural %}
<dl role="navigation">
    <dt>Jump to a tag:</dt>
    <dd>
        {% for tag in tags_sorted %}
            <a href="#{{ tag }}" title="Jump to all posts tagged under {% include content/capitalizer.liquid input=tag %}">{% include content/capitalizer.liquid input=tag %}</a>{% unless forloop.last %}, {% endunless %}
        {% endfor %}
    </dd>
</dl>
<div class="h-feed" id="tags">
    {% for tag in tags_sorted %}
        {% capture tag_name %}{% include content/capitalizer.liquid input=tag %} <small>({{ site.tags[tag].size }})</small>{% endcapture %}
        {% include_cached content/heading.liquid title=tag_name id=tag %}
        <ol class="deck" role="list">
            {% for page in site.tags[tag] %}
                {% include components/item_deck.liquid %}
            {% endfor %}
        </ol>
    {% endfor %}
</div>

--------

{% include components/ads.liquid %}

{% include components/buttons_categories.liquid %}
