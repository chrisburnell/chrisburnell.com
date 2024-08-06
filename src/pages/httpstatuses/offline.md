---
permalink: "/{{ page.fileSlug }}/index.html"
title: Network Offline
description: <span class="canada">Sorry</span>, it looks like there’s a problem with your Internet connection.
theme: null
---

<nav class=" [ grid ] [ navigator ] " aria-label="Error Navigation">
  <button onclick="window.location.reload()" aria-label="Refresh">Refresh!</button>
</nav>

<script>{% include '../../js/pages/offline.js' %}</script>
