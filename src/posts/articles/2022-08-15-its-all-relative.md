---
date: 2022-08-15T17:34:30+0100
title: It’s all relative!
description: What’s the deal with relative units? Let’s find out.
tags:
  - css
  - writing
syndicate_to:
  - https://social.chrisburnell.com/users/chris/statuses/108828106678063995
---

You can think of `em` as a multiplier of the `font-size` you would get from `inherit`, i.e. *this* element’s *parent*.

And you can think of `rem` as a multiplier of the `font-size` of the root element, i.e. the `html` element.

To illustrate, let’s look at this example snippet of HTML:

```html
<html>
  <body>
    <parent>
      <element>
```

As we look at each element here, we can notice where things change as we dive into the `<body>` element:

<table>
    <thead>
        <tr>
            <th></th>
            <th><code>1em =</code></th>
            <th><code>1rem =</code></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th><code>&lt;body&gt;</code></th>
            <td><strong>1 ×</strong> <code>&lt;html&gt;</code></td>
            <td><strong>1 ×</strong> <code>&lt;html&gt;</code></td>
        </tr>
        <tr>
            <th><code>&lt;parent&gt;</code></th>
            <td><strong>1 ×</strong> <code class="strong">&lt;body&gt;</code></td>
            <td><strong>1 ×</strong> <code>&lt;html&gt;</code></td>
        </tr>
        <tr>
            <th><code>&lt;element&gt;</code></th>
            <td><strong>1 ×</strong> <code class="strong">&lt;parent&gt;</code></td>
            <td><strong>1 ×</strong> <code>&lt;html&gt;</code></td>
        </tr>
    </tbody>
</table>

## Full tree

When we use **parent-relative** units like `em` or `smaller`, elements can reach back up the HTML tree towards the `<html>` element in order to build a `font-size` that is *relative* to its parent, its parent’s parent, and so on, up to the root element. This allows us to have font sizes that scale predictably from a uniform base and allows changes at a given level to *cascade down the tree* to influence the use of deeper parent-relative units.

```css
body {
  font-size: clamp(1em, 0.75em + 0.8vw, 1.25em);
}
element {
  font-size: 1.5em;
}
```

0. `<body>` has a `font-size` of `clamp(…)`, <br>which equals `clamp(…)` × `<html>`'s `font-size`
0. `<parent>` has a `font-size` of `1em` by default, <br>which equals 1 × `<body>`'s `font-size`
0. `<element>` has a `font-size` of `1.5em`, <br>which equals 1 × `<parent>`'s `font-size`

That means `<element>`'s `font-size` equals:

<figure>
    <samp class="beta  center">1.5 × <var>&lt;parent&gt;</var> × <var>&lt;body&gt;</var> × <var>&lt;html&gt;</var><br>=<br>1.5 &times; 1 &times; clamp(1em, 0.75em + 0.8vw, 1.25em) &times; 1rem<br>=<br><em>between</em> 1.5rem <em>and</em> 1.875rem <em>@ 500–1000px browser width</em></samp>
</figure>

<table>
    <thead>
        <tr>
            <th></th>
            <th>calculated value</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th><code>&lt;body&gt;</code></th>
            <td><code>1rem</code>–<code>1.25rem</code></td>
        </tr>
        <tr>
            <th><code>&lt;parent&gt;</code></th>
            <td><code>1rem</code>–<code>1.25rem</code></td>
        </tr>
        <tr>
            <th><code>&lt;element&gt;</code></th>
            <td><code>1.5rem</code>–<code>1.875rem</code></td>
        </tr>
    </tbody>
</table>

## Broken tree

**However**, if `<parent>` has a non-relative `font-size` set:

```css
body {
  font-size: clamp(1em, 0.75em + 0.8vw, 1.25em);
}
parent {
  font-size: 30px;
}
element {
  font-size: 1.5em;
}
```

What’s different here?

`<parent>` has a `font-size` of `30px`, breaking the chain up the tree to `<body>` and `<html>`, i.e. using *parent-relative units* on a child element (or deeper) of `<parent>` no longer refers back up the HTML tree.

This means `<element>`'s `font-size` equals:

<figure>
    <samp class="beta  center">1.5 × <var>&lt;parent&gt;</var><br>=<br>1.5 &times; 30px<br>=<br>45px</samp>
</figure>

<table>
    <thead>
        <tr>
            <th></th>
            <th>calculated value</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th><code>&lt;body&gt;</code></th>
            <td><code>1rem</code>–<code>1.25rem</code></td>
        </tr>
        <tr>
            <th><code>&lt;parent&gt;</code></th>
            <td><code>30px</code></td>
        </tr>
        <tr>
            <th><code>&lt;element&gt;</code></th>
            <td><code>45px</code></td>
        </tr>
    </tbody>
</table>

## You’re in control

Ultimately, how you choose to structure your CSS is up to you. I enjoy embracing the cascade and building on the responsive nature of relative and parent-relative units. Let me know if you have a different way of thinking about this concept or a different way to utilise units in CSS! You can learn more about [absolute and relative units on MDN](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units).
