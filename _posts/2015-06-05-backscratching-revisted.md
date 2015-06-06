---
layout: article
categories: article

date: 2015-06-05 11:00:00

title: Backscratching Revisted
lede: I revised my original technique for styling default elements and took it a step further to scratch the greatest number of backs.
tags:
- css
- tutorials

shorturl: 07yew
comments: true
---

You may recall in [I’ll Scratch Your Back, And Mine Too]({% post_url 2013-10-29-ill-scratch-your-back %}), I documented a technique I came up with to style default elements. To recap, this comes with a couple of advantages: managing styles for default elements is a lot easier for development, and makes writing content for non-technical users as simple as possible—coupled with a nice WYSIWYG or knowledge of Markdown.


--------


I’ve been revising the CSS architecture of my website recently trying to learn and expose myself to various techniques to see what works the best and feels the best for me. Alongside that, I’ve been lightly salting my HTML with little nuggets of [accessibility](http://a11yproject.com/) in the form of [Microdata](http://schema.org/docs/documents.html).

In doing this research, I learned a lot about the [title attribute on anchors](https://silktide.com/i-thought-title-text-improved-accessibility-i-was-wrong/) and how to properly present content for impaired users. Specifically, I learned about a technique that has relatively broad use for hiding anchor text that isn’t important to the visual journey but would be for someone with a visual impairment—that is to use a `<span>` to designate visually-hidden text inside an anchor.

{% highlight html %}
<a href="/article/interesting-article"><span>Continue reading </span>Interesting Article by Emily</a>
{% endhighlight %}

{% highlight css %}
a span {
    width:  1px;
    height: 1px;
    position: absolute;
    overflow: hidden;
    clip: rect(1px, 1px, 1px, 1px);
}
{% endhighlight %}

The CSS technique above for hiding the span, itself, is a piece of code that seems more verbose than necessary—`display: none;` would work just as well to hide the element—but unlike `display: none;` it does not take your element out of the flow of the page, allowing it to be read as any other text by screen readers.

In my actual SCSS I abstract the "hiding" CSS out and `@extend` it where I need it, like so:

{% highlight scss %}
.hide,
.hidden {
    width:  1px !important;
    height: 1px !important;
    position: absolute !important;
    overflow: hidden !important;
    clip: rect(1px, 1px, 1px, 1px) !important;
}

a {
    span {
        @extend .hidden;
    }
}
{% endhighlight %}


--------


{% include heading.html title="One Step Further" %}

We can take this even further by slowing down a touch. What happens if we *want* a span inside out anchor?

{% highlight html %}
<a href="/article/interesting-article"><span>Continue reading</span>Interesting Article by <span class="author--emily">Emily</span></a>
{% endhighlight %}

Looks like we’ve been a bit heavy-handed in hiding *all* spans nested inside anchors.





I’ve revised this technique a bit further since writing the article. One thing this technique doesn't take into consideration is [accessibility](http://a11yproject.com/) or [microdata](http://schema.org/docs/documents.html), which I have since implemented lightly on my website.

I have to reiterate that this technique needs to be taken with a grain of salt. **Do not copy-pasta this code into your existing codebase without making careful considerations.** Think of it like switching the box model in your CSS—you wouldn’t want to do that without first thinking about how it will affect your current code.

So this extension of the original technique only has a small number of use cases, but it can be very powerful if harnessed correctly. This particular use case comes directly out of my CSS, and I’ll explain below what it’s all about as it ranges a couple of front-end topics.

{% highlight scss %}
a {
    span:not([class]):not([itemprop]) {
        @extend .hidden;
    }
}
{% endhighlight %}

