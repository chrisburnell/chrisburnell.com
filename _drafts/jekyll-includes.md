---
layout: post
categories: article

date: 2016-05-05 01:00:00

title: Jekyll And Sass, Sitting in a Tree
lede: I’ve been using Jekyll for over 2.5 years, and built a series of useful include components to help simplify and streamline my templating and authoring processes.
tags:
- jekyll
- tutorials

shorturl: 58xlz
comments: true
---

<blockquote>
    <p>Jekyll is a simple, blog-aware, static site generator. It takes a template directory containing raw text files in various formats, runs it through a converter (like Markdown) and our Liquid renderer, and spits out a complete, ready-to-publish static website suitable for serving with your favorite web server.</p>
    <cite><a rel="external" href="http://jekyllrb.com/">Jekyll</a></cite>
</blockquote>

I think it’s worth mentioning that a lot of these snippets of *HTML* and *Liquid* were built as a way for me to experiment with what was a new CMS (Jekyll) to me at the time of conception. They also serve as equivalents to functionality usually relegated for JavaScript. The overarching purpose of these snippets relates to my templating and content authoring processes, whether it be to automate something, keep my codebase organised, remove mental overhead, or to follow a *Single source of truth* methodology.

And unfortunately, we’re in the midst of a front-end development trend where JavaScript frameworks are being used with increasing popularity, and in many cases, for uses that would require a far simpler codebase. Naturally, the response of a minority of Internet users, though still a significant number of them, is to <a rel="external" href="https://noscript.net/">completely block JavaScript from running</a> unless explicitly specified otherwise by the user.

Furthermore, the use of *Ad-Blockers* on the web has only <a rel="external" href="https://blog.pagefair.com/2015/ad-blocking-report/">increased over the last years</a> as the amount of <a rel="external" href="http://deathtobullshit.com/">bullshit</a> continues to rise. Another set of users without JavaScript.

Maybe you can better understand why I am adverse to blind overuse of JavaScript. But regardless of whether you agree with my approach or not, let’s take a look at how I’ve handled these functionalities and streamlined my processes.


{% include content/heading.html title='Headings' %}

When writing articles, I like to provide a way for users to share or link to a certain part of the content, which I do by including anchors to each heading in an article’s content.

Instead of doing this manually, or by limiting the functionality to JavaScript, I decided to use Jekyll’s *[includes](https://jekyllrb.com/docs/templates/#includes "Jekyll Templating Includes")* to provide the functionality and take the pain away of crafting and maintaining the markup. Maybe it’s overkill, but I like to strive for a [Single Source of Truth](https://en.wikipedia.org/wiki/Single_source_of_truth) methodology in my codebase *wherever possible*.

So how do I generate a *heading* and *associated anchor* in my content?

{% highlight markdown %}{% raw %}
Lorem ipsum dolor sit amet, consectetur adipiscing elit.
...
{% include content/heading.html title='Headings' %}
...
Cras ac elit enim, et tempus nulla.
{% endraw %}{% endhighlight %}

Any *Liquid* code in *Markdown* files is parsed, so let’s follow this *include* to its source and see what it does.

{% highlight liquid %}{% raw %}
{% assign heading_type = 'h3' %}                             /* 1 */
{% if include.type %}
    {% assign heading_type = include.type %}
{% endif %}

{% assign heading_id = include.title | slugify %}            /* 2 + 3 */
{% if include.id %}
    {% assign heading_id = include.id %}
{% endif %}

<{{ heading_type }} id="{{ heading_id }}">
    {{ include.title }}
    {% include content/heading-anchor.html id=heading_id %}  /* 4 */
</{{ heading_type }}>
{% endraw %}{% endhighlight %}

0. The `heading` *include* accepts an optional `type` parameter, which defines the heading tag (`h1`–`h6`). If no `type` parameter is passed, the default is an `h3` tag, as this is the tag I use most often with this *include*.
0. The *include* also accepts an optional `id` parameter, which is used for both the `id` attribute on the heading tag and the target `href` attribute on the heading anchor tag. If no `id` parameter is passed, the **required** `title` parameter is [slugified](https://jekyllrb.com/docs/templates/) to automatically generate the `id`.
0. The *include* also accepts a **required** `title` parameter, which becomes the textual contents of the heading. It may also be used to generate the `id` parameter, if it is not passed.
0. A second *include* is called from inside the `heading` *include*, to which we’re passing the `id` of the `heading` *include*.

Let’s see what the `heading-anchor` *include* looks like.

{% highlight liquid %}{% raw %}
{% if include.id %}                                                  /* 1 */
    {% capture href %}#{{ include.id }}{% endcapture %}
{% elsif include.url %}
    {% assign href = include.url %}
{% endif %}

{% assign title = '' %}
{% if include.title %}                                               /* 2 */
    {% capture title %} title="{{ include.title }}"{% endcapture %}
{% endif %}

{% assign rel = '' %}
{% if include.rel %}                                                 /* 3 */
    {% capture rel %} rel="{{ include.rel }}"{% endcapture %}
{% endif %}

<a href="{{ href }}" class="heading-anchor"{{ title }}{{ rel }} aria-hidden="true">{{ href }}</a>  /* 4 */
{% endraw %}{% endhighlight %}

0. The *include* accepts parameters `id` and `url`, one or the other being **required** for the *include* to function. If an `id` parameter is passed then the `href` attribute of the anchor tag is set to the `id` prepended with `#`, to properly link to the correct heading on the page. If a `url` parameter is passed, then the `href` of the anchor tag is set to the `url`.
0. The *include* also accepts an optional `title` parameter, which equates to a `title` attribute on the anchor tag. If the `title` parameter is not passed, no `title` attribute is printed on the anchor tag.
0. The *include* also accepts an optional `rel` parameter, which equates to a `rel` attribute on the anchor tag. If the `rel` parameter is not passed, no `rel` attribute is printed on the anchor tag.
0. For accessibility reasons and a coherent reading experience for screen readers, heading anchors are always set to `aria-hidden="true"` to exclude them from being read aloud or included in navigation searches. *(`aria-hidden="true"` actually triggers `display: none;` on any element with it included, which is part of the removal process for screen readers and accessibility tools)*

{% highlight html %}
Lorem ipsum dolor sit amet, consectetur adipiscing elit.
...
<h3 id="headings">
    Headings
    <a href="#headings" class="heading-anchor" aria-hidden="true">#headings</a>
</h3>
...
Cras ac elit enim, et tempus nulla.
{% endhighlight %}

This is the fully-generated output of the original *include* in the *Markdown* file.












