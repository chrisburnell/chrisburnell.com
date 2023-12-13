---
draft: true
date: 2023-12-13T10:00:00+0000
title: Can you teach an old design system new colours?
description: Over the years, I’ve changed the colours used across my website a number of times, and I’m happy with what I have now, but what I’m going to talk about today are <em>formats</em> for defining colours and some recent <q>behind-the-scenes</q> changes I made to how I define colours on my website, making theming my website easier.
tags:
  - color
  - css
  - css-variables
  - design-systems
css: styleguide.css
---

## Hexidecimal / RGB

<figure>
    <ul class=" [ palette  thirds ] ">
        <li style="background-color: #5f8aa6; color: #060606;">
            <div class=" [ delta ] ">Raven</div>
            <pre style="font-size: var(--font-size-small-min)">#5f8aa6</pre>
        </li>
        <li style="background-color: #060606; color: #f9f9f9;">
            <div class=" [ delta ] ">Thunder</div>
            <pre style="font-size: var(--font-size-small-min)">#060606</pre>
        </li>
        <li style="background-color: #f9f9f9; color: #060606;">
            <div class=" [ delta ] ">Snowy</div>
            <pre style="font-size: var(--font-size-small-min)">#f9f9f9</pre>
        </li>
    </ul>
</figure>

For many years, my colours were defined in Hexidecimal format, or **Hex** as it’s commonly known as, which maps to the <abbr class=" [ strong ] " title="Red, Green, Blue">RGB</abbr> colour model. This was essentially the de facto way of defining colours back in 2008.

But when it comes to *reading* and *understanding* **Hex/RGB** colours, it’s a bit more tricky.

<noscript><p class=" [ box  box--error ] ">Unfortunately, this demo requires JavaScript to function correctly!</p></noscript>
<form id="demo-hex" class=" [ grid ] " style="--placement: auto-fit; --min-inline-size: 6rem;">
	<fieldset>
		<label for="input-hex-red" class=" [ delta ] ">Red</label>
		<input id="input-hex-red" type="range" min="0" max="255" value="95" style="inline-size: 100%; line-height: 3;" />
	</fieldset>
	<fieldset>
		<label for="input-hex-green" class=" [ delta ] ">Green</label>
		<input id="input-hex-green" type="range" min="0" max="255" value="138" style="inline-size: 100%; line-height: 3;" />
	</fieldset>
	<fieldset>
		<label for="input-hex-blue" class=" [ delta ] ">Blue</label>
		<input id="input-hex-blue" type="range" min="0" max="255" value="166" style="inline-size: 100%; line-height: 3;" />
	</fieldset>
</form>
<div id="output-hex" class="output-color" style="background-color: rgb(95, 138, 166);"></div>

Using the sliders above, try to make <code style="background-color: #b5f1fd; color: #060606; font-size: 1.25em;">this blue</code>.

Now try to make it <code style="background-color: #f2a5f4; color: #060606; font-size: 1.25em;">this pink</code>.

This is definitely not an easy task! This is because all three values, in tandem, are responsible for controlling not just the hue, but also the saturation and the lightness of that hue. This makes authoring and reading **Hex/RGB** values difficult as it’s difficult to imagine how certain ratios and amounts of each value mix to produce a colour.

**RGB** is an additive colour format. This means that, starting from black, we combine **r**ed, **g**reen, and **b**lue together to create a colour, and the syntax we use when coding to define **Hex/RGB** colours follows this format: we have to provide a red, green, and blue value.

These limitations, particularly in *creating* (or *finding*) colours, were probably a good thing for web development, as it spawned countless, incredible tools that presented **Hex/RGB** in ways that are generally easier to understand and manipulate for humans than manually adjusting **RGB** values. This almost-surely pushed the collective understanding of colour on the web further and helped ingratiate people towards alternative and newer formats for defining colour.

## HSL

<figure>
    <ul class=" [ palette  thirds ] ">
        <li style="background-color: hsl(204 29% 51%); color: hsl(0 0% 2%);">
            <div class=" [ delta ] ">Raven</div>
            <pre style="font-size: var(--font-size-small-min)">hsl(204 29% 51%)</pre>
        </li>
        <li style="background-color: hsl(0 0% 2%); color: hsl(0 0% 98%);">
            <div class=" [ delta ] ">Thunder</div>
            <pre style="font-size: var(--font-size-small-min)">hsl(0 0% 2%)</pre>
        </li>
        <li style="background-color: hsl(0 0% 98%); color: hsl(0 0% 2%);">
            <div class=" [ delta ] ">Snowy</div>
            <pre style="font-size: var(--font-size-small-min)">hsl(0 0% 98%)</pre>
        </li>
    </ul>
</figure>

Enter <abbr class=" [ strong ] " title="Hue, Saturation, Lightness">HSL</abbr>. Coming from the world of **Hex/RGB**, it was immediately more-readable to me, where the values in the **HSL** syntax tell us: which direction in the colour wheel to point; how saturated (how *much*) of that colour we want, and the lightness of the produced colour.

It’s important to know that **HSL** uses the same colour space as **Hex** and **RGB**, it just provides different parameters from **Hex/RGB** for us as developers to achieve the same colours we could with **Hex** and **RGB**.

<noscript><p class=" [ box  box--error ] ">Unfortunately, this demo requires JavaScript to function correctly!</p></noscript>
<form id="demo-hsl" class=" [ grid ] ">
	<fieldset style="grid-column: 1 / -1;">
		<label for="input-hsl-hue" class=" [ delta ] ">Hue</label>
		<input id="input-hsl-hue" type="range" min="0" max="360" value="204" style="inline-size: 100%; line-height: 3;" />
	</fieldset>
	<fieldset>
		<label for="input-hsl-saturation" class=" [ delta ] ">Saturation</label>
		<input id="input-hsl-saturation" type="range" min="0" max="100" value="29" style="inline-size: 100%; line-height: 3;" />
	</fieldset>
	<fieldset>
		<label for="input-hsl-lightness" class=" [ delta ] ">Lightness</label>
		<input id="input-hsl-lightness" type="range" min="0" max="100" value="51" style="inline-size: 100%; line-height: 3;" />
	</fieldset>
</form>
<div id="output-hsl" class="output-color" style="background-color: hsl(204 29% 51%);"></div>

Like before, using the sliders above, try to make <code style="background-color: #b5f1fd; color: #060606; font-size: 1.25em;">this blue</code>.

Then try to make it <code style="background-color: #f2a5f4; color: #060606; font-size: 1.25em;">this pink</code>.

It may not necessarily be quicker to do, but the inputs that we get with **HSL** are certainly more intuitive to work with and comprehend than **RGB’s**. Importantly, it puts two of the ways that we typically describe colour with language, by a colour’s **Hue** and **Lightness**, as two of the colour format’s inputs (which, I *imagine* maps to parts of the brain more easily than **RGB**). The third input, **Saturation** may not be immediately obvious, but can be understood by playing with its value.

### Hue

<div class="rgb-hue-gradient"></div>

In stark contrast to manipulating **RGB** values, finding the **Hue** of your target colour is much easier here; although, not perfect, it’s still not trivial to be able to remember how much rotation is required to find your target **Hue**.

Setting the **Saturation** to 100% and **Lightness** to 50%, and then cycling through the values for **Hue**, from 0° to 360° will give you an idea of what colours look like in their most saturated and untinted/unshaded form.

### Saturation

<div class="rgb-saturation-gradient"></div>

Next is **Saturation** which dictates <q>how much</q> of our given **Hue** we want.

With any **Hue**, try setting the **Lightness** to 50%, and then cycling through the values for **Saturation**, from 0% to 100%. This will give you an idea of how the amount of **Saturation** we apply to **Hue** dictates how far away from being completely-greyscale we make the colour. You’ll also notice that when the **Saturation** is at 0%, it doesn’t matter what the **Hue** is anymore—given the same **Lightness**, an unsaturated Red **Hue** and an unsaturated Cyan **Hue** appear the same.

### Lightness

<div class="rgb-lightness-gradient"></div>

The easiest way for me to understand the **Lightness** value is to think of it like a slide between black and white. The midpoint at 50% mixes your colour with both black and white (so a grey colour that is perfectly between black and white). As you deviate away from the midpoint, your colour is mixed with either more black and less white (as **Lightness** decreases) or more white and less black (as **Lightness** increases), reaching a point of being pure black at 0% and pure white at 100%.

You can see this effect no matter what the **Hue** and **Saturation** values are.

<h2 id="problems-with-rgb">Problems with the RGB colour space</h2>

### Inconsistent perceived lightness

<div class="hsl-lightness-block"></div>

While one of the parameters of an **HSL** colour is **Lightness**, you’ll find that there is a stark contrast in how we perceive the brightness of **Hues** around the wheel.

These two colours, cyan and blue, both have identical **Saturation** and **Lightness** values—only their **Hues** differ—but despite this we perceive the cyan as being much brighter than the blue. We can account for this, but an ideal colour space would provide consistency in its parameters.

### Dead grey zones

<div class="hsl-ugly-gradient"></div>

A clear example of this is in displaying gradients; when instructing the browser to traverse the colour space to find a line between two colours that will make up the gradient, you’ll often find that it takes a path that you don’t expect or want. It’s not uncommon to find that developers have created gradients that don’t simply traverse from point A to point B in the colour space; they provide additional colour stops to ensure that the gradient looks correct.

In the example, I’ve instructed the browser to create a gradient between red and cyan, but you’ll notice that it goes through a grey/monochrome area of the colour space around the midpoint. I would hope that the produced gradient would tween between not just the hues of red and cyan, but also their lightness and saturation. It seems, however, that the path taken to draw gradients often goes through parts of the **RGB** colour space that have little or no saturation, leading to [dead grey zones](https://www.smashingmagazine.com/2023/08/oklch-color-spaces-gamuts-css/#dead-grey-zones).

## OKLCH

<figure>
    <ul class=" [ palette  thirds ] ">
        <li style="background-color: oklch(61.29% 0.064 237.73); color: oklch(15% 0 0);">
            <div class=" [ delta ] ">Raven</div>
            <pre style="font-size: var(--font-size-small-min)">oklch(61.29% 0.064 237.73)</pre>
        </li>
        <li style="background-color: oklch(15% 0 0); color: oklch(98.2% 0 0);">
            <div class=" [ delta ] ">Thunder</div>
            <pre style="font-size: var(--font-size-small-min)">oklch(15% 0 0)</pre>
        </li>
        <li style="background-color: oklch(98.2% 0 0); color: oklch(15% 0 0);">
            <div class=" [ delta ] ">Snowy</div>
            <pre style="font-size: var(--font-size-small-min)">oklch(98.2% 0 0)</pre>
        </li>
    </ul>
</figure>

And finally, where I’ve happily landed: **OKLCH**. This is the most flexible and understandable colour format that I’ve [found](/feature-watch/) yet.

<noscript><p class=" [ box  box--error ] ">Unfortunately, this demo requires JavaScript to function correctly!</p></noscript>
<form id="demo-oklch" class=" [ grid ] " style="--placement: auto-fit; --min-inline-size: 6rem;">
	<fieldset>
		<label for="input-oklch-lightness" class=" [ delta ] ">Lightness</label>
		<input id="input-oklch-lightness" type="range" min="0" max="100" value="61" style="inline-size: 100%; line-height: 3;" />
	</fieldset>
	<fieldset>
		<label for="input-oklch-chroma" class=" [ delta ] ">Chroma</label>
		<input id="input-oklch-chroma" type="range" min="0" max="0.4" value="0.06" step="0.01" style="inline-size: 100%; line-height: 3;" />
	</fieldset>
	<fieldset>
		<label for="input-oklch-hue" class=" [ delta ] ">Hue</label>
		<input id="input-oklch-hue" type="range" min="0" max="360" value="238" style="inline-size: 100%; line-height: 3;" />
	</fieldset>
</form>
<div id="output-oklch" class="output-color" style="background-color: oklch(61.29% 0.064 237.73);"></div>

Last time now, using the sliders above, try to make <code style="background-color: #b5f1fd; color: #060606; font-size: 1.25em;">this blue</code>.

Finally, try to make it <code style="background-color: #f2a5f4; color: #060606; font-size: 1.25em;">this pink</code>.

This is about on the same level as **HSL** in terms of authoring and reading, but **OKLCH** fixes a [number of problems with the RGB colour space](#problems-with-rgb) that makes it more consistent and reliable across its colour space. In addition, it offers both *more* colours and colours that are *outside* of the **RGB** colour space, i.e. colours that were not achievable on the web before.

<c-details hidden>
    <summary>Browser Support</summary>
    {% browserSupport 'mdn-css_types_color_oklch' %}
</c-details>

### Lightness

<div class="oklch-lightness-gradient"></div>

This functions similarly to the **HSL** **Lightness** value in that it mixes your colour with different levels of black and white.

You can see this effect no matter what the **Chroma** and **Hue** values are.

### Chroma

<div class="oklch-chroma-gradient"></div>

**Chroma** is similar, again, to **HSL’s** **Saturation**; it dictates <q>how much</q> of our given **Hue** we want. What differs from **HSL’s** **Saturation** is that even when the **Lightness** is zero, we still get some colour, depending on how much **Chroma** we apply. So in this colour space, greyscale colours, including black and white, require that the **Chroma** value be 0.

You’ll also notice that, like with **HSL’s** **Saturation**, when the **Chroma** is at 0%, it doesn’t matter what the **Hue** is anymore—given the same **Lightness** values and zero **Chroma**, changing **Hue** no longer affects the produced colour.

### Hue

<div class="oklch-hue-gradient"></div>

This functions very much the same as **HSL’s** **Hue**, but the values don’t line up exactly the same. This is because unlike **Hex/RGB** and **HSL**, **OKLCH** operates in a different colour space and actually makes available (to supporting browsers and devices) even more colours than were available in the **RGB** colour space.

Try setting the **Lightness** to 50% and the **Chroma** to 100%, and then cycling through the values for **Hue**, from 0° to 360°. This will give you an idea of what colours look like in their most saturated and untinted/unshaded form.

## Colours in practice

This all came about when I decided that I wanted to add a *Sepia* theme to my website (check out the [theme toggler in the footer!](#theme-toggler)), but I didn't have a clean and concise way to go about it. What I wanted was a way to slightly-tint all the colours on my website into the sepia range.

Until recently, I had defined my colours manually, like this:

```css
--color-raven: oklch(61.29% -0.034 -0.054);
--color-thunder: oklch(12.2% 0 0);
--color-snowy: oklch(98.2% 0 0);
--color-mineshaft: oklch(28.9% 0 0);
--color-yeti: oklch(89.8% 0 0);
--color-lynx: oklch(17.6% -0.01 -0.014);
--color-bear: oklch(96% -0.006 -0.01);
...
```

So building a theme where all of the colours are tinted sepia meant redefining each of the CSS Variables I had already defined for the default (non-sepia) theme.

That’s where the incredible new CSS function, `color-mix()`, comes in! Using it, I’ve been able to boil down my 13-colour palette into 3 core colours and 10 variations of those colours.

<figure>
	{% image './images/content/colour-lines.png', 'A pixel-art image showing how the three base colours mix to create ten variation colours in the thirteen-colour palette', 'pixelated' %}
</figure>

The first step is to set up some initial CSS variables to use for building out the `--color-*` variables. These are the variables that we’ll later use to change themes, including our desired **Sepia** theme.

```css
--snowy-lightness: 98.2%;
--thunder-lightness: 15%;
--monochrome-chroma: 0;
--monochrome-hue: 0;

--raven-lightness: 61.29%;
--raven-chroma: 0.064;
--raven-hue: 237.73;
```

Next, we’ll build out the 3 base colours in the palette using the above variables, and from these 3 base colours, the 10 remaining colours in the palette can be constructed:

<figure>
    <ul class=" [ palette ] ">
        <li style="background-color: oklch(61.29% 0.064 237.73); color: oklch(15% 0 0); flex: 1 0 100%;">
            <div class=" [ delta ] ">Raven</div>
            <pre style="font-size: var(--font-size-small-min)">oklch(<br>&#9;var(--raven-lightness)<br>&#9;var(--raven-chroma)<br>&#9;var(--raven-hue)<br>)</pre>
        </li>
        <li style="background-color: oklch(15% 0 0); color: oklch(98.2% 0 0); flex: 1 0 100%;">
            <div class=" [ delta ] ">Thunder</div>
            <pre style="font-size: var(--font-size-small-min)">oklch(<br>&#9;var(--thunder-lightness)<br>&#9;var(--monochrome-chroma)<br>&#9;var(--monochrome-hue)<br>)</pre>
        </li>
        <li style="background-color: oklch(98.2% 0 0); color: oklch(15% 0 0); flex: 1 0 100%;">
            <div class=" [ delta ] ">Snowy</div>
            <pre style="font-size: var(--font-size-small-min)">oklch(<br>&#9;var(--snowy-lightness)<br>&#9;var(--monochrome-chroma)<br>&#9;var(--monochrome-hue)<br>)</pre>
        </li>
        <li style="background-color: color-mix(in oklab, oklch(98.2% 0 0), oklch(15% 0 0) 83.6%); color: oklch(98.2% 0 0);">
            <div class=" [ delta ] ">Mineshaft</div>
            <pre style="font-size: var(--font-size-small-min); text-align: start;">color-mix(<br>&#9;in oklab,<br>&#9;var(--color-snowy),<br>&#9;var(--color-thunder) 83.6%<br>)</pre>
        </li>
        <li style="background-color: color-mix(in oklab, oklch(98.2% 0 0), oklch(15% 0 0) 66.6%); color: oklch(98.2% 0 0);">
            <div class=" [ delta ] ">Kaiser</div>
            <pre style="font-size: var(--font-size-small-min); text-align: start;">color-mix(<br>&#9;in oklab,<br>&#9;var(--color-snowy),<br>&#9;var(--color-thunder) 66.6%<br>)</pre>
        </li>
        <li style="background-color: color-mix(in oklab, oklch(98.2% 0 0), oklch(15% 0 0) 51.8%); color: oklch(98.2% 0 0);">
            <div class=" [ delta ] ">Nickel</div>
            <pre style="font-size: var(--font-size-small-min); text-align: start;">color-mix(<br>&#9;in oklab,<br>&#9;var(--color-snowy),<br>&#9;var(--color-thunder) 51.8%<br>)</pre>
        </li>
        <li style="background-color: color-mix(in oklab, oklch(98.2% 0 0), oklch(15% 0 0) 10.2%); color: oklch(15% 0 0);">
            <div class=" [ delta ] ">Yeti</div>
            <pre style="font-size: var(--font-size-small-min); text-align: start;">color-mix(<br>&#9;in oklab,<br>&#9;var(--color-snowy),<br>&#9;var(--color-thunder) 10.2%<br>)</pre>
        </li>
        <li style="background-color: color-mix(in oklab, oklch(61.29% 0.064 237.73), oklch(15% 0 0) 75%); color: oklch(98.2% 0 0);">
            <div class=" [ delta ] ">Lynx</div>
            <pre style="font-size: var(--font-size-small-min); text-align: start;">color-mix(<br>&#9;in oklab,<br>&#9;var(--color-raven),<br>&#9;var(--color-thunder) 75%<br>)</pre>
        </li>
        <li style="background-color: color-mix(in oklab, oklch(61.29% 0.064 237.73), oklch(15% 0 0) 54%); color: oklch(98.2% 0 0);">
            <div class=" [ delta ] ">Wolf</div>
            <pre style="font-size: var(--font-size-small-min); text-align: start;">color-mix(<br>&#9;in oklab,<br>&#9;var(--color-raven),<br>&#9;var(--color-thunder) 54%<br>)</pre>
        </li>
        <li style="background-color: color-mix(in oklab, oklch(61.29% 0.064 237.73), oklch(15% 0 0) 33%); color: oklch(98.2% 0 0);">
            <div class=" [ delta ] ">Bowhead</div>
            <pre style="font-size: var(--font-size-small-min); text-align: start;">color-mix(<br>&#9;in oklab,<br>&#9;var(--color-raven),<br>&#9;var(--color-thunder) 33%<br>)</pre>
        </li>
        <li style="background-color: color-mix(in oklab, oklch(61.29% 0.064 237.73), oklch(98.2% 0 0) 33%); color: oklch(15% 0 0);">
            <div class=" [ delta ] ">Highland</div>
            <pre style="font-size: var(--font-size-small-min); text-align: start;">color-mix(<br>&#9;in oklab,<br>&#9;var(--color-raven),<br>&#9;var(--color-snowy) 33%<br>)</pre>
        </li>
        <li style="background-color: color-mix(in oklab, oklch(61.29% 0.064 237.73), oklch(98.2% 0 0) 54%); color: oklch(15% 0 0);">
            <div class=" [ delta ] ">Coyote</div>
            <pre style="font-size: var(--font-size-small-min); text-align: start;">color-mix(<br>&#9;in oklab,<br>&#9;var(--color-raven),<br>&#9;var(--color-snowy) 54%<br>)</pre>
        </li>
        <li style="background-color: color-mix(in oklab, oklch(61.29% 0.064 237.73), oklch(98.2% 0 0) 75%); color: oklch(15% 0 0);">
            <div class=" [ delta ] ">Bear</div>
            <pre style="font-size: var(--font-size-small-min); text-align: start;">color-mix(<br>&#9;in oklab,<br>&#9;var(--color-raven),<br>&#9;var(--color-snowy) 75%<br>)</pre>
        </li>
    </ul>
</figure>

<div class=" [ box ] "><p>Why am I mixing colours with <code>in oklab</code>?</p><p>I prefer the way that <em>OKLab</em> mixes colours and traverses the colour space for gradients; although, I still much prefer the syntax of defining colours themselves using <strong>OKLCH</strong>.</p></div>

And with that, **the 13-colour palette is complete**!

Time to start putting all this work to use.

### Applying a tint

Now that we have **3 base colours** and **10 variations**, built in the browser based on **7 variables**, we can redefine just a few of those variables and affect the entire palette.

```css
/* bring down the amount of white */
--snowy-lightness: 88%;

/* slight yellow tint to monochrome colours */
--monochrome-chroma: 0.06;
--monochrome-hue: 90;

/* slight yellow tint to raven-based colours */
--raven-chroma: 0.034;
--raven-hue: 180;
```

#### Sepia Theme

<figure>
    <ul class=" [ palette  thirds ] [ sepia ] ">
        <li class=" [ background--raven ] " style="flex: 1 0 100%;">
            <div class=" [ delta ] ">Raven</div>
        </li>
        <li class=" [ background--thunder ] ">
            <div class=" [ delta ] ">Thunder</div>
        </li>
        <li class=" [ background--snowy ] ">
            <div class=" [ delta ] ">Snowy</div>
        </li>
        <li class=" [ background--mineshaft ] ">
            <div class=" [ delta ] ">Mineshaft</div>
        </li>
        <li class=" [ background--kaiser ] ">
            <div class=" [ delta ] ">Kaiser</div>
        </li>
        <li class=" [ background--nickel ] ">
            <div class=" [ delta ] ">Nickel</div>
        </li>
        <li class=" [ background--yeti ] ">
            <div class=" [ delta ] ">Yeti</div>
        </li>
        <li class=" [ background--lynx ] ">
            <div class=" [ delta ] ">Lynx</div>
        </li>
        <li class=" [ background--wolf ] ">
            <div class=" [ delta ] ">Wolf</div>
        </li>
        <li class=" [ background--bowhead ] ">
            <div class=" [ delta ] ">Bowhead</div>
        </li>
        <li class=" [ background--highland ] ">
            <div class=" [ delta ] ">Highland</div>
        </li>
        <li class=" [ background--coyote ] ">
            <div class=" [ delta ] ">Coyote</div>
        </li>
        <li class=" [ background--bear ] ">
            <div class=" [ delta ] ">Bear</div>
        </li>
    </ul>
</figure>

This makes it easy to change the <q>theme</q> of my website just by manipulating the `raven`-based variables. Critically, you might notice that the perceived brightness of the colours between these themes look much more consistant than what the **RGB** colour space provided.

<c-details hidden>
    <summary>Koala Theme</summary>
    <figure>
        <ul class=" [ palette  thirds ] [ koala ] ">
            <li class=" [ background--raven ] " style="flex: 1 0 100%;">
                <div class=" [ delta ] ">Raven</div>
            </li>
            <li class=" [ background--lynx ] ">
                <div class=" [ delta ] ">Lynx</div>
            </li>
            <li class=" [ background--wolf ] ">
                <div class=" [ delta ] ">Wolf</div>
            </li>
            <li class=" [ background--bowhead ] ">
                <div class=" [ delta ] ">Bowhead</div>
            </li>
            <li class=" [ background--highland ] ">
                <div class=" [ delta ] ">Highland</div>
            </li>
            <li class=" [ background--coyote ] ">
                <div class=" [ delta ] ">Coyote</div>
            </li>
            <li class=" [ background--bear ] ">
                <div class=" [ delta ] ">Bear</div>
            </li>
        </ul>
    </figure>
</c-details>

<c-details hidden>
    <summary>Code Red Theme</summary>
    <figure>
        <ul class=" [ palette  thirds ] [ code-red ] ">
            <li class=" [ background--raven ] " style="flex: 1 0 100%;">
                <div class=" [ delta ] ">Raven</div>
            </li>
            <li class=" [ background--lynx ] ">
                <div class=" [ delta ] ">Lynx</div>
            </li>
            <li class=" [ background--wolf ] ">
                <div class=" [ delta ] ">Wolf</div>
            </li>
            <li class=" [ background--bowhead ] ">
                <div class=" [ delta ] ">Bowhead</div>
            </li>
            <li class=" [ background--highland ] ">
                <div class=" [ delta ] ">Highland</div>
            </li>
            <li class=" [ background--coyote ] ">
                <div class=" [ delta ] ">Coyote</div>
            </li>
            <li class=" [ background--bear ] ">
                <div class=" [ delta ] ">Bear</div>
            </li>
        </ul>
    </figure>
</c-details>

<c-details hidden>
    <summary>Rabbit Hole Theme</summary>
    <figure>
        <ul class=" [ palette  thirds ] [ matrix ] ">
            <li class=" [ background--raven ] " style="flex: 1 0 100%;">
                <div class=" [ delta ] ">Raven</div>
            </li>
            <li class=" [ background--lynx ] ">
                <div class=" [ delta ] ">Lynx</div>
            </li>
            <li class=" [ background--wolf ] ">
                <div class=" [ delta ] ">Wolf</div>
            </li>
            <li class=" [ background--bowhead ] ">
                <div class=" [ delta ] ">Bowhead</div>
            </li>
            <li class=" [ background--highland ] ">
                <div class=" [ delta ] ">Highland</div>
            </li>
            <li class=" [ background--coyote ] ">
                <div class=" [ delta ] ">Coyote</div>
            </li>
            <li class=" [ background--bear ] ">
                <div class=" [ delta ] ">Bear</div>
            </li>
        </ul>
    </figure>
</c-details>

<noscript><p class=" [ box  box--error ] ">Unfortunately, this demo requires JavaScript to function correctly!</p></noscript>
<form id="demo-palette" class=" [ grid ] " data-layout="50-50" style="">
	<fieldset>
		<label for="input-snowy-lightness" class=" [ delta ] ">Snowy Lightness</label>
		<input id="input-snowy-lightness" type="range" min="0" max="100" value="98" style="inline-size: 100%; line-height: 3;" />
	</fieldset>
	<fieldset>
		<label for="input-thunder-lightness" class=" [ delta ] ">Thunder Lightness</label>
		<input id="input-thunder-lightness" type="range" min="0" max="100" value="15" style="inline-size: 100%; line-height: 3;" />
	</fieldset>
	<fieldset>
		<label for="input-monochrome-chroma" class=" [ delta ] ">Monochrome Chroma</label>
		<input id="input-monochrome-chroma" type="range" min="0" max="0.4" value="0" step="0.01" style="inline-size: 100%; line-height: 3;" />
	</fieldset>
	<fieldset>
		<label for="input-monochrome-hue" class=" [ delta ] ">Monochrome Hue</label>
		<input id="input-monochrome-hue" type="range" min="0" max="360" value="0" style="inline-size: 100%; line-height: 3;" />
	</fieldset>
	<fieldset>
		<label for="input-raven-lightness" class=" [ delta ] ">Raven Lightness</label>
		<input id="input-raven-lightness" type="range" min="0" max="100" value="61" style="inline-size: 100%; line-height: 3;" />
	</fieldset>
	<fieldset>
		<label for="input-raven-chroma" class=" [ delta ] ">Raven Chroma</label>
		<input id="input-raven-chroma" type="range" min="0" max="0.4" value="0.06" step="0.01" style="inline-size: 100%; line-height: 3;" />
	</fieldset>
	<fieldset style="grid-column: 1 / -1;">
		<label for="input-raven-hue" class=" [ delta ] ">Raven Hue</label>
		<input id="input-raven-hue" type="range" min="0" max="360" value="238" style="inline-size: 100%; line-height: 3;" />
	</fieldset>
</form>
<figure>
    <ul id="output-palette" class=" [ palette  thirds ] [ output-palette ] ">
        <li class=" [ background--raven ] " style="flex: 1 0 100%;">
            <div class=" [ delta ] ">Raven</div>
        </li>
        <li class=" [ background--thunder ] ">
            <div class=" [ delta ] ">Thunder</div>
        </li>
        <li class=" [ background--snowy ] ">
            <div class=" [ delta ] ">Snowy</div>
        </li>
        <li class=" [ background--mineshaft ] ">
            <div class=" [ delta ] ">Mineshaft</div>
        </li>
        <li class=" [ background--kaiser ] ">
            <div class=" [ delta ] ">Kaiser</div>
        </li>
        <li class=" [ background--nickel ] ">
            <div class=" [ delta ] ">Nickel</div>
        </li>
        <li class=" [ background--yeti ] ">
            <div class=" [ delta ] ">Yeti</div>
        </li>
        <li class=" [ background--lynx ] ">
            <div class=" [ delta ] ">Lynx</div>
        </li>
        <li class=" [ background--wolf ] ">
            <div class=" [ delta ] ">Wolf</div>
        </li>
        <li class=" [ background--bowhead ] ">
            <div class=" [ delta ] ">Bowhead</div>
        </li>
        <li class=" [ background--highland ] ">
            <div class=" [ delta ] ">Highland</div>
        </li>
        <li class=" [ background--coyote ] ">
            <div class=" [ delta ] ">Coyote</div>
        </li>
        <li class=" [ background--bear ] ">
            <div class=" [ delta ] ">Bear</div>
        </li>
    </ul>
</figure>

### Opacity vs. Transparency

I also have a set of defined opacities that I use with the `opacity` property throughout my CSS:

```css
--mostly-opaque: 90%;
--barely-opaque: 10%;

opacity: var(--barely-opaque);
```

The first instinct here might be to generate even more CSS variables for every combination of colour and opacity that I have defined, but we can actually use `color-mix()` once again to reuse the CSS variables that we already have:

```css
--mostly-opaque: 90%;
--barely-opaque: 10%;

background-color: color-mix(in oklab, var(--color-thunder), transparent calc(100% - var(--mostly-opaque)));
```

You’ll notice that I’m using `calc()` at the end to invert the opacity variable. This is because opacity and transparency are opposites; if something is *opaque*, it is *not transparent*! (*Deep facepalm* when I finally realised this.) So when we say we want something to be `90%` opaque, it's the same as saying we want it to be `10%` transparent, which the `calc()` function achieves for us.

<noscript><p class=" [ box  box--error ] ">Unfortunately, this demo requires JavaScript to function correctly!</p></noscript>
<form id="demo-opacity" class=" [ grid ] ">
	<fieldset style="grid-column: 1 / -1;">
		<label for="input-opacity" class=" [ delta ] ">Opacity</label>
		<input id="input-opacity" type="range" min="0" max="100" value="25" style="inline-size: 100%; line-height: 3;" />
	</fieldset>
</form>
<div id="output-opacity" class="output-color  output-opacity"></div>

## Taking this further

I can’t overstate how much clearer **HSL** and **OKLCH** colour formats are to read and author compared to **Hex** and **RGB**. Unless you’re using a CSS preprocessor (like SCSS), it can be laborious to calculate combinations of colours or create tints, particularly if the colours in your palette ever change.

Colour formats like **HSL** and **OKLCH** give us much more intuitive understanding of the nature of a given colour, and the ways to manipulate and create variations of those colours

I hope you found this useful, and I’d love to know how others are doing this sort of things or what kind of pitfalls I might run into using this technique!

{% css %}
@layer pages {
    .palette li {
        flex-grow: 0;
        white-space: normal;
    }
    .output-color {
        block-size: 4rem;
    }
    .output-opacity {
        background-image: url("/images/built/annoying-navigation-css.png");
        background-size: cover;
        background-position: center;
        position: relative;
    }
    .output-opacity::before {
        content: "";
        background-color: color-mix(in oklab, var(--color-thunder), transparent calc(100% - var(--output-opacity, 75%)));
        inline-size: 50%;
        block-size: 100%;
        position: absolute;
        inset-block-start: 0;
        inset-inline-start: 0;
    }
    .rgb-hue-gradient,
    .oklch-hue-gradient {
        inline-size: min(14em, 66vmin);
        block-size: min(14em, 66vmin);
        float: right;
        margin-inline-start: var(--size-medium);
        margin-block-end: var(--size-small);
        border-radius: 50%;
        border-width: 0;
    }
    .rgb-hue-gradient {
        background-image:
            radial-gradient(circle at center, #000000 0, #000000 43%, transparent 44%, transparent),
            conic-gradient(#ff1a1a, #ffff1a, #1aff1a, #1affff, #1a1aff, #ff1aff, #ff1a1a);
    }
    .oklch-hue-gradient {
        background-image:
            radial-gradient(circle at center, #000000 0, #000000 43%, transparent 44%, transparent),
            conic-gradient(oklch(65% 65% 0), oklch(75% 40% 60), oklch(90% 50% 120), oklch(90% 35% 180), oklch(70% 40% 240), oklch(55% 70% 300), oklch(65% 65% 0));
    }
    .rgb-saturation-gradient,
    .rgb-lightness-gradient,
    .hsl-ugly-gradient,
    .hsl-lightness-block,
    .oklch-lightness-gradient,
    .oklch-chroma-gradient {
        inline-size: 6rem;
        block-size: min(14em, 66vmin);
        float: right;
        margin-inline-start: var(--size-medium);
        margin-block-end: var(--size-small);
    }
    .rgb-saturation-gradient {
        background-image:
            linear-gradient(to bottom, hsl(204 0% 50%), hsl(204 100% 50%));
    }
    .rgb-lightness-gradient {
        background-image:
            linear-gradient(to bottom, hsl(204 100% 0%), hsl(204 100% 50%), hsl(204 100% 100%));
    }
    .hsl-lightness-block {
        background-image:
            linear-gradient(to bottom right, hsl(180 100% 50%), hsl(180 100% 50%) 49.5%, hsl(240 100% 50%) 50.25%, hsl(240 100% 50%));
    }
    .hsl-ugly-gradient {
        background-image:
            linear-gradient(to bottom, hsl(0 100% 50%), hsl(180 100% 50%));
        position: relative;
    }
    .hsl-ugly-gradient::before {
        content: "";
        background-image:
            linear-gradient(to bottom, hsl(0 3% 50%), hsl(188 3% 50%));
        inline-size: 4rem;
        block-size: 4rem;
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 2px 4px black, inset 0 0 4px black;
        display: block;
        position: absolute;
        inset-block-start: 50%;
        inset-inline-start: 50%;
        transform: translateX(-50%) translateY(-50%);
    }
    .oklch-lightness-gradient {
        background-image:
            linear-gradient(to bottom, oklch(0% 0.4 237.73), oklch(100% 0.4 237.73));
    }
    .oklch-chroma-gradient {
        background-image:
            linear-gradient(to bottom, oklch(61.29% 0 237.73), oklch(61.29% 0.4 237.73));
    }
    .output-palette {
        --color-snowy: oklch(var(--snowy-lightness) var(--monochrome-chroma) var(--monochrome-hue));
        --color-thunder: oklch(var(--thunder-lightness) var(--monochrome-chroma) var(--monochrome-hue));
        --color-mineshaft: color-mix(in oklab, var(--color-snowy), var(--color-thunder) 83.6%);
        --color-kaiser: color-mix(in oklab, var(--color-snowy), var(--color-thunder) 66.6%);
        --color-nickel: color-mix(in oklab, var(--color-snowy), var(--color-thunder) 51.8%);
        --color-yeti: color-mix(in oklab, var(--color-snowy), var(--color-thunder) 10.2%);
        --color-raven: oklch(var(--raven-lightness) var(--raven-chroma) var(--raven-hue));
        --color-lynx: color-mix(in oklab, var(--color-raven), var(--color-thunder) 75%);
        --color-wolf: color-mix(in oklab, var(--color-raven), var(--color-thunder) 54%);
        --color-bowhead: color-mix(in oklab, var(--color-raven), var(--color-thunder) 33%);
        --color-highland: color-mix(in oklab, var(--color-raven), var(--color-snowy) 33%);
        --color-coyote: color-mix(in oklab, var(--color-raven), var(--color-snowy) 54%);
        --color-bear: color-mix(in oklab, var(--color-raven), var(--color-snowy) 75%);
    }
}
{% endcss %}

<script>
;(async () => {
    "use strict"

    const inputRed = document.getElementById("input-hex-red")
    const inputGreen = document.getElementById("input-hex-green")
    const inputBlue = document.getElementById("input-hex-blue")
    const outputHex = document.getElementById("output-hex")

    const setHex = () => {
        console.log("hex")
        outputHex.setAttribute("style", `background-color: rgb(${inputRed.value}, ${inputGreen.value}, ${inputBlue.value});`)
    }

    await [inputRed, inputGreen, inputBlue].forEach((input) => {
        input.addEventListener("change", setHex)
        input.addEventListener("input", setHex)
        input.addEventListener("touchstart", setHex)
        input.addEventListener("touchmove", setHex)
        input.addEventListener("touchend", setHex)
    })

    const inputHue = document.getElementById("input-hsl-hue")
    const inputSaturation = document.getElementById("input-hsl-saturation")
    const inputLightness = document.getElementById("input-hsl-lightness")
    const outputHSL = document.getElementById("output-hsl")

    const setHSL = () => {
        outputHSL.setAttribute("style", `background-color: hsl(${inputHue.value} ${inputSaturation.value}% ${inputLightness.value}%);`)
    }

    await [inputHue, inputSaturation, inputLightness].forEach((input) => {
        input.addEventListener("change", setHSL)
        input.addEventListener("input", setHSL)
        input.addEventListener("touchstart", setHSL)
        input.addEventListener("touchmove", setHSL)
        input.addEventListener("touchend", setHSL)
    })

    const inputL = document.getElementById("input-oklch-lightness")
    const inputC = document.getElementById("input-oklch-chroma")
    const inputH = document.getElementById("input-oklch-hue")
    const outputOKLCH = document.getElementById("output-oklch")

    const setOKLCH = () => {
        outputOKLCH.setAttribute("style", `background-color: oklch(${inputL.value}% ${inputC.value} ${inputH.value});`)
    }

    await [inputL, inputC, inputH].forEach((input) => {
        input.addEventListener("change", setOKLCH)
        input.addEventListener("input", setOKLCH)
        input.addEventListener("touchstart", setOKLCH)
        input.addEventListener("touchmove", setOKLCH)
        input.addEventListener("touchend", setOKLCH)
    })

    const inputOpacity = document.getElementById("input-opacity")
    const outputOpacity = document.getElementById("output-opacity")

    const setOpacity = () => {
        outputOpacity.setAttribute("style", `--output-opacity: ${inputOpacity.value}%;`)
    }

    await [inputOpacity].forEach((input) => {
        input.addEventListener("change", setOpacity)
        input.addEventListener("input", setOpacity)
        input.addEventListener("touchstart", setOpacity)
        input.addEventListener("touchmove", setOpacity)
        input.addEventListener("touchend", setOpacity)
    })

    const inputSnowyLightness = document.getElementById("input-snowy-lightness")
    const inputThunderLightness = document.getElementById("input-thunder-lightness")
    const inputMonochromeChroma = document.getElementById("input-monochrome-chroma")
    const inputMonochromeHue = document.getElementById("input-monochrome-hue")
    const inputRavenLightness = document.getElementById("input-raven-lightness")
    const inputRavenChroma = document.getElementById("input-raven-chroma")
    const inputRavenHue = document.getElementById("input-raven-hue")
    const outputPalette = document.getElementById("output-palette")

    const setPalette = () => {
        outputPalette.setAttribute("style", `--snowy-lightness: ${inputSnowyLightness.value}%; --thunder-lightness: ${inputThunderLightness.value}%; --monochrome-chroma: ${inputMonochromeChroma.value}; --monochrome-hue: ${inputMonochromeHue.value}; --raven-lightness: ${inputRavenLightness.value}%; --raven-chroma: ${inputRavenChroma.value}; --raven-hue: ${inputRavenHue.value};`)
    }

    await [inputSnowyLightness, inputThunderLightness, inputMonochromeChroma, inputMonochromeHue, inputRavenLightness, inputRavenChroma, inputRavenHue].forEach((input) => {
        input.addEventListener("change", setPalette)
        input.addEventListener("input", setPalette)
        input.addEventListener("touchstart", setPalette)
        input.addEventListener("touchmove", setPalette)
        input.addEventListener("touchend", setPalette)
    })
})()
</script>
