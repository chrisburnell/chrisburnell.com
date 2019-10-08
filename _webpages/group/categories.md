---
page_class: page--categories
searchable: no-content

redirect_from:
- category.html

title: Categories
lede: A list of categories and their counterpart posts.
---

{% capture categories %}
    {% for category in site.categories %}
        {{ category[0] | downcase }}
    {% endfor %}
{% endcapture %}
{% assign categories_sorted = categories | split: ' ' | uniq | sort_natural %}
<dl role="navigation">
    <dt>Jump to a category:</dt>
    <dd>
        {% for category in categories_sorted %}
            <a href="#{{ category }}" title="Jump to all posts categorised under {% include content/capitalizer.liquid input=category %}">{% include content/capitalizer.liquid input=category %}</a>{% unless forloop.last %}, {% endunless %}
        {% endfor %}
    </dd>
</dl>
{% for category in categories_sorted %}
    {% capture category_name %}{% include content/capitalizer.liquid input=category %} <small>({{ site.categories[category].size }})</small>{% endcapture %}
    {% include_cached content/heading.liquid title=category_name id=category %}
    <div class="h-feed" id="categories">
        <ol class="deck" role="list">
            {% for page in site.categories[category] %}
                {% include components/item_deck.liquid %}
            {% endfor %}
        </ol>
    </div>
{% endfor %}

--------

{% include components/buttons_categories.liquid %}
