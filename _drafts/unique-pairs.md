---
layout: post
categories: article

# date: 2017-01-19 12:00:00

title: Unique Pairs in Sass
lede: In creating a from-scratch (but informed) grid for a redevelopment project at work, I was using Sass to loop through various bits of data to generate a bunch of repetitive CSS, but I realised I had no clean way of generating a list of unique pairs of items from a given dataset, so I set out to find out how.
tags:
- sass
- tutorials

codepen: true
comments: true
shorturl: e1wjg
---


The purpose of Sass is often misunderstood as adding complexity to CSS, which is, relative to proper programming languages, quite simple in its syntax. While not as much of a problem these days, in the early days of Sass adoption, it was too common to see complex snippets of Sass to achieve a very simple goal in CSS. Code like this is usually born from a fundamental misunderstanding of what Sass is good at and what it’s bad at—what purpose does Sass serve if it can never surpass the feature set and limitations of CSS?

The purpose lies, *for me*, in:

- simplification of CSS concepts
- lower mental overhead
- automation of tedious/repetitive CSS

If your code does the opposite of any of those things, you should re-evaluate what you’re trying to achieve to work out the path of least resistance.

Be wary of code that appears complex which aims to automate a repetitive task. It’s only worth not having to manage something manually if the generating code is easy, if not easier, to understand than the compiled output. An example of this might be a grid system, where defining and maintaining the styles manually is clearly more time-consuming than generating it automatically from a handful of variables.


{% include content/heading.html title='An example' %}

Let’s say I want to be able to show and hide content based on screen size, and I want some level of minute control around these screen sizes and how they’re used. I’ve got to create a series of CSS classes which hide content based on some given media query breakpoints. Let’s define a small *Map* of breakpoint names (to reference in class names) and their respective pixel values (to reference in the media queries).

{% highlight scss %}
$breakpoints: (
    "small":     500px,
    "medium":    750px,
    "large":    1000px,
    "gigantic": 1250px
);
{% endhighlight %}

The Sass needs to be able to handle any number of breakpoints, not just an arbitrary number, so we’re going to have to use `@each` and/or `@for` to create some loops. We need to be able to say <q>below <var>A</var>px</q>, <q>above <var>B</var>px</q>, <q>above <var>A</var>px and below <var>B</var>px</q>, etc. do *something*.

So using a *BEM* naming methodology, we’ll use a *base class* of `.hide` and extend it like so:

- `.hide--below-small`
- `.hide--above-medium`
- `.hide--small-medium`
- `.hide--medium-large`
- `.hide--large-gigantic`

The single breakpoint <q>below <var>A</var>px</q> and <q>above <var>B</var>px</q> variations are quite straightforward to generate, and do not require extensive logic or filtering of the dataset to generate the CSS:

{% highlight scss %}
@each $breakpoint-name, $breakpoint-value in $breakpoints {
    .hide--below-#{$breakpoint-name} {
        @media (max-width: #{$breakpoint-value}) {
            @include visually-hidden;
        }
    }
    .hide--above-#{$breakpoint-name} {
        @media (min-width: #{$breakpoint-value}) {
            @include visually-hidden;
        }
    }
}
{% endhighlight %}

But the <q>between <var>A</var>px and <var>B</var>px</q> variations are a bit more involved. We’ll need something to loop through <var>$breakpoints</var> and create a *Map* of pairs, which we can loop through in turn to create our rules based on the pairings.

We can actually determine how many unique pairs there will be with a simple mathematical formula, letting <var>n</var> represent the length of the dataset:

<figure>
    <samp class="beta"><var>n</var>(<var>n</var>-1)/2</samp>
</figure>

So in our case, in which we have **4** breakpoints:

<figure>
    <samp class="beta"><var>4</var>(<var>4</var>-1)/2 = 6</samp>
</figure>


{% include content/heading.html title='Here’s the function!' %}

Here’s the behemoth `@function` that accepts a Sass *List* or *Map* and spits out all the unique pairs to do with whatever necessary:

{% highlight scss %}
@function unique-pairs($pairs) {
    @if not $pairs or not (type-of($pairs) == list or type-of($pairs) == map) {
        @warn "unique-pairs() expects either a single List or single Map dataset.";
        @return false;
    }

    $unique-pairs: ();
    $seen: ();

    @if type-of($pairs) == list {
        @each $first in $pairs {
            $seen: append($seen, $first);
            @each $second in $pairs {
                @if $first != $second and not index($seen, $second) {
                    $unique-pair: ($first: $second);
                    $unique-pairs: append($unique-pairs, $unique-pair);
                }
            }
        }
    }

    @else if type-of($pairs) == map {
        @each $first-key, $first-value in $pairs {
            $seen: append($seen, $first-key);
            @each $second-key, $second-value in $pairs {
                @if $first-key != $second-key and not index($seen, $second-key) {
                    $unique-pair: (
                        ($first-key: $first-value): ($second-key: $second-value)
                    );
                    $unique-pairs: append($unique-pairs, $unique-pair);
                }
            }
        }
    }

    @else {
        @warn "unique-pairs() expects either a List or Map.";
        @return false;
    }

    @return $unique-pairs;
}
{% endhighlight %}


--------


Let’s go through this piece-by-piece so we can undertand what’s going on.

{% highlight scss %}
@if not $pairs or not (type-of($pairs) == list or type-of($pairs) == map) {
    @warn "unique-pairs() expects either a single List or single Map dataset.";
    @return false;
}
{% endhighlight %}

We begin by doing some error-checking by confirming two things:

0. if the input has been passed to the `@function`
0. if the input is either of the *List* or *Map* type

{% highlight scss %}
$unique-pairs: ();
$seen: ();
{% endhighlight %}

Next, we instantiate two *Maps*:

0. <var>$unique-pairs</var> will be returned by this function and will contain the unique pairs, obviously.
0. <var>$seen</var> is used to keep track of how far into the original dataset has been iterated to prevent duplication.

{% highlight scss %}
@if type-of($pairs) == list {
    @each $first in $pairs {
        $seen: append($seen, $first);
        @each $second in $pairs {
            @if $first != $second and not index($seen, $second) {
                $unique-pair: ($first: $second);
                $unique-pairs: append($unique-pairs, $unique-pair);
            }
        }
    }
}
{% endhighlight %}





{% highlight scss %}
$list:
    "small",
    "medium",
    "large";

@each $list-item in unique-pairs($list) {
    @each $list-item-key, $list-item-value in $list-item {
        .from-#{$list-item-key}-to-#{$list-item-value} {
            color: limegreen;
        }
    }
}
{% endhighlight %}


{% highlight scss %}
$map: (
    "small":     500px,
    "medium":    750px,
    "large":    1000px,
    "gigantic": 1250px
);

@each $map-item in unique-pairs($map) {
    @each $map-first, $map-second in $map-item {
        @each $map-first-key, $map-first-value in $map-first {
            @each $map-second-key, $map-second-value in $map-second {
                .from-#{$map-first-key}-to-#{$map-second-key} {
                    @media (min-width: #{$map-first-value}) and (max-width: #{$map-second-value}) {
                        color: limegreen;
                    }
                }
            }
        }
    }
}
{% endhighlight %}


{% include content/codepen.html slug='ccdd22e03454f955e2e30c66b02910e2' %}
