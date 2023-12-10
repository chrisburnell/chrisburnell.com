---
draft: true
date: 2023-12-11T12:00:00+0000
title: Can you teach an old design system new colours?
description: Over the years, I’ve changed the colours used across my website a number of times, and I’m happy with what I have now, but what I’m going to talk about today are <em>formats</em> for defining colours and some recent <q>behind-the-scenes</q> changes I made to how I define colours to making theming my website easier.
tags:
  - color
  - css
  - css-variables
  - design-systems
css: styleguide.css
wide: true
---

Over the years, I’ve changed the colours used on my website a number of times, but I think I’m mostly settled on what I have now—besides the [themes](#theme-toggler) available in the footer. But what I’m going to talk about today has to do with the most recent <q>behind-the-scenes</q> changes I made to the way the colours are defined.

## Hexidecimal / RGB

<figure>
    <ul class="[ palette ]">
        <li style="background-color: #5f8aa6; color: #060606;">
            <div class=" [ delta ] ">Raven</div>
            <div style="font-size: var(--font-size-small-min)" class="monospace">#5f8aa6</div>
        </li>
        <li style="background-color: #060606; color: #f9f9f9;">
            <div class=" [ delta ] ">Thunder</div>
            <div style="font-size: var(--font-size-small-min)" class="monospace">#060606</div>
        </li>
        <li style="background-color: #f9f9f9; color: #060606;">
            <div class=" [ delta ] ">Snowy</div>
            <div style="font-size: var(--font-size-small-min)" class="monospace">#f9f9f9</div>
        </li>
    </ul>
</figure>

For many years, my colours were defined in Hexidecimal format, or *Hex* as it’s commonly-known as, which maps to the <abbr title="Red, Green, Blue">RGB</abbr> colour model. This was essentially the de facto way of defining colours back in 2008.

But when it comes to *reading* and *understanding* Hex/RGB colours, it’s a bit more tricky.

<noscript><p class=" [ box  box--error ] ">Unfortunately, this demo requires JavaScript to function correctly!</p></noscript>
<form id="demo-hex" class=" [ grid ] " style="--placement: auto-fit; --min-inline-size: 6rem;">
	<fieldset>
		<label for="input-hex-red" class=" [ delta ] ">Red</label>
		<input id="input-hex-red" type="range" min="0" max="255" value="255" style="inline-size: 100%; line-height: 3;" />
	</fieldset>
	<fieldset>
		<label for="input-hex-green" class=" [ delta ] ">Green</label>
		<input id="input-hex-green" type="range" min="0" max="255" value="0" style="inline-size: 100%; line-height: 3;" />
	</fieldset>
	<fieldset>
		<label for="input-hex-blue" class=" [ delta ] ">Blue</label>
		<input id="input-hex-blue" type="range" min="0" max="255" value="0" style="inline-size: 100%; line-height: 3;" />
	</fieldset>
</form>
<div id="output-hex" class="output-color" style="background-color: rgb(255, 0, 0);"></div>

RGB is an additive colour format. This means that, starting from black, we combine **r**ed, **g**reen, and **b**lue together to create a colour, and the syntax we use when coding to define Hex/RGB colours follows this format: we have to provide a red, green, and blue value.

While I didn’t know the grass could be greener at the time, this syntax comes with some comprehension and composition difficulties. Not only do the RGB values represent the *ratio* between the three primary colours, but they also represent the *lightness* of the produced colour.

When reading a Hex or RGB colour in some CSS—in the days when code editors didn’t show you previews of your colours alongside your code—it was difficult to get a clear idea of what the resulting colour might be, just based on the syntax alone. You might have had an idea if it was *certainly* more red than green and blue, or if it was *certainly* on the brighter end than darker, but it wasn’t clear.

It’s not immediately obvious to me how to make *orange*, for example. Or I’ll notice other things which are *intriguing*, like how full red, full green, and zero blue produces yellow, and then as you increase the amount of blue you realise you’re changing the colour towards white—it doesn’t feel intuitive to me that increasing the amount of blue, given the colour yellow, ends up with white.

That’s all not to say that Hex and RGB don’t work. It served me extremely well (for a long time!), and I would even say that this <q>limitation</q> of Hex/RGB for programmers spawned so many amazing web-based colour pickers, palette generators, and other tools to help web developers understand and use Hex/RGB in our websites.

## HSL

<figure>
    <ul class="[ palette ]">
        <li style="background-color: hsl(204 29% 51%); color: hsl(0 0% 2%);">
            <div class=" [ delta ] ">Raven</div>
            <div style="font-size: var(--font-size-small-min)" class="monospace">hsl(204 29% 51%)</div>
        </li>
        <li style="background-color: hsl(0 0% 2%); color: hsl(0 0% 98%);">
            <div class=" [ delta ] ">Thunder</div>
            <div style="font-size: var(--font-size-small-min)" class="monospace">hsl(0 0% 2%)</div>
        </li>
        <li style="background-color: hsl(0 0% 98%); color: hsl(0 0% 2%);">
            <div class=" [ delta ] ">Snowy</div>
            <div style="font-size: var(--font-size-small-min)" class="monospace">hsl(0 0% 98%)</div>
        </li>
    </ul>
</figure>

Enter <abbr class=" [ strong ] " title="Hue, Saturation, Lightness">HSL</abbr>. Coming from the world of Hex/RGB, it was immediately more-readable to me, where the values in the HSL syntax tell us: which direction in the colour wheel to point; how saturated (how *much*) of that colour we want, and the lightness of the produced colour.

It’s important to know that HSL uses the same RGB colour space as Hex, it just provides different parameters from Hex/RGB for us as developers to achieve the same colours we could with Hex and RGB.

<noscript><p class=" [ box  box--error ] ">Unfortunately, this demo requires JavaScript to function correctly!</p></noscript>
<form id="demo-hsl" class=" [ grid ] " style="--placement: auto-fit; --min-inline-size: 6rem;">
	<fieldset>
		<label for="input-hsl-hue" class=" [ delta ] ">Hue</label>
		<input id="input-hsl-hue" type="range" min="0" max="360" value="0" style="inline-size: 100%; line-height: 3;" />
	</fieldset>
	<fieldset>
		<label for="input-hsl-saturation" class=" [ delta ] ">Saturation</label>
		<input id="input-hsl-saturation" type="range" min="0" max="100" value="100" style="inline-size: 100%; line-height: 3;" />
	</fieldset>
	<fieldset>
		<label for="input-hsl-lightness" class=" [ delta ] ">Lightness</label>
		<input id="input-hsl-lightness" type="range" min="0" max="100" value="50" style="inline-size: 100%; line-height: 3;" />
	</fieldset>
</form>
<div id="output-hsl" class="output-color" style="background-color: hsl(0 100% 50%);"></div>

### Hue

<div class="rgb-hue-gradient"></div>

The trickiest part for me is knowing what the first value, **Hue**, represents as we spin 360° around the circle.

Try setting the **Saturation** to 100% and **Lightness** to 50%, and then cycling through the values for **Hue**, from 0° to 360°. This will give you an idea of what colours look like in their most saturated and untinted/unshaded form.

### Saturation

<div class="rgb-saturation-gradient"></div>

Next is **Saturation** which dictates <q>how much</q> of our given **Hue** we want.

With any **Hue**, try setting the **Lightness** to 50%, and then cycling through the values for **Saturation**, from 0% to 100%. This will give you an idea of how the amount of **Saturation** we apply to **Hue** dictates how far away from being completely-greyscale we make the colour. You’ll also notice that when the **Saturation** is at 0%, it doesn’t matter what the **Hue** is anymore—given the same **Lightness**, an unsaturated Red **Hue** and an unsaturated Cyan **Hue** appear the same.

### Lightness

<div class="rgb-lightness-gradient"></div>

The easiest way for me to understand the **Lightness** value is to think of it like a slide between black and white. The midpoint at 50% mixes your colour with both black and white (so a grey colour that is perfectly between black and white). As you deviate away from the midpoint, your colour is mixed with either more black and less white (as **Lightness** decreases) or more white and less black (as **Lightness** increases), reaching a point of being pure black at 0% and pure white at 100%.

You can see this effect no matter what the **Hue** and **Saturation** values are.

## Problems with the RGB colour space

### Inconsistent perceived lightness

<div class="hsl-lightness-block"></div>

While one of the parameters of an HSL colour is **Lightness**, you’ll find that there is a stark contrast in how we perceive the brightness of **Hues** around the wheel.

These two colours, cyan and blue, both have identical **Saturation** and **Lightness** values—only their **Hues** differ—but despite this we perceive the cyan as being much brighter than the blue. We can account for this, but an ideal colour space would provide consistency in its parameters.

### Dead grey zones

<div class="hsl-ugly-gradient"></div>

A clear example of this is in displaying gradients; when instructing the browser to traverse the colour space to find a line between two colours that will make up the gradient, you’ll often find that it takes a path that you don’t expect or want. It’s not uncommon to find that developers have created gradients that don’t simply traverse from point A to point B in the colour space; they provide additional colour stops to ensure that the gradient looks correct.

In the example, I’ve instructed the browser to create a gradient between red and cyan, but you’ll notice that it goes through a grey/monochrome area of the colour space around the midpoint. I would hope that the produced gradient would tween between not just the hues of red and cyan, but also their lightness and saturation. It seems, however, that the path taken to draw gradients often goes through parts of the RGB colour space that have little or no saturation, leading to [dead grey zones](https://www.smashingmagazine.com/2023/08/oklch-color-spaces-gamuts-css/#dead-grey-zones).

## OKLCH

<figure>
    <ul class="[ palette ]">
        <li style="background-color: oklch(61.3% 0.0638 236.14); color: oklch(15% 0 0);">
            <div class=" [ delta ] ">Raven</div>
            <div style="font-size: var(--font-size-small-min)" class="monospace">oklch(61.3% 0.0638 236.14)</div>
        </li>
        <li style="background-color: oklch(15% 0 0); color: oklch(98.2% 0 0);">
            <div class=" [ delta ] ">Thunder</div>
            <div style="font-size: var(--font-size-small-min)" class="monospace">oklch(15% 0 0)</div>
        </li>
        <li style="background-color: oklch(98.2% 0 0); color: oklch(15% 0 0);">
            <div class=" [ delta ] ">Snowy</div>
            <div style="font-size: var(--font-size-small-min)" class="monospace">oklch(98.2% 0 0)</div>
        </li>
    </ul>
</figure>

And finally, my current colour format of choice: **OKLCH**.

<c-details>
    <summary>Browser Support</summary>
    {% browserSupport 'mdn-css_types_color_oklch' %}
</c-details>

<noscript><p class=" [ box  box--error ] ">Unfortunately, this demo requires JavaScript to function correctly!</p></noscript>
<form id="demo-oklch" class=" [ grid ] " style="--placement: auto-fit; --min-inline-size: 6rem;">
	<fieldset>
		<label for="input-oklch-lightness" class=" [ delta ] ">Lightness</label>
		<input id="input-oklch-lightness" type="range" min="0" max="100" value="63" style="inline-size: 100%; line-height: 3;" />
	</fieldset>
	<fieldset>
		<label for="input-oklch-chroma" class=" [ delta ] ">Chroma</label>
		<input id="input-oklch-chroma" type="range" min="0" max="0.4" value="0.26" step="0.01" style="inline-size: 100%; line-height: 3;" />
	</fieldset>
	<fieldset>
		<label for="input-oklch-hue" class=" [ delta ] ">Hue</label>
		<input id="input-oklch-hue" type="range" min="0" max="360" value="29" style="inline-size: 100%; line-height: 3;" />
	</fieldset>
</form>
<div id="output-oklch" class="output-color" style="background-color: oklch(63% 0.26 29);"></div>

### Lightness

<div class="oklch-lightness-gradient"></div>

This functions similarly to the HSL **Lightness** value in that it mixes your colour with different levels of black and white.

You can see this effect no matter what the **Chroma** and **Hue** values are.

### Chroma

<div class="oklch-chroma-gradient"></div>

**Chroma** is similar, again, to HSL’s **Saturation**; it dictates <q>how much</q> of our given **Hue** we want. What differs from HSL’s **Saturation** is that even when the **Lightness** is zero, we still get some colour, depending on how much **Chroma** we apply. So in this colour space, greyscale colours, including black and white, require that the **Chroma** value be 0.

You’ll also notice that, like with HSL’s **Saturation**, when the **Chroma** is at 0%, it doesn’t matter what the **Hue** is anymore—given the same **Lightness** values and zero **Chroma**, changing **Hue** no longer affects the produced colour.

### Hue

<div class="oklch-hue-gradient"></div>

This functions very much the same as HSL’s **Hue**, but the values don’t line up exactly the same. This is because unlike Hex and HSL, OKLCH operates in a different colour space and actually makes available (to supporting browsers and devices) even more colours than were available in the RGB colour space.

Try setting the **Lightness** to 50% and the **Chroma** to 100%, and then cycling through the values for **Hue**, from 0° to 360°. This will give you an idea of what colours look like in their most saturated and untinted/unshaded form.

## Colours in practice

This all came about when I decided that I wanted to add a *Sepia* theme to my website (check out the [theme toggler in the footer!](#theme-toggler)), but I didn't have a simple and clean way to go about it. What I wanted was a way to slightly-tint all the colours on my website into the sepia range.

Until recently, I had defined my colours manually, like this:

```css
--color-raven: oklch(61.3% -0.034 -0.054);
--color-thunder: oklch(12.2% 0 0);
--color-snowy: oklch(98.2% 0 0);
--color-mineshaft: oklch(28.9% 0 0);
--color-yeti: oklch(89.8% 0 0);
--color-lynx: oklch(17.6% -0.01 -0.014);
--color-bear: oklch(96% -0.006 -0.01);
...
```

So building a theme where all of the colours are tinted sepia meant redefining each of the CSS Variables I had already defined for the default (non-sepia) theme.

That’s where the incredible new CSS function, `color-mix()`, comes in! Using it, I’ve been able to boil down my 13-colour palette into 3 core colours and 10 variations of those colours. The first step is to set up some initial variables to use for building out the `--color-` variables. These are the variables that we’ll later use to change themes, including our desired **Sepia** theme.

```css
--snowy-lightness: 98.2%;
--thunder-lightness: 15%;
--monochrome-chroma: 0;
--monochrome-hue: 0;

--raven-lightness: 61.3%;
--raven-chroma: 0.0638;
--raven-hue: 236.14;
```

Next, we’ll build out the 13 colours in the palette using the above variables:

```css
--color-snowy: oklch(var(--snowy-lightness) var(--monochrome-chroma) var(--monochrome-hue));
--color-thunder: oklch(var(--thunder-lightness) var(--monochrome-chroma) var(--monochrome-hue));

--color-mineshaft: color-mix(in oklab, var(--color-snowy), var(--color-thunder) 83.6%);
--color-kaiser: color-mix(in oklab, var(--color-snowy), var(--color-thunder) 66.6%);
--color-nickel: color-mix(in oklab, var(--color-snowy), var(--color-thunder) 51.8%);
--color-yeti: color-mix(in oklab, var(--color-snowy), var(--color-thunder) 10.2%);

--color-raven: oklch(var(--raven-lightness) var(--raven-chroma) var(--raven-hue));

--color-lynx: color-mix(in oklab, var(--color-raven), var(--color-thunder) 86%);
--color-wolf: color-mix(in oklab, var(--color-raven), var(--color-thunder) 62%);
--color-bowhead: color-mix(in oklab, var(--color-raven), var(--color-thunder) 38%);
--color-highland: color-mix(in oklab, var(--color-raven), var(--color-snowy) 38%);
--color-coyote: color-mix(in oklab, var(--color-raven), var(--color-snowy) 62%);
--color-bear: color-mix(in oklab, var(--color-raven), var(--color-snowy) 86%);
```

And with that, our 13-colour palette is complete—3 base colours and 10 variations thereof—all built in the browser based on 7 variables that I can use to redefine all 13 colours in the palette.

<figure>
    <ul class="[ palette ]" style="">
        <li style="background-color: oklch(61.3% 0.0638 236.14); color: oklch(15% 0 0); flex: 1 0 100%; padding-block: var(--size-medium);">
            <div class=" [ delta ] ">Raven</div>
            <div style="font-size: var(--font-size-small-min)" class="monospace">oklch(61.3% 0.0638 236.14)</div>
        </li>
        <li style="background-color: oklch(15% 0 0); color: oklch(98.2% 0 0); flex: 1 0 100%; padding-block: var(--size-medium);">
            <div class=" [ delta ] ">Thunder</div>
            <div style="font-size: var(--font-size-small-min)" class="monospace">oklch(15% 0 0)</div>
        </li>
        <li style="background-color: oklch(98.2% 0 0); color: oklch(15% 0 0); flex: 1 0 100%; padding-block: var(--size-medium);">
            <div class=" [ delta ] ">Snowy</div>
            <div style="font-size: var(--font-size-small-min)" class="monospace">oklch(98.2% 0 0)</div>
        </li>
        <li style="background-color: color-mix(in oklab, oklch(98.2% 0 0), oklch(15% 0 0) 83.6%); color: oklch(98.2% 0 0);">
            <div class=" [ delta ] ">Mineshaft</div>
            <pre style="font-size: var(--font-size-small-min); text-align: start;" class="monospace">color-mix(<br>&#9;in oklab,<br>&#9;var(--color-snowy),<br>&#9;var(--color-thunder) 83.6%<br>)</pre>
        </li>
        <li style="background-color: color-mix(in oklab, oklch(98.2% 0 0), oklch(15% 0 0) 66.6%); color: oklch(98.2% 0 0);">
            <div class=" [ delta ] ">Kaiser</div>
            <pre style="font-size: var(--font-size-small-min); text-align: start;" class="monospace">color-mix(<br>&#9;in oklab,<br>&#9;var(--color-snowy),<br>&#9;var(--color-thunder) 66.6%<br>)</pre>
        </li>
        <li style="background-color: color-mix(in oklab, oklch(98.2% 0 0), oklch(15% 0 0) 51.8%); color: oklch(98.2% 0 0);">
            <div class=" [ delta ] ">Nickel</div>
            <pre style="font-size: var(--font-size-small-min); text-align: start;" class="monospace">color-mix(<br>&#9;in oklab,<br>&#9;var(--color-snowy),<br>&#9;var(--color-thunder) 51.8%<br>)</pre>
        </li>
        <li style="background-color: color-mix(in oklab, oklch(98.2% 0 0), oklch(15% 0 0) 10.2%); color: oklch(15% 0 0);">
            <div class=" [ delta ] ">Yeti</div>
            <pre style="font-size: var(--font-size-small-min); text-align: start;" class="monospace">color-mix(<br>&#9;in oklab,<br>&#9;var(--color-snowy),<br>&#9;var(--color-thunder) 10.2%<br>)</pre>
        </li>
        <li style="background-color: color-mix(in oklab, oklch(61.3% 0.0638 236.14), oklch(15% 0 0) 86%); color: oklch(98.2% 0 0);">
            <div class=" [ delta ] ">Lynx</div>
            <pre style="font-size: var(--font-size-small-min); text-align: start;" class="monospace">color-mix(<br>&#9;in oklab,<br>&#9;var(--color-raven),<br>&#9;var(--color-thunder) 86%<br>)</pre>
        </li>
        <li style="background-color: color-mix(in oklab, oklch(61.3% 0.0638 236.14), oklch(15% 0 0) 62%); color: oklch(98.2% 0 0);">
            <div class=" [ delta ] ">Wolf</div>
            <pre style="font-size: var(--font-size-small-min); text-align: start;" class="monospace">color-mix(<br>&#9;in oklab,<br>&#9;var(--color-raven),<br>&#9;var(--color-thunder) 62%<br>)</pre>
        </li>
        <li style="background-color: color-mix(in oklab, oklch(61.3% 0.0638 236.14), oklch(15% 0 0) 38%); color: oklch(98.2% 0 0);">
            <div class=" [ delta ] ">Bowhead</div>
            <pre style="font-size: var(--font-size-small-min); text-align: start;" class="monospace">color-mix(<br>&#9;in oklab,<br>&#9;var(--color-raven),<br>&#9;var(--color-thunder) 38%<br>)</pre>
        </li>
        <li style="background-color: color-mix(in oklab, oklch(61.3% 0.0638 236.14), oklch(98.2% 0 0) 38%); color: oklch(15% 0 0);">
            <div class=" [ delta ] ">Highland</div>
            <pre style="font-size: var(--font-size-small-min); text-align: start;" class="monospace">color-mix(<br>&#9;in oklab,<br>&#9;var(--color-raven),<br>&#9;var(--color-snowy) 38%<br>)</pre>
        </li>
        <li style="background-color: color-mix(in oklab, oklch(61.3% 0.0638 236.14), oklch(98.2% 0 0) 62%); color: oklch(15% 0 0);">
            <div class=" [ delta ] ">Coyote</div>
            <pre style="font-size: var(--font-size-small-min); text-align: start;" class="monospace">color-mix(<br>&#9;in oklab,<br>&#9;var(--color-raven),<br>&#9;var(--color-snowy) 62%<br>)</pre>
        </li>
        <li style="background-color: color-mix(in oklab, oklch(61.3% 0.0638 236.14), oklch(98.2% 0 0) 86%); color: oklch(15% 0 0);">
            <div class=" [ delta ] ">Bear</div>
            <pre style="font-size: var(--font-size-small-min); text-align: start;" class="monospace">color-mix(<br>&#9;in oklab,<br>&#9;var(--color-raven),<br>&#9;var(--color-snowy) 86%<br>)</pre>
        </li>
    </ul>
</figure>

<aside><p>Why am I mixing colours <code>in oklab</code>?</p><p>I prefer the way that <em>OKLab</em> mixes colours and traverses the colour space for gradients; although, I still much prefer the syntax of defining colours themselves using <em>OKLCH</em>.</p></aside>

### Applying a tint

Now, because the 13 colours in the palette are defined by a small number of variables, I can manipulate the entire palette by making a few small changes:

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

<figure>
    <ul class="[ palette ] [ sepia ] ">
        <li class="[ background--raven ]">
            <div class="[ delta ]">Raven</div>
        </li>
        <li class="[ background--thunder ]">
            <div class="[ delta ]">Thunder</div>
        </li>
        <li class="[ background--snowy ]">
            <div class="[ delta ]">Snowy</div>
        </li>
        <li class="[ background--mineshaft ]">
            <div class="[ delta ]">Mineshaft</div>
        </li>
        <li class="[ background--kaiser ]">
            <div class="[ delta ]">Kaiser</div>
        </li>
        <li class="[ background--nickel ]">
            <div class="[ delta ]">Nickel</div>
        </li>
        <li class="[ background--yeti ]">
            <div class="[ delta ]">Yeti</div>
        </li>
        <li class="[ background--lynx ]">
            <div class="[ delta ]">Lynx</div>
        </li>
        <li class="[ background--wolf ]">
            <div class="[ delta ]">Wolf</div>
        </li>
        <li class="[ background--bowhead ]">
            <div class="[ delta ]">Bowhead</div>
        </li>
        <li class="[ background--highland ]">
            <div class="[ delta ]">Highland</div>
        </li>
        <li class="[ background--coyote ]">
            <div class="[ delta ]">Coyote</div>
        </li>
        <li class="[ background--bear ]">
            <div class="[ delta ]">Bear</div>
        </li>
    </ul>
</figure>

This makes it easy to change the <q>theme</q> of my website just by manipulating the `raven`-based variables. Critically, you might notice that the perceived brightness of the colours between these themes look much more consistant than what the RGB colour space provided.

<figure>
    <ul class="[ palette ] [ koala ] ">
        <li class="[ background--raven ]">
            <div class="[ delta ]">Raven</div>
        </li>
        <li class="[ background--lynx ]">
            <div class="[ delta ]">Lynx</div>
        </li>
        <li class="[ background--wolf ]">
            <div class="[ delta ]">Wolf</div>
        </li>
        <li class="[ background--bowhead ]">
            <div class="[ delta ]">Bowhead</div>
        </li>
        <li class="[ background--highland ]">
            <div class="[ delta ]">Highland</div>
        </li>
        <li class="[ background--coyote ]">
            <div class="[ delta ]">Coyote</div>
        </li>
        <li class="[ background--bear ]">
            <div class="[ delta ]">Bear</div>
        </li>
    </ul>
</figure>

<figure>
    <ul class="[ palette ] [ code-red ] ">
        <li class="[ background--raven ]">
            <div class="[ delta ]">Raven</div>
        </li>
        <li class="[ background--lynx ]">
            <div class="[ delta ]">Lynx</div>
        </li>
        <li class="[ background--wolf ]">
            <div class="[ delta ]">Wolf</div>
        </li>
        <li class="[ background--bowhead ]">
            <div class="[ delta ]">Bowhead</div>
        </li>
        <li class="[ background--highland ]">
            <div class="[ delta ]">Highland</div>
        </li>
        <li class="[ background--coyote ]">
            <div class="[ delta ]">Coyote</div>
        </li>
        <li class="[ background--bear ]">
            <div class="[ delta ]">Bear</div>
        </li>
    </ul>
</figure>

## Taking this further

I won’t go into as much in-depth detail, but I’m applying an *Alpha* channel (opacity) to my colours like so:

```css
background-color: color-mix(in oklab, var(--color-raven), transparent 50%)
```

I hope you found this useful, and I’d love to know how others are doing this sort of things or what kind of pitfalls I might run into using this technique!




{% css %}
@layer pages {
    .palette li {
        padding: var(--size-small);
        flex-grow: 0;
        white-space: normal;
    }
    .output-color {
        block-size: 4rem;
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
            linear-gradient(to bottom, oklch(0% 0.4 236.14), oklch(100% 0.4 236.14));
    }
    .oklch-chroma-gradient {
        background-image:
            linear-gradient(to bottom, oklch(61.3% 0 236.14), oklch(61.3% 0.4 236.14));
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

	await [inputRed, inputGreen, inputBlue].forEach((input) => {
		input.addEventListener("change", () => {
			outputHex.setAttribute("style", `background-color: rgb(${inputRed.value}, ${inputGreen.value}, ${inputBlue.value});`)
		})
		input.addEventListener("input", () => {
			outputHex.setAttribute("style", `background-color: rgb(${inputRed.value}, ${inputGreen.value}, ${inputBlue.value});`)
		})
	})

	const inputHue = document.getElementById("input-hsl-hue")
	const inputSaturation = document.getElementById("input-hsl-saturation")
	const inputLightness = document.getElementById("input-hsl-lightness")
	const outputHSL = document.getElementById("output-hsl")

	await [inputHue, inputSaturation, inputLightness].forEach((input) => {
		input.addEventListener("change", () => {
			outputHSL.setAttribute("style", `background-color: hsl(${inputHue.value} ${inputSaturation.value}% ${inputLightness.value}%);`)
		})
		input.addEventListener("input", () => {
			outputHSL.setAttribute("style", `background-color: hsl(${inputHue.value} ${inputSaturation.value}% ${inputLightness.value}%);`)
		})
	})

	const inputL = document.getElementById("input-oklch-lightness")
	const inputC = document.getElementById("input-oklch-chroma")
	const inputH = document.getElementById("input-oklch-hue")
	const outputOKLCH = document.getElementById("output-oklch")

	await [inputL, inputC, inputH].forEach((input) => {
		input.addEventListener("change", () => {
			outputOKLCH.setAttribute("style", `background-color: oklch(${inputL.value}% ${inputC.value} ${inputH.value});`)
		})
		input.addEventListener("input", () => {
			outputOKLCH.setAttribute("style", `background-color: oklch(${inputL.value}% ${inputC.value} ${inputH.value});`)
		})
	})
})()
</script>
