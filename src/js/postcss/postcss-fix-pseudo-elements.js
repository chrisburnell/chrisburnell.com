const pseudoElementRegex = new RegExp(
	`(?<!:):(before|after|first-line|first-letter|placeholder|marker|selection|backdrop})\\b`,
	"g",
);

const plugin = () => ({
	postcssPlugin: "fix-pseudo-elements",
	OnceExit(root, { result }) {
		(result.root ?? root).walkRules((rule) => {
			if (pseudoElementRegex.test(rule.selector)) {
				rule.selector = rule.selector.replace(
					pseudoElementRegex,
					"::$1",
				);
			}
			pseudoElementRegex.lastIndex = 0;
		});
	},
});

plugin.postcss = true;

export default plugin;
