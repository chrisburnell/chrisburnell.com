---
date: 2014-08-18T12:00:00+0100

title: Psychedelic Slice

codepen_slug: apogK
---

{% codepen codepen_slug, false, 350 %}

```html
<div class="curvy-arrow"></div>
```

```scss
html,
body {
    background-color: cornsilk;
    height: 100%;
    position: relative;
}
.curvy-arrow {
    width:  300px;
    height: 300px;
    overflow: hidden;
    position: absolute;
    top:  50%;
    left: 50%;
    cursor: help;
    border-radius: 50%;
    transform: translate3d(-50%, -75%, 0);
    transition: border-radius .5s 1s,
                background-color .5s 2s,
                transform .5s 4s;
    @media( max-width: 500px ) {
        width:  250px;
        height: 250px;
    }
    &:hover {
        background-color: rgba(black, .2);
        border-radius: 0;
        transform: translate3d(-50%, -50%, 0);
        transition: transform .5s,
                    background-color .5s 2s,
                    border-radius .5s 3s;
    }
    &:before,
    &:after {
        content: "";
        background-color: purple;
        background-color: rebeccapurple;
        width:  50%;
        height: 50%;
        position: absolute;
        top:  50%;
        left: 50%;
        border-radius: 0 0 50% 0;
        transform-origin: top left;
        transition: transform .5s,
                    border-radius .5s 1s,
                    background-color .5s 3s;
    }
    &:before {
        transform: rotate(60deg);
    }
    &:after {
        transform: rotate(30deg);
    }
    &:hover:before,
    &:hover:after {
        border-radius: 0;
        transition: background-color .5s 1s,
                    border-radius .5s 3s,
                    transform .5s 4s;
        transform: none;
    }
    &:hover:before {
        background-color: rgba(dodgerblue, .8);
    }
    &:hover:after {
        background-color: rgba(indianred, .8);
    }
}

```
