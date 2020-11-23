---
date: 2020-11-23T14:45:00+0000
title: "Time to Cache Up"
lede: "For a long time I’ve been searching for a sound solution to storing the entire webmention history of my blog, as packaging it up with the rest of the repository was not cutting it for me. Enter the world of async."
---

One of the great advantages I’ve found in using Eleventy since switching from Jekyll has been its ability to pull in external content and cache it for the build. I first experimented with this using [eleventy-img](https://github.com/11ty/eleventy-img) and [eleventy-cache-assets](https://github.com/11ty/eleventy-cache-assets), two Eleventy plugins aimed at simplifying that exact ability of Eleventy’s.

It took some time for the pieces to fall into place—first-of-all was watching [Sia Karamalegos’](https://sia.codes/) talk at [Jamstack Toronto: 11ties](/note/1603756300/) a couple of weeks ago, where she gave an incredible overview of the IndieWeb and how to embrace it without sacrificing connecting with others on social networks. In the talk, she briefly described her solution for fetching fresh webmentions and caching them for build and even included some fantastic code examples too; how lucky that this would be during a conference about Eleventy!

And it was during a pair programming exercise this week that I had a moment of enlightenment as to how I could leverage this advantage even further by using it to not just generate a list of popular posts based on their webmention count, but also to off-load and privately cache other parts of the source code too, like small directories of breweries and music artists. I’ll be exploring how I can use this more effectively as time goes on, but I found this to be a useful way to pull private information into your build without it appearing in your public repository.


## The Set-up

First, we need to run through a checklist to make sure we’re prepared to build the collection:

0. Set yourself up with [IndieAuth](https://indieauth.com/) and [WebMention.io](https://webmention.io/)
0. [Pull in WebMentions as cached data into your repository](https://gist.github.com/chrisburnell/4e29dcf84431808b6c915d87a3b5790e)
    - Make sure you've set your `WEBMENTION_IO_TOKEN` environment variable, like in an `.env` file.
    - This is heavily inspired and in places downright taken from [Sia Karamalegos](https://sia.codes/posts/webmentions-eleventy-in-depth/), [Max Böck](https://github.com/maxboeck/eleventy-webmentions/blob/master/_data/webmentions.js), and [Zach Leatherman](https://github.com/zachleat/zachleat.com/blob/master/_data/webmentions.js)—many thanks to them for putting most of the work here!
0. [Implement a way to pair webmentions with posts](https://gist.github.com/chrisburnell/36134bbb26234a4d92423e352a693f44)

## Fetching and caching webmentions

Once you’re ready to go, you can implement the following:

```javascript{% raw %}
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
{% endraw %}```

## What's going on here?

0. Wait for the fetch/cache lookup for WebMentions to resolve and assign it to a `const`.
0. Begin creating the collection by matching pages that have the `post` tag.
    - *Narrow the matching however you like!*
0. Check that pages are not drafts
    - *Although, it is unlikely that drafts would have many WebMentions!*
0. Check that pages have WebMentions at all—if they do not, discard them from the collection.
0. Sort pages by `date`—this is to ensure that pages with equal popularity appear in chronological order.
    - *This step is optional if pages don’t have a *`date`*.*
0. Sort pages by their number of WebMentions.
0. Limit the collection to `10` items or less; otherwise, we could be generating an enormous set of data that we probably don’t need all of.
    - Once again, this step is optional if you do want to utilise the full ordered collection.

## Using the collection

Use the collection as you would any other, e.g.

```twig{% raw %}
{% for item in collections.popular %}
    <h2>
        <a href="{{ item.url }}">
            {{ item.data.title }}
        </a>
    </h2>
    <a href="{{ item.url }}#webmentions">
        {{ webmentions | getWebmentions(item.url) | length }} webmentions
    </a>
{% endfor %}
{% endraw %}```

to produce markup like this:

```html
<h2>
    <a href="/posts/a/">
        Alpha
    </a>
</h2>
<a href="/posts/a/#webmentions">
    10 webmentions
</a>

<h2>
    <a href="/posts/c/">
        Gamma
    </a>
</h2>
<a href="/posts/c/#webmentions">
    5 webmentions
</a>

<h2>
    <a href="/posts/b/">
        Beta
    </a>
</h2>
<a href="/posts/b/#webmentions">
    2 webmentions
</a>
```

---------

Thanks for following along—I hope you enjoyed this tutorial and found it helpful to your [Eleventy](https://www.11ty.dev/) project, whether it be in joining the [IndieWeb](https://indieweb.org/), adding/caching webmentions to your website, or adding a popular collection as I’ve shown above!

I’m positive there are some optimisations that could be made here, and I’m more than happy to hear them! Let me know with a reply or even [send me a pull request]({{ author.urls.github_repo }}).

*Thanks to my Dad for the title!*
