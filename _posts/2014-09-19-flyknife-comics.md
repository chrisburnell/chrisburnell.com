---
layout: article
categories: pen

date: 2014-09-19 12:00:00

title: Flyknife Comics
tags:
- codepen

comments: codepen
codepen_slug: hIxaj
shorturl: 6aorh
---


{% include codepen.html height="400" %}

{% highlight html %}
<div>
  <h1 class="miami-vice" data-text="Flyknife">Flyknife</h1>
  <h1 class="metal" data-text="COMICS">COMICS</h1>
</div>
{% endhighlight %}

{% highlight scss %}
@import url(http://fonts.googleapis.com/css?family=Yellowtail);
@import url(http://fonts.googleapis.com/css?family=Archivo+Black);

html,
body {
  height: 100%;
}
body {
  background-color: black;
  position: relative;
  overflow: hidden;
}

div {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  text-align: center;
}

h1 {
  width: auto;
  font-size: 15em;
  font-size: 25vw;
  margin: 0 0 -0.1em;
  line-height: 1em;
  word-wrap: nowrap;
}

.miami-vice {
  color: #86DEFF;
  font-family: "Yellowtail", cursive;
  font-weight: 300;
  text-shadow: 0 0 .5em rgba(#86DEFF, .5);
  position: relative;
  transform: rotate3d(1, -1, 0, 35deg);
  z-index: 2;
  &:after {
    content: attr(data-text);
    color: #FA74FB;
    position: absolute;
    top: 0;
    left: 0;
    text-shadow: 0 0 .5em rgba(#FA74FB, .5);
    transform: translateX(-0.05em);
    z-index: -1;
  }
}

.metal {
  background-image: linear-gradient(#7795B0 0, #7795B0 3px, #6581B0 4px, #6380AE 30%, #DDC4C3 50%, #B9957F 50%, #B9957F 53%, #D18B2D 53%, #DDC4C3 80%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: white;
  width: 100%;
  font-family: 'Archivo Black', sans-serif;
  font-size: 15vw;
  line-height: 1em;
  transform: rotate3d(1, -1, 0, 30deg);
  &:before,
  &:after {
    content: attr(data-text);
    background: none;
    color: white;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    text-shadow: 0 0 1em rgba(white, .3);
  }
  &:after {
    z-index: -1;
  }
}
{% endhighlight %}
