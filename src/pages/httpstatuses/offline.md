---
permalink: "/{{ page.fileSlug }}/index.html"
title: Network Offline
description: <span class="canada">Sorry</span>, it looks like there's a problem with your Internet connection.
theme: null
---

<nav class=" [ grid ] [ navigator ] " aria-label="Error Navigation">
  <button onclick="window.location.reload()" aria-label="Refresh">Refresh!</button>
</nav>

<script>
(async () => {
	const browsingHistory = []
	const parser = new DOMParser()
	const cacheCorePages = await caches.open("core-pages")
	const cachePages = await caches.open("pages")
	const keysCorePages = await cacheCorePages.keys()
	const keysPages = await cachePages.keys()
	for (const keys of [keysCorePages, keysPages]) {
		for (const request of keys) {
			if (!request.url.includes("/offline/")) {
				const response = await cacheCorePages.match(request) || await cachePages.match(request)
				const html = await response.text()
				const dom = parser.parseFromString(html, "text/html")
				const data = new Object()
				data.url = request.url
				data.timestamp = new Date(response.headers.get("Date"))
				if (dom.querySelector(".description .dt-published")) {
					data.published = new Date(dom.querySelector(".description .dt-published").getAttribute("datetime")).toISOString()
					data.publishedString = dom.querySelector(".description .dt-published").innerText
				}
				if (dom.querySelector("h1")) {
					data.title = dom.querySelector("h1").innerText.replace("{{ site.tagline | striptags | safe }}", "The Homepage")
				} else {
					data.title = dom.querySelector('meta[name="twitter:title"]').getAttribute("content").replace(" · Chris Burnell", "")
				}
				data.description = dom.querySelector('meta[name="description"]').getAttribute("content")
				browsingHistory.push(data)
			}
		}
	}
	if (browsingHistory) {
		browsingHistory.sort((a, b) => {
			return b.timestamp - a.timestamp
		})
		let markup = '<h2>Here are some cached pages</h2><nav class=" [ deck ] ">'
		browsingHistory.forEach((data) => {
			markup += `
	  <article>
		  <h3>
			  <a href="${data.url}">${data.title}</a>
		  </h3>
		  <p>${data.description}</div>
  `
			if (data.published) {
				markup += `
<ul class=" [ cluster ] [ deck__meta ] ">
	<li>
		<small>published</small> <a href="${data.url}" tabindex="-1"><time datetime="${data.published}">${data.publishedString}</time></a>
	</li>
</ul>`
			}
			markup += `</article>`
		})
		markup += "</nav>"
		document.querySelector(".content").insertAdjacentHTML("beforeend", markup)
	}
})()
</script>
