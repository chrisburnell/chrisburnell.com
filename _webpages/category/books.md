---
page_class: page--books

redirect_from:
  - book.html
  - bookshelf.html
  - read.html
  - reading.html
  - category/book.html
  - category/books.html

title: Bookshelf
lede: Tracking books I've read, am reading, and want to read.

feed: /books.xml
sparkline: books
---

*There are {{ site.categories.book | size }} published Book Reviews.*

<div class="h-feed" id="books">
        <ol class="shelf" role="list">
        {% assign books_unstarted = site.categories.book | default: site.emptyArray | where_exp: 'book', 'book.date == nil' | sort: 'title' %}
        {% for page in books_unstarted %}
            {% include components/item_shelf.liquid %}
        {% endfor %}
        {% assign books_unfinished = site.categories.book | default: site.emptyArray | where_exp: 'book', 'book.finish == nil' | sort: 'title' %}
        {% for page in books_unfinished %}
            {% include components/item_shelf.liquid %}
        {% endfor %}
        {% assign books = site.categories.book | where_exp: 'book', 'book.date' | where_exp: 'book', 'book.finish' %}
        {% for page in books %}
            {% include components/item_shelf.liquid %}
        {% endfor %}
    </ol>
</div>

--------

{% include components/buttons_categories.liquid %}
