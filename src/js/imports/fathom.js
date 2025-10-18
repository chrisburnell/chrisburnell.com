(function () {
	window.fathom =
		window.fathom ||
		function () {
			(window.fathom.q = window.fathom.q || []).push(arguments);
		};
	const fathomScript = document.createElement("script");
	fathomScript.async = true;
	fathomScript.src = "{{ site.urls.fathom }}/tracker.js";
	fathomScript.id = "fathom-script";
	document.head.appendChild(fathomScript);
	fathom("set", "siteId", "{{ site.fathom_siteid }}");
	fathom("trackPageview");
});
