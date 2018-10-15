---
categories: article

date: 2018-10-15 10:00:00

title: Variables for Both
lede: Now that CSS Custom Properties, or CSS Variables, are becoming a solid standard, I’m now using a method to map CSS Variables and Lists to their value-as-is fallbacks and provide both with a simple-syntax SCSS mixin.
tags:
- css
- scss

caniuse: true
---

{% include_cached content/caniuse.html feature='css-variables' periods='current' %}

One of my favourite parts of developing for the web is the ever-shifting landscape and the opportunity to work with new technologies. Sometimes they aren’t apt for use in production, but fortunately for us today, *CSS Variables* are pretty reliable to use on their own. However, if you’re in a position similar to mine and find yourself often needing to support old versions of *Internet Explorer* or making sure *all* of your browser support bases are covered, this *SCSS* mixin should be useful for you.


{% include_cached content/heading.html title='The Setup' %}

I won’t pretend I’m writing the introduction to a family recipe for chocolate cake and bore you with twenty minutes of introduction; instead, let’s just jump into the technique, then I’ll break it down a little bit. But before I get too ahead of myself, *please keep in mind there are some bits that require setting up!*

For the purposes of this example, I’ll create a simple mapping for `z-index`. Let’s start by setting up a variable for each level of `z-index` that we want to use. This can help remove the mental overhead of setting values for this property, as it’s generally obvious what level an element should live at when they’re named in a way that makes sense to you (and your team). *This part is optional.*

{% highlight scss %}
$z-index-below: -1 !default;
$z-index-root: 0 !default;
$z-index-default: 1 !default;
$z-index-above: 2 !default;
$z-index-modal: 3 !default;
$z-index-dialog: 4 !default;
$z-index-notification: 5 !default;
{% endhighlight %}

And the next step is to create a [`Map`](https://sass-lang.com/documentation/file.SASS_REFERENCE.html#maps){:rel="external"} of these values. You don’t actually need to use the variables for each value in the Map; you can instead put your typical `CSS` property values in their place—in this case with `z-index`, numbers.

{% highlight scss %}
$z-indexes: (
    below: $z-index-below,
    root: $z-index-root,
    default: $z-index-default,
    above: $z-index-above,
    modal: $z-index-modal,
    dialog: $z-index-dialog,
    notification: $z-index-notification
) !default;
{% endhighlight %}

{% include_cached content/heading.html title='New kid on the block' %}

Now we need to prepare our CSS Variables. In order to make them available for the entire scope of our (S)CSS, we’ll assign them underneath <samp>:root</samp>.

{% highlight scss %}
:root {
    @each $key, $value in $z-indexes {
        --z-index-#{$key}: #{$value};
    }
}
{% endhighlight %}

Additionally, because we’re using SCSS, to keep our code <abbr title="Don’t Repeat Yourself">DRY</abbr>, we’ll utilise the SCSS Map that we set earlier and iterate over it to create a CSS Variable for each of our SCSS variables and Map values.

{% highlight css %}
:root {
    --z-index-below: -1;
    --z-index-root: 0;
    --z-index-default: 1;
    --z-index-above: 2;
    --z-index-modal: 3;
    --z-index-dialog: 4;
    --z-index-notification: 5;
}
{% endhighlight %}

{% highlight scss %}
$variable-map: (
    z-index: $z-indexes
);
{% endhighlight %}

{% highlight scss %}
$property-map: (
    z-index: z-index
);
{% endhighlight %}

We’ll tie it all together with this SCSS mixin.

{% include content/code-toggle-top.html %}
{% highlight scss %}
@mixin v($property, $variable, $negative: false, $important: false, $show-fallback: true) {
    $map-name: map-get($property-map, $property);
    $nest-name: null;
    $nest-map-name: null;
    $map: null;
    $variable-fallback: null;
    $variable-output: null;

    // if a Nested List, we need to go deeper
    @if type-of($map-name) == list {
        $nest-name: nth($map-name, 1);
        $nest-map-name: nth($map-name, 2);
    }

    // if it is a Nested List
    @if $nest-name {
        // get the map from nested map-name
        $map: map-get($variable-map, $nest-name);
        // get the nested map
        $nest-map: map-get($map, $nest-map-name);
        // fallback value, get the var value from the nested map
        $variable-fallback: map-get($nest-map, $variable);
        // our CSS Variable output
        $variable-output: var(--#{$nest-name}-#{$nest-map-name}-#{$variable});
    } @else {
        // get the map from map name
        $map: map-get($variable-map, $map-name);
        // fallback value, grab the variable's value from the map
        $variable-fallback: map-get($map, $variable);
        // our CSS Variable output
        $variable-output: var(--#{$map-name}-#{$variable});
    }

    // CSS Variable
    @if $important {
        @if $show-fallback {
            #{$property}: $variable-fallback !important;
        }
        #{$property}: $variable-output !important;
    } @else {
        @if $show-fallback {
            #{$property}: $variable-fallback;
        }
        #{$property}: $variable-output;
    }
}
{% endhighlight %}
{% include content/code-toggle-bottom.html %}

{% include_cached content/heading.html title='Putting it to use' %}

{% highlight scss %}
.modal {
    @include v(z-index, modal);
}
{% endhighlight %}

{% highlight css %}
.modal {
    z-index: 3;
    z-index: var(--z-index-modal);
}
{% endhighlight %}

If unsupported, the line with the CSS Variable is ignored and the browser will default to, in this case, the previous line
