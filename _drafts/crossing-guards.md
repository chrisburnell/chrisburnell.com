---
categories: article

date: 2017-09-30 12:00:00

title: Crossing Guards
lede: Throttle back on your scroll events and watch out for the IntersectionObserver!
tags:
- javascript
- tutorials

caniuse: true
codepen: true
---


I’m lazy. I’m prone to making mistakes, overlooking obvious details, and underestimating efforts required to reach a goal.

But somehow I manage to overcome my <s>crippling</s> laziness, but I rarely let it affect my output! And many aren’t, but laziness isn’t always a bad thing when it comes to web development. It’s how and where you *choose* to be lazy that makes our choices a positive or negative one.

You might notice I used the words <q>choose</q> and <q>choice</q>. I admit that laziness is often not a choice that I actively make. More often than not, I find myself being lazy without being entirely conscious that I’m doing so! But this is still a *choice*. I’ve *chosen* to turn a blind eye to the warning signs and direct my attention elsewhere.

So, in knowing that I *will* be lazy, I can make some predictions and preparations to cover my lazy ass down the road.


{% include content/heading.html title='What did we do before?' %}

At it’s simplest, we would hook into the window’s `scroll` and `resize` events:

{% highlight javascript %}
let visibilityCheck = function(event) {
    // DO SOMETHING
};

window.addEventListener('scroll', visibilityCheck);
window.addEventListener('resize', visibilityCheck);
{% endhighlight %}

But we run a performance risk with this implementation. And in order to understand the risk, it’s important to also understand a bit about how your browser displays a webpage, and what your browser has to do when you scroll or resize a webpage. I’ll avoid going into labourious detail here, but the basic idea is quite simple: given that the [refresh rate](https://en.wikipedia.org/wiki/Refresh_rate){:rel="external"} of most devices today is <strong>60Hz</strong>—the display refreshes its screen 60 times per second—we can determine that we have a budget of approximately <strong>16ms</strong> to do what we need to do for each frame/display refresh.

<blockquote>
    <p>In reality, however, the browser has housekeeping work to do, so all of your work needs to be completed inside 10ms.</p>
    <cite><a href="https://developers.google.com/web/fundamentals/performance/rendering/" rel="external">Google Web Fundamentals</a></cite>
</blockquote>

This portion of our performance budget is a critical one. It can mean the difference between a smooth website, a positive user experience, and a janky website, a negative user experience.

Imagine that the <q>something</q> we need to do involves checking the visibility percentage of a handful of  elements on the page. As each element becomes <strong>at least 50% visible</strong>, we want to perform an action that element.

Let’s make our scenario even more forgiving and imagine that our users are all extremely loyal to our website (or maybe we control an unavoidable monopoly), so we have no fears of losing users. Our determining factor is simply whether or not the website runs smoothly.

In this instance, our users are used to the UI and the positioning of things. As they scroll quickly and confidently around the website, their browser is silently firing thousands of scroll events, <strong>100%</strong> of which we’re gate-checking before their consequences are delivered to the user. <strong>For every single pixel the user scrolls</strong>, we’re asking the browser to tell us the exact position of a handful of elements.

Of course, the browser is part of a computer and is used to making such quick calculations that, as humans, we’re just not capable of doing even remotely as quickly, but that’s not to say that this job is easy for the browser! Or even that our browsers are doing this in the most efficient way (yet)!


{% include content/heading.html title='How did we solve that?' %}

There are a handful of approaches to prevent our code from thrashing our users' browsers. I won’t highlight all of them here, but two of the most common techniques involve limiting how often we perform our checks.


{% highlight javascript %}
let locked = false;

let visibilityCheck = function(event) {
    if (locked) {
        return;
    }
    locked = true;
    // DO SOMETHING
    locked = false;
};

window.addEventListener('scroll', visibilityCheck);
window.addEventListener('resize', visibilityCheck);
{% endhighlight %}

In this example, we set up a lock to prevent the check from firing if we’re already scrolling or resizing. Each time an event fires, we set our `locked` variable to true, and if the function detects the variable is still true, it prevents the action from carrying out by returning the function.

While we’ve stopped our code from executing every scroll or resize event, we’ve also limited the opportunities in time for our actions to be carried out. Instead of our actions firing at the exact moment they should, we may defer the action to the next frame if too many events occur within our <strong>16ms</strong> budget. The complexity of the code has also increased, and tracking our lock feels a little wonky.


{% highlight javascript %}
let checkTimeout;

let visibilityCheck = function(event) {
    if (checkTimeout) {
        clearTimeout(checkTimeout);
        checkTimeout = null;
    }
    checkTimeout = setTimeout(visibilityAction, 250);
};

let visibilityAction = function() {
    // DO SOMETHING
};

window.addEventListener('scroll', visibilityCheck);
window.addEventListener('resize', visibilityCheck);
{% endhighlight %}

In this example, we set up a timeout so that the check will only run every 250ms at the most. Each event triggers a timeout which calls the action function after 250ms. If another event occurs before this 250ms timeout, the existing timeout will be destroyed and a new 250ms timeout will be created.

This also stops our code from executing every scroll or resize event, we’re also limiting the opportunities for our actions to be carried out. In this case, we could tinker with the <samp>250</samp> value until we find a millisecond value that has a less discernable delay, but the reality is that the ideal delay sits right at our performance budget: <strong>16ms</strong>.

And even then, we’re making a pretty broad assumption about the refresh rates of our users! We can be <strong>pretty sure</strong>, but not <strong>confident</strong> that our users' device screens operate at <strong>60Hz</strong>.

It seems the ideal solution would remove the guesswork in finding the best <q>middle-ground</q> delay and the assumptions we have to make about *refresh rates*.


{% include content/caniuse.html feature='intersectionobserver' %}


An important caveat to note before diving too deep, at least at the time of writing, is that *IntersectionObserver* does not support observing [pseudo-elements](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements){:rel="external"}; rather, the *IntersectionObserver* `observe()` method expects a single, [Element](https://developer.mozilla.org/en-US/docs/Web/API/Element){:rel="external"}-type parameter. While this will make some implementations more verbose, adding HTML solely for the purpose of supporting *IntersectionObserver* functionality, the mental overhead and performance tradeoffs that can be made by utilising *IntersectionObserver* are unquestionably beneficial.


{% highlight javascript %}
let observer = new IntersectionObserver(visibilityCheck, { rootMargin: '0px 0px' });

let visibilityCheck = function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // DO SOMETHING
        }
    });
};

let target = document.querySelector('.target');
observer.observe(target);
{% endhighlight %}
