---
layout: post
categories: article

# date: 2016-08-16 12:00:00

title: Remapping Numbers in Sass
lede: LEDE
tags:
- css
- sass

comments: true
shorturl: SHORTURL
---


I recently discovered the wonderful world of live coding on [Twitch.tv](https://twitch.tv){:rel="external"}[](https://www.twitch.tv/directory/game/Creative/){:rel="external"}

I recently got into [The Coding Train](https://www.youtube.com/user/shiffman){:rel="external"}


Daniel Shiffman explains the concept of “mapping” a value from one range to another in this informative video:

<figure>
    <div class="media  media--youtube">
        <iframe src="https://www.youtube.com/embed/nicMAoW6u1g" title="2.4: The map() Function - p5.js Tutorial" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
    </div>
</figure>

While CSS is meant for expressing presentation, and operations like this are best-suited for a “real programming language”, I wonder if this concept of “remapping” values is possible in Sass.


Like most of my endeavours, this technique is neither revolutionary, nor is it particularly useful. But not everything need be born out of necessity and steeped in unit-testing for it to be fun. I find a lot of enjoyment in experimenting at the limits of CSS and finding unexplored avenues to solve challenges in a different way.

{% highlight scss %}
@function range-map($value, $ranges...) {
    @if not $value or not $ranges or not (length($ranges) == 2 or length($ranges) == 4) {
        @warn "`range-map()` requires three or five parameters: initial value, (old minimum), old maximum, (new minimum), and new maximum.";
        @return false;
    }

    $old-minimum: if(length($ranges) == 2, 0,               nth($ranges, 1));
    $old-maximum: if(length($ranges) == 2, nth($ranges, 1), nth($ranges, 2));
    $new-minimum: if(length($ranges) == 2, 0,               nth($ranges, 3));
    $new-maximum: if(length($ranges) == 2, nth($ranges, 2), nth($ranges, 4));

    @return ($value - $old-minimum) / ($old-maximum - $old-minimum) * ($new-maximum - $new-minimum) + $new-minimum;
}
{% endhighlight %}

Our `@function` takes a variable number of parameters, three or five, specifically, and we use Sass’ built-in `if()` as a <dfn title="an operator which takes three arguments and defines a conditional expression, resulting in one of two outputs based on a single input">ternary operator</dfn> to utilise the parameters appropriately in determining the remapped value.

To be frank, I’m having a hard time finding a great deal of use out of this operation in CSS, but perhaps you’ll find a reason to use it.

Simply to serve as an example (*not* as an example of best practice), one way to use this function might be to map a test score to a percentage. Let’s say that we have a score of <span class="monospace">5/7</span> that we want as a percentage:

{% highlight html %}
<span class="score" data-score="5" data-max="7">5/7</span>
{% endhighlight %}

{% highlight scss %}
.score {
    &::after {
        content: " (" #{range-map(attr(data-score), attr(data-max), 100)} ")"
    }
}
{% endhighlight %}

<figure>
    <div class="media  media--youtube">
        <iframe src="https://www.youtube.com/embed/N633bLi_YCw" title="9.17: Polar Coordinates - p5.js Tutorial" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
    </div>
</figure>
