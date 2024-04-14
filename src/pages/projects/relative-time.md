---
title: "&lt;relative-time&gt;"
description: A Web Component to display a relative time.
github: chrisburnell/relative-time
branch: main
npm: "@chrisburnell/relative-time"
emoji: 🕦
license: MIT
tags:
  - html
  - javascript
  - package
  - web-components
---

<noscript><p class=" [ box  box--error ] ">Unfortunately, this Web Component requires JavaScript to function correctly!</p></noscript>

<figure class=" [ box ] [ gamma ] [ requires-js ] ">
    <p><time datetime="{{ global.thisYear }}-04-09T00:00:00+14:00">9 April {{ global.thisYear }}</p>
    <p class=" [ requires-js ] " aria-hidden="true">↓</p>
    <p class=" [ requires-js ] "><relative-time><time datetime="{{ global.thisYear }}-04-09T00:00:00+14:00">9 April {{ global.thisYear }}</relative-time></p>
</figure>

{% include 'package.njk' %}

## Features

<code>&lt;relative-time&gt;</code> is a native Web Component that displays a relative time based on a nested `<time>` element.

## Usage

You start using the <code>&lt;relative-time&gt;</code> Web Component by including a <code>&lt;script&gt;</code> tag in your HTML:

```html
<script type="module" src="relative-time.js"></script>
```

### General usage example

All `<relative-time>` elements must have a `<time>` element inside with a `datetime` attribute.

```html
<relative-time><time datetime="2024-04-09T00:00:00+14:00">9 April 2024</time></relative-time>
```

### Update frequency

By default, `<relative-time>` elements will update their time every 10 minutes or whenever the window/tab loses and gains focus. You can override this by providing an `update` attribute, which represents the number of seconds between each update.

```html
<relative-time update="1"><time datetime="2024-04-09T00:00:00+14:00">9 April 2024</time></relative-time>
```

You can also disable these updates by setting the `update` attribute to `false`.

```html
<relative-time update="false"><time datetime="2024-04-09T00:00:00+14:00">9 April 2024</time></relative-time>
```

### Specific division

By default, the time shown in the countdown will cycle through seconds, minutes, hours, days, weeks, months, and years to show an appropriate representation of the remaining/elapsed time.

You can override this by providing a `division` attribute to force the time shown to be formatted in the given units of time.

```html
<relative-time division="second"><time datetime="2024-04-09T00:00:00+14:00">9 April 2024</time></relative-time>
```

### Maximum division

You can also override the maximum unit of time used by providing a `max-division` attribute. The countdown will only go as high as provided unit of time when displaying the countdown.

```html
<relative-time max-division="minute"><time datetime="2024-04-09T00:00:00+14:00">9 April 2024</time></relative-time>
```
