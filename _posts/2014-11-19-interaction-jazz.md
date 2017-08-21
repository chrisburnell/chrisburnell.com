---
layout: post
categories: pen

date: 2014-11-19 12:00:00

title: Interaction Jazz
tags:
- codepen

codepen_slug: myyRqp
comments: codepen
shorturl: bhbt9
webmentions: true
---


{% include content/codepen.html height='600' %}

{% highlight haml %}
- (1...51).each do |row|
    - (1...51).each do |column|
        %div{:class => "slice  row-#{row}  column-#{column}"}
.jazz
{% endhighlight %}

{% include content/code-toggle-top.html %}
{% highlight scss %}
@function range-map($value, $ranges...) {
    $old-minimum: if(length($ranges) == 2, 0, nth($ranges, 1));
    $old-maximum: if(length($ranges) == 2, nth($ranges, 1), nth($ranges, 2));
    $new-minimum: if(length($ranges) == 2, 0, nth($ranges, 3));
    $new-maximum: if(length($ranges) == 2, nth($ranges, 2), nth($ranges, 4));

    @return ($value - $old-minimum) / ($old-maximum - $old-minimum) * ($new-maximum - $new-minimum) + $new-minimum;
}

$hue-rotation: -75;

.jazz {
    background-color: purple;
    background-color: rebeccapurple;
    width: 400px;
    width: 60vmin;
    height: 400px;
    height: 60vmin;
    z-index: 1;
}

.slice {
    width: 2%;
    height: 2%;
    position: absolute;
    z-index: 2;
}

@for $i from 1 through 50 {
    .row-#{$i} {
        top: range-map($i, 1, 50, 0%, 98%);

        &:hover ~ .jazz {
            background-color: adjust-hue(purple, range-map($i, 1, 50, -180, 180));
            background-color: adjust-hue(rebeccapurple, range-map($i, 1, 50, -180, 180));
        }
    }

    .column-#{$i} {
        left: range-map($i, 1, 50, 0%, 98%);

        &:hover ~ .jazz {
            border-radius: range-map($i, 1, 50, 0%, 50%);
            transform: rotateZ(range-map($i, 1, 50, 0deg, 360deg));
        }
    }
}
{% endhighlight %}
{% include content/code-toggle-bottom.html %}
