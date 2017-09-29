---
categories: article

date: 2016-03-23 18:22:00

title: Shoot for the Moon
lede: Don’t be half-minded when dealing with fractions and pixels. How can we ensure all browsers interpret fractions in our CSS equally?
tags:
- css
- tutorials

banner:
- shoot-for-the-moon@2x.jpg
- shoot-for-the-moon.jpg
banner_mobile:
- shoot-for-the-moon_mobile@2x.jpg
- shoot-for-the-moon_mobile.jpg

codepen: true
shorturl: uanoe

syndication:
- https://twitter.com/iamchrisburnell/status/712709693878173697

further_reading:
- url: "http://cruft.io/posts/percentage-calculations-in-ie/"
  title: "Browser Rounding and Fractional Pixels"
- url: "http://ejohn.org/blog/sub-pixel-problems-in-css/"
  title: "Sub-Pixel Problems in CSS"
- url: "http://www.guyroutledge.co.uk/blog/reduce-sub-pixel-rendering-with-sass/"
  title: "Reduce sub-pixel rendering issues with Sass functions"
- url: "https://www.smashingmagazine.com/2012/04/a-closer-look-at-font-rendering/"
  title: "A Closer Look At Font Rendering"
---


As CSS changes and morphs over time, we must not forget that legacy browsers remain unchanged; one *gotcha* that a legacy browser might snipe you with, if left unattended, is **decimals**.

A confusing subject for the uninitiated (myself included), decimals in CSS behave in a way that might not be straightforward to some, especially when you consider the variety of browsers and their individual behaviours.


{% include content/heading.html title='A Bit of Prerequisite Information' id='prerequisite-information' %}

It’s probably worth refreshing yourself on the various rounding methods used in CSS in various browsers. [Alex Kilgour](https://github.com/howlingmad/){:rel="external"} wrote an excellent article on the subject, [Browser Rounding and Fractional Pixels](http://cruft.io/posts/percentage-calculations-in-ie/){:rel="external"}, that’s more than worth reading through and bookmarking, if only for his [concise table of rounding methods](http://cruft.io/posts/percentage-calculations-in-ie/#browser-table){:rel="external"} used by browsers and when they’re used. I’ve summarised these different rounding methods below, but I still recommend checking out Alex’s article.

<dl>
    <dt>truncate to <em>x</em> decimals</dt>
    <dd>
        Strips all but the first <em>x</em> characters after the decimal.<br>
        <em>Let x = 2</em><br>
        <code>12.3456%</code> → <code>12.34%</code>
    </dd>
    <dt>round to <em>x</em> decimals</dt>
    <dd>
        Rounds the figure to <em>x</em> decimals.<br>
        <em>Let x = 2</em><br>
        <code>12.3456%</code> → <code>12.35%</code>
    </dd>
    <dt>nearest integer</dt>
    <dd>
        Same as <q>round to <em>x</em> decimals</q> but rounds to the nearest integer (whole number).<br>
        <code>12.3456%</code> → <code>12%</code><br>
        <code>12.5000%</code> → <code>13%</code>
    </dd>
    <dt>down</dt>
    <dd>
        Same as <q>nearest integer</q> but always rounds <em>down</em> to the nearest integer.<br>
        <code>12.3456%</code> → <code>12%</code><br>
        <code>12.9999%</code> → <code>12%</code>
    </dd>
    <dt>sub-pixel rendering</dt>
    <dd>
        This is the most complicated of the different methods of dealing with decimals in CSS. I will freely admit I know very little about what’s going on with <em>sub-pixel rendering</em>, but have drawn up a quick demo to show a little bit about how it works.
    </dd>
</dl>

{% include content/codepen.html slug='ONmxEB' height='250' %}

While the `width` of each box in the above demo is technically `133.3333px`, *sub-pixel rendering* comes into play, and its behaviour might be surprising. You might expect that the `width` of each box would be rounded individually, creating three `133px`-wide boxes, leaving *one* extra pixel of the full `400px`-wide `.parent` unaccounted for.

However, what is happening, as far as I can tell, is that the browser creates a tally of the leftover `0.3333px` from each of the three boxes and adds that *one* extra pixel of `width` to *one* of the three boxes. The exact mechanics of how this happens are a bit of a mystery to me *(why does the middle box receive the extra pixel?)*, but the outcome makes some rhyme and reason.

But let’s not concern ourselves with the mechanics of *sub-pixel rendering* for now, and just focus on legacy browsers that employ the less accurate methods of CSS rounding, such as <q>down</q> or <q>nearest integer.</q>


{% include content/heading.html title='An Example' %}

Let’s look at an example where we’re setting a *percentage*-based value that includes decimals. *Please ignore the glaringly obvious magic number in this example!*

{% highlight css %}
.parent {
    width: 1337px;
}
.child {
    width: 60.029%;
}
{% endhighlight %}

- `.parent` `width` is set to `1337px`
- `.child` `width` is set to `60.029%`, as our target `width` is `803px`
- `1337px &divide; 100 &times; 60.029 = 802.58773px`

Modern browsers will utilise *sub-pixel rendering* to render a *pixel* value containing decimals; however, older browsers, like *IE8*, will **truncate** the *percentage*-based value to only **two** decimal places! This spells trouble in our particular case:

`1337px &divide; 100 &times; 60.02 = 802.4674px`

Even the above value is rounded to the wrong target value by a modern browser.

Due to [discrepancies between browsers](http://cruft.io/posts/percentage-calculations-in-ie/#browser-table){:rel="external"}, we can’t be sure whether a value will receive *sub-pixel rendering*, be truncated, be rounded to the nearest integer, or even be rounded *down* (floored) to the nearest integer!

<aside>
    <p>Let’s not get into viewport units (<code>vw</code>, <code>vh</code>, <code>vmin</code>, <code>vmax</code>, etc.). That’s a whole other beast.</p>
</aside>

As a result, more often than not, I recommend **overshooting** your target value with your fraction, whether it be a *percentage*, *em*, or *rem* <q>fraction</q>. The reason for overshooting is such that any browser’s method of rounding decimals will achieve your target value.


{% include content/heading.html title='Brass Tacks' %}

So let’s use the running example, and modify it to match these conditions and ensure that, no matter the rounding method used by the browser, the end-result *pixel* value is consistent.

{% highlight css %}
.parent {
    width: 1337px;
}
.child {
    width: 60.06%;
}
{% endhighlight %}

- `.parent` `width` is set to `1337px`
- `.child` `width` is set to `60.06%`
- `1337px &divide; 100 &times; 60.06 = 803.0022px`

Because the worst truncation that will occur is to `2` decimal places, our value of `60.06%` will satisfy each rounding method, and our target value of `803px` will be achieved cross-browser.

It’s also worth noting that a *percentage*-based value of `60.059%`, ever-so-slightly *less* than `60.06%`, will result in a computed value of `802.9888px`. This satisfies *almost* every method of rounding, but it still fails when rounding <q>down.</q> By making sure our computed value **overshoots** the target value, that is to say that the decimal value is *slightly* greater than the integer value, we satisfy the conditions to round <q>down</q> to our target value.


{% include content/heading.html title='The Takeaway' id='tldr' %}

> When creating fractions resulting in decimals in CSS, make sure that your computed value overshoots your target value if you have to support legacy browsers.
