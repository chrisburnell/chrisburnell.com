/**
 * Initializes the masonry layout for grids that do not support CSS grid masonry.
 * Inspired by:
 * Ana Tudor: https://codepen.io/thebabydino/pen/yLYppjK and
 * Andy Barefoot: https://codepen.io/andybarefoot/pen/QMeZda
 */
document.addEventListener("DOMContentLoaded", function () {
	const isMasonrySupported = CSS.supports("grid-template-rows", "masonry");

	if (!isMasonrySupported) {
		const masonryGrids = [
			...document.querySelectorAll(`[data-rows="masonry"]`),
		];

		function layoutMasonry() {
			masonryGrids.forEach((grid) => {
				const items = [...grid.children].filter(
					(child) => child.nodeType === 1,
				);

				const columnCount =
					getComputedStyle(grid).gridTemplateColumns.split(
						" ",
					).length;

				items.forEach((item, index) => {
					item.style.removeProperty("margin-block-start"); // Clear previous adjustments

					// Only adjust items that are not in the first row
					if (index >= columnCount) {
						const previousIndex = index - columnCount;
						const previousItem = items[previousIndex];

						const previousItemBottom =
							previousItem.getBoundingClientRect().bottom +
							Number(getComputedStyle(grid).rowGap);

						const currentItemTop = item.getBoundingClientRect().top;

						item.style.marginBlockStart = `${previousItemBottom - currentItemTop}px`;
					}
				});
			});
		}

		// Initial layout setup
		layoutMasonry();

		// Resize handling with debounce to optimize performance
		let resizeTimeout;
		window.addEventListener("resize", () => {
			clearTimeout(resizeTimeout);
			resizeTimeout = setTimeout(layoutMasonry, 100);
		});
	}
});
