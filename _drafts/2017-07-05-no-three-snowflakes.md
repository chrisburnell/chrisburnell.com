---
categories: article

date: 2018-01-01 13:00:00

title: No Three Snowflakes Are Alike
lede: I developed a Sass function to generate a list of unique pairs given a List or Map of data, so I extrapolated the idea and refactored the function to generate a series of unique groups of a specified size.
tags:
- sass
- tutorials

banner:
- no-three-snowflakes@2x.jpg
- no-three-snowflakes.jpg
banner_mobile:
- no-three-snowflakes_mobile@2x.jpg
- no-three-snowflakes_mobile.jpg

codepen: true
shorturl: 2p4f3
---


In [Unique Pairs in Sass]({% post_url 2017-06-16-unique-pairs-in-sass %}) I outlined a Sass function I developed in pursuit of generating a list of unique pairs from a given list of data. While this technique certainly isn’t so powerful or far-reaching as to cause you to refactor all of your Sass, once you find yourself with the need to dynamically generate unique pairs, the Sass function shoulders the weight of any complexity. Things like <q>between <var>X</var> and <var>Y</var></q> for a range of <var>X</var> and <var>Y</var> are perfectly suited to leverage this function.

But what about when you want to generate unique groups of more than two items? Well, to begin with, we’ll need to make sure our dataset contains more than three items—making unique groups of three from a dataset of only three items makes our function a bit moot. From there, refactoring the function mostly comes down to keep track of how we’re iterating through the items in the dataset and repeating this iteration the same number of times as items per unique group.

As with the previous version of the function, let’s firstly look at an example given a *List* of data. In this example, we want to generate some classes which each define some borders composed of a combination of two of four possible locations: top, right, bottom, and left. Using our mathematical formula from before, we can plug in our values and figure out how many unique pairs to expect from a set of four items:

<figure>
    <samp class="beta"><var>n</var>(<var>n</var>&minus;1)&frasl;<var>2</var></samp>
</figure>

<figure>
    <samp class="beta"><var>4</var>(<var>4</var>&minus;1)&frasl;<var>2</var> = <var>6</var></samp>
</figure>

So we can expect to generate <var>6</var> unique pairs from <var>4</var> items in the dataset.

{% highlight scss %}
$list:
    top,
    right,
    bottom,
    left;

@each $unique-pair in unique-pairs($list) {
    $unique-pair-first:  nth($unique-pair, 1);
    $unique-pair-second: nth($unique-pair, 2);
    .border--#{$unique-pair-first}-and-#{$unique-pair-second} {
        border-#{$unique-pair-first}:  5px solid black;
        border-#{$unique-pair-second}: 5px solid black;
    }
}
{% endhighlight %}

{% include content/code-toggle-top.html %}
{% highlight css %}
.border--top-and-right {
    border-top:   5px solid red;
    border-right: 5px solid red;
}

.border--top-and-bottom {
    border-top:   5px solid red;
    border-bottom: 5px solid red;
}

.border--top-and-left {
    border-top:  5px solid red;
    border-left: 5px solid red;
}

.border--right-and-bottom {
    border-right:  5px solid red;
    border-bottom: 5px solid red;
}

.border--right-and-left {
    border-right: 5px solid red;
    border-left:  5px solid red;
}

.border--bottom-and-left {
    border-bottom: 5px solid red;
    border-left:   5px solid red;
}
{% endhighlight %}
{% include content/code-toggle-bottom.html %}

Now that we’re confident in our logic to build this CSS, let’s figure out how to refactor the function to build combinations of more than two (pairs). Ideally, we’ll end up with CSS something like the following:

{% highlight css %}
.border--top-and-right-and-bottom {
    border-top:    5px solid red;
    border-right:  5px solid red;
    border-bottom: 5px solid red;
}
{% endhighlight %}

Let’s revisit our mathematical formula to figure out how many unique groups of <var>3</var> to expect from our dataset of <var>4</var> items:

<figure>
    <samp class="beta"><var>4</var>(<var>4</var>&minus;1)&frasl;<var>3</var> = <var>4</var></samp>
</figure>

So we can expect <var>4</var> unique groups of <var>3</var>.

{% highlight scss %}
@if type-of($data) == list {
    $seen-first: ();
    @each $first in $data {
        $seen-first: append($seen-first, $first);
        $seen-second: ();
        @each $second in $data {
            $seen-second: append($seen-second, $second);
            @if $first != $second and not index($seen-first, $second) {
                @if $size >= 3 and length($data) > 3 {
                    @each $third in $data {
                        @if $second != $third and not index($seen-second, $third) {
                            $unique-group: (
                                $first,
                                $second,
                                $third
                            );
                            $unique-groups: append($unique-groups, $unique-group);
                        }
                    }
                } @else {
                    $unique-group: (
                        $first,
                        $second
                    );
                    $unique-groups: append($unique-groups, $unique-group);
                }
            }
        }
    }
}
{% endhighlight %}
