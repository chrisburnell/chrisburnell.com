---
title: Styleguide
lede: The style guide for <span class="canada">chrisburnell.com</span>.
caniuse: true
codepen: true
speakerdeck: true
twitter: true
---
{% from 'macros/deckItem.njk' import deckItem %}
{% from 'macros/shelfItem.njk' import shelfItem %}

## Colours

<ul class="palette-list" id="colors">
    {%- for colour in palette -%}
        <li data-color="{{ colour.name | lower }}">
            <h3>{{ colour.name }}</h3>
            <div class="monospace">#{{ colour.hex }}</div>
            <div class="monospace">{{ colour.hsl }}</div>
        </li>
    {%- endfor -%}
</ul>


## Measures

<dl>
    <dt>Tiny</dt>
    <dd><div class="measure-example  measure-example--tiny"></div></dd>
    <dt>Small</dt>
    <dd><div class="measure-example  measure-example--small"></div></dd>
    <dt>Medium</dt>
    <dd><div class="measure-example  measure-example--medium"></div></dd>
    <dt>Large</dt>
    <dd><div class="measure-example  measure-example--large"></div></dd>
    <dt>Gigantic</dt>
    <dd><div class="measure-example  measure-example--gigantic"></div></dd>
    <dt>Responsive</dt>
    <dd><div class="measure-example  measure-example--responsive"></div></dd>
</dl>


## Transitions

<div class="transition-example  transition-example--slide">
    <div class="transition-example__demo  monospace">transition: all 0.2s ease;</div>
</div>

<div class="transition-example  transition-example--fade">
    <div class="transition-example__demo  monospace">transition: all 0.2s ease;</div>
</div>


## Fonts

<p>Primary Font: "Proxima Nova", sans-serif;</p>

<p><em>Primary Font italic: "Proxima Nova", sans-serif;</em></p>

<p><strong>Primary Font bold: "Proxima Nova", sans-serif;</strong></p>

<p class="serif">Secondary Font: Georgia, Times, Times New Roman, serif;</p>

<p class="serif"><em>Secondary Font italic: Georgia, Times, Times New Roman, serif;</em></p>

<p class="monospace">Monospace Font: monospace;</p>

<p style="font-family: 'Heebo', sans-serif; font-size: 1.375rem;">Title Font: "Heebo", sans-serif;</p>


## Headings

<p class="alpha">Heading Level 1 · α</p>

<p class="beta">Heading Level 2 · β</p>

<p class="gamma">Heading Level 3 · γ</p>

<p class="delta">Heading Level 4 · δ</p>

<p class="epsilon">Heading Level 5 · ε</p>

<p class="zeta">Heading Level 6 · ζ</p>


## Paragraph

<p>A paragraph (from the Greek paragraphos, <q>to write beside</q> or <q>written beside</q>) is a self-contained unit of a discourse in writing dealing with a particular point or idea. A paragraph consists of one or more sentences. Though not required by the syntax of any language, paragraphs are usually an expected part of formal writing, used to organize longer prose.</p>

<p class="columns">A paragraph (from the Greek paragraphos, <q>to write beside</q> or <q>written beside</q>) is a self-contained unit of a discourse in writing dealing with a particular point or idea. A paragraph consists of one or more sentences. Though not required by the syntax of any language, paragraphs are usually an expected part of formal writing, used to organize longer prose.</p>


## Aside

<aside>
    <p>An aside represents a section of the page with content connected tangentially to the rest, which could be considered separate from that content.</p>
</aside>

<p>A paragraph (from the Greek paragraphos, “to write beside” or “written beside”) is a self-contained unit of a discourse in writing dealing with a particular point or idea. A paragraph consists of one or more sentences. Though not required by the syntax of any language, paragraphs are usually an expected part of formal writing, used to organize longer prose.</p>


## Inline Elements

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

This <small>small text</small> for fine print, etc.

Abbreviation: <abbr title="HyperText Markup Language">HTML</abbr>

Keyboard input: <kbd>Tab</kbd>

This text is a <q cite="https://developer.mozilla.org/en-US/docs/HTML/Element/q">short inline quotation</q>

This text is a <q cite="https://developer.mozilla.org/en-US/docs/HTML/Element/q">short inline quotation with <q>another short inline quotation</q> inside</q>

This is a <cite class="h-cite">citation</cite>

The <dfn title="definition element">dfn element</dfn> indicates a definition

The <mark>mark element</mark> indicates a highlight

This is what <code>inline code</code> looks like

This is <samp>sample output</samp> from a computer program

The <var>variable element</var>, such as <var>x</var> = <var>y</var>


## Blockquote

<blockquote>
    <p>A block quotation (also known as a long quotation or extract) is a quotation in a written document, that is set off from the main text as a paragraph, or block of text, and typically distinguished visually using indentation and a different typeface or smaller size quotation.</p>
</blockquote>


## Blockquote with Citation

<blockquote>
    <p>A block quotation (also known as a long quotation or extract) is a quotation in a written document, that is set off from the main text as a paragraph, or block of text, and typically distinguished visually using indentation and a different typeface or smaller size quotation.</p>
    <cite class="h-cite">Quote Source</cite>
</blockquote>


## Twitter Embedded Quote

{% tweet 'assumptions do not a civil developer make', 'https://twitter.com/iamchrisburnell/status/590910692955389952' %}


## Unordered List

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


## Ordered List

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


## Ordered List Reversed

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


## Ordered List Reversed, Twice

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


## Definition List

<dl>
    <dt>Definition List</dt>
    <dd>A number of connected items or names written or printed consecutively, typically one below the other.</dd>
    <dt>This is a term.</dt>
    <dd>This is the definition of that term, which both live in a <code>dl</code>.</dd>
    <dt>And another term.</dt>
    <dd>And it gets a definition too, which is this line.</dd>
</dl>


## Table

<figure>
    <table>
        <thead>
            <tr>
                <th>Heading A</th>
                <th>Heading B</th>
                <th>Heading C</th>
                <th>Heading D</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Cell A-1</td>
                <td>Cell B-1</td>
                <td>Cell C-1</td>
                <td>Cell D-1</td>
            </tr>
            <tr>
                <td>Cell A-2</td>
                <td>Cell B-2</td>
                <td>Cell C-2</td>
                <td>Cell D-2</td>
            </tr>
            <tr>
                <td>Cell A-3</td>
                <td>Cell B-3</td>
                <td>Cell C-3</td>
                <td>Cell D-3</td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <th>Foot A</th>
                <th>Foot B</th>
                <th>Foot C</th>
                <th>Foot D</th>
            </tr>
        </tfoot>
    </table>
</figure>


## Table with Alternating Rows

<figure>
    <table class="zebra">
        <thead>
            <tr>
                <th>Heading A</th>
                <th>Heading B</th>
                <th>Heading C</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Cell A-1</td>
                <td>Cell B-1</td>
                <td>Cell C-1</td>
            </tr>
            <tr>
                <td>Cell A-2</td>
                <td>Cell B-2</td>
                <td>Cell C-2</td>
            </tr>
            <tr>
                <td>Cell A-3</td>
                <td>Cell B-3</td>
                <td>Cell C-3</td>
            </tr>
            <tr>
                <td>Cell A-4</td>
                <td>Cell B-4</td>
                <td>Cell C-4</td>
            </tr>
            <tr>
                <td>Cell A-5</td>
                <td>Cell B-5</td>
                <td>Cell C-5</td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <th>Foot A</th>
                <th>Foot B</th>
                <th>Foot C</th>
            </tr>
        </tfoot>
    </table>
</figure>


## Table with Subheadings

<figure>
    <table>
        <thead>
            <tr>
                <th></th>
                <th>Heading A</th>
                <th>Heading B</th>
                <th>Heading C</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th>Subheading i</th>
                <td>Cell A-i</td>
                <td>Cell B-i</td>
                <td>Cell C-i</td>
            </tr>
            <tr>
                <th>Subheading ii</th>
                <td>Cell A-ii</td>
                <td>Cell B-ii</td>
                <td>Cell C-ii</td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <th></th>
                <th>Foot A</th>
                <th>Foot B</th>
                <th>Foot C</th>
            </tr>
        </tfoot>
    </table>
</figure>


## Details and Summary

<figure>
    <details>
        <summary>Summary</summary>
        <p>A paragraph (from the Greek paragraphos, "to write beside" or "written beside") is a self-contained unit of a discourse in writing dealing with a particular point or idea. A paragraph consists of one or more sentences. Though not required by the syntax of any language, paragraphs are usually an expected part of formal writing, used to organize longer prose.</p>
        <p>A paragraph (from the Greek paragraphos, "to write beside" or "written beside") is a self-contained unit of a discourse in writing dealing with a particular point or idea. A paragraph consists of one or more sentences. Though not required by the syntax of any language, paragraphs are usually an expected part of formal writing, used to organize longer prose.</p>
    </details>
</figure>


## Preformatted Text

<pre><code>
P R E F O R M A T T E D T E X T
! " # $ % &amp; ' ( ) * + , - . /
0 1 2 3 4 5 6 7 8 9 : ; &lt; = > ?
@ A B C D E F G H I J K L M N O
P Q R S T U V W X Y Z [ \ ] ^ _
` a b c d e f g h i j k l m n o
p q r s t u v w x y z { | } ~
</code></pre>


## Code Block

```
@function strip-unit($number) {
    @if not $number {
        @warn "strip-unit() expects at least one parameter.";
        @return false;
    }
    @return $number / ($number * 0 + 1);
}
```


## Code Block with Language

```scss
@function strip-unit($number) {
    @if not $number {
        @warn "strip-unit() expects at least one parameter.";
        @return false;
    }
    @return $number / ($number * 0 + 1);
}
```


## CodePen Embed

{% codepen 'mglHp', false, 425 %}


## Can I Use Embed

{% caniuse 'css-sel3' %}


## Figure

<figure>
    <img src="/images/content/SintraSkyline.jpg" alt="">
</figure>


## Figure with Caption

<figure>
    <img src="https://chrisburnell.com/images/content/SintraSkyline.jpg">
    <figcaption>Sintra, Portugal skyline by … me</figcaption>
</figure>


## Video

<figure>
    <iframe src="https://www.youtube.com/embed/G7RgN9ijwE4" title="Have you ever had a dream like this?" allowfullscreen loading="lazy"></iframe>
</figure>

<figure>
    <iframe src="https://player.vimeo.com/video/11933164?color={{ site.color }}&title=0&byline=0&portrait=0" title="Cloud Lapse on Vimeo" allowfullscreen loading="lazy"></iframe>
</figure>


## Speakerdeck

<figure>
    <div class=" [ media  speakerdeck ] ">
        <div class="speakerdeck-embed" data-id="b933d8a3500240b8b7d2b879f075329b"></div>
    </div>
</figure>


## Buttons

<nav class=" [ navigator ] ">
    <button type="button">Button</button>
    <button type="button" disabled>Button</button>
    <button class="button--small" type="button">Button</button>
</nav>


## Deck

<nav class=" [ deck ] ">
    {% for item in collections.article | reverse | limit(site.limits.snapshot) %}
        {{ deckItem(item, global.now, collections.all, webmentions, false) }}
    {% endfor %}
</nav>


## Shelf

<nav class=" [ shelf ] ">
    {% for item in collections.beer | limit(site.limits.snapshot) %}
        {{ shelfItem(item, global.now, collections.all, false) }}
    {% endfor %}
</nav>


## Shelf with Images

<nav class=" [ shelf ] ">
    {% for item in collections.music | limit(site.limits.snapshot) %}
        {{ shelfItem(item, global.now, collections.all, false) }}
    {% endfor %}
</nav>