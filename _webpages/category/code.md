---
page_class: page--code

redirect_from:
  - category/code.html
  - pen.html
  - pens.html
  - category/pen.html
  - category/pens.html

title: Code
lede: All of my code snippets.

feed: /code.xml
sparkline: code
---

<dl class="full">
    <dt>What’s a <q>pen</q>?</dt>
    <dd><q><a href="https://codepen.io"><em>CodePen</em></a> is an HTML, CSS, and JavaScript code editor in your browser with instant previews.</q></dd>
</dl>

--------

These are my best CodePens—seven of which were [featured on their homepage](https://codepen.io/collection/hfqlg).

*There are {{ site.categories.code | size }} published code snippets.*

<div class="h-feed" id="code">
        {% for page in site.categories.code %}
        {% assign page_year = page.date | date: '%Y' %}

        {% if page_year != current_year %}
            {% assign current_year = page_year %}
            {% unless forloop.first %}
                </ol>
            {% endunless %}
            {% include_cached content/heading.liquid title=page_year id=page_year %}
            <ol class="deck" role="list">
        {% endif %}

        {% include components/item_deck.liquid %}

        {% if forloop.last %}
            </ol>
        {% endif %}
    {% endfor %}
</div>

--------

{% include components/buttons_categories.liquid %}
