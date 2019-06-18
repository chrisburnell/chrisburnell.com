---
date: 2018-10-25 09:00:00
title: Let me show you the door, <code>col-md-4</code>
lede: For over a decade now, it's been the norm to layout our websites with a system in CSS that divides the page into columns and defines the width for components based on the number of columns it should take up. I'm proposing we drop arbitrary numbers of columns and write CSS that reflects exactly what we want without roundabout definitions imposed by a column-based layout.
tags:
  - css
banner:
  - death-to-cols.png
  - death-to-cols@2x.png
---

If you’ve ever developed a website with Twitter’s *Bootstrap*, Zurb’s *Foundation*, or a similar front-end framework, you’re likely familiar with the concept of a CSS grid system. Libraries of this sort present the developer with a host of classes and *bits* of CSS to accelerate and jump-start the process of layout.

Specifically, they approach layout by dividing the page into <var>n</var> columns and assigning each section of the page to a different number of these columns, e.g. a 12-column layout being split into a 9-column content section and a 3-column sidebar.

What I’m proposing, and certainly not the first to do so, is that we do away with thinking of layout in terms of columns.

Because we aren’t beholden to using floats anymore, and we have access to superior parts of CSS for layout, the way that we think about layout on the web needs to change.

With flex or grid, it’s trivial now to compose a layout exactly as you and/or your designers visualise it.

### We used to say:

<dl class="full">
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

<dl class="full">
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

One of the major selling points about *Bootstrap* or *Foundation* was the ability to express a variety of layouts with relative ease. By dividing the page into, for example, 12 columns, we can layout halves (6 columns each), thirds (4 columns each), quarters (3 columns each), sixths (2 columns each), and, of course, twelfths (1 columns each).

But these are really just abstractions of how our brain thinks about layout, or at least, how we previously thought about layout before these column-based layout systems became popular and the de facto standard.

This is where CSS Grid really shines and takes away a great deal of mental overhead—even moreso than the column-based systems of yore. These old column-based systems break down any time you want to do something with layout that doesn’t align with your columns. What happens if you need to embed a third-party widget that should always appear at 300 pixels wide?

{% highlight html %}
<div class="row">
    <div class="col-md-3"></div>
    <div class="col-md-5"></div>
</div>
{% endhighlight %}

{% highlight css %}
grid-template-columns: 3fr 5fr;
{% endhighlight %}

An added benefit to CSS Grid here is that we can avoid a lot more media queries thanks to the repeat() function and the auto-fill and auto-fit keywords.
