---
date: 2019-11-13 11:00:00 +0000
title: "Sassy Lobotomised Owl"
lede: "Managing spacing between elements and components on your page can be a tiring task if undertaken manually. This is where the lobotomised owl comes in—a short, simple snippet of CSS that simplifies this whole process for you. In this article I’ll explain how I make use of it with a Sass mixin."
redirect_from:
  - article/sassy-lobotomized-owl.html
---

Let’s say we want the following kind of output:

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

Using the same concepts that I introduced in [Variables for Both](/article/variables-for-both), we need to set up some SCSS variables and assign them within a Map so that we can iterate through them and reference them using our chosen familiar words—small, medium, and large in this case.

{% highlight scss %}
$measure-small:  1em;
$measure-medium: 2em;
$measure-large:  4em;

$measures: (
  small:  $measure-small,
  medium: $measure-medium,
  large:  $measure-large
)

:root {
  @each $key, $value in $measures {
    --measure-#{$key}: #{$value};
  }
}
{% endhighlight %}

And using my `v` mixin I can now rewrite my `owl` mixin with the above configuration in place.

{% highlight scss %}
@mixin owl($measure: small) {
  & > * + * {
    @include v(margin-top, $measure);
  }
}
{% endhighlight %}

In congruency with the methodology behind using the `v` mixin, we’ve now abstracted away the need to remember or look up the numeric values for the various measures you might be using, and can instead refer to them as you might think about them or speak about them—using words like small, medium, large, etc.:

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

--------

Now, using some error-checking in Sass, we end up with:

{% highlight scss %}
@mixin owl($measure: small) {
  @if not map-has-key($measures, $measure) {
    @error "There is no measure named #{$measure} in `$measures`. measure should be one of #{map-keys($measures)}.";
  }

  & > * + * {
    @include v(margin-top, $measure);
  }
}
{% endhighlight %}

So if we attempt to pass a parameter to the mixin that does not map to a defined measure, we get the following error message:

{% highlight scss %}
header {
    @include owl(gigantic);
}
{% endhighlight %}

{% highlight bash %}
Error: There is no measure named gigantic in `$measures`. measure should be one of small, medium, large.
{% endhighlight %}
