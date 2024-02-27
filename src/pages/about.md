---
title: About
tagline: "<span class=\" [ canada ] \">About me</span>"
bio: "<span class=\" [ canada ] \">Chris Burnell</span> is a <span class=\" [ canada ] \">Canadian</span> Front End Developer / Software Engineer. He was a dedicated volunteer Organiser for the [State of the Browser](https://stateofthebrowser.com) conference from 2018 to 2024, having brought together over 50 leading speakers to the delight of 150+ attendees each year. He’s [“Ravenous for CSS”](https://chrisburnell.com/tag/css/), often found [rabbit-hole deep-diving](https://chrisburnell.com/projects/), and his [Webmention Plugin](https://chrisburnell.com/eleventy-cache-webmentions/) for [Eleventy](https://11ty.dev) helps people connect across the [Fediverse](https://en.wikipedia.org/wiki/Fediverse) and [IndieWeb](https://indieweb.org)."
og_image: /images/avatar@2x.jpeg
perch: true
eleventyComputed:
  description: "{{ site.description | safe }}"
---

{% include 'lfw.njk' %}

<p hidden><strong>I’ve got a <a href="https://chrisburnell.com/cv/">CV / resumé</a>, if that’s what you’re looking for.</strong></p>

<ul class=" [ cluster  center ] ">
    {%- for item in socials -%}
        {%- if not item.hidden and item.primary -%}
            {%- set url = item.url -%}
            {%- if item.key -%}
                {%- set url = url + author[item.key] -%}
            {%- endif -%}
            <li><a href="{{ url }}"><c-emoji><svg width="24" height="24" aria-hidden="true" focusable="false" style="{% if item.fill %}fill: {{ item.fill }}; {% endif %}margin-inline-end: 1ex;">{% if item.defs %}{{ item.defs | safe }}{% endif %}<use href="#svg--{{ item.title | lower }}"></use></svg></c-emoji>{{ item.title }}</a></li>
        {%- endif -%}
    {%- endfor -%}
</ul>

<hr>

<figure class=" [ overflow ] ">
    <img src="/images/avatar@4x.jpeg" alt="Chris Burnell" class=" [ shadow ] [ canada ] " width="400" height="400">
</figure>

## Bio

{{ bio | formatAsMarkdown | safe }}

<c-details>
<summary>Plaintext</summary>

```text
{{ bio | formatAsMarkdown | striptags(true) | safe }}
```

</c-details>

<c-details>
<summary>Markdown</summary>

```markdown
{{ bio | striptags(true) | safe }}
```

</c-details>

<c-details>
<summary>HTML</summary>

```html
{{ bio | striptags(true) | formatAsMarkdown | replace('<p>', '') | replace('</p>', '') | safe }}
```

</c-details>

<hr>

## The Long Version

<figure>
    {% image './images/content/rachel-and-i.jpg', 'a photo of my partner, Rachel, and myself', ' [ shadow ] [ canada ] ', [500, 672, 1000] %}
    <figcaption>a photo of my partner, Rachel, and myself</figcaption>
</figure>

I’m originally from [<span class=" [ canada ] ">Halifax, Nova Scotia</span>](https://www.openstreetmap.org/#map=13/44.6463/-63.6162), started my career in [London, England](https://www.openstreetmap.org/#map=10/51.4898/-0.0882) for 12 years, and now live in [Singapore](https://www.openstreetmap.org/#map=14/1.3156/103.9425) where I’m looking to transition from pure front end development work to a developer relations role.

Although I’ve been building websites since 2006, I’ve had my personal website since 2008, and it’s definitely my favourite thing that I own. My passion for the web drives me to want a better web for tomorrow, and I pursue that through specialising in CSS, design systems, developer relations / education, and technical writing and speaking.

I also feed my passion for the web by continuously finding myself in <q>rabbit hole deep-dives</q>, which involve exhilirating research into something new and exciting to achieve some goal—more often than not, these deep-dives serve as inspiration for my [projects](https://chrisburnell.com/projects/).

I also love <a href="https://chrisburnell.com/note/1510316111/" title="this link is a joke">playing the piano</a>, [baking bread](https://chrisburnell.com/note/1574856597/) from time to time, and [playing/DMing Dungeons & Dragons](https://chrisburnell.com/projects/#personal-projects) here and there. Check out my [Uses](/uses/) page too!

<hr>

<h2 id="worked-with">Companies and Organisations I’ve worked with</h2>

<div class=" [ grid ] [ shelf ] [ center ] " style="--min-inline-size: 6em; --gap: var(--size-gap);">
    {%- for client in clients | sort(false, false, 'title') -%}
        <article>
            <a href="{{ client.url }}" title="{{ client.title | safe }}" rel="external">
                <img src="/images/built/{{ client.image }}" class=" [ interaction-grow{% if client.darkInvert %}  dark-invert-colors{% endif %} ] " alt="" loading="lazy" decoding="async" style="max-height: 8rem">
            </a>
        </article>
    {%- endfor -%}
</div>

<!-- <hr> -->

<!-- ## Testimonials -->

<!-- {% include 'testimonials.njk' %} -->

<hr>

## Contact

<address>
    <dl>
        <dt>Email:</dt>
        <dd><a href="mailto:{{ author.email }}" class=" [ canada ] "><img src="/images/raven.svg" alt="{{ site.title }}" loading="lazy" decoding="async" class="brand-logo" style="margin-inline-end: 1ex;">{{ author.email }}</a></dd>
        <dt>Mastodon:</dt>
        <dd><a href="https://{{ author.mastodon_domain }}/{{ author.mastodon.split('@')[1] }}" class=" [ canada ] " title="{{ author.name }} on Mastodon"><c-emoji><svg width="24" height="24" aria-hidden="true" focusable="false" style="fill: #595aff; margin-inline-end: 1ex;"><use href="#svg--mastodon"></use></svg></c-emoji>{{ author.mastodon }}</a></dd>
        <dt>LinkedIn:</dt>
        <dd><a href="https://www.linkedin.com/in/{{ author.linkedin }}" class=" [ canada ] " title="{{ author.name }} on LinkedIn"><c-emoji><svg width="24" height="24" aria-hidden="true" focusable="false" style="fill: #0a66c2; margin-inline-end: 1ex;"><use href="#svg--linkedin"></use></svg></c-emoji>{{ '@' + author.linkedin }}</a></dd>
    </dl>
</address>

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

<div id="wcb" class="carbonbadge wcb-d"></div>
<script src="https://unpkg.com/website-carbon-badges@1.1.3/b.min.js" defer></script>
