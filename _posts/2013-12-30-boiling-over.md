---
layout: article
date: 2013-12-30 23:59:59
title: Boiling Over
introduction: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ac elit enim, et tempus nulla.
banner: TODOFILLTHISTODO.png
tags:
- CSS
- Tutorials
---

It wasn’t long ago that one of the biggest challenges for a front end web developer was supporting legacy browsers. Adherence to different rules, new rules, missing rules, special tricks, workarounds... have all been the bane of front-end developers for a number of years. Fortunately, there’s a light at the end of the tunnel.

### IE6 usage is down to [less than 5% worldwide today](http://www.modern.ie/en-us/ie6countdown).

And what’s more, the Microsoft Internet Explorer team have finally embraced the fact that the decade-old browser needs to be phased out:

> Over 10 years ago, a browser was born. Its name was Internet Explorer 6. Now that we're in 2013, in an era of modern web standards, it's time to say goodbye.

<cite class="citation">[Internet Explorer 6 Countdown](http://www.modern.ie/en-us/ie6countdown)</cite>

So now, we’re given more time to look ahead and carefully plot our path with newer technologies. Taking advantage of CSS3’s many powerful functions will not only ensure that your websites are up-to-date, but it can also be loads of fun to play with new code.

--------

In getting to make use of new technologies like transforms and animations, I’ve come across a strange bug I have decided to dub *boiling over*. Basically, what’s happening is we've got a <code>div</code> of a fixed height with a horizontal navigation inside. The anchors in the navigation list items have a <code>border-bottom</code> as well as <code>padding-bottom</code>. When the user hovers over the anchor, the <code>padding-bottom</code> decreases to make room for a bigger <code>border-bottom-width</code>.

	.site-navigation {
	    float: left;
	    list-style: none;
	}
	.site-navigation li {
	    display: inline-block;
	    float: left;
	    height: 5em;
  }
	.site-navigation-link {
	    display: block;
	    height: 3em;
	    padding-bottom: 1em;
	    border-bottom: 1em solid black;
	    transition: all 1s ease-in-out;
	}
	.site-navigation-link:hover {
	    padding-bottom: 0;
	    border-bottom-width: 2em;
	}

Even with <code>overflow: hidden</code> on <code>.site-navigation</code>, we get a bug whenever we hover on and off the anchors quickly where they extend outside the list.





