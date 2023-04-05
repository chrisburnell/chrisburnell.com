---
updated: 2022-01-24T12:30:00+0000
updated_text: "I’ve since extrapolated on the ideas in this article and built <a href=\"/eleventy-cache-webmentions/\">eleventy-cache-webmentions</a> as a simplified method of retrieving and accessing Webmentions in <a href=\"https://11ty.dev/\" rel=\"external\">Eleventy</a>."
date: 2020-11-23T14:45:00+0000
title: "Time to Cache Up"
description: "For a long time I’ve been searching for a sound solution to storing the entire Webmention history of my blog, as packaging it up with the rest of the repository was not cutting it for me. Enter the world of async."
tags:
  - eleventy
  - indieweb
  - javascript
syndicate_to:
  - https://twitter.com/iamchrisburnell/status/1330889024228233221
  - https://mastodon.social/users/chrisburnell/statuses/105260511557824260
---

One of the great advantages I’ve found in using Eleventy since switching from Jekyll has been its ability to pull in external content and cache it for the build. I first experimented with this using [eleventy-img](https://github.com/11ty/eleventy-img) and [eleventy-fetch](https://github.com/11ty/eleventy-fetch), two Eleventy plugins aimed at simplifying that exact ability of Eleventy’s.

It took some time for the pieces to fall into place—first-of-all was watching [Sia Karamalegos’](https://sia.codes/) talk at [Jamstack Toronto: 11ties](/note/1603756300/) a couple of weeks ago, where she gave an incredible overview of the IndieWeb and how to embrace it without sacrificing connecting with others on social networks. In the talk, she briefly described her solution for fetching fresh Webmentions and caching them for build and even included some fantastic code examples too; how lucky that this would be during a conference about Eleventy!

It was during a pair programming exercise recently that I had a moment of enlightenment as to how I could leverage this advantage even further by using it to not just generate a list of popular pages based on their Webmention count, but also to off-load and privately cache other parts of the source code too, like small directories of breweries and music artists. I’ll be exploring how I can use this more effectively as time goes on, but I found this to be a useful way to pull private information into your build without it appearing in your public repository.

## The Set-up

First, we need to run through a checklist to make sure we’re prepared to build the collection:

1. Set yourself up with [IndieAuth](https://indieauth.com/) and [Webmention.io](https://webmention.io/)
2. [Pull in Webmentions as cached data into your repository](https://gist.github.com/chrisburnell/4e29dcf84431808b6c915d87a3b5790e)
    - Make sure you've set your `WEBMENTION_IO_TOKEN` environment variable, like in a `.env` file.
    - This is heavily inspired and in places downright taken from [Sia Karamalegos](https://sia.codes/posts/webmentions-eleventy-in-depth/), [Max Böck](https://github.com/maxboeck/eleventy-webmentions/blob/master/_data/webmentions.js), and [Zach Leatherman](https://github.com/zachleat/zachleat.com/blob/master/_data/webmentions.js)—many thanks to them for putting most of the work here!
3. [Implement a way to pair Webmentions with posts](https://gist.github.com/chrisburnell/36134bbb26234a4d92423e352a693f44)

## Fetching and caching Webmentions

Once you’re ready to go, you can implement the following:

{% raw %}
```javascript
module.exports = function(eleventyConfig) {
    eleventyConfig.addCollection("popular", async (collection) => {
        return (async () => {
            // 01
            const wm = await webmentions() // 1
            return await collection
                // 02
                .getFilteredByTag("post")
                // 03
                .filter(item => {
                    if ("data" in item && "draft" in item.data) {
                        return false
                    }
                    return true
                })
                // 04
                .filter(item => getWebmentions(wm, item.url).length)
                // 05
                .sort((a, b) => b.date - a.date)
                // 06
                .sort((a, b) => {
                    const alpha = getWebmentions(wm, a.url)
                    const beta = getWebmentions(wm, b.url)
                    return beta.length - alpha.length
                })
                // 07
                .slice(0, 10)
        })()
    })
}
```
{% endraw %}

## What’s going on here?

1. Wait for the fetch/cache lookup for Webmentions to resolve and assign it to a `const`.
2. Begin creating the collection by matching pages that have the `post` tag.
    - *Narrow the matching however you like!*
3. Check that pages are not drafts
    - *Although, it is unlikely that drafts would have many Webmentions!*
4. Check that pages have Webmentions at all—if they do not, discard them from the collection.
5. Sort pages by `date`—this is to ensure that pages with equal popularity appear in chronological order.
    - *This step is optional if pages don’t have a *`date`*.*
6. Sort pages by their number of Webmentions.
7. Limit the collection to `10` items or less; otherwise, we could be generating an enormous set of data that we probably don’t need all of.
    - Once again, this step is optional if you do want to utilise the full ordered collection.

## Using the collection

Use the collection as you would any other, e.g.

{% raw %}
```twig
{% for item in collections.popular %}
    <h2>
        <a href="{{ item.url }}">
            {{ item.data.title }}
        </a>
    </h2>
    <a href="{{ item.url }}#webmentions">
        {{ webmentions | getWebmentions(item.url) | length }} Webmentions
    </a>
{% endfor %}
```
{% endraw %}

to produce markup like this:

```html
<h2>
    <a href="/posts/a/">
        Alpha
    </a>
</h2>
<a href="/posts/a/#webmentions">
    10 Webmentions
</a>

<h2>
    <a href="/posts/c/">
        Gamma
    </a>
</h2>
<a href="/posts/c/#webmentions">
    5 Webmentions
</a>

<h2>
    <a href="/posts/b/">
        Beta
    </a>
</h2>
<a href="/posts/b/#webmentions">
    2 Webmentions
</a>
```

---------

Thanks for following along—I hope you enjoyed this tutorial and found it helpful to your [Eleventy](https://www.11ty.dev/) project, whether it be in joining the [IndieWeb](https://indieweb.org/), adding/caching Webmentions to your website, or adding a popular collection as I’ve shown above!

I’m positive there are some optimisations that could be made here, and I’m more than happy to hear them! Let me know with a reply or even [send me a pull request](https://github.com/{{ author.github }}/{{ site.repository }}).

*Thanks to [Dave Letorey](https://letorey.co.uk) for proofreading, and thanks to my Dad for editing and the title… Cache up, sucker!*
