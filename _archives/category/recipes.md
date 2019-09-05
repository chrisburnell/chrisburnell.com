---
page_class: page--recipes

redirect_from:
- recipe.html
- category/recipe.html

title: Recipes
lede: All of my recipes.

feed: /recipes.xml
sparkline: recipes
---

*There are {{ site.categories.recipe | size }} published recipes.*

<div class="h-feed" id="recipes">
    {% for page in site.categories.recipe %}
        {% assign page_year = page.date | date: '%Y' %}

        {% if page_year != current_year %}
            {% assign current_year = page_year %}
            {% unless forloop.first %}
                </ol>
            {% endunless %}
            {% include_cached content/heading.liquid title=page_year id=page_year %}
            <ol class="content-list" role="list">
        {% endif %}

        {% include components/item_content_list.liquid %}

        {% if forloop.last %}
            </ol>
        {% endif %}
    {% endfor %}
</div>

--------

{% include components/buttons_categories.liquid %}
