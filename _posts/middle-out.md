---
layout: article
categories: article

date: 2016-04-19 12:00:00

title: Supporting Middle-Out in CSS
lede: I gave a talk at London Web Standards and asked the question, “So how can we write media queries that are both consistent and succinct?”
tags:
- css
- presentations

shorturl: uanoe
comments: true
---


Last night, <a rel="external" href="http://londonwebstandards.org/2016/04/lws-18-april-2016-animation-chats-lwsaniquery/">I spoke</a> at <a rel="external" href="http://londonwebstandards.org/">London Web Standards</a>, a monthly meetup for Web Developers, and talked about writing “performant” *media queries*.


{% include content/heading.html title='Performance?' id='performance' %}

When you compare the performance impact of *media queries* versus the impact of a Javascript framework or a couple of images, it shows us that writing intelligent *media queries* is for the benefit of *us*, *developers*. Writing intelligent CSS relates to how we read it; CSS that is carefully laid-out and follows patterns paints a clearer picture of what the CSS is doing than if the CSS were written without much care, and properties and values are slapped together until the end-result is achieved.

It’s one thing to achieve your end-result styles with your CSS, but to do so in a way that makes sense to you, your teammates, fresh eyes, yourself in a month’s time, and is pared down to the lowest common denominator of CSS is another story.


{% include content/heading.html title='How does this relate to <em>media queries</em>?' id='relation-to-media-queries' %}

Describing *media query* context in CSS can be difficult to do in a spoken language. Therefore it’s important to establish some rules to organise your CSS.

An oft-used method for organising *media queries* comes in the form of some sort of *media query* “strategy”—you’ve probably heard of one of the more popular strategies, “Mobile First.”

Let’s think about how we read CSS for a moment with an example of how a “Mobile First” strategy might be defined:

```html
<button class="navigation-toggle-button">
    <span>Toggle Navigation</span>
</button>

<nav>
    ...
</nav>
```

```css
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
```

> So, we’ve got a <q>navigation toggle button</q> that looks like a hamburger by default, and the text inside the button is hidden. When the browser viewport is *at least* 800 pixels wide, the dimensions of the button are reset, the hamburger image disappears, and the text inside the button is shown.

```css
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
```

Can it be read like English? Not really.



> Common sense trumps strict adherence to standards.

Common Sense > Strict Adherence > Spaghetti


--------


So how do you choose what Media Query strategy to tread? Do we follow convention blindly? Do we analyse each


--------


You can view the slides <a rel="external" href="http://www.slideshare.net/ChrisBurnell1/supporting-middleout-in-css-61086081/1" title="Supporting Middle-Out in CSS on Slideshare">on Slideshare</a>.
