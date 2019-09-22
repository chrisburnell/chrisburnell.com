---
title: Network Offline
lede: <span class="canada">Sorry</span>, it looks like there's a problem with your Internet connection.
page_class: page--error
searchable: false
sitemap:
  exclude: true
---

<nav class="buttons-list" role="navigation">
    <button role="button" type="button" onclick="window.location.reload()" aria-label="Refresh">Refresh!</button>
</nav>

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
    if (dom.querySelector('.h-entry h1')) {
      const data = new Object;
      data.url = request.url;
      data.timestamp = new Date(dom.querySelector('.h-entry .dt-published').getAttribute('datetime'));
      data.published = dom.querySelector('.h-entry .dt-published').innerText;
      data.title = dom.querySelector('.h-entry h1').innerText;
      data.description = dom.querySelector('meta[name="description"]').getAttribute('content');
      browsingHistory.push(data);
    }
  }
  if (browsingHistory) {
    browsingHistory.sort( (a,b) => {
      return b.timestamp - a.timestamp;
    });
    let markup = '<h2 class="gamma">Here are some cached pages:</h2><ol class="content-list" role="list">';
    browsingHistory.forEach( data => {
      markup += `
<li role="listitem">
    <article class="h-entry" role="article">
        <a class="u-url" href="${ data.url }">
            <h3 class="delta  title">${ data.title }</h3>
            <div class="lede">${ data.description }</div>
            <time class="date  dt-published" datetime="${ data.timestamp }">${ data.published }</time>
        </a>
    </article>
</li>
`;
    });
    markup += '</ol>';
    document.querySelector('.content__body').insertAdjacentHTML('beforeend', markup);
  }
})();
</script>
