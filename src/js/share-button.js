(function (win, doc) {
	const testButton = doc.createElement("button");
	testButton.setAttribute("type", "share");
	if (testButton.type != "share") {
		win.addEventListener("click", (ev) => {
			ev = ev || win.event;
			let target = ev.target;
			let button = target.closest('button[type="share"]');
			if (button) {
				const title = doc.querySelector("title").innerText;
				const url = win.location.href;
				if (navigator.share) {
					navigator.share({
						title: title,
						url: url,
					});
				} else {
					win.location.href = "mailto:?subject=" + title + "&body=" + url;
				}
			}
		});
	}
})(this, this.document);
