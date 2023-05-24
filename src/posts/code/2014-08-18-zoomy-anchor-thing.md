---
date: 2014-08-18T13:00:00+0100
title: Zoomy Anchor Thing
tags:
  - css
  - motion
codepen_slug: lcEvB
codepen_featured: true
---

<c-codepen slug="{{ codepen_slug }}" height="350px"></c-codepen>

```html
<a href="#" class="article-link">
    <img src="/images/banners/lets-look-back_mobile.png" alt="">
    <span class="article-title">Let’s Look Back</span>
    <time class="article-date" datetime="2014-02-09T02:19:00+00:00">Feb 09, 2014</time>
</a>
```

```scss
html,
body {
    height: 100%;
    position: relative;
}
.article-link {
    color: white;
    width: 425px;
    height: 255px;
    position: absolute;
    top: 50%;
    left: 50%;
    overflow: hidden;
    font: 600 16px/2em sans-serif;
    text-decoration: none;
    text-shadow: 0 .1em .25em rgba(black, .5);
    border-radius: .375em;
    transform: translate3d(-50%, -50%, 0);
    img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0) scale(0.85);
        transition: all .3s ease;
    }
    &:hover img,
    &:focus img {
        transform: translate3d(-50%, -50%, 0);
    }
}
.article-title,
.article-date {
    position: absolute;
    top: 50%;
    left: 50%;
    white-space: nowrap;
}
.article-title {
    display: block;
    font-size: 2em;
    transform: translate3d(-50%, -50%, 0);
    transition: all .3s ease;
    .article-link:hover &,
    .article-link:focus & {
        transform: translate3d(-50%, calc(-50% - .5em), 0);
    }
}
.article-date {
    opacity: 0;
    font-size: 1.25em;
    text-transform: uppercase;
    transform: translate3d(-50%, calc(-50% + 1.8em), 0);
    transition: all .3s ease;
    .article-link:hover &,
    .article-link:focus & {
        opacity: 1;
        transform: translate3d(-50%, calc(-50% + .8em), 0);
        transition: all .25s ease .05s;
    }
}

```
