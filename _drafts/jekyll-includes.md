---
categories: article

date: 2017-09-25 22:00:00

title: Jekyll And Sass, Sitting in a Tree
lede: I’ve been using Jekyll for over three years, and built a series of useful reusable components to streamline my templating and authoring processes.
tags:
- jekyll
- liquid
- tutorials

shorturl: 58xlz
---


While my enthusiasm for writing certainly dwindled in [2016](/search/?query=date:2016), I’m taking a new approach with 2017. I’m dropping my fear of publishing and just getting down to it. Time to get down to brass tacks.

<blockquote>
    <p>Jekyll is a simple, blog-aware, static site generator. It takes a template directory containing raw text files in various formats, runs it through a converter (like Markdown) and our Liquid renderer, and spits out a complete, ready-to-publish static website suitable for serving with your favorite web server.</p>
    <cite><a href="https://jekyllrb.com/" rel="external">Jekyll</a></cite>
</blockquote>

I think it’s worth mentioning that a lot of these snippets of *HTML* and *Liquid* were built as a way for me to experiment with what was a new CMS (*Jekyll*) to me at the time of conception. They also serve as equivalents to functionality usually relegated for *JavaScript*. The overarching purpose of these snippets relates to my templating and content authoring processes, whether it be to automate something, keep my codebase organised, reduce mental overhead, or to enforce a [Single Source of Truth](https://en.wikipedia.org/wiki/Single_source_of_truth){:rel="external"} methodology.

And unfortunately, we’re in the midst of a front-end development trend where *JavaScript* frameworks are being used with increasing popularity, and in many cases, for uses that would only require a far simpler solution. Naturally, the response of a number of Internet users, though still a significant minority, is to [completely block JavaScript from running](https://noscript.net/){:rel="external"} unless explicitly allowed otherwise by the user.

Furthermore, the use of *Ad-Blockers* on the web has only [increased over the last years](https://blog.pagefair.com/2015/ad-blocking-report/){:rel="external"} as the amount of [bullshit on the web](http://deathtobullshit.com/){:rel="external"} continues to rise. Another reason to avoid leaning heavily upon *JavaScript*.

So maybe you can understand why I am adverse to blind overuse of *JavaScript*. I’m certainly not advocating not using it all, nor am I trying to villify the language. I love *JavaScript*. I’m most certainly not trying to get involved in any kind of animosity in the [<dfn title="Progressive Enhancement is a powerful methodology that allows Web developers to concentrate on building the best possible websites while balancing the issues inherent in those websites being accessed by multiple unknown user-agents. - Smashing Magazine">*P*rogressive *E*nhancement</dfn>](https://www.smashingmagazine.com/2009/04/progressive-enhancement-what-it-is-and-how-to-use-it/){:rel="external"} debate. It’s the blind overuse, or blind use at all, that I’m against. Taking the time to assess the landscape you’re building on can be an expensive step, but it’s critical to building a website that serves its purpose efficiently. Regardless of whether you agree with my approach or not, let’s take a look at how I’ve handled these functionalities and streamlined my processes using a combination of *Jekyll*-powered *Liquid* alongside some *Sass*, avoiding *JavaScript* where unnecessary.


{% include content/heading.html title='Linked Headings' %}

When writing articles, I like to provide a way for users to share or link to a certain part of the content, which I do by including anchors to each heading in a post’s content. Users can link to these anchors and new visitors will be jumped right to the pertinent section without needing to dig in or search on their own.

I considered *three* solutions to this:

0. Use *JavaScript* to parse headings in my content and inject the necessary HTML after parsing
  - not using *JavaScript*
0. Maintain the heading anchor’s *HTML* inside my content in every place I want to display a heading (and its associated anchor)
  - this sounds *tedious*
0. Use *Jekyll* to generate the necessary anchors whenever I use a heading
  - requires a change to the way I write *Markdown* headings, deviating entirely from the standard syntax

I opted for the third option in an effort to provide the same functionality for as many users as I can. Further, as the demographic of people visiting my website are more likely to be informed about the possible dangers of blindly running *JavScript* and block *JavaScript*, this concern is a real one of mine.

I did so by leveraging *Jekyll’s* *[includes](https://jekyllrb.com/docs/templates/#includes "Jekyll Templating Includes"){:rel="external"}* to provide the functionality and take the pain away of crafting and maintaining the markup. In fact, I make liberal use of *includes* throughout the templating of my site; anything that is used at least twice is likely to be assigned to an *include*. Maybe it’s overkill, but I like to strive for a *Single Source of Truth* methodology in my codebase *wherever possible*.

So how do I actually get *Jekyll* to build a *heading* and an *associated anchor* in my content?

As I mentioned above, it involves a slight change to the way that I write headings in my *Markdown* content. Instead of writing headings in the traditional Markdown method (with preceding `#`s or <q>underlined</q> by `-`s or `=`s), I have created a *Jekyll* *include* which spits out a heading with its specifics defined in the *include’s* attributes.

{% highlight html %}
<h3 id="brass-tacks">
    Brass Tacks
    <a href="#brass-tacks" class="fragment-anchor">#brass-tacks</a>
</h3>
{% endhighlight %}

Any *Liquid* code in *Markdown* files is parsed, so let’s follow this *include* to its source and see what it does.

{% highlight liquid %}{% raw %}
<!-- 1 -->
{% assign heading_type = 'h3' %}
{% if include.type %}
    {% assign heading_type = include.type %}
{% endif %}

<!-- 2 + 3 -->
{% assign heading_id = include.title | slugify %}
{% if include.id %}
    {% assign heading_id = include.id %}
{% endif %}

<{{ heading_type }} id="{{ heading_id }}">
    {{ include.title }}
    <!-- 4 -->
    {% include content/fragment-anchor.html id=heading_id %}
</{{ heading_type }}>
{% endraw %}{% endhighlight %}

0. The `heading` *include* accepts an optional `type` parameter, which defines the heading tag (`h1`–`h6`). If no `type` parameter is passed, the default is an `h3` tag, as this is the tag I use most often with this *include*.
0. The *include* also accepts an optional `id` parameter, which is used for both the `id` attribute on the heading tag and the target `href` attribute on the fragment anchor tag. If no `id` parameter is passed, the **required** `title` parameter is [slugified](https://jekyllrb.com/docs/templates/){:rel="external"} to automatically generate the `id`.
0. The *include* also accepts a **required** `title` parameter, which becomes the textual contents of the heading. It may also be used to generate the `id` parameter, if it is not passed.
0. A second *include* is called from inside the `heading` *include*, to which we’re passing the `id` of the `heading` *include*.

Let’s see what the `fragment-anchor` *include* looks like.

{% highlight liquid %}{% raw %}
<!-- 1 -->
{% if include.id %}
    {% capture href %}#{{ include.id }}{% endcapture %}
{% elsif include.url %}
    {% assign href = include.url %}
{% endif %}

<!-- 2 -->
{% if include.title %}
    {% capture title %} title="{{ include.title }}"{% endcapture %}
{% endif %}

<!-- 3 -->
{% if include.rel %}
    {% capture rel %} rel="{{ include.rel }}"{% endcapture %}
{% endif %}

<!-- 4 -->
{% if include.tabindex %}
    {% capture tabindex %} tabindex="{{ include.tabindex }}"{% endcapture %}
{% endif %}

<!-- 5 -->
<a href="{{ href }}" class="fragment-anchor"{{ title }}{{ rel }}{{ tabindex }}>{{ href }}</a>
{% endraw %}{% endhighlight %}

{% highlight css %}
.fragment-anchor {
    display: none;
    /* ... */
}
{% endhighlight %}

0. The *include* accepts parameters `id` and `url`, one or the other being **required** for the *include* to function. If an `id` parameter is passed then the `href` attribute of the anchor tag is set to the `id` prepended with `#`, to properly link to the correct heading on the page. If a `url` parameter is passed, then the `href` of the anchor tag is set to the `url`.
0. The *include* also accepts an optional `title` parameter, which equates to a `title` attribute on the anchor tag. If the `title` parameter is not passed, no `title` attribute is printed on the anchor tag.
0. The *include* also accepts an optional `rel` parameter, which equates to a `rel` attribute on the anchor tag. If the `rel` parameter is not passed, no `rel` attribute is printed on the anchor tag.
0. The *include* also accepts an optional `tabindex` parameter, which equates to a `tabindex` attribute on the anchor tag. If the `tabindex` parameter is not passed, no `tabindex` attribute is printed on the anchor tag.
0. For accessibility reasons and a coherent reading experience for screen readers, fragment anchors are always set to `display: none;` to exclude them from being read aloud or included in navigation searches.

{% highlight html %}
<h3 id="brass-tacks">
    Brass Tacks
    <a href="#brass-tacks" class="fragment-anchor">#brass-tacks</a>
</h3>
{% endhighlight %}

This is the fully-generated output of the original *include* in the *Markdown* file.
