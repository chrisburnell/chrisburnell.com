---
title: About
tagline: "<span class=\" [ canada ] \">About me</span>"
bio: "<span class=\" [ canada ] \">Chris Burnell</span> is a <span class=\" [ canada ] \">Canadian</span> Front End Developer / Software Engineer. He was a dedicated volunteer Organiser for the [State of the Browser](https://stateofthebrowser.com) conference from 2018 to 2024, having brought together over 50 leading speakers to the delight of 150+ attendees each year. He’s [“Ravenous for CSS”](https://chrisburnell.com/tag/css/), often found [rabbit-hole deep-diving](https://chrisburnell.com/projects/), and his [Webmention Plugin](https://chrisburnell.com/eleventy-cache-webmentions/) for [Eleventy](https://11ty.dev) helps people connect across the [Fediverse](https://en.wikipedia.org/wiki/Fediverse) and [IndieWeb](https://indieweb.org)."
og_image: /images/avatar@2x.jpeg
perch: true
eleventyComputed:
  description: "{{ site.description | safe }}"
redirect_from:
  - from: /colophon
    hash: colophon
  - from: /contact
    hash: contact
---

{% if author.employer.title != '' -%}
    {% include 'lfw.njk' %}
{%- endif %}

<p class=" [ center  inline-center ] "><a href="https://chrisburnell.com/cv/" class=" [ button ] ">CV / Résumé</a></p>

<hr>

<figure class=" [ overflow ] ">
    <img src="/images/avatar@4x.jpeg" alt="Chris Burnell" class=" [ shadow ] [ canada ] " width="400" height="400" loading="lazy" decoding="async">
</figure>

## Bio

{{ bio | markdownFormat | safe }}

<c-details class="no-border no-padding">
<summary>Plaintext</summary>

```text
{{ bio | markdownFormat | striptags(true) | safe }}
```

</c-details>

<c-details class="no-border no-padding">
<summary>Markdown</summary>

```markdown
{{ bio | striptags(true) | safe }}
```

</c-details>

<c-details class="no-border no-padding">
<summary>HTML</summary>

```html
{{ bio | striptags(true) | markdownFormat | replace('<p>', '') | replace('</p>', '') | safe }}
```

</c-details>

<hr>

## The Long Version

<figure>
    {% image './images/content/rachel-and-i.jpeg', 'a photo of my partner, Rachel, and myself', ' [ shadow ] [ canada ] ', [500, 672, 1000] %}
    <figcaption>a photo of my partner, Rachel, and myself</figcaption>
</figure>

I’m originally from [<span class=" [ canada ] ">Halifax, Nova Scotia</span>](https://www.openstreetmap.org/#map=13/44.6463/-63.6162), started my career and lived in [London, England](https://www.openstreetmap.org/#map=10/51.4898/-0.0882) for 12 years, spent a year in [Singapore](https://www.openstreetmap.org/#map=14/1.3156/103.9425), and now live in Halifax again where I’m looking to transition from pure front end development work to a developer relations role.

Although I’ve been building websites since 2006, I’ve had my personal website since 2008, and it’s definitely my favourite thing that I own. My passion for the web drives me to want a better web for tomorrow, and I pursue that through specialising in CSS, design systems, developer relations / education, and technical writing and speaking.

I also feed my passion for the web by continuously finding myself in <q>rabbit hole deep-dives</q>, which involve exhilirating research into something new and exciting to achieve some goal—more often than not, these deep-dives serve as inspiration for my [projects](https://chrisburnell.com/projects/).

I also love <a href="https://chrisburnell.com/note/1510316111/" title="this link is a joke">playing music</a>, [hiking and camping](https://chrisburnell.com/note/1538387073/), [cooking](https://chrisburnell.com/recipes) and [baking bread](https://chrisburnell.com/note/1574856597/), [drinking craft beer](https://chrisburnell.com/beer/), and [playing video games](https://chrisburnell.com/games/) and [tabletop games](https://chrisburnell.com/projects/#personal-projects) here and there. Check out my [Uses](/uses/) page too!

<hr>

<h2 id="clients">Companies and Organisations I’ve worked with</h2>

<div style="display: flex; flex-wrap: wrap; gap: var(--size-gutter); justify-content: center; align-items: center;">
{% for client in clients | sort(false, false, 'title') -%}
    <article style="max-inline-size: 150px; max-block-size: 80px;">
        <a href="{{ client.url }}" title="{{ client.title | safe }}" rel="external noopener" style="display: block;">
            <img src="/images/content/{{ client.image }}"{% if client.darkInvert %} class="dark-invert-colors"{% endif %} alt="" height="80" style="max-block-size: 80px; margin: auto;">
        </a>
    </article>
{%- endfor %}
</div>

<hr>

<h2 id="contact">Contact me</h2>

<address>
    <dl>
        <dt><c-emoji style="margin-inline-end: 1ex;">📧</c-emoji>Email:</dt>
        <dd><a href="mailto:{{ author.email }}" class=" [ canada ] ">{{ author.email }}</a></dd>
        <dt><c-emoji><svg width="24" height="24" aria-hidden="true" focusable="false" style="margin-inline-end: 1ex;"><use href="#svg--bluesky"></use></svg></c-emoji>Bluesky:</dt>
        <dd><a href="https://bsky.app/profile/{{ author.bluesky }}" class=" [ canada ] " title="{{ author.name }} on Bluesky">{{ author.bluesky }}</a></dd>
        <dt><c-emoji><svg width="24" height="24" aria-hidden="true" focusable="false" style="margin-inline-end: 1ex;"><use href="#svg--discord"></use></svg></c-emoji>Discord:</dt>
        <dd><a href="https://discordapp.com/users/{{ author.discord_id }}" class=" [ canada ] " title="{{ author.name }} on Discord">{{ author.discord }}</a></dd>
        <dt><c-emoji><svg width="24" height="24" aria-hidden="true" focusable="false" style="margin-inline-end: 1ex;"><use href="#svg--mastodon"></use></svg></c-emoji>Mastodon:</dt>
        <dd><a href="https://{{ author.mastodon_domain }}/@{{ author.mastodon.split('@')[1] }}" class=" [ canada ] " title="{{ author.name }} on Mastodon">{{ author.mastodon }}</a></dd>
        <dt><c-emoji><svg width="24" height="24" aria-hidden="true" focusable="false" style="margin-inline-end: 1ex;"><use href="#svg--linkedin"></use></svg></c-emoji>LinkedIn:</dt>
        <dd><a href="https://www.linkedin.com/in/{{ author.linkedin }}" class=" [ canada ] " title="{{ author.name }} on LinkedIn">{{ author.linkedin }}</a></dd>
        <dt><c-emoji><svg width="24" height="24" aria-hidden="true" focusable="false" style="margin-inline-end: 1ex;"><use href="#svg--xmpp"></use></svg></c-emoji>XMPP:</dt>
        <dd><a href="xmpp:{{ author.xmpp }}" class=" [ canada ] " title="{{ author.name }} on XMPP">{{ author.xmpp }}</a></dd>
        <dt><c-emoji style="margin-inline-end: 1ex;">🪪</c-emoji>vCard:</dt>
        <dd><a href="/chrisburnell.vcf" class=" [ canada ] ">chrisburnell.vcf</a></dd>
    </dl>
</address>

You can find me elsewhere on the web through [my links page](/links/).

<hr>

## Colophon

This website was built with [{{ eleventy.generator }}](https://11ty.dev) and the following languages:

<ul style="column-count: 2;">
    <li>HTML</li>
    <li>WebC</li>
    <li>Markdown</li>
    <li>Nunjucks</li>
    <li>CSS & SCSS</li>
    <li>JavaScript</li>
    <li>JSON</li>
    <li>XML</li>
    <li>YAML</li>
</ul>

This website also supports [Webmentions](https://indieweb.org/webmention) (powered by [Webmention.io](https://webmention.io)), displayed at the bottom of relevant pages using my [Eleventy](https://11ty.dev) plugin, [eleventy-cache-webmentions](/eleventy-cache-webmentions/).

The source code is available for your perusal on [GitHub](https://github.com/{{ author.github }}/{{ site.repository }}), and each page contains [an edit link](#edit) *(in the footer)* allowing you to go directly to the page’s source on GitHub.

No large language models were used in any of the writing on this website.

{% if eleventy.env.runMode === 'build' -%}
    <div id="wcb" class="carbonbadge wcb-d"></div>
    <script src="https://unpkg.com/website-carbon-badges@1.1.3/b.min.js" defer></script>
{%- endif %}
