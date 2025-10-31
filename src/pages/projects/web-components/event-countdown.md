---
title: "&lt;event-countdown&gt;"
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
js_module_includes:
  - node_modules/@chrisburnell/event-countdown/event-countdown.js
---

<noscript><p class=" [ box  box--error ] ">Unfortunately, this Web Component requires JavaScript to function correctly!</p></noscript>

<figure class=" [ box ] [ gamma ] [ requires-js ] ">
    <p>CSS Naked Day starts on 9 April @ 00:00:00 UTC+14 and ends on 9 April @ 23:59:59 UTC-12.</p>
    <p aria-hidden="true">↓</p>
    <p><event-countdown name="CSS Naked Day" annual="true">CSS Naked Day starts on <time start datetime="{{ global.currentYear }}-04-09T00:00:00+14:00">9 April 00:00:00 UTC+14</time> and ends on <time end datetime="{{ global.currentYear }}-04-09T23:59:59-12:00">9 April 23:59:59 UTC-12</time>.</event-countdown></p>
</figure>

{% include 'package.njk' %}

## Features

<code>&lt;event-countdown&gt;</code> is a native Web Component that displays a countdown to an event with a start/end time.

[Check out the demo page.](https://chrisburnell.github.io/event-countdown/demo.html)

## Installation

{% include 'installation.njk' %}

## Usage

You start using the <code>&lt;event-countdown&gt;</code> Web Component by including a <code>&lt;script&gt;</code> tag in your HTML:

```html
<script type="module" src="/event-countdown.js"></script>
```

### General usage example

All `<event-countdown>` elements must include a `name` that represents the name of a given event.

They must also nest one or two `<time>` elements that have a valid `datetime` attribute and a `start`/`end` attribute, denoting the DateTime at which an event starts/ends.

```html
<event-countdown name="CSS Naked Day">
    CSS Naked Day starts on <time start datetime="2024-04-09T00:00:00+14:00">9 April 2024 00:00:00 UTC+14</time>.
</event-countdown>
```

```html
<event-countdown name="CSS Naked Day">
    CSS Naked Day ends on <time end datetime="2024-04-09T23:59:59-12:00">9 April 2024 23:59:59 UTC-12</time>.
</event-countdown>
```

### With both start and end points

By nesting two `<time>` elements, one with a `start` attribute and the other with an `end` attribute, you can represent a period that the event lasts for.

```html
<event-countdown name="CSS Naked Day">
    CSS Naked Day starts on <time start datetime="2024-04-09T00:00:00+14:00">9 April 2024 00:00:00 UTC+14</time> and ends on <time end datetime="2024-04-09T23:59:59-12:00">9 April 2024 23:59:59 UTC-12</time>.
</event-countdown>
```

### Annual events

For events that happen on a specific day and time each year, you can provide an `annual` attribute. This will force the provided date to the current year, and if the event has already passed, increment the year to display next year’s event countdown.

```html
<event-countdown annual="true" name="CSS Naked Day">
    CSS Naked Day starts on <time start datetime="2024-04-09T00:00:00+14:00">9 April 00:00:00 UTC+14</time>.
</event-countdown>
```

### Update frequency

By default, `<event-countdown>` elements will update their time every 10 minutes or whenever the window/tab loses and gains focus. You can override this by providing an `update` attribute, which represents the number of seconds between each update.

```html
<event-countdown update="1" name="CSS Naked Day">
    CSS Naked Day starts on <time start datetime="2024-04-09T00:00:00+14:00">9 April 2024 00:00:00 UTC+14</time>.
</event-countdown>
```

You can also disable these updates by setting the `update` attribute to `false`.

```html
<event-countdown update="false" name="CSS Naked Day">
    CSS Naked Day starts on <time start datetime="2024-04-09T00:00:00+14:00">9 April 2024 00:00:00 UTC+14</time>.
</event-countdown>
```

### Specific division

By default, the time shown in the countdown will cycle through seconds, minutes, hours, days, weeks, months, and years to show an appropriate representation of the remaining/elapsed time.

You can override this by providing a `division` attribute to force the time shown to be formatted in the given units of time.

```html
<event-countdown division="second" name="CSS Naked Day">
    CSS Naked Day starts on <time start datetime="2024-04-09T00:00:00+14:00">9 April 2024 00:00:00 UTC+14</time>.
</event-countdown>
```

### Maximum division

You can also override the maximum unit of time used by providing a `max-division` attribute. The countdown will only go as high as provided unit of time when displaying the countdown.

```html
<event-countdown max-division="minute" name="CSS Naked Day">
    CSS Naked Day starts on <time start datetime="2024-04-09T00:00:00+14:00">9 April 2024 00:00:00 UTC+14</time>.
</event-countdown>
```
