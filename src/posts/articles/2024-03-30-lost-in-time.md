---
updated: 2024-04-01T15:25:50+0800
date: 2024-03-30T00:30:00+0800
title: Lost in Time
description: A list of reasons to include the time and timezone in Date strings and some JavaScript functions I use to consume and format them.
tags:
  - eleventy
  - javascript
---

Recently, there’s been a bit of a discussion online about recommending folks add times and timezones to dates on their websites. Since I started keeping a record of my RSVPs to meetups and conferences on my website, and even moreso now that I’ve moved from the UK to Singapore (which is 7–8 timezone hours away), accurately capturing the date *and time* of things has been important to me.

Particularly where I have [an automatically-generated calendar file for my RSVPs](/rsvps.ics), the exact date and time that events take place needs to be accurately described, or I’ll end up with events in my calendar on the wrong day and time. And I definitely don’t want to have to miss any meetups or conferences because I didn’t take the time (pun intended) to correctly capture when events start!

Accurately describing DateTimes is important for other things too. When the time and timezone are omitted from the date of a blog post, there are assumptions that are made on your behalf that you may not even be aware of.

## An example of the pitfalls

Let’s assume that, here in Singapore, it’s the 30<sup>th</sup> of March, and I publish a blog post at 12:30 AM, but only capture the date of the post:

```yaml
date: 2023-03-30
```

This could have some adverse effects not limited to:

- RSS Feed Readers may not show people the post until it’s the 30<sup>th</sup> of March in *their* timezone, which, for people in the furthest timezone, UTC-12, is **20 hours away**.
- Folks who live in timezones earlier than mine (from UTC-12 to UTC+7) would see a post that was published *in the future*, at a time that hasn’t happened yet.
- Displaying the *relative time* of the post (using JavaScript’s `Intl.RelativeTimeFormat`, for example) might display something like <q>This post was published in 20 hours</q>, which is both confusing *and incorrect*, considering the post was just published.

--------

Furthermore, interpreting a DateTime without a time and timezone in JavaScript will probably not give you the time you’re expecting. If I create a new Date in JavaScript, the browser assumes I want it to be formatted relative to *my timezone*:

```javascript
new Date("2024-03-30")
```

```text
Mon Mar 30 2024 08:00:00 GMT+0800 (Singapore Standard Time)
```

That it’s formatted to my local timezone (GMT/UTC+8 in Singapore) is expected and makes some sense, but it also sets the time to the same number of hours from UTC as my timezone offset, resulting in 8 AM.

--------

Now let’s assume that I’m in Halifax, Canada (in the GMT/UTC-3 timezone). If I create a new Date with the exact same input, I get back **the wrong day**!

```javascript
new Date("2024-03-30")
```

```text
Fri Mar 29 2024 21:00:00 GMT-0300 (Atlantic Daylight Time)
```

--------

I haven’t done much testing, but I suspect there are similar issues with how the browser will interpret the `<time>` element’s `DateTime` attribute:

```html
<time datetime="2024-03-30">30 March 2024</time>
```

While the element’s text reads <q>30 March 2024</q>, there’s really no telling how a visitor’s browser will interpret the `DateTime` of the element because we cannot know where our visitors will be (and should not make assumptions, either).

--------

So the browser is making some assumptions on our behalf about how to interpret DateTimes without times and timezones based on where in the world that JavaScript is running. This is why, if you want to accurately describe *when* things happen—in the past, present, *and* future—you **must** include a time and timezone alongside the date.

## Consuming and Formatting DateTimes

With all that being said, let’s take a look at how you could capture dates and times in your code.

On my website, which is built with Eleventy ^[Understanding how <a href="https://www.11ty.dev/docs/dates/">Eleventy handles DateTimes</a> is worth a read.], I use an ISO 8601 string to capture DateTimes:

```yaml
date: 2024-03-25T12:30:00+0800
```

<aside class=" [ box  box--warning ] [ flow ] " title="Why format without a colon in the timezone?">
    <p><strong>Why format the timezone without a colon?<br>(e.g. as <samp>+0800</samp> instead of <samp>+08:00</samp>)</strong></p>
    <p>On my Eleventy website, where post metadata is stored in <a href="https://www.11ty.dev/docs/data-frontmatter/" rel="external noopener">YAML-based front matter</a>, if the colon is included in the timezone, Eleventy will interpret the date as a JavaScript DateTime.</p>
    <p>Unfortunately, when stored in this way, the returned value of <samp>date</samp> will be formatted relative to the local timezone, i.e. wherever the website is built.</p>
    <p>Because I want to <em>preserve</em> the timezone stored in each Date string, I have chosen to format my Date strings as <em>strings</em> rather than <em>JavaScript DateTimes</em>.</p>
</aside>

I also use a library that helps with working with dates and times called [luxon](https://moment.github.io/luxon).

luxon makes it easier to *consume* DateTimes, *manipulate* them if need be (e.g. to add `x` hours to a DateTime), and *convert* them to various formats: [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) and [RFC 3339](https://en.wikipedia.org/wiki/ISO_8601#RFCs) to name a couple ^[Check out this <a href="https://ijmacd.github.io/rfc3339-iso8601/">fantastic chart</a> to see the differences and similarities between ISO 8601 and RFC 3339.].

It also allows me to *preserve timezone offsets* dictated in Date strings, which is a feature I need when there are DateTimes across *different timezones* to consider, as `new Date("...").toISOString()` will always format the given date to be in the UTC timezone.

### Consuming DateTimes

In my website’s build code, I have some filters that I can use in both JavaScript and Nunjucks that help me consume the published (and updated) dates of blog posts, event start and end times for my RSVPs, etc.

For starters, here’s the function that my DateTimes are pumped through:

```javascript
import { DateTime } from "luxon"

/**
 * @param {string} dateString
 * @param {string} format
 * @return {string}
 */
export const formatDatetime = (dateString, format) => {
	return DateTime.fromISO(dateString, { setZone: true }).toFormat(format)
}
```

This function allows me to pass in any given ISO 8601 string and a specified format string and returns a [formatted string](https://moment.github.io/luxon/api-docs/index.html#datetimetoformat) based on the two inputs.

### Printing DateTimes in HTML

If I want to output an RFC 3339 string (e.g. for a `<time>` element’s `datetime` attribute), I can then use this function:

```javascript
/**
 * @param {string} dateString
 * @returns {string}
 */
export const rfc3339Date = (dateString) => {
	return formatDatetime(dateString, "yyyy-MM-dd'T'HH:mm:ssZZ")
}
```

Similarly, for the text *inside* a `<time>` element, I like to print a <q>friendly date</q>, for which I use this function:

```javascript
/**
 * @param {string} dateString
 * @return {string}
 */
export const friendlyDate = (dateString) => {
	return formatDatetime(dateString, "d LLLL yyyy")
}
```

Combining these two in Nunjucks helps keep my markup relatively clean and uncluttered:

{% raw %}
```twig
<time datetime="{{ date | rfc3339Date }}">{{ date | friendlyDate }}</time>
```
{% endraw %}

### Using the time and timezone

Because I have both the time and timezone associated with every ISO 8601 string, it means I can print the exact start and end times that events I’ve RSVPed to:

```javascript
/**
 * @param {DateTime} value
 * @returns {string}
 */
export const friendlyTime = (value) => {
	return formatDatetime(value, "HH:mm ZZZZ")
}
```

{% raw %}
```twig
This event takes place from
<time datetime="{{ rsvp.start | rfc3339Date }}">{{ rsvp.start | friendlyTime }}</time>
until
<time datetime="{{ rsvp.start | rfc3339Date }}">{{ rsvp.end | friendlyTime }}</time>.
```
{% endraw %}

### Other functions

These are just a handful of the DateTime-related functions that I use throughout my website.

You can check out [the full set of functions on GitHub](https://github.com/chrisburnell/chrisburnell.com/blob/d3ad6fe4f65f8914375c978613514fe348b9c969/src/eleventy/filters/dates.js) if you’re curious.

## The takeaway

Keeping an comprehensive record of *when* things happen on your website with both times and timezones is important for a variety of reasons: accuracy across the Earth’s many timezones, the ability to pull out specific times (not just dates) from DateTimes, avoiding problems that come from daylight savings time and publishing from different timezones, etc.

I hope I’ve given you some compelling reasons to start capturing not just the date of your work but the time as well. If you’ve got any questions or suggestions about this or any of the DateTime-based functions I laid out above, please don’t hesitate to [get in touch](/about/#contact)!
