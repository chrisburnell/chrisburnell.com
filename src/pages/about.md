---
title: About
tagline: "<span class=\" [ canada ] \">About me</span>"
bio: "<span class=\" [ canada ] \">Chris Burnell</span> is a <span class=\" [ canada ] \">Canadian</span> Front End Developer / Software Engineer. He was a dedicated volunteer Organiser for the [State of the Browser](https://stateofthebrowser.com) conference from 2018 to 2024, having brought together over 50 leading speakers to the delight of 150+ attendees each year. He’s [“Ravenous for CSS”](https://chrisburnell.com/tag/css/), often found [rabbit-hole deep-diving](https://chrisburnell.com/projects/), and his [Webmention Plugin](https://chrisburnell.com/eleventy-cache-webmentions/) for [Eleventy](https://11ty.dev) helps people connect across the [Fediverse](https://en.wikipedia.org/wiki/Fediverse) and [IndieWeb](https://indieweb.org)."
og_image: /images/avatar@2x.jpeg
perch: true
eleventyComputed:
  description: "{{ site.description | safe }}"
---

{% if author.employer.title != '' -%}
    {% include 'lfw.njk' %}
{%- endif %}

<p hidden><strong>I’ve got a <a href="https://chrisburnell.com/cv/">CV / resumé</a>, if that’s what you’re looking for.</strong></p>

{% set last_updated = "2024-03-30T17:50:00+0800" -%}
<p class=" [ center  inline-center ] "><strong>Last updated:</strong> <time datetime="{{ last_updated | rfc3339Date }}">{{ last_updated | friendlyDate | safe }}</time></p>

<hr>

<figure class=" [ overflow ] ">
    <img src="/images/avatar@4x.jpeg" alt="Chris Burnell" class=" [ shadow ] [ canada ] " width="400" height="400" loading="lazy" decoding="async">
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

<h2 id="clients">Companies and Organisations I’ve worked with</h2>

<div class=" [ marquee ] ">
    <div class=" [ marquee__content ] ">
        {%- for client in clients | sort(false, false, 'title') -%}
            <article>
                <a href="{{ client.url }}" title="{{ client.title | safe }}" rel="external noopener">
                    <img src="/images/content/{{ client.image }}"{% if client.darkInvert %} class="dark-invert-colors"{% endif %} alt="" height="80">
                </a>
            </article>
        {%- endfor -%}
    </div>
    <div class=" [ marquee__content ] " aria-hidden="true" hidden>
        {%- for client in clients | sort(false, false, 'title') -%}
            <article>
                <a href="{{ client.url }}" title="{{ client.title | safe }}" rel="external noopener" tabindex="-1">
                    <img src="/images/content/{{ client.image }}"{% if client.darkInvert %} class="dark-invert-colors"{% endif %} alt="" height="80">
                </a>
            </article>
        {%- endfor -%}
    </div>
</div>

{% css -%}
.marquee {
    inline-size: 100%;
    display: flex;
    gap: var(--size-large);
    margin-block: var(--size-medium);
    position: relative;
    user-select: none;
}
.marquee__content {
    flex-shrink: 0;
    min-inline-size: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    gap: var(--size-large);
}
@media (prefers-reduced-motion: no-preference) {
    .marquee {
        overflow-x: hidden;
    }
    .marquee__content {
        animation: scroll {{ clients.length }}s linear infinite;
    }
}
@media (prefers-reduced-motion: reduce) {
    .marquee__content[aria-hidden="true"] {
        display: none;
    }

    .marquee__content {
        max-inline-size: 100%;
        flex-wrap: wrap;
    }
}
.marquee:hover .marquee__content,
.marquee:has(a:is(:focus, :active)) .marquee__content  {
    animation-play-state: paused;
}
.marquee__content a {
    display: block;
}
.marquee__content img {
    max-inline-size: 7rem;
    max-block-size: 5rem;
    margin: var(--size-medium) 0;
}
@keyframes scroll {
    0% {
        transform:translateX(0)
    }
    to {
        transform:translateX(calc(-100% - var(--size-large)))
    }
}
{%- endcss %}

{# <hr> #}

{# ## Testimonials #}

{# {% include 'testimonials.njk' %} #}

<hr>

## Contact

<address>
    <dl>
        <dt><c-emoji style="margin-inline-end: 1ex;">📧</c-emoji>Email:</dt>
        <dd><a href="mailto:{{ author.email }}" class=" [ canada ] ">{{ author.email }}</a></dd>
        <dt><c-emoji><svg width="24" height="24" aria-hidden="true" focusable="false" style="margin-inline-end: 1ex;"><use href="#svg--discord"></use></svg></c-emoji>Discord:</dt>
        <dd><a href="https://discordapp.com/users/{{ author.discord_id }}" class=" [ canada ] " title="{{ author.name }} on Discord">{{ author.discord }}</a></dd>
        <dt><c-emoji><svg width="24" height="24" aria-hidden="true" focusable="false" style="margin-inline-end: 1ex;"><use href="#svg--mastodon"></use></svg></c-emoji>Mastodon:</dt>
        <dd><a href="https://{{ author.mastodon_domain }}/@{{ author.mastodon.split('@')[1] }}" class=" [ canada ] " title="{{ author.name }} on Mastodon">{{ author.mastodon }}</a></dd>
        <dt><c-emoji><svg width="24" height="24" aria-hidden="true" focusable="false" style="margin-inline-end: 1ex;"><use href="#svg--linkedin"></use></svg></c-emoji>LinkedIn:</dt>
        <dd><a href="https://www.linkedin.com/in/{{ author.linkedin }}" class=" [ canada ] " title="{{ author.name }} on LinkedIn">{{ author.linkedin }}</a></dd>
        <dt><c-emoji><svg width="24" height="24" aria-hidden="true" focusable="false" style="margin-inline-end: 1ex;"><use href="#svg--xmpp"></use></svg></c-emoji>XMPP:</dt>
        <dd><a href="xmpp:{{ author.xmpp }}" class=" [ canada ] " title="{{ author.name }} on XMPP">{{ author.xmpp }}</a></dd>
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
