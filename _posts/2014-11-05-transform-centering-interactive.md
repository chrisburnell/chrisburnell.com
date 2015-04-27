---
layout: article
category: codepen

date: 2014-11-05 13:00:00

title: Power of Transform Centering - Interactive

permalink: /pen/transform-centering-interactive/
slug: transform-centering-interactive

shorturl: 8x586
comments: true
---

{% include codepen-embed.html slug="xutbs" height="500" %}

Check out the [demo version]({{ site.url }}{{ site.baseurl }}/pen/transform-centering "Demo Version of Transorm Centering").

{% highlight html %}
<textarea class="modal" disabled></textarea>
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
}
{% endhighlight %}
