---
layout: article
category: codepen

date: 2013-06-17 12:00:00

title: Persistent Light Source Transform

permalink: /pen/persistent-light/
slug: persistent-light

shorturl: 9sogz
comments: true
---

{% include codepen-embed.html slug="mglHp" height="425" %}

{% highlight html %}
<div class="square">A</div>
{% endhighlight %}

{% highlight scss %}
html, body {
  height: 100%;
  position: relative;
}
body {
  background: #2EA05B;
}
.square {
  background: #48B97C;
  color: mintcream;
  width: 2.5em;
  height: 2.5em;
  margin: -1.25em 0 0 -1.25em;
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 6em;
  line-height: 2.5em;
  text-align: center;
  text-shadow: 1px 1px #2ea05B, 2px 2px #2ea05B, 3px 3px #2ea05B, 4px 4px #2ea05B, 5px 5px #2ea05B, 6px 6px #2ea05B, 7px 7px #2ea05B, 8px 8px #2ea05B, 9px 9px #2ea05B, 10px 10px #2ea05B, 11px 11px #2ea05B, 12px 12px #2ea05B;
  box-shadow: 0.5em 0.5em 0 rgba(0, 0, 0, 0.2);
  animation: wiggle 8s infinite linear;
}
@keyframes wiggle {
  0% {
    box-shadow: 0.5em 0.5em 0 rgba(0, 0, 0, 0.2);
    transform: none;
  }
  25% {
    left: 20%;
    text-shadow: 1px -1px #2ea05B, 2px -2px #2ea05B, 3px -3px #2ea05B, 4px -4px #2ea05B, 5px -5px #2ea05B, 6px -6px #2ea05B, 7px -7px #2ea05B, 8px -8px #2ea05B, 9px -9px #2ea05B, 10px -10px #2ea05B, 11px -11px #2ea05B, 12px -12px #2ea05B;
    box-shadow: 0.5em -0.5em 0 rgba(0, 0, 0, 0.2);
    transform: rotate3d(0, 0, 1, 90deg);
  }
  50% {
    text-shadow: -1px -1px #2ea05B, -2px -2px #2ea05B, -3px -3px #2ea05B, -4px -4px #2ea05B, -5px -5px #2ea05B, -6px -6px #2ea05B, -7px -7px #2ea05B, -8px -8px #2ea05B, -9px -9px #2ea05B, -10px -10px #2ea05B, -11px -11px #2ea05B, -12px -12px #2ea05B;
    box-shadow: -0.5em -0.5em 0 rgba(0, 0, 0, 0.2);
    transform: rotate3d(0, 0, 1, 180deg);
  }
  75% {
    left: 75%;
    text-shadow: -1px 1px #2ea05B, -2px 2px #2ea05B, -3px 3px #2ea05B, -4px 4px #2ea05B, -5px 5px #2ea05B, -6px 6px #2ea05B, -7px 7px #2ea05B, -8px 8px #2ea05B, -9px 9px #2ea05B, -10px 10px #2ea05B, -11px 11px #2ea05B, -12px 12px #2ea05B;
    box-shadow: -0.5em 0.5em 0 rgba(0, 0, 0, 0.2);
    transform: rotate3d(0, 0, 1, 270deg);
  }
  100% {
    text-shadow: 1px 1px #2ea05B, 2px 2px #2ea05B, 3px 3px #2ea05B, 4px 4px #2ea05B, 5px 5px #2ea05B, 6px 6px #2ea05B, 7px 7px #2ea05B, 8px 8px #2ea05B, 9px 9px #2ea05B, 10px 10px #2ea05B, 11px 11px #2ea05B, 12px 12px #2ea05B;
    box-shadow: 0.5em 0.5em 0 rgba(0, 0, 0, 0.2);
    transform: rotate3d(0, 0, 1, 360deg);
  }
}
{% endhighlight %}
