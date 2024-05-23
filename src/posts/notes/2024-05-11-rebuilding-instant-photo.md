---
date: 2024-05-11T22:41:01+0800
title: Rebuilding a Silly Web Component
description: A few months ago I built a fun little experiment of a Web Component, but in today’s post, I’m going to try building it using just CSS.
tags:
  - weblogpomo
  - weblogpomo2024
  - web-components
post_includes: weblogpomo2024.njk
---

<aside class="rss-only"><p>I think the styles and scripts that come with this article are pretty important to the reading experience, so if you want to see the Web Component and its CSS replacement in action, go to the web version: <a href="{{ canonical }}">{{ canonical }}</a>.</p></aside>

I built the [*Instant Photo* Web Component](/instant-photo/) some time ago, but never really wrote about or promoted it, mostly because it was just a fun little experiment. In this post, I’m going to come at the concept from a different angle and see how much of *what* the Web Component does really needs to come from JavaScript, and convert as much of it as I can to use CSS only.

In short, it gives `<img>` tags the appearance of an instant photo (like a Polaroid picture) and provides some controls over its appearance.

<figure>
    <instant-photo develop>
        <img src="/images/avatar@4x.jpeg" alt="Chris Burnell" class=" [ canada ] " width="400" height="400">
    </instant-photo>
</figure>

Realistically, it’s probably better suited as just a bit of CSS, but because JavaScript is able to turn HTML attributes into CSS Variables (as numbers, in particular), I opted to use a Web Component instead of using inline styles to control some of the styling of the image.

But since I’d like to try my hand at representing a like-for-like copy using just CSS, I’m going to give it another look, if only to build a version that doesn’t completely rely on JavaScript.

## The first pass

The Web Component has a number of controls:

- Colour of the paper around the photo (`border-color`)
- Colour of the plastic sheet below the photo (`background-color`)
- Length of time to wait before the photo develops (`animation-delay`)
- Length of time that the photo takes to develop (`animation-duration`)

Fortunately, these controls were already baked into the CSS of the Web Component, so converting them over was relatively quick. I added an extra quality of life improvement here by adding an extra CSS Variable that controls the width, height, and border width of the photo:

- Size of the photo (`inline-size`, `block-size`, `border-width`)

```css
.instant-photo {
	background-color: var(--instant-photo-background-color, #121212);
	display: inline-block;
	border-width: calc(var(--instant-photo-size, 3.1in) * 0.0645);
	border-block-end-width: calc(var(--instant-photo-size, 3.1in) * 0.2903);
	border-style: solid;
	border-color: var(--instant-photo-border-color, #ededed);
}
.instant-photo img {
	inline-size: var(--instant-photo-size, 3.1in);
	block-size: var(--instant-photo-size, 3.1in);
	display: block;
}
.instant-photo.develop img {
	opacity: 0;
	filter: contrast(0%) saturate(50%);
	animation: instant-photo var(--instant-photo-develop-duration, 10s) linear var(--instant-photo-develop-delay, 1s) forwards;
}
@keyframes fadein {
	50% {
		opacity: 1;
		filter: contrast(67%) saturate(80%);
	}
	100% {
		opacity: 1;
		filter: contrast(100%) saturate(100%);
	}
}
```

Now we can use it with this HTML:

```html
<div class="instant-photo  develop">
	<img src="/images/avatar@4x.jpeg" alt="Chris Burnell" width="400" height="400">
</div>
```

<figure>
    <div class="instant-photo  develop">
        <img src="/images/avatar@4x.jpeg" alt="Chris Burnell" width="400" height="400">
    </div>
</figure>

## Early Animations

The only thing missing from the CSS version of this Web Component is the [Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver), which starts the <q>develop</q> animation when Web Components that have the `develop` attribute become visible in the viewport by dynamically applying an additional attribute.

We can actually still achieve this by using the Intersection Observer code from the Web Component and with a small change to the CSS by removing the previous `.instant-photo[develop]` declaration and replacing it with this:

```css
.instant-photo.develop img {
	opacity: 0;
	filter: contrast(0%) saturate(50%);
	animation: none;
}
.instant-photo:is(.develop:not(.will-develop), .visible) img {
	animation: instant-photo var(--instant-photo-develop-duration, 10s) linear var(--instant-photo-develop-delay, 1s) forwards;
}
```

Importantly, this new bit of CSS preserves the animation for elements that should trigger the animation without JavaScript with just the `develop` class. Now we can use JavaScript to watch elements with the `should-develop` class, add the `will-develop` class, and when the elements are visible within the viewport, apply a `visible` class to kick off their animations:

```javascript
const threshold = 0.333;
const observer = new IntersectionObserver((entries, observer) => {
    if (entries[0].intersectionRatio > threshold) {
        entries[0].target.classList.add("visible")
        observer.unobserve(entries[0].target)
    }
    }, { threshold: threshold }
)
const instantPhotos = document.querySelectorAll(".instant-photo.should-develop")
instantPhotos.forEach((instantPhoto) => {
	instantPhoto.classList.add("will-develop")
	instantPhoto.classList.remove("should-develop")
	observer.observe(instantPhoto)
})
```

Now we can add both the `develop` and `should-develop` classes, and browsers that *do* have JavaScript enabled will only start the develop animation when the element becomes visible, but browsers that *do not* have JavaScript enabled will still show the develop animation. It just starts when the CSS loads instead of when the element becomes visible, which I think is a suitable fallback.

```html
<div class="instant-photo  develop  should-develop" develop>
	<img src="/images/avatar@4x.jpeg" alt="Chris Burnell" width="400" height="400">
</div>
```

<figure>
    <div class="instant-photo  develop  should-develop" develop>
        <img src="/images/avatar@4x.jpeg" alt="Chris Burnell" width="400" height="400">
    </div>
</figure>

For all intents and purposes, I’m going to call that complete. I’m taking away from this exercise the lesson that I should probably only reach for Web Components when the core of the functionality I’m looking for can *only* come from JavaScript.

<style>
.instant-photo {
	background-color: var(--instant-photo-background-color, #121212);
	display: inline-block;
	border-width: calc(var(--instant-photo-size, 3.1in) * 0.0645);
	border-block-end-width: calc(var(--instant-photo-size, 3.1in) * 0.2903);
	border-style: solid;
	border-color: var(--instant-photo-border-color, #ededed);
}
.instant-photo img {
	inline-size: var(--instant-photo-size, 3.1in);
	block-size: var(--instant-photo-size, 3.1in);
	display: block;
}
.instant-photo.develop img {
	opacity: 0;
	filter: contrast(0%) saturate(50%);
	animation: none;
}
.instant-photo:is(.develop:not(.will-develop), .visible) img {
	animation: instant-photo var(--instant-photo-develop-duration, 10s) linear var(--instant-photo-develop-delay, 1s) forwards;
}
@keyframes instant-photo {
	50% {
		opacity: 1;
		filter: contrast(67%) saturate(80%);
	}
	100% {
		opacity: 1;
		filter: contrast(100%) saturate(100%);
	}
}
</style>
<script>
const threshold = 0.333;
const observer = new IntersectionObserver((entries, observer) => {
	if (entries[0].intersectionRatio > threshold) {
		entries[0].target.classList.add("visible")
		observer.unobserve(entries[0].target)
	}
	}, { threshold: threshold }
)
const instantPhotos = document.querySelectorAll(".instant-photo.should-develop")
for (let instantPhoto of instantPhotos) {
	instantPhoto.classList.add("will-develop")
	instantPhoto.classList.remove("should-develop")
	observer.observe(instantPhoto)
}
</script>
<script type="module">{% include '../../../node_modules/@chrisburnell/instant-photo/instant-photo.js' %}</script>
