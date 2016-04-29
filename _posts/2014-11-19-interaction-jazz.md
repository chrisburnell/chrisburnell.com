---
layout: post
categories: pen

date: 2014-11-19 12:00:00

title: Interaction Jazz
tags:
- codepen

comments: codepen
codepen_slug: myyRqp
shorturl: bhbt9
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
html,
body {
    height: 100%;
}
body {
    position: relative;
    overflow: hidden;
}
.jazz {
    background-color: rgb(255, 64, 0);
    width:  400px;
    width:   40vw;
    height: 400px;
    height:  40vw;
    position: absolute;
    top:  50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    z-index: 1;
}
.slice {
    width:  2%;
    height: 2%;
    position: absolute;
    z-index: 2;
}
@for $i from 1 through 50 {
    .row-#{$i} {
        top: ($i * 2%) - 2%;
        &:hover ~ .jazz {
            background-color: rgb((255 - (($i - 1) * 5.204081633)), 64, (($i - 1) * 5.204081633));
        }
    }
    .column-#{$i} {
        left: ($i * 2) - 2%;
        &:hover ~ .jazz {
            border-radius: ($i * 1.020408163%) - 1%;
            transform: translate3d(-50%, -50%, 0) rotate(($i - 1) * 7.346938776deg);
        }
    }
}
{% endhighlight %}
{% include content/code-toggle-bottom.html %}
