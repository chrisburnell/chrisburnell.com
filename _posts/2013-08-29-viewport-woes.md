---
layout: article
categories: article

date: 2013-08-29 12:02:00

title: Viewport Woes
lede: I’ve been around the block and seen just about every combination of variables and syntax in viewport meta tags. What’s the correct way to go about it? And maybe I’ll comment on the state of browsers today as well.
tags:
- html
- tutorials

banner:        viewport-woes.png
banner_mobile: viewport-woes_mobile.png

shorturl: xoskc
comments: true
---


*Oh, and if this article looks too long for a simple little tutorial, that’s because it is—this article is full of my views and opinions on the state of responsive design for browsers in this day and age.*

*So [click here](#plain-and-simple) if you want to jump to the main bit.*


--------


Browsers today can be pretty forgiving to us developers. Even HTML5, which is not at all new anymore, is very lenient about the syntax and formatting of markup. For example, it used to be that a long and unnecessarily complicated doctype would need to be supplied for browsers to properly interpret the page, like `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">`; today it’s as simple as `<!doctype html>`. This leaves developers with a lot of control over their code and allows for more natural coding, as developers are able to write their code how they choose and still remain confident it will work across all relevant devices and browsers.


{% include content/heading.html title='The times, they are a-changing' id='times-are-changing' %}

It used to be the case that 72<abbr title="dots-per-inch">dpi</abbr> was the standard resolution for computer screens (or sometimes 96), and most computers displayed at this resolution; however, since the advent and massive popularity of mobile phones and tablet devices, there really is no standard resolution anymore. Many seem to follow the direction Apple take, likely due to the popularity of their devices, and cater to the resolution of the iPhone, *retina* iPhone, iPad, *retina* iPad, etc. While the resolutions Apple chooses are linear and make sense, it would be a mistake to turn a blind eye to the enormous variation found on Android, Blackberry, etc. devices. The size of the screen and the resolution vary from device to device without any pattern and some mobile devices even have DPI values as high as 300 today. You will have to assess the range you’re catering to and find a middle ground to deliver a fast and crisp experience for your users. as the various companies producing them feel no need to collaborate and try to reach a standard for this, and I don’t think it’s necessary either.

This brings me to my point—that mobile and tablet browsers, though solid, are still new, and we need to tread carefully in our endeavours to cater to as many devices as makes sense for the project. We need to avoid being overly granular and bloating or detracting from the experience and code due to oversights on our part. It’s one thing to use an SVG for your logo; the method of fallback for non-supporting browsers is simple and works as we need it to across the various browsers, old and new.


{% include content/heading.html title='So what makes all this responsive magic work?' id='responsive-magic' %}

It’s the `<meta name="viewport">` tag. This is what defines some key variables for the browser to follow when rendering the HTML and CSS for the page. These key variables are as follows, but not limited to:

- `width`
- `minimum-scale`
- `maximum-scale`
- `initial-scale`
- `user-scalable`

and are implemented like so:

{% highlight html %}
<meta name="viewport" content="width=device-width, minimum-scale=1, maximum-scale=1, initial-scale=1, user-scalable=0">
{% endhighlight %}

These tell the browser a number of things, respectively:

- Set the width of the viewport—`<body>` in most cases—to the width of the device’s screen, in pixels.
- Set the `minimum-scale` the site can be viewed at to 1; for when a user tries to zoom in on something on the site (pinching on mobile, for example).
- Set the `maximum-scale` the site can be viewed at to 1; for when a user tries to zoom out of the site.
- Set the `initial-scale` when the site loads to 1; in this case this does nothing as the minimum and maximum are the same, but you could set minimum to 1, maximum to 2, and initial to 1.5 if that’s what would work on your particular project.
- Toggle whether the user is allowed to rescale the site at all.

For reasons like having a consistent user experience for all users, this is a pivotal piece of your markup and if done incorrectly, could break your entire design and leave you barking up the wrong tree until you realise that yeah, maybe sometimes, syntax matters.


{% include content/heading.html title='Just give it to me plain and simple' id='plain-and-simple' %}

Fine. I’ve rambled enough.

- Separate your variables with commas, *not semicolons*.
- Don’t set an arbitrary width to your page… just don’t do it if you value your time and sanity later on. Responsive design is done best when the page is fluid, so in 99.9% of cases, set this to `device-width`. But this is not a blanket statement, you must assess this on a per-project basis.
- Use `maximum-scale` and `minimum-scale`, other variations don’t cut it.
- Scalable only has one *E*, at the end.

This is one bit of HTML you should be diligent in getting the syntax correct because older browsers and ones that appeared around the advent of mobile phones won’t understand if you’re not very specific (à la olde ways). [Viewport Sizes](http://viewportsizes.com/ "Viewport Sizes") is a great resource of popular devices and their respective viewport attributes.

I’m sure I’ve missed something or even gotten something wrong somewhere. Please let me know in the [comments](#comments) if I did.
