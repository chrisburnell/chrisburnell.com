---
draft: true
date: 2020-02-09T09:31:00+0100
title: Let me show you the door, <code>col-md-4</code>
description: For over a decade now, it’s been the norm to layout our websites with a system in CSS that divides the page into columns and defines the size of components on the page based on the number of columns it should take up. I’m proposing we move away from using arbitrary column counts and write CSS that expresses what we actually want, shedding the limitations imposed by a column-based layout.
# tags:
#   - css
banner:
  url: death-to-cols.png
  alt: TODO
---

You’re likely familiar with the classic CSS grid system I’m talking about if you’ve ever developed a website using Twitter’s *Bootstrap*, Zurb’s *Foundation*, or a similar front end framework like the ol’ [960 Grid System](https://960.gs/). Libraries of this sort present the developer with a large swathe of classes and *bits* of CSS to accelerate and jump-start the process of layout.

Specifically, they approach layout by dividing the width of the page into <var>n</var> (typically 12 or 24) columns and assigning the width of components on the page to a different number of these columns. For example, a <var>12</var>-column layout might be split into a <var>9</var>-column content section and a <var>3</var>-column sidebar. <var>12</var> is an especially common and useful number for layout on the web as it can easily be divided (and normalised) into *halves*, *thirds*, *quarters*, and *sixths*. Others attempt to inject *double* the granularity and opt for a <var>24</var>-column grid; although, you’re certainly not limited to these numbers.

But what about when we want to divide <var>12</var> columns into *fifths*, for a layout where we want five items side-by-side? <var>12</var> / <var>5</var> = <var>2.4</var> is quite unwieldy to work with.

What about when we want to display a section at the *full width of the window* instead of just the span of centered columns? How do we sanely manage the responsive breakpoints where these columns will change their ratios to make better use of screen real-estate?

There are a whole host of reasons to <q>break out</q> out of the defined columns and an infinite number of designs which do not adhere to a <var>12</var>/<var>24</var>/<var>n</var>/*fixed*-column layout.

--------

What I’m proposing, and *certainly* not the first to do so, is that we do away with thinking of layout in terms of <var>n</var> columns.

Because we aren’t beholden to using `floats` anymore and we have access to superior parts of CSS for layout, the way that we think about layout on the web needs to change.

With the power of CSS’s Flex and Grid, it’s trivial now to compose a layout exactly as you and/or your designers visualise it.

### We used to say:

<dl>
    <dt>By default…</dt>
    <dd>
        <ul>
            <li>the layout is composed of <samp>12</samp> columns</li>
            <li>the main content area takes up <samp>8</samp> of those columns</li>
            <li>the sidebar takes up <samp>4</samp> of those columns</li>
        </ul>
    </dd>
    <dt>When the browser viewport is between <samp>500px</samp> and <samp>800px</samp> wide…</dt>
    <dd>
        <ul>
            <li>the layout is composed of <samp>6</samp> columns</li>
            <li>the main content area takes up <samp>4</samp> of those columns</li>
            <li>the sidebar takes up <samp>2</samp> of those columns</li>
        </ul>
    </dd>
    <dt>When the browser viewport is less than <samp>500px</samp> wide…</dt>
    <dd>
        <ul>
            <li>the layout is composed of <samp>1</samp> column</li>
            <li>the main content area and sidebar sit in that <samp>1</samp> column</li>
        </ul>
    </dd>
</dl>

--------

### Now we say:

<dl>
    <dt>By default…</dt>
    <dd>
        <ul>
            <li>the main content area and sidebar sit side-by-side at a <samp>2:1</samp> width ratio</li>
        </ul>
    </dd>
    <dt>When the browser viewport is less than <samp>500px</samp> wide…</dt>
    <dd>
        <ul>
            <li>the main content area and sidebar stack vertically, each taking up the full width</li>
        </ul>
    </dd>
</dl>

--------

One of the major selling points about these classic grid systems was their ability to express a variety of layouts with relative ease. By dividing the page into, for example, 12 columns, we can layout halves (6 columns each), thirds (4 columns each), quarters (3 columns each), sixths (2 columns each), and twelfths (1 columns each).

But these are really just abstractions of how our brain thinks about layout, or at least, how we previously thought about layout before these column-based layout systems became popular and the de facto standard. Moreso, the designs that we come up with are compromised to fit into the framework that we're clinging to.

This is where CSS Flex and Grid really shine and take away a great deal of mental overhead—even moreso than the column-based systems of yore. These old column-based systems break down any time you want to do something with layout that doesn’t align with your columns. What happens if you need to embed a third-party widget that should always appear at 300 pixels wide?

```html
<div class="row">
	<div class="col-md-3"></div>
	<div class="col-md-5"></div>
</div>
```

```css
grid-template-columns: 3fr 5fr;
```

An added benefit to CSS Grid here is that we can avoid a lot more media queries thanks to the `repeat()` function and the `auto-fill` and `auto-fit` keywords.
