---
categories: article

date: 2018-10-18 09:00:00

title: Converting Numerals with Liquid
lede: For a better part of the year, I’ve been working on a Jekyll-based Progressive Web App, <a href="https://bloodbuilder.online/">BloodBuilder</a> for managing my Sorcerer in a game of Pathfinder I’ve been playing in with some friends. One of the many intricate parts of the PWA involves the ability to convert arabic numerals to and from roman numerals, so I wrote a simple include to handle this.
tags:
- jekyll
- liquid
---

Could be simpler with a plugin, but this will work for those on GitHub Pages where the plugin options don’t offer a lot.

In case you aren’t familiar with roman numerals and how they relate to arabic numerals, roman numerals are denoted by letters, each of which represents a value, and by adding each of the values together, you arrive at the result.

The roman numerals are:

<figure>
<pre>
I = 1
V = 5
X = 10
L = 50
C = 100
D = 500
M = 1000
</pre>
</figure>

So to represent <samp>7</samp> in roman numerals, we’ll start with higher-value letters and work our way down until all the letter-values add up to <samp>7</samp>, ending up with <samp>VII</samp> (<samp>5 + 1 + 1</samp>).

However, there are some exceptions that we need to be aware of based on the left-to-right parsing we’ll be performing on the roman numerals, so let’s focus for a moment on the first ten numbers and highlight the exceptions:

<figure>
<pre>
I = 1
II = 2
III = 3
<del>IIII = 4</del>
V = 5
VI = 6
VII = 7
VIII = 8
<del>VIIII = 9</del>
X = 10
</pre>
</figure>

The errors above have to do with a simple rule.

To explain, when writing <samp>7</samp> in roman numerals, think of it like <samp>5 + 1 + 1</samp>, almost as if the <samp>I</samp> numerals are *modifiers* of the <samp>V</samp> numeral. Similarly, <samp>8</samp> can be thought of as <samp>5 + 1 + 1 + 1</samp>, but to think of <samp>9</samp> as <samp>5 + 1 + 1 + 1 + 1</samp> is not accurate.

The rule here is that a roman numeral can have no more than **three** modifiers. So, to represent <samp>9</samp> in roman numerals, we instead say <samp>10 - 1</samp> or <q><em>one before ten</em></q>: <samp>IX</samp>.

Following this logic, we can surmise that in order to represent the final letter-value before the next level of letter-value would be used, we say <q><em>one less than …</em></q> Rewriting the first ten numbers would look as follows:

<figure>
<pre>
I = 1
II = 2
III = 3
<mark>IV = 4</mark>
V = 5
VI = 6
VII = 7
VIII = 8
<mark>IX = 9</mark>
X = 10
</pre>
</figure>

--------

First we need to set up some data to be able to relate arabic numerals to their roman counterparts.

{% highlight yaml %}
- arabic: 1000
  roman: M
- arabic: 900
  roman: CM
- arabic: 500
  roman: D
- arabic: 400
  roman: CD
- arabic: 100
  roman: C
- arabic: 90
  roman: XC
- arabic: 50
  roman: L
- arabic: 40
  roman: XL
- arabic: 10
  roman: X
- arabic: 9
  roman: IX
- arabic: 5
  roman: V
- arabic: 4
  roman: IV
- arabic: 1
  roman: I
{% endhighlight %}

{% highlight liquid %}{% raw %}
{% assign input = include.value | times: 1 %}
{% if input != 0 %}
    {% assign output = '' %}
    {% for c in (1..999) %}
        {% for numeral in site.data.numerals %}
            {% if input >= numeral.arabic %}
                {% assign input = input | minus: numeral.arabic %}
                {% assign output = output | append: numeral.roman %}
                {% break %}
            {% endif %}
        {% endfor %}
        {% if input == 0 %}
            {% break %}
        {% endif %}
    {% endfor %}
{% else %}
    {% assign input = include.value %}
    {% assign output = 0 %}
    {% for c in (1..999) %}
        {% assign slice_double = input | slice: 0, 2 %}
        {% assign slice_single = input | slice: 0 %}
        {% for numeral in site.data.numerals %}
            {% if slice_double == numeral.roman %}
                {% assign input = input | replace_first: numeral.roman %}
                {% assign output = output | plus: numeral.arabic %}
                {% break %}
            {% elsif slice_single == numeral.roman %}
                {% assign input = input | replace_first: numeral.roman %}
                {% assign output = output | plus: numeral.arabic %}
                {% break %}
            {% endif %}
        {% endfor %}
        {% if input == '' %}
            {% break %}
        {% endif %}
    {% endfor %}
{% endif %}
{{ output }}
{% endraw %}{% endhighlight %}
