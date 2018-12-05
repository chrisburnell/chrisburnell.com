---
categories: article

date: 2018-10-25 09:00:00

title: Let me show you the door, <code>col-md-4</code>
lede: For over a decade now, it’s been the norm to layout our websites with a system in CSS that divides the page into columns and defines the width for components based on the number of columns it should take up. I’m proposing we drop arbitrary numbers of columns and write CSS that reflects exactly what we want without roundabout definitions imposed by a column-based layout.

tags:
- css

banner:
- death-to-cols@2x.png
- death-to-cols.png
---

If you’ve ever developed a website with *Twitter’s Bootstrap*, *Zurb’s Foundation*, or a similar front-end framework, you’ll be familiar with the concept. Libraries of this sort present the developer with a host of classes and *bits* of CSS to accelerate and jump-start the process of layout.

What I’m proposing is that we do away with this way of thinking about layout on the web.

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
