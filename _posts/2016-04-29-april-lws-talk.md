---
layout: post
categories: article

date: 2016-04-29 12:00:00

title: April LWS Talk
lede: I gave a talk at London Web Standards and asked the question, <q>So how can we write media queries that are both consistent and succinct?</q>
tags:
- css
- collaboration

edit_text: Check out the Talk in question, <a href="/talk/middle-out">Supporting Middle-Out in CSS</a>.

comments: true
shorturl: ndwg7
---


Last week, [I spoke](http://londonwebstandards.org/2016/04/lws-18-april-2016-animation-chats-lwsaniquery/){:rel="external"} at [London Web Standards](http://londonwebstandards.org/){:rel="external"}, a monthly meetup for Web Developers, Designers, UXers, Tech Managers, etc., and talked about writing intelligent *media queries*. Inspired by [Matt Zeunert’s thoughts, reflecting on running a free front-end development course](http://www.mattzeunert.com/2016/01/13/running-a-free-front-end-development-course.html){:rel="external"}, I’ve decided to flesh out some details of the talk that I thought were weak, could use more explanation, and to review how I feel the talk went, and what I might do differently next time.


{% include content/heading.html title='Nerves from Hell' %}

If you know me personally, using only one word, you might accurately describe me as <q>quiet,</q> so for me to speak publicly was really stepping outside of my comfort zone. Of course, teaching front-end development and sharing my passion for it is important to me, so, like writing articles on my website, giving a talk to strangers was an important step in enabling me to do what I *think* I want to do and be good at—teach about and share my passion for the web!

Stage fright is far-too-real for me. The last time I spoke in this kind of capacity was in 2008, when I was still in High School in <span class="canada">Canada</span>. I barely remember being conscious while I gave this talk (was I conscious?)… Next time I give a talk of this magnitude, I think I’ll be more mentally prepared for what I’m going to do. More practice can’t hurt, too.

*Enough about me, though. Let’s jump into the talk.*


{% include content/heading.html title='Performance?' id='performance' %}

When you compare the performance impact of *media queries* versus the impact of a JavaScript framework or a couple of images, it shows us that writing intelligent *media queries* is for the benefit of *us*, *developers*. Writing intelligent CSS relates to how we read it; CSS that is carefully laid-out and follows patterns paints a clearer picture of what the CSS is doing than if the CSS were written without much care, and properties and values are slapped together until the end-result is achieved.

It’s one thing to achieve your end-result styles with your CSS, but to do so in a way that makes sense to you, your teammates, fresh eyes, yourself in a month’s time, and is pared down to the lowest common denominator of CSS is another story.


{% include content/heading.html title='How does this relate to media queries?' id='relation-to-media-queries' %}

Describing *media query* context in CSS can be difficult to do in a spoken language. Therefore it’s important to establish some rules to organise your CSS.

An oft-used method for organising *media queries* comes in the form of some sort of *media query* <q>strategy</q>—you’ve probably heard of one of the more popular strategies, [Mobile First](http://zurb.com/word/mobile-first "Mobile First on ZURB Word Library"){:rel="external"}, which we’ll use as an example to help us think about how we read CSS and what kind of *mental overheard* is introduced by contexts.

{% highlight html %}
<button class="navigation-toggle-button">
    <span>Toggle Navigation</span>
</button>
{% endhighlight %}

{% highlight css %}
.navigation-toggle-button {
    display: inline-block;
    background-image: url("hamburger.png");
    width:  40px;
    height: 40px;
}

.navigation-toggle-button span {
    display: none;
}

@media (min-width: 800px) {
    .navigation-toggle-button {
        background-image: none;
        width:  auto;
        height: auto;
    }

    .navigation-toggle-button span {
        display: inline;
    }
}
{% endhighlight %}

Let’s try to read through this CSS as though we are describing it out-loud or building a mental picture of what’s happening:

> So, we’ve got a <q>navigation toggle button</q> that looks like a hamburger by default, and the text inside the button is hidden. When the browser viewport is *at least* 800 pixels wide, the dimensions of the button are reset, the hamburger image disappears, and the text inside the button is shown.

*Does this make sense?*

A little bit, but it could be more readable. Part of the problem is the *unsetting* or *resetting* property values in the above CSS. But if performance isn’t a factor we should be concerned with, there isn’t a problem with a couple of extra bytes of CSS, right?

Well, no, but when it impacts our ability to quickly and accurately understand what the CSS is describing, frustrations develop.

The problem with *unsetting* or *resetting* property values is it adds unnecessary mental overhead—wherever a property value is *unset* or *reset*, it requires us to switch mental context and understand why the *unset* or *reset* is taking place.

Let’s refactor the CSS to describe the exact same styles but with some readability changes and keeping in mind not to incur any extra mental overhead by keeping contexts explicit from one another.

{% highlight css %}
.navigation-toggle-button {
    display: inline-block;
}

@media (min-width: 800px) {
    .navigation-toggle-button {
        border: 2px solid black;
    }
}

@media (max-width: 799px) {
    .navigation-toggle-button span {
        display: none;
    }

    .navigation-toggle-button {
        background-image: url("hamburger.png");
        width:  40px;
        height: 40px;
    }
}
{% endhighlight %}

*So, does this make more sense?*

To me, it does. To you, maybe it makes less.

We’ve deviated from our established *Mobile First* approach to writing *media queries*, and we’ve lost some organisation in the process! But in trade, we’ve broken our component into multiple explicit contexts which follows a distinct flow of extending the default component.


{% include content/heading.html title='The Bottom Line' %}

> Common sense trumps strict adherence to standards.

If we were to categorise this understandability of CSS into three general categories, in order of most desirable to least desirable, we might end up with something this:

0. Common Sense
  Focusses on the specific context of the component and how to best express its styles. This promotes strong human understanding of the code but can demote organisation and expectation when viewing the codebase holistically.
0. Strict Adherence
  Focusses on delivering and never deviating from an established standard. This promotes rigid organisation and placing each component on a relatively-level playing field but can demote human understanding wherever mental overhead is introduced by switching contexts.
0. Spaghetti
  [Has no focus or purpose. Don’t do it.](https://en.wikipedia.org/wiki/Spaghetti_code "Spaghetti Code on Wikipedia"){:rel="external"}


{% include content/heading.html title='The Next Talk' %}

This certainly isn’t the last talk I’ll give; in fact, I certainly hope it isn’t! Thanks for reading this far, coming out to the talk, or both!

I’ll be sure to make it known when my next talk is. Let me know down in the [the comments](#comments) if you have any comments, suggestions, complaints, or anything else.
