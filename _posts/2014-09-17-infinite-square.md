---
layout: article
category: codepen

date: 2014-09-17 12:00:00

title: Infinite Square
tags:
- codepen

permalink: /pen/infinite-square/
slug: infinite-square

shorturl: 6dwvt
comments: true
---

{% include codepen-embed.html slug="HlcAJ" height="350" %}

{% highlight html %}
<div class="square">
  <div class="square-triangle square-triangle-top"></div>
  <div class="square-triangle square-triangle-bottom"></div>
  <div class="square-triangle square-triangle-left"></div>
  <div class="square-triangle square-triangle-right"></div>
</div>
{% endhighlight %}

{% highlight scss %}
html,
body {
  height: 100%;
}
body {
  background-color: mediumseagreen;
  position: relative;
}

.square,
.square-triangle {
  position: absolute;
  animation-duration: 3s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

.square {
  background-color: coral;
  width:  15em;
  height: 15em;
  top: 50%;
  left: 50%;
  animation-name: square-master;
  transform-origin: center center;
  transform: translate3d(-50%, -50%, 0);
}

.square-triangle {
  width: 0;
  height: 0;
}
.square-triangle-top {
  top: 0;
  left: 0;
  border-top:   7.5em solid coral;
  border-left:  7.5em solid transparent;
  border-right: 7.5em solid transparent;
  transform-origin: top center;
  animation-name: square-triangle-vertical;
  .square:hover &,
  .square:focus & {
    border-top-color: olivedrab;
  }
}
.square-triangle-bottom {
  bottom: 0;
  left: 0;
  border-bottom: 7.5em solid coral;
  border-left:   7.5em solid transparent;
  border-right:  7.5em solid transparent;
  transform-origin: bottom center;
  animation-name: square-triangle-vertical;
  .square:hover &,
  .square:focus & {
    border-bottom-color: maroon;
  }
}
.square-triangle-left {
  top: 0;
  left: 0;
  border-left:   7.5em solid coral;
  border-bottom: 7.5em solid transparent;
  border-top:    7.5em solid transparent;
  transform-origin: center left;
  animation-name: square-triangle-horizontal;
  .square:hover &,
  .square:focus & {
    border-left-color: cadetblue;
  }
}
.square-triangle-right {
  top: 0;
  right: 0;
  border-right:  7.5em solid coral;
  border-bottom: 7.5em solid transparent;
  border-top:    7.5em solid transparent;
  transform-origin: center right;
  animation-name: square-triangle-horizontal;
  .square:hover &,
  .square:focus & {
    border-right-color: goldenrod;
  }
}

@keyframes square-master {
  0% {
    background-color: darken(coral, 10%);
    transform: translate3d(-50%, -50%, 0);
  }
  75% {
    background-color: coral;
  }
  100% {
    transform: translate3d(-50%, -50%, 0) rotate(45deg) scale(.705);
  }
}

@keyframes square-triangle-vertical {
  0%, 10% {
    transform: none;
  }
  100% {
    transform: rotateX(180deg);
  }
}
@keyframes square-triangle-horizontal {
  0%, 10% {
    transform: none;
  }
  100% {
    transform: rotateY(180deg);
  }
}
{% endhighlight %}
