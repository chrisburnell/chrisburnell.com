---
date: 2016-05-05T01:00:00+0100

title: IE9 :before font-size bug
description: "Seems there's a bug in <em>Internet Explorer 9</em> wherein pseudo content (<code>:before</code> and <code>:after</code> content) doesn't get parsed properly in the DOM, so instead of declarations like <code>font-size</code> being applied only once despite multiple occurrences of the rule, but is in fact treated like a child element in each instance."

bookmark_of: https://codepen.io/chrisburnell/pen/vtHwG
---

From what I’ve read, this bug can be avoided by using <var>px</var> instead of <var>em</var> units.
