const handleHashTarget = () => {
	const hash = location.hash.slice(1);
	if (!hash) return;

	const target = document.getElementById(hash);
	if (!target) return;

	const popover = target.closest("[popover]");
	if (popover) {
		if (!popover.matches(":popover-open")) {
			popover.showPopover();
			history.replaceState(null, "", location.pathname + location.search);
		}
	}
};

window.addEventListener("hashchange", handleHashTarget);
window.addEventListener("DOMContentLoaded", handleHashTarget);
