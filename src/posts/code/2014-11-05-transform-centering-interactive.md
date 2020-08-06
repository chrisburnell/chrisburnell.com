---
date: 2014-11-05T13:00:00+0000
title: Power of Transform Centering - Interactive
---

{% codepen 'xutbs', false, 500 %}

Check out the [demo version](/pen/transform-centering/).

```html
<textarea class="modal" disabled></textarea>
```

```scss
html {
    box-sizing: border-box;
}
*, *:before, *:after {
    box-sizing: inherit;
}
html,
body {
    height: 100%;
}
body {
    position: relative;
    overflow: hidden;
}
.modal {
    width:     5em;
    min-width: 5em;
    max-width: 100%;
    height:     5em;
    min-height: 5em;
    max-height: 100%;
    border: 0;
    outline: none;
    position: absolute;
    top:  50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
}

```
