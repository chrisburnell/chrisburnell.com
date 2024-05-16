---
date: 2024-05-12T23:05:49+0800
title: Vigenère Cipher
description: In this interactive article, I’m going to show how the *Vigenère Cipher* works and how you can use it as an Eleventy filter.
tags:
  - weblogpomo
  - weblogpomo2024
  - javascript
---

<p class="rss-only"><em>This article relies heavily on JavaScript for its interactive portions, so I recommend reading the web version: <a href="{{ canonical }}">{{ canonical }}</a></em></p>

<blockquote>
    <p>The Vigenère cipher is a method of encrypting alphabetic text where each letter of the plaintext is encoded with a different Caesar cipher, whose increment is determined by the corresponding letter of another text, the key.</p>
    <cite><a href="https://en.wikipedia.org/wiki/Vigen%C3%A8re_cipher" rel="external noopener">Vigenère Cipher on Wikiepdia</a></cite>
</blockquote>

In other words, the *Vigenère Cipher* is way of combining 26 [Caesar Ciphers](https://en.wikipedia.org/wiki/Caesar_cipher) with a secret keyword to encrypt a string of alphabetic characters.

Unlike a traditional Caesar Cipher, where the letters of the alphabet are shifted by a given number (e.g. `XYZABCDEFGHIJKLMNOPQRSTUVWXYZ`), the Caesar Ciphers used in the *Vigenère Cipher* are shifted by a particular keyword instead (e.g. `KEYWORDABCFGHIJLMNPQSTUVXZ`). This Caesar Cipher is then sequentially shifted by one letter 25 times to produce a table of 26 Caesar Ciphers:

<div class=" [ scroll-inline  scroll-inline-shadow ] ">
    <table class=" [ monospace ] " style="font-size: var(--font-size-small);">
        <tbody>
            <tr><td>K</td><td>E</td><td>Y</td><td>W</td><td>O</td><td>R</td><td>D</td><td>A</td><td>B</td><td>C</td><td>F</td><td>G</td><td>H</td><td>I</td><td>J</td><td>L</td><td>M</td><td>N</td><td>P</td><td>Q</td><td>S</td><td>T</td><td>U</td><td>V</td><td>X</td><td>Z</td></tr>
            <tr><td>E</td><td>Y</td><td>W</td><td>O</td><td>R</td><td>D</td><td>A</td><td>B</td><td>C</td><td>F</td><td>G</td><td>H</td><td>I</td><td>J</td><td>L</td><td>M</td><td>N</td><td>P</td><td>Q</td><td>S</td><td>T</td><td>U</td><td>V</td><td>X</td><td>Z</td><td>K</td></tr>
            <tr><td>Y</td><td>W</td><td>O</td><td>R</td><td>D</td><td>A</td><td>B</td><td>C</td><td>F</td><td>G</td><td>H</td><td>I</td><td>J</td><td>L</td><td>M</td><td>N</td><td>P</td><td>Q</td><td>S</td><td>T</td><td>U</td><td>V</td><td>X</td><td>Z</td><td>K</td><td>E</td></tr>
            <tr><td>W</td><td>O</td><td>R</td><td>D</td><td>A</td><td>B</td><td>C</td><td>F</td><td>G</td><td>H</td><td>I</td><td>J</td><td>L</td><td>M</td><td>N</td><td>P</td><td>Q</td><td>S</td><td>T</td><td>U</td><td>V</td><td>X</td><td>Z</td><td>K</td><td>E</td><td>Y</td></tr>
            <tr><td>O</td><td>R</td><td>D</td><td>A</td><td>B</td><td>C</td><td>F</td><td>G</td><td>H</td><td>I</td><td>J</td><td>L</td><td>M</td><td>N</td><td>P</td><td>Q</td><td>S</td><td>T</td><td>U</td><td>V</td><td>X</td><td>Z</td><td>K</td><td>E</td><td>Y</td><td>W</td></tr>
            <tr><td>R</td><td>D</td><td>A</td><td>B</td><td>C</td><td>F</td><td>G</td><td>H</td><td>I</td><td>J</td><td>L</td><td>M</td><td>N</td><td>P</td><td>Q</td><td>S</td><td>T</td><td>U</td><td>V</td><td>X</td><td>Z</td><td>K</td><td>E</td><td>Y</td><td>W</td><td>O</td></tr>
            <tr><td>D</td><td>A</td><td>B</td><td>C</td><td>F</td><td>G</td><td>H</td><td>I</td><td>J</td><td>L</td><td>M</td><td>N</td><td>P</td><td>Q</td><td>S</td><td>T</td><td>U</td><td>V</td><td>X</td><td>Z</td><td>K</td><td>E</td><td>Y</td><td>W</td><td>O</td><td>R</td></tr>
            <tr><td>A</td><td>B</td><td>C</td><td>F</td><td>G</td><td>H</td><td>I</td><td>J</td><td>L</td><td>M</td><td>N</td><td>P</td><td>Q</td><td>S</td><td>T</td><td>U</td><td>V</td><td>X</td><td>Z</td><td>K</td><td>E</td><td>Y</td><td>W</td><td>O</td><td>R</td><td>D</td></tr>
            <tr><td>B</td><td>C</td><td>F</td><td>G</td><td>H</td><td>I</td><td>J</td><td>L</td><td>M</td><td>N</td><td>P</td><td>Q</td><td>S</td><td>T</td><td>U</td><td>V</td><td>X</td><td>Z</td><td>K</td><td>E</td><td>Y</td><td>W</td><td>O</td><td>R</td><td>D</td><td>A</td></tr>
            <tr><td>C</td><td>F</td><td>G</td><td>H</td><td>I</td><td>J</td><td>L</td><td>M</td><td>N</td><td>P</td><td>Q</td><td>S</td><td>T</td><td>U</td><td>V</td><td>X</td><td>Z</td><td>K</td><td>E</td><td>Y</td><td>W</td><td>O</td><td>R</td><td>D</td><td>A</td><td>B</td></tr>
            <tr><td>F</td><td>G</td><td>H</td><td>I</td><td>J</td><td>L</td><td>M</td><td>N</td><td>P</td><td>Q</td><td>S</td><td>T</td><td>U</td><td>V</td><td>X</td><td>Z</td><td>K</td><td>E</td><td>Y</td><td>W</td><td>O</td><td>R</td><td>D</td><td>A</td><td>B</td><td>C</td></tr>
            <tr><td>G</td><td>H</td><td>I</td><td>J</td><td>L</td><td>M</td><td>N</td><td>P</td><td>Q</td><td>S</td><td>T</td><td>U</td><td>V</td><td>X</td><td>Z</td><td>K</td><td>E</td><td>Y</td><td>W</td><td>O</td><td>R</td><td>D</td><td>A</td><td>B</td><td>C</td><td>F</td></tr>
            <tr><td>H</td><td>I</td><td>J</td><td>L</td><td>M</td><td>N</td><td>P</td><td>Q</td><td>S</td><td>T</td><td>U</td><td>V</td><td>X</td><td>Z</td><td>K</td><td>E</td><td>Y</td><td>W</td><td>O</td><td>R</td><td>D</td><td>A</td><td>B</td><td>C</td><td>F</td><td>G</td></tr>
            <tr><td>I</td><td>J</td><td>L</td><td>M</td><td>N</td><td>P</td><td>Q</td><td>S</td><td>T</td><td>U</td><td>V</td><td>X</td><td>Z</td><td>K</td><td>E</td><td>Y</td><td>W</td><td>O</td><td>R</td><td>D</td><td>A</td><td>B</td><td>C</td><td>F</td><td>G</td><td>H</td></tr>
            <tr><td>J</td><td>L</td><td>M</td><td>N</td><td>P</td><td>Q</td><td>S</td><td>T</td><td>U</td><td>V</td><td>X</td><td>Z</td><td>K</td><td>E</td><td>Y</td><td>W</td><td>O</td><td>R</td><td>D</td><td>A</td><td>B</td><td>C</td><td>F</td><td>G</td><td>H</td><td>I</td></tr>
            <tr><td>L</td><td>M</td><td>N</td><td>P</td><td>Q</td><td>S</td><td>T</td><td>U</td><td>V</td><td>X</td><td>Z</td><td>K</td><td>E</td><td>Y</td><td>W</td><td>O</td><td>R</td><td>D</td><td>A</td><td>B</td><td>C</td><td>F</td><td>G</td><td>H</td><td>I</td><td>J</td></tr>
            <tr><td>M</td><td>N</td><td>P</td><td>Q</td><td>S</td><td>T</td><td>U</td><td>V</td><td>X</td><td>Z</td><td>K</td><td>E</td><td>Y</td><td>W</td><td>O</td><td>R</td><td>D</td><td>A</td><td>B</td><td>C</td><td>F</td><td>G</td><td>H</td><td>I</td><td>J</td><td>L</td></tr>
            <tr><td>N</td><td>P</td><td>Q</td><td>S</td><td>T</td><td>U</td><td>V</td><td>X</td><td>Z</td><td>K</td><td>E</td><td>Y</td><td>W</td><td>O</td><td>R</td><td>D</td><td>A</td><td>B</td><td>C</td><td>F</td><td>G</td><td>H</td><td>I</td><td>J</td><td>L</td><td>M</td></tr>
            <tr><td>P</td><td>Q</td><td>S</td><td>T</td><td>U</td><td>V</td><td>X</td><td>Z</td><td>K</td><td>E</td><td>Y</td><td>W</td><td>O</td><td>R</td><td>D</td><td>A</td><td>B</td><td>C</td><td>F</td><td>G</td><td>H</td><td>I</td><td>J</td><td>L</td><td>M</td><td>N</td></tr>
            <tr><td>Q</td><td>S</td><td>T</td><td>U</td><td>V</td><td>X</td><td>Z</td><td>K</td><td>E</td><td>Y</td><td>W</td><td>O</td><td>R</td><td>D</td><td>A</td><td>B</td><td>C</td><td>F</td><td>G</td><td>H</td><td>I</td><td>J</td><td>L</td><td>M</td><td>N</td><td>P</td></tr>
            <tr><td>S</td><td>T</td><td>U</td><td>V</td><td>X</td><td>Z</td><td>K</td><td>E</td><td>Y</td><td>W</td><td>O</td><td>R</td><td>D</td><td>A</td><td>B</td><td>C</td><td>F</td><td>G</td><td>H</td><td>I</td><td>J</td><td>L</td><td>M</td><td>N</td><td>P</td><td>Q</td></tr>
            <tr><td>T</td><td>U</td><td>V</td><td>X</td><td>Z</td><td>K</td><td>E</td><td>Y</td><td>W</td><td>O</td><td>R</td><td>D</td><td>A</td><td>B</td><td>C</td><td>F</td><td>G</td><td>H</td><td>I</td><td>J</td><td>L</td><td>M</td><td>N</td><td>P</td><td>Q</td><td>S</td></tr>
            <tr><td>U</td><td>V</td><td>X</td><td>Z</td><td>K</td><td>E</td><td>Y</td><td>W</td><td>O</td><td>R</td><td>D</td><td>A</td><td>B</td><td>C</td><td>F</td><td>G</td><td>H</td><td>I</td><td>J</td><td>L</td><td>M</td><td>N</td><td>P</td><td>Q</td><td>S</td><td>T</td></tr>
            <tr><td>V</td><td>X</td><td>Z</td><td>K</td><td>E</td><td>Y</td><td>W</td><td>O</td><td>R</td><td>D</td><td>A</td><td>B</td><td>C</td><td>F</td><td>G</td><td>H</td><td>I</td><td>J</td><td>L</td><td>M</td><td>N</td><td>P</td><td>Q</td><td>S</td><td>T</td><td>U</td></tr>
            <tr><td>X</td><td>Z</td><td>K</td><td>E</td><td>Y</td><td>W</td><td>O</td><td>R</td><td>D</td><td>A</td><td>B</td><td>C</td><td>F</td><td>G</td><td>H</td><td>I</td><td>J</td><td>L</td><td>M</td><td>N</td><td>P</td><td>Q</td><td>S</td><td>T</td><td>U</td><td>V</td></tr>
            <tr><td>Z</td><td>K</td><td>E</td><td>Y</td><td>W</td><td>O</td><td>R</td><td>D</td><td>A</td><td>B</td><td>C</td><td>F</td><td>G</td><td>H</td><td>I</td><td>J</td><td>L</td><td>M</td><td>N</td><td>P</td><td>Q</td><td>S</td><td>T</td><td>U</td><td>V</td><td>X</td></tr>
        </tbody>
    </table>
</div>

This table is then used in conjunction with a secret keyword to encrypt a given phrase.

For example, if we want to encrypt the phrase, <q>This is just a test</q>, we first need to remove all non-alphabetic characters to produce the string `THISISJUSTATEST` (which I’ve capitalised here to make life a little easier later).

Now, if our secret keyword is `SECRET`, we need repeat it until it’s as many characters long as the phrase we want to encrypt. This now gives us two strings of equal length:

<p><code>SECRETSECRETSEC</code><br><code>THISISJUSTATEST</code></p>

Finally, to encrypt our phrase, we need to loop through each of the characters in both the phrase and the repeated secret keyword at the same time and use those letters as a reference to a row and column in our *Vigenère Table* to get an encrypted letter.

In the first iteration of this looping process, the first letter in our repeated secret keyword is `S`, and the first letter in the phrase we want to encrypt is `T`. This tells us to look at the *row* that starts with `S` and the *column* that starts with `T`. The intersection of this row and column in our *Vigenère Table* gives us the letter `L`.

Repeating this process for each letter gives us the encrypted string:

`LIUZJLBVWKBMTTO`

Without the secret keyword (or, to be fair, modern computing power), it can be *very* difficult to decipher this string.

## Interactive Demo

<noscript><p><em>This interactive demo unfortunately requires JavaScript to function correctly; although, the default state of this form presents a correct encrypted string.</em></p></noscript>

<!-- </textarea> -->
<!-- '"´ -->
<form id="clamp-calculator" class=" [ grid ] [ clamp-calculator ] " data-layout="50-50">
	<legend class=" [ visually-hidden ] ">
		<h2>{{ title }}</h2>
	</legend>
	<fieldset>
		<label for="key" class=" [ delta ] ">Key</label>
		<input id="key" class=" [ center  monospace  uppercase ] " style="inline-size: 100%; line-height: 3; letter-spacing: 0.125em;" type="text" pattern="^[A-Za-z]{1,40}$" value="KEYWORD"></input>
	</fieldset>
	<fieldset>
		<label for="secret" class=" [ delta ] ">Secret</label>
		<input id="secret" class=" [ center  monospace  uppercase ] " style="inline-size: 100%; line-height: 3; letter-spacing: 0.125em;" type="text" pattern="^[A-Za-z]{1,40}$" value="SECRET"></input>
	</fieldset>
	<fieldset style="grid-column: span 2;">
		<label for="phrase" class=" [ delta ] ">Phrase</label>
		<input id="phrase" style="inline-size: 100%; font-size: inherit; line-height: 3;" type="text" pattern="^.{1,40}$" value="This is just a test"></input>
	</fieldset>
</form>

<p class=" [ gamma ] ">Output</p>

<div id="output" class=" [ box ] [ center  monospace  uppercase ] " style="letter-spacing: 0.125em;" aria-live="polite">
	<span tabindex="0" row="21" column="22">L</span><span tabindex="0" row="2" column="13">I</span><span tabindex="0" row="10" column="14">U</span><span tabindex="0" row="6" column="21">Z</span><span tabindex="0" row="2" column="14">J</span><span tabindex="0" row="22" column="21">L</span><span tabindex="0" row="21" column="15">B</span><span tabindex="0" row="2" column="23">V</span><span tabindex="0" row="10" column="21">W</span><span tabindex="0" row="6" column="22">K</span><span tabindex="0" row="2" column="8">B</span><span tabindex="0" row="22" column="22">M</span><span tabindex="0" row="21" column="2">T</span><span tabindex="0" row="2" column="21">T</span><span tabindex="0" row="10" column="22">O</span>
</div>

<c-details class=" [ no-border  no-padding ] [ flow ] ">
    <summary class=" [ delta ] ">Vigenère Table</summary>
    <div class=" [ scroll-inline  scroll-inline-shadow ] ">
        <table class=" [ monospace ] " style="font-size: var(--font-size-small);">
            <tbody id="square" aria-live="polite">
                <tr><td>K</td><td>E</td><td>Y</td><td>W</td><td>O</td><td>R</td><td>D</td><td>A</td><td>B</td><td>C</td><td>F</td><td>G</td><td>H</td><td>I</td><td>J</td><td>L</td><td>M</td><td>N</td><td>P</td><td>Q</td><td>S</td><td>T</td><td>U</td><td>V</td><td>X</td><td>Z</td></tr>
                <tr><td>E</td><td>Y</td><td>W</td><td>O</td><td>R</td><td>D</td><td>A</td><td>B</td><td>C</td><td>F</td><td>G</td><td>H</td><td>I</td><td>J</td><td>L</td><td>M</td><td>N</td><td>P</td><td>Q</td><td>S</td><td>T</td><td>U</td><td>V</td><td>X</td><td>Z</td><td>K</td></tr>
                <tr><td>Y</td><td>W</td><td>O</td><td>R</td><td>D</td><td>A</td><td>B</td><td>C</td><td>F</td><td>G</td><td>H</td><td>I</td><td>J</td><td>L</td><td>M</td><td>N</td><td>P</td><td>Q</td><td>S</td><td>T</td><td>U</td><td>V</td><td>X</td><td>Z</td><td>K</td><td>E</td></tr>
                <tr><td>W</td><td>O</td><td>R</td><td>D</td><td>A</td><td>B</td><td>C</td><td>F</td><td>G</td><td>H</td><td>I</td><td>J</td><td>L</td><td>M</td><td>N</td><td>P</td><td>Q</td><td>S</td><td>T</td><td>U</td><td>V</td><td>X</td><td>Z</td><td>K</td><td>E</td><td>Y</td></tr>
                <tr><td>O</td><td>R</td><td>D</td><td>A</td><td>B</td><td>C</td><td>F</td><td>G</td><td>H</td><td>I</td><td>J</td><td>L</td><td>M</td><td>N</td><td>P</td><td>Q</td><td>S</td><td>T</td><td>U</td><td>V</td><td>X</td><td>Z</td><td>K</td><td>E</td><td>Y</td><td>W</td></tr>
                <tr><td>R</td><td>D</td><td>A</td><td>B</td><td>C</td><td>F</td><td>G</td><td>H</td><td>I</td><td>J</td><td>L</td><td>M</td><td>N</td><td>P</td><td>Q</td><td>S</td><td>T</td><td>U</td><td>V</td><td>X</td><td>Z</td><td>K</td><td>E</td><td>Y</td><td>W</td><td>O</td></tr>
                <tr><td>D</td><td>A</td><td>B</td><td>C</td><td>F</td><td>G</td><td>H</td><td>I</td><td>J</td><td>L</td><td>M</td><td>N</td><td>P</td><td>Q</td><td>S</td><td>T</td><td>U</td><td>V</td><td>X</td><td>Z</td><td>K</td><td>E</td><td>Y</td><td>W</td><td>O</td><td>R</td></tr>
                <tr><td>A</td><td>B</td><td>C</td><td>F</td><td>G</td><td>H</td><td>I</td><td>J</td><td>L</td><td>M</td><td>N</td><td>P</td><td>Q</td><td>S</td><td>T</td><td>U</td><td>V</td><td>X</td><td>Z</td><td>K</td><td>E</td><td>Y</td><td>W</td><td>O</td><td>R</td><td>D</td></tr>
                <tr><td>B</td><td>C</td><td>F</td><td>G</td><td>H</td><td>I</td><td>J</td><td>L</td><td>M</td><td>N</td><td>P</td><td>Q</td><td>S</td><td>T</td><td>U</td><td>V</td><td>X</td><td>Z</td><td>K</td><td>E</td><td>Y</td><td>W</td><td>O</td><td>R</td><td>D</td><td>A</td></tr>
                <tr><td>C</td><td>F</td><td>G</td><td>H</td><td>I</td><td>J</td><td>L</td><td>M</td><td>N</td><td>P</td><td>Q</td><td>S</td><td>T</td><td>U</td><td>V</td><td>X</td><td>Z</td><td>K</td><td>E</td><td>Y</td><td>W</td><td>O</td><td>R</td><td>D</td><td>A</td><td>B</td></tr>
                <tr><td>F</td><td>G</td><td>H</td><td>I</td><td>J</td><td>L</td><td>M</td><td>N</td><td>P</td><td>Q</td><td>S</td><td>T</td><td>U</td><td>V</td><td>X</td><td>Z</td><td>K</td><td>E</td><td>Y</td><td>W</td><td>O</td><td>R</td><td>D</td><td>A</td><td>B</td><td>C</td></tr>
                <tr><td>G</td><td>H</td><td>I</td><td>J</td><td>L</td><td>M</td><td>N</td><td>P</td><td>Q</td><td>S</td><td>T</td><td>U</td><td>V</td><td>X</td><td>Z</td><td>K</td><td>E</td><td>Y</td><td>W</td><td>O</td><td>R</td><td>D</td><td>A</td><td>B</td><td>C</td><td>F</td></tr>
                <tr><td>H</td><td>I</td><td>J</td><td>L</td><td>M</td><td>N</td><td>P</td><td>Q</td><td>S</td><td>T</td><td>U</td><td>V</td><td>X</td><td>Z</td><td>K</td><td>E</td><td>Y</td><td>W</td><td>O</td><td>R</td><td>D</td><td>A</td><td>B</td><td>C</td><td>F</td><td>G</td></tr>
                <tr><td>I</td><td>J</td><td>L</td><td>M</td><td>N</td><td>P</td><td>Q</td><td>S</td><td>T</td><td>U</td><td>V</td><td>X</td><td>Z</td><td>K</td><td>E</td><td>Y</td><td>W</td><td>O</td><td>R</td><td>D</td><td>A</td><td>B</td><td>C</td><td>F</td><td>G</td><td>H</td></tr>
                <tr><td>J</td><td>L</td><td>M</td><td>N</td><td>P</td><td>Q</td><td>S</td><td>T</td><td>U</td><td>V</td><td>X</td><td>Z</td><td>K</td><td>E</td><td>Y</td><td>W</td><td>O</td><td>R</td><td>D</td><td>A</td><td>B</td><td>C</td><td>F</td><td>G</td><td>H</td><td>I</td></tr>
                <tr><td>L</td><td>M</td><td>N</td><td>P</td><td>Q</td><td>S</td><td>T</td><td>U</td><td>V</td><td>X</td><td>Z</td><td>K</td><td>E</td><td>Y</td><td>W</td><td>O</td><td>R</td><td>D</td><td>A</td><td>B</td><td>C</td><td>F</td><td>G</td><td>H</td><td>I</td><td>J</td></tr>
                <tr><td>M</td><td>N</td><td>P</td><td>Q</td><td>S</td><td>T</td><td>U</td><td>V</td><td>X</td><td>Z</td><td>K</td><td>E</td><td>Y</td><td>W</td><td>O</td><td>R</td><td>D</td><td>A</td><td>B</td><td>C</td><td>F</td><td>G</td><td>H</td><td>I</td><td>J</td><td>L</td></tr>
                <tr><td>N</td><td>P</td><td>Q</td><td>S</td><td>T</td><td>U</td><td>V</td><td>X</td><td>Z</td><td>K</td><td>E</td><td>Y</td><td>W</td><td>O</td><td>R</td><td>D</td><td>A</td><td>B</td><td>C</td><td>F</td><td>G</td><td>H</td><td>I</td><td>J</td><td>L</td><td>M</td></tr>
                <tr><td>P</td><td>Q</td><td>S</td><td>T</td><td>U</td><td>V</td><td>X</td><td>Z</td><td>K</td><td>E</td><td>Y</td><td>W</td><td>O</td><td>R</td><td>D</td><td>A</td><td>B</td><td>C</td><td>F</td><td>G</td><td>H</td><td>I</td><td>J</td><td>L</td><td>M</td><td>N</td></tr>
                <tr><td>Q</td><td>S</td><td>T</td><td>U</td><td>V</td><td>X</td><td>Z</td><td>K</td><td>E</td><td>Y</td><td>W</td><td>O</td><td>R</td><td>D</td><td>A</td><td>B</td><td>C</td><td>F</td><td>G</td><td>H</td><td>I</td><td>J</td><td>L</td><td>M</td><td>N</td><td>P</td></tr>
                <tr><td>S</td><td>T</td><td>U</td><td>V</td><td>X</td><td>Z</td><td>K</td><td>E</td><td>Y</td><td>W</td><td>O</td><td>R</td><td>D</td><td>A</td><td>B</td><td>C</td><td>F</td><td>G</td><td>H</td><td>I</td><td>J</td><td>L</td><td>M</td><td>N</td><td>P</td><td>Q</td></tr>
                <tr><td>T</td><td>U</td><td>V</td><td>X</td><td>Z</td><td>K</td><td>E</td><td>Y</td><td>W</td><td>O</td><td>R</td><td>D</td><td>A</td><td>B</td><td>C</td><td>F</td><td>G</td><td>H</td><td>I</td><td>J</td><td>L</td><td>M</td><td>N</td><td>P</td><td>Q</td><td>S</td></tr>
                <tr><td>U</td><td>V</td><td>X</td><td>Z</td><td>K</td><td>E</td><td>Y</td><td>W</td><td>O</td><td>R</td><td>D</td><td>A</td><td>B</td><td>C</td><td>F</td><td>G</td><td>H</td><td>I</td><td>J</td><td>L</td><td>M</td><td>N</td><td>P</td><td>Q</td><td>S</td><td>T</td></tr>
                <tr><td>V</td><td>X</td><td>Z</td><td>K</td><td>E</td><td>Y</td><td>W</td><td>O</td><td>R</td><td>D</td><td>A</td><td>B</td><td>C</td><td>F</td><td>G</td><td>H</td><td>I</td><td>J</td><td>L</td><td>M</td><td>N</td><td>P</td><td>Q</td><td>S</td><td>T</td><td>U</td></tr>
                <tr><td>X</td><td>Z</td><td>K</td><td>E</td><td>Y</td><td>W</td><td>O</td><td>R</td><td>D</td><td>A</td><td>B</td><td>C</td><td>F</td><td>G</td><td>H</td><td>I</td><td>J</td><td>L</td><td>M</td><td>N</td><td>P</td><td>Q</td><td>S</td><td>T</td><td>U</td><td>V</td></tr>
                <tr><td>Z</td><td>K</td><td>E</td><td>Y</td><td>W</td><td>O</td><td>R</td><td>D</td><td>A</td><td>B</td><td>C</td><td>F</td><td>G</td><td>H</td><td>I</td><td>J</td><td>L</td><td>M</td><td>N</td><td>P</td><td>Q</td><td>S</td><td>T</td><td>U</td><td>V</td><td>X</td></tr>
            </tbody>
        </table>
    </div>
</c-details>

*You can hover/focus the letters in the output above to see the row and column intersections in the table below.*

<h2 id="eleventy-filter">Building an Eleventy filter</h2>

As a fun experiment, I decided to implement the *Vigenère Cipher* as an [Eleventy Filter](https://www.11ty.dev/docs/filters/). If the secret keyword is stored as an [Environment Variable](https://www.11ty.dev/docs/environment-vars/), this could be a fun or handy way of obfuscating content, where maybe only your friends know the secret key and can therefore decrypt the content.

Let’s use the previous example’s keyword for the Caesar Ciphers and secret keyword. We can save the secret keyword in an `.env` file:

```text
VIGENERE_SECRET=SECRET
```

We can add the Filter to our build through in our Eleventy Config File:

```javascript
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

module.exports = function (eleventyConfig) {
	eleventyConfig.addFilter("vigenere", (content, keyword = "KEYWORD", secret = process.env.VIGENERE_SECRET) => {
		content = content.toUpperCase().replace(/[^A-Z]/g, "")
		keyword = keyword.toUpperCase().replace(/[^A-Z]/g, "")
		secret = secret.toUpperCase().replace(/[^A-Z]/g, "")

		let caesarCipher = alphabet
		keyword
			.split("")
			.reverse()
			.forEach((letter) => {
				caesarCipher = letter + caesarCipher.replace(letter, "")
			})

		let vigenereTableRow = caesarCipher
		const vigenereTable = []
		caesarCipher.split("").forEach((letter) => {
			vigenereTable.push(vigenereTableRow)
			vigenereTableRow = vigenereTableRow.replace(letter, "") + letter
		})

		let secretRepeated = ""
		content.split("").forEach((_, index) => {
			secretRepeated += secret.split("")[index % secret.length]
		})

		let encrypted = ""
		secretRepeated.split("").forEach((_, index) => {
			const row = caesarCipher.indexOf(secretRepeated[index])
			const column = caesarCipher.indexOf(content[index])
			encrypted += vigenereTable[row][column]
		})

		return encrypted
	})
}
```

Now we can encrypt content with the `vigenere` keyword throughout our project:

{% raw %}
```twig
{{ 'This is just a test' | vigenere }}
```
{% endraw %}

Which gives us our encrypted string: `LIUZJLBVWKBMTTO`.

--------

{% include 'weblogpomo2024.njk' %}

<style>
.scroll-inline {
	position: relative;
	z-index: var(--z-index-root);
}
[id="output"] {
	word-break: break-all;
}
[id="output"] span:is(:hover, :focus) {
	color: red;
	outline: none;
	font-weight: var(--font-weight-bold);
	text-decoration: underline;
	text-decoration-color: currentColor;
	text-decoration-thickness: 2px;
	cursor: pointer;
}
td {
	padding: 0.125em 0.25em;
	line-height: 1;
}
</style>
<style id="output-styles">
:root:has([row="21"][column="22"]:is(:hover, :focus)) [id="square"] tr:nth-of-type(21), :root:has([row="21"][column="22"]:is(:hover, :focus)) [id="square"] tr td:nth-of-type(22), :root:has([row="2"][column="13"]:is(:hover, :focus)) [id="square"] tr:nth-of-type(2), :root:has([row="2"][column="13"]:is(:hover, :focus)) [id="square"] tr td:nth-of-type(13), :root:has([row="10"][column="14"]:is(:hover, :focus)) [id="square"] tr:nth-of-type(10), :root:has([row="10"][column="14"]:is(:hover, :focus)) [id="square"] tr td:nth-of-type(14), :root:has([row="6"][column="21"]:is(:hover, :focus)) [id="square"] tr:nth-of-type(6), :root:has([row="6"][column="21"]:is(:hover, :focus)) [id="square"] tr td:nth-of-type(21), :root:has([row="2"][column="14"]:is(:hover, :focus)) [id="square"] tr:nth-of-type(2), :root:has([row="2"][column="14"]:is(:hover, :focus)) [id="square"] tr td:nth-of-type(14), :root:has([row="22"][column="21"]:is(:hover, :focus)) [id="square"] tr:nth-of-type(22), :root:has([row="22"][column="21"]:is(:hover, :focus)) [id="square"] tr td:nth-of-type(21), :root:has([row="21"][column="15"]:is(:hover, :focus)) [id="square"] tr:nth-of-type(21), :root:has([row="21"][column="15"]:is(:hover, :focus)) [id="square"] tr td:nth-of-type(15), :root:has([row="2"][column="23"]:is(:hover, :focus)) [id="square"] tr:nth-of-type(2), :root:has([row="2"][column="23"]:is(:hover, :focus)) [id="square"] tr td:nth-of-type(23), :root:has([row="10"][column="21"]:is(:hover, :focus)) [id="square"] tr:nth-of-type(10), :root:has([row="10"][column="21"]:is(:hover, :focus)) [id="square"] tr td:nth-of-type(21), :root:has([row="6"][column="22"]:is(:hover, :focus)) [id="square"] tr:nth-of-type(6), :root:has([row="6"][column="22"]:is(:hover, :focus)) [id="square"] tr td:nth-of-type(22), :root:has([row="2"][column="8"]:is(:hover, :focus)) [id="square"] tr:nth-of-type(2), :root:has([row="2"][column="8"]:is(:hover, :focus)) [id="square"] tr td:nth-of-type(8), :root:has([row="22"][column="22"]:is(:hover, :focus)) [id="square"] tr:nth-of-type(22), :root:has([row="22"][column="22"]:is(:hover, :focus)) [id="square"] tr td:nth-of-type(22), :root:has([row="21"][column="2"]:is(:hover, :focus)) [id="square"] tr:nth-of-type(21), :root:has([row="21"][column="2"]:is(:hover, :focus)) [id="square"] tr td:nth-of-type(2), :root:has([row="2"][column="21"]:is(:hover, :focus)) [id="square"] tr:nth-of-type(2), :root:has([row="2"][column="21"]:is(:hover, :focus)) [id="square"] tr td:nth-of-type(21), :root:has([row="10"][column="22"]:is(:hover, :focus)) [id="square"] tr:nth-of-type(10), :root:has([row="10"][column="22"]:is(:hover, :focus)) [id="square"] tr td:nth-of-type(22) {
	color: var(--color-maple);
	font-weight: var(--font-weight-bold);
}
:root:has([row="21"][column="22"]:is(:hover, :focus)) [id="square"] tr:nth-of-type(21) td:nth-of-type(22), :root:has([row="2"][column="13"]:is(:hover, :focus)) [id="square"] tr:nth-of-type(2) td:nth-of-type(13), :root:has([row="10"][column="14"]:is(:hover, :focus)) [id="square"] tr:nth-of-type(10) td:nth-of-type(14), :root:has([row="6"][column="21"]:is(:hover, :focus)) [id="square"] tr:nth-of-type(6) td:nth-of-type(21), :root:has([row="2"][column="14"]:is(:hover, :focus)) [id="square"] tr:nth-of-type(2) td:nth-of-type(14), :root:has([row="22"][column="21"]:is(:hover, :focus)) [id="square"] tr:nth-of-type(22) td:nth-of-type(21), :root:has([row="21"][column="15"]:is(:hover, :focus)) [id="square"] tr:nth-of-type(21) td:nth-of-type(15), :root:has([row="2"][column="23"]:is(:hover, :focus)) [id="square"] tr:nth-of-type(2) td:nth-of-type(23), :root:has([row="10"][column="21"]:is(:hover, :focus)) [id="square"] tr:nth-of-type(10) td:nth-of-type(21), :root:has([row="6"][column="22"]:is(:hover, :focus)) [id="square"] tr:nth-of-type(6) td:nth-of-type(22), :root:has([row="2"][column="8"]:is(:hover, :focus)) [id="square"] tr:nth-of-type(2) td:nth-of-type(8), :root:has([row="22"][column="22"]:is(:hover, :focus)) [id="square"] tr:nth-of-type(22) td:nth-of-type(22), :root:has([row="21"][column="2"]:is(:hover, :focus)) [id="square"] tr:nth-of-type(21) td:nth-of-type(2), :root:has([row="2"][column="21"]:is(:hover, :focus)) [id="square"] tr:nth-of-type(2) td:nth-of-type(21), :root:has([row="10"][column="22"]:is(:hover, :focus)) [id="square"] tr:nth-of-type(10) td:nth-of-type(22) {
	background-color: var(--color-maple);
	color: var(--color-snowy);
	transform: scale(1.1);
}
</style>

<script>
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

const keyInput = document.querySelector("[id=key]")
const secretInput = document.querySelector("[id=secret]")
const phraseInput = document.querySelector("[id=phrase]")
const output = document.querySelector("[id=output]")
const outputStyles = document.querySelector("[id=output-styles]")
const square = document.querySelector("[id=square]")

const translate = () => {
	const keyValue = keyInput.value.toUpperCase().replace(/[^A-Z]/g, "")
	const secretValue = secretInput.value.toUpperCase().replace(/[^A-Z]/g, "")
	const phraseValue = phraseInput.value.toUpperCase().replace(/[^A-Z]/g, "")

	if (keyValue === "" || keyInput.value.length > 40 || secretValue === "" || secretInput.value.length > 40 || phraseValue === "" || phraseInput.value.length > 40) {
		return
	}

	let caesarCipher = alphabet
	keyValue.split("").reverse().forEach((letter) => {
		caesarCipher = letter + caesarCipher.replace(letter, "")
	})

	let vigenereTableRow = caesarCipher
	const vigenereTable = []
	caesarCipher.split("").forEach((letter) => {
		vigenereTable.push(vigenereTableRow)
		vigenereTableRow = vigenereTableRow.replace(letter, "") + letter
	})

	square.innerHTML = ""
	vigenereTable.forEach((vigenereTableRow) => {
		const vigenereTableRow_string = vigenereTableRow.split("").reduce((acc, letter) => `${acc}<td>${letter}</td>`, "")
		square.innerHTML = square.innerHTML + `<tr>${vigenereTableRow_string}</tr>`
	})

	let secretRepeated = ""
	phraseValue.split("").forEach((_, index) => {
		secretRepeated += secretValue.split("")[index % secretValue.length]
	})

	let encrypted = ""
	let lineStyles = []
	let intersectionStyles = []
	secretRepeated.split("").forEach((_, index) => {
		const row = caesarCipher.indexOf(secretRepeated[index])
		const column = caesarCipher.indexOf(phraseValue[index])
		encrypted += `<span tabindex="0" row="${row + 1}" column="${column + 1}">${vigenereTable[row][column]}</span>`
		lineStyles.push(`:root:has([row="${row + 1}"][column="${column + 1}"]:is(:hover, :focus)) [id="square"] tr:nth-of-type(${row + 1})`)
		lineStyles.push(`:root:has([row="${row + 1}"][column="${column + 1}"]:is(:hover, :focus)) [id="square"] tr td:nth-of-type(${column + 1})`)
		intersectionStyles.push(`:root:has([row="${row + 1}"][column="${column + 1}"]:is(:hover, :focus)) [id="square"] tr:nth-of-type(${row + 1}) td:nth-of-type(${column + 1})`)
	})

	output.innerHTML = encrypted
	outputStyles.textContent = `${lineStyles.join(", ")} {
	color: var(--color-maple);
	font-weight: var(--font-weight-bold);
}
${intersectionStyles.join(", ")} {
	background-color: var(--color-maple);
	color: var(--color-snowy);
	transform: scale(1.1);
}`
}

[keyInput, secretInput, phraseInput].forEach((input) => {
	input.addEventListener("change", () => {
		translate()
	})
	input.addEventListener("input", () => {
		translate()
	})
})
</script>
