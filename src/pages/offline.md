---
title: Network Offline
lede: <span class="canada">Sorry</span>, it looks like there's a problem with your Internet connection.
sitemap:
  exclude: true
carbon: false
coil: false
---

<nav class="buttons-list" role="navigation">
    <button type="button" onclick="window.location.reload()" aria-label="Refresh">Refresh!</button>
</nav>

{% raw %}
<script>
(async function listPages() {
  const browsingHistory = [];
  const parser = new DOMParser();
  const cache = await caches.open('pages');
  const keys = await cache.keys();
  for (const request of keys) {
    const response = await cache.match(request);
    const html = await response.text();
    const dom = parser.parseFromString(html, 'text/html');
    const data = new Object;
    data.url = request.url;
    if (dom.querySelector('.h-entry .meta .dt-published')) {
      data.timestamp = new Date(dom.querySelector('.h-entry .dt-published').getAttribute('datetime'));
      data.published = dom.querySelector('.h-entry .dt-published').innerText;
    }
    data.title = dom.querySelector('h1').innerText;
    data.description = dom.querySelector('meta[name="description"]').getAttribute('content');
    if (!request.url.endsWith("/") && !request.url.includes("/offline")) {
      browsingHistory.push(data);
    }
  }
  if (browsingHistory) {
    browsingHistory.sort( (a,b) => {
      return b.timestamp - a.timestamp;
    });
    let markup = '<h2>Here are some cached pages:</h2><nav class="deck">';
    browsingHistory.forEach( data => {
      markup += `
    <article class="h-entry">
        <a class="u-url" href="${ data.url }">
            <h3 class="delta  title">${ data.title }</h3>
            <div class="lede">${ data.description }</div>
`
      if (data.timestamp) {
          markup += `
            <time class="date  dt-published" datetime="${ data.timestamp }">${ data.published }</time>
`;
      }
      markup += `
        </a>
    </article>
`;
    });
    markup += '</nav>';
    document.querySelector('.content__body').insertAdjacentHTML('beforeend', markup);
  }
})();
</script>
{% endraw %}
