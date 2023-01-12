---
title: About
tagline: "<span class=\" [ canada ] \">About me</span>"
bio: "<span class=\" [ canada ] \">Chris Burnell</span> is a <span class=\" [ canada ] \">Canadian</span> Front End Developer working for [Squiz](http://www.squiz.net). He’s [ravenous for CSS](https://chrisburnell.com/tag/css/) and built [Bowhead](https://chrisburnell.com/bowhead/) to bring design tokens to CSS. His [Webmention plugin](https://chrisburnell.com/eleventy-cache-webmentions/) for [Eleventy](https://11ty.dev) helps people connect across the [IndieWeb](https://indieweb.org), and his work in co-organising the [State of the Browser](https://stateofthebrowser.com) conference has brought together over 45 speakers and 150+ attendees each year."
eleventyComputed:
  description: "{{ site.description | safe }}"
---

<p><strong>I’ve got <a href="https://chrisburnell.com/cv/">a CV/resume</a>, if that’s what you’re looking for.</strong></p>

<ul class=" [ cluster ] ">
    <li><a href="https://codepen.io/chrisburnell" rel="external">CodePen</a></li><li><a href="https://github.com/chrisburnell" rel="external">GitHub</a></li><li><a href="https://fediverse.repc.co/@chrisburnell" rel="external">Mastodon</a></li><li><a href="https://chrisburnell.com/feed.xml">RSS</a></li>
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

## Other Formats

```text
{{ bio | markdownFormat | striptags(true) | safe }}
```

```markdown
{{ bio | striptags(true) | safe }}
```

```html
{{ bio | striptags(true) | markdownFormat | replace('<p>', '') | replace('</p>', '') | safe }}
```

## The Long Version

<figure class=" [ line-length  overflow ] ">
    {% image './images/content/rachel-and-i.jpg', 'Chris Burnell', ' [ shadow ] [ canada ] ', [500, 672, 1000] %}
</figure>

I’m originally from [<span class=" [ canada ] ">Halifax, Nova Scotia</span>](https://www.openstreetmap.org/#map=13/44.6463/-63.6162) but now I live in [London, England](https://www.openstreetmap.org/#map=10/51.4898/-0.0882) where I work for [Squiz](http://www.squiz.net), a digital transformation agency, as a Software Engineer.

I’ve had this website since 2008, and is, by far, my favourite thing that I own. My passion for the web drives me to want a better web for tomorrow, and I pursue that through specialising in CSS, design systems, developer advocacy and education, and technical writing and speaking.

I also feed this drive by continuously finding myself in <q>rabbit-hole deep-dives</q>, the thrill of deep and exhilirating research into the web to achieve some goal, which, more often than not, serve as inspiration for my [projects](https://chrisburnell.com/projects/).

I also love <a href="https://chrisburnell.com/note/1510316111/" title="this link is a joke">playing the piano</a>, [baking bread](https://chrisburnell.com/note/1574856597/) from time to time, and [playing/DMing Dungeons & Dragons](https://chrisburnell.com/projects/#personal-projects) here and there too.

<h2 id="worked-with">Companies I’ve worked with</h2>

<nav class=" [ grid ] [ shelf ] [ center ] " data-layout="natural" style="--gap: var(--size-gap);" aria-labelledby="worked-with">
    {%- for client in clients | sort(false, false, "title") -%}
        <article>
            <a href="{{ client.url }}" title="{{ client.title | safe }}" rel="external">
                <img class=" [ interaction-grow ] " src="/images/built/{{ client.image }}" alt="" loading="lazy" decoding="async" role="presentation">
            </a>
        </article>
    {%- endfor -%}
</nav>

## Contact

<dl>
    <dt>Email:</dt>
    <dd><a class=" [ canada ] " href="mailto:{{ author.email }}">{{ author.email }}</a></dd>
    <dt>Mastodon:</dt>
    <dd><a class=" [ canada ] " href="https://{{ author.mastodon_domain }}/users/{{ author.mastodon.split('@') | first }}">{{ '@' + author.mastodon }}</a></dd>
    <dt>Twitter:</dt>
    <dd><a class=" [ canada ] " href="https://twitter.com/{{ author.twitter }}">{{'@' + author.twitter }}</a></dd>
    <dt>Twitter DM:</dt>
    <dd><a class=" [ canada ] " href="https://twitter.com/messages/compose?recipient_id={{ author.twitter }}">{{ '@' + author.twitter }}</a></dd>
</dl>

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
