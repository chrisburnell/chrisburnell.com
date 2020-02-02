---
date: 2019-03-04 13:10:40 +0000
title: Sparkline Sound-Off
lede: I have been following in the footsteps of Jeremy Keith for a few months now. Dotted around my website, now, are sparklines, representing my activity over time. As an added bonus, a little tune based on the sparkline's values plays when you click on it. With a moderate amount of musical theory under my belt, here's how I accomplished that audio delight.
tags:
  - canvas
  - javascript
  - music
further_reading:
  - link: https://beginnerguitarhq.com/pentatonic-scale
    title: "How to Play the Pentatonic Scale | Beginner Guitar HQ"
---

To suit my needs, I started with [Jeremy Keith’s Canvas-Sparkline](https://github.com/adactio/Canvas-Sparkline/blob/master/sparkline.js){:rel="external"} and made some modifications. I won’t go into detail about how the [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API){:rel="external"} or the [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API){:rel="external"}, but there are many resources available if you want a background.

--------

I’m using the same CSV to generate the audio as I am the sparkline itself. Each of the values in the array represent how many posts I made per week for the most recent 26 weeks (half a year).

{% highlight html %}
<canvas id="sparkline-demo-1" class="sparkline" width="160" height="24" data-values="0,0,0,0,0,0,0,0,4,0,0,4,9,1,4,5,2,4,2,6,4,6,4,6,5,0"></canvas>
{% endhighlight %}

Because this is really just a fun little easter egg as opposed to a perfect 1-to-1 representation of the data, I decided to map the values against a [major pentatonic scale](https://en.wikipedia.org/wiki/Pentatonic_scale){:rel="external"} which results in <q>music</q> that is a bit more pleasant to listen to, rather than unharmonious noise if I used a [chromatic scale](https://en.wikipedia.org/wiki/Chromatic_scale){:rel="external"}. If I was going for a perfect representation of the data, I would stick to a chromatic scale so that the difference between notes matches their difference in numerical value.

I’ve chosen **C<sub>4</sub>**, also known as [Middle C](https://en.wikipedia.org/wiki/C_(musical_note)){:rel="external"}, for my starting base notes which represent values of 0 in my data.

-------

Let’s pause and review a little background about musical notes and their relationship to the frequency of each note.

As an example, we’ll take **A<sub>4</sub>**, also known as the *Stuttgart pitch*. It’s the first **A** above **middle C** and sits at <samp>440Hz</samp>. Unfortunately, frequencies for other notes aren’t quite as simple. We cannot increment <samp>440</samp> by a fixed amount for each consecutive note. In fact, each consecutive note’s frequency is exactly *the 12<sup>th</sup> root of 2* times greater than the previous and vice versa.

<figure>
    <a href="/images/content/diatonic-scale.svg">
        <img src="/images/content/diatonic-scale.svg" alt="graph showing the logarithmic relationship of frequencies in a diatonic scale">
    </a>
</figure>

**A<sub>4</sub>** = <samp>440Hz</samp>

**A♯<sub>4</sub>** / **B♭<sub>4</sub>** = <samp>440Hz</samp> × <sup>12</sup>√2 = <samp>466.16Hz</samp>

**B<sub>4</sub>** = <samp>466.16Hz</samp> × <sup>12</sup>√2 = <samp>493.88Hz</samp>

Because I want the <q>music</q> produced by the sparklines to be remotely pleasing to listen to, we need a way to reliably map our unitless number inputs to musical notes. As a result, and to make the music theory more familiar to myself, the data should map directly onto the standard chromatic scale that most modern Western music is based on.

Wikipedia has [a great chart](https://upload.wikimedia.org/wikipedia/commons/a/ad/Piano_key_frequencies.png){:rel="external"} with a bunch of this sort of data.

We’ll use the following function to calculate the frequency for a given note on a piano, where **A<sub>4</sub>** is the *<var>49</var><sup>th</sup> key* on a standard piano:

<figure>
    <samp class="beta">f(<var>n</var>) = (<sup>12</sup>√2)<sup><var>n</var>-49</sup> × 440Hz</samp>
</figure>

{% highlight javascript %}
let getFrequencyFromKeys = (key) => {
    return 2 ** ((key - 49) / 12) * 440;
};
{% endhighlight %}

So if we want to calculate the frequency of **C<sub>4</sub>** (Middle C), the *<var>40</var><sup>th</sup> key* on the keyboard:

<figure>
    <samp>f(<var>40</var>) = (<sup>12</sup>√2)<sup><var>40</var>-49</sup> × 440Hz = 261.626Hz</samp>
</figure>


{% include content/heading.liquid title='Quintuplets' %}

Now that we have established a way of translating each unitless value in our sparkline into a pitch, let’s get a bit more musical and start mapping to a Major Pentatonic scale.

Without going into gory detail, [which you can read about here](https://en.wikipedia.org/wiki/Pentatonic_scale){:rel="external"} ([even more reading if you’re interested](){:rel="external"}), this type of scale is nice because between any two notes of the scale there exists harmony. This means that no matter what notes are <q>chosen</q> by the sparkline data, a mostly-pleasant tune will come back.

As opposed to a chromatic scale where notes are a semi-tone apart, a major pentatonic scale follows a pattern of whole-tones and semi-tones, which we’ll implement inside an array, each value representing one semi-tone step:

{% highlight javascript %}
let keyIntervals = [2, 3, 2, 2, 3];
{% endhighlight %}

Given that our base note is **C<sub>4</sub>**, the *<var>40</var><sup>th</sup> key* on a keyboard, the possible keys that we’re working with are as follows:

<figure>
    <samp style="max-width: var(--measure-line-length-responsive);">40, 42, 45, 47, 49, 52, 54, 57, 59, 61, 64, 66, …</samp>
</figure>

With these keys we can calculate their respective frequencies:

<figure>
    <samp style="max-width: var(--measure-line-length-responsive);">261.626, 293.665, 349.228, 391.995, 440.000, 523.251, 587.330, 698.456, 783.991, 880.000, 1046.502, 1174.659, …</samp>
</figure>

In order to quell any feverish posting on my part, *as unlikely as that may be*, I am limiting the highest value for the sparkline arbitrarily to <var>12</var>. This prevents clarity from being lost at the bottom end of the visual sparkline and limits the tunes that are generated from varying too wildly or playing notes which are unpleasant or [imperceptible](https://en.wikipedia.org/wiki/Hearing_range){:rel="external"}.


{% include content/heading.liquid title='[money, mouth] = [mouth, money];' id='put-your-money-where-your-mouth-is' %}

<figure>
    <canvas id="sparkline-demo-2" class="sparkline" width="160" height="24" data-values="0,0,0,0,0,0,0,0,4,0,0,4,9,1,4,5,2,4,2,6,4,6,4,6,5,0" tabindex="0"></canvas>
</figure>

Here’s an example. First, we need the per-week data:

<figure>
    <samp style="max-width: var(--measure-line-length-responsive);">0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 4, 9, 1, 4, 5, 2, 4, 2, 6, 4, 6, 4, 6, 5, 0</samp>
</figure>

If we work through this array, item by item, using each value as the key to retrieve the correct frequency, we end up with the following keys and frequencies:

<figure>
    <samp style="max-width: var(--measure-line-length-responsive);">40, 40, 40, 40, 40, 40, 40, 40, 49, 40, 40, 49, 61, 42, 49, 52, 45, 49, 45, 54, 49, 54, 49, 54, 52, 40</samp>
    <span>becomes</span>
    <samp style="max-width: var(--measure-line-length-responsive);">261.626, 261.626, 261.626, 261.626, 261.626, 261.626, 261.626, 261.626, 440.000, 261.626, 261.626, 440.000, 880.000, 293.665, 440.000, 523.251, 349.228, 440.000, 349.228, 587.330, 440.000, 587.330, 440.000, 587.330, 523.251, 261.626</samp>
</figure>

We can pump these values into the [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API){:rel="external"} to create the tones in our browsers, playing each frequency in succession over four seconds:

<figure>
    <canvas id="sparkline-demo-3" class="sparkline" width="160" height="24" data-values="0,0,0,0,0,0,0,0,4,0,0,4,9,1,4,5,2,4,2,6,4,6,4,6,5,0" tabindex="0"></canvas>
</figure>

--------

Lastly, I've included a link below if you’re a guitar player and you’re interested in playing in this type of scale! Thanks to [Jess Miller](https://www.jenreviews.com){:rex="external"} for reaching out.
