const plugin = () => ({
	postcssPlugin: "normalize-whitespace",
	Declaration(decl) {
		decl.value = decl.value.replace(/\s+/g, " ").trim();
	},
	Rule(rule) {
		rule.selector = rule.selector.replace(/\s*\n\s*/g, " ").trim();
	},
});

plugin.postcss = true;

export default plugin;
