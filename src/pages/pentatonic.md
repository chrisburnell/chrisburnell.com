---
title: Pentatonic
photo: https://chrisburnell.com/images/pentatonic.png
show_webmentions: true
eleventyComputed:
  tagline: "Pentatonic v{{ pkg['dependencies']['@chrisburnell/pentatonic'] | replace('^', '') }}"
  lede: "Turn any array of integers into a fun little melody.<br>{{ pentatonic['downloads'] }} downloads in the last month."
---

<figure>
    <picture>
        <source srcset="/images/pentatonic.webp" type="image/webp" />
        <img src="/images/pentatonic.png" alt="" role="presentation" loading="lazy">
    </picture>
    <figcaption><p>A snippet of a <a href="https://en.wikipedia.org/wiki/Pentatonic_scale">C Major Pentatonic scale</a>.</p></figcaption>
</figure>

<div class="box">
    <p>Hey, psst!… You can jump straight down to the <a href="#examples">examples</a>!</p>
</div>

## What?

**Pentatonic** is a small JavaScript file that will play music generated from an array of integers from anywhere in your DOM.

## Why?

Why not?

No, but really though, there’s no serious reason for this. It’s just fun.

## Installation

- **With npm:** `npm install @chrisburnell/pentatonic`
- **Direct download:** [https://github.com/chrisburnell/pentatonic/archive/master.zip](https://github.com/chrisburnell/pentatonic/archive/master.zip)

## Usage

*pentatonic.js* gives you a function, `pentatonic()` to use, like so:

```javascript
for (let target of document.querySelectorAll(".pentatonic")) {
    target.addEventListener("click", () => {
        pentatonic(target.getAttribute("data-values").split(","));
    });
}
```

The function takes six parameters:

0. `notes` — an array of positive integers *(required)*
0. `duration` — the length of time to play the audio for, represented in milliseconds *(default = 4000)*
0. `volume` — controls the *gain* of the audio, represented by a 0–1 range *(default = 0.5)*
0. `keyStart` — the zero-index of the key on a standard keyboard from which the scale should start *(default = 29 / C♯3 / D♭3)*
0. `keyIntervals` — an array of integers which represent half-steps in a loop which composes the desired scale *(default = [2, 2, 3, 2, 3] / a pentatonic scale)*
0. `keyLimit` — represents the highest index in the desired scale by which input is bound by *(default = 12)*

## Examples

<button id="button" class="button  pentatonic" data-values="0,1,2,3,4,5,6,7,8,9,10,8,6,4,2,0,0,0"><code>0,1,2,3,4,5,6,7,8,9,10,8,6,4,2,0,0,0</code></button>

<canvas id="sparkline" class="sparkline pentatonic" width="160" height="24" data-values="0,0,0,0,0,0,0,0,4,0,0,4,9,1,4,5,2,4,2,6,4,6,4,6,5,0"></canvas>

<button id="treasure" class="button" onclick="pentatonic([0,2,4,6,0,2,4,6,1,3,5,7,1,3,5,7,2,4,6,8,2,4,6,8,3,5,7,9,3,5,7,9,4,6,8,10,4,6,8,10,10,10,3,3,4,4,5,5,6,6,6,6,6,6], 8000, 0.5, 36, [1], 20)">🔑</button>

Type some numbers in the input field below and a playable sparkline will be built!

<p><input id="custom-input" type="text" pattern="[0-9]+" maxlength="26" oninput="fire()"></p>

<div>
    <canvas id="custom-sparkline" class="sparkline" width="160" height="24" tabindex="0"></canvas>
    <script>
        let input = document.querySelector("#custom-input");
        function fire() {
            input.value = input.value.replace(/(?![0-9])./gmi, "");
            sparkline("custom-sparkline", input.value.split(""));
        }
        document.querySelector("#custom-sparkline").addEventListener("click", function(event) {
            pentatonic(input.value.split(""), (160 * input.value.split("").length));
        });
    </script>
    <noscript>Requires JavaScript, unfortunately.</noscript>
</div>
