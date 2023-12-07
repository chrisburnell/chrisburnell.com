---
title: About
tagline: "<span class=\" [ canada ] \">About me</span>"
bio: "<span class=\" [ canada ] \">Chris Burnell</span> is a <span class=\" [ canada ] \">Canadian</span> Front End Developer and aspiring Developer Advocate. He was a passionate volunteer Organiser for the [State of the Browser](https://stateofthebrowser.com) conference from 2018 to 2023, having brought together over 50 leading speakers to the delight of 150+ attendees each year. He’s [“Ravenous for CSS”](https://chrisburnell.com/tag/css/), often found [rabbit-hole deep-diving](https://chrisburnell.com/projects/), and his [Webmention Plugin](https://chrisburnell.com/eleventy-cache-webmentions/) for [Eleventy](https://11ty.dev) helps people connect across the [Fediverse](https://en.wikipedia.org/wiki/Fediverse) and [IndieWeb](https://indieweb.org)."
perch: true
eleventyComputed:
  description: "{{ site.description | safe }}"
---

<p><strong>I’ve got a <a href="https://chrisburnell.com/cv/">CV / resumé</a>, if that’s what you’re looking for.</strong></p>

<ul class=" [ cluster ] ">
    {%- for item in socials -%}
        {%- if not item.hidden and item.primary -%}
            {%- set url = item.url -%}
            {%- if item.key -%}
                {%- set url = url + author[item.key] -%}
            {%- endif -%}
            <li><a href="{{ url }}"><svg width="20" height="20" aria-hidden="true" focusable="false" style="{% if item.fillHover %}--fill: {{ item.fillHover }}; {% endif %}margin-inline-end: 1ex; vertical-align: sub;">{% if item.defs %}{{ item.defs | safe }}{% endif %}<use href="#svg--{{ item.title | lower }}"></use></svg>{{ item.title }}</a></li>
        {%- endif -%}
    {%- endfor -%}
</ul>

<hr>

<figure class=" [ overflow ] ">
    <picture>
        <source srcset="/images/avatar@3x.avif 1x,
                        /images/avatar@4x.avif 4x" type="image/avif">
        <source srcset="/images/avatar@3x.webp 1x,
                        /images/avatar@4x.webp 4x" type="image/webp">
        <img alt="Chris Burnell" class=" [ shadow ] [ canada ] " src="/images/avatar@3x.jpeg" srcset="/images/avatar@3x.jpeg 1x, /images/avatar@4x.jpeg 4x" width="250" height="250">
    </picture>
</figure>

## Bio

{{ bio | markdownFormat | safe }}

<c-details>
<summary>Plaintext</summary>

```text
{{ bio | markdownFormat | striptags(true) | safe }}
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
{{ bio | striptags(true) | markdownFormat | replace('<p>', '') | replace('</p>', '') | safe }}
```

</c-details>

## The Long Version

<figure class=" [ line-length  overflow ] ">
    {% image './images/content/rachel-and-i.jpg', 'a photo of my fiancée, Rachel, and myself', ' [ shadow ] [ canada ] ', [500, 672, 1000] %}
    <figcaption>a photo of my fiancée, Rachel, and myself</figcaption>
</figure>

I’m originally from [<span class=" [ canada ] ">Halifax, Nova Scotia</span>](https://www.openstreetmap.org/#map=13/44.6463/-63.6162) but now I live in [London, England](https://www.openstreetmap.org/#map=10/51.4898/-0.0882) where I work for [Squiz](http://www.squiz.net), a digital transformation agency, as a Software Engineer.

Although I’ve been building websites since 2006, I’ve had this website since 2009, and it’s my favourite thing that I own. My passion for the web drives me to want a better web for tomorrow, and I pursue that through specialising in CSS, design systems, developer advocacy and education, and technical writing and speaking.

I also feed my passion for the web by continuously finding myself in <q>rabbit hole deep-dives</q>, which involve exhilirating research into something new and exciting to achieve some goal—more often than not, these deep-dives serve as inspiration for my [projects](https://chrisburnell.com/projects/).

I also love <a href="https://chrisburnell.com/note/1510316111/" title="this link is a joke">playing the piano</a>, [baking bread](https://chrisburnell.com/note/1574856597/) from time to time, and [playing/DMing Dungeons & Dragons](https://chrisburnell.com/projects/#personal-projects) here and there. Check out my [Uses](/uses/) page too!

<h2 id="worked-with">Companies and Organisations I’ve worked with</h2>

<div class=" [ grid ] [ shelf ] [ center ] " style="--min-inline-size: 6em; --gap: var(--size-gap);">
    {%- for client in clients | sort(false, false, "title") -%}
        <article>
            <a href="{{ client.url }}" title="{{ client.title | safe }}" rel="external">
                <img class=" [ interaction-grow{% if client.darkInvert %}  dark-invert-colors{% endif %} ] " src="/images/built/{{ client.image }}" alt="" loading="lazy" decoding="async" style="max-height: 8rem">
            </a>
        </article>
    {%- endfor -%}
</div>

## Contact

<address>
    <dl>
        <dt>Email:</dt>
        <dd><a class=" [ canada ] " href="mailto:{{ author.email }}"><img alt="{{ site.title }}" loading="lazy" decoding="async" src="/images/raven.svg" class="brand-logo" style="margin-inline-end: 1ex;">{{ author.email }}</a></dd>
        <dt>Mastodon:</dt>
        <dd><a class=" [ canada ] " href="https://{{ author.mastodon_domain }}/users/{{ author.mastodon.split('@') | first }}" title="{{ author.name }} on Mastodon"><svg width="20" height="20" aria-hidden="true" focusable="false" style="--fill: #595aff; margin-inline-end: 1ex; vertical-align: sub;"><use href="#svg--mastodon"></use></svg>{{ '@' + author.mastodon }}</a></dd>
        <dt>LinkedIn:</dt>
        <dd><a class=" [ canada ] " href="https://www.linkedin.com/in/{{ author.linkedin }}" title="{{ author.name }} on LinkedIn">{{ '@' + author.linkedin }}</a></dd>
    </dl>
</address>

## Colophon

This website was built with [Eleventy](https://11ty.dev) and the following languages:

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

No language models were used in any of the writing on this website.

{%- set shelf_css -%}
	@layer components {
		{% include '../../css/components/shelf.css' %}
	}
{%- endset -%}
{%- css 'critical' %}{{ shelf_css | cssmin | safe }}{% endcss -%}
