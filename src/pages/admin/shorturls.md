---
published: false
title: Unused Shorturls Page
description: Unused Shorturls Page
tags: []
sitemap:
  exclude: true
excludeFromSearch: true
---

{% raw %}
```markdown
---
layout: null
pagination:
  data: collections.posts
  size: 1
  alias: item
permalink: "{{ item.data.date | NewBase60(item.data.categoryCode, collections[item.data.categoryCollectionName]) }}/"
---

<!DOCTYPE html><html><head><meta http-equiv=refresh content="0; url={{ item.url }}">
```
{% endraw %}
