---
draft: true
date: 2022-10-16T00:00:01+0100
title: Reverse Animations for :targets
description: I was just working on some styling changes to `:target` elements on my website when it suddenly occurred to me that reverse animations would be a handy way to draw the user’s attention.
---

```css
[id]:target {
  animation: 2s ease anchor-target reverse;
}

@keyframes anchor-target {
  50%,
  100% {
    background-color: yellow;
    color: black;
  }
}
```
