---
categories: article

date: 2018-10-15 10:34:00

title: Variables for Both
lede: Now that CSS Custom Properties, or CSS Variables, are becoming a solid standard, I’m using a method to map their values to CSS Variables whilst providing a value-as-is fallback using a straightforward syntax in a SCSS mixin.
tags:
- css
- scss

further_reading:
- title: CSS Custom Properties Specification
  url: https://www.w3.org/TR/css-variables/
- title: Using CSS custom properties
  url: https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables
- title: CSS-Tricks Guide to CSS Custom Properties
  url: https://css-tricks.com/guides/css-custom-properties/

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

And the next step is to create a [Map](https://sass-lang.com/documentation/file.SASS_REFERENCE.html#maps){:rel="external"} of these values. You don’t actually need to use the variables for each value in the Map; you can instead put your typical CSS property values in their place—whole numbers in the case of `z-index`.

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

Now we need to prepare our CSS Variables. In order to make them available for the entire scope of our (S)CSS, we’ll assign them underneath `:root`.

{% highlight scss %}
:root {
    @each $key, $value in $z-indexes {
        --z-index-#{$key}: #{$value};
    }
}
{% endhighlight %}

Additionally, because we’re using SCSS, and to keep our code <abbr title="Don’t Repeat Yourself">DRY</abbr>, we’ll utilise the SCSS Map that we set earlier and iterate over it to create a CSS Variable for each of our SCSS Variables and Map values.

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

Now we’ve established our SCSS Variables, a Map for them to live in and be iterated over, and the CSS Variable equivalents of those SCSS Variables. There is, however, one more thing we need to do before we can pull this all together inside our mixin.

We could hard-code some logic inside the mixin in order to designate that our numeric values should be used against the `z-index` property, but I prefer things to be more robust than that. In this case, we’ll use two more SCSS Maps to hold some relational information about the properties and the possible values we want to be able to use inside them.

Before that, though, let’s expand our example a little bit and include two more CSS properties in this methodology: `opacity` and `border-width`. This will help to illustrate the value in creating these relational Maps.

{% highlight scss %}
$opacities: (
    alpha: 0.9,
    beta:  0.6,
    gamma: 0.3
) !default;

$measures: (
    small:  1rem,
    medium: 2rem,
    large:  4rem
) !default;

:root {
    @each $key, $value in $opacities {
        --opacity-#{$key}: #{$value};
    }
    @each $key, $value in $measures {
        --measure-#{$key}: #{$value};
    }
}
{% endhighlight %}

{% highlight css %}
:root {
    --opacity-alpha: 0.9;
    --opacity-beta: 0.6;
    --opacity-gamma: 0.3;
    --measure-small: 1rem;
    --measure-medium: 2rem;
    --measure-large: 4rem;
}
{% endhighlight %}

One important thing to note about this new code is that we’ve introduced a new set of variables, `measures`, which are used as values for properties like `border-width` or `margin`. These `measures` establish consistent spacing and sizing across your components. We will be using the <var>--opacity-</var> <q>type</q> variables for `opacity` but the <var>--measure-</var> <q>type</q> variables can be used for a great number of properties.

This is where the penultimate step really shines. First we’ll establish which SCSS Map of Variables should be used for each <q>type</q> by preparing <var>$variable-map</var>.

{% highlight scss %}
$variable-map: (
    z-index: $z-indexes,
    opacity: $opacities,
    measure: $measures
) !default;
{% endhighlight %}

Secondly, we’ll create a Map that relates each *CSS property* to a set of values of a particular <q>type</q>:

{% highlight scss %}
$property-map: (
    z-index: z-index,
    opacity: opacity,
    margin: measure,
    margin-top: measure,
    margin-right: measure,
    margin-bottom: measure,
    margin-left: measure,
    padding: measure,
    padding-top: measure,
    padding-right: measure,
    padding-bottom: measure,
    padding-left: measure,
    grid-gap: measure,
    column-gap: measure,
    row-gap: measure
) !default;
{% endhighlight %}

Things are pretty straightforward for `z-index` and `opacity`, but you can see that we’ve now assigned our <q>measure-type</q> variables to a handful of properties—we can use any of our <samp>measures</samp> (small, medium, large) when assigning a value to `margin`, `margin-X`, `padding`, `padding-X`, and `X-gap` properties.

Let’s tie it all together with this SCSS mixin.

{% include content/code-toggle-top.html %}
{% highlight scss %}
@mixin v($property, $value, $negative: false, $important: false, $show-fallback: true) {
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
        $variable-fallback: map-get($nest-map, $value);
        // our CSS Variable output
        $variable-output: var(--#{$nest-name}-#{$nest-map-name}-#{$value});
    } @else {
        // get the map from map name
        $map: map-get($variable-map, $map-name);
        // fallback value, grab the variable's value from the map
        $variable-fallback: map-get($map, $value);
        // our CSS Variable output
        $variable-output: var(--#{$map-name}-#{$value});
    }

    // output the value from SCSS as-is as well as the associated CSS Variable
    @if $important {
        @if $show-fallback {
            @if $negative {
                #{$property}: #{$variable-fallback * -1} !important;
            }
            @else {
                #{$property}: $variable-fallback !important;
            }
        }
        @if $negative {
            #{$property}: calc(#{$variable-output} * -1) !important;
        }
        @else {
            #{$property}: $variable-output !important;
        }
    } @else {
        @if $show-fallback {
            @if $negative {
                #{$property}: #{$variable-fallback * -1};
            }
            @else {
                #{$property}: $variable-fallback;
            }
        }
        @if $negative {
            #{$property}: calc(#{$variable-output} * -1);
        }
        @else {
            #{$property}: $variable-output;
        }
    }
}
{% endhighlight %}
{% include content/code-toggle-bottom.html %}

You might have noticed that there are a number of parameters you can pass to this mixin: the property, a value, negation of the passed value (optional), whether or not to mark the declaration as `!important` (optional), and whether or not to provide the fallback value (optional).

{% include_cached content/heading.html title='Putting it to use' %}

{% highlight scss %}
.modal {
    @include v(z-index, modal);
    @include v(opacity, beta);
    @include v(padding, medium);
    @include v(margin-top, medium, true);
}
{% endhighlight %}

{% highlight css %}
.modal {
    z-index: 3;
    z-index: var(--z-index-modal);
    opacity: 0.6;
    opacity: var(--opacity-beta);
    padding: 2rem;
    padding: var(--measure-medium);
    margin-top: -2rem;
    margin-top: calc(var(--measure-large) * -1);
}
{% endhighlight %}

If CSS Variables are unsupported in the browser, the lines with CSS Variables are ignored, and the browser will apply the previous line containing the value as-is.

Because we’ve set <var>$negative</var> to `true` for the `margin-top` declaration, it is multiplied by <var>-1</var> for the SCSS-calculated value and the same operation is made within a `calc()` function call for the CSS Variable equivalent.

Changing the default value of <var>$show-fallback</var> from `true` to `false` where you are declaring this mixin will have a knock-on effect across your codebase, and for every `include` of this mixin, you’ll be shaving off a line of code in your compiled CSS—not much, but it adds up if you are consistently using this technique.

{% include_cached content/heading.html title='The Takeaway' %}

The benefits to using CSS Variables are enormous, and I’d strongly recommend using them as soon as you can across your projects. Others have better explained what those many benefits are, so I encourage you to read up on the subject. A mixin like the one we’ve gone over in this article will help you both in transitioning towards using CSS Variables as well as, when the time comes for your project(s), ceasing to provide fallbacks for your CSS Variables.

This technique could also certainly use some extra eyes to tighten up the code and make it more approachable to a wider audience. Let me know if you have any suggestions or feedback—I’d love to make this technique even stronger, or maybe you have an even better solution!
