---
title: Pentatonic
lede: Turn any array of integers into a fun little melody.
show_webmentions: true
---

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
0. `keyIntervals` — an array of integers which represent half-steps in a loop which composes the desired scale *(default = [2, 3, 2, 2, 3] / a pentatonic scale)*
0. `keyLimit` — represents the highest index in the desired scale by which input is bound by *(default = 12)*

## Examples

<button id="button" class="button pentatonic" data-values="0,1,2,3,4,5,6,7,8,9,10,8,6,4,2,0,0,0"><code>0,1,2,3,4,5,6,7,8,9,10,8,6,4,2,0,0,0</code></button>

<canvas id="sparkline-demo-1" class="sparkline pentatonic" width="160" height="24" data-values="0,0,0,0,0,0,0,0,4,0,0,4,9,1,4,5,2,4,2,6,4,6,4,6,5,0"></canvas>
