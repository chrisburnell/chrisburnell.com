import { calculateClamp } from "utopia-core";
import CSSValueParser from "postcss-value-parser";

const plugin = () => ({
	postcssPlugin: "utopia-clamp-container",
	Declaration(decl) {
		const parsedValue = CSSValueParser(decl.value);

		let valueChanged = false;
		parsedValue.walk((node) => {
			if (node.type !== "function" || node.value !== "utopia.clamp") {
				return;
			}

			const args = node.nodes.filter((n) => n.type !== "div");
			const allValues = args.map((n) => n.value);

			if (!allValues.includes("container")) {
				return;
			}

			let [minSize, maxSize, minWidth, maxWidth] = allValues
				.filter((v) => v !== "container")
				.map(Number);
			if (!minWidth) minWidth = 500;
			if (!maxWidth) maxWidth = 1200;

			const clamp = calculateClamp({
				minSize,
				maxSize,
				minWidth,
				maxWidth,
				relativeTo: "container",
			});

			const {
				nodes: [{ nodes }],
			} = CSSValueParser(clamp);

			node.value = "clamp";
			node.nodes = nodes;
			valueChanged = true;

			return false;
		});

		if (valueChanged) {
			decl.value = CSSValueParser.stringify(parsedValue);
		}
	},
});

plugin.postcss = true;

export default plugin;
