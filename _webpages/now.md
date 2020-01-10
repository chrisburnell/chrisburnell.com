---
page_class: page--now

title: Now
lede: As real-time as you'd realistically want.
---

<noscript><p>Unfortunately, parts of this page require JavaScript.</p></noscript>

The time where I am is <time datetime="{{ site.time | date_to_xmlschema }}" class="js-my-local-time">{{ site.time | date_to_long_strong }}</time>.

More to come…

About the [/now movement](https://sivers.org/nowff){:rel="external"} and [people involved](https://nownownow.com/){:rel="external"}.

<script src="/js/vendors/luxon.min.js"></script>

<script>
    import { DateTime } from "/js/vendors/luxon.min.js";

    const timeElement = document.querySelector(".js-my-local-time");

    setInterval( function() {
        let localTime = DateTime.local().setZone("{{ site.timezone }}");
        timeElement.innerHTML = localTime.toLocaleString(DateTime.DATETIME_FULL);
        timeElement.setAttribute("datetime", localTime.toISO());
    }, 1000);
</script>

--------

{% include components/ads.liquid %}
