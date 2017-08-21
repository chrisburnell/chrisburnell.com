---
layout: post
categories: article

date: 2017-06-16 14:00:00

title: Unique Pairs in Sass
lede: In creating a from-scratch grid for a redevelopment project, I was using Sass to loop through various bits of data to generate a bunch of repetitive CSS, but I realised I had no DRY way of generating a list of unique pairs of items from a given dataset, so I set out to find out how.
tags:
- sass
- tutorials

codepen: true
webmentions: true
comments: true
shorturl: e1wjg
---


<blockquote>
    <p>Sass is the most mature, stable, and powerful professional grade CSS extension language in the world.</p>
    <cite><a href="http://sass-lang.com/" title="Sass: Syntactically Awesome Style Sheets" rel="external">Sass (sass-lang.com)</a></cite>
</blockquote>

CSS developers usually fall into one of two camps when it comes to preprocessors: a loving embrace or a cold shoulder. While I have an obvious bias, I get the sense that a portion of the <q>cold shoulder</q> folks perhaps hold a fundamental misunderstanding of Sass’ purpose, its strengths, and its weaknesses. This could be chaulked up to a poor introduction to Sass; it is not a tool that can be mindlessly slapped <q>on top</q> of CSS with the expectation that things will improve through its sheer use.

Like writing careful CSS, Sass thrives under very controlled and predictable conditions. Casting a bunch of CSS property values to Sass variables is all well and good, but only if they’re simple and cohesive with the rest of your stylesheets. Simply converting your CSS to Sass provides you with no wins unless it is done with consideration; in fact, without consideration, I would argue that doing so would add complexity—complexity which I feel can stain the first impression developers get of preprocessors. What purpose does Sass serve if it can never surpass the feature set and limitations of CSS?

The purpose lies, *for me*, in:

- simplification of CSS concepts
- lower mental overhead
- automation of tedious/repetitive CSS

If your code does the opposite of any of those things, you should re-evaluate what you’re trying to achieve to work out the path of least resistance.

Be wary of Sass which appears more complex or lengthier than its compiled CSS counterpart. It’s only worth the luxury of not having to manage something manually if the pre-compiled code is easy, if not easier, to understand than the compiled output. An example of where this would work might be within a grid system, when defining and maintaining the styles for multiple columns and layouts of columns in CSS is clearly more time-consuming than generating it automatically from a handful of Sass variables.


{% include content/heading.html title='An example' %}

Let’s say I want to be able to show and hide content based on screen size, and I want some level of minute control around these screen sizes and how they’re used. I’ve got to create a series of CSS classes which hide content based on some given media query breakpoints. Let’s define a small *Map* of breakpoint names (to reference in the class names) and their respective pixel values (to reference in the media queries).

{% highlight scss %}
$breakpoints: (
    "small":     500px,
    "medium":    750px,
    "large":    1000px,
    "gigantic": 1250px
);
{% endhighlight %}

The Sass needs to be able to handle any number of breakpoints, not just an arbitrary number, so we’re going to have to use `@each` and/or `@for` to create some loops. We need to be able to say <q>below <var>A</var></q>, <q>above <var>B</var></q>, <q>above <var>A</var> and below <var>B</var></q>, etc. do *something*.

So using a <dfn title="Block Element Modifier">*BEM*</dfn> naming methodology, we’ll use a *base class* of `.hide` and extend it like so:

- `.hide--below-small`
- `.hide--above-medium`
- `.hide--small-medium`
- `.hide--medium-large`
- `.hide--large-gigantic`

The single breakpoint <q>below <var>A</var></q> and <q>above <var>B</var></q> variations are quite straightforward to generate, and do not require extensive logic or filtering of the dataset to generate the CSS:

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

But the <q>between <var>A</var> and <var>B</var></q> variations are a bit more involved. We’ll need something to loop through <var>$breakpoints</var> and create a *Map* of pairs, which we can loop through in turn to create our rules based on the pairings.

We can actually determine how many unique pairs there will be with a simple mathematical formula, letting <var>n</var> represent the length of the dataset:

<figure>
    <samp class="beta"><var>n</var>(<var>n</var>&minus;1)&frasl;2</samp>
</figure>

So in our case, in which we have <var>4</var> breakpoints:

<figure>
    <samp class="beta"><var>4</var>(<var>4</var>&minus;1)&frasl;2 = <var>6</var></samp>
</figure>

We can expect <var>6</var> unique pairs from a list of <var>4</var> items.


{% include content/heading.html title='Here’s the function!' %}

Here’s the behemoth `@function` that accepts a Sass *List* or *Map* and spits out all the unique pairs to do with whatever necessary (and I <s>guarantee</s> <s>promise</s> think it’s less complex than building it manually):

{% highlight scss %}
@function unique-pairs($data) {
    @if not $data or not (type-of($data) == list or type-of($data) == map) {
        @warn "unique-pairs() expects either a single List or single Map dataset.";
        @return false;
    }

    $unique-pairs: ();
    $seen: ();

    @if type-of($data) == list {
        @each $first in $data {
            $seen: append($seen, $first);
            @each $second in $data {
                @if $first != $second and not index($seen, $second) {
                    $unique-pair: ($first, $second);
                    $unique-pairs: append($unique-pairs, $unique-pair);
                }
            }
        }
    }

    @else if type-of($data) == map {
        @each $first-key, $first-value in $data {
            $seen: append($seen, $first-key);
            @each $second-key, $second-value in $data {
                @if $first-key != $second-key and not index($seen, $second-key) {
                    $unique-pair: (
                        ($first-key: $first-value), ($second-key: $second-value)
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
@if not $data or not (type-of($data) == list or type-of($data) == map) {
    @warn "unique-pairs() expects either a single List or single Map dataset.";
    @return false;
}
{% endhighlight %}

We begin by doing some error-checking by confirming two things:

0. if the input has been passed to the `@function`
0. if the input is either of the *List* or *Map* type

Next, we instantiate two *Maps*:

{% highlight scss %}
$unique-pairs: ();
$seen: ();
{% endhighlight %}

0. <var>$unique-pairs</var> will be returned by this function and will contain the unique pairs, obviously.
0. <var>$seen</var> is used to keep track of how far into the original dataset has been iterated to prevent duplication.

Next, we’ll perform some operations in the case where the dataset is a *List*:

{% highlight scss %}
@if type-of($data) == list {
    @each $first in $data {
        $seen: append($seen, $first);
        @each $second in $data {
            @if $first != $second and not index($seen, $second) {
                $unique-pair: ($first, $second);
                $unique-pairs: append($unique-pairs, $unique-pair);
            }
        }
    }
}
{% endhighlight %}

Here, we’re looping through the *List*, and for each item, looping through the *List* once more. By keeping track of the items we’ve iterated over in the outer loop, we’re able to build a *Map* of pairs from the *List* items which contains no duplicates or pairs of the same item.

Next, we’ll do the same, but for a *Map* of data:

{% highlight scss %}
@else if type-of($data) == map {
    @each $first-key, $first-value in $data {
        $seen: append($seen, $first-key);
        @each $second-key, $second-value in $data {
            @if $first-key != $second-key and not index($seen, $second-key) {
                $unique-pair: (
                    ($first-key: $first-value), ($second-key: $second-value)
                );
                $unique-pairs: append($unique-pairs, $unique-pair);
            }
        }
    }
}
{% endhighlight %}

The code in this block is nearly identical to the one for *Lists*, with some small changes to how the *Map’s* <var>keys</var> and <var>values</var> are paired and passed into <var>$unique-pairs</var>.

Now let’s look at how the `@function` is actually used.


{% include content/heading.html title='From a List' %}

{% highlight scss %}
$list:
    "small",
    "medium",
    "large";

@each $unique-pair in unique-pairs($list) {
    $unique-pair-first:  nth($unique-pair, 1);
    $unique-pair-second: nth($unique-pair, 2);
    .from-#{$unique-pair-first}-to-#{$unique-pair-second} {
        display: none;
    }
}
{% endhighlight %}

{% include content/code-toggle-top.html %}
{% highlight css %}
.from-small-to-medium {
    display: none;
}

.from-small-to-large {
    display: none;
}

.from-medium-to-large {
    display: none;
}
{% endhighlight %}
{% include content/code-toggle-bottom.html %}


{% include content/heading.html title='From a Map' %}

{% highlight scss %}
$map: (
    "small":     500px,
    "medium":    750px,
    "large":    1000px,
    "gigantic": 1250px
);

@each $unique-pair in unique-pairs($map) {
    $map-first:  nth($unique-pair, 1);
    $map-second: nth($unique-pair, 2);
    @each $map-first-key, $map-first-value in $map-first {
        @each $map-second-key, $map-second-value in $map-second {
            .from-#{$map-first-key}-to-#{$map-second-key} {
                @media (min-width: #{$map-first-value}) and (max-width: #{$map-second-value}) {
                    display: none;
                }
            }
        }
    }
}
{% endhighlight %}

{% include content/code-toggle-top.html %}
{% highlight css %}
.from-small-to-medium {
    @media (min-width: 500px) and (max-width: 750px) {
        display: none;
    }
}

.from-small-to-large {
    @media (min-width: 500px) and (max-width: 1000px) {
        display: none;
    }
}

.from-small-to-gigantic {
    @media (min-width: 500px) and (max-width: 1250px) {
        display: none;
    }
}

.from-medium-to-large {
    @media (min-width: 750px) and (max-width: 1000px) {
        display: none;
    }
}

.from-medium-to-gigantic {
    @media (min-width: 750px) and (max-width: 1250px) {
        display: none;
    }
}

.from-large-to-gigantic {
    @media (min-width: 1000px) and (max-width: 1250px) {
        display: none;
    }
}
{% endhighlight %}
{% include content/code-toggle-bottom.html %}


{% include content/heading.html title='Conclusion and Demo' %}

While the `@function` that powers all this jazz is lengthy and intimidating, I think it’s pretty clear that we’re saving ourselves some typing and mental overhead. Because the `@function` is doing the brunt of the heavy-lifting here, we’ve afforded ourselves the luxury of only having to touch the *List*/*Map* of breakpoints (and respective pixel values) in order to build out CSS for the entire grid, including complex class and media query combinations.

Here’s a small demo of the `@function` on *CodePen*, which I recommend opening in a new tab/window so you can resize properly:

{% include content/codepen.html slug='OWWYdj' height='400' %}

This is a pretty extreme example of how smart utilisation of Sass’ features makes writing and maintaining CSS easier (and more satisfying), but you can start on this path in a much smaller capacity. Investigate what kind of wins you’ll achieve through abstracting your colours, measures, sets of styles, etc. and proceed, carefully, to organise and DRY out your code. If you’re unsure where to start with refactoring, [Harry Roberts](https://csswizardry.com/){:rel="external"} has written some [excellent articles](https://csswizardry.com/2017/06/refactoring-tunnels/){:rel="external"} [about refactoring](https://csswizardry.com/2016/08/refactoring-css-the-three-i-s/){:rel="external"}.
