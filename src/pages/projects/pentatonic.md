---
title: Pentatonic
photo: pentatonic.png
emoji: 🎹
eleventyComputed:
  date: "{{ github[page.fileSlug].created_at }}"
  updated: "{{ github[page.fileSlug].updated_at }}"
  tagline: "Pentatonic v{{ pkg.dependencies['@chrisburnell/pentatonic'] | replace('^', '') }}"
  description: "{{ github[page.fileSlug].description }}"
tags:
  - package
toc: true
---

<figure>
    {% image './images/content/pentatonic.png', '', 'pixelated' %}
    <figcaption><p>A snippet of a <a href="https://en.wikipedia.org/wiki/Pentatonic_scale">C Major Pentatonic scale</a>.</p></figcaption>
</figure>

<div class="box">
    <p>Hey, psst!… You can jump straight down to the <a href="#examples">examples</a>!</p>
</div>

## What?

**Pentatonic** is a small JavaScript file that will play music generated from an array of integers from anywhere in your DOM.

## Why?

*Why not?* No, but really though, there’s no serious reason for this. It’s just fun.

## Installation

[Available on npm](https://www.npmjs.com/package/@chrisburnell/pentatonic):

```bash
npm install @chrisburnell/pentatonic --save-dev
```

You can also just download it directly [from GitHub](https://github.com/chrisburnell/pentatonic):<br><samp>[https://github.com/chrisburnell/pentatonic/archive/master.zip](https://github.com/chrisburnell/pentatonic/archive/master.zip)</samp>

## Usage

*pentatonic.js* gives you a function, `pentatonic()` to use, like so:

```javascript
document.querySelectorAll(".pentatonic").forEach(target => {
    target.addEventListener("click", () => {
        pentatonic(target.dataset.values.split(","));
    });
});
```

The function takes six parameters:

<table>
    <thead>
        <tr>
            <th></th>
            <th>Values</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th><code>notes</code><br><em>(required)</em></th>
            <td><a href="#notes">See below.</a></td>
            <td>an array of positive integers</td>
        </tr>
        <tr>
            <th><code>duration</code></th>
            <td style="white-space:nowrap">
                4000 <em>(default)</em>
            </td>
            <td>the length of time to play the audio for, represented in milliseconds</td>
        </tr>
        <tr>
            <th><code>volume</code></th>
            <td style="white-space:nowrap">
                0.5 <em>(default)</em>
            </td>
            <td>controls the *gain* of the audio, represented by a 0–1 range</td>
        </tr>
        <tr>
            <th><code>keyStart</code></th>
            <td style="white-space:nowrap">
                29 / C♯3 / D♭3 <em>(default)</em>
            </td>
            <td>the zero-index of the key on a standard keyboard from which the scale should start</td>
        </tr>
        <tr>
            <th><code>keyIntervals</code></th>
            <td style="white-space:nowrap">
                [2, 2, 3, 2, 3] <em>(default)</em>
            </td>
          <td>an array of integers which represent half-steps in a loop which composes the desired scale</td>
        </tr>
        <tr>
            <th><code>keyLimit</code></th>
            <td style="white-space:nowrap">
                12 <em>(default)</em>
            </td>
          <td>represents the highest index in the desired scale by which notes are bound by</td>
        </tr>
    </tbody>
</table>

## Examples

<button id="button" class="pentatonic" data-values="0,1,2,3,4,5,6,7,8,9,10,8,6,4,2,0,0,0"><code>0,1,2,3,4,5,6,7,8,9,10,8,6,4,2,0,0,0</code></button>

<spark-line values="0,0,0,0,0,0,0,0,4,0,0,4,9,1,4,5,2,4,2,6,4,6,4,6,5,0" endpoint-color="#eb2d36" class="pentatonic"></spark-line>

<button id="treasure" class="pentatonic" data-values="0,2,4,6,0,2,4,6,1,3,5,7,1,3,5,7,2,4,6,8,2,4,6,8,3,5,7,9,3,5,7,9,4,6,8,10,4,6,8,10,10,10,3,3,4,4,5,5,6,6,6,6,6,6" data-duration="8000" data-key-start="36" data-key-intervals="1" data-key-limit="20">🔑</button>

## Interactive Demo

Check out my new interactive demo at [spark-line](/spark-line/)!
