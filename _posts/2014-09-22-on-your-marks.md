---
layout: article
categories: article

date: 2014-09-22 10:00:00

title: On Your Marks, Get Set, Wait
lede: What’s really important when reading an article online? Content should always come first, and give users the option for more later.
tags:
- javascript
- tutorials

banner:        on-your-marks.png
banner_mobile: on-your-marks_mobile.png

shorturl: sfn8k
comments: true
---

Since the last re-design of my website, I decided to make the switch to [Disqus](https://disqus.com/ "Disqus") for my commenting system. This comes with a couple of disadvantages but also with a few advantages.

<figure>
    <a href="https://disqus.com/">
        <img src="/images/content/disqus-logo-white-blue.png" alt="">
        <figcaption>Disqus &copy; {{ site.time | date: '%Y' }}.</figcaption>
    </a>
</figure>

In this article I’m going to run through how I manage my comments section from a front-end development perspective, with respect to user experience, performance, and accessibility.


{% include heading.html title="The Cons of Disqus" id="cons" %}

- The greatest disadvantage of using Disqus may or may not be obvious, but it means you’re locked into using Disqus for your comments. Disqus do offer [importing](https://help.disqus.com/customer/portal/topics/215157-importing/articles "importing options") and [exporting options](https://help.disqus.com/customer/portal/articles/472149-comments-export "exporting options"), but it’s not a guarantee that whatever commenting platform you want to move from or to will make for an easy, foolproof process.
- It also used to be the case that you needed to have an account with Disqus in order to be able to make comments, but there is now an optional setting that owners can toggle enabling guests to make comments.
- Another issue with Disqus that isn’t terribly relevant anymore today, outside the context of a few edge case users, is that Disqus relies on JavaScript to inject your comments and commenting form onto your page—users with JavaScript turned off won’t be able to comment. I imagine there are also some aggressive ad-block browser plugins which would disallow Disqus from loading, but they’re probably also an edge case. In the case that the user doesn’t have JavaScript turned on, a message is displayed using a `noscript` tag.
- It’s beyond my knowledge how caching is affected by Disqus—whether or not it is cached, or available to be cached offline—but as the *movement* to bring offline support to the web ramps up, this could present an issue.


{% include heading.html title="The Pros of Disqus" id="pros" %}

- Once you’ve signed up for a Disqus account, you’ll be able to comment on just about *any* site that has implemented Disqus for their commenting system.
- Disqus has just about all the bells and whistles you could want for making comments:
    - threaded replies; mentions; notifications
- Robust Administration tools
- Automatic anti-spam filters, and ones you can customise yourself, including:
    - whitelist / blacklist; restricted words
- Option to display related articles from your own blog or from other blogs using Disqus
- Option to add targeted ads and monetise upon clickthroughs


{% include heading.html title="The Weigh In" %}

First, let’s look at some statistics for loading Disqus comments on page load:

- **37%** of an article page’s load time comes from loading Disqus
    - This was tested on my article, <a href="{% post_url 2014-02-09-lets-look-back %}">Let’s Look Back</a>, which has more (heavy) images than any of my other articles—totalling nearly *1MB* of image data—meaning that the percentage of load time dedicated to Disqus could get even higher on my more minimal articles.
- **298kB** of data comes from Disqus’ three servers used to load comments, which isn’t a hell of a lot.
- **40** requests are made from Disqus in order to display the comments section.

By and large, this isn’t a massive hit. But we can *almost* always make things faster. I think it comes down what content is important—most people don’t comment on my articles, which begs the question: do most people care about the comments? That’s a difficult question to answer, but I think the point to drive home is that most people seem not to need the comments section—they’re here to read the articles. Maybe that will change over time, but with a mobile first approach, it’s important to consider what constraints mobile users could be under; namely, poor Internet connection speed and low processing power. The number of users browsing on mobile phones and tablets has only escalated in recent years, and we should be able to cater to their needs in ways other than just building responsively.

<blockquote><p>Basically you shouldn’t impede your users access to your content by requiring them to download things that do not support it. Related articles, comments etc, these are secondary to the content itself, so if the user wants to see that they’ll be happy to exchange a single click over more DB queries at run time, or additional HTTP requests and JS interpretation. Essentially, build it progressively enhanced.</p><cite><a href="http://surfthedream.com.au/" rel="external">Justin Avery</a> of <a href="http://responsivedesign.is/" rel="external">Responsive Web Design</a></cite></blockquote>

So what can we do to reduce the page weight and load time for a majority of users? We can *conditionally load comments* as and when a user wants them.


{% include heading.html title="At My Signal, Unleash Hell" id="at-my-signal" %}

Let’s decide what the conditions are for loading the comments:

0. The user has finished reading the article, gets to the bottom of the page, and wants to read the comments
0. The user navigates to the page from a link that directs them to the comments (with `#comments` appended to the URL)
0. The user clicks a link to the comments section from within the article itself (also by `#comments` being appended to the URL)

Let’s dive into some code. Here’s how I was loading Disqus *non-conditionally*:

{% highlight javascript %}
(function() {
    var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
    dsq.src = '//chrisburnell.disqus.com/embed.js';
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
})();
{% endhighlight %}

I didn’t want to reinvent the wheel, so I followed in the footsteps of others who have done the same thing. First I wanted to create an action for the user to perform if they reached the bottom of an article and want to dip into the comments, and did so with a simple `button`.

<aside><p>Remember, don’t mix classes for styling and javascript hooks. You’ll save yourself potential pains later on at no cost right now!</p></aside>

{% highlight html %}
<button class="show-comments  js-show-comments">Show Comments</button>
{% endhighlight %}

And let’s create some associated JavaScript to create and hook onto our `button` and perform two actions: remove the `button` and load Disqus.

{% highlight javascript %}
var commentsSection = document.getElementById('comments'),
    commentsButton  = document.getElementsByClassName('js-show-comments')[0],
    commentsHash    = ['#comment', '#disqus_thread'];
commentsButton.addEventListener('click', function() {
    showComments();
});
commentsButton.disabled = false;
function showComments() {
    commentsButton.parentNode.removeChild(commentsButton);
    window.scrollTo(0, commentsSection.offsetTop);
    (function() {
        var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
        dsq.src = '//chrisburnell.disqus.com/embed.js';
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
    })();
}
{% endhighlight %}

What we’re doing here is:

0. Assign our `button` to a variable
0. Add an click event listener to our `button` (which fortunately also works via keyboard commands)
0. When the `button` *is* clicked, remove the `button` and load in our comments

--------

Everything’s looking sweet so far, so let’s tackle the 2<sup>nd</sup> and 3<sup>rd</sup> conditions from above: watching for a hash change in the URL (pointing to `#comment`) or catching it when the page is loaded.

<aside><p>Check out the support for <a href="http://caniuse.com/#search=onhashchange">onhashchange on CanIUse</a> before jumping in too deep!</p></aside>

{% highlight javascript %}
var commentsHash = ['#comment', '#disqus_thread'];
commentsHash.forEach( function(hash) {
    if( window.location.hash.indexOf(hash) == 0 ) {
        showComments();
    }
});
window.onhashchange = function() {
    commentsHash.forEach( function(hash) {
        if( location.hash.indexOf(hash) == 0 ) {
            showComments();
        }
    });
}
{% endhighlight %}

What we’re doing here is:

0. Assign our hash value to a variable (because why not?)
0. If the URL already contains our desired hash on page load, run the `showComments()` command
0. If the hash changes in the URL after the page has loaded, and it matches our desired value, run the `showComments()` command

If you remember, the `showComments()` function removes the `button` we created before—we want to do the same thing if `#comment` is in the URL and we’re loading Disqus, as we don’t want or need users to be able to load comments twice; in fact, that would be completely the opposite of what we’re trying to achieve here!

--------

Almost there! Let’s create a failsafe—if our `button` no longer exists when the `showComments()` function is run, that means we’ve already loaded the comments, so we shouldn’t do it again.

<aside><p>This isn’t actually ideal. What would be best would be to attach a callback function after Disqus has finished loading comments and disable our <code>button</code> until it succeeds/fails. Unfortunately, since an update to Disqus in 2012, this doesn’t seem to work as intended anymore. If you know any more about this, please let me know in the <a href="#comments">comments</a>.</p></aside>

{% highlight javascript %}
function showComments() {
    if( document.getElementsByClassName('js-show-comments')[0] ) {
        commentsButton.parentNode.removeChild(commentsButton);
        window.scrollTo(0, commentsSection.offsetTop);
        (function() {
            var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
            dsq.src = '//chrisburnell.disqus.com/embed.js';
            (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
        })();
    }
}
{% endhighlight %}


{% include heading.html title="The Whole Nine Yards" %}

Here’s the entire snippet of code for my comments section:

{% highlight html %}
<section id="comments" class="comments  clear">
    <button class="show-comments  js-show-comments" disabled>Show Comments</button>
    <div id="disqus_thread"></div>
    <noscript>Please enable JavaScript to view comments.</noscript>
</section>
{% endhighlight %}

{% highlight javascript %}
var commentsSection = document.getElementById('comments'),
    commentsButton  = document.getElementsByClassName('js-show-comments')[0],
    commentsHash    = ['#comment', '#disqus_thread'];
commentsHash.forEach( function(hash) {
    if( window.location.hash.indexOf(hash) == 0 ) {
        showComments();
    }
});
window.onhashchange = function() {
    commentsHash.forEach( function(hash) {
        if( location.hash.indexOf(hash) == 0 ) {
            showComments();
        }
    });
}
commentsButton.disabled = false;
commentsButton.addEventListener('click', function() {
    showComments();
});
function showComments() {
    window.scrollTo(0, commentsSection.offsetTop);
    // Only if the button still exists should we load Disqus and remove the button
    if( document.getElementsByClassName('js-show-comments')[0] ) {
        commentsButton.parentNode.removeChild(commentsButton);
        (function() {
            var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
            dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
            (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
        })();
        window.scrollTo(0, commentsSection.offsetTop);
    }
}
{% endhighlight %}

We’ve met all the conditions we set when we embarked upon this task:

0. Create a button to load the comments
0. Load the comments if the page was navigated to with the `#comment` hash
0. Load the comments if the user clicks an anchor to jump to `#comment` section

As we saw in [the statistics](#the-weigh-in "The Weigh In") of Disqus’ impact, these aren’t massive savings, but they’ll certainly help out some of my users whom I know are browsing on slow connections and slow mobile phones.

--------

We still have a small thorn when it comes to users without JavaScript enabled. Of course, the `noscript` tag will display a message, <q>Please enable JavaScript to view comments,</q> but there’s no way for those users to view the comments. On the other hand, Disqus have [discussion pages](https://disqus.com/home/discussion/chrisburnell/a_slice_of_heaven_chris_burnell_28 "Disqus Discussion Page for A Slice of Heaven") for each of your articles, but the URL isn’t predictable enough to print this URL with my CMS ([Jekyll](http://jekyllrb.com/ "Jekyll")) dynamically; furthermore, these pages don’t work without JavaScript enabled anyway.

[A List Apart](http://alistapart.com "A List Apart") has a pretty nice solution to this in the same vein as Disqus, but it works without JavaScript enabled, for example: [this comments page](http://alistapart.com/comments/client-education-and-post-launch-success#337686 "The Comments for Client Education and Post-Launch Success on A List Apart"). Maybe if Disqus was able to give a similar URL back in the case where JavaScript is disabled, but as it’s an external service, this doesn’t seem possible without JavaScript. `https://disqus.com/comments/?url=https://chrisburnell.com/article/a-slice-of-heaven` is a possible solution to a minor problem—let’s hope Disqus implements something like this soon.

--------

Big thanks to [Ben Walters](http://benwaltersweb.co.uk/ "Ben Walters Web"), a JavaScript wizard and close friend of mine, for helping me achieve this solution.

Let me know, as always, [down below](#comments "Jump to the comments") *(treat that link as a proof of concept)* if you have any suggestions for improvements to my code or other ideas on the matter. ’Til next time!
