---
date: 2024-05-27T21:39:56+0800
title: Interpolating Colours
description: Today I’ll be talking about how we can use some relatively new data types in CSS for finer control over how we use colour spaces in mixing and creating gradients from colours.
tags:
  - color
  - css
  - weblogpomo
  - weblogpomo2024
---

Although not completely stable across all modern browsers, there are two data types that we can apply to colour-related CSS functions like `color-mix() and `linear-gradient()` and give us the ability to traverse through different colour spaces in new ways. I’m going to work through these two data types by using them with some linear gradients and seeing how they affect the outcome.

## Color Interpolation Method

The first data type I’m going to look at is called the [color interpolation method](https://developer.mozilla.org/en-US/docs/Web/CSS/color-interpolation-method).

<details>
    <summary>What’s <q>interpolation</q>?</summary>
    <p>Interpolation, in this context, is a method for finding new data points based on a range of discrete data points. When it comes to interpolation in colour gradients, this refers to the method by which new colours are found between some known set of colours.</p>
    <p>If we imagine a gradient between the colour red and green, interpolation is how the browser figures out what colours come between the red and green on opposite ends of the gradient.</p>
</details>

A few months ago, I published a code snippet, [Mixing Colours in Different Colour Spaces](/code/mixing-colours-different-spaces/), where I showed how different colour interpolation methods will mix two given colours in different ways. The reason why using different colour interpolation methods produce such different results boils down to the shapes of the colour spaces.

When mixing two colours, the browser will do some calculations to determine the nearest possible midpoint between the two, and the shape and journey taken inside that colour space to find that midpoint is what affects the output.

Check out [Hueplot](https://hueplot.ardov.me/) by [Alexey Ardov](https://ardov.me/) for an *incredible* visualiser of different colour spaces.

The article, [High definition CSS color guide](https://developer.chrome.com/docs/css-ui/high-definition-css-color-guide), by [Adam Argyle](https://nerdy.dev/) is also a fantastic resource for learning more about colour spaces and how the browser draws a path between different types of colour spaces (rectangular and polar) to mix them or create gradients between them.

Similarly to mixing colours with `color-mix()`, we can use different colour spaces when defining gradients with `linear-gradient()`. As a rudimentary example, let’s look at how we might define a gradient between the colours red and green:

```css
background-image:
	linear-gradient(
		to bottom,
		red,
		green
	);
```

<figure>
    <img src="/images/content/srgb-gradient.png" alt="" role="presentation" width="128" height="128">
</figure>

Most browsers will use the sRGB gamut by default, which means the in-between points of colour between red and green are derived from traversing the path between red (`rgb(255, 0, 0)`) and green (`rgb(0, 128, 0)`) in the rectangular sRGB colour space.

We can instruct the browser to traverse between these two colours in a *different* colour space by using the `in *` syntax. For example, to traverse between the equivalent of the same two colours in the HSL colour space, we can add `in hsl` after the angle of direction in the gradient’s definition:

```css
background-image:
	linear-gradient(
		to bottom in hsl,
		red,
		green
	);
```

<figure>
    <img src="/images/content/hsl-gradient.png" alt="" role="presentation" width="128" height="128">
</figure>

This produces a different gradient because the path between red (`hsl(360, 100%, 50%)`) and green (`hsl(120, 100%, 25%)`) passes through different colours in the polar HSL colour space than it does in the sRGB colour space.

What’s also great about this method is that we can define our colours however we choose, and the browser will interpret them in our chosen colour space for us. No conversion needed!

## Hue Interpolation Method

The second data type I’ll discuss is called the [hue interpolation method](https://developer.mozilla.org/en-US/docs/Web/CSS/hue-interpolation-method). This provides us with a way to specify how the browser should calculate the midpoint between the hues of different colours when in a polar colour space like HSL, LCH, or OKLCH.

I think the power of this data type can be most-easily visualised by taking a look at a colour wheel (this one is using HSL):

<figure>
    <img src="/images/content/hsl-colour-wheel.png" alt="" role="presentation" width="190" height="190">
</figure>

Let’s say we wanted to create a gradient that traverses through all the hues of a colour space to produce a full rainbow of colours across the gradient.

Ideally, it would be nice to be able to define a starting colour and have the gradient traverse through all the hues in the colour space and arrive back at the starting point. Something like this:

```css
background-image:
	linear-gradient(
		to bottom in hsl,
		red,
		red
	);
```

Sadly, this doesn’t work, and what is produced is a solid red colour across the entire gradient. This is because the browser will travel through a colour space by taking the shortest path that it can. In our case, because we’re going from `red` to `red`, the shortest path is to not travel at all, which means that the hues in between the start and end of the gradient will not change.

<figure>
    <img src="/images/content/hsl-colour-wheel-example-1.png" alt="" role="presentation" width="190" height="190">
</figure>

Traditionally, creating a rainbow gradient like the one we want would involve defining a series of colour stops for the browser to interpolate between.

```css
background-image:
	linear-gradient(
		to bottom in hsl,
		red,
		orange,
		yellow,
		green,
		blue,
		indigo,
		violet,
		red,
	);
```

But this is certainly far from perfect. The problem is that the spread of colours in a colour space is usually not very even, so the visual difference between each of the colour stops can vary quite dramatically.

However, by defining a hue interpolation method alongside a polar colour interpolation method, we can tell the browser to take the longer way around the colour space. This means we can instruct the browser to traverse from `red` to `red` again, but instead by taking the longer route around the colour space to get from beginning to end:

```css
background-image:
	linear-gradient(
		to bottom in hsl longer hue,
		red,
		red
	);
```

This tells the browser to take a path through the HSL colour space that looks something like this:

<figure>
    <img src="/images/content/hsl-colour-wheel-example-2.png" alt="" role="presentation" width="190" height="190">
</figure>

And the result is our rainbow gradient!

<figure>
    <img src="/images/content/hsl-rainbow-gradient-longer.png" alt="" role="presentation" width="190" height="190">
</figure>

We can also use other colour spaces to get different colours in the gradient, produced by the shapes of those colour spaces instead, e.g. `in oklch`:

```css
background-image:
	linear-gradient(
		to bottom in oklch longer hue,
		red,
		red
	);
```

<figure>
    <img src="/images/content/oklch-rainbow-gradient-longer.png" alt="" role="presentation" width="190" height="190">
</figure>

The other values (`shorter hue`, `decreasing hue`, and `increasing hue`) are other ways we can dictate that the browser should traverse through a given colour space. This allows us to do things like change the direction around the colour space that is taken, force the browser to use the *shorter* route, and so on. Playing with these values can lead to some really interesting mixes and gradients that were previously quite cumbersome to achieve!

## Demo

<p class="rss-only">Check out this post <a href="/article/interpolating-colours/#demo">on my website</a> to play with the demo.</p>

<div class="demo  no-rss">
    <form autocomplete="off">
        <div class="requires-js">
            <label for="color-a">
                Color A
                <input type="color" id="color-a" name="color-a" value="#ff0000" />
            </label>
            <label for="color-b">
                Color B
                <input type="color" id="color-b" name="color-b" value="#008000" />
            </label>
        </div>
        <label for="color-method">
            Color Interpolation Method
            <select id="color-method" name="color-method">
                <optgroup label="Choose a color interpolation method">
                    <option value="srgb">sRGB</option>
                    <option value="hsl" selected>HSL</option>
                    <option value="lch">LCH</option>
                    <option value="oklch">OKLCH</option>
                </optgroup>
            </select>
        </label>
        <label for="hue-method">
            Hue Interpolation Method
            <select id="hue-method" name="hue-method">
                <optgroup label="Choose a hue interpolation method">
                    <option value="default" selected>Browser Default</option>
                    <option value="shorter-hue">Shorter Hue</option>
                    <option value="longer-hue">Longer Hue</option>
                    <option value="decreasing-hue">Decreasing Hue</option>
                    <option value="increasing-hue">Increasing Hue</option>
                </optgroup>
            </select>
        </label>
    </form>
    <div class="gradient"></div>
</div>

<noscript class="no-rss"><p>Unfortunately, this demo requires JavaScript to function fully.</p></noscript>

<style>
:is(.demo, .demo form, .demo form div) {
    display: flex;
    flex-direction: column;
    gap: 1em;
}

.gradient {
    background-image:
        linear-gradient(
            to right var(--color-interpolation-method, ) var(--hue-interpolation-method, ),
            var(--color-a, #ff0000),
            var(--color-b, #008000)
        );
    inline-size: 100%;
    block-size: 6em;
}

.demo:has([value="srgb"]:checked) {
    --color-interpolation-method: in srgb;
}
.demo:has([value="hsl"]:checked) {
    --color-interpolation-method: in hsl;
}
.demo:has([value="lch"]:checked) {
    --color-interpolation-method: in lch;
}
.demo:has([value="oklch"]:checked) {
    --color-interpolation-method: in oklch;
}

.demo:not(:has([value="srgb"]:checked)):has([value="shorter-hue"]:checked) {
    --hue-interpolation-method: shorter hue;
}
.demo:not(:has([value="srgb"]:checked)):has([value="longer-hue"]:checked) {
    --hue-interpolation-method: longer hue;
}
.demo:not(:has([value="srgb"]:checked)):has([value="decreasing-hue"]:checked) {
    --hue-interpolation-method: decreasing hue;
}
.demo:not(:has([value="srgb"]:checked)):has([value="increasing-hue"]:checked) {
    --hue-interpolation-method: increasing hue;
}
</style>

<script>
const demo = document.querySelector(".demo")
const inputs = document.querySelectorAll(".demo input")
const colorMethodSelect = document.getElementById("color-method")
const hueMethodSelect = document.getElementById("hue-method")

inputs.forEach((input) => {
    input.addEventListener("change", () => {
        demo.style.setProperty(`--${input.id}`, input.value)
    })
})

colorMethodSelect.addEventListener("change", () => {
    if (colorMethodSelect.value === "srgb") {
        hueMethodSelect.disabled = true
    } else {
        hueMethodSelect.removeAttribute("disabled")
    }
})
</script>
