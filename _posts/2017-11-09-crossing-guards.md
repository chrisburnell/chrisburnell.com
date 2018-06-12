---
categories: article

date: 2017-11-09 17:00:00

title: Crossing Guards
lede: Throttle back on your scroll events and watch out for the IntersectionObserver!
tags:
- javascript
- tutorials

banner:
- crossing-guards@2x.png
- crossing-guards.png
banner_mobile:
- crossing-guards_mobile@2x.png
- crossing-guards_mobile.png

caniuse: true
codepen: true
comments: disqus
shorturl: 84ykc

syndication:
- https://twitter.com/iamchrisburnell/status/928671414017773568
---


Web Developers are excited about the future. Just as we recently saw a feature explosion in *JavaScript* (for good and for worse), we’re preparing for and beginning a feature explosion in *CSS* as well. People seem to be [twice](https://blog.twitter.com/official/en_us/topics/product/2017/Giving-you-more-characters-to-express-yourself.html){:rel="external"} as excited about CSS Grid, CSS Variables, Element Queries, etc. as last year! So while I prepare myself for that tidal wave, I thought I’d take a step outside of my comfort zone to learn about and share some cool *JavaScript* coming into stability today.


--------


On the web, we’re used to change. We embrace change. It’s part of what makes the web unique: an ever-evolving, ever-moving ecosystem of growing users, each with their own ideas, challenges, and goals to bring to the web.

Part of embracing that change means, as builders for the web, we have to be light on our toes and ready to adapt to factors within and without our control. It’s how you prepare and react to the changes that really matters.


{% include content/heading.html title='Hook, Line, & Sinker' %}

If you’ve ever built (or used) a [lazy-loader](https://en.wikipedia.org/wiki/Lazy_loading){:rel="external"} or implemented [infinite-scrolling](https://www.smashingmagazine.com/2013/05/infinite-scrolling-lets-get-to-the-bottom-of-this/){:rel="external"} on a website, you might be familiar with the history of these techniques. Extremely popular within native phone apps for their benefit to loading times and lower bandwidth overhead, *lazy-loading* and *infinite-scrolling* are part of a methodology for building leaner apps and websites, specifically to do with speed and performance of loading times.

In the case of *lazy-loading*, rather than force the browser to download every asset required for a given page to **100% completion** (which may be slow, or even expensive for some users) a division is made between **critical** and **non-critical** assets. In most cases, **critical** assets certainly include any CSS and JavaScript required for the page to function properly, and as such these assets will be downloaded immediately. However, presentational images fall into the **non-critical** category. In the case of these types of images, a lazy-loading technique could be employed which dictates that <q>only when an image is within the viewport should it begin loading.</q>

Similarly, an infinite-scrolling technique typically involves a long list of many items—too many to display on the page at once (to keep the page weight low). When the user reaches the bottom of the list—that is to say that the bottom of the list is visible within the viewport—the next set of `n` items are loaded and placed in the DOM at the bottom of the list. This gives the user the impression that the list is never-ending, as it is technically as limitless as the dataset being represented.

But be aware that these techniques come with their own set of UX and/or performance considerations.


{% include content/heading.html title='Let me take you on a trip down memory lane' %}

Over the many years of employing *lazy-loading*, *infinite-scrolling*, and similar techniques on the web, developers have come up with some clever solutions.

At it’s simplest, we hook into the window’s `scroll` and `resize` events:

{% highlight javascript %}
let visibilityCheck = function(event) {
    // DO SOMETHING
};

window.addEventListener('scroll', visibilityCheck);
window.addEventListener('resize', visibilityCheck);
{% endhighlight %}

But we run a performance risk with this implementation. And in order to understand the risk, it’s important to also understand a bit about how your browser displays a webpage, and what your browser has to do when you scroll or resize a webpage.

Given that the [refresh rate](https://en.wikipedia.org/wiki/Refresh_rate){:rel="external"} of most devices today is **60Hz**—the display refreshes its screen 60 times per second—we can determine that we have a budget of approximately **16 milliseconds** to do what we need to do for each frame/display refresh.

<blockquote>
    <p>In reality, however, the browser has housekeeping work to do, so all of your work needs to be completed inside 10ms.</p>
    <cite class="h-cite"><a href="https://developers.google.com/web/fundamentals/performance/rendering/" rel="external">Google Web Fundamentals</a></cite>
</blockquote>

This might seem like an impossible amount of time to do **anything** with, but for a computer, this isn’t so much of a stretch. That’s not to say that it’s **easy** for the browser, nor that the browser is even doing it in the most efficient manner, in the most efficient circumstances, so we should do what we can to offer the browser any help!

This short, **16ms** portion of our performance budget is a critical one. It can mean the difference between a smooth website, promoting a positive user experience, and a janky website, a wholly negative user experience.

<aside><p>Check out some <a href="https://www.youtube.com/watch?v=Z4I15-7L0ss" title="It's A Bird (1930)" rel="external">old-school stop motion animation</a> to see what 24 frames per second looks like.</p></aside>

If the <q>action</q> we need to perform involves checking the visibility of an element as we move around the page, we need to make sure that any <q>checks</q> we’re making happen in under **16ms**, or we’ll fail to build each <q>frame</q> of the 60 <abbr title="Frames Per Second">FPS</abbr> animation in time. Failing to do so results in frames being painted late or not being painted at all, and the delaying **or** removal of any frames will naturally result in a lower FPS. Too low and your users will start to notice.


--------


As the user scrolls quickly around the website, their browser is silently firing thousands of scroll events, **100%** of which we’re trying to gate-check and  before their consequences are delivered to the user.

<aside><p>For every single pixel the user scrolls, we’re asking the browser to tell us the exact position of a handful of elements.</p></aside>

Like a [gatling gun](https://en.wikipedia.org/wiki/Gatling_gun){:rel="external"}, these events will fire at a rate nearly, if not completely, imperceptible to the human eye. In order to get an idea of the volume of these events, browse to your favourite news site and scroll from the top of the page to the bottom. Try to count the height of the page in pixels. Bonus points (and bonus events) if you do this on a small screen!

Alternatively, check out how much you can resize a page on a pointer-based device. I’ve tried this on a desktop monitor, and was able to get my browser window as large as `1665px × 902px` and as small as `400px × 198px`. That gives me `1265 × 704 = 890,560` possible ways to resize my browser. While I doubt any of your users navigate your site by slinky-ing their browser around the screen, we must be aware of such a situation and do the <q>web development dance</q> of anticipating and preparing for outlier circumstances.


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

In this example, we set up a lock to prevent the check from firing if we’re already scrolling or resizing. Each time an event fires, we set our `locked` variable to true, and if the function runs and detects that the variable is still true, it prevents the action from carrying out by [returning the function](https://stackoverflow.com/questions/3330193/early-exit-from-function){:rel="external"}. If the JavaScript is already busy doing the <q>stuff</q> we want, the lock will be up, and our function will not run completely again until the first pass is complete, upon which time the lock will be lifted and we’ll be free to do more <q>stuff</q>.

While we’ve stopped our code from executing every scroll or resize event, we’ve also limited the opportunities in time for our actions to be carried out. Instead of our actions firing at the exact moment they should, we may defer the action to the next frame if too many events occur within our **16ms** budget. The complexity of the code has also increased, and tracking our lock feels a little wonky.


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

This also stops our code from executing every scroll or resize event, we’re also limiting the opportunities for our actions to be carried out. In this case, we could tinker with the `250` value until we find a millisecond value that has a less discernable delay, but the reality is that the ideal delay sits right at our performance budget: `16ms`.

And even then, we’re making a pretty broad assumption about the refresh rates of our users! We can be **pretty sure**, but not **confident** that our users' device screens operate at **60Hz**.

It seems the ideal solution would remove the guesswork in finding the best <q>middle-ground</q> delay and the assumptions we have to make about refresh rates.


{% include content/heading.html title='Prevalence of Garbage' %}

All of the techniques we’ve covered so far take an approach that, instead of reacting to each individual change as they happen, make proactive, repeated checks and set up reminders (in the form of `setInterval` or `setTimeout`) for the browser to do something with any changes that are found.

Imagine if answering phone calls involved picking up and putting down your phone, constantly, over-and-over, all day, in the hope that eventually someone will be on the other end to talk to you.

**Not ideal.**

Might as well leave your oven on all day and all night, all year, because *eventually* you’ll bake bread, and you *might even* bake bread more than once that year.

**What a waste.**

This is like running back-and-forth across a crosswalk, with a stop sign in hand, hoping that eventually, one of the times that you cross, you’ll find some use by helping someone across road.

{% include content/codepen.html slug='GOrvrJ' theme='tabfree' %}

When we use these `setInterval` / `setTimeout` techniques, this is the kind of functionality we’re creating. We’re not coupling our *observation* and *action* steps in a simple way, and we’re creating arbitrary benchmarks based on our best guesses as developers. What we fail to account for is the unbelievably broad spectrum of devices we might be serving. And it is rightfully so that we should fail to account for this broad spectrum, as any guesses and benchmarks we make sit within a context and hold a bias that the browser/computer would not.

How often should the Crossing Guard cross the road?

Is it better to go back-and-forth often, taking only one person per crossing? Or is it better to delay before each back-and-forth in order to potentially take more than one person per crossing?

We have no way of guaranteeing an accurate <q>fits all</q> guess.


{% include content/heading.html title='What comes next?' %}

Instead of doing so ourselves, let’s instead delegate these <del>guesses</del> decisions to each individual user’s browser and device. Instead of the Crossing Guard running across the road constantly, they should wait until someone needs to cross, and then do so.

{% include content/codepen.html slug='rYjpVJ' theme='tabfree' %}

When we use this *IntersectionObserver* technique, we cease relying on arbitrary benchmarks, and we let the browser do the lifting that we had to burden ourselves with before. Rather than the Crossing Guard repeatedly crossing and hoping to be useful eventually, the Crossing Guard instead waits for any pedestrians before crossing with them.

{% highlight javascript %}
let target = document.querySelector('.target');
let observer = new IntersectionObserver(callback);

let callback = function(entries, observer) {
    entries.forEach(entry => {
        let boundingClientRect = entry.boundingClientRect;
        let intersectionRatio  = entry.intersectionRatio;
        let intersectionRect   = entry.intersectionRect;
        let isIntersecting     = entry.isIntersecting;
        let rootBounds         = entry.rootBounds;
        let target             = entry.target;
        let time               = entry.time;
    });
};

observer.observe(target);
{% endhighlight %}

On top of the performance benefits and relief of mental overhead you’ll gain from this technique, there are also a number of useful properties made available to you, the most useful of which I find to be `entry.intersectionRatio` and `entry.target`. These properties could very likely simplify your existing code, and could even offset the added verbosity you might incur from using *IntersectionObserver* over a previous technique.

Other benefits you’ll reap from *IntersectionObserver* include:

- clean, easily-repeated syntax to create new instances of an *IntersectionObserver*
- simple to begin and stop observing an Element at any point
- ability to observe multiple Elements in different, siloed ways
- simple to define what <q>observed</q> means: visible *at all*, *just* visible, *50%* visible, *100%* visible, etc.

Further, take also careful note of *IntersectionObserver’s* browser support to see if you need the [Polyfill](https://github.com/w3c/IntersectionObserver/tree/master/polyfill){:rel="external"} or not.

{% include content/caniuse.html feature='intersectionobserver' %}

An important caveat to note before diving too deep, at least at the time of writing, is that [*IntersectionObserver*](https://github.com/w3c/IntersectionObserver){:rel="external"} does not support observing [pseudo-elements](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements){:rel="external"}; rather, *IntersectionObserver’s* `observe()` method expects a single, [Element](https://developer.mozilla.org/en-US/docs/Web/API/Element){:rel="external"}-type parameter. While this will make some implementations of *IntersectionObserver* more verbose than their equivalent older techniques, the mental overhead and performance tradeoffs that can be made are unquestionably beneficial.


{% include content/heading.html title='In Conclusion' %}

{% include content/codepen.html slug='JryQoM' %}

*IntersectionObserver* could not be better suited as a technique for *lazy-loading* and *infinite-scrolling*. Because we aren’t defining any benchmarks by which the browser should operate, the limit to the performance with *IntersectionObserver* is defined by the user’s browser, not the developer building the website. This is the keystone of *IntersectionObserver* and other emerging techniques, such as [*ResizeObserver*](https://wicg.github.io/ResizeObserver){:rel="external"} and [*Mutation Observer*](https://dom.spec.whatwg.org/#mutation-observers){:rel="external"}:

Let the developer figure out *what* to do. Let the browser figure out *how* to do it.

The future is looking bright for both *JavaScript* and *CSS*. If we remember to stay light on our toes and ready to adapt, adopting and embracing new technologies will pave the way for more exciting development and a more performant, accessible, and open World Wide Web.
