---
title: Unused Assets
description: Unused Assets
tags: []
sitemap:
  exclude: true
excludeFromSearch: true
monetization: false
---

{% image './images/content/feature-watch.png', 'A screenshot of my component which displays browser support for given HTML/CSS/JavaScript/Web features' %}

{% image './images/content/city-logo.png', 'City, University of London’s logo' %}

{% image './images/content/lws-logo.png', 'London Web Standards’ logo' %}

{% image './images/content/sotb-logo.png', 'State of the Browser’s logo' %}

{% for client in clients %}
    {% image './images/content/' + client.image, client.title + '’s logo' %}
{% endfor %}
