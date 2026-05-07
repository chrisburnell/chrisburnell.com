---
date: 2026-05-06T18:52:16-0300
title: "New Year, New Server 2: Electric Boogaloo"
description: I got to really put my recently-practised and newly-learned system administrator skills to the test again, mere months after my my last update about migrating the server that hosts my websites. Why’s that, you ask? Because the server host that I switched to has been a major disappointment.
tags:
  - personal
  - sysadmin
---

To cut a long story short—*although, I never seem to be able to tell short stories*—the server host that I switched to at the end of last year employs deceptive pricing tactics.

<q>Advertise price `A`, but deliver price `A × 1.5` after 3 months</q> type of stuff.

And if that wasn’t bad enough, I’ve also been having *horrendous* issues with establishing and maintaining connections to the server. I have lost track of how many times this website’s scheduled and new commit CI workflows failed to sync newly-built files to my server, seemingly at random times and intervals. Checking the logs would reveal that CI (from multiple sources) wouldn’t even be *reaching* my server.

> Just accept the connection, damn it!

Enough was enough.

I got a new server. It’s actually got even better specs for the same price as I was paying, and it’s hosted in Finland instead of the US too! I went scouring through the terminal history on my scorned server and checked through all the places that I was <s>working</s> playing in and have migrated about 95% of everything! Only a few services and bits and bobs remain to be sifted through.

It was also a fun learning experience, as I decided to use [Docker](https://www.docker.com/) this time around to segment the different pieces of software I use to power my [self-hosted stuff](/projects/#self-hosted). I had everything running on <q>bare metal</q> before and felt like I had a decent grasp of how (at least) my setup worked, but jumped at the opportunity to clean things up and learn something new.

Because I spent so much time learning what I was *actually* doing last migration, this one went really smoothly. Things were in places that I expected them to be, I had put effort into organising things, and I was able to reach *real* deep and pull out memories of the migration from four months ago. I’m pretty confident I’ll be able to pull everything that would be missed from my scorned server before it’s decommissioned at the end of this month.

*Cue a post from me in June lamenting tremendous data loss…*

It was great to watch the sparklines on my uptime tracker shoot downward as I migrated my different websites. Across the board I saw response times to uptime pings decrease by ~10&times;! So far so good! 
