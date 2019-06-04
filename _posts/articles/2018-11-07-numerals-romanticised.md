---
date: 2018-11-07 12:13:00

title: Numerals, Romanticised
lede: For a better part of the year, I've been working on a Jekyll-based Progressive Web App, <a href="https://bloodbuilder.online" rel="me  external">BloodBuilder</a>, for managing my Sorcerer in a game of Pathfinder I've been playing with some friends. One of the many intricate parts of logic involves the ability to convert Arabic numerals to and from Roman numerals, so I wrote a simple Liquid include to handle this.

tags:
- jekyll
- liquid

banner:
- numerals-romanticised@2x.jpg
- numerals-romanticised.jpg
banner_mobile:
- numerals-romanticised_mobile@2x.jpg
- numerals-romanticised_mobile.jpg

further_reading:
- title: Roman numerals on Wikipedia
  link: https://en.wikipedia.org/wiki/Roman_numerals
- title: BloodBuilder, a Super Simple PWA for 1st Edition Pathfinder Pure Core Classes
  link: https://bloodbuilder.online/

redirect_from:
- /article/numerals-romanticized.html

syndicate_to:
- https://mastodon.social/users/chrisburnell/statuses/101029942322511486
- https://twitter.com/iamchrisburnell/status/1060150621091827712
---

<blockquote>
    <p>You found a Bag of Holding (III)…</p>
</blockquote>

In case you aren’t familiar with Roman numerals and how they relate to Arabic numerals, Roman numerals are denoted by letters, each of which represents a numeric value, and by adding each of the values in the sequence together, you arrive at the result.

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

These seven are the only Roman numerals, and using specific combinations of these numerals in a particular order, from greater to lesser values, you can represent any Arabic numerals; although, the readability of Roman numerals can suffer greatly depending on the number you want to represent.

<samp>MDCCCLXXXVIII</samp> (1888) is rather unwieldy, but can still be parsed with a consistent set of steps and you’ll quickly arrive at the result.

There are also some exceptions that we need to be aware of based on the left-to-right parsing we’ll be performing on the Roman numerals, so let’s focus for a moment on the first ten Roman numerals and highlight these types of exceptions:

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

We can read Roman numerals such as <samp>VII</samp> as <samp>5 + 1 + 1 = 7</samp>.

Similarly, <samp>VIII</samp> can be thought of as <samp>5 + 1 + 1 + 1 = 8</samp>.

But to follow that line of thinking and think of <samp>9</samp> as <samp>5 + 1 + 1 + 1 + 1</samp> and write <samp>VIIII</samp> is not correct.

The rule here is that a character in Roman numerals can have no more than *three <q>modifiers</q>*. So, to represent <samp>9</samp> in Roman numerals, we instead refer to the *next higher value* (<samp>I</samp>, <samp>V</samp>, <samp>X</samp>, <samp>L</samp>, etc.) and modify that value. In this case, the next higher value from <samp>V</samp> is <samp>X</samp>, so we say <samp>10 - 1</samp>, or <q>one before ten</q>, so <samp>9</samp> is written as <samp>IX</samp>.

An easy way to spot these <q>exceptions</q> is to look for letters which appear out of order—Roman numerals are written with higher-value letters *almost always* appearing before lower-value letters, reading from left to right, higher to lower—so any letter which appears before a higher value tells you that it falls under the <q>one before</q> exception.

<samp>IV</samp> is not <samp>1 + 5</samp>, it is <q>1 before 5</q>, or <samp>-1 + 5 = 4</samp>.

<samp>XL</samp> is not <samp>10 + 50</samp>, it is <q>10 before 50</q>, or <samp>-10 + 50 = 40</samp>.

Rewriting the first ten numbers to take into account this rule, we now have:

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


{% include content/heading.html title='History Lesson Over, On To The Code' %}

First we need to set up some data to be able to relate Arabic numerals to their Roman counterparts.

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

You’ll notice that I have included the double-letter combinations which represent the <q>one-value-less</q> case that we described above. This is important to be able to accurately convert numerals, as the combination of the two characters does *not* equal the sum of the two characters on their own.

Let’s step through converting an Arabic numeral (e.g. <samp>1569</samp>) to Roman numerals (<samp>MDLXIX</samp>). To do this we have to loop through our numeral conversion data from highest to lowest values. If our Arabic numeral is **greater than** the Arabic value in the data, we subtract that value from our Arabic numeral, we append the Roman value to our <var>output</var> string (which starts as being empty), and we start looping through the data from the top again. If our Arabic numeral is **less than** the Arabic value in the data, we continue looping and comparing the data to our Arabic numeral.

{% highlight liquid %}{% raw %}
{% assign input = include.value %}
{% for c in (1..9999) %}
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
{{ output }}
{% endraw %}{% endhighlight %}

Because we’re subtracting values from our Arabic numeral as we loop and convert Arabic values to Roman numerals, we will know when we’re done because our Arabic numeral will equal <samp>0</samp>.

The same can be done for going from Roman numerals to Arabic. To do so, we have to check each character in-sequence and tally up their values to arrive at the Arabic value. Like before, we have to watch out for the <q>one-value-less</q> exceptions, so instead of just checking each single character in sequence, we’ll first check if the *next two* characters in the Roman numeral sequence match an exception, and if so, use that value instead.

{% highlight liquid %}{% raw %}
{% assign input = include.value %}
{% for c in (1..9999) %}
    {% assign slice_double = input | slice: 0, 2 %}
    {% assign slice_single = input | slice: 0 %}
    {% for numeral in site.data.numerals %}
        {% if slice_double == numeral.roman or slice_single == numeral.roman %}
            {% assign input = input | replace_first: numeral.roman %}
            {% assign output = output | plus: numeral.arabic %}
            {% break %}
        {% endif %}
    {% endfor %}
    {% if input == '' %}
        {% break %}
    {% endif %}
{% endfor %}
{{ output }}
{% endraw %}{% endhighlight %}

In this case we know we’re done converting when we’ve run out of Roman characters to parse.

You’ll also notice, in both cases, that there’s a loop that goes from <samp>1</samp> through <samp>999</samp>. While normally this would be a point of poor performance, this limit should never be reached, unless the value being converted is *extremely* long, in which case Roman numerals would be poorly-suited to represent. This big loop is used to cycle through an arbitrary number of characters passed as an input to the include.

{% include content/heading.html title='Copy This Part' %}

{% highlight liquid %}{% raw %}
{%- assign input = include.value | times: 1 -%}
{%- if input != 0 -%}
    {%- assign output = '' -%}
    {%- for c in (1..9999) -%}
        {%- for numeral in site.data.numerals -%}
            {%- if input >= numeral.arabic -%}
                {%- assign input = input | minus: numeral.arabic -%}
                {%- assign output = output | append: numeral.roman -%}
                {%- break -%}
            {%- endif -%}
        {%- endfor -%}
        {%- if input == 0 -%}
            {%- break -%}
        {%- endif -%}
    {%- endfor -%}
{%- else -%}
    {%- assign input = include.value -%}
    {%- assign output = 0 -%}
    {%- for c in (1..9999) -%}
        {%- assign slice_double = input | slice: 0, 2 -%}
        {%- assign slice_single = input | slice: 0 -%}
        {%- for numeral in site.data.numerals -%}
            {%- if slice_double == numeral.roman or slice_single == numeral.roman -%}
                {%- assign input = input | replace_first: numeral.roman -%}
                {%- assign output = output | plus: numeral.arabic -%}
                {%- break -%}
            {%- endif -%}
        {%- endfor -%}
        {%- if input == '' -%}
            {%- break -%}
        {%- endif -%}
    {%- endfor -%}
{%- endif -%}
{{ output }}
{% endraw %}{% endhighlight %}

And there you have it. Should you need a <q>covers-all-bases</q> solution in *Liquid* for converting to and from Roman numerals, this will do the trick.
