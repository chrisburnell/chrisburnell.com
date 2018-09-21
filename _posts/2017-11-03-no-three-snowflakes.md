---
categories: article

date: 2017-11-03 17:01:00

title: No Three Snowflakes Are Alike
lede: I developed a Sass function to generate a list of unique pairs given a List or Map of data, so I extrapolated the idea and refactored the function to generate a series of unique groups of size <var>n</var>.
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
comments: disqus
shorturl: 2p4f3

syndicate-to:
- https://twitter.com/iamchrisburnell/status/926496715213033472
---


In [Unique Pairs in Sass]({% post_url 2017-06-16-unique-pairs-in-sass %}) I outlined a Sass function I developed in pursuit of generating a list of unique pairs from a given list of data. While this technique certainly isn’t so powerful or far-reaching as to cause you to refactor all of your Sass, once you find yourself needing to dynamically generate unique pairs, the Sass function shoulders the weight of any complexity. Things like <q>between <var>X</var> and <var>Y</var></q> are perfectly suited to leverage this function.

But what about when you want to generate unique groups of more than <var>2</var> items? Multiples of <var>3</var>, <var>4</var>, <var>n</var>?

We’ll need to make sure our dataset contains more than <var>n</var> items—making unique groups of three items from a dataset of only three items would make our function entirely moot. From there, refactoring the function mostly comes down to keep track of how we’re iterating through the items in the dataset and repeating this iteration in a recursive-like way the same number of times as items per unique group.


{% include_cached content/heading.html title='Let’s just jump right into it' %}

{% include content/code-toggle-top.html %}

{% highlight scss %}
@function unique-groups($data, $size: 2) {
    @if not $data or not (type-of($data) == list or type-of($data) == map) {
        @warn "`unique-groups()` expects either a single List or single Map for `$data`.";
        @return false;
    }

    $unique-groups: ();

    @if type-of($data) == list {
        $seen-first: ();
        @each $first in $data {
            $seen-first: append($seen-first, $first);
            $seen-second: ();
            @each $second in $data {
                $seen-second: append($seen-second, $second);
                @if $first != $second and not index($seen-first, $second) {
                    @if $size >= 3 {
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
                    }
                    @else {
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
    @else if type-of($data) == map {
        $seen-first: ();
        @each $first-key, $first-value in $data {
            $seen-first: append($seen-first, $first-key);
            $seen-second: ();
            @each $second-key, $second-value in $data {
                $seen-second: append($seen-second, $second-key);
                @if $first-key != $second-key and not index($seen-first, $second-key) {
                    @if $size >= 3 {
                        @each $third-key, $third-value in $data {
                            @if $second-key != $third-key and not index($seen-second, $third-key) {
                                $unique-group: (
                                    ($first-key: $first-value),
                                    ($second-key: $second-value),
                                    ($third-key: $third-value)
                                );
                                $unique-groups: append($unique-groups, $unique-group);
                            }
                        }
                    }
                    @else {
                        $unique-group: (
                            ($first-key: $first-value),
                            ($second-key: $second-value)
                        );
                        $unique-groups: append($unique-groups, $unique-group);
                    }
                }
            }
        }
    }

    @else {
        @warn "`unique-groups()` expects either a List or Map `$data` parameter.";
        @return false;
    }

    @return $unique-groups;
}
{% endhighlight %}

{% include content/code-toggle-bottom.html %}

As with the previous version of the function, it can accept the required dataset as either a *List* or *Map*. Using our mathematical formula from before, we can plug in our variables and figure out how many unique multiples to expect from a dataset.

<figure>
    <p>Let <var>n</var> = size of dataset<br>Let <var>m</var> = items / group</p>
    <samp class="beta">
        <var>n</var>(<var>n</var>&minus;1)&frasl;<var>m</var>
    </samp>
</figure>

<figure>
    <p>So, from a dataset of size <var>4</var>, if we want a group size of <var>3</var>, we can expect <var>4</var> unique groups:</p>
    <samp class="beta"><var>4</var>(<var>4</var>&minus;1)&frasl;<var>3</var> = <var>4</var></samp>
</figure>


{% include_cached content/heading.html title='In Action' %}

{% highlight scss %}
$border-styles: 5px solid black;

$list:
    top,
    right,
    bottom,
    left;

@each $unique-group in unique-groups($list, 3) {
    $unique-group-first:  nth($unique-group, 1);
    $unique-group-second: nth($unique-group, 2);
    $unique-group-third:  nth($unique-group, 3);

    .border--#{$unique-group-first}-and-#{$unique-group-second}-and-#{$unique-group-third} {
        border-#{$unique-group-first}:  $border-styles;
        border-#{$unique-group-second}: $border-styles;
        border-#{$unique-group-third}:  $border-styles;
    }
}
{% endhighlight %}

{% highlight css %}
.border--top-and-right-and-bottom {
    border-top:    5px solid black;
    border-right:  5px solid black;
    border-bottom: 5px solid black;
}

.border--top-and-right-and-left {
    border-top:   5px solid black;
    border-right: 5px solid black;
    border-left:  5px solid black;
}

.border--top-and-bottom-and-left {
    border-top:    5px solid black;
    border-bottom: 5px solid black;
    border-left:   5px solid black;
}

.border--right-and-bottom-and-left {
    border-right:  5px solid black;
    border-bottom: 5px solid black;
    border-left:   5px solid black;
}
{% endhighlight %}

If you find a clever use for this `@function`, I’d love to see it in action on your own projects, so hit me up and let me know!
