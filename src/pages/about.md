---
title: About
tagline: About me
eleventyComputed:
  description: "{{ site.description | safe }}"
---

Hey, I’m <span class=" [ canada ] ">Chris</span>, and thanks for checking out my website!

I’ve got a [CV](/cv/) too, if that’s what you’re looking for.

<figure>
    {% image './images/content/rachel-and-i.jpg', 'Chris Burnell', ' [ canada ] ', [500, 672, 1000] %}
</figure>

## Bio

Chris is a Canadian front end developer currently with [Squiz](http://www.squiz.net). He’s absolutely [ravenous about CSS](https://chrisburnell.com/tag/css/) and built [Bowhead](https://chrisburnell.com/bowhead/) to bring design tokens into SCSS. His [Webmention plugin](https://chrisburnell.com/eleventy-cache-webmentions/) for [Eleventy](https://11ty.dev) helps people connect through the [IndieWeb](https://indieweb.org), and his work in co-organising the [State of the Browser](https://stateofthebrowser.com) conference has brought together over 45 incredible speakers and 150+ attendees each year.

## Other Formats

```text
Chris is a Canadian front end developer currently with Squiz. He’s absolutely ravenous about CSS and built Bowhead to bring design tokens into SCSS. His Webmention plugin for Eleventy helps people connect through the IndieWeb, and his work in co-organising the State of the Browser conference has brought together over 45 incredible speakers and 150+ attendees each year.
```

```markdown
Chris is a Canadian front end developer currently with [Squiz](http://www.squiz.net). He’s absolutely [ravenous about CSS](https://chrisburnell.com/tag/css/) and built [Bowhead](https://chrisburnell.com/bowhead/) to bring design tokens into SCSS. His [Webmention plugin](https://chrisburnell.com/eleventy-cache-webmentions/) for [Eleventy](https://11ty.dev) helps people connect through the [IndieWeb](https://indieweb.org), and his work in co-organising the [State of the Browser](https://stateofthebrowser.com) conference has brought together over 45 incredible speakers and 150+ attendees each year.
```

```html
Chris is a Canadian front end developer currently with <a href="http://www.squiz.net">Squiz</a>. He’s absolutely <a href="https://chrisburnell.com/tag/css/">ravenous about CSS</a> and built <a href="https://chrisburnell.com/bowhead/">Bowhead</a> to bring design tokens into SCSS. His <a href="https://chrisburnell.com/eleventy-cache-webmentions/">Webmention plugin</a> for <a href="https://11ty.dev">Eleventy</a> helps people connect through the <a href="https://indieweb.org">IndieWeb</a>, and his work in co-organising the <a href="https://stateofthebrowser.com">State of the Browser</a> conference has brought together over 45 incredible speakers and 150+ attendees each year.
```

## The Long Version

I’m originally from [Halifax, Nova Scotia](https://www.openstreetmap.org/#map=13/44.6463/-63.6162) but now I live in [London, England](https://www.openstreetmap.org/#map=10/51.4898/-0.0882) where I work with [Squiz](http://www.squiz.net), a digital transformation agency, as a Lead Developer & Chapter Lead.

I’ve had this website since 2008, and it is, by far, my favourite thing that I own. My passion for the web drives me to want a better web for tomorrow, and I pursue that through specialising in CSS, design systems, developer evangelism and education, and technical writing and speaking.

I also feed this drive by continuously finding myself in <q>rabbit-hole deep-dives</q>, the thrill of deep and exhilirating research into the web to do new things, which, more often than not, serve as inspiration for my [projects](https://chrisburnell.com/projects/).

I also love playing the piano, baking bread from time to time, and playing/DMing Dungeons & Dragons here and there too.

If you’d like to keep up-to-date of my work, you can follow me with [RSS](https://chrisburnell.com/feed.xml), on [Mastodon](https://{{ author.mastodon.split('@') | last }}/users/{{ author.mastodon.split('@') | first }}), on [Twitter](https://twitter.com/{{ author.twitter }}), or on [GitHub](https://github.com/{{ author.github }}).

## Colophon

Website built with [Eleventy](https://11ty.dev) and the following languages:

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

This website supports [Webmentions](https://indieweb.org/webmention) (powered by [Webmention.io](https://webmention.io)), which are displayed at the bottom of relevant pages using my plugin, [eleventy-cache-webmentions](/eleventy-cache-webmentions/).

The source code is available for your perusal on [GitHub](https://github.com/{{ author.github }}/{{ site.repository }}), and each page contains an edit link *(in the footer)* allowing you to go directly to the page’s source on GitHub.

## Contact

<dl>
    <dt>Email:</dt>
    <dd><a class=" [ canada ] " href="mailto:{{ author.email }}">{{ author.email }}</a></dd>
    <dt>Mastodon:</dt>
    <dd><a class=" [ canada ] " href="https://{{ author.mastodon.split('@') | last }}/users/{{ author.mastodon.split('@') | first }}">{{ '@' + author.mastodon }}</a></dd>
    <dt>Twitter:</dt>
    <dd><a class=" [ canada ] " href="https://twitter.com/{{ author.twitter }}">{{'@' + author.twitter }}</a></dd>
    <dt>Twitter DM:</dt>
    <dd><a class=" [ canada ] " href="https://twitter.com/messages/compose?recipient_id={{ author.twitter }}">{{ '@' + author.twitter }}</a></dd>
</dl>

## Support

On the peculiar off-chance you *really*, *really* like the work that I do, you can help support me by sponsoring me [on GitHub](https://github.com/sponsors/{{ author.github }}):

<figure>
    <iframe src="https://github.com/sponsors/{{ author.github }}/card" title="Sponsor {{ author.github }}" height="225" width="360" style="border: 0;"></iframe>
</figure>

<style>
    pre > code {
        white-space: normal !important;
    }
</style>
