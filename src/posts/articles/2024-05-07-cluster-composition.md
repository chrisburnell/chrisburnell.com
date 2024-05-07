---
date: 2024-05-07T18:39:29+0800
title: The Cluster
description: In this post, I’m going to cover how I use a snippet of CSS for laying out list items that I’m calling a <q>Cluster</q>.
tags:
  - weblogpomo
  - weblogpomo2024
  - css
  - css-variables
---

<p class=" [ rss-only ] "><em>The contents of this post require my website’s CSS to appear properly.<br>See the web version: <a href="{{ canonical }}">{{ canonical }}</a>.</em></p>

In the [*CUBE CSS* methodology](https://cube.fyi), there is the concept of a <q>composition</q>. In short, a composition is a piece of CSS that creates <q>flexible, component-agnostic layout systems that support as many variants of content as possible</q><a href="#fn1" id="fnref1"><sup class="footnote-ref">[1]</sup></a>.

I use my <q>Cluster</q> composition for a number of lists around my website: breadcrumbs, the category/tag lists on post pages, links in the footer, and [response types](https://chrisburnell.com/note/slash-interests/#responses), to name a few.

This composition uses CSS variables with fallback values as a means of creating variants. This means that when the composition’s CSS variables are *not* set, the fallback value is applied, creating the <q>default</q> version of the composition, so by *setting* the CSS variables, we can modify the behaviour of the composition.

Without further ado, here’s the code for my Cluster composition:

```css
.cluster > * {
	display: inline-block;
}
.cluster > *:not(:last-child)::after {
	content: var(--delineator, "·");
	padding-inline: var(--padding-inline, 1em);
	line-height: 0;
}
```

<h2 id="usage">Using the Cluster</h2>

Using the cluster is done by applying the <q>cluster</q> class to some HTML:

```html
<ul class=" [ cluster ] ">
	<li>One</li>
	<li>Two</li>
	<li>Three</li>
</ul>
```

<div class=" [ box ] ">
    <ul class=" [ cluster ] ">
        <li>One</li><li>Two</li><li>Three</li>
    </ul>
</div>

Styling my website’s breadcrumbs is done by setting the `--delineator` variable to a desired value using a class or with inline styles:

```html
<ul class=" [ cluster ] " style="--delineator: '→';">
	<li>One</li>
	<li>Two</li>
	<li>Three</li>
</ul>
```

<div class=" [ box ] ">
    <ul class=" [ cluster ] " style="--delineator: '→';">
        <li>One</li><li>Two</li><li>Three</li>
    </ul>
</div>

And for cases where I want greater spacing between list items, I can set the `--padding-inline` variable to a desired value:

```html
<ul class=" [ cluster ] " style="--padding-inline: 2em;">
	<li>One</li>
	<li>Two</li>
	<li>Three</li>
</ul>
```

<div class=" [ box ] ">
    <ul class=" [ cluster ] " style="--padding-inline: 2em;">
        <li>One</li><li>Two</li><li>Three</li>
    </ul>
</div>

Compositions are a seriously powerful concept that I’ve enjoyed using ever since learning about them from the indomitable [Andy Bell](https://piccalil.li/), and it’s given me a really strong sense of control over the styles that I write.

What methodologies do *you* use when authoring CSS? Do you have any compositions that you find yourself using all over the place? I’d love to learn more about what gives *you* a sense of control over your styles too!

<hr style="--rule-space: var(--size-medium);">

<nav aria-label="Footnotes">
	<ol>
		<li id="fn1">
			<p><a href="https://cube.fyi/composition.html" rel="external noopener">Composition | CUBE CSS</a> <a href="#fnref1">↩︎</a></p>
		</li>
	</ol>
</nav>

--------

{% include 'weblogpomo2024.njk' %}

{% css -%}
[class="language-html"] {
    margin-block-end: 0;
}
{%- endcss %}
