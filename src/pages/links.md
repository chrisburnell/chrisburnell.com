---
title: Links
description: Find me all over the web (mostly)!
---

<nav class=" [ grid ] [ navigator ] ">
    <a class=" [ button ] " href="https://codepen.io/{{ author.codepen }}">CodePen</a>
    <a class=" [ button ] " href="https://last.fm/user/{{ author.lastfm }}">Discord</a>
    <a class=" [ button ] " href="https://github.com/{{ author.github }}">GitHub</a>
    <a class=" [ button ] " href="https://last.fm/user/{{ author.lastfm }}">Last.fm</a>
    <a class=" [ button ] " href="https://{{ author.mastodon.split('@') | last }}/users/{{ author.mastodon.split('@') | first }}">Mastodon</a>
    <a class=" [ button ] " href="{{ author.urls.spotify }}">Spotify</a>
    <a class=" [ button ] " href="https://twitter.com/{{ author.twitter }}">Twitter</a>
    <a class=" [ button ] " href="https://untappd.com/user/{{ author.untappd }}">Untappd</a>
    <a class=" [ button ] " href="https://londonwebstandards.org">London Web Standards</a>
    <a class=" [ button ] " href="https://stateofthebrowser.com">State of the Browser</a>
    <a class=" [ button ] " href="{{ author.employer.url }}">Squiz (I work for them!)</a>
</nav>
