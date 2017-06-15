---
layout: post
categories: article

date: 2017-06-15 17:55:00

title: Remapping Ranges in Sass
lede: Great inspiration can sometimes be found in exploring available opportunities and embracing new ideas. In this article, I’ll try to replicate a foreign concept in a familiar way, and explain why I decided to do even do it.
tags:
- collaboration
- css
- sass

codepen: true
comments: true
shorturl: 0aby8

further_reading:
- url: "http://thecodingtrain.com/"
  title: "The Coding Train by Daniel Shiffman"
- url: "https://www.youtube.com/watch?v=N633bLi_YCw"
  title: "Polar Coordinates, a p5.js Tutorial by Daniel Shiffman"
---


<blockquote>
    <p>Life moves pretty fast. If you don’t stop and look around once in a while, you could miss it.</p>
    <cite>Ferris Bueller, Ferris Bueller’s Day Off</cite>
</blockquote>

There’s no questioning that [technology moves pretty fast](https://en.wikipedia.org/wiki/Moore%27s_law){:rel="external"}. Ferris is too right, if we don’t pause to take stock and count our blessings, we might miss out in being able to appreciate them. It’s all too easy to get caught up in the speed and momentum of web development that we become engrossed on *the goal*—nailing the code review, delivering on time, etc.—that we forget to make sure we’re treading on solid ground in pursuit of our goals.

That’s why I feel extremely privileged to live and work in a time and field that has so many opportunities to learn about my interests and seek out new information. Whenever I’m unsure about a piece of work, or bored, or want to share ideas, I’m afforded the convenience of sating those desires through the Internet we’ve cultivated together.

One of the most engaging ways I’ve found, of recent, to keep myself open-minded and my tools sharp, is to seek out and participate in live coding sessions on [*Twitch*](https://twitch.tv){:rel="external"}, a website of which the primary purpose is for people to live stream video games and participate in chat rooms relating to the streams. Of particular note are the [Creative category](https://www.twitch.tv/directory/game/Creative/){:rel="external"} and [Programming sub-category](https://www.twitch.tv/directory/game/Creative/programming){:rel="external"}, where people showcase their painting skills, sculpt clay, perform music, and practise live coding, amongst many other interesting talents and skills. In a similar fashion, some people opt to use [*YouTube*](https://www.youtube.com/){:rel="external"} for live streaming, which provides a near-equivalent experience. It really just comes down to preference; although, I personally prefer *Twitch’s* way of doing things.

I’ve found a great deal of enjoyment in watching and participating in these live coding streams; it’s given me new perspectives on what I already know and expanded new horizons for things I don’t know but want to learn about.


{% include content/heading.html title='Inspiration Strikes' %}

It was during one of [Daniel Shiffman’s](https://twitter.com/shiffman){:rel="external"} streams on his *YouTube* channel, [The Coding Train](https://www.youtube.com/user/shiffman/live){:rel="external"}, that I was struck by a concept he was explaining, and spurned me to play around with it in a programming language I was well-versed in.

Daniel Shiffman explains the concept of “mapping” a value from one range to another in this thoroughly informative video:

<figure>
    <div class="media  media--youtube">
        <iframe src="https://www.youtube.com/embed/nicMAoW6u1g" title="2.4: The map() Function - p5.js Tutorial" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
    </div>
</figure>

Although CSS is meant for expressing presentation, and operations like this are best-suited for a “real programming language”, I wondered if this concept of “remapping” values from one range to another is possible with Sass.


{% include content/heading.html title='In Theory' %}

Like most of my endeavours, this Sass technique is neither revolutionary, nor is it particularly useful. But not everything need be born out of necessity and steeped in unit-testing for it to be fun. I find a lot of enjoyment in experimenting at the limits of CSS and finding unexplored avenues to solve challenges in a different way.

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

Our `@function` takes a variable number of parameters, *three* or *five*, and we use Sass’ built-in `if()` as a <dfn title="an operator which takes three arguments and defines a conditional expression, resulting in one of two outputs based on a single input">ternary operator</dfn> to utilise the parameters appropriately in determining the value remapped in the new range.

There really isn’t any magic going on here (as usual). Everything before the `@return` statement is just checking to make sure we’ve correctly passed in the right parameters, and that we’ve given the correct number of parameters. The `@return` statement performs a small calculation based on the 3–5 parameters and gives us back the remapped initial value.


{% include content/heading.html title='In Practice' %}

To be frank, I’m having a hard time finding a great deal of use out of this operation in CSS, but perhaps you’ll find a really persuasive reason to use it.

Simply to serve as an example (*not* as an example of best practice), one way to use this function might be to map mouse position to something on the screen. Let’s say we want to display a globe of the Earth that rotates left and right based on whether the mouse is on the left or right of the window, and we want to try to do so without JavaScript. To do so, we’ll break the screen down into 5 equal-width, invisible columns. Hovering over each invisible column affects the rotation of the globe.

We’ll start with some basic HTML:

{% highlight html %}
<div class="interact  interact--1"></div>
<div class="interact  interact--2"></div>
<div class="interact  interact--3"></div>
<div class="interact  interact--4"></div>
<div class="interact  interact--5"></div>

<div class="globe"></div>
{% endhighlight %}

Now let’s define some variables to plug into our remapping `@function`:

{% highlight scss %}
$number-of-columns: 5;

$rotation-minimum: -45deg;
$rotation-maximum:  45deg;
{% endhighlight %}

Before we apply our different rotations to the globe, we can even use our `@function` to layout our equal-width columns by remapping the index of each column to a value for the `left` property:

{% highlight scss %}
.interact {
    width: (100% / $number-of-columns);
    height: 100%;
    position: absolute;
    top: 0;
}

@for $i from 1 through $number-of-columns {
    .interact--#{$i} {
        left: range-map($i, 1, $number-of-columns, 0%, (100% - 100% / $number-of-columns));
    }
}
{% endhighlight %}

The last parameter being passed to the `@function` looks a little unusual, but you have to remember that we’re setting a value for the `left` property, so the maximum value we should be setting is `100% - the width of a column`. This means that we’re remapping the index of each column to a value between `0%` and `100% - $number-of-columns`.

Lastly, we’ll perform a similar operation as before, by remapping the index of the column to a parameter for the `rotateY` value of the `transform` property. In this case, we’re transitioning between `$rotation-minumum` (`-45deg`) and `$rotation-maximum` (`45deg`).

{% highlight scss %}
@for $i from 1 through $number-of-columns {
    .interact--#{$i}:hover ~ .globe {
        transform: rotateY(range-map($i, 1, $number-of-columns, $rotation-minimum, $rotation-maximum));
    }
}
{% endhighlight %}

{% include content/codepen.html slug='vZyywR' height='400' %}
