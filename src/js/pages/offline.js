(async () => {
	const browsingHistory = [];
	const parser = new DOMParser();
	const cache = await caches.open("pages");
	const keys = await cache.keys();
	for (const request of keys) {
		if (!request.url.includes("/offline/")) {
			const response = await cache.match(request);
			const html = await response.text();
			const dom = parser.parseFromString(html, "text/html");
			const data = new Object();
			data.url = request.url;
			if (dom.querySelector(".description .dt-published")) {
				data.timestamp = new Date(dom.querySelector(".description .dt-published").getAttribute("datetime"));
				data.published = dom.querySelector(".description .dt-published").innerText;
			}
			if (dom.querySelector("h1")) {
				data.title = dom.querySelector("h1").innerText;
			} else {
				data.title = dom.querySelector('meta[name="twitter:title"]').getAttribute("content").replace(" · Chris Burnell", "");
			}
			data.description = dom.querySelector('meta[name="description"]').getAttribute("content");

			browsingHistory.push(data);
		}
	}
	if (browsingHistory) {
		browsingHistory.sort((a, b) => {
			return b.timestamp - a.timestamp;
		});
		let markup = '<h2>Here are some cached pages</h2><nav class=" [ deck ] ">';
		browsingHistory.forEach((data) => {
			markup += `
	  <article>
		  <h3>
			  <a href="${data.url}">${data.title}</a>
		  </h3>
		  <p>${data.description}</div>
  `;
			if (data.timestamp) {
				markup += `
  <div class=" [ deck__meta ] ">
	  <small>published</small>
	  <a href="${data.url}" tabindex="-1">
		  <time datetime="${data.timestamp}">${data.published}</time>
	  </a>
  </div>`;
			}
			markup += `</article>`;
		});
		markup += "</nav>";
		document.querySelector(".content__body").insertAdjacentHTML("beforeend", markup);
	}
})();
