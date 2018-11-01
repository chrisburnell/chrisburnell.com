---
categories: article

date: 2018-10-18 09:00:00

title: Numerals, Romanticised
lede: For a better part of the year, I’ve been working on a Jekyll-based Progressive Web App, <a href="https://bloodbuilder.online/" rel="external me">BloodBuilder</a> for managing my Sorcerer in a game of Pathfinder I’ve been playing with some friends. One of the many intricate parts of logic involves the ability to convert Arabic numerals to and from Roman numerals, so I wrote a simple include to handle this.

tags:
- jekyll
- liquid

further_reading:
- title: Roman numerals on Wikipedia
  url: https://en.wikipedia.org/wiki/Roman_numerals

redirect_from: /article/numerals-romanticized.html
---

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

These seven are the only Roman numerals, and using combinations of these numerals in a particular order, you can represent any Arabic numerals; although, the readability of Roman numerals can suffer greatly depending on the number you want to represent. For example, <samp>13 = XIII</samp>, which is simple enough to follow, but <samp>1888 = MDCCCLXXXVIII</samp> is rather unwieldy.

Despite its length, even <samp>MDCCCLXXXVIII</samp> can be parsed with relative ease and you’ll quickly arrive at the result.

However, there are some exceptions that we need to be aware of based on the left-to-right parsing we’ll be performing on the Roman numerals, so let’s focus for a moment on the first ten numbers and highlight the exceptions:

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

You’ll notice that I have included the double-letter combinations which represent the <q>one-value-less</q> case that we described above. This is important to be able to accurately convert numerals.

Let’s step through converting an Arabic numeral (<samp>1569</samp>) to Roman numerals (<samp>MDLXIX</samp>). To do this we have to loop through our numeral conversion data from highest to lowest values. If our Arabic numeral is **greater than** the Arabic value in the data, we subtract that value from our Arabic numeral, we append the Roman value to our <var>output</var> string (which starts as being empty), and we start looping through the data from the top again. If our Arabic numeral is **less than** the Arabic value in the data, we continue looping and comparing the data to our Arabic numeral.

Because we’re subtracting values from our Arabic numeral as we loop and convert Arabic values to Roman numerals, we will know when we’re done because our Arabic numeral will equal <samp>0</samp>.

{% highlight liquid %}{% raw %}
{% assign input = include.value %}
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
{{ output }}
{% endraw %}{% endhighlight %}
