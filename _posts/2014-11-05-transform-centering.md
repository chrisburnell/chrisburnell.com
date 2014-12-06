---
layout: codepen
date: 2014-11-05 12:00:00
title: Power of Transform Centering
tags:
- CodePen
codepen: true
comments: true
---

{% include codepen-embed.html slug="CHEbf" height="400" %}

{% include codepen-embed.html slug="xutbs" height="400" %}

{% highlight html %}
<textarea class="modal" disabled></textarea>

<div class="instructions">Drag the bottom right corner of the box to resize!</div>

<div class="line  vertical-line"></div>
<div class="line  horizontal-line"></div>
{% endhighlight %}

{% highlight scss %}
html {
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: inherit;
}
html,
body {
  height: 100%;
}
body {
  position: relative;
  overflow: hidden;
}
.modal {
  background-color: rgba(coral, .8);
  width:     5em;
  min-width: 5em;
  max-width: 100%;
  height:     5em;
  min-height: 5em;
  max-height: 100%;
  border: 0;
  outline: none;
  position: absolute;
  top:  50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  z-index: 3;
}


.instructions {
  background-color: white;
  padding: .5em 0;
  position: absolute;
  top: 1em;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
}


.line {
  background-color: mediumseagreen;
  position: absolute;
  z-index: 1;
}
  .vertical-line {
    width: 1px;
    height: 100%;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }
  .horizontal-line {
    width: 100%;
    height: 1px;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
  }
{% endhighlight %}
