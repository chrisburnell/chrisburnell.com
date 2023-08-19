---
title: IndieWeb
description: How I've implemented and interact with the <a href="https://indieweb.org">IndieWeb</a>.
---

<figure>
    {% image './images/content/indiewebcamp.svg', 'IndieWebCamp logo' %}
</figure>

## My Setup

I author posts of various *types* on this website, some of which I syndicate to silos around the web.

<dl>
    <dt><a href="/articles/">Articles</a></dt>
    <dd><a href="https://indieweb.org/PESOS" rel="external"><abbr title="Publish Elsewhere, Syndicate on Own Site">PESOS</abbr></a> the description to <a href="https://{{ author.mastodon_domain }}/users/{{ author.mastodon.split('@') | first }}" rel="external">Mastodon</a> and then to this website.</dd>
    <dt><a href="/notes/">Notes</a></dt>
    <dd><a href="https://indieweb.org/PESOS" rel="external"><abbr title="Publish Elsewhere, Syndicate on Own Site">PESOS</abbr></a> the content to <a href="https://{{ author.mastodon_domain }}/users/{{ author.mastodon.split('@') | first }}" rel="external">Mastodon</a> and then to this website.</dd>
    <dt><a href="/bookmarks/">Bookmarks</a></dt>
    <dd><a href="https://indieweb.org/PESOS" rel="external"><abbr title="Publish Elsewhere, Syndicate on Own Site">PESOS</abbr></a> the URL and content to <a href="https://{{ author.mastodon_domain }}/users/{{ author.mastodon.split('@') | first }}" rel="external">Mastodon</a> and then to this website.</dd>
    <dt><a href="/code/">Pens</a></dt>
    <dd>Ones that I’m especially proud of I will cross-post, manually, to this website.</dd>
    <dt><a href="/beer/">Beer</a></dt>
    <dd><a href="https://indieweb.org/PESOS" rel="external"><abbr title="Publish Elsewhere, Syndicate on Own Site">PESOS</abbr></a> the check-in data from <a href="https://untappd.com" rel="external">Untappd</a> using my project, <a href="https://ownyourbeer.chrisburnell.com" rel="external">OwnYourBeer</a>, to this website.</dd>
    <dt><a href="/books/">Books</a></dt>
    <dd>Typically posted only on this website.</dd>
    <dt><a href="/music/">Music</a></dt>
    <dd>Typically posted only on this website.</dd>
</dl>

I still need to do some work to change my syndication model from <abbr title="Publish Elsewhere, Syndicate on Own Site">PESOS</abbr> to <abbr title="Publish on Own Site, Syndicate Elsewhere">POSSE</abbr>. At the moment, because my Micropub endpoint doesn’t have the ability to modify an existing post, I first post to *Mastodon* and grab the permalinks from the responses which are then pumped into the front matter as syndication targets of the post when it gets posted to *GitHub*.

## Tools Used

To handle *incoming* Webmentions, I use *[Webmention.io](https://webmention.io)*, which takes care of parsing microformats and all sorts of filtering to ensure I’m not printing spam or advertisements on my website.

To syndicate interactions on my content inside silos, I use *[Bridgy](https://brid.gy)* to push those interactions through *Webmention.io* and onto my website.

*Outgoing* Webmentions are handled for me by *[Telegraph](https://telegraph.p3k.io)*, which also takes care of microformats parsing and endpoint discovery for each link in my content.

I use *[Aperture](https://aperture.p3k.io/)* and *[Monocle](https://monocle.p3k.io/)* to manage feeds I want to follow and keep track of new content from.

*Outgoing* Webmentions are handled for me by *[Telegraph](https://telegraph.p3k.io)*, which also takes care of microformats parsing and endpoint discovery for each link in my content.

Lastly, I use *[OwnYourBeer](https://ownyourbeer.chrisburnell.com)* to syndicate check-ins from *[Untappd](https://untappd.com)* to my [beer](/beer/) category</a>.

## Thanks

As much work as I’ve put into my sections of code, I have to give a massive thanks to a handful of people that helped to make all of this happen, as there’s no way I could have done all this myself.

<dl>
    <dt><a href="https://adactio.com" rel="external">Jeremy Keith</a></dt>
    <dd>for <a href="https://gist.github.com/adactio/8168e6b78da7b16a4644" rel="external">Minimum micropub endpoint</a></dd>
    <dt><a href="https://aaronparecki.com" rel="external">Aaron Parecki</a></dt>
    <dd>for <a href="https://switchboard.p3k.io" rel="external">Switchboard</a>, <a href="https://telegraph.p3k.io" rel="external">Telegraph</a>, and <a href="https://webmention.io" rel="external">Webmention.io</a></dd>
    <dt><a href="https://snarfed.org" rel="external">Ryan Barrett</a></dt>
    <dd>for <a href="https://brid.gy" rel="external">Bridgy</a> and <a href="https://fed.brid.gy" rel="external">Bridgy Fed</a></dd>
    <dt><a href="https://keithjgrant.com/" rel="external">Keith J. Grant</a></dt>
    <dd>for <a href="https://omnibear.com/" rel="external">Omnibear</a></dd>
    <dt><a href="https://rusingh.com" rel="external">Ru Singh</a></dt>
    <dd>for <a href="https://gocelestial.herokuapp.com" rel="external">Celestial</a></dd>
    <dt><a href="https://brainbaking.com" rel="external">Wouter Groeneveld</a></dt>
    <dd>for <a href="https://git.brainbaking.com/wgroeneveld/go-jamming" rel="external">go-jamming</a></dd>
</dl>
