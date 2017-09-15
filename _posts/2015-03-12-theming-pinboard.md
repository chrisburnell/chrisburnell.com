---
layout: post
categories: article

date: 2015-03-12 10:00:00

title: Theming Pinboard
lede: I recently decided I would embark on the task of theming Pinboard. Here’s how I did it.
tags:
- css
- tutorials
- ux

banner:        theming-pinboard.png
banner_mobile: theming-pinboard_mobile.png

comments: true
shorturl: 1faeu
twitter: true
webmentions: true
---


I’ve been inspired by sites like [CSS Zen Garden](http://www.csszengarden.com){:rel="external"} and [Adactio: Jeremy Keith’s website](https://adactio.com/?skin=zeldman){:rel="external"} to finally tackle a design problem that’ve been dealing with for a couple of months. What really pushed me to do it was a *misleading* tweet by [Jake Archibald](https://jakearchibald.com){:rel="external"}:

<blockquote class="twitter-tweet" lang="en" data-conversation="none"><p>Pinboard implemented their own simpler layout model & used canvas for the drawing which is GPU-backed.</p>— Jake Archibald (@jaffathecake) <a href="https://twitter.com/jaffathecake/status/569894563147608066">February 23, 2015</a></blockquote>
<noscript>Please enable JavaScript to see Twitter-specific components.</noscript>

Excited, I quickly jumped to my *Pinboard* tab and hammered the refresh button. Nothing changed. I dug into my account settings looking for a flag to switch on for this newfangled layout, but couldn’t find one. *What’s going on?!*

<blockquote class="twitter-tweet" lang="en" data-conversation="none"><p>(hah, I mean Flipboard, not Pinboard)</p>— Jake Archibald (@jaffathecake) <a href="https://twitter.com/jaffathecake/status/569895188367319042">February 23, 2015</a></blockquote>
<noscript>Please enable JavaScript to see Twitter-specific components.</noscript>

*Okay then.*

Suddenly annoyed by this fact, I decided I’d once-and-for-all tackle the less-than-ideal design of *Pinboard*, which I use mostly to archive and bookmark pages on the web I don’t want to lose. You can read more about what *Pinboard* is useful for [here](https://pinboard.in/tour){:rel="external"}.

<figure>
    <a href="https://pinboard.in">
        {% include content/img.html src='/images/content/pinboard-logo.png' alt='' %}
        <figcaption>Pinboard © Nine Fives Software.</figcaption>
    </a>
</figure>


{% include content/heading.html title='The First Step' %}

<aside><p>What do I mean when I say <em>theming</em> or <em>skinning</em>? In essense, this the practice of applying a secondary or tertiary design or colour palette to a website or application. You can see this in action on <a rel="external" href="http://www.csszengarden.com">CSS Zen Garden</a> or <a rel="external" href="https://adactio.com/about/site/#skins">Adactio</a>.</p></aside>To begin with, I wanted to find the pain points of *Pinboard’s* default design and address them in my theme. Most of the problems I have with the design have to do with white-space and poorly distinguished categorisation.

<figure>
    <a href="/images/content/pinboard-before@2x.png">
        {% include content/img.html src='/images/content/pinboard-before.png 1x, /images/content/pinboard-before@2x.png 2x' alt='' %}
        <figcaption><p>The <q>before shot.</q></p></figcaption>
    </a>
</figure>

Let’s break down how bookmarks are categorised, at least as far as I use them on *Pinboard*:

- tags
- public/private
- starred/unstarred

So it was important for me to make these parts distinct in the new design, whilst maintaining a level of minimalism and a muted colour palette.


{% include content/heading.html title='<code>injection"); DROP TABLE Bookmarks;--</code>' id='injection' %}

<aside><figure>{% include content/img.html src='/images/content/idontbelievemyeyes.gif' alt='' %}</figure></aside>

That was a <del>hilarious</del> decent joke, right? And I'm sure you appreciated <del>that moment of tear-filled laughter</del> that I tried.

Anyway, I needed to find a way to inject my CSS into pages on *Pinboard*, for which I settled on [Stylish](https://userstyles.org){:rel="external"}, a browser plugin (for [Chrome](https://chrome.google.com/webstore/detail/stylish/fjnbnpbmkenffdnngjfgmeleoegfcffe){:rel="external"}, [Firefox](https://addons.mozilla.org/en-us/firefox/addon/stylish){:rel="external"}, and [Opera](https://addons.opera.com/en-gb/extensions/details/stylish/){:rel="external"}) that <q>lets you easily install [and create] themes and skins for many popular sites.</q>

<figure>
    <a href="https://userstyles.org">
        {% include content/img.html src='/images/content/stylish-logo.png' alt='' %}
        <figcaption>Stylish - Open Source, by contributors.</figcaption>
    </a>
</figure>

The gist of the plugin is that you can define CSS styles and apply them to pages you visit on the web, with the option to restrict collections of styles to URLs and/or URL patterns. The styles are injected with JavaScript into a <samp>style</samp> tag in the <samp>head</samp>:

{% highlight html %}
<style id="stylish-3" class="stylish">
... {}
</style>
{% endhighlight %}

<aside><p>I actually wish that the way in which styles are saved and stored could be improved—after switching to <a rel="external" href="https://git-scm.com">git</a>, I have a tendency to want to add versioning to all of my projects. If there was some sort of <a rel="external" href="https://gist.github.com">GitHub Gist</a> hook or something—Let me know <a href="#comments">in the comments</a> if you know of anything like what I’m looking for!</p></aside>The injected CSS actually refreshes as well, à la [LiveReload](http://livereload.com){:rel="external"}, so you don’t need to refresh your browser when saving changes. The in-browser code editor isn’t terrible either; it’s running on [CodeMirror](http://codemirror.net){:rel="external"}.


{% include content/heading.html title='Good old Brass Tacks' id='brass-tacks' %}

You can either write the stylesheets yourself or choose from [their vast selection](https://userstyles.org/categories){:rel="external"}. If you do install a theme from that repository, the styles manager in the *Pinboard* plugin will actually be able to update from the author at the click of a link. You can even build upon and modify stylesheets which you’ve installed, but I’m unsure what happens if you modify the stylesheet and install an update ([please comment if you do](#comments)).

I took a look at a few of the top plugins available under the [*Pinboard* category](https://userstyles.org/styles/browse/pinboard){:rel="external"} to see how other people were accomplishing their designs—what kind of selector overriding might be necessary, how easy is the markup to manipulate, etc.

After tinkering with my own file for a few days and experimenting through daily use, I came up with what I think is a pretty decent, clean design:

<figure>
    <a href="/images/content/pinboard-after@2x.png">
        {% include content/img.html src='/images/content/pinboard-after.png 1x, /images/content/pinboard-after@2x.png 2x' alt='' %}
        <figcaption>The final piece.</figcaption>
    </a>
</figure>

<figure>
    <a href="/images/content/pinboard-private@2x.png">
        {% include content/img.html src='/images/content/pinboard-private.png 1x, /images/content/pinboard-private@2x.png 2x' alt='' %}
        <figcaption>Private bookmarks.</figcaption>
    </a>
</figure>

<figure>
    <a href="/images/content/pinboard-icons-transition.gif">
        {% include content/img.html src='/images/content/pinboard-icons-transition.gif' alt='' %}
        <figcaption>The icons transition. An example of the new sitewide transitions.</figcaption>
    </a>
</figure>

<figure>
    <a href="/images/content/pinboard-star-transition.gif">
        {% include content/img.html src='/images/content/pinboard-star-transition.gif' alt='' %}
        <figcaption>The ‘star’ feature transition.</figcaption>
    </a>
</figure>


{% include content/heading.html title='Challenges' %}

The CSS that I’ve written isn’t anything for me to brag about; unfortunately, *Pinboard’s* CSS wasn’t exactly the holy grail of CSS to begin with, so having to work with poor CSS specificity was a challenge that was difficult to get around. Essentially in order to theme *any website*, you should be prepared to *(1) write a lot of overqualified selectors*, and *(2) use some reactive <samp>!importants</samp>*.

Once you’ve figured out how to navigate around whatever specificity hurdles may be in your way, you’ve also got to figure out what CSS architecture problems exist, namely: is the markup consistent in its use of the CSS; does the CSS follow any naming conventions or methodologies you should maintain and build upon; how often does the architecture itself actually change—will you have to modify your stylesheet every two weeks?

Some of my personal gripes with *Pinboard’s* CSS specifically included:

- a lot of unnecessary nesting
- over-qualified selectors
- IDs in CSS
- inconsistent use of the CSS in the markup
- inconsistent application of classes/IDs to elements

These factors made it difficult to nail down and style things exactly the way I wanted. It feels awkward for me to write CSS under these restrictions, but it’s always important to remember that although our pursuit of performant CSS is a necessary goal, CSS performance (painting and rendering after load aside) is relatively low on the totem pole.

One avenue I could have investigated, but never did, was a similar browser plugin to modify the HTML of the page in conjunction and to compliment the CSS, but I figured that would result in a heavier performance hit than just injecting a simple stylesheet.


{% include content/heading.html title='Changes' %}

I made a couple of over-arching changes to the CSS of *Pinboard*, which affected the rest of the design, those being:

- responsified the layout with media queries
- applying <samp>box-sizing: border-box;</samp> to the entire document:

{% highlight css %}
html {
    box-sizing: border-box;
}
*, *:before, *:after {
    box-sizing: inherit;
}
{% endhighlight %}

- including *normalize* with <samp>@import</samp>:

{% highlight css %}
@import url("//chrisburnell.com/css/normalize.min.css");
{% endhighlight %}

- changing the base <samp>font-family</samp> to <samp>Open Sans</samp>, hosted by [Google Fonts](https://www.google.com/fonts){:rel="external"} with <samp>@import</samp>:

{% highlight css %}
@import url("//fonts.googleapis.com/css?family=Open+Sans:400italic,400,600");
{% endhighlight %}

- changing the base <samp>font-size</samp> to <samp>16px</samp> and changing many properties to be relative to the <samp>font-size</samp> with <samp>ems</samp> and <samp>rems</samp>
- changing a handful of action buttons from textual links to icon links: star, edit, delete, mark as read
    - for this I used a CSS trick to take the element’s text out of the flow and hide it, and instead display a base64-encoded <samp>background-image</samp> with an arbitary <samp>width</samp>, <samp>height</samp>, and <samp>background-size</samp>

{% include content/code-toggle-top.html %}
{% highlight css %}
.edit_links a.edit,
.edit_links a.edit:visited,
.edit_links a.delete,
.edit_links a.delete:visited,
.edit_links a.mark_read,
.edit_links a.mark_read:visited {
    background-color: transparent;
    background-position: center;
    background-size: 19px 19px;
    background-repeat: no-repeat;
    opacity: .4;
    width:  19px;
    height: 19px;
    display: inline-block;
    padding: .25rem;
    position: relative;
    overflow: hidden;
    vertical-align: middle;
    text-indent: 100%;
    white-space: nowrap;
    -webkit-transition: opacity .1s ease;
            transition: opacity .1s ease;
}
    .edit_links a.edit:hover,
    .edit_links a.edit:focus,
    .edit_links a.delete:hover,
    .edit_links a.delete:focus,
    .edit_links a.mark_read:hover,
    .edit_links a.mark_read:focus {
        opacity: 1;
    }

...

/* dark colour green */
.edit_links a.edit {
    background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lv...);
}
    /* light colour green */
    .edit_links a.edit:hover,
    .edit_links a.edit:focus {
        background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lv...);
    }
{% endhighlight %}
{% include content/code-toggle-bottom.html %}

- modified the colour palette to match [my styleguide]({{ site.baseurl | prepend: site.url }}/style-guide)
- implemented hooks with [IFTTT](https://ifttt.com) to create bookmarks for specific events: Github stars, Twitter favourites, tweets by me with links, etc.


--------


**You can view the final stylesheet that I’m using on Github Gist:**

<nav class="buttons-list" role="navigation">
    <a class="button" href="{{ site.urls.gist }}/ef5367e7dd263356c48a">gist.github.com →</a>
</nav>


{% include content/heading.html title='Conclusion' %}

I’m not trying to point any fingers, but there’s a lesson in there: that it’s our job as developers to eliminate trifling work like this. We need to educate our peers, colleagues, and fellow developers on subjects we’re strong with, building towards the goal of creating a better web for everyone.

I think the ideas discussed in [Rik Schennink’s](http://rikschennink.nl){:rel="external"} article in Smashing Magazine, [Design Last](http://www.smashingmagazine.com/2015/02/20/design-last){:rel="external"}, are a great ethos to take on when building websites. Content is king. If we understand first how we want to present and differentiate content from one another, then the design and development stage is much easier, and promotes a component-driven architecture.

If all we’re doing is changing a few colours, fonts, and sizes of elements on websites we use everyday, and finding it to be a cumbersome task, imagine the difficulty the developers of these websites face when updating their own websites. This isn’t the foundation for the web I want to use and build for in the future. We can do better.
