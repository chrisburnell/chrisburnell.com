---
page_class: page--pens

redirect_from:
  - pen.html
  - category/pen.html
  - category/pens.html

title: Pens
lede: All of my Pens.

feed: /pens.xml
sparkline: pens
---

<dl class="full">
    <dt>What’s a pen?</dt>
    <dd><q><a href="https://codepen.io"><em>CodePen</em></a> is an HTML, CSS, and JavaScript code editor in your browser with instant previews.</q></dd>
</dl>

--------

These are my best pens—seven of which were [featured on their homepage](https://codepen.io/collection/hfqlg){:rel="external"}.

*There are {{ site.categories.pen | size }} published Pens.*

<div class="h-feed" id="pens">
    {% for page in site.categories.pen %}
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

{% include components/carbon.liquid %}

{% include components/buttons_categories.liquid %}
