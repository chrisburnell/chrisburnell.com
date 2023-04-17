---
permalink: "/{{ page.fileSlug }}/index.html"
title: Network Offline
description: <span class="canada">Sorry</span>, it looks like there's a problem with your Internet connection.
js: offline.js
theme: null
---
{% css %}@layer components { {%- include '../../../css/components/deck.css' -%} }{% endcss -%}

<nav class=" [ grid ] [ navigator ] " aria-label="Error Navigation">
  <button onclick="window.location.reload()" aria-label="Refresh">Refresh!</button>
</nav>
