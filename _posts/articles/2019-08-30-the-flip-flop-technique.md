---
date: 2019-08-30 10:48:00 +0100
title: "The Flip-Flop Technique"
lede: "I recently implemented a <a href=\"#color-scheme-toggle\">colour scheme toggler</a> in the footer of my website, following <a href=\"https://andy-bell.design\" rel=\"external\">Andy Bell’s</a> guide, <a href=\"https://andy-bell.design/wrote/create-a-user-controlled-dark-or-light-mode\" rel=\"external\">Create a user controlled dark or light mode</a>, but I found a hacky but fun alternative solution for styling my dark theme which leverages CSS’s filter property."
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
    .figure--dragon--animate {
        flex-direction: row;
        cursor: col-resize;
    }
    .figure--dragon--animate div {
        clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
        transition: all 0.5s ease;
    }
    .figure--dragon--animate:hover div:first-child,
    .figure--dragon--animate:focus div:first-child,
    .figure--dragon--animate:active div:first-child {
        clip-path: polygon(0 0, 50% 0, 50% 100%, 0 100%);
        transform: translateX(50%);
    }
    .figure--dragon--animate:hover div:last-child,
    .figure--dragon--animate:focus div:last-child,
    .figure--dragon--animate:active div:last-child {
        clip-path: polygon(50% 0, 100% 0, 100% 100%, 50% 100%);
        transform: translateX(-50%);
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

Eventually, I realised that with a handful of `filter` values, we can come up with a decent-enough inversion of my <q>light</q>-themed styles.

<figure class="figure--dragon">
    <h4>Figure 1</h4>
    <div>
        <span class="emoji" role="img" aria-label="Dragon Face">🐲</span>
    </div>
    <p>
        <strong>Theme:</strong> <code>unaltered</code>
    </p>
</figure>

<figure class="figure--dragon">
    <h4>Figure 2</h4>
    <div style="filter: invert(1);">
        <span class="emoji" role="img" aria-label="Dragon Face">🐲</span>
    </div>
    <p>
        <strong>Theme:</strong> <code>invert(1)</code>
    </p>
</figure>

Inversion complete. We’ve gone from a light background to a dark one. Now we need to fix the hues of our colours—in this case, we want our brown to be blue.

<figure class="figure--dragon">
    <h4>Figure 3</h4>
    <div style="filter: invert(1) hue-rotate(180deg);">
        <span class="emoji" role="img" aria-label="Dragon Face">🐲</span>
    </div>
    <p>
        <strong>Theme:</strong> <code>invert(1) hue-rotate(180deg)</code>
    </p>
</figure>

Now we’ve managed to get our blue back, but the Dragon emoji looks completely wrong. *This is where the flip-flop technique comes in.*

<figure class="figure--dragon">
    <h4>Figure 4</h4>
    <div style="filter: invert(1) hue-rotate(180deg);">
        <span class="emoji" role="img" aria-label="Dragon Face" style="filter: invert(1) hue-rotate(180deg);">🐲</span>
    </div>
    <p>
        <strong>Theme:</strong> <code>invert(1) hue-rotate(180deg)</code>
        <br>
        <strong>Emoji:</strong> <code>invert(1) hue-rotate(180deg)</code>
    </p>
</figure>

That’s done it. By applying the same filter *again* to the emoji, it flip-flops back to its unaltered appearance.


{% include content/heading.liquid title='Hue, Saturation, Lightness' %}

But something’s *off*. The colours of the emoji in the final example seem more muted or less vibrant than the unaltered emoji in the first example, which is most noticeable on the yellow hair of the dragon. Interact with this demo to see the unaltered state alongside the fully-filtered state and see for yourself.

<figure class="figure--dragon  figure--dragon--animate" tabindex="0">
    <div>
        <span class="emoji" role="img" aria-label="Dragon Face">🐲</span>
    </div>
    <div style="filter: invert(1) hue-rotate(180deg);">
        <span class="emoji" role="img" aria-label="Dragon Face" style="filter: invert(1) hue-rotate(180deg);">🐲</span>
    </div>
</figure>


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


Maybe someone knowledgable about colours or filters on the web has an idea of what’s going on here, but I can’t seem to get the emoji to return to its original colour using any combination of filters to try to flip-flop back to its unaltered state.

I’m definitely missing *something*, but it’s *close*.
