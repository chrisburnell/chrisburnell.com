---
category: article
date: 2019-08-16 10:30:00 +0100
title: "Hacky Theming with CSS Filters"
lede: "I recently implemented a <a href=\"#color-scheme-toggle\">colour scheme toggler</a> in the footer of my website, following <a href=\"https://andy-bell.design\" rel=\"external\">Andy Bell’s</a> guide, <a href=\"https://andy-bell.design/wrote/create-a-user-controlled-dark-or-light-mode\" rel=\"external\">Create a user controlled dark or light mode</a>, but I found an alternate solution for styling my dark theme which uses CSS’s filter property."
tags:
  - css
---

<style>
    .figure--dragon div {
        background-color: #f9f9f9;
        background-image: linear-gradient(to bottom right, transparent 50%, #5f8aa6 50%, #5f8aa6);
        width: 10rem;
        height: 10rem;
        font-size: 5rem;
        line-height: 10rem;
        text-align: center;
    }
    [data-user-color-scheme="dark"] .figure--dragon {
        filter: hue-rotate(180deg) invert(1);
    }
    [data-user-color-scheme="dark"] .figure--dragon .emoji {
        filter: none;
    }
</style>

Andy does a great job at explaining how this solution works, so I recommending reading [his article](https://andy-bell.design/wrote/create-a-user-controlled-dark-or-light-mode){:rel="external"} if you want more information.

The gist is that we have some JavaScript that hooks onto a number of CSS Variables exposed on our pages, and we’re toggling their values back and forth between a <q>light</q> and <q>dark</q> palette by changing an attribute on the root element:

{% highlight scss %}
:root {
    --color-text: black;
}
[data-user-color-scheme="dark"] {
    --color-text: white;
}
{% endhighlight %}


{% include content/heading.liquid title='Flip-Flop' %}

I need to put in some time to work on the colours used in my dark theme, but I wanted an interim solution because I was so excited to implement this, to be honest!

So I thought about it a bit and realised that with a handful of `filter` values, we can come up with a decent-enough inversion of my <q>light</q>-themed styles.

<figure class="figure--dragon">
    <div>
        <span class="emoji" role="img" aria-label="Dragon Face">🐲</span>
    </div>
    <p><strong>Theme:</strong> unaltered</p>
</figure>

<figure class="figure--dragon">
    <div style="filter: invert(1);">
        <span class="emoji" role="img" aria-label="Dragon Face">🐲</span>
    </div>
    <p><strong>Theme:</strong> <code>invert(1)</code></p>
</figure>

<figure class="figure--dragon">
    <div style="filter: hue-rotate(180deg) invert(1);">
        <span class="emoji" role="img" aria-label="Dragon Face">🐲</span>
    </div>
    <p><strong>Theme:</strong> <code>invert(1) hue-rotate(180deg)</code></p>
</figure>

<figure class="figure--dragon">
    <div style="filter: hue-rotate(180deg) invert(1);">
        <span class="emoji" role="img" aria-label="Dragon Face" style="filter: hue-rotate(180deg) invert(1);">🐲</span>
    </div>
    <p>
        <strong>Theme:</strong> <code>invert(1) hue-rotate(180deg)</code>
        <br>
        <strong>Emoji:</strong> <code>invert(1) hue-rotate(180deg)</code>
    </p>
</figure>

But something’s *off*. The colours of the emoji in the final example seem more muted or less vibrant than the unaltered emoji in the first example.

Maybe someone more knowledgable about colours on the web has an idea of what’s going on here, but I can’t seem to get the emoji to return to its original colour using a combination of filters to try to flip-flop back to the unaltered state.

I’m definitely missing *something*, but it’s *close*.


{% include content/heading.liquid title='The Code' %}

{% highlight scss %}
img,
svg,
[role="img"],
embed,
iframe,
object,
video {
    @extend %asset-elements;
}

@mixin theme-dark() {
    @supports (filter: invert(1) hue-rotate(180deg)) {
        &,
        %asset-elements {
            filter: invert(1) hue-rotate(180deg);
        }
    }

    @supports not (filter: invert(1) hue-rotate(180deg)) {
        --color-black: #{$color-white};
        --color-mineshaft: #{$color-alto};
        --color-kaiser: #{$color-dove};
        --color-dove: #{$color-kaiser};
        --color-alto: #{$color-mineshaft};
        --color-white: #{$color-black};
    }
}

@include media("dark") {
    :root {
        --color-scheme: "dark";
    }

    :root:not([data-user-color-scheme]) {
        @include theme-dark;
    }
}

/*:root*/[data-user-color-scheme="dark"] {
    @include theme-dark;
}
{% endhighlight %}
