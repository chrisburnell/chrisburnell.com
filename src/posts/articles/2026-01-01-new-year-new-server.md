---
date: 2026-01-06T15:37:40-0400
title: New Year, New Server
description: "Over the last two weeks, I’ve been toiling away on the ugly underside of this website: the server. It powers and hosts all the data for this and my many other websites, and I thought as we say goodbye to 2025 and welcome in 2026, I’d reminisce on the history of my website."
tags:
  - personal
  - sysadmin
---

## In the beginning…

When I first started publishing on my own domain on the web (under my own name, at least, I’ve been *webmastering* since 2005), I really wanted a WordPress blog, which I thought was the **coolest** thing you could possibly own in 2008. (Things have changed, to say the least!) Somehow, I managed to get one running on a shared hosting provider, and suddenly it felt like a part of *me* was on the Internet now, or at least some kind of extension of myself.

That shared hosting dashboard (*cPanel*) kept my handful of websites going from 2008 until 2014, a **solid** 6 years of service, but it didn’t come without friction.

Unfortunately, the style of the dashboard that is/was common with these types of sharing hosting services feels like it was constructed to be some impossibly-capable tool-belt that extends ad infinitum, but is thrust around you in the vain hope that the little <q>One size fits all</q> label will answer your many questions and provide some level of comfort amidst your utter confusion and horror.

I’m sure this is *exactly* what other folks expect and want of their web hosting dashboard, but this isn’t something that I can effectively learn how to use. I just end up feeling like my grasp is slipping on the surface of a very large, very well-maintained planet. No shade if this stuff is your jam!

Somehow (this isn’t the last time I’ll use that word), I managed to work through this inadequate/over-adequate tooling for years and years, but my skills as a developer eventually caught up with my needs of control over the backend of my websites. I remember starting to *really* detest having to wade through all the pre-installed **junk** in my shared hosting dashboard, but not being nearly interested enough in the dashboard itself to do more than some basic modifications to the UI.

## Taking the reins

By 2014, my role at work and my personal projects had already begun demanding some actual know-how with the command line, and as my familiarity with Node.js and bash grew, it became obvious that I wasn’t destined to chain myself to my shared hosting dashboard forever.

So I decided do something about it.

As someone who <s>spent</s> still spends *tonnes* of my personal time in this <q>space</q>, I have come to realise that the moments where I really enjoy developing and learning are when the virtual space I’m in feels **comfy and familiar**. <q>Flow state</q> and all that jazz.

To me, this is like the difference between following maps and following landmarks and paths your feet have tread a hundred times before. Both methods get you to the same place, but I want *my* steps to be *my own*, not the steps that have been determined for me by someone or something else.

This probably comes from a ~decade of obsessing over the minute details of my website to the point of exhaustion, moving on to modifying and customising my Android phone to a ridiculous degree until it feels *just right*, and looking for something else to dive into and learn about and absorb myself in and transform it into something that feels homey and familiar only to find my itch unscratched.

--------

So it’s been nearly *twelve* years (4,348 days, to be exact) since I first installed the <abbr title="virtual private server, an isolated, virtual environment on a physical server">VPS</abbr> that succeeded the shared hosting that was the home for `chrisburnell.com` et al. for so many years.

This came with a *steep* learning curve, but each step forward brought with it deep lungfuls of fresh air. I got to learn first-hand where the gaps in my knowledge and skills were from years of depending on janky web UIs to manage databases and oversee processes.

I’m super fortunate and grateful to be friends with great people like [Hank Woods](https://www.linkedin.com/in/hank-woods/) and [Callum Loh](https://uk.linkedin.com/in/callum-loh-717b66224) who guided and taught me *boatloads* throughout many of those early, hands-on hours with my new server.

That’s not to say that I didn’t go off and make a shambles of everything when I wasn’t supervised: configuration files in the `tmp` directory, SSHing directly in as root with a far-too-trivial password, binaries where configuration is supposed to go… Name a mistake and I probably made it.

But, somehow (again?), I *MacGyvered* together a mountain out of a molehill, and was finally at a level of control over my website (front and back) that felt like I could work with. There were times it outpaced me or felt like I couldn’t get it to do what I wanted, but without that veil between me and the systems I was trying to interact with, I was able to explore and learn so much, achieve new things that weren’t possible for me before (let alone conceive of), and again, make the environment that I was spending *so much time in* feel like a *home*.

## Clueless

Over some quiet evenings this last December, a old, familiar feeling started to creep back into my mind:

Sure, I’m not making the *total* newbie mistakes anymore, or at least not that often. I can edit and find the stuff that makes my server run. I can handle nginx configuration, I have *enough* of a handle on firewall rules and reverse proxies exposing services to the web, but if anything goes wrong…

Yeah, I ended up creating a grotesque sibling for the shared hosting dashboard that I hated so much, but this behemoth was of my own making… *\*facepalm\**

The difference with *this* behemoth was that when things went wrong, there wasn’t a customer support chat for me to jump into and get things resolved for me. The responsibility was mine and mine alone, and I certainly threw down the gauntlet at my own feet.

I must have been feeling especially self-sabotaging when I decided I wanted to add hosting my own Mastodon instance to my skillset in 2022. It’s a real testament to their documentation that *I* was able to get things running, but I figured it out and have kept it ticking along ever since, but this is where my old VPS’s age really began to show.

After over a decade of mucking around and leaving grease stains on all the server’s good furniture, the toll on the server was showing. Running 3+ database management systems, pumping the traffic of 5+ domains and dozens of subdomain projects through shoddily-configured web servers, and an <q>interesting</q> mishmash of who-knows how many iterations of different projects in different languages written at very different stages of my career was enough, but supporting a Mastodon instance on top of that meant that the server’s memory was running like a lump of molten lava pretty much nonstop.

Not good.

## It’s alive!

So I began researching. Maybe I could just upgrade the server’s capabilities and things would be fine?

But I couldn’t shake that feeling of how great it would feel to start fresh and take the time to actually learn what I’m doing to get things right from the start. At the very least, even if I got things wrong, my attitude this time would be to understand and learn, so I figured I would be capable of understanding *why* it was wrong.

Rather than chasing search queries about my issue for hours, looking for the silver bullet to copy and paste that will <q>just</q> fix things, my plan was to actually read logs and man pages. After all, associating patterns of strings in bash scripts and postgres commands with certain actions is only really one step removed from associating the *phpMyAdmin* logo with the way that I used to interact with databases.

*(Again, to each their own! I’d rather have you on the web with me than not, and I don’t hold any judgement towards how you get comfy and comfortable in your web space. This article’s about me, though!)*

And that solidified it for me. This was happening.

I began shopping around and discovered I could get a server for a comparable, competitive price that had twice the CPUs, memory, storage, and transfer capabilities of my old server. **Lock it in.**

--------

So that’s what I’ve been up to for the last ~2 weeks: slowly trickling stuff across from my old VPS to the new. I started with the straightforward static sites and then moved onto the more complex ones, taking things really slowly to make sure I understood every line of config I authored and looking for ways to DRY things out just enough to build a sweet library of my own reusable stuff while not making it impossible to revisit this stuff in a year’s time and have to re-learn how hundreds of moving pieces fit together. A careful and measured approach.

And I’m *very* pleased to say that my old server is just about ready to be decommissioned! Everything important (read: that I can remember exists) has been ported over and the new server looks to be in great health after a week of stability.

I still need to go through things on the old server with a fine-toothed comb *once* more. There’s so many old and unimportant one-off experiments that I’d like to keep just for the heck of it, but there’s also a lot of files that I can only assume were accidentally saved in the wrong location or moved haphazardly or for some other indecipherable reason. It’s funny, though, to think how much I probably confused myself in 2014!

I was wandering around so naïvely back then, but it’s a fun and nostalgic experience to retrace the first steps I took on fresh earth twelve years ago; to see where my feet took me, what piqued my interest, what parts of the landscape I strayed from out of fear, what parts I let nature take its course out of deference, where I built lookouts and small homes to rest and read in.

One day soon will be the last day I set foot in that space that I know so well, but I haven’t left the experience empty-handed.

Now, I have a map. A map that has all my secret little paths, notes, warnings about <q>here be dragons</q>, all the stuff, all the character that isn’t on the pages of the maps you can get off a shelf. It’s not a perfect map by any means—the corners are dog-earred; words, written in pen, have been scratched out; and, later on, eraser marks betray hidden mistakes in charcoal—this map is far from finished.

But this map that I made is my own.
