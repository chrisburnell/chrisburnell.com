---
categories: article

# date: 2017-09-25 22:00:00

title: Jekyll Components
lede: I’ve been using Jekyll for over five years, and built a series of useful reusable components to streamline my templating and authoring processes.
tags:
- jekyll
- liquid

# syndicate_to:
# -
---

I think it’s worth mentioning that a lot of these snippets of *HTML* and *Liquid* were built as a way for me to experiment with what was a new CMS (*Jekyll*) to me at the time of conception. The overarching purpose of these snippets relates to my templating and content authoring processes, whether it be to automate something, keep my codebase organised, reduce mental overhead, or to enforce a [Single Source of Truth](https://en.wikipedia.org/wiki/Single_source_of_truth){:rel="external"} methodology.

And because *Jekyll* is a [static site generator](https://davidwalsh.name/introduction-static-site-generators){:rel="external"}, I don’t mind deferring the heavy-lifting to the build process and away from the user, so many of these components serve as equivalents to functionality usually relegated for *JavaScript*.

Another caveat to the challenge is that my site <s>is</s> was hosted on [GitHub Pages](https://pages.github.com){:rel="external"}, so only a [small set of plugins](https://help.github.com/articles/adding-jekyll-plugins-to-a-github-pages-site/){:rel="external"} are available to use. This means achieving solutions with pure *Liquid*.

{% include_cached content/heading.html title='Footnotes' %}

~~Un~~fortunately, I have a tendency to write quite dryly, as if I’m trying to get recognition for my writing skills in a scientific journal.

So, it goes almost without saying that I need some kind of footnote/endnote solution.

{% highlight liquid %}{% raw %}
{%- assign footnote_count = footnote_count | plus: 1 -%}
<sup>
    <a href="#footnote-{{ footnote_count }}" class="footnote-anchor" id="note-{{ footnote_count }}" title="" aria-describedby="footnotes">
        {{ footnote_count }}
    </a>
</sup>
{% endraw %}{% endhighlight %}

One of the best parts about this simple include is that you don’t need to pass any arguments for it to generate numerical footnotes throughout your content.

{% highlight liquid %}{% raw %}
{% include content/footnote.html %}
{% endraw %}{% endhighlight %}

One tradeoff you have to make with this approach is that you must manually manage your footnotes

{% include content/footnote.html text='These are some words' %}

{% include content/footnote.html text='More words' %}
