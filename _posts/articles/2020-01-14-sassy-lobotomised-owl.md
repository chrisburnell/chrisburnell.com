---
date: 2020-01-14 12:20:00 +0000
title: "Sassy Lobotomised Owl"
lede: "Managing spacing between elements and components on your page can be a tiring task if undertaken manually. This is where the lobotomised owl comes in: a short, simple snippet of CSS that simplifies this whole process for you. In this article I’ll explain how I make use of it in a more dynamic way using a SCSS mixin."
tags:
  - scss
syndicate_to:
  - https://dev.to/chrisburnell/sassy-lobotomised-owl-pfl
banner:
  - sassy-lobotomised-owl@2x.jpg
  - sassy-lobotomised-owl.jpg
banner_mobile:
  - sassy-lobotomised-owl_mobile@2x.jpg
  - sassy-lobotomised-owl_mobile.jpg
redirect_from:
  - article/sassy-lobotomized-owl.html
longform: false
edit: This post expands on concepts and a mixin from a previous post, <a href="/article/variables-for-both">Variables for Both</a>, which I recommend you to read if you’re interested in the context around how the <samp>v</samp> mixin is used.<br><br><a href="#the-solution"><em>Skip to the full <samp>owl</samp> mixin solution.</em></a>
---

The <a href="https://alistapart.com/article/axiomatic-css-and-lobotomized-owls/" rel="external">lobotomised owl</a> technique, given graciously to us by the incredibly talented <a href="https://heydonworks.com" rel="external">Heydon Pickering</a>, takes away a great deal of pain that comes with setting up sensible spacing between elements and components on your page. Instead of specifically defining `margin-bottom`/`margin-top` for each component, we’ll make use of the <samp>* + *</samp> selector in CSS to perform the following:

> For every direct child element of X which is not the first direct child of X, apply a `margin-top`.

*And almost as if by magic*, you’ll have a robust spacing system in place. All you need to do is decide which elements <samp>X</samp> can represent, and what the value of <samp>margin-top</samp> is going to be.

Let’s say our goal is to end up with the following CSS output:

{% highlight css %}
body > * + * {
  margin-top: 4em;
}

main > * + * {
  margin-top: 2em;
}

article > * + * {
  margin-top: 1em;
}
{% endhighlight %}

Let’s start things off by pumping the excitement all the way up to **3**. At its simplest, the mixin looks like this:

{% highlight scss %}
@mixin owl($measure) {
  & > * + * {
    margin-top: $measure;
  }
}
{% endhighlight %}

In fact, if we know that more often than not we'll be using a specific value, we can use a default parameter value, like so:

{% highlight scss %}
@mixin owl($measure: 1em) {
  & > * + * {
    margin-top: $measure;
  }
}
{% endhighlight %}

And we can use it like so:

{% highlight scss %}
body {
  @include owl(4em);
}

main {
  @include owl(2em);
}

article {
  @include owl;
}
{% endhighlight %}


--------


But now let’s take the excitement up to to **4**.

Using the same concepts, and, in particular, the <a href="/article/variables-for-both"><samp>v</samp> mixin</a> that I introduced in [Variables for Both](/article/variables-for-both), we need to set up some SCSS variables and assign them within a Map so that we can iterate through them and reference them using our chosen familiar words—<samp>small</samp>, <samp>medium</samp>, and <samp>large</samp> in this case.

{% highlight scss %}
$measure-large:  4em;
$measure-medium: 2em;
$measure-small:  1em;

$measures: (
  large:  $measure-large,
  medium: $measure-medium,
  small:  $measure-small
)

:root {
  @each $key, $value in $measures {
    --measure-#{$key}: #{$value};
  }
}
{% endhighlight %}

And using my <a href="/article/variables-for-both"><samp>v</samp> mixin</a> I can now rewrite my <samp>owl</samp> mixin with the above configuration in place.

{% highlight scss %}
@mixin owl($measure: small) {
  & > * + * {
    @include v(margin-top, $measure);
  }
}
{% endhighlight %}

In congruency with the methodology behind using the <a href="/article/variables-for-both"><samp>v</samp> mixin</a>, we’ve now abstracted away the need to remember or look up the numeric values for the various measures you might be using, and can instead refer to them as you might think about them or speak about them—using words like <samp>small</samp>, <samp>medium</samp>, <samp>large</samp>, and so on:

{% highlight scss %}
body {
  @include owl(large);
}

main {
  @include owl(medium);
}

article {
  @include owl;
}
{% endhighlight %}


{% include content/heading.liquid title='The Solution' %}

{% highlight scss %}
@mixin owl($measure: small) {
  @if not map-has-key($measures, $measure) {
    @error "There is no measure named #{$measure} in `$measures`. measure should be one of #{map-keys($measures)}.";
  }

  & > * + * {
    @include v(margin-top, $measure);
  }
}

body {
    @include owl(large);
}

main {
    @include owl(medium);
}

article {
    @include owl;
}
{% endhighlight %}

Because we’ve included some error-checking within the mixin, if we were to attempt to pass a parameter to the mixin that does not map to a defined measure (<samp>small</samp>, <samp>medium</samp>, or <samp>large</samp>)…

{% highlight scss %}
header {
    @include owl(gigantic);
}
{% endhighlight %}

We get the following error message in our console:

{% highlight bash %}
Error: There is no measure named gigantic in `$measures`. measure should be one of small, medium, large.
{% endhighlight %}

And with that, I’m calling it a day!
