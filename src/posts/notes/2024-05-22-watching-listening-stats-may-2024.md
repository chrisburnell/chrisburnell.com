---
date: 2024-05-22T22:55:48+0800
title: Watching and Listening Stats (as of May 2024)
description: I’ve been tracking music I listen to since 2010, and recently started using Trakt for movies and TV shows. I decided to collate some of the data to visualise my listening and watching habits.
tags:
  - weblogpomo
  - weblogpomo2024
  - personal
post_includes: weblogpomo2024.njk
---

<p class="rss-only"><em>I published <a href="/article/daily-word-games/">yesterday’s article, <q>Daily Word Games</q></a> under the wrong category and tried to amend it quickly, but if you got a duplicate in your feed reader, please accept my apologies!</em></p>

<div class=" [ box ] ">
    <p>Fair warning: this post contains some big tables and lists of data!</p>
</div>

## Movies and TV

I’m still learning my way around [Trakt](https://trakt.tv); although, I’ve spent a good chunk of time in the last couple of days going through the website and its many user-created lists of movies and TV shows and marking down things I’ve seen. I’ve taken some care to mark things I watched *before* using the website as having taken place on the content’s release date, which isn’t ideal, but means that I won’t destroy the timeline of things I’ve consumed recently (which you can see on my [/now](/now/) page).

For today, I figured I’d start off by looking at my top genres of movies and TV shows to get some idea, however useful or useless it may be, of what kind of things I like to watch.

### Movies by genre

{% set movie_genres = [{genre: 'Action', count: 103 }, {genre: 'Adventure', count: 111 }, {genre: 'Animation', count: 10 }, {genre: 'Anime', count: 18 }, {genre: 'Comedy', count: 59 }, {genre: 'Crime', count: 43 }, {genre: 'Documentary', count: 1 }, {genre: 'Drama', count: 99 }, {genre: 'Family', count: 22 }, {genre: 'Fantasy', count: 47 }, {genre: 'History', count: 11 }, {genre: 'Holiday', count: 3 }, {genre: 'Horror', count: 5 }, {genre: 'Music', count: 3 }, {genre: 'Musical', count: 5 }, {genre: 'Mystery', count: 13 }, {genre: 'Romance', count: 15 }, {genre: 'Science Fiction', count: 54 }, {genre: 'Superhero', count: 8 }, {genre: 'Thriller', count: 70 }, {genre: 'War', count: 11 }, {genre: 'Western', count: 6 }] -%}
{% set highest_movie_genre = 111 -%}
<table style="border-block-start: 0;">
    <tbody>
        {% for movie_data in movie_genres -%}
            <tr>
                <th class=" [ numeral ] ">{{ movie_data.genre }}</th>
                <td class=" [ numeral  strong ] " style="padding-inline-start: 1lh; padding-inline-end: var(--size-medium);">{{ movie_data.count | numberStringFormat(true) }}</td>
                <td class="no-rss" style="inline-size: 100%; padding-inline: 0;">
                    <div class=" [ background--raven ] " style="background-image: linear-gradient(to bottom, transparent, color-mix(in oklab, var(--color-mineshaft), transparent calc(100% - var(--opacity-beta)))); inline-size: {{ (movie_data.count / highest_movie_genre * 100) | maxDecimals }}%; block-size: 1lh; border-radius: var(--size-border-default);"></div>
                </td>
            </tr>
        {%- endfor %}
    </tbody>
</table>

### TV Shows by genre

{% set tv_genres = [{ genre: 'Action', count: 19 }, { genre: 'Adventure', count: 118 }, { genre: 'Animation', count: 3 }, { genre: 'Anime', count: 5 }, { genre: 'Comedy', count: 14 }, { genre: 'Crime', count: 4 }, { genre: 'Documentary', count: 8 }, { genre: 'Drama', count: 21 }, { genre: 'Family', count: 3 }, { genre: 'Fantasy', count: 17 }, { genre: 'History', count: 11 }, { genre: 'Horror', count: 3 }, { genre: 'Mystery', count: 7 }, { genre: 'Reality', count: 1 }, { genre: 'Science Fiction', count: 16 }, { genre: 'Superhero', count: 2 }, { genre: 'Suspense', count: 3 }, { genre: 'Thriller', count: 2 }, { genre: 'Western', count: 1 }] -%}
{% set highest_tv_genre = 118 -%}
<table style="border-block-start: 0;">
    <tbody>
        {% for tv_data in tv_genres -%}
            <tr>
                <th class=" [ numeral ] ">{{ tv_data.genre }}</th>
                <td class=" [ numeral  strong ] " style="padding-inline-start: 1lh; padding-inline-end: var(--size-medium);">{{ tv_data.count | numberStringFormat(true) }}</td>
                <td class="no-rss" style="inline-size: 100%; padding-inline: 0;">
                    <div class=" [ background--raven ] " style="background-image: linear-gradient(to bottom, transparent, color-mix(in oklab, var(--color-mineshaft), transparent calc(100% - var(--opacity-beta)))); inline-size: {{ (tv_data.count / highest_tv_genre * 100) | maxDecimals }}%; block-size: 1lh; border-radius: var(--size-border-default);"></div>
                </td>
            </tr>
        {%- endfor %}
    </tbody>
</table>

## Music

As mentioned, I’ve been <q>scrobbling</q> my music listening to [Last.fm](https://www.last.fm) for nearly 15 years now. That being said, I haven’t been listening to as much music as I used to; podcasts and long durations of ambience have been filling that gap. I also gave up Spotify a while back, where scrobbling was built-in, so actually getting my data *to* Last.fm has become a bit more long-winded too.

### Scrobbles per year

{% set yearly_scrobbles = [{ year: 2010, count: 5135 }, { year: 2011, count: 13932 }, { year: 2012, count: 13204 }, { year: 2013, count: 10967 }, { year: 2014, count: 4310 }, { year: 2015, count: 4876 }, { year: 2016, count: 6334 }, { year: 2017, count: 8710 }, { year: 2018, count: 11290 }, { year: 2019, count: 11666 }, { year: 2020, count: 7311 }, { year: 2021, count: 5314 }, { year: 2022, count: 2982 }, { year: 2023, count: 2603 }, { year: 2024, count: 499 }] -%}
{% set most_scrobbles_per_year = 13932 -%}
<table style="border-block-start: 0;">
    <tbody>
        {% for scrobble_data in yearly_scrobbles -%}
            <tr>
                <th class=" [ numeral ] ">{{ scrobble_data.year }}</th>
                <td class=" [ numeral  strong ] " style="padding-inline-start: 1lh; padding-inline-end: var(--size-medium);">{{ scrobble_data.count | numberStringFormat(true) }}</td>
                <td class="no-rss" style="inline-size: 100%; padding-inline: 0;">
                    <div class=" [ background--raven ] " style="background-image: linear-gradient(to bottom, transparent, color-mix(in oklab, var(--color-mineshaft), transparent calc(100% - var(--opacity-beta)))); inline-size: {{ (scrobble_data.count / most_scrobbles_per_year * 100) | maxDecimals }}%; block-size: 1lh; border-radius: var(--size-border-default);"></div>
                </td>
            </tr>
        {%- endfor %}
    </tbody>
</table>

<hr style="--rule-space: var(--size-medium);">

Unfortunately, Last.fm doesn’t provide any data about the genres of songs that you listen to, so without pumping my tracked history of >109,000 listens through some other kind of tool or service, I haven’t got an *exact* idea of what my tastes are.

I do, however, know that I tend to jump between a handful of broad genres, listening mostly to a particular genre for long periods of time before leaping to the next, so by my reckoning. If I take a look at my top albums and artists of all time, it probably paints a picture that closely resembles reality, so here we go:

### Top 20 Artists of All Time

<ol class="[ grid ] [ shelf ] " style="--row-gap: 1rem">
    <li>
        <a href="https://www.last.fm/music/Kid+Cudi/Plain+Pat+&amp;+Emile+Presents+a+KiD+named+CuDi" rel="external noopener"><strong>Plain Pat &amp; Emile Presents a KiD named CuDi</strong></a><br><small>by</small> <a href="https://www.last.fm/music/Kid+Cudi" rel="external noopener">Kid Cudi</a>
    </li>
    <li>
        <a href="https://www.last.fm/music/Deltron+3030/Deltron+3030" rel="external noopener"><strong>Deltron 3030</strong></a><br><small>by</small> <a href="https://www.last.fm/music/Deltron+3030" rel="external noopener">Deltron 3030</a>
    </li>
    <li>
        <a href="https://www.last.fm/music/Wiz+Khalifa/Kush+&amp;+Orange+Juice" rel="external noopener"><strong>Kush &amp; Orange Juice</strong></a><br><small>by</small> <a href="https://www.last.fm/music/Wiz+Khalifa" rel="external noopener">Wiz Khalifa</a>
    </li>
    <li>
        <a href="https://www.last.fm/music/$uicideboy$/STOP+STARING+AT+THE+SHADOWS" rel="external noopener"><strong>STOP STARING AT THE SHADOWS</strong></a><br><small>by</small> <a href="https://www.last.fm/music/$uicideboy$" rel="external noopener">$uicideboy$</a>
    </li>
    <li>
        <a href="https://www.last.fm/music/Gorillaz/Demon+Days" rel="external noopener"><strong>Demon Days</strong></a><br><small>by</small> <a href="https://www.last.fm/music/Gorillaz" rel="external noopener">Gorillaz</a>
    </li>
    <li>
        <a href="https://www.last.fm/music/Sub+Focus/Sub+Focus" rel="external noopener"><strong>Sub Focus</strong></a><br><small>by</small> <a href="https://www.last.fm/music/Sub+Focus" rel="external noopener">Sub Focus</a>
    </li>
    <li>
        <a href="https://www.last.fm/music/Ramirez/THA+PLAYA$+MANUAL" rel="external noopener"><strong>THA PLAYA$ MANUAL</strong></a><br><small>by</small> <a href="https://www.last.fm/music/Ramirez" rel="external noopener">Ramirez</a>
    </li>
    <li>
        <a href="https://www.last.fm/music/Alexisonfire/Watch+Out!" rel="external noopener"><strong>Watch Out!</strong></a><br><small>by</small> <a href="https://www.last.fm/music/Alexisonfire" rel="external noopener">Alexisonfire</a>
    </li>
    <li>
        <a href="https://www.last.fm/music/Kid+Cudi/Man+on+the+Moon:+The+End+of+Day" rel="external noopener"><strong>Man on the Moon: The End of Day</strong></a><br><small>by</small> <a href="https://www.last.fm/music/Kid+Cudi" rel="external noopener">Kid Cudi</a>
    </li>
    <li>
        <a href="https://www.last.fm/music/Kendrick+Lamar/DAMN." rel="external noopener"><strong>DAMN.</strong></a><br><small>by</small> <a href="https://www.last.fm/music/Kendrick+Lamar" rel="external noopener">Kendrick Lamar</a>
    </li>
    <li>
        <a href="https://www.last.fm/music/Drake/More+Life" rel="external noopener"><strong>More Life</strong></a><br><small>by</small> <a href="https://www.last.fm/music/Drake" rel="external noopener">Drake</a>
    </li>
    <li>
        <a href="https://www.last.fm/music/The+Lonely+Island/Incredibad" rel="external noopener"><strong>Incredibad</strong></a><br><small>by</small> <a href="https://www.last.fm/music/The+Lonely+Island" rel="external noopener">The Lonely Island</a>
    </li>
    <li>
        <a href="https://www.last.fm/music/Yelawolf/Radioactive" rel="external noopener"><strong>Radioactive</strong></a><br><small>by</small> <a href="https://www.last.fm/music/Yelawolf" rel="external noopener">Yelawolf</a>
    </li>
    <li>
        <a href="https://www.last.fm/music/Breezy+Lovejoy/O.B.E.+Vol.+1" rel="external noopener"><strong>O.B.E. Vol. 1</strong></a><br><small>by</small> <a href="https://www.last.fm/music/Breezy+Lovejoy" rel="external noopener">Breezy Lovejoy</a>
    </li>
    <li>
        <a href="https://www.last.fm/music/Phoenix/Wolfgang+Amadeus+Phoenix" rel="external noopener"><strong>Wolfgang Amadeus Phoenix</strong></a><br><small>by</small> <a href="https://www.last.fm/music/Phoenix" rel="external noopener">Phoenix</a>
    </li>
    <li>
        <a href="https://www.last.fm/music/Future/DS2+(Deluxe)" rel="external noopener"><strong>DS2 (Deluxe)</strong></a><br><small>by</small> <a href="https://www.last.fm/music/Future" rel="external noopener">Future</a>
    </li>
    <li>
        <a href="https://www.last.fm/music/Radiohead/OK+Computer" rel="external noopener"><strong>OK Computer</strong></a><br><small>by</small> <a href="https://www.last.fm/music/Radiohead" rel="external noopener">Radiohead</a>
    </li>
    <li>
        <a href="https://www.last.fm/music/Dr.+Dre/2001" rel="external noopener"><strong>2001</strong></a><br><small>by</small> <a href="https://www.last.fm/music/Dr.+Dre" rel="external noopener">Dr. Dre</a>
    </li>
    <li>
        <a href="https://www.last.fm/music/ScHoolboy+Q/CrasH+Talk" rel="external noopener"><strong>CrasH Talk</strong></a><br><small>by</small> <a href="https://www.last.fm/music/ScHoolboy+Q" rel="external noopener">ScHoolboy Q</a>
    </li>
    <li>
        <a href="https://www.last.fm/music/Gorillaz/Plastic+Beach" rel="external noopener"><strong>Plastic Beach</strong></a><br><small>by</small> <a href="https://www.last.fm/music/Gorillaz" rel="external noopener">Gorillaz</a>
    </li>
</ol>

### Top 20 Artists of All Time

<ol class="[ grid ] shelf" style="--row-gap: 1rem">
    <li>
        <a href="https://www.last.fm/music/Mitch+Murder"><strong>Mitch Murder</strong></a>
    </li>
    <li>
        <a href="https://www.last.fm/music/Kid+Cudi"><strong>Kid Cudi</strong></a>
    </li>
    <li>
        <a href="https://www.last.fm/music/The+Doors"><strong>The Doors</strong></a>
    </li>
    <li>
        <a href="https://www.last.fm/music/$uicideboy$"><strong>$uicideboy$</strong></a>
    </li>
    <li>
        <a href="https://www.last.fm/music/Eminem"><strong>Eminem</strong></a>
    </li>
    <li>
        <a href="https://www.last.fm/music/Red+Hot+Chili+Peppers"><strong>Red Hot Chili Peppers</strong></a>
    </li>
    <li>
        <a href="https://www.last.fm/music/Kendrick+Lamar"><strong>Kendrick Lamar</strong></a>
    </li>
    <li>
        <a href="https://www.last.fm/music/The+Beatles"><strong>The Beatles</strong></a>
    </li>
    <li>
        <a href="https://www.last.fm/music/Wiz+Khalifa"><strong>Wiz Khalifa</strong></a>
    </li>
    <li>
        <a href="https://www.last.fm/music/Yelawolf"><strong>Yelawolf</strong></a>
    </li>
    <li>
        <a href="https://www.last.fm/music/Gorillaz"><strong>Gorillaz</strong></a>
    </li>
    <li>
        <a href="https://www.last.fm/music/Dumbfoundead"><strong>Dumbfoundead</strong></a>
    </li>
    <li>
        <a href="https://www.last.fm/music/Drake"><strong>Drake</strong></a>
    </li>
    <li>
        <a href="https://www.last.fm/music/Alexisonfire"><strong>Alexisonfire</strong></a>
    </li>
    <li>
        <a href="https://www.last.fm/music/Young+Thug"><strong>Young Thug</strong></a>
    </li>
    <li>
        <a href="https://www.last.fm/music/Deltron+3030"><strong>Deltron 3030</strong></a>
    </li>
    <li>
        <a href="https://www.last.fm/music/Ramirez"><strong>Ramirez</strong></a>
    </li>
    <li>
        <a href="https://www.last.fm/music/Rick+Ross"><strong>Rick Ross</strong></a>
    </li>
    <li>
        <a href="https://www.last.fm/music/Radiohead"><strong>Radiohead</strong></a>
    </li>
    <li>
        <a href="https://www.last.fm/music/Led+Zeppelin"><strong>Led Zeppelin</strong></a>
    </li>
</ol>

<hr style="--rule-space: var(--size-medium);">

If you want to see an up-to-date version of this data, check out [my Listening page](/listening/).
