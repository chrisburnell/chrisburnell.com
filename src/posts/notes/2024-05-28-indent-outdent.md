---
date: 2024-05-28T18:07:40+0800
title: Indent Outdent
description: In the last few days, I’ve been working on a small redesign of my website, and thought I’d share a handy little implementation of CSS Grid I’ve been using to lay out the contents of my pages.
tags:
  - css
  - css-variables
  - weblogpomo
  - weblogpomo2024
post_includes:
  - weblogpomo2024.njk
---

What this implementation does is set up a containment context around my main grid. This grid is set up with a series of named rows that I can slot children elements into, but the part that I really like about this grid are the columns, where the grid defines three named columns. Depending on the `width` / `inline-size` of the container, the size of these columns changes.

First things first, let’s look at the HTML we’re working with.

```html
<main>
	<div class="grid">
		<h1 class="title">Title</h1>
		<p class="description">Description</p>
		<div class="content">
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum suscipit id nulla vitae maximus. In bibendum risus in commodo fermentum.</p>
		</div>
		<aside class="meta">
			<p>published <time datetime="2024-05-28T18:07:40+08:00">28 May 2024</time></p>
			<p>tagged <a href="/tag/css/">css</a>,  <a href="/tag/css-variables/">css-variables</a>, <a href="/tag/weblogpomo2024/">weblogpomo2024</a></p>
		</aside>
	</div>
</main>
```

This is the rough HTML for an example blog post, which contains a title, description, content, and meta information about the post.

The first step in building out this implementation is to define a containment context on the `<main>` element, which wraps the grid.

```css
main {
	container: main / inline-size;
}
```

Next we’ll set up the grid and its rows and columns.

```css
.grid {
	display: grid;
	align-items: start;
	grid-template-rows:
		[title-start]
		auto
		[title-end description-start]
		auto
		[description-end content-start]
		auto
		[content-end meta-start]
		auto
		[meta-end];
	grid-template-columns:
		[indent-start]
		var(--indent-size, 0)
		[indent-end]
		var(--indent-gap, 0)
		[content-start]
		repeat(6, 1fr)
		[content-end]
		var(--outdent-gap, 0)
		[outdent-start]
		var(--outdent-size, 0)
		[outdent-end];
}
```

Now we’ve got our grid in place, complete with named rows and columns. In particular, note that the two outer named columns, `indent` and `outdent` (as well as the gaps between them), have a size of `0`. This is because the four respective CSS Variables (`--indent-size`, `--indent-gap`, `--outdent-gap`, and `--outdent-size`) have not been defined, so the fallback value of `0` is used instead.

We can now use a container query to assign some values to these CSS Variables when the `inline-size` of the `<main>` element is greater than `500px`.

```css
@container (inline-size > 500px) {
	.grid {
		--indent-size: 1fr;
		--indent-gap: 1rem;
		--outdent-gap: 1rem;
		--outdent-size: 1fr;
	}
}
```

The last step is to slot the four content areas into the named rows and columns.

```css
.title,
.description,
.meta {
	grid-column: indent / outdent;
}

.title {
	grid-row: title;
}

.description {
	grid-row: description;
}

.content {
	grid-row: content;
	grid-column: content;
}

.meta {
	grid-row: meta;
}
```

Now we’ve got a layout where three of the four grid items span the full width of the grid, and the content spans only the width of the `content` column.

When the container size is greater than `500px`, the `indent` and `outdent` columns will have a size of `1fr`, so the title, description, and meta information areas will be wider than the content.

At or below `500px`, the `indent` and `outdent` columns will have a size of `0`, so all four grid items will have equal widths.

And that’s all there is to it!

I built a demo on CodePen so you can play with the container to see how the indent and outdent appear at different sizes. Use the handle on the bottom-right of the grid to resize the `<main>` element to see the indent and outdent appear and disappear.

<c-codepen slug="bGyBvyK" height="450px"></c-codepen>
