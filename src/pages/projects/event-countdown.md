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

## Features

This Web Component will display a countdown to a given Datetime

## Usage

You start using the <code>&lt;event-countdown&gt;</code> Web Component by including a <code>&lt;script&gt;</code> tag in your HTML:

```html
<script type="module" src="event-countdown.js"></script>
```

### General usage example

All `<event-countdown>` elements must include both a `name` and `start` attribute.

The `name` attribute represents the name of a given event, and the `start` attribute is a valid date string (which is fed into `new Date()`) that represents the start of the event.

```html
<event-countdown name="CSS Naked Day" start="2024-04-09T00:00:00+14:00"></event-countdown>
```

### With end point

By providing an `end` attribute (also a valid date string), you can represent a period that the event lasts for.

```html
<event-countdown name="CSS Naked Day" start="2024-04-09T00:00:00+14:00" end="2024-04-09T23:59:59-12:00"></event-countdown>
```

### Annual events

For events that happen on a specific day and time each year, you can provide an `annual` attribute. This will force the provided date to the current year, and if the event has already passed, increment the year to display next year’s event countdown.

```html
<event-countdown name="CSS Naked Day" start="2024-04-09T00:00:00+14:00" end="2024-04-09T23:59:59-12:00" annual="true"></event-countdown>
```

### Update frequency

By default, `<event-countdown>` elements will update their time every 10 minutes or whenever the window/tab loses and gains focus. You can override this by providing an `update` attribute, which represents the number of seconds between each update.

```html
<event-countdown name="CSS Naked Day" start="2024-04-09T00:00:00+14:00" end="2024-04-09T23:59:59-12:00" update="1"></event-countdown>
```

You can also disable these updates by setting the `update` attribute to `false`.

```html
<event-countdown name="CSS Naked Day" start="2024-04-09T00:00:00+14:00" end="2024-04-09T23:59:59-12:00" update="false"></event-countdown>
```

### Specific division

By default, the time shown in the countdown will cycle through seconds, minutes, hours, days, weeks, months, and years to show an appropriate representation of the remaining/elapsed time.

You can override this by providing a `division` attribute to force the time shown to be formatted in the given units of time.

```html
<event-countdown name="CSS Naked Day" start="2024-04-09T00:00:00+14:00" end="2024-04-09T23:59:59-12:00" division="second"></event-countdown>
```

### Maximum division

You can also override the maximum unit of time used by providing a `max-division` attribute. The countdown will only go as high as provided unit of time when displaying the countdown.

```html
<event-countdown name="CSS Naked Day" start="2024-04-09T00:00:00+14:00" end="2024-04-09T23:59:59-12:00" max-division="minute"></event-countdown>
```
