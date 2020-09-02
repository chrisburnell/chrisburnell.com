---
draft: true
date: 2020-08-26T12:00:00+0100
title: Behemoth
lede: Ever since hearing of Zach Leatherman’s static site generator, <a href="https://www.11ty.dev/">Eleventy</a>, in 2018, I was entranced, and as much as I still do love Jekyll, my bloated use of it suddenly looked tarnished and worn.
# tags:
#   - eleventy
---

So the seed was planted, and the rabbit-hole deep-dive began, but it seemed like such an undertaking. A major part of the ethos behind my website as it was then had to do with getting more people to create their *own* website, to *own their content*, and lowering the barriers to doing that. It all had to do with a fascination-turned-passion for the [IndieWeb](https://indieweb.org/), a movement dedicated to providing alternatives to the siloed web of today, putting control in the hands of users, rather than the companies operating behemoth social networks.

But I digress—oh, speaking of behemoth—so during the inception of the Jekyll build, one simple avenue for developers to get their own website or blog was to use GitHub Pages, which, *conveniently*, is powered by Jekyll! But it comes with a small but understandable catch: you can't use any Jekyll plugins (except a small but truly incredibly useful handful). I was determined to make my build plugin-free, so I did.

It was a rewarding but painstaking process that evolved over **seven years**, likely because I set high standards for my website, and I kept finding weeds in the garden; there were many intricate parts of the build that were so customised to how I liked to author my posts and how my website was structured, calculated, and built. I did make every endeavour to abstract away the specifics of my needs from whatever little *include* or *snippet* I used, but ultimately it lead to a sluggish build that was difficult to maintain, on top of honestly being an eyesore.

After many failed starts (I swear I must have made half a dozen "cb11ty" folders) and [totally relevant diversions](https://chrisburnell.com/projects/), I began the process of rewriting everything from scratch, and after about two weeks, it was at last complete. I was pretty careful that I wasn’t just moving old weeds into the new garden, but I’m sure some slipped through the cracks.

What makes me positive this was a good move for me is the mentality it’s given me towards maintaining this garden. So often, before, I’d pore through the code powering the website while waiting 2½ minutes for the build to complete because I misspelled a word in a Markdown file. I’d find myself fixing things all over the place, with no real direction to things. I’d revisit code over and over again, flip-flopping between solutions because I needed it to be perfect.

Hypocrite.

One of the other main parts of the ethos behind my website then—and now—is that in front-end development, there’s no one way to do any given thing. Sure, there might be *the most performative way*, but am I really so interested in web development to spend that much time crunching numbers and mix-maxing on *my own website*? Even more so, does the person reading my website notice a difference between a solution that’s 99% of the way there versus the perfect one? *Maybe?* If they’re used to browsing perfect websites, definitely!

*I don’t think so.*
