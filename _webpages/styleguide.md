---
title: Style Guide
lede: The style guide for <span class="canada">chrisburnell.com</span>.
page_class: page--style-guide
searchable: no-content
redirect_from:
  - /style-guide/index.html
  - guide.html
caniuse: true
codepen: true
speakerdeck: true
twitter: true
vimeo: true
youtube: true
---

{% include_cached content/heading.liquid title='Colours' %}

<ul class="palette-list" id="colors">
    {% for colour in site.data.palette %}
        <li data-color="{{ colour.name | downcase }}">
            <h3 class="delta">{{ colour.name }}</h3>
            <div class="monospace">{{ colour.hex | prepend: '#' }}</div>
            <div class="monospace">{{ colour.hsl | prepend: 'hsl(' | append: ')' }}</div>
        </li>
    {% endfor %}
</ul>

--------

{% include components/ads.liquid %}

--------


{% include_cached content/heading.liquid title='Measures' %}

<dl>
    <dt>Small</dt>
    <dd><div class="measure-example  measure-example--small"></div></dd>
    <dt>Medium</dt>
    <dd><div class="measure-example  measure-example--medium"></div></dd>
    <dt>Large</dt>
    <dd><div class="measure-example  measure-example--large"></div></dd>
    <dt>One</dt>
    <dd><div class="measure-example  measure-example--one"></div></dd>
    <dt>Responsive</dt>
    <dd><div class="measure-example  measure-example--responsive"></div></dd>
</dl>


{% include_cached content/heading.liquid title='Transitions' %}

<div class="transition-example  transition-example--slide">
    <div class="transition-example__demo  monospace">transition: all 0.2s ease;</div>
</div>

<div class="transition-example  transition-example--fade">
    <div class="transition-example__demo  monospace">transition: all 0.2s ease;</div>
</div>


{% include_cached content/heading.liquid title='Fonts' %}

<p style="font-family: 'Proxima Nova', sans-serif;">Primary Font: "Proxima Nova", sans-serif;</p>

<p style="font-family: 'Proxima Nova', sans-serif; font-style: italic;">Primary Font italic: "Proxima Nova", sans-serif;</p>

<p style="font-family: 'Proxima Nova', sans-serif; font-weight: 600;">Primary Font bold: "Proxima Nova", sans-serif;</p>

<p style="font-family: Georgia, serif;">Secondary Font: Georgia, serif;</p>

<p style="font-family: Georgia, serif; font-style: italic;">Secondary Font italic: Georgia, sans-serif;</p>

<p style="font-family: 'Menlo for Powerline', 'Menlo', Consolas, Courier, monospace; font-size: 0.875rem;">Monospace Font: "Menlo for Powerline", "Menlo", Consolas, Courier, monospace;</p>

<p style="font-family: 'Heebo', sans-serif; font-size: 1.375rem;">Title Font: "Heebo", sans-serif;</p>


{% include_cached content/heading.liquid title='Headings' %}

<h1>Heading Level 1/α</h1>

<h2>Heading Level 2/β</h2>

<h3>Heading Level 3/γ</h3>

<h4>Heading Level 4/δ</h4>

<h5>Heading Level 5/ε</h5>

<h6>Heading Level 6/ζ</h6>


{% include_cached content/heading.liquid title='Paragraph' %}

A paragraph (from the Greek paragraphos, <q>to write beside</q> or <q>written beside</q>) is a self-contained unit of a discourse in writing dealing with a particular point or idea. A paragraph consists of one or more sentences. Though not required by the syntax of any language, paragraphs are usually an expected part of formal writing, used to organize longer prose.

<p class="columns">A paragraph (from the Greek paragraphos, <q>to write beside</q> or <q>written beside</q>) is a self-contained unit of a discourse in writing dealing with a particular point or idea. A paragraph consists of one or more sentences. Though not required by the syntax of any language, paragraphs are usually an expected part of formal writing, used to organize longer prose.</p>


{% include_cached content/heading.liquid title='Aside' %}

<aside>
    <p>An aside represents a section of the page with content connected tangentially to the rest, which could be considered separate from that content.</p>
</aside>

A paragraph (from the Greek paragraphos, “to write beside” or “written beside”) is a self-contained unit of a discourse in writing dealing with a particular point or idea. A paragraph consists of one or more sentences. Though not required by the syntax of any language, paragraphs are usually an expected part of formal writing, used to organize longer prose.


{% include_cached content/heading.liquid title='Inline Elements' %}

[This is a text link](#_)

**Strong is used to indicate strong importance**

*This text has added emphasis*

The <b>b element</b> is stylistically different text from normal text, without any special importance

The <i>i element</i> is text that is set off from the normal text

The <u>u element</u> is text with an unarticulated, though explicitly rendered, non-textual annotation

<del>This text is deleted</del> and <ins>This text is inserted</ins>

<p><s>This text has a strikethrough</s></p>

Superscript for things like: <samp>8<sup>th</sup> of August</samp> <samp>a<sup>2</sup> + b<sup>2</sup> = c<sup>2</sup></samp> <samp>E = mc<sup>2</sup></samp>

Subscript for things like: <samp>H<sub>2</sub>O</samp> <samp>H<sub>2</sub>SO<sub>4</sub></samp> <samp>C<sub>24</sub>H<sub>26</sub>O<sub>7</sub></samp>

<small>This small text for fine print, etc.</small>

Abbreviation: <abbr title="HyperText Markup Language">HTML</abbr>

Keyboard input: <kbd>Tab</kbd>

<q cite="https://developer.mozilla.org/en-US/docs/HTML/Element/q">This text is a short inline quotation</q>

<q cite="https://developer.mozilla.org/en-US/docs/HTML/Element/q">This text is a short inline quotation with <q>another short inline quotation</q> inside</q>

<cite class="h-cite">This is a citation</cite>

The <dfn title="definition element">dfn element</dfn> indicates a definition

The <mark>mark element</mark> indicates a highlight

<code>This is what inline code looks like</code>

<samp>This is sample output from a computer program</samp>

The <var>variable element</var>, such as <var>x</var> = <var>y</var>


{% include_cached content/heading.liquid title='Blockquote' %}

> A block quotation (also known as a long quotation or extract) is a quotation in a written document, that is set off from the main text as a paragraph, or block of text, and typically distinguished visually using indentation and a different typeface or smaller size quotation.


{% include_cached content/heading.liquid title='Blockquote with Citation' %}

<blockquote>
    <p>A block quotation (also known as a long quotation or extract) is a quotation in a written document, that is set off from the main text as a paragraph, or block of text, and typically distinguished visually using indentation and a different typeface or smaller size quotation.</p>
    <cite class="h-cite">Quote Source</cite>
</blockquote>


{% include_cached content/heading.liquid title='Twitter Embedded Quote' %}

<blockquote class="twitter-tweet" lang="en" data-conversation="none"><p>assumptions do not a civil developer make</p>— Chris Burnell (@iamchrisburnell) <a href="https://twitter.com/iamchrisburnell/status/590910692955389952">April 22, 2015</a></blockquote>
<noscript>Please enable JavaScript to see Twitter-specific components.</noscript>


{% include_cached content/heading.liquid title='Unordered List' %}

<ul>
    <li>This is a list item in an unordered list</li>
    <li>An unordered list is a list in which the sequence of items is not important. Sometimes, an unordered list is a bulleted list. And this is a long list item in an unordered list that can wrap onto a new line. </li>
    <li>
        Lists can be nested inside of each other
        <ul>
            <li>This is a nested list item</li>
            <li>This is another nested list item in an unordered list</li>
        </ul>
    </li>
    <li>This is the last list item</li>
</ul>


{% include_cached content/heading.liquid title='Ordered List' %}

<ol>
    <li>This is a list item in an ordered list</li>
    <li>An ordered list is a list in which the sequence of items is important. An ordered list does not necessarily contain sequence characters.</li>
    <li>
        Lists can be nested inside of each other
        <ol>
            <li>This is a nested list item</li>
            <li>This is another nested list item in an ordered list</li>
        </ol>
    </li>
    <li>This is the last list item</li>
</ol>


{% include_cached content/heading.liquid title='Ordered List Reversed' %}

<ol reversed>
    <li>This is a list item in an ordered list</li>
    <li>An ordered list is a list in which the sequence of items is important. An ordered list does not necessarily contain sequence characters.</li>
    <li>
        This is the last list item
        <ol>
            <li>This is a nested list item</li>
            <li>This is another nested list item in an ordered list</li>
        </ol>
    </li>
</ol>


{% include_cached content/heading.liquid title='Ordered List Reversed, Twice' %}

<ol reversed>
    <li>This is a list item in an ordered list</li>
    <li>An ordered list is a list in which the sequence of items is important. An ordered list does not necessarily contain sequence characters.</li>
    <li>
        This is the last list item
        <ol reversed>
            <li>This is a nested list item</li>
            <li>This is another nested list item in an ordered list</li>
        </ol>
    </li>
</ol>


{% include_cached content/heading.liquid title='Definition List' %}

<dl>
    <dt>Definition List</dt>
    <dd>A number of connected items or names written or printed consecutively, typically one below the other.</dd>
    <dt>This is a term.</dt>
    <dd>This is the definition of that term, which both live in a <code>dl</code>.</dd>
    <dt>And another term.</dt>
    <dd>And it gets a definition too, which is this line.</dd>
</dl>


{% include_cached content/heading.liquid title='Table' %}

<figure>
    <table role="grid" aria-readonly="true">
        <thead>
            <tr role="row">
                <th role="columnheader">Heading A</th>
                <th role="columnheader">Heading B</th>
                <th role="columnheader">Heading C</th>
                <th role="columnheader">Heading D</th>
            </tr>
        </thead>
        <tbody>
            <tr role="row">
                <td role="gridcell">Cell A-1</td>
                <td role="gridcell">Cell B-1</td>
                <td role="gridcell">Cell C-1</td>
                <td role="gridcell">Cell D-1</td>
            </tr>
            <tr role="row">
                <td role="gridcell">Cell A-2</td>
                <td role="gridcell">Cell B-2</td>
                <td role="gridcell">Cell C-2</td>
                <td role="gridcell">Cell D-2</td>
            </tr>
            <tr role="row">
                <td role="gridcell">Cell A-3</td>
                <td role="gridcell">Cell B-3</td>
                <td role="gridcell">Cell C-3</td>
                <td role="gridcell">Cell D-3</td>
            </tr>
        </tbody>
        <tfoot>
            <tr role="row">
                <th role="gridcell">Foot A</th>
                <th role="gridcell">Foot B</th>
                <th role="gridcell">Foot C</th>
                <th role="gridcell">Foot D</th>
            </tr>
        </tfoot>
    </table>
</figure>


{% include_cached content/heading.liquid title='Table with Alternating Rows' %}

<figure>
    <table class="zebra" role="grid" aria-readonly="true">
        <thead>
            <tr role="row">
                <th role="columnheader">Heading A</th>
                <th role="columnheader">Heading B</th>
                <th role="columnheader">Heading C</th>
            </tr>
        </thead>
        <tbody>
            <tr role="row">
                <td role="gridcell">Cell A-1</td>
                <td role="gridcell">Cell B-1</td>
                <td role="gridcell">Cell C-1</td>
            </tr>
            <tr role="row">
                <td role="gridcell">Cell A-2</td>
                <td role="gridcell">Cell B-2</td>
                <td role="gridcell">Cell C-2</td>
            </tr>
            <tr role="row">
                <td role="gridcell">Cell A-3</td>
                <td role="gridcell">Cell B-3</td>
                <td role="gridcell">Cell C-3</td>
            </tr>
            <tr role="row">
                <td role="gridcell">Cell A-4</td>
                <td role="gridcell">Cell B-4</td>
                <td role="gridcell">Cell C-4</td>
            </tr>
            <tr role="row">
                <td role="gridcell">Cell A-5</td>
                <td role="gridcell">Cell B-5</td>
                <td role="gridcell">Cell C-5</td>
            </tr>
        </tbody>
        <tfoot>
            <tr role="row">
                <th role="gridcell">Foot A</th>
                <th role="gridcell">Foot B</th>
                <th role="gridcell">Foot C</th>
            </tr>
        </tfoot>
    </table>
</figure>


{% include_cached content/heading.liquid title='Table with Subheadings' %}

<figure>
    <table role="grid" aria-readonly="true">
        <thead>
            <tr role="row">
                <th></th>
                <th role="columnheader">Heading A</th>
                <th role="columnheader">Heading B</th>
                <th role="columnheader">Heading C</th>
            </tr>
        </thead>
        <tbody>
            <tr role="row">
                <th role="rowheader">Subheading i</th>
                <td role="gridcell">Cell A-i</td>
                <td role="gridcell">Cell B-i</td>
                <td role="gridcell">Cell C-i</td>
            </tr>
            <tr role="row">
                <th role="rowheader">Subheading ii</th>
                <td role="gridcell">Cell A-ii</td>
                <td role="gridcell">Cell B-ii</td>
                <td role="gridcell">Cell C-ii</td>
            </tr>
        </tbody>
        <tfoot>
            <tr role="row">
                <th></th>
                <th role="gridcell">Foot A</th>
                <th role="gridcell">Foot B</th>
                <th role="gridcell">Foot C</th>
            </tr>
        </tfoot>
    </table>
</figure>


{% include_cached content/heading.liquid title='Details &amp; Summary' id='details-and-summary' %}

<figure>
    <details>
        <summary>Summary</summary>
        <p>A paragraph (from the Greek paragraphos, "to write beside" or "written beside") is a self-contained unit of a discourse in writing dealing with a particular point or idea. A paragraph consists of one or more sentences. Though not required by the syntax of any language, paragraphs are usually an expected part of formal writing, used to organize longer prose.</p>
        <p>A paragraph (from the Greek paragraphos, "to write beside" or "written beside") is a self-contained unit of a discourse in writing dealing with a particular point or idea. A paragraph consists of one or more sentences. Though not required by the syntax of any language, paragraphs are usually an expected part of formal writing, used to organize longer prose.</p>
    </details>
</figure>


{% include_cached content/heading.liquid title='Preformatted Text' %}

<figure>
    <pre>P R E F O R M A T T E D T E X T
! " # $ % & ' ( ) * + , - . /
0 1 2 3 4 5 6 7 8 9 : ; < = > ?
@ A B C D E F G H I J K L M N O
P Q R S T U V W X Y Z [ \ ] ^ _
` a b c d e f g h i j k l m n o
p q r s t u v w x y z { | } ~ </pre>
</figure>


{% include_cached content/heading.liquid title='Code Block' %}

<figure>
<pre><code>{% raw %}@function strip-unit($number) {
    @if not $number {
        @warn "strip-unit() expects at least one parameter.";
        @return false;
    }
    @return $number / ($number * 0 + 1);
}{% endraw %}</code></pre>
</figure>


{% include_cached content/heading.liquid title='Code Block with Language' %}

{% highlight scss %}
@function strip-unit($number) {
    @if not $number {
        @warn "strip-unit() expects at least one parameter.";
        @return false;
    }
    @return $number / ($number * 0 + 1);
}
{% endhighlight %}


{% include_cached content/heading.liquid title='Extended Code Block with Language' %}

{% include content/code_toggle_top.liquid %}

{% highlight javascript %}
formatDate: function(date) {
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];
    let day = date.getDate();
    if (day < 10) {
        day = `0${day}`;
    }
    let monthIndex = date.getMonth();
    let year = date.getFullYear();
    return `${day} ${months[monthIndex]} ${year}`;
}
{% endhighlight %}

{% include content/code_toggle_bottom.liquid %}


{% include_cached content/heading.liquid title='CodePen Embed' %}

{% include content/codepen.liquid slug='mglHp' height='425' %}


{% include_cached content/heading.liquid title='Can I Use Embed' %}

{% include_cached content/caniuse.liquid feature='css-sel3' %}


{% include_cached content/heading.liquid title='Figure' %}

<figure>
    {% include_cached content/img.liquid src='/images/content/SintraSkyline.jpg' alt='' %}
</figure>


{% include_cached content/heading.liquid title='Figure with Caption' %}

<figure>
    {% include_cached content/img.liquid src='/images/content/SintraSkyline.jpg' alt='' %}
    <figcaption>Sintra, Portugal skyline by … me</figcaption>
</figure>


{% include_cached content/heading.liquid title='Video' %}

<figure>
    <div class="media  media--youtube">
        <iframe src="https://www.youtube.com/embed/G7RgN9ijwE4" title="Have you ever had a dream like this?" webkitallowfullscreen mozallowfullscreen allowfullscreen loading="lazy"></iframe>
    </div>
</figure>

<figure>
    <div class="media  media--vimeo">
        <iframe src="https://player.vimeo.com/video/11933164?color={{ site.color }}&title=0&byline=0&portrait=0" width="810" height="455" title="Cloud Lapse on Vimeo" webkitallowfullscreen mozallowfullscreen allowfullscreen loading="lazy"></iframe>
    </div>
</figure>


{% include_cached content/heading.liquid title='Buttons' %}

<figure role="group">
    <button role="button" type="button">Button</button>
    <button role="button" type="button" disabled>Button</button>
</figure>

<figure role="group">
    <button role="button" type="button" class="button--small">Button</button>
    <button role="button" type="button" class="button--small" disabled>Button</button>
</figure>


{% include_cached content/heading.liquid title='Buttons List' %}

<nav class="buttons-list" role="navigation">
    <button role="button" type="button">Button</button>
    <button role="button" type="button">Button</button>
    <button role="button" type="button">Button</button>
</nav>


{% include_cached content/heading.liquid title='Text Input' %}

<figure role="group">
    <form class="search-form" name="search-styleguide" method="get" action="/search" role="search">
        <label class="search-label  hidden" id="search-label-styleguide" for="search-input-styleguide" hidden>Search for pages and posts</label>
        <input type="search" class="search-input" id="search-input-styleguide" name="query" value="" maxlength="30" aria-labelledby="search-label-styleguide" aria-required="true" required>
        <input type="submit" class="button  search-submit" id="search-button-styleguide" value="Search" role="button">
    </form>
    <form class="search-form" name="search-styleguide-disabled" method="get" action="/search" role="search">
        <label class="search-label  hidden" id="search-label-styleguide-disabled" for="search-input-styleguide" hidden>Search for pages and posts</label>
        <input type="search" class="search-input" id="search-input-styleguide-disabled" name="query" value="" maxlength="30" aria-labelledby="search-label-styleguide" aria-required="true" required aria-disabled="true" disabled>
        <input type="submit" class="button  search-submit" id="search-button-styleguide-disabled" value="Search" role="button" aria-disabled="true" disabled>
    </form>
</figure>


{% include_cached content/heading.liquid title='Sparklines' %}

<figure>
    {% include content/sparkline.liquid title='beer' values=site.categories.beer %}
</figure>
<figure>
    {% include content/sparkline.liquid title='notes' values=site.categories.note %}
</figure>


{% include_cached content/heading.liquid title='Horizontal Rules' %}

--------


{% include_cached content/heading.liquid title='Deck' %}

<div class="h-feed">
        <ol class="deck" role="list">
        {% for page in site.posts limit: 4 %}
            {% include components/item_deck.liquid %}
        {% endfor %}
    </ol>
</div>


{% include_cached content/heading.liquid title='Shelf' %}

<div class="h-feed">
        <ol class="shelf" role="list">
        {% for page in site.categories.beer limit: 3 %}
            {% include components/item_shelf.liquid %}
        {% endfor %}
    </ol>
</div>


{% include_cached content/heading.liquid title='Shelf with Images' %}

<div class="h-feed">
        <ol class="shelf" role="list">
        {% for page in site.categories.music limit: 3 %}
            {% include components/item_shelf.liquid %}
        {% endfor %}
    </ol>
</div>


{% include_cached content/heading.liquid title='Icons' %}

<ul class="icons-list">
    <li>{% include_cached content/svg.liquid type='codepen' %}</li>
    <li>{% include_cached content/svg.liquid type='github' %}</li>
    <li>{% include_cached content/svg.liquid type='lastfm' %}</li>
    <li>{% include_cached content/svg.liquid type='spotify' %}</li>
    <li>{% include_cached content/svg.liquid type='rss' %}</li>
    <li>{% include_cached content/svg.liquid type='twitter' %}</li>
    <li>{% include_cached content/svg.liquid type='article' %}</li>
    <li>{% include_cached content/svg.liquid type='feather' %}</li>
    <li>{% include_cached content/svg.liquid type='link' %}</li>
    <li>{% include_cached content/svg.liquid type='search' %}</li>
    <li>{% include_cached content/svg.liquid type='tag' %}</li>
</ul>


{% include_cached content/heading.liquid title='HTML Attributes' %}

<em>Classes</em> should be double-space delimited.

{% highlight html %}
<div class="content__body  e-content"></div>
{% endhighlight %}


{% include_cached content/heading.liquid title='Vocabulary' %}

I’m always been a proponent for establishing a useful dictionary of specific vocabulary as it pertains to a project. This helps to ensure that everyone can be understood by everyone else. It also reduces the <q>awkwardness</q> for people who might not be familiar with particular nomenclature or naming conventions and could be shy to ask for clarification—rather it makes these definitions known right off the bat, and serves as a reference for the future.

<dl>
    <dt>DRY</dt>
    <dd><strong>D</strong>on’t <strong>R</strong>epeat <strong>Y</strong>ourself—<q>a principle of software development aimed at reducing repetition of all kinds.</q> <cite class="h-cite">(<a href="https://en.wikipedia.org/wiki/Don%27t_repeat_yourself" rel="external">Wikipedia</a>)</cite></dd>
    <dt>measure</dt>
    <dd>A unit of length, designated for specific values for one dimension of measurement, e.g. <code>margin</code>, <code>padding</code>, etc.</dd>
    <dt>size</dt>
    <dd>Also a unit of length, but denoted for specific values for two dimensions of measurement, e.g. avatars, icons, etc.</dd>
</dl>


{% include_cached content/heading.liquid title='Technology' %}

The CSS is compiled from SCSS using [gulp.js](https://github.com/gulpjs/gulp#readme) and some [PostCSS](http://postcss.org).

The front-end is compiled with [Jekyll](https://jekyllrb.com), source files hosted by [GitHub](https://github.com), front-end hosted by [DigitalOcean](https://digitalocean.com), and sits behind [CloudFlare](https://www.cloudflare.com) for <abbr title="storing data so future requests for that data can be served faster">caching</abbr>, <abbr title="Secure Sockets Layer">SSL</abbr>, and as a <abbr title="Content Delivery Network">CDN</abbr>.
