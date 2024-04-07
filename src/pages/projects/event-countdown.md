---
title: "&lt;event-countdown&gt;"
description: A Web Component to display an event countdown.
github: chrisburnell/event-countdown
branch: main
npm: "@chrisburnell/event-countdown"
emoji: ⏱️
license: MIT
tags:
  - html
  - javascript
  - package
  - web-components
---

<script type="module" src="/js/components/event-countdown.js"></script>

<figure class=" [ box ] [ gamma ] ">
    <event-countdown name="CSS Naked Day" annual="true" start="{{ global.thisYear }}-04-09T00:00:00+14:00" end="{{ global.thisYear }}-04-09T23:59:59-12:00">Unfortunately, this Web Component needs JavaScript to function correctly.</event-countdown>
</figure>

{% include 'package.njk' %}

<code>&lt;event-countdown&gt;</code> is a native Web Component that displays a countdown to the next (or current) CSS Naked Day.

## Usage

You start using the <code>&lt;event-countdown&gt;</code> Web Component by including a <code>&lt;script&gt;</code> tag in your HTML.

### General usage example

```html
<script type="module" src="event-countdown.js"></script>

<event-countdown name="CSS Naked Day" start="2024-04-09T00:00:00+14:00"></event-countdown>
```

### With end point

```html
<script type="module" src="event-countdown.js"></script>

<event-countdown name="CSS Naked Day" start="2024-04-09T00:00:00+14:00" end="2024-04-09T23:59:59-12:00"></event-countdown>
```

### Annual events

```html
<script type="module" src="event-countdown.js"></script>

<event-countdown name="CSS Naked Day" annual="true" start="2024-04-09T00:00:00+14:00" end="2024-04-09T23:59:59-12:00"></event-countdown>
```
