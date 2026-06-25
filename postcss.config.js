import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import atImport from "postcss-import";
// import utopia from "postcss-utopia";
// PATCH: remove when https://github.com/trys/postcss-utopia/pull/9 resolves
import utopia from "./src/js/postcss/postcss-utopia-patch.cjs";
import fixPseudoElements from "./src/js/postcss/postcss-fix-pseudo-elements.js";
import normalizeWhitespace from "./src/js/postcss/postcss-normalize-whitespace.js";

export default {
	plugins: [
		atImport,
		utopia({
			minWidth: 500,
			maxWidth: 1200,
		}),
		normalizeWhitespace,
		autoprefixer,
		cssnano({
			preset: [
				"default",
				{
					calc: false,
					reduceInitial: false,
				},
			],
		}),
		fixPseudoElements,
	],
};
