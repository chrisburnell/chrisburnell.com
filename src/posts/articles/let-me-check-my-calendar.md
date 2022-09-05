---
draft: true
date: 2020-12-12T09:30:00+0000
title: "Let me check my calendar"
description: "Following in my trend of writing Indieweb-related articles about building for Eleventy, today I’ll show you how to create your own, self-updating ICS calendar feed using microformats."
# syndicate_to:
#   - https://twitter.com/iamchrisburnell/status/
#   - https://mastodon.social/users/chrisburnell/statuses/
---

[https://chrisburnell.com/index.ics](https://chrisburnell.com/index.ics)

Opening that URL in your browser probably won’t do much; not without some kind of extension or future technology I don’t know about *(yet…).

But without getting *my* RSVPs all up in *your* calendars, you can take my word that it’s a valid feed of RSVPs, which you *can* view easily in your browser at this URL:

[https://chrisburnell.com/rsvps/](https://chrisburnell.com/rsvps/)

If you think about it, the only difference between the data behind those two URLs is the syntax that wraps the data, which, ultimately, *can* be communicated in a multitude of ways. Just as I’ve used HTML to present the English words and sentences to human beings (crude as they may be), I can use a standardised format like [microformats](http://microformats.org/) to “tag” that HTML so that *it* can be read and interpreted by things that aren’t human beings (I’m talking about computers).

Before I dive into some terminology, I recommend briefly reading about how [events](https://indieweb.org/event) and [RSVPs](https://indieweb.org/rsvp) are produced and handled in an Indieweb environment—the idea is that rather than using (solely) a third-party service to keep track of who’s attending an event, we can use [Webmentions](https://indieweb.org/webmention) to send this data between our personal websites. In this way, attendees can let organisers know whether they’re able to attend by sending a Webmention marked up with specific microformats that tag the pertinent parts of the attendee’s post. The organisers’ website can then use this microformat-tagged data to generate and even display a list of RSVPs. You can see this action on [this Homebrew Website Club London meetup page](https://www.hwclondon.co.uk/meetups/20190626/).

## How do I do it?

```yaml
in_reply_to: https://hwclondon.co.uk/meetups/20190626
rsvp:
  value: "yes"
  date: 2019-06-26T19:00:00+0100
  finish: 2019-06-26T20:30:00+0100
```
